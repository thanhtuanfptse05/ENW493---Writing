const questions = [
    {
        id: 1,
        title: "Question 1 - Culinary Traditions",
        content: `Writing topic\n\nThe growing presence of Western fast food chains has changed local eating habits and culinary traditions. Nevertheless, measures can be taken to counter this impact and encourage the preservation of traditional diets.\n\nWrite an essay (350–400 words) explaining the causes behind the spread of Western fast food and suggesting solutions that help preserve and promote local culinary traditions.`
    },
    {
        id: 2,
        title: "Question 2 - University Rankings",
        content: `Writing topic\n\nUniversity rankings frequently influence where students choose to apply and enroll. However, they may not always be the best indicator of academic quality.\n\nWrite an essay (350-400 words) discussing how university rankings affect students' application and enrollment choices, and whether they can be considered a reliable measure of academic quality.`
    },
    {
        id: 3,
        title: "Question 3 - Internet Technology",
        content: `WRITING QUESTION\n\nTime: 60 minutes\n\nWrite a 450-500 word essay responding to the question below:\n\nThe advancement of Internet technology means people do not need to travel to foreign countries to understand how people in other places live.\n\nTo what extent do you agree or disagree?`
    },
    {
        id: 4,
        title: "Question 4 - Career vs Education",
        content: `Time: 60 minutes\n\nWrite an essay of 450-500 words in response to the question below:\n\nSome people think that a university degree leads to better job opportunities and higher income, others think that getting a job right after high school leads to quicker financial independence.\n\nDiscuss both views and give your opinion.`
    },
    {
        id: 5,
        title: "Question 5 - Environment",
        content: `Time: 60 minutes\n\nWriting Task\n\nWrite a 450-500-word essay responding to the following question:\n\nSome people think that all university students should be required to participate in environmental protection projects in their free time. They believe this would benefit both the individual student and society as a whole.\n\nDo you agree or disagree?`
    },
    {
        id: 6,
        title: "Question 6 - Work from Home",
        content: `Time: 60 minutes.\n\nCompose an essay of 450-500 words to address the question below:\n\nIn several countries, a growing number of young people are opting to work from home rather than going to the office.\n\nDo the advantages of this trend outweigh the disadvantages?`
    },
    {
        id: 7,
        title: "Question 7 - Success Factors",
        content: `ESSAY\n\nTime: 60 minutes.\n\nCompose an essay of 450-500 words responding to the question below:\n\nMany people believe that good planning is the key factor to success in life, while hard work and supportive relationships are important.\n\nDiscuss both views and give your opinion.`
    },
    {
        id: 8,
        title: "Question 8 - Taking Risks",
        content: `Time: 60 minutes\nWrite an essay of 350–400 words to answer the following question:\n\nIt is important to take risks in both their professional and personal lives. Do you think the advantages of taking risks outweigh the disadvantages?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.`
    },
    {
        id: 9,
        title: "Question 9 - Competition vs Cooperation",
        content: `Write an essay of 350–400 words to answer the following question:\n\nSome people think that competition at work, at school, and in daily life is a good thing. Others believe we should cooperate more rather than compete with each other.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.`
    }
];

let currentQuestion = null;
let quill;
let timerInterval;
let timeLeft = 3600; // 60 minutes in seconds

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initQuill();
    initQuestionList();
    initTimer();
    setupEventListeners();
    
    // Select first question by default
    selectQuestion(1);
    
    // Load saved settings
    const savedKeys = localStorage.getItem('apiKeys');
    const details = document.getElementById('aiSettingsDetails');
    if (savedKeys) {
        document.getElementById('apiKeys').value = savedKeys;
        details.removeAttribute('open');
    } else {
        details.setAttribute('open', '');
    }
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
        placeholder: 'Bắt đầu viết bài luận của bạn tại đây...',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'font': FontStyle.whitelist }],
                [{ 'size': SizeStyle.whitelist }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['clean']
            ]
        }
    });

    // Tắt gạch chân đỏ (spellcheck) của trình duyệt
    quill.root.setAttribute('spellcheck', false);

    quill.on('text-change', () => {
        const text = quill.getText().trim();
        // Accurate word count handling multiple spaces and newlines
        const wordCount = text.length > 0 ? text.replace(/\n/g, " ").split(/\s+/).filter(w => w.length > 0).length : 0;
        document.getElementById('wordCount').innerText = wordCount + ' từ';
    });
}

function initQuestionList() {
    const qList = document.getElementById('qList');
    questions.forEach(q => {
        const li = document.createElement('li');
        li.innerText = q.title;
        li.onclick = () => selectQuestion(q.id);
        li.dataset.id = q.id;
        qList.appendChild(li);
    });
}

function selectQuestion(id) {
    currentQuestion = questions.find(q => q.id === id);
    if (!currentQuestion) return;

    // Update UI
    document.querySelectorAll('#qList li').forEach(li => {
        li.classList.toggle('active', li.dataset.id == id);
    });

    document.getElementById('currentQTitle').innerText = currentQuestion.title;
    document.getElementById('promptContent').innerText = currentQuestion.content;
    
    // Load cached feedback for this question if exists
    const savedQid = localStorage.getItem('savedFeedbackQid');
    const savedFeedback = localStorage.getItem('savedFeedback');
    const inlineResult = document.getElementById('inlineResultSection');
    
    if (savedQid == id && savedFeedback) {
        inlineResult.style.display = 'block';
        document.getElementById('resultContent').innerHTML = savedFeedback;
    } else {
        inlineResult.style.display = 'none';
    }
}

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
    
    // Removed modelSelect event listener

    document.getElementById('submitBtn').addEventListener('click', gradeEssay);
    document.getElementById('closeResultBtn').addEventListener('click', () => {
        document.getElementById('inlineResultSection').style.display = 'none';
        localStorage.removeItem('savedFeedback');
        localStorage.removeItem('savedFeedbackQid');
    });
}

const POTENTIAL_MODELS = [
    // Thế hệ 3.x - mới nhất
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.1-pro-preview",
    "gemini-3.1-flash-image",
    "gemini-3.1-flash-lite",
    "gemini-3-flash-preview",
    // Thế hệ 2.5
    "gemini-2.5-pro",
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    // Thế hệ 2.0
    "gemini-2.0-flash-exp",
    "gemini-2.0-pro-exp",
    // Thế hệ 1.5 (fallback ổn định nhất)
    "gemini-1.5-pro",
    "gemini-1.5-flash"
];

function getApiKeys() {
    const keysStr = document.getElementById('apiKeys').value.trim();
    localStorage.setItem('apiKeys', keysStr); // Save keys for next time
    
    // Removed selectedModel save here

    if (!keysStr) return [];
    return keysStr.split('\n').map(k => k.trim()).filter(k => k.length > 0);
}

// Prompt Engineering for AI
const systemPrompt = `Bạn là một chuyên gia chấm bài IELTS/TOEFL Writing chuyên nghiệp và nghiêm khắc. Nhiệm vụ của bạn là chấm điểm và nhận xét chi tiết một bài luận tiếng Anh dựa trên Đề bài (Prompt) được cung cấp.

TRẢ VỀ KẾT QUẢ BẰNG MARKDOWN THEO ĐÚNG TRÌNH TỰ SAU, KHÔNG BỎ SÓT PHẦN NÀO:

---
## 🏆 ĐIỂM TỔNG THỂ

| Tiêu chí | Điểm | Nhận xét ngắn |
|---|---|---|
| **Task Achievement** | ?/10 | ... |
| **Coherence & Cohesion** | ?/10 | ... |
| **Lexical Resource** | ?/10 | ... |
| **Grammar** | ?/10 | ... |
| 🌟 **TỔNG ĐIỂM ƯỚC TÍNH** | **?.? / 10** *(IELTS Band ?.?)* | |

> **Nhận xét chung:** (Tóm tắt 2-3 câu về bài viết, điểm mạnh nổi bật nhất và điểm yếu cần cải thiện nhất)

---
## 📋 PHÂN TÍCH CHI TIẾT

### 1. Task Achievement — ?/10
(Phân tích cụ thể: bài có trả lời đúng đề không? Đủ độ dài không? Các luận điểm có được phát triển tốt không?)

### 2. Coherence & Cohesion — ?/10
(Phân tích cấu trúc đoạn văn, tính logic, sử dụng từ nối)

### 3. Lexical Resource — ?/10
(Phân tích vốn từ vựng: đa dạng chưa? Có sai collocation hay dùng lặp không?)

### 4. Grammar — ?/10
(Phân tích cấu trúc câu, độ đa dạng, các lỗi ngữ pháp mắc phải)

---
## 🚨 LỖI SAI & SỬA LỖI

(Liệt kê TỐI THIỂU 3 lỗi sai quan trọng nhất theo format):

**Lỗi 1:**
- ❌ **Câu sai:** "..."
- ✅ **Sửa lại:** "..."
- 💬 **Giải thích:** ...

**Lỗi 2:**
- ❌ **Câu sai:** "..."
- ✅ **Sửa lại:** "..."
- 💬 **Giải thích:** ...

---
## 💡 GỢI Ý NÂNG CẤP

**Từ vựng nâng cao (Advanced Vocabulary):**
(Liệt kê 5 từ/cụm từ học sinh có thể dùng cho chủ đề này, kèm ví dụ)

**Câu nâng cấp mẫu:**
(Lấy 1-2 câu trong bài, viết lại ở cấp độ nâng cao hơn)

LƯU Ý: Không bao giờ thay đổi đề bài gốc. Nếu bài viết dưới 100 từ hoặc lạc đề hoàn toàn, cho điểm thấp và cảnh báo rõ.`;


async function gradeEssay() {
    const keys = getApiKeys();
    if (keys.length === 0) {
        alert('Vui lòng nhập ít nhất một API Key của Gemini ở cột Cài đặt (bên trái)!');
        return;
    }

    const text = quill.getText().trim();
    if (text.length < 20) {
        alert('Bài viết quá ngắn. Vui lòng viết dài hơn để AI có thể chấm điểm.');
        return;
    }

    const promptText = currentQuestion.content;
    
    // Model memory: always try the last working model FIRST, then fallback
    let workingModel = localStorage.getItem('workingModel');
    let modelsToTry = workingModel 
        ? [workingModel, ...POTENTIAL_MODELS.filter(m => m !== workingModel)] 
        : POTENTIAL_MODELS;
    
    // Show UI loading inline
    const resultSection = document.getElementById('inlineResultSection');
    const content = document.getElementById('resultContent');
    resultSection.style.display = 'block';
    
    // Auto scroll down to result section
    setTimeout(() => {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    
    content.innerHTML = `
        <div class="loader-container">
            <div class="spinner"></div>
            <h3>AI đang phân tích bài viết...</h3>
            <p>Quá trình này có thể mất từ 5 - 15 giây.</p>
            <p><small id="modelIndicator">Đang dò tìm model AI phù hợp...</small></p>
        </div>
    `;

    const userPrompt = `
Dưới đây là Đề bài (Prompt):
----------------
${promptText}
----------------

Dưới đây là bài luận của học sinh (Student's essay):
----------------
${text}
----------------

Hãy chấm điểm và nhận xét dựa trên System Instructions.`;

    // Implement Key Rotation: Try keys sequentially
    let success = false;
    let errorMsg = '';

    keyLoop: for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        console.log(`Đang thử key thứ ${i + 1}/${keys.length}...`);
        
        for (let m of modelsToTry) {
            document.getElementById('modelIndicator').innerText = `Đang thử Model: ${m} (Key ${i+1})`;
            console.log(`Đang thử model: ${m} với key ${i+1}`);
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system_instruction: { parts: [ { text: systemPrompt } ] },
                        contents: [ { parts: [ { text: userPrompt } ] } ],
                        generationConfig: { temperature: 0.3 }
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const aiText = data.candidates[0].content.parts[0].text;
                    
                    const finalHtml = marked.parse(aiText) + `<div style="margin-top: 20px; font-size: 0.8rem; color: #6b7280; padding-top: 10px; border-top: 1px solid #e5e7eb;">Chấm điểm bởi: <strong>${m}</strong></div>`;
                    localStorage.setItem('workingModel', m); // Save for next time
                    content.innerHTML = finalHtml;
                    localStorage.setItem('savedFeedback', finalHtml);
                    localStorage.setItem('savedFeedbackQid', currentQuestion.id);
                    success = true;
                    break keyLoop; // Successfully graded, exit both loops
                } else {
                    const errorData = await response.json();
                    const errorStatus = errorData.error?.code;
                    errorMsg = errorData.error?.message || 'Lỗi không xác định từ API';
                    console.error(`Model ${m} (Key ${i + 1}) lỗi:`, errorMsg);
                    
                    if (errorStatus === 404) {
                        // Model not found, continue to next model
                        continue;
                    } else if (errorStatus === 400 || errorStatus === 403 || errorStatus === 429) {
                        // Key invalid, quota exceeded, or bad request -> Try next key
                        break; 
                    }
                }
            } catch (e) {
                console.error(`Key ${i + 1} lỗi mạng:`, e);
                errorMsg = `Lỗi kết nối mạng: ${e.message}`;
                break; // Try next key on network error
            }
        }
    }

    if (!success) {
        content.innerHTML = `
            <div style="color: #991b1b; padding: 24px; background: #fee2e2; border-radius: 8px; border-left: 4px solid #ef4444;">
                <h3 style="color: #991b1b; margin-top: 0; margin-bottom: 12px;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Lỗi Chấm Điểm
                </h3>
                <p>Không thể kết nối với API bằng các Key được cung cấp.</p>
                <p><strong>Chi tiết lỗi từ máy chủ:</strong> ${errorMsg}</p>
                <hr style="border-color: #fca5a5; margin: 16px 0;">
                <p><strong>Gợi ý cách khắc phục:</strong></p>
                <ul style="margin-bottom: 0;">
                    <li>Vui lòng kiểm tra lại <strong>API Key</strong>. Đảm bảo bạn dán chính xác API Key của Google (thường bắt đầu bằng <code>AIzaSy...</code>).</li>
                    <li>Key bạn nhập có thể không phải là API Key hợp lệ hoặc đã bị khóa/hết hạn mức (Quota).</li>
                </ul>
            </div>
        `;
    }
}
