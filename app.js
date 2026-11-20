let currentQuestion = null;
let currentMode = 'quest'; // 'quest' | 'exam'
let currentFilter = 'ALL';
let quill;
let timerInterval;
let timeLeft = 3600; // 60 minutes in seconds
let draftSaveTimer = null;
let isRestoringDraft = false;

const APP_SVGS = {
    play: '<svg class="icon icon-sm" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
    pause: '<svg class="icon icon-sm" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',
    done: '<svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    working: '<svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>',
    todo: '<svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>',
    spinner: '<svg class="icon icon-sm spin-icon" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initQuill();
    initFrameworkFilter();
    renderQuestionList();
    initTimer();
    setupEventListeners();
    refreshGamificationUI();

    const savedKeys = localStorage.getItem('apiKeys');
    const savedModel = localStorage.getItem('customModel');
    const modelInput = document.getElementById('modelInput');
    if (modelInput && savedModel) {
        modelInput.value = savedModel;
    }

    const details = document.getElementById('aiSettingsDetails');
    if (savedKeys) {
        document.getElementById('apiKeys').value = savedKeys;
        details.removeAttribute('open');
    } else {
        details.setAttribute('open', '');
    }

    if (QUESTIONS_DATA.length > 0) {
        selectQuestion(QUESTIONS_DATA[0].id);
    }
    switchAppMode('quest');
});

function initQuill() {
    const FontStyle = Quill.import('attributors/style/font');
    FontStyle.whitelist = ['arial', 'times-new-roman', 'courier-new', 'verdana', 'tahoma'];
    Quill.register(FontStyle, true);

    const SizeStyle = Quill.import('attributors/style/size');
    SizeStyle.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '32px'];
    Quill.register(SizeStyle, true);

    quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Bắt đầu viết bài luận của bạn tại đây... (Hệ thống tự động lưu nháp mỗi 1 giây)',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'font': FontStyle.whitelist }],
                [{ 'size': SizeStyle.whitelist }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['clean']
            ]
        }
    });

    quill.root.setAttribute('spellcheck', false);

    quill.on('text-change', () => {
        updateWordCount();
        if (!isRestoringDraft) {
            scheduleDraftSave();
        }
    });
}

function updateWordCount() {
    const text = quill.getText().trim();
    const wordCount = text.length > 0 ? text.replace(/\n/g, ' ').split(/\s+/).filter(w => w.length > 0).length : 0;
    const badge = document.getElementById('wordCount');
    if (!badge) return;

    badge.classList.remove('wc-low', 'wc-good', 'wc-high');
    if (currentQuestion) {
        const minW = currentQuestion.minWords || 350;
        const maxW = currentQuestion.maxWords || 400;
        badge.innerText = `${wordCount} / ${minW}–${maxW} từ`;
        if (wordCount === 0 || wordCount < minW) {
            badge.classList.add('wc-low');
        } else if (wordCount <= maxW + 50) {
            badge.classList.add('wc-good');
        } else {
            badge.classList.add('wc-high');
        }
    } else {
        badge.innerText = `${wordCount} từ`;
    }
}

function scheduleDraftSave() {
    if (!currentQuestion) return;
    const statusEl = document.getElementById('draftSaveStatus');
    if (statusEl) statusEl.innerText = 'Đang lưu...';

    if (draftSaveTimer) clearTimeout(draftSaveTimer);
    const qId = currentQuestion.id;
    draftSaveTimer = setTimeout(() => {
        const plainText = quill.getText().trim();
        if (plainText.length === 0) {
            localStorage.removeItem(`draft_q_${qId}`);
            if (statusEl) statusEl.innerText = '';
        } else {
            localStorage.setItem(`draft_q_${qId}`, quill.root.innerHTML);
            if (statusEl) statusEl.innerText = '✓ Đã lưu nháp';
        }
        renderQuestionList();
    }, 1000);
}

function loadDraftForQuestion(qId) {
    if (!quill) return;
    if (draftSaveTimer) {
        clearTimeout(draftSaveTimer);
        draftSaveTimer = null;
    }
    const savedDraft = localStorage.getItem(`draft_q_${qId}`);
    const statusEl = document.getElementById('draftSaveStatus');

    isRestoringDraft = true;
    if (savedDraft) {
        quill.root.innerHTML = savedDraft;
        if (statusEl) statusEl.innerText = '✓ Đã tải nháp';
    } else {
        quill.setText('');
        if (statusEl) statusEl.innerText = '';
    }
    isRestoringDraft = false;
    updateWordCount();
}
window.loadDraftForQuestion = loadDraftForQuestion;

function initFrameworkFilter() {
    const filterContainer = document.getElementById('frameworkFilter');
    if (!filterContainer) return;
    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.fw || 'ALL';
            filterContainer.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.toggle('active', b === btn);
            });
            renderQuestionList();
        });
    });
}

function renderQuestionList() {
    const qList = document.getElementById('qList');
    if (!qList) return;
    qList.innerHTML = '';

    const filtered = currentFilter === 'ALL'
        ? QUESTIONS_DATA
        : QUESTIONS_DATA.filter(q => q.framework === currentFilter);

    const countTag = document.getElementById('questionCountTag');
    if (countTag) countTag.innerText = `${filtered.length} đề`;

    filtered.forEach(q => {
        const li = document.createElement('li');
        li.className = 'q-card-item';
        li.dataset.id = q.id;
        if (currentQuestion && currentQuestion.id === q.id) {
            li.classList.add('active');
        }
        const statusInfo = getQuestionStatusInfo(q.id);
        li.innerHTML = `
            <div class="q-meta-left">
                <span class="fw-pill fw-${q.framework}">${q.framework}</span>
                <span class="q-title-text">${escapeHtml(q.title)}</span>
            </div>
            <span class="badge-status-dot status-${statusInfo.status}" title="${statusInfo.title}">
                ${APP_SVGS[statusInfo.status]}
            </span>
        `;
        li.onclick = () => selectQuestion(q.id);
        qList.appendChild(li);
    });
}

function refreshGamificationUI() {
    const progress = loadProgress();
    const total = QUESTIONS_DATA.length;
    const passedCount = QUESTIONS_DATA.filter(q => progress.questions[String(q.id)]?.passed).length;
    const percent = total > 0 ? Math.round((passedCount / total) * 100) : 0;

    const xpEl = document.getElementById('xpValue');
    const rankEl = document.getElementById('rankBadge');
    const textEl = document.getElementById('progressText');
    const pctEl = document.getElementById('progressPercent');
    const fillEl = document.getElementById('progressBarFill');

    if (xpEl) xpEl.innerText = progress.xp;
    if (rankEl) rankEl.innerText = getRankLabel(progress.xp);
    if (textEl) textEl.innerText = `Đã chinh phục: ${passedCount}/${total} đề`;
    if (pctEl) pctEl.innerText = `${percent}%`;
    if (fillEl) fillEl.style.width = `${percent}%`;

    renderQuestionList();
}
window.refreshGamificationUI = refreshGamificationUI;

function selectQuestion(id) {
    currentQuestion = QUESTIONS_DATA.find(q => q.id === id);
    if (!currentQuestion) return;

    document.querySelectorAll('#qList li').forEach(li => {
        li.classList.toggle('active', Number(li.dataset.id) === id);
    });

    document.getElementById('currentQTitle').innerText = currentQuestion.title;
    const metaEl = document.getElementById('currentQMeta');
    if (metaEl) {
        metaEl.innerHTML = `
            <span class="fw-pill fw-${currentQuestion.framework}">Khung ${currentQuestion.framework}: ${escapeHtml(currentQuestion.frameworkName)}</span>
            <span class="pill-target">${currentQuestion.minWords}–${currentQuestion.maxWords} từ</span>
        `;
    }
    document.getElementById('promptContent').innerText = currentQuestion.content;

    loadDraftForQuestion(id);
    const savedQid = localStorage.getItem('savedFeedbackQid');
    const savedFeedback = localStorage.getItem('savedFeedback');
    const inlineResult = document.getElementById('inlineResultSection');

    if (Number(savedQid) === id && savedFeedback) {
        inlineResult.style.display = 'block';
        document.getElementById('resultContent').innerHTML = savedFeedback;
    } else {
        inlineResult.style.display = 'none';
    }

    const hintBox = document.getElementById('aiHintBox');
    if (hintBox) hintBox.style.display = 'none';

    QuestMode.initForQuestion(currentQuestion);
    renderHintDrawer();
}

function renderHintDrawer() {
    const body = document.getElementById('hintDrawerBody');
    if (!body || !currentQuestion) return;
    const q = currentQuestion;
    const fwInfo = FRAMEWORKS_META[q.framework] || {};

    const vocabItems = (q.quickHints?.vocab || []).map(v => `<li>${escapeHtml(v)}</li>`).join('');
    const b1Items = (q.quickHints?.body1Vi || []).map(v => `<li>${escapeHtml(v)}</li>`).join('');
    const b2Items = (q.quickHints?.body2Vi || []).map(v => `<li>${escapeHtml(v)}</li>`).join('');

    body.innerHTML = `
        <div class="drawer-card">
            <span class="fw-pill fw-${q.framework}">Khung ${q.framework}: ${escapeHtml(q.frameworkName)}</span>
            <p class="mt-8" style="color: var(--text-muted); font-size: 0.82rem;">${escapeHtml(fwInfo.vi || '')}</p>
            ${q.quickHints?.stance ? `<div class="drawer-stance"><strong>🧭 Chiến thuật:</strong> ${escapeHtml(q.quickHints.stance)}</div>` : ''}
        </div>
        <div class="drawer-card">
            <h4>Thân bài 1 (Ý chính)</h4>
            <ul>${b1Items}</ul>
        </div>
        <div class="drawer-card">
            <h4>Thân bài 2 (Ý chính)</h4>
            <ul>${b2Items}</ul>
        </div>
        <div class="drawer-card">
            <h4>Từ vựng ăn điểm</h4>
            <ul>${vocabItems}</ul>
        </div>
        <div class="drawer-card">
            <h4>Từ nối khuyên dùng</h4>
            <p style="font-size: 0.82rem; line-height: 1.6;">
                <strong>Mở ý:</strong> One major reason is... / Firstly,<br>
                <strong>Giải thích:</strong> This is because... / Consequently,<br>
                <strong>Ví dụ:</strong> For instance, ... / For example,<br>
                <strong>Tương phản:</strong> However, / On the other hand,<br>
                <strong>Kết luận:</strong> In conclusion, / To sum up,
            </p>
        </div>
    `;
}

function switchAppMode(mode) {
    currentMode = mode === 'exam' ? 'exam' : 'quest';
    const questBtn = document.getElementById('tabQuestMode');
    const examBtn = document.getElementById('tabExamMode');
    const questBox = document.getElementById('questModeContainer');
    const examBox = document.getElementById('examModeContainer');

    if (questBtn) questBtn.classList.toggle('active', currentMode === 'quest');
    if (examBtn) examBtn.classList.toggle('active', currentMode === 'exam');
    if (questBox) questBox.style.display = currentMode === 'quest' ? 'flex' : 'none';
    if (examBox) examBox.style.display = currentMode === 'exam' ? 'flex' : 'none';

    const workspace = document.querySelector('.workspace-area');
    if (workspace) workspace.scrollTop = 0;
}
window.switchAppMode = switchAppMode;

function initTimer() {
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById('timeDisplay').innerText = `${m}:${s}`;
}

function toggleTimer() {
    const btn = document.getElementById('startTimerBtn');
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        btn.innerHTML = APP_SVGS.play;
    } else {
        btn.innerHTML = APP_SVGS.pause;
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert('Hết giờ làm bài!');
                btn.innerHTML = APP_SVGS.play;
            }
        }, 1000);
    }
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('startTimerBtn').innerHTML = APP_SVGS.play;
    }
    timeLeft = 3600;
    updateTimerDisplay();
}

function setupEventListeners() {
    document.getElementById('startTimerBtn').addEventListener('click', toggleTimer);
    document.getElementById('resetTimerBtn').addEventListener('click', resetTimer);

    const modelInput = document.getElementById('modelInput');
    if (modelInput) {
        modelInput.addEventListener('input', () => {
            localStorage.setItem('customModel', normalizeModelName(modelInput.value));
        });
    }

    document.getElementById('tabQuestMode').addEventListener('click', () => switchAppMode('quest'));
    document.getElementById('tabExamMode').addEventListener('click', () => switchAppMode('exam'));

    document.getElementById('submitBtn').addEventListener('click', gradeEssay);
    document.getElementById('closeResultBtn').addEventListener('click', () => {
        document.getElementById('inlineResultSection').style.display = 'none';
        localStorage.removeItem('savedFeedback');
        localStorage.removeItem('savedFeedbackQid');
    });

    document.getElementById('clearDraftBtn').addEventListener('click', () => {
        if (!currentQuestion) return;
        if (quill.getText().trim().length === 0) return;
        if (!confirm(`Bạn có chắc muốn xóa bài nháp của ${currentQuestion.code}?`)) return;
        localStorage.removeItem(`draft_q_${currentQuestion.id}`);
        isRestoringDraft = true;
        quill.setText('');
        isRestoringDraft = false;
        const statusEl = document.getElementById('draftSaveStatus');
        if (statusEl) statusEl.innerText = '';
        updateWordCount();
        renderQuestionList();
    });

    document.getElementById('aiHintBtn').addEventListener('click', askAiWritingHint);
    document.getElementById('closeAiHintBtn').addEventListener('click', () => {
        document.getElementById('aiHintBox').style.display = 'none';
    });

    const hintDrawer = document.getElementById('hintDrawer');
    document.getElementById('toggleHintDrawerBtn').addEventListener('click', () => {
        const isOpen = hintDrawer.classList.toggle('open');
        document.body.classList.toggle('hint-drawer-open', isOpen);
    });
    document.getElementById('closeHintDrawerBtn').addEventListener('click', () => {
        hintDrawer.classList.remove('open');
        document.body.classList.remove('hint-drawer-open');
    });
}

async function askAiWritingHint() {
    if (!currentQuestion) return;
    const keys = getApiKeys();
    if (keys.length === 0) {
        alert('Vui lòng nhập ít nhất một API Key của Gemini ở mục Cấu hình Gemini AI (bên trái)!');
        document.getElementById('aiSettingsDetails').setAttribute('open', '');
        return;
    }

    const hintBox = document.getElementById('aiHintBox');
    const hintContent = document.getElementById('aiHintContent');
    const btn = document.getElementById('aiHintBtn');

    hintBox.style.display = 'block';
    btn.disabled = true;
    hintContent.innerHTML = `<div class="inline-spinner">${APP_SVGS.spinner} AI đang đọc bài viết dở và nghĩ ý tiếp theo...</div>`;
    setTimeout(() => hintBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);

    const res = await getWritingHintWithAI({
        promptText: currentQuestion.content,
        currentEssay: quill.getText().trim(),
        onStatusUpdate: (msg) => {
            hintContent.innerHTML = `<div class="inline-spinner">${APP_SVGS.spinner} ${escapeHtml(msg)}</div>`;
        }
    });

    btn.disabled = false;
    if (res.ok) {
        hintContent.innerHTML = marked.parse(res.text) + `<div class="ai-model-tag">Gợi ý bởi: ${escapeHtml(res.model)}</div>`;
    } else {
        hintContent.innerHTML = `<div class="alert-error">Không thể lấy gợi ý AI: ${escapeHtml(res.errorMsg)}</div>`;
    }
}

async function gradeEssay() {
    if (currentMode !== 'exam') {
        switchAppMode('exam');
    }

    const keys = getApiKeys();
    if (keys.length === 0) {
        alert('Vui lòng nhập ít nhất một API Key của Gemini ở mục Cấu hình Gemini AI (bên trái)!');
        document.getElementById('aiSettingsDetails').setAttribute('open', '');
        return;
    }

    const text = quill.getText().trim();
    if (text.length < 20) {
        alert('Bài viết quá ngắn. Hãy viết bài vào khung soạn thảo trước khi bấm Chấm Điểm AI.');
        return;
    }

    const promptText = currentQuestion.content;
    const customModel = getCustomModel();
    const isCustomMode = customModel.length > 0;

    const resultSection = document.getElementById('inlineResultSection');
    const content = document.getElementById('resultContent');
    resultSection.style.display = 'block';

    setTimeout(() => {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    content.innerHTML = `
        <div class="loader-container">
            <div class="spinner"></div>
            <h3>AI đang phân tích bài viết...</h3>
            <p>Quá trình này có thể mất từ 5 - 15 giây.</p>
            <p><small id="modelIndicator">${isCustomMode ? `Đang chuẩn bị model: ${escapeHtml(customModel)}` : 'Đang dò tìm model AI phù hợp...'}</small></p>
        </div>
    `;

    const res = await gradeEssayWithAI(promptText, text, (statusMsg) => {
        const indicator = document.getElementById('modelIndicator');
        if (indicator) indicator.innerText = statusMsg;
    });

    if (res.ok) {
        const parsedScore = parseScoreFromMarkdown(res.text);
        const bossResult = recordBossFightResult(currentQuestion.id, parsedScore);

        let bossBanner = '';
        if (parsedScore !== null && parsedScore >= 6.0) {
            bossBanner = `
                <div class="boss-victory-banner">
                    🎉 <strong>CHINH PHỤC BOSS THÀNH CÔNG!</strong> Điểm tổng: <strong>${parsedScore}/10</strong> (Đạt chuẩn ≥ 6.0)
                    ${bossResult.gainedXp > 0 ? ` — Nhận thưởng <strong>+${bossResult.gainedXp} XP</strong> & Huy hiệu ✅!` : ' — Đã cập nhật kỷ lục điểm!'}
                </div>
            `;
        } else if (parsedScore !== null) {
            bossBanner = `
                <div class="boss-retry-banner">
                    ⚔️ Điểm lần này: <strong>${parsedScore}/10</strong> — Cần từ <strong>6.0/10</strong> để qua Ải Boss Fight. Xem lỗi sai bên dưới và sửa lại nhé!
                </div>
            `;
        }

        const finalHtml = bossBanner
            + marked.parse(res.text)
            + `<div style="margin-top: 20px; font-size: 0.8rem; color: var(--text-muted); padding-top: 10px; border-top: 1px solid var(--border-soft);">Chấm điểm bởi: <strong>${escapeHtml(res.model)}</strong></div>`;

        content.innerHTML = finalHtml;
        localStorage.setItem('savedFeedback', finalHtml);
        localStorage.setItem('savedFeedbackQid', currentQuestion.id);
    } else {
        const modelNotice = res.isCustomMode
            ? `<p><strong>Model đã chọn:</strong> <code>${escapeHtml(res.customModel)}</code></p>`
            : '';
        const modelFixTip = res.isCustomMode
            ? `<li>Kiểm tra lại tên model <code>${escapeHtml(res.customModel)}</code> xem có gõ đúng không (VD: <code>gemini-4-hydrogen</code>, <code>gemini-3.8-flash</code>), hoặc xóa trống ô Model để hệ thống tự dò.</li>`
            : '';
        content.innerHTML = `
            <div class="alert-error" style="padding: 20px;">
                <h3 style="margin-top: 0; margin-bottom: 10px;">⚠️ Lỗi Chấm Điểm</h3>
                <p>Không thể kết nối với API bằng các Key được cung cấp.</p>
                ${modelNotice}
                <p><strong>Chi tiết lỗi từ máy chủ:</strong> ${escapeHtml(res.errorMsg)}</p>
                <hr style="border-color: var(--rose-border); margin: 14px 0;">
                <p><strong>Gợi ý cách khắc phục:</strong></p>
                <ul style="margin-bottom: 0; padding-left: 20px;">
                    ${modelFixTip}
                    <li>Kiểm tra lại <strong>API Key</strong> (đảm bảo copy chính xác Key Gemini).</li>
                    <li>Key có thể đã hết hạn mức (Quota) hoặc bị vô hiệu hóa.</li>
                </ul>
            </div>
        `;
    }
}
