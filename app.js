let currentQuestion = null;
let currentMode = 'quest'; // 'quest' | 'exam'
let currentFilter = 'ALL';
let quill;
let timerInterval;
let timeLeft = 3600; // 60 minutes in seconds
let draftSaveTimer = null;
let isRestoringDraft = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initQuill();
    initFrameworkFilter();
    renderQuestionList();
    initTimer();
    setupEventListeners();
    refreshGamificationUI();

    // Load saved AI settings
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

    // Select first question and default to Quest Mode
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
        if (wordCount === 0) {
            badge.classList.add('wc-low');
        } else if (wordCount < minW) {
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
    filterContainer.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.fw || 'ALL';
            filterContainer.querySelectorAll('.filter-chip').forEach(b => {
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

    filtered.forEach(q => {
        const li = document.createElement('li');
        li.dataset.id = q.id;
        if (currentQuestion && currentQuestion.id === q.id) {
            li.classList.add('active');
        }
        const statusInfo = getQuestionStatusIcon(q.id);
        li.innerHTML = `
            <span class="q-item-left">
                <span class="q-fw-badge fw-${q.framework}">${q.framework}</span>
                <span class="q-item-title">${escapeHtml(q.title)}</span>
            </span>
            <span class="q-status-icon" title="${statusInfo.status}">${statusInfo.icon}</span>
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

    // Update Exam prompt area
    document.getElementById('currentQTitle').innerText = currentQuestion.title;
    const metaEl = document.getElementById('currentQMeta');
    if (metaEl) {
        metaEl.innerHTML = `
            <span class="framework-pill fw-${currentQuestion.framework}">Khung ${currentQuestion.framework}: ${escapeHtml(currentQuestion.frameworkName)}</span>
            <span class="word-target-pill">${currentQuestion.minWords}–${currentQuestion.maxWords} từ</span>
        `;
    }
    document.getElementById('promptContent').innerText = currentQuestion.content;

    // Load draft & cached feedback for this question
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

    // Update Quest Mode & Hint Drawer
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
        <div class="drawer-section">
            <span class="framework-pill fw-${q.framework}">Khung ${q.framework}: ${escapeHtml(q.frameworkName)}</span>
            <p class="drawer-desc">${escapeHtml(fwInfo.vi || '')}</p>
            ${q.quickHints?.stance ? `<div class="drawer-stance"><strong>🧭 Chiến thuật:</strong> ${escapeHtml(q.quickHints.stance)}</div>` : ''}
        </div>
        <div class="drawer-section">
            <h4>📝 Thân bài 1 (Ý chính)</h4>
            <ul>${b1Items}</ul>
        </div>
        <div class="drawer-section">
            <h4>📝 Thân bài 2 (Ý chính)</h4>
            <ul>${b2Items}</ul>
        </div>
        <div class="drawer-section">
            <h4>💎 Từ vựng ăn điểm</h4>
            <ul class="vocab-list">${vocabItems}</ul>
        </div>
        <div class="drawer-section">
            <h4>🔗 Từ nối nhanh</h4>
            <p class="linking-mini">
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
    if (questBox) questBox.style.display = currentMode === 'quest' ? 'block' : 'none';
    if (examBox) examBox.style.display = currentMode === 'exam' ? 'flex' : 'none';

    const workspace = document.querySelector('.workspace');
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
    const icon = btn.querySelector('i');

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    } else {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert('Hết giờ làm bài!');
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        }, 1000);
    }
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        const btn = document.getElementById('startTimerBtn');
        const icon = btn.querySelector('i');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
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

    // Clear draft button
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

    // AI Writing Hint ("Cứu bí ý")
    document.getElementById('aiHintBtn').addEventListener('click', askAiWritingHint);
    document.getElementById('closeAiHintBtn').addEventListener('click', () => {
        document.getElementById('aiHintBox').style.display = 'none';
    });

    // Slide-in Hint Drawer
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
        alert('Vui lòng nhập ít nhất một API Key của Gemini ở cột Cài đặt AI (bên trái)!');
        document.getElementById('aiSettingsDetails').setAttribute('open', '');
        return;
    }

    const hintBox = document.getElementById('aiHintBox');
    const hintContent = document.getElementById('aiHintContent');
    const btn = document.getElementById('aiHintBtn');

    hintBox.style.display = 'block';
    btn.disabled = true;
    hintContent.innerHTML = `<div class="inline-spinner"><i class="fa-solid fa-spinner fa-spin"></i> AI đang đọc bài viết dở và nghĩ ý tiếp theo...</div>`;
    setTimeout(() => hintBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);

    const res = await getWritingHintWithAI({
        promptText: currentQuestion.content,
        currentEssay: quill.getText().trim(),
        onStatusUpdate: (msg) => {
            hintContent.innerHTML = `<div class="inline-spinner"><i class="fa-solid fa-spinner fa-spin"></i> ${escapeHtml(msg)}</div>`;
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
        alert('Vui lòng nhập ít nhất một API Key của Gemini ở cột Cài đặt (bên trái)!');
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
            + `<div style="margin-top: 20px; font-size: 0.8rem; color: #6b7280; padding-top: 10px; border-top: 1px solid #e5e7eb;">Chấm điểm bởi: <strong>${escapeHtml(res.model)}</strong></div>`;

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
            <div style="color: #991b1b; padding: 24px; background: #fee2e2; border-radius: 8px; border-left: 4px solid #ef4444;">
                <h3 style="color: #991b1b; margin-top: 0; margin-bottom: 12px;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Lỗi Chấm Điểm
                </h3>
                <p>Không thể kết nối với API bằng các Key được cung cấp.</p>
                ${modelNotice}
                <p><strong>Chi tiết lỗi từ máy chủ:</strong> ${escapeHtml(res.errorMsg)}</p>
                <hr style="border-color: #fca5a5; margin: 16px 0;">
                <p><strong>Gợi ý cách khắc phục:</strong></p>
                <ul style="margin-bottom: 0;">
                    ${modelFixTip}
                    <li>Vui lòng kiểm tra lại <strong>API Key</strong>. Đảm bảo bạn dán chính xác API Key của Google (thường bắt đầu bằng <code>AIzaSy...</code>).</li>
                    <li>Key bạn nhập có thể không phải là API Key hợp lệ hoặc đã bị khóa/hết hạn mức (Quota).</li>
                </ul>
            </div>
        `;
    }
}
