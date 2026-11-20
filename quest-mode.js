const PROGRESS_STORAGE_KEY = 'enw493_progress';

const STAGE_META = [
    { id: 1, name: "Soi Đề", xp: 15, icon: "fa-magnifying-glass" },
    { id: 2, name: "Mở Bài", xp: 20, icon: "fa-puzzle-piece" },
    { id: 3, name: "Xếp Lego", xp: 25, icon: "fa-cubes" },
    { id: 4, name: "Dịch Câu", xp: 40, icon: "fa-pen-nib" },
    { id: 5, name: "Boss Fight", xp: 100, icon: "fa-trophy" }
];

const RANKS = [
    { minXp: 1200, label: "👑 Trùm Cuối Qua Môn ENW493c" },
    { minXp: 600, label: "⚡ Chiến Thần Template" },
    { minXp: 200, label: "🧱 Thợ Lắp Ráp PEEL" },
    { minXp: 0, label: "🐣 Tân binh Mất Gốc" }
];

function getTodayIsoDate() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
}

function loadProgress() {
    try {
        const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') {
                return {
                    xp: Number(parsed.xp) || 0,
                    freePlayMode: Boolean(parsed.freePlayMode),
                    lastActiveDate: parsed.lastActiveDate || getTodayIsoDate(),
                    questions: parsed.questions && typeof parsed.questions === 'object' ? parsed.questions : {}
                };
            }
        }
    } catch (e) {
        console.warn('Không đọc được tiến độ localStorage:', e);
    }
    return {
        xp: 0,
        freePlayMode: false,
        lastActiveDate: getTodayIsoDate(),
        questions: {}
    };
}

function saveProgress(progress) {
    progress.lastActiveDate = getTodayIsoDate();
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

function getQuestionProgress(progress, qId) {
    const key = String(qId);
    if (!progress.questions[key]) {
        progress.questions[key] = {
            unlockedStage: 1,
            completedStages: [],
            bestScore: null,
            passed: false,
            stage4Drafts: {}
        };
    }
    const qp = progress.questions[key];
    if (!Array.isArray(qp.completedStages)) qp.completedStages = [];
    if (!qp.unlockedStage) qp.unlockedStage = 1;
    if (!qp.stage4Drafts || typeof qp.stage4Drafts !== 'object') qp.stage4Drafts = {};
    return qp;
}

function getRankLabel(xp) {
    return (RANKS.find(r => xp >= r.minXp) || RANKS[RANKS.length - 1]).label;
}

function getQuestionStatusIcon(qId) {
    const progress = loadProgress();
    const qp = progress.questions[String(qId)];
    if (!qp) return { icon: '⚪', status: 'todo' };
    if (qp.passed) return { icon: '✅', status: 'passed' };
    if ((qp.completedStages && qp.completedStages.length > 0) || localStorage.getItem(`draft_q_${qId}`)) {
        return { icon: '🔥', status: 'in-progress' };
    }
    return { icon: '⚪', status: 'todo' };
}

function awardStageCompletion(qId, stageNum, xpAmount) {
    const progress = loadProgress();
    const qp = getQuestionProgress(progress, qId);
    let gainedXp = 0;

    if (!qp.completedStages.includes(stageNum)) {
        qp.completedStages.push(stageNum);
        progress.xp += xpAmount;
        gainedXp = xpAmount;
    }
    if (stageNum < 5 && qp.unlockedStage < stageNum + 1) {
        qp.unlockedStage = stageNum + 1;
    }
    saveProgress(progress);

    if (typeof window.refreshGamificationUI === 'function') {
        window.refreshGamificationUI();
    }
    return gainedXp;
}

function recordBossFightResult(qId, score) {
    const progress = loadProgress();
    const qp = getQuestionProgress(progress, qId);
    if (score !== null && (qp.bestScore === null || score > qp.bestScore)) {
        qp.bestScore = score;
    }

    let newlyPassed = false;
    let gainedXp = 0;
    if (score !== null && score >= 6.0) {
        if (!qp.passed) {
            qp.passed = true;
            newlyPassed = true;
        }
        if (!qp.completedStages.includes(5)) {
            qp.completedStages.push(5);
            progress.xp += 100;
            gainedXp = 100;
        }
        qp.unlockedStage = 5;
    }
    saveProgress(progress);

    if (typeof window.refreshGamificationUI === 'function') {
        window.refreshGamificationUI();
    }

    if (newlyPassed && typeof confetti === 'function') {
        try {
            confetti({ particleCount: 90, spread: 70, origin: { y: 0.65 } });
        } catch {
            // Ignore confetti errors if blocked
        }
    }

    return { newlyPassed, gainedXp, bestScore: qp.bestScore };
}

// Shuffle helper (Fisher-Yates) guaranteed not to match original array when len > 1
function shuffleArray(arr, preventIdentical = false) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    if (preventIdentical && copy.length > 1 && copy.every((v, idx) => v === arr[idx])) {
        [copy[0], copy[1]] = [copy[1], copy[0]];
    }
    return copy;
}

const QuestMode = {
    currentStage: 1,
    question: null,
    // Stage 2 state
    s2Chips: [],
    s2Slots: [],
    s2Checked: false,
    // Stage 3 state
    s3Items: [],
    s3SelectedIdx: null,
    s3Verified: false,

    initForQuestion(question, preserveStage = false) {
        this.question = question;
        const progress = loadProgress();
        const qp = getQuestionProgress(progress, question.id);
        if (!preserveStage) {
            this.currentStage = qp.passed ? 5 : Math.min(qp.unlockedStage || 1, 5);
        }
        this.resetStageInteractiveState();
        this.render();
    },

    resetStageInteractiveState() {
        if (!this.question) return;
        const q = this.question;
        // Stage 2 init
        const allWords = [...q.stage2Intro.answers, ...q.stage2Intro.distractors];
        this.s2Chips = shuffleArray(allWords).map((word, idx) => ({ id: idx, word, used: false }));
        this.s2Slots = new Array(q.stage2Intro.answers.length).fill(null);
        this.s2Checked = false;

        // Stage 3 init
        const indexed = q.stage3Body1.map((item, idx) => ({ ...item, origIndex: idx }));
        this.s3Items = shuffleArray(indexed, true);
        this.s3SelectedIdx = null;
        this.s3Verified = false;
    },

    setStage(stageNum) {
        const progress = loadProgress();
        const qp = getQuestionProgress(progress, this.question.id);
        if (!progress.freePlayMode && stageNum > qp.unlockedStage) {
            return;
        }
        this.currentStage = stageNum;
        if (stageNum === 2) {
            const allWords = [...this.question.stage2Intro.answers, ...this.question.stage2Intro.distractors];
            this.s2Chips = shuffleArray(allWords).map((word, idx) => ({ id: idx, word, used: false }));
            this.s2Slots = new Array(this.question.stage2Intro.answers.length).fill(null);
            this.s2Checked = false;
        } else if (stageNum === 3) {
            const indexed = this.question.stage3Body1.map((item, idx) => ({ ...item, origIndex: idx }));
            this.s3Items = shuffleArray(indexed, true);
            this.s3SelectedIdx = null;
            this.s3Verified = false;
        }
        this.render();
    },

    render() {
        const container = document.getElementById('questModeContainer');
        if (!container || !this.question) return;

        const q = this.question;
        const progress = loadProgress();
        const qp = getQuestionProgress(progress, q.id);

        const stepperHtml = STAGE_META.map(s => {
            const isCompleted = qp.completedStages.includes(s.id);
            const isActive = this.currentStage === s.id;
            const isLocked = !progress.freePlayMode && s.id > qp.unlockedStage;
            const stateClass = isActive ? 'active' : (isCompleted ? 'completed' : (isLocked ? 'locked' : ''));
            const iconHtml = isCompleted
                ? '<i class="fa-solid fa-check"></i>'
                : (isLocked ? '<i class="fa-solid fa-lock"></i>' : `<i class="fa-solid ${s.icon}"></i>`);

            return `
                <button type="button" class="quest-step ${stateClass}" data-stage="${s.id}" ${isLocked ? 'disabled' : ''}>
                    <span class="step-badge">${iconHtml}</span>
                    <span class="step-text">
                        <strong>Ải ${s.id}</strong>
                        <small>${s.name} (+${s.xp} XP)</small>
                    </span>
                </button>
            `;
        }).join('');

        container.innerHTML = `
            <div class="quest-header-card">
                <div class="quest-title-row">
                    <div>
                        <span class="framework-pill fw-${q.framework}">Khung ${q.framework}: ${escapeHtml(q.frameworkName)}</span>
                        <span class="word-target-pill">${q.minWords}–${q.maxWords} từ</span>
                        <h2>${escapeHtml(q.title)}</h2>
                    </div>
                    <label class="free-play-toggle" title="Bỏ qua khóa thứ tự nếu bạn muốn nhảy thẳng vào Ải 4 hoặc 5">
                        <input type="checkbox" id="freePlayToggle" ${progress.freePlayMode ? 'checked' : ''}>
                        <span>🔓 Mở khóa tất cả ải (Tự do)</span>
                    </label>
                </div>
                <div class="quest-stepper">${stepperHtml}</div>
            </div>
            <div id="questStageBody" class="quest-stage-card"></div>
        `;

        // Bind stepper + free play toggle
        container.querySelectorAll('.quest-step').forEach(btn => {
            btn.addEventListener('click', () => {
                const st = Number(btn.dataset.stage);
                this.setStage(st);
            });
        });

        const toggle = document.getElementById('freePlayToggle');
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                const p = loadProgress();
                p.freePlayMode = e.target.checked;
                saveProgress(p);
                this.render();
            });
        }

        const stageBody = document.getElementById('questStageBody');
        if (this.currentStage === 1) this.renderStage1(stageBody);
        else if (this.currentStage === 2) this.renderStage2(stageBody);
        else if (this.currentStage === 3) this.renderStage3(stageBody);
        else if (this.currentStage === 4) this.renderStage4(stageBody);
        else if (this.currentStage === 5) this.renderStage5(stageBody);
    },

    renderStage1(container) {
        const q = this.question;
        const fwOptions = Object.keys(FRAMEWORKS_META).map(code => `
            <label class="quiz-option">
                <input type="radio" name="q1Framework" value="${code}">
                <span><strong>Khung ${code}:</strong> ${escapeHtml(FRAMEWORKS_META[code].name)} — <small>${escapeHtml(FRAMEWORKS_META[code].vi)}</small></span>
            </label>
        `).join('');

        container.innerHTML = `
            <div class="stage-intro">
                <h3><i class="fa-solid fa-magnifying-glass"></i> Ải 1: Soi Đề Nhanh (15 giây)</h3>
                <p>Đọc kỹ đề bài và chọn đúng <strong>Khung viết</strong> + <strong>Mốc số từ</strong> để tránh lạc đề.</p>
            </div>
            <div class="prompt-text stage-prompt-box">${escapeHtml(q.content)}</div>
            <div class="quiz-grid">
                <div class="quiz-block">
                    <h4>1. Đề này thuộc Khung nào?</h4>
                    <div class="quiz-options">${fwOptions}</div>
                </div>
                <div class="quiz-block">
                    <h4>2. Độ dài đề yêu cầu là bao nhiêu từ?</h4>
                    <div class="quiz-options">
                        <label class="quiz-option">
                            <input type="radio" name="q1WordRange" value="350-400">
                            <span><strong>350 – 400 từ</strong></span>
                        </label>
                        <label class="quiz-option">
                            <input type="radio" name="q1WordRange" value="450-500">
                            <span><strong>450 – 500 từ</strong></span>
                        </label>
                    </div>
                </div>
            </div>
            <div id="stage1Feedback" class="stage-feedback"></div>
            <div class="stage-actions">
                <button type="button" id="checkStage1Btn" class="btn-primary">
                    <i class="fa-solid fa-check-double"></i> Kiểm tra Đáp án (+15 XP)
                </button>
            </div>
        `;

        document.getElementById('checkStage1Btn').addEventListener('click', () => {
            const fwEl = container.querySelector('input[name="q1Framework"]:checked');
            const wrEl = container.querySelector('input[name="q1WordRange"]:checked');
            const fb = document.getElementById('stage1Feedback');

            if (!fwEl || !wrEl) {
                fb.innerHTML = `<div class="alert-warn">Vui lòng chọn đủ cả 2 câu trước khi kiểm tra!</div>`;
                return;
            }

            const expectedRange = `${q.minWords}-${q.maxWords}`;
            const isFwCorrect = fwEl.value === q.framework;
            const isWrCorrect = wrEl.value === expectedRange;

            if (isFwCorrect && isWrCorrect) {
                const gained = awardStageCompletion(q.id, 1, 15);
                fb.innerHTML = `
                    <div class="alert-success">
                        <strong>Chuẩn xác!</strong> ${gained > 0 ? `+${gained} XP! ` : ''}Đề này dùng <strong>Khung ${q.framework} (${escapeHtml(q.frameworkName)})</strong> với độ dài <strong>${q.minWords}–${q.maxWords} từ</strong>.
                        <div class="mt-8"><small>💡 ${escapeHtml(q.quickHints.stance || '')}</small></div>
                    </div>
                `;
                document.getElementById('checkStage1Btn').outerHTML = `
                    <button type="button" class="btn-primary" onclick="QuestMode.setStage(2)">
                        Sang Ải 2: Lắp Ráp Mở Bài <i class="fa-solid fa-arrow-right"></i>
                    </button>
                `;
            } else {
                const hints = [];
                if (!isFwCorrect) hints.push(`Câu 1 chưa đúng — hãy đọc lại câu hỏi cuối trong đề bài để nhận diện dạng bài.`);
                if (!isWrCorrect) hints.push(`Câu 2 chưa đúng — nhìn lại con số giới hạn từ trong đề.`);
                fb.innerHTML = `<div class="alert-error">${hints.join('<br>')}</div>`;
            }
        });
    },

    renderStage2(container) {
        const q = this.question;
        let slotCounter = 0;
        const sentenceHtml = escapeHtml(q.stage2Intro.template).replace(/\{\{\d+\}\}/g, () => {
            const idx = slotCounter++;
            const chipId = this.s2Slots[idx];
            const chip = chipId !== null ? this.s2Chips.find(c => c.id === chipId) : null;
            let cls = 'blank-slot';
            if (chip) cls += ' filled';
            if (this.s2Checked && chip) {
                cls += chip.word === q.stage2Intro.answers[idx] ? ' correct' : ' wrong';
            } else if (this.s2Checked && !chip) {
                cls += ' wrong';
            }
            return `<button type="button" class="${cls}" data-slot-idx="${idx}">${chip ? escapeHtml(chip.word) : `(${idx + 1})`}</button>`;
        });

        const chipsHtml = this.s2Chips.map(chip => `
            <button type="button" class="word-chip ${chip.used ? 'used' : ''}" data-chip-id="${chip.id}" ${chip.used ? 'disabled' : ''}>
                ${escapeHtml(chip.word)}
            </button>
        `).join('');

        container.innerHTML = `
            <div class="stage-intro">
                <h3><i class="fa-solid fa-puzzle-piece"></i> Ải 2: Lắp Ráp Mở Bài (Click từ để điền)</h3>
                <p>Click vào các thẻ từ bên dưới để điền vào chỗ trống. Có <strong>từ gây nhiễu</strong>, hãy đọc kỹ ngữ cảnh nhé! (Click vào ô đã điền để tháo từ ra).</p>
            </div>
            <div class="fill-blank-box">${sentenceHtml}</div>
            <div class="word-chips-bank">
                <div class="bank-label">Kho từ gợi ý (click để chọn):</div>
                <div class="chips-wrap">${chipsHtml}</div>
            </div>
            <div id="stage2Feedback" class="stage-feedback"></div>
            <div class="stage-actions">
                <button type="button" id="resetStage2Btn" class="btn-secondary">
                    <i class="fa-solid fa-rotate-left"></i> Đặt lại
                </button>
                <button type="button" id="checkStage2Btn" class="btn-primary">
                    <i class="fa-solid fa-check"></i> Kiểm tra Mở bài (+20 XP)
                </button>
            </div>
        `;

        container.querySelectorAll('.word-chip').forEach(btn => {
            btn.addEventListener('click', () => {
                const chipId = Number(btn.dataset.chipId);
                const emptyIdx = this.s2Slots.findIndex(v => v === null);
                if (emptyIdx === -1) return;
                const chip = this.s2Chips.find(c => c.id === chipId);
                if (!chip || chip.used) return;
                chip.used = true;
                this.s2Slots[emptyIdx] = chipId;
                this.s2Checked = false;
                this.renderStage2(container);
            });
        });

        container.querySelectorAll('.blank-slot').forEach(btn => {
            btn.addEventListener('click', () => {
                const slotIdx = Number(btn.dataset.slotIdx);
                const chipId = this.s2Slots[slotIdx];
                if (chipId === null) return;
                const chip = this.s2Chips.find(c => c.id === chipId);
                if (chip) chip.used = false;
                this.s2Slots[slotIdx] = null;
                this.s2Checked = false;
                this.renderStage2(container);
            });
        });

        document.getElementById('resetStage2Btn').addEventListener('click', () => {
            this.s2Chips.forEach(c => { c.used = false; });
            this.s2Slots = new Array(q.stage2Intro.answers.length).fill(null);
            this.s2Checked = false;
            this.renderStage2(container);
        });

        document.getElementById('checkStage2Btn').addEventListener('click', () => {
            this.s2Checked = true;
            const allFilled = this.s2Slots.every(v => v !== null);
            if (!allFilled) {
                this.renderStage2(container);
                document.getElementById('stage2Feedback').innerHTML = `<div class="alert-warn">Bạn cần điền đủ tất cả ${q.stage2Intro.answers.length} chỗ trống!</div>`;
                return;
            }

            const allCorrect = this.s2Slots.every((chipId, idx) => {
                const chip = this.s2Chips.find(c => c.id === chipId);
                return chip && chip.word === q.stage2Intro.answers[idx];
            });

            this.renderStage2(container);
            const fb = document.getElementById('stage2Feedback');
            if (allCorrect) {
                const gained = awardStageCompletion(q.id, 2, 20);
                fb.innerHTML = `
                    <div class="alert-success">
                        <strong>Tuyệt vời!</strong> ${gained > 0 ? `+${gained} XP! ` : ''}Mở bài đã chuẩn chỉnh.
                        <div class="mt-8"><strong>Dịch nghĩa:</strong> ${escapeHtml(q.stage2Intro.viTranslation)}</div>
                    </div>
                `;
                document.getElementById('checkStage2Btn').outerHTML = `
                    <button type="button" class="btn-primary" onclick="QuestMode.setStage(3)">
                        Sang Ải 3: Xếp Lego Thân Bài 1 <i class="fa-solid fa-arrow-right"></i>
                    </button>
                `;
            } else {
                fb.innerHTML = `<div class="alert-error">Các ô viền đỏ chưa khớp — bấm vào ô đỏ để tháo ra và chọn từ khác nhé!</div>`;
            }
        });
    },

    renderStage3(container) {
        const q = this.question;
        const itemsHtml = this.s3Items.map((item, idx) => {
            const isCorrectPos = this.s3Verified && item.origIndex === idx;
            const isWrongPos = this.s3Verified && item.origIndex !== idx;
            const isSelected = this.s3SelectedIdx === idx;
            const badgeVisible = this.s3Verified && this.s3Items.every((it, i) => it.origIndex === i);

            return `
                <div class="lego-card ${isSelected ? 'selected' : ''} ${isCorrectPos ? 'correct' : ''} ${isWrongPos ? 'wrong' : ''}" data-idx="${idx}">
                    <div class="lego-index">${idx + 1}</div>
                    <div class="lego-body">
                        ${badgeVisible ? `<span class="peel-badge">${escapeHtml(item.role)}</span>` : ''}
                        <div class="lego-en">${escapeHtml(item.en)}</div>
                        ${badgeVisible ? `<div class="lego-vi">→ ${escapeHtml(item.vi)}</div>` : ''}
                    </div>
                    <div class="lego-controls">
                        <button type="button" class="btn-move" data-dir="up" data-idx="${idx}" ${idx === 0 ? 'disabled' : ''} title="Đưa lên"><i class="fa-solid fa-arrow-up"></i></button>
                        <button type="button" class="btn-move" data-dir="down" data-idx="${idx}" ${idx === this.s3Items.length - 1 ? 'disabled' : ''} title="Đưa xuống"><i class="fa-solid fa-arrow-down"></i></button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="stage-intro">
                <h3><i class="fa-solid fa-cubes"></i> Ải 3: Xếp Lego Thân Bài 1 (Chuẩn P → E → E → L)</h3>
                <p>Sắp xếp lại các câu sau theo đúng mạch logic <strong>Point → Explain → Example → Link</strong>. Bấm nút <strong>↑ / ↓</strong> hoặc click chọn 2 câu để đổi chỗ.</p>
            </div>
            <div class="lego-list">${itemsHtml}</div>
            <div id="stage3Feedback" class="stage-feedback"></div>
            <div class="stage-actions">
                <button type="button" id="shuffleStage3Btn" class="btn-secondary">
                    <i class="fa-solid fa-shuffle"></i> Xáo lại
                </button>
                <button type="button" id="checkStage3Btn" class="btn-primary">
                    <i class="fa-solid fa-check"></i> Kiểm tra thứ tự PEEL (+25 XP)
                </button>
            </div>
        `;

        container.querySelectorAll('.btn-move').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = Number(btn.dataset.idx);
                const dir = btn.dataset.dir;
                const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
                if (targetIdx < 0 || targetIdx >= this.s3Items.length) return;
                [this.s3Items[idx], this.s3Items[targetIdx]] = [this.s3Items[targetIdx], this.s3Items[idx]];
                this.s3SelectedIdx = null;
                this.s3Verified = false;
                this.renderStage3(container);
            });
        });

        container.querySelectorAll('.lego-card').forEach(card => {
            card.addEventListener('click', () => {
                const idx = Number(card.dataset.idx);
                if (this.s3SelectedIdx === null) {
                    this.s3SelectedIdx = idx;
                    this.renderStage3(container);
                } else if (this.s3SelectedIdx === idx) {
                    this.s3SelectedIdx = null;
                    this.renderStage3(container);
                } else {
                    [this.s3Items[this.s3SelectedIdx], this.s3Items[idx]] = [this.s3Items[idx], this.s3Items[this.s3SelectedIdx]];
                    this.s3SelectedIdx = null;
                    this.s3Verified = false;
                    this.renderStage3(container);
                }
            });
        });

        document.getElementById('shuffleStage3Btn').addEventListener('click', () => {
            const indexed = q.stage3Body1.map((item, idx) => ({ ...item, origIndex: idx }));
            this.s3Items = shuffleArray(indexed, true);
            this.s3SelectedIdx = null;
            this.s3Verified = false;
            this.renderStage3(container);
        });

        document.getElementById('checkStage3Btn').addEventListener('click', () => {
            this.s3Verified = true;
            this.s3SelectedIdx = null;
            const correctCount = this.s3Items.filter((item, idx) => item.origIndex === idx).length;
            const isAllCorrect = correctCount === this.s3Items.length;

            this.renderStage3(container);
            const fb = document.getElementById('stage3Feedback');

            if (isAllCorrect) {
                const gained = awardStageCompletion(q.id, 3, 25);
                fb.innerHTML = `
                    <div class="alert-success">
                        <strong>Xuất sắc!</strong> ${gained > 0 ? `+${gained} XP! ` : ''}Bạn đã nắm trọn mạch logic P–E–E–L của Thân bài 1 (đã mở nhãn vai trò và nghĩa tiếng Việt ở trên).
                    </div>
                `;
                document.getElementById('checkStage3Btn').outerHTML = `
                    <button type="button" class="btn-primary" onclick="QuestMode.setStage(4)">
                        Sang Ải 4: Dịch Khung Thân Bài 2 <i class="fa-solid fa-arrow-right"></i>
                    </button>
                `;
            } else {
                fb.innerHTML = `<div class="alert-warn">Bạn đã xếp đúng <strong>${correctCount}/${this.s3Items.length}</strong> vị trí (các câu đúng có viền xanh). Hãy đảo lại các câu viền đỏ theo mạch <em>Luận điểm → Giải thích → Ví dụ → Liên kết</em>!</div>`;
            }
        });
    },

    renderStage4(container) {
        const q = this.question;
        const progress = loadProgress();
        const qp = getQuestionProgress(progress, q.id);

        const rowsHtml = q.stage4Body2.map((item, idx) => {
            const draftVal = qp.stage4Drafts[idx] || '';
            const kwHtml = (item.keywords || []).map(k => `<span class="kw-chip">${escapeHtml(k)}</span>`).join('');
            return `
                <div class="stage4-row" data-row-idx="${idx}">
                    <div class="stage4-row-head">
                        <span class="peel-badge">${escapeHtml(item.role)}</span>
                        <span class="stage4-vi">${escapeHtml(item.vi)}</span>
                    </div>
                    <div class="stage4-keywords">Từ khóa gợi ý: ${kwHtml}</div>
                    <textarea class="stage4-input" data-idx="${idx}" placeholder="Gõ câu tiếng Anh của bạn tại đây...">${escapeHtml(draftVal)}</textarea>
                    <div class="stage4-row-actions">
                        <button type="button" class="btn-ai-coach" data-idx="${idx}">
                            <i class="fa-solid fa-wand-magic-sparkles"></i> AI Sửa & Nâng cấp câu
                        </button>
                        <button type="button" class="btn-sample-toggle" data-idx="${idx}">
                            <i class="fa-regular fa-lightbulb"></i> Xem mẫu
                        </button>
                    </div>
                    <div class="stage4-sample" id="s4Sample_${idx}" style="display: none;">
                        <strong>Câu mẫu:</strong> ${escapeHtml(item.sample)}
                    </div>
                    <div class="stage4-ai-result result-content" id="s4AiResult_${idx}" style="display: none;"></div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="stage-intro">
                <h3><i class="fa-solid fa-pen-nib"></i> Ải 4: Dịch Khung Thân Bài 2 (Tập viết từng câu)</h3>
                <p>Dựa vào gợi ý tiếng Việt + từ khóa để viết từng câu tiếng Anh. Bí thì bấm <strong>💡 Xem mẫu</strong>, viết xong bấm <strong>✨ AI Sửa & Nâng cấp</strong> để học ngay lỗi ngữ pháp!</p>
            </div>
            <div class="stage4-list">${rowsHtml}</div>
            <div id="stage4Feedback" class="stage-feedback"></div>
            <div class="stage-actions">
                <button type="button" id="completeStage4Btn" class="btn-primary">
                    <i class="fa-solid fa-flag-checkered"></i> Hoàn thành Ải 4 (+40 XP)
                </button>
            </div>
        `;

        container.querySelectorAll('.stage4-input').forEach(ta => {
            ta.addEventListener('input', () => {
                const idx = ta.dataset.idx;
                const p = loadProgress();
                const qProg = getQuestionProgress(p, q.id);
                qProg.stage4Drafts[idx] = ta.value;
                saveProgress(p);
            });
        });

        container.querySelectorAll('.btn-sample-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = btn.dataset.idx;
                const box = document.getElementById(`s4Sample_${idx}`);
                if (!box) return;
                const show = box.style.display === 'none';
                box.style.display = show ? 'block' : 'none';
                btn.innerHTML = show
                    ? '<i class="fa-regular fa-eye-slash"></i> Ẩn mẫu'
                    : '<i class="fa-regular fa-lightbulb"></i> Xem mẫu';
            });
        });

        container.querySelectorAll('.btn-ai-coach').forEach(btn => {
            btn.addEventListener('click', async () => {
                const idx = Number(btn.dataset.idx);
                const item = q.stage4Body2[idx];
                const textarea = container.querySelector(`.stage4-input[data-idx="${idx}"]`);
                const resultBox = document.getElementById(`s4AiResult_${idx}`);
                const sentence = textarea ? textarea.value.trim() : '';

                if (sentence.length < 4) {
                    alert('Hãy gõ ít nhất một câu tiếng Anh ngắn trước khi nhờ AI sửa nhé!');
                    return;
                }

                btn.disabled = true;
                resultBox.style.display = 'block';
                resultBox.innerHTML = `<div class="inline-spinner"><i class="fa-solid fa-spinner fa-spin"></i> Đang hỏi gia sư AI...</div>`;

                const res = await coachSentenceWithAI({
                    questionTitle: q.title,
                    role: item.role,
                    viHint: item.vi,
                    keywords: item.keywords,
                    studentSentence: sentence,
                    onStatusUpdate: (msg) => {
                        resultBox.innerHTML = `<div class="inline-spinner"><i class="fa-solid fa-spinner fa-spin"></i> ${escapeHtml(msg)}</div>`;
                    }
                });

                btn.disabled = false;
                if (res.ok) {
                    resultBox.innerHTML = marked.parse(res.text) + `<div class="ai-model-tag">Gia sư: ${escapeHtml(res.model)}</div>`;
                } else if (res.missingKeys) {
                    resultBox.innerHTML = `<div class="alert-warn">Vui lòng nhập API Key Gemini ở cột <strong>Cài đặt AI</strong> bên trái để dùng tính năng sửa câu!</div>`;
                } else {
                    resultBox.innerHTML = `<div class="alert-error">Lỗi AI: ${escapeHtml(res.errorMsg)}</div>`;
                }
            });
        });

        document.getElementById('completeStage4Btn').addEventListener('click', () => {
            const inputs = Array.from(container.querySelectorAll('.stage4-input'));
            const filledCount = inputs.filter(i => i.value.trim().length >= 5).length;
            const fb = document.getElementById('stage4Feedback');

            if (filledCount === 0) {
                fb.innerHTML = `<div class="alert-warn">Hãy tự tập viết ít nhất 1 câu (hoặc tham khảo mẫu rồi tự gõ lại) trước khi qua Ải 5 nhé!</div>`;
                return;
            }

            const gained = awardStageCompletion(q.id, 4, 40);
            fb.innerHTML = `
                <div class="alert-success">
                    <strong>Chúc mừng!</strong> ${gained > 0 ? `+${gained} XP! ` : ''}Bạn đã hoàn tất luyện câu Thân bài 2 và sẵn sàng cho <strong>Boss Fight</strong>!
                </div>
            `;
            document.getElementById('completeStage4Btn').outerHTML = `
                <button type="button" class="btn-primary" onclick="QuestMode.setStage(5)">
                    Vào Ải 5: Boss Fight <i class="fa-solid fa-trophy"></i>
                </button>
            `;
        });
    },

    renderStage5(container) {
        const q = this.question;
        const progress = loadProgress();
        const qp = getQuestionProgress(progress, q.id);

        const introFilled = q.stage2Intro.template.replace(/\{\{(\d+)\}\}/g, (_, n) => q.stage2Intro.answers[Number(n) - 1] || '');
        const body1Text = q.stage3Body1.map(s => s.en).join(' ');
        const body2Drafts = q.stage4Body2.map((item, idx) => (qp.stage4Drafts[idx] && qp.stage4Drafts[idx].trim()) || item.sample).join(' ');

        const statusBanner = qp.passed
            ? `<div class="alert-success"><strong>✅ Đã chinh phục đề này!</strong> Điểm cao nhất của bạn: <strong>${qp.bestScore}/10</strong>. Bạn vẫn có thể thi lại để cải thiện Band điểm.</div>`
            : `<div class="boss-target-box">🎯 <strong>Điều kiện thắng Boss:</strong> Sang phòng <strong>Thi Thật</strong> viết bài hoàn chỉnh (${q.minWords}–${q.maxWords} từ) và đạt từ <strong>6.0 / 10</strong> trở lên khi bấm <em>Chấm Điểm AI</em> → Nhận ngay <strong>+100 XP</strong> và huy hiệu <strong>✅</strong>!</div>`;

        container.innerHTML = `
            <div class="stage-intro">
                <h3><i class="fa-solid fa-trophy"></i> Ải 5: Boss Fight — Ghép Bài & Thi Thật</h3>
                <p>Bạn đã luyện xong từng mảnh ghép từ Ải 1–4. Giờ hãy vào chế độ <strong>Thi Thật</strong> để tự viết trọn vẹn bài luận và chinh phục điểm AI Grader!</p>
            </div>
            ${statusBanner}
            <div class="blueprint-summary">
                <h4>🧩 Tóm tắt cấu trúc bài bạn vừa luyện:</h4>
                <ul>
                    <li><strong>Mở bài:</strong> ${escapeHtml(introFilled)}</li>
                    <li><strong>Thân bài 1:</strong> ${escapeHtml(body1Text)}</li>
                    <li><strong>Thân bài 2 (từ nháp Ải 4):</strong> ${escapeHtml(body2Drafts)}</li>
                    <li><strong>Kết bài mẫu:</strong> ${escapeHtml(q.sampleConclusion.en)}</li>
                </ul>
            </div>
            <div class="stage-actions">
                <button type="button" id="copyDraftToExamBtn" class="btn-secondary">
                    <i class="fa-regular fa-copy"></i> Chép dàn ý câu vào Nháp Thi Thật
                </button>
                <button type="button" id="goToExamBtn" class="btn-primary">
                    <i class="fa-solid fa-pen-to-square"></i> Bắt đầu Thi Thật Ngay
                </button>
            </div>
        `;

        document.getElementById('goToExamBtn').addEventListener('click', () => {
            if (typeof window.switchAppMode === 'function') {
                window.switchAppMode('exam');
            }
        });

        document.getElementById('copyDraftToExamBtn').addEventListener('click', () => {
            const existing = localStorage.getItem(`draft_q_${q.id}`);
            if (existing && !confirm('Đề này đang có bài nháp trong phòng Thi Thật. Bạn có muốn ghi đè bằng dàn ý vừa luyện không?')) {
                return;
            }
            const combinedHtml = [
                `<p>${escapeHtml(introFilled)}</p>`,
                `<p>${escapeHtml(body1Text)}</p>`,
                `<p>${escapeHtml(body2Drafts)}</p>`,
                `<p>${escapeHtml(q.sampleConclusion.en)}</p>`
            ].join('');
            localStorage.setItem(`draft_q_${q.id}`, combinedHtml);
            if (typeof window.loadDraftForQuestion === 'function') {
                window.loadDraftForQuestion(q.id);
            }
            if (typeof window.switchAppMode === 'function') {
                window.switchAppMode('exam');
            }
        });
    }
};
