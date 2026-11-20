const POTENTIAL_MODELS = [
    // Thế hệ 4.x / 3.x - mới nhất
    "gemini-4-hydrogen",
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

const ESSAY_GRADER_SYSTEM_PROMPT = `Bạn là một chuyên gia chấm bài IELTS/TOEFL Writing chuyên nghiệp và nghiêm khắc. Nhiệm vụ của bạn là chấm điểm và nhận xét chi tiết một bài luận tiếng Anh dựa trên Đề bài (Prompt) được cung cấp.

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

const SENTENCE_COACH_SYSTEM_PROMPT = `Bạn là gia sư tiếng Anh thân thiện dạy sinh viên mất gốc thi ENW493c.
Người học được giao viết 1 câu tiếng Anh dựa trên ý tiếng Việt và một vài từ khóa gợi ý.
Hãy trả về cực kỳ ngắn gọn (dưới 90 từ) bằng Markdown theo đúng 3 dòng sau:
1. ✅ **Câu sửa tự nhiên (Band 6.5):** ...
2. 🚀 **Câu nâng cấp ăn điểm (Band 7.5+):** ...
3. 💡 **Ghi nhớ nhanh (Tiếng Việt):** Chỉ ra đúng 1-2 lỗi sai chính (nếu có) và khen 1 điểm tốt.`;

const WRITING_HINT_SYSTEM_PROMPT = `Bạn là trợ giảng Writing ENW493c. Đọc đề bài và đoạn bài viết đang làm dở của sinh viên.
Đừng viết hộ nguyên đoạn. Chỉ trả về ngắn gọn bằng Markdown theo đúng 3 mục:
- **Gợi ý ý tiếp theo (Tiếng Việt):** 1 câu ngắn dẫn dắt theo cấu trúc PEEL.
- **Khung câu mở đầu (English):** Ví dụ "For instance, ..." hoặc "As a result, ..."
- **3 cụm từ vựng nên nhét vào câu này:** kèm nghĩa tiếng Việt ngắn.`;

/**
 * Normalizes a user-entered model identifier by trimming whitespace and surrounding quotes.
 */
function normalizeModelName(raw) {
    return (raw || '').trim().replace(/^["']|["']$/g, '').trim();
}

/**
 * Reads, normalizes, and persists the custom model name from the settings input.
 */
function getCustomModel() {
    const modelInput = document.getElementById('modelInput');
    const model = modelInput ? normalizeModelName(modelInput.value) : '';
    if (modelInput && modelInput.value !== model) {
        modelInput.value = model;
    }
    localStorage.setItem('customModel', model);
    return model;
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, ch => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[ch]));
}

function getApiKeys() {
    const el = document.getElementById('apiKeys');
    const keysStr = el ? el.value.trim() : (localStorage.getItem('apiKeys') || '').trim();
    localStorage.setItem('apiKeys', keysStr);
    if (!keysStr) return [];
    return keysStr.split('\n').map(k => k.trim()).filter(k => k.length > 0);
}

async function parseJsonSafe(response) {
    try {
        return await response.json();
    } catch {
        return {};
    }
}

function buildApiError(response, data, fallbackMsg) {
    return {
        ok: false,
        status: data?.error?.code || response.status,
        errorMsg: data?.error?.message || fallbackMsg
    };
}

function extractInteractionsText(data) {
    if (typeof data?.output_text === 'string' && data.output_text.trim()) {
        return data.output_text;
    }
    if (Array.isArray(data?.outputs)) {
        const text = data.outputs
            .filter(item => item && (item.type === 'text' || typeof item.text === 'string'))
            .map(item => item.text || '')
            .join('\n')
            .trim();
        if (text) return text;
    }
    return '';
}

async function callGenerateContent(model, key, systemPrompt, userPrompt, temperature = 0.3) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemPrompt }] },
                contents: [{ parts: [{ text: userPrompt }] }],
                generationConfig: { temperature }
            })
        }
    );

    const data = await parseJsonSafe(response);
    if (response.ok) {
        const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';
        return text
            ? { ok: true, text, endpoint: 'generateContent' }
            : { ok: false, status: 500, errorMsg: 'API không trả về nội dung phản hồi.' };
    }

    return buildApiError(response, data, 'Lỗi không xác định từ API');
}

async function callInteractionsApi(model, key, systemPrompt, userPrompt, temperature = 0.3) {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': key
        },
        body: JSON.stringify({
            model,
            system_instruction: systemPrompt,
            input: userPrompt,
            generation_config: { temperature }
        })
    });

    const data = await parseJsonSafe(response);
    if (response.ok) {
        const text = extractInteractionsText(data);
        return text
            ? { ok: true, text, endpoint: 'interactions' }
            : { ok: false, status: 500, errorMsg: 'Interactions API không trả về nội dung văn bản.' };
    }

    return buildApiError(response, data, 'Lỗi không xác định từ Interactions API');
}

async function requestModelCall(model, key, systemPrompt, userPrompt, temperature = 0.3) {
    const primaryRes = await callGenerateContent(model, key, systemPrompt, userPrompt, temperature);
    if (primaryRes.ok) return primaryRes;

    if (primaryRes.status === 404 || primaryRes.status === 400) {
        const fallbackRes = await callInteractionsApi(model, key, systemPrompt, userPrompt, temperature);
        if (fallbackRes.ok) return fallbackRes;
        if (primaryRes.status === 404) return fallbackRes;
    }

    return primaryRes;
}

/**
 * Shared Gemini caller with API key rotation, strict customModel support,
 * POTENTIAL_MODELS auto-detection, and Interactions API fallback.
 */
async function callGeminiWithRotation({ systemPrompt, userPrompt, temperature = 0.3, onStatusUpdate }) {
    const keys = getApiKeys();
    const customModel = getCustomModel();
    const isCustomMode = customModel.length > 0;

    if (keys.length === 0) {
        return {
            ok: false,
            missingKeys: true,
            isCustomMode,
            customModel,
            errorMsg: 'Chưa có API Key Gemini nào được nhập.'
        };
    }

    const workingModel = localStorage.getItem('workingModel');
    const modelsToTry = isCustomMode
        ? [customModel]
        : (workingModel
            ? [workingModel, ...POTENTIAL_MODELS.filter(m => m !== workingModel)]
            : POTENTIAL_MODELS);

    let errorMsg = '';

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        for (const m of modelsToTry) {
            if (typeof onStatusUpdate === 'function') {
                onStatusUpdate(`${isCustomMode ? 'Đang gọi' : 'Đang thử'} Model: ${m} (Key ${i + 1})`);
            }
            try {
                const res = await requestModelCall(m, key, systemPrompt, userPrompt, temperature);
                if (res.ok) {
                    if (!isCustomMode) {
                        localStorage.setItem('workingModel', m);
                    }
                    return {
                        ok: true,
                        text: res.text,
                        model: m,
                        endpoint: res.endpoint
                    };
                }

                errorMsg = res.errorMsg;
                if (res.status === 404) {
                    continue;
                } else if (res.status === 400 || res.status === 403 || res.status === 429) {
                    break;
                }
            } catch (e) {
                errorMsg = `Lỗi kết nối mạng: ${e.message}`;
                break;
            }
        }
    }

    return {
        ok: false,
        missingKeys: false,
        isCustomMode,
        customModel,
        errorMsg: errorMsg || 'Không thể kết nối tới Gemini API.'
    };
}

/**
 * Parses the overall score out of 10 from the grader's Markdown table.
 */
function parseScoreFromMarkdown(markdown) {
    if (!markdown) return null;
    const totalMatch = markdown.match(/TỔNG ĐIỂM[^\n]*?(\d+(?:[.,]\d+)?)\s*\/\s*10/i);
    if (totalMatch) {
        const val = parseFloat(totalMatch[1].replace(',', '.'));
        if (!Number.isNaN(val) && val >= 0 && val <= 10) return val;
    }
    const genericMatch = markdown.match(/(\d+(?:[.,]\d+)?)\s*\/\s*10/);
    if (genericMatch) {
        const val = parseFloat(genericMatch[1].replace(',', '.'));
        if (!Number.isNaN(val) && val >= 0 && val <= 10) return val;
    }
    return null;
}

async function gradeEssayWithAI(promptText, essayText, onStatusUpdate) {
    const userPrompt = `Dưới đây là Đề bài (Prompt):\n----------------\n${promptText}\n----------------\n\nDưới đây là bài luận của học sinh (Student's essay):\n----------------\n${essayText}\n----------------\n\nHãy chấm điểm và nhận xét dựa trên System Instructions.`;
    return callGeminiWithRotation({
        systemPrompt: ESSAY_GRADER_SYSTEM_PROMPT,
        userPrompt,
        temperature: 0.3,
        onStatusUpdate
    });
}

async function coachSentenceWithAI({ questionTitle, role, viHint, keywords, studentSentence, onStatusUpdate }) {
    const userPrompt = `Đề bài: ${questionTitle}\nVị trí câu: ${role}\nÝ tiếng Việt cần diễn đạt: ${viHint}\nTừ khóa gợi ý: ${(keywords || []).join(', ')}\nCâu tiếng Anh sinh viên viết: "${studentSentence}"`;
    return callGeminiWithRotation({
        systemPrompt: SENTENCE_COACH_SYSTEM_PROMPT,
        userPrompt,
        temperature: 0.4,
        onStatusUpdate
    });
}

async function getWritingHintWithAI({ promptText, currentEssay, onStatusUpdate }) {
    const userPrompt = `Đề bài:\n${promptText}\n\nBài viết đang viết dở của sinh viên:\n${currentEssay || '(Sinh viên chưa viết gì, đang bí cách mở đầu hoặc câu tiếp theo)'}`;
    return callGeminiWithRotation({
        systemPrompt: WRITING_HINT_SYSTEM_PROMPT,
        userPrompt,
        temperature: 0.5,
        onStatusUpdate
    });
}
