const PROGRESS_STORAGE_KEY = 'enw493_progress';

const QUEST_SVGS = {
    check: '<svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    lock: '<svg class="icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
    intro: '<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>',
    body1: '<svg class="icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
    body2: '<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>',
    conclusion: '<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>',
    boss: '<svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
    pen: '<svg class="icon icon-md" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
    zap: '<svg class="icon icon-sm" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    info: '<svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    arrowRight: '<svg class="icon icon-sm" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
    arrowUp: '<svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"></polyline></svg>',
    arrowDown: '<svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>',
    spinner: '<svg class="icon icon-sm spin-icon" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>'
};

const STAGE_META = [
    { id: 1, key: 'intro', name: 'Mở bài', xp: 25, icon: QUEST_SVGS.intro, minW: 35, maxW: 65 },
    { id: 2, key: 'body1', name: 'Thân bài 1', xp: 35, icon: QUEST_SVGS.body1, minW: 115, maxW: 185 },
    { id: 3, key: 'body2', name: 'Thân bài 2', xp: 35, icon: QUEST_SVGS.body2, minW: 115, maxW: 185 },
    { id: 4, key: 'conclusion', name: 'Kết bài', xp: 25, icon: QUEST_SVGS.conclusion, minW: 30, maxW: 60 },
    { id: 5, key: 'boss', name: 'Boss Fight', xp: 100, icon: QUEST_SVGS.boss }
];

const RANKS = [
    { minXp: 1200, label: '👑 Trùm Cuối Qua Môn' },
    { minXp: 600, label: '⚡ Chiến Thần Template' },
    { minXp: 200, label: '🧱 Thợ Lắp Ráp PEEL' },
    { minXp: 0, label: '🐣 Tân binh Mất Gốc' }
];

function getTodayIsoDate() {
    return new Date().toISOString().slice(0, 10);
}

function countWords(text) {
    const trimmed = (text || '').trim();
    return trimmed.length > 0 ? trimmed.replace(/\n/g, ' ').split(/\s+/).filter(w => w.length > 0).length : 0;
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
            stageDrafts: { intro: '', body1: '', body2: '', conclusion: '' },
            stageScores: {},
            stageFeedbacks: {}
        };
    }
    const qp = progress.questions[key];
    if (!Array.isArray(qp.completedStages)) qp.completedStages = [];
    if (!qp.unlockedStage) qp.unlockedStage = 1;
    if (!qp.stageDrafts || typeof qp.stageDrafts !== 'object') {
        qp.stageDrafts = { intro: '', body1: '', body2: '', conclusion: '' };
    }
    if (!qp.stageScores || typeof qp.stageScores !== 'object') qp.stageScores = {};
    if (!qp.stageFeedbacks || typeof qp.stageFeedbacks !== 'object') qp.stageFeedbacks = {};
    return qp;
}

function getRankLabel(xp) {
    return (RANKS.find(r => xp >= r.minXp) || RANKS[RANKS.length - 1]).label;
}

function getQuestionStatusInfo(qId) {
    const progress = loadProgress();
    const qp = progress.questions[String(qId)];
    if (!qp) return { status: 'todo', title: 'Chưa làm' };
    if (qp.passed) return { status: 'done', title: 'Đã hoàn thành' };
    const hasDraft = qp.stageDrafts && Object.values(qp.stageDrafts).some(v => (v || '').trim().length > 0);
    if ((qp.completedStages && qp.completedStages.length > 0) || hasDraft || localStorage.getItem(`draft_q_${qId}`)) {
        return { status: 'working', title: 'Đang luyện dở' };
    }
    return { status: 'todo', title: 'Chưa làm' };
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
            // Ignore confetti errors if CDN is blocked
        }
    }

    return { newlyPassed, gainedXp, bestScore: qp.bestScore };
}

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

function getConclusionFormulaHint(framework) {
    const map = {
        A: 'Câu 1: Tóm tắt nguyên nhân chính (In conclusion, X is driven mainly by...). Câu 2: Chốt hướng giải pháp (However, through..., this issue can be addressed).',
        B: 'Câu 1: Tóm tắt ngắn câu trả lời cho cả 2 vế câu hỏi. Câu 2: Đưa ra nhận xét/khuyến nghị kết thúc.',
        C: 'Câu 1: Nhắc lại vấn đề. Câu 2: Chốt rõ lập trường đồng ý / phản đối / đồng ý một phần (không thêm ý mới!).',
        D: 'Câu 1: Công nhận cả 2 quan điểm đều có điểm hợp lý. Câu 2: Chốt lại quan điểm cá nhân (In my opinion, ... because ...).',
        E: 'Câu 1: Tóm tắt lại ưu và nhược điểm. Câu 2: Khẳng định rõ bên nào vượt trội hơn (outweigh) kèm khuyến nghị.'
    };
    return map[framework] || map.A;
}

const QuestMode = {
    currentStage: 1,
    question: null,
    s1Chips: [],
    s1Slots: [],
    s1Checked: false,
    s2LegoItems: [],
    s2SelectedIdx: null,
    s2Verified: false,

    initForQuestion(question, preserveStage = false) {
        this.question = question;
        const progress = loadProgress();
        const qp = getQuestionProgress(progress, question.id);
        if (!preserveStage) {
            this.currentStage = qp.passed ? 5 : Math.min(qp.unlockedStage || 1, 5);
        }
        this.resetWarmupState();
        this.render();
    },

    resetWarmupState() {
        if (!this.question) return;
        const q = this.question;
        const allWords = [...q.stage2Intro.answers, ...q.stage2Intro.distractors];
        this.s1Chips = shuffleArray(allWords).map((word, idx) => ({ id: idx, word, used: false }));
        this.s1Slots = new Array(q.stage2Intro.answers.length).fill(null);
        this.s1Checked = false;

        const indexed = q.stage3Body1.map((item, idx) => ({ ...item, origIndex: idx }));
        this.s2LegoItems = shuffleArray(indexed, true);
        this.s2SelectedIdx = null;
        this.s2Verified = false;
    },

    setStage(stageNum) {
        const progress = loadProgress();
        const qp = getQuestionProgress(progress, this.question.id);
        if (!progress.freePlayMode && stageNum > qp.unlockedStage) {
            return;
        }
        this.currentStage = stageNum;
        if (stageNum === 1) {
            const allWords = [...this.question.stage2Intro.answers, ...this.question.stage2Intro.distractors];
            this.s1Chips = shuffleArray(allWords).map((word, idx) => ({ id: idx, word, used: false }));
            this.s1Slots = new Array(this.question.stage2Intro.answers.length).fill(null);
            this.s1Checked = false;
        } else if (stageNum === 2) {
            const indexed = this.question.stage3Body1.map((item, idx) => ({ ...item, origIndex: idx }));
            this.s2LegoItems = shuffleArray(indexed, true);
            this.s2SelectedIdx = null;
            this.s2Verified = false;
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
                ? QUEST_SVGS.check
                : (isLocked ? QUEST_SVGS.lock : s.icon);
            const savedScore = qp.stageScores[s.id];
            const subLabel = savedScore !== undefined
                ? `Đạt ${savedScore}/10 • +${s.xp} XP`
                : (isLocked ? `Chưa mở • +${s.xp} XP` : `+${s.xp} XP`);

            return `
                <button type="button" class="step-tile ${stateClass}" data-stage="${s.id}" ${isLocked ? 'disabled' : ''}>
                    <span class="stage-badge-box">${iconHtml}</span>
                    <div class="stage-text-group">
                        <span class="stage-title">Ải ${s.id}: ${s.name}</span>
                        <span class="stage-sub">${subLabel}</span>
                    </div>
                </button>
            `;
        }).join('');

        container.innerHTML = `
            <div class="quest-top-card">
                <div class="prompt-headline-row">
                    <div>
                        <div class="badge-cluster">
                            <span class="fw-pill fw-${q.framework}">Khung ${q.framework}: ${escapeHtml(q.frameworkName)}</span>
                            <span class="pill-target">${q.minWords}–${q.maxWords} từ</span>
                        </div>
                        <h2>${escapeHtml(q.title)}</h2>
                    </div>
                    <label class="toggle-label" title="Bỏ qua khóa thứ tự nếu bạn muốn nhảy thẳng vào bất kỳ ải nào">
                        <input type="checkbox" id="freePlayToggle" ${progress.freePlayMode ? 'checked' : ''}>
                        <span>Mở khóa tự do 5 ải</span>
                    </label>
                </div>
                <div class="stepper-grid">${stepperHtml}</div>
            </div>
            <div id="questStageBody" class="stage-card-body"></div>
        `;

        container.querySelectorAll('.step-tile').forEach(btn => {
            btn.addEventListener('click', () => this.setStage(Number(btn.dataset.stage)));
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
        if (this.currentStage === 5) {
            this.renderStage5Boss(stageBody);
        } else {
            this.renderParagraphStage(stageBody, this.currentStage);
        }
    },

    renderParagraphStage(container, stageNum) {
        const q = this.question;
        const meta = STAGE_META.find(s => s.id === stageNum);
        const progress = loadProgress();
        const qp = getQuestionProgress(progress, q.id);

        const stageCopy = {
            1: {
                title: 'Ải 1: Luyện Viết Mở Bài (Introduction)',
                subtitle: 'Đọc đề bài, tham khảo nhanh cấu trúc Paraphrase + Thesis nếu cần, rồi tự tay viết lại Mở bài của riêng bạn.',
                warmupTitle: 'Xem gợi ý Khởi động & Từ khóa mẫu Mở bài (Word Bank)',
                placeholder: 'Tự gõ Mở bài 2–3 câu của bạn tại đây (Paraphrase đề + Thesis statement)...'
            },
            2: {
                title: 'Ải 2: Luyện Viết Thân Bài 1 (Body Paragraph 1)',
                subtitle: 'Viết trọn vẹn đoạn Thân bài 1 theo mạch P → E → E → L. Mở mục xếp Lego bên dưới nếu cần gợi ý thứ tự ý.',
                warmupTitle: 'Xem gợi ý & Xếp Lego PEEL Thân bài 1',
                placeholder: 'Tự viết đoạn Thân bài 1 hoàn chỉnh (Point → Explain → Example → Link)...'
            },
            3: {
                title: 'Ải 3: Luyện Viết Thân Bài 2 (Body Paragraph 2)',
                subtitle: 'Viết trọn vẹn đoạn Thân bài 2 (vế còn lại hoặc giải pháp/phản biện). Mở mục bên dưới để xem gợi ý ý Việt & từ khóa.',
                warmupTitle: 'Xem gợi ý ý Việt, từ khóa & câu mẫu Thân bài 2',
                placeholder: 'Tự viết đoạn Thân bài 2 hoàn chỉnh...'
            },
            4: {
                title: 'Ải 4: Luyện Viết Kết Bài (Conclusion)',
                subtitle: 'Tóm tắt lại 2 thân bài & chốt rõ lập trường cá nhân (không đưa thêm ý mới!).',
                warmupTitle: 'Xem công thức Kết bài chuẩn Khung & Kết bài mẫu',
                placeholder: 'Tự viết Kết bài 2–3 câu (In conclusion / To sum up...)...'
            }
        }[stageNum];

        const draftText = qp.stageDrafts[meta.key] || '';
        const savedScore = qp.stageScores[stageNum];
        const savedFeedback = qp.stageFeedbacks[stageNum] || '';
        const isPassed = qp.completedStages.includes(stageNum);
        const canAdvance = isPassed || progress.freePlayMode;

        const wc = countWords(draftText);
        const wcClass = wc === 0 ? 'wc-low' : (wc < meta.minW ? 'wc-low' : (wc <= meta.maxW + 20 ? 'wc-good' : 'wc-high'));

        container.innerHTML = `
            <div class="stage-header-row">
                <h3>${QUEST_SVGS.pen} ${stageCopy.title}</h3>
                <p>${stageCopy.subtitle}</p>
            </div>

            <div class="prompt-preview-quote">${escapeHtml(q.content)}</div>

            <details class="warmup-fold" id="stageWarmupDetails">
                <summary>
                    <span style="display:flex; align-items:center; gap:8px;">${QUEST_SVGS.info} ${stageCopy.warmupTitle}</span>
                </summary>
                <div class="fold-content" id="stageWarmupBody"></div>
            </details>

            <div class="write-interactive-card">
                <div class="write-card-top">
                    <h4>${meta.icon} Phần Tự Viết Của Bạn (${meta.name})</h4>
                    <span id="stageWordCounter" class="pill-target ${wcClass}">${wc} / ${meta.minW}–${meta.maxW} từ</span>
                </div>
                <div class="creative-freedom-banner">
                    ${QUEST_SVGS.info}
                    <div>
                        <strong>Thoải mái sáng tạo:</strong> Gợi ý mẫu bên trên chỉ để tham khảo cấu trúc. Bạn hoàn toàn có thể tự viết theo ý tưởng và cách diễn đạt riêng — chỉ cần đúng đề, rõ mạch và AI chấm đạt <strong>≥ 6.0/10</strong> là qua ải thành công!
                    </div>
                </div>
                <textarea id="stageEssayInput" class="essay-textarea" rows="${stageNum === 2 || stageNum === 3 ? 7 : 4}" placeholder="${stageCopy.placeholder}">${escapeHtml(draftText)}</textarea>
                <div class="action-tray">
                    <button type="button" id="aiGradeStageBtn" class="btn-hero">
                        ${QUEST_SVGS.zap} AI Chấm ${meta.name} (+${meta.xp} XP)
                    </button>
                    ${canAdvance ? `
                        <button type="button" id="nextStageBtn" class="btn-outline">
                            Sang Ải ${stageNum + 1}: ${STAGE_META[stageNum].name} ${QUEST_SVGS.arrowRight}
                        </button>
                    ` : ''}
                </div>
            </div>

            <div id="stageAiFeedback" class="ai-grade-box" style="display: ${savedFeedback ? 'block' : 'none'};">
                ${savedFeedback ? this.buildFeedbackBannerHtml(savedScore, stageNum, 0) + `<div class="result-content">${savedFeedback}</div>` : ''}
            </div>
        `;

        const warmupBody = document.getElementById('stageWarmupBody');
        if (stageNum === 1) this.renderStage1Warmup(warmupBody);
        else if (stageNum === 2) this.renderStage2Warmup(warmupBody);
        else if (stageNum === 3) this.renderStage3Warmup(warmupBody);
        else if (stageNum === 4) this.renderStage4Warmup(warmupBody);

        const textarea = document.getElementById('stageEssayInput');
        const counterEl = document.getElementById('stageWordCounter');
        textarea.addEventListener('input', () => {
            const val = textarea.value;
            const words = countWords(val);
            counterEl.innerText = `${words} / ${meta.minW}–${meta.maxW} từ`;
            counterEl.classList.remove('wc-low', 'wc-good', 'wc-high');
            counterEl.classList.add(words === 0 || words < meta.minW ? 'wc-low' : (words <= meta.maxW + 20 ? 'wc-good' : 'wc-high'));

            const p = loadProgress();
            const qProg = getQuestionProgress(p, q.id);
            qProg.stageDrafts[meta.key] = val;
            saveProgress(p);
            if (typeof renderQuestionList === 'function') renderQuestionList();
        });

        const nextBtn = document.getElementById('nextStageBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.setStage(stageNum + 1));
        }

        const gradeBtn = document.getElementById('aiGradeStageBtn');
        gradeBtn.addEventListener('click', async () => {
            const text = textarea.value.trim();
            if (countWords(text) < 12) {
                alert(`Đoạn ${meta.name} đang quá ngắn. Hãy tự viết ít nhất vài câu đầy đủ trước khi bấm AI Chấm nhé!`);
                return;
            }

            const fbBox = document.getElementById('stageAiFeedback');
            fbBox.style.display = 'block';
            gradeBtn.disabled = true;
            fbBox.innerHTML = `<div class="inline-spinner">${QUEST_SVGS.spinner} AI đang đọc và chấm phần ${meta.name} của bạn...</div>`;
            setTimeout(() => fbBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);

            const res = await gradeParagraphWithAI({
                sectionType: meta.key,
                question: q,
                paragraphText: text,
                onStatusUpdate: (msg) => {
                    fbBox.innerHTML = `<div class="inline-spinner">${QUEST_SVGS.spinner} ${escapeHtml(msg)}</div>`;
                }
            });

            gradeBtn.disabled = false;

            if (!res.ok) {
                if (res.missingKeys) {
                    fbBox.innerHTML = `<div class="alert-warn">Vui lòng nhập API Key Gemini ở mục <strong>Cấu hình Gemini AI</strong> bên trái để AI chấm đoạn này! (Hoặc bật <em>Mở khóa tự do 5 ải</em> ở góc trên nếu muốn tự luyện không cần AI).</div>`;
                    document.getElementById('aiSettingsDetails')?.setAttribute('open', '');
                } else {
                    fbBox.innerHTML = `<div class="alert-error">Không thể chấm bài: ${escapeHtml(res.errorMsg)}</div>`;
                }
                return;
            }

            const score = parseScoreFromMarkdown(res.text);
            const htmlBody = marked.parse(res.text) + `<div class="ai-model-tag">Chấm đoạn bởi: <strong>${escapeHtml(res.model)}</strong></div>`;

            const p = loadProgress();
            const qProg = getQuestionProgress(p, q.id);
            if (score !== null) qProg.stageScores[stageNum] = score;
            qProg.stageFeedbacks[stageNum] = htmlBody;
            saveProgress(p);

            let gained = 0;
            if (score !== null && score >= 6.0) {
                gained = awardStageCompletion(q.id, stageNum, meta.xp);
            }

            fbBox.innerHTML = this.buildFeedbackBannerHtml(score, stageNum, gained) + `<div class="result-content">${htmlBody}</div>`;
            this.updateStepperHeaderOnly();

            if ((score !== null && score >= 6.0) && !document.getElementById('nextStageBtn')) {
                const actionsRow = container.querySelector('.write-interactive-card .action-tray');
                if (actionsRow) {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.id = 'nextStageBtn';
                    btn.className = 'btn-outline';
                    btn.innerHTML = `Sang Ải ${stageNum + 1}: ${STAGE_META[stageNum].name} ${QUEST_SVGS.arrowRight}`;
                    btn.addEventListener('click', () => this.setStage(stageNum + 1));
                    actionsRow.appendChild(btn);
                }
            }
        });
    },

    buildFeedbackBannerHtml(score, stageNum, gainedXp) {
        if (score === null) return '';
        const meta = STAGE_META.find(s => s.id === stageNum);
        if (score >= 6.0) {
            return `
                <div class="alert-success mb-12">
                    <strong>✅ Đạt chuẩn Ải ${stageNum} (${meta.name}): ${score}/10!</strong>
                    ${gainedXp > 0 ? ` Bạn nhận được <strong>+${gainedXp} XP</strong> và đã mở khóa Ải ${stageNum + 1}!` : ' Đã mở khóa Ải tiếp theo — bạn có thể đi tiếp hoặc sửa lại cho điểm cao hơn.'}
                </div>
            `;
        }
        return `
            <div class="alert-warn mb-12">
                <strong>⚔️ Điểm đoạn hiện tại: ${score}/10</strong> — Cần đạt từ <strong>6.0/10</strong> trở lên để qua Ải ${stageNum}. Hãy xem góp ý bên dưới, sửa lại đoạn văn rồi bấm chấm lại nhé!
            </div>
        `;
    },

    updateStepperHeaderOnly() {
        const q = this.question;
        const progress = loadProgress();
        const qp = getQuestionProgress(progress, q.id);
        const stepper = document.querySelector('.stepper-grid');
        if (!stepper) return;

        stepper.querySelectorAll('.step-tile').forEach(btn => {
            const stId = Number(btn.dataset.stage);
            const meta = STAGE_META.find(s => s.id === stId);
            const isCompleted = qp.completedStages.includes(stId);
            const isActive = this.currentStage === stId;
            const isLocked = !progress.freePlayMode && stId > qp.unlockedStage;

            btn.className = `step-tile ${isActive ? 'active' : (isCompleted ? 'completed' : (isLocked ? 'locked' : ''))}`;
            btn.disabled = isLocked;
            const badge = btn.querySelector('.stage-badge-box');
            if (badge) {
                badge.innerHTML = isCompleted ? QUEST_SVGS.check : (isLocked ? QUEST_SVGS.lock : meta.icon);
            }
            const sub = btn.querySelector('.stage-sub');
            if (sub) {
                const sc = qp.stageScores[stId];
                sub.innerText = sc !== undefined
                    ? `Đạt ${sc}/10 • +${meta.xp} XP`
                    : (isLocked ? `Chưa mở • +${meta.xp} XP` : `+${meta.xp} XP`);
            }
        });
    },

    renderStage1Warmup(container) {
        const q = this.question;
        const fwOptions = Object.keys(FRAMEWORKS_META).map(code => `
            <label class="quiz-option">
                <input type="radio" name="s1Fw" value="${code}">
                <span><strong>Khung ${code}:</strong> ${escapeHtml(FRAMEWORKS_META[code].name)}</span>
            </label>
        `).join('');

        let slotCounter = 0;
        const sentenceHtml = escapeHtml(q.stage2Intro.template).replace(/\{\{\d+\}\}/g, () => {
            const idx = slotCounter++;
            const chipId = this.s1Slots[idx];
            const chip = chipId !== null ? this.s1Chips.find(c => c.id === chipId) : null;
            let cls = 'blank-slot';
            if (chip) cls += ' filled';
            if (this.s1Checked && chip) {
                cls += chip.word === q.stage2Intro.answers[idx] ? ' correct' : ' wrong';
            } else if (this.s1Checked && !chip) {
                cls += ' wrong';
            }
            return `<button type="button" class="${cls}" data-slot-idx="${idx}">${chip ? escapeHtml(chip.word) : `(${idx + 1})`}</button>`;
        });

        const chipsHtml = this.s1Chips.map(chip => `
            <button type="button" class="chip-button ${chip.used ? 'used' : ''}" data-chip-id="${chip.id}" ${chip.used ? 'disabled' : ''}>
                ${escapeHtml(chip.word)}
            </button>
        `).join('');

        container.innerHTML = `
            <div class="warmup-subsection">
                <h4>1. Soi nhanh Khung & Số từ</h4>
                <div class="quiz-grid">
                    <div class="quiz-options">${fwOptions}</div>
                    <div class="quiz-options">
                        <label class="quiz-option"><input type="radio" name="s1Words" value="350-400"><span><strong>350 – 400 từ</strong></span></label>
                        <label class="quiz-option"><input type="radio" name="s1Words" value="450-500"><span><strong>450 – 500 từ</strong></span></label>
                        <button type="button" id="checkS1QuizBtn" class="btn-outline mt-8">Kiểm tra Soi Đề</button>
                        <div id="s1QuizMsg"></div>
                    </div>
                </div>
            </div>
            <div class="warmup-subsection">
                <h4>2. Lắp ráp Mở bài mẫu (Click từ điền vào chỗ trống)</h4>
                <div class="fill-blank-box">${sentenceHtml}</div>
                <div class="chips-container">${chipsHtml}</div>
                <div id="s1ChipMsg" class="mt-8"></div>
                <div class="action-tray mt-8">
                    <button type="button" id="resetS1ChipsBtn" class="btn-outline">Đặt lại</button>
                    <button type="button" id="checkS1ChipsBtn" class="btn-outline">Kiểm tra Mở bài mẫu</button>
                </div>
            </div>
        `;

        document.getElementById('checkS1QuizBtn').addEventListener('click', () => {
            const fw = container.querySelector('input[name="s1Fw"]:checked');
            const wr = container.querySelector('input[name="s1Words"]:checked');
            const msg = document.getElementById('s1QuizMsg');
            if (!fw || !wr) {
                msg.innerHTML = `<div class="alert-warn mt-8">Chọn đủ 2 ý nhé!</div>`;
                return;
            }
            msg.innerHTML = (fw.value === q.framework && wr.value === `${q.minWords}-${q.maxWords}`)
                ? `<div class="alert-success mt-8">Chuẩn! Khung ${q.framework} (${q.minWords}–${q.maxWords} từ).</div>`
                : `<div class="alert-error mt-8">Chưa khớp, hãy đọc lại câu hỏi cuối của đề!</div>`;
        });

        container.querySelectorAll('.chip-button').forEach(btn => {
            btn.addEventListener('click', () => {
                const chipId = Number(btn.dataset.chipId);
                const emptyIdx = this.s1Slots.findIndex(v => v === null);
                if (emptyIdx === -1) return;
                const chip = this.s1Chips.find(c => c.id === chipId);
                if (!chip || chip.used) return;
                chip.used = true;
                this.s1Slots[emptyIdx] = chipId;
                this.s1Checked = false;
                this.renderStage1Warmup(container);
            });
        });

        container.querySelectorAll('.blank-slot').forEach(btn => {
            btn.addEventListener('click', () => {
                const slotIdx = Number(btn.dataset.slotIdx);
                const chipId = this.s1Slots[slotIdx];
                if (chipId === null) return;
                const chip = this.s1Chips.find(c => c.id === chipId);
                if (chip) chip.used = false;
                this.s1Slots[slotIdx] = null;
                this.s1Checked = false;
                this.renderStage1Warmup(container);
            });
        });

        document.getElementById('resetS1ChipsBtn').addEventListener('click', () => {
            this.s1Chips.forEach(c => { c.used = false; });
            this.s1Slots = new Array(q.stage2Intro.answers.length).fill(null);
            this.s1Checked = false;
            this.renderStage1Warmup(container);
        });

        document.getElementById('checkS1ChipsBtn').addEventListener('click', () => {
            this.s1Checked = true;
            const ok = this.s1Slots.every((cid, i) => {
                const chip = this.s1Chips.find(c => c.id === cid);
                return chip && chip.word === q.stage2Intro.answers[i];
            });
            this.renderStage1Warmup(container);
            const msg = document.getElementById('s1ChipMsg');
            msg.innerHTML = ok
                ? `<div class="alert-success">Chính xác! <strong>Dịch:</strong> ${escapeHtml(q.stage2Intro.viTranslation)}</div>`
                : `<div class="alert-warn">Có ô chưa đúng (viền đỏ) — thử đổi lại nhé!</div>`;
        });
    },

    renderStage2Warmup(container) {
        const q = this.question;
        const allSolved = this.s2Verified && this.s2LegoItems.every((it, i) => it.origIndex === i);

        const itemsHtml = this.s2LegoItems.map((item, idx) => {
            const isCorrectPos = this.s2Verified && item.origIndex === idx;
            const isWrongPos = this.s2Verified && item.origIndex !== idx;
            const isSelected = this.s2SelectedIdx === idx;
            return `
                <div class="lego-card ${isSelected ? 'selected' : ''} ${isCorrectPos ? 'correct' : ''} ${isWrongPos ? 'wrong' : ''}" data-idx="${idx}">
                    <div class="lego-index">${idx + 1}</div>
                    <div class="lego-body">
                        ${allSolved ? `<span class="peel-badge">${escapeHtml(item.role)}</span>` : ''}
                        <div class="lego-en">${escapeHtml(item.en)}</div>
                        ${allSolved ? `<div class="lego-vi">→ ${escapeHtml(item.vi)}</div>` : ''}
                    </div>
                    <div class="lego-controls">
                        <button type="button" class="btn-move" data-dir="up" data-idx="${idx}" ${idx === 0 ? 'disabled' : ''}>${QUEST_SVGS.arrowUp}</button>
                        <button type="button" class="btn-move" data-dir="down" data-idx="${idx}" ${idx === this.s2LegoItems.length - 1 ? 'disabled' : ''}>${QUEST_SVGS.arrowDown}</button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <p class="warmup-desc">Sắp xếp nhanh các câu Thân bài 1 theo mạch <strong>Point → Explain → Example → Link</strong> để nắm bố cục trước khi tự viết:</p>
            <div class="lego-list">${itemsHtml}</div>
            <div id="s2LegoMsg"></div>
            <div class="action-tray">
                <button type="button" id="shuffleS2LegoBtn" class="btn-outline">Xáo lại</button>
                <button type="button" id="checkS2LegoBtn" class="btn-outline">Kiểm tra thứ tự PEEL</button>
            </div>
        `;

        container.querySelectorAll('.btn-move').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = Number(btn.dataset.idx);
                const target = btn.dataset.dir === 'up' ? idx - 1 : idx + 1;
                if (target < 0 || target >= this.s2LegoItems.length) return;
                [this.s2LegoItems[idx], this.s2LegoItems[target]] = [this.s2LegoItems[target], this.s2LegoItems[idx]];
                this.s2SelectedIdx = null;
                this.s2Verified = false;
                this.renderStage2Warmup(container);
            });
        });

        container.querySelectorAll('.lego-card').forEach(card => {
            card.addEventListener('click', () => {
                const idx = Number(card.dataset.idx);
                if (this.s2SelectedIdx === null) {
                    this.s2SelectedIdx = idx;
                } else if (this.s2SelectedIdx === idx) {
                    this.s2SelectedIdx = null;
                } else {
                    [this.s2LegoItems[this.s2SelectedIdx], this.s2LegoItems[idx]] = [this.s2LegoItems[idx], this.s2LegoItems[this.s2SelectedIdx]];
                    this.s2SelectedIdx = null;
                    this.s2Verified = false;
                }
                this.renderStage2Warmup(container);
            });
        });

        document.getElementById('shuffleS2LegoBtn').addEventListener('click', () => {
            const indexed = q.stage3Body1.map((item, idx) => ({ ...item, origIndex: idx }));
            this.s2LegoItems = shuffleArray(indexed, true);
            this.s2SelectedIdx = null;
            this.s2Verified = false;
            this.renderStage2Warmup(container);
        });

        document.getElementById('checkS2LegoBtn').addEventListener('click', () => {
            this.s2Verified = true;
            this.s2SelectedIdx = null;
            const correctCount = this.s2LegoItems.filter((it, idx) => it.origIndex === idx).length;
            this.renderStage2Warmup(container);
            const msg = document.getElementById('s2LegoMsg');
            msg.innerHTML = correctCount === this.s2LegoItems.length
                ? `<div class="alert-success">Chuẩn PEEL! Giờ bạn có thể tự diễn đạt Thân bài 1 theo ý mình ở ô viết bên dưới.</div>`
                : `<div class="alert-warn">Đúng ${correctCount}/${this.s2LegoItems.length} vị trí (viền xanh). Thử đảo lại các câu viền đỏ nhé!</div>`;
        });
    },

    renderStage3Warmup(container) {
        const q = this.question;
        const itemsHtml = q.stage4Body2.map((item, idx) => {
            const kwHtml = (item.keywords || []).map(k => `<span class="kw-chip">${escapeHtml(k)}</span>`).join('');
            return `
                <div class="warmup-idea-row">
                    <div>
                        <span class="peel-badge">${escapeHtml(item.role)}</span>
                        <strong>${escapeHtml(item.vi)}</strong>
                    </div>
                    <div class="stage4-keywords">Từ khóa: ${kwHtml}</div>
                    <button type="button" class="btn-outline btn-mini-sample" data-idx="${idx}">Xem câu mẫu</button>
                    <div class="stage4-sample" id="s3WarmSample_${idx}" style="display: none;">${escapeHtml(item.sample)}</div>
                </div>
            `;
        }).join('');

        container.innerHTML = `<div class="warmup-idea-list">${itemsHtml}</div>`;
        container.querySelectorAll('.btn-mini-sample').forEach(btn => {
            btn.addEventListener('click', () => {
                const box = document.getElementById(`s3WarmSample_${btn.dataset.idx}`);
                if (!box) return;
                const show = box.style.display === 'none';
                box.style.display = show ? 'block' : 'none';
                btn.innerText = show ? 'Ẩn mẫu' : 'Xem câu mẫu';
            });
        });
    },

    renderStage4Warmup(container) {
        const q = this.question;
        container.innerHTML = `
            <div class="warmup-idea-row">
                <div><strong>📐 Công thức Kết bài (Khung ${q.framework}):</strong> ${escapeHtml(getConclusionFormulaHint(q.framework))}</div>
                <button type="button" id="toggleConclSampleBtn" class="btn-outline mt-8">Xem Kết bài mẫu</button>
                <div class="stage4-sample" id="conclSampleBox" style="display: none;">
                    <div><strong>EN:</strong> ${escapeHtml(q.sampleConclusion.en)}</div>
                    <div class="mt-8"><strong>VI:</strong> ${escapeHtml(q.sampleConclusion.vi)}</div>
                </div>
            </div>
        `;
        document.getElementById('toggleConclSampleBtn').addEventListener('click', (e) => {
            const box = document.getElementById('conclSampleBox');
            const show = box.style.display === 'none';
            box.style.display = show ? 'block' : 'none';
            e.currentTarget.innerText = show ? 'Ẩn Kết bài mẫu' : 'Xem Kết bài mẫu';
        });
    },

    renderStage5Boss(container) {
        const q = this.question;
        const progress = loadProgress();
        const qp = getQuestionProgress(progress, q.id);

        const sections = [
            { id: 1, key: 'intro', label: 'Mở bài' },
            { id: 2, key: 'body1', label: 'Thân bài 1' },
            { id: 3, key: 'body2', label: 'Thân bài 2' },
            { id: 4, key: 'conclusion', label: 'Kết bài' }
        ];

        const sectionCardsHtml = sections.map(sec => {
            const text = (qp.stageDrafts[sec.key] || '').trim();
            const score = qp.stageScores[sec.id];
            const passed = qp.completedStages.includes(sec.id);
            const wc = countWords(text);
            return `
                <div class="boss-section-card ${passed ? 'done' : ''}">
                    <div class="boss-sec-head">
                        <strong>${passed ? '✅' : '📝'} Ải ${sec.id}: ${sec.label}</strong>
                        <span>${score !== undefined ? `${score}/10` : `${wc} từ`}</span>
                    </div>
                    <p class="boss-sec-preview">${text ? escapeHtml(text.slice(0, 150) + (text.length > 150 ? '...' : '')) : '<em>Chưa viết đoạn này</em>'}</p>
                </div>
            `;
        }).join('');

        const statusBanner = qp.passed
            ? `<div class="alert-success"><strong>✅ Đã chinh phục đề này!</strong> Điểm cao nhất: <strong>${qp.bestScore}/10</strong>. Bạn vẫn có thể luyện lại để nâng Band điểm.</div>`
            : `<div class="boss-target-box">🎯 <strong>Điều kiện thắng Boss:</strong> Ghép 4 đoạn bạn vừa viết (hoặc viết mới hoàn toàn) vào phòng <strong>Thi Thật</strong>, đạt từ <strong>6.0 / 10</strong> từ AI Grader toàn bài → Nhận ngay <strong>+100 XP</strong> và Huy hiệu <strong>✅</strong>!</div>`;

        container.innerHTML = `
            <div class="stage-header-row">
                <h3>${QUEST_SVGS.boss} Ải 5: Boss Fight — Ghép Bài Bạn Viết & Thi Thật</h3>
                <p>Xem lại 4 đoạn bạn đã tự viết ở Ải 1–4. Hãy ghép chúng sang phòng Thi Thật để rà soát liên kết cả bài rồi bấm <strong>Chấm Điểm AI</strong>!</p>
            </div>
            ${statusBanner}
            <div class="boss-sections-grid">${sectionCardsHtml}</div>
            <div class="action-tray">
                <button type="button" id="goToExamBtn" class="btn-outline">Vào Thi Thật (Giữ nháp hiện tại)</button>
                <button type="button" id="mergeUserEssayBtn" class="btn-hero">
                    ${QUEST_SVGS.zap} Ghép 4 đoạn tôi vừa viết vào Thi Thật
                </button>
            </div>
        `;

        document.getElementById('goToExamBtn').addEventListener('click', () => {
            if (typeof window.switchAppMode === 'function') {
                window.switchAppMode('exam');
            }
        });

        document.getElementById('mergeUserEssayBtn').addEventListener('click', () => {
            const parts = sections
                .map(s => (qp.stageDrafts[s.key] || '').trim())
                .filter(Boolean);

            if (parts.length === 0) {
                alert('Bạn chưa viết đoạn nào ở Ải 1–4 cả! Hãy viết ít nhất một đoạn ở các ải trước hoặc bấm "Vào Thi Thật" để viết thẳng.');
                return;
            }

            const existing = localStorage.getItem(`draft_q_${q.id}`);
            if (existing && !confirm('Phòng Thi Thật của đề này đang có bài nháp. Bạn có muốn thay thế bằng 4 đoạn bạn vừa viết ở Leo Ải không?')) {
                return;
            }

            const combinedHtml = parts.map(p => `<p>${escapeHtml(p)}</p>`).join('');
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
