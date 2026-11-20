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

const API_TIMEOUT_MS = 45000;

function isHydrogenModel(model) {
    const m = (model || '').toLowerCase();
    return m.includes('hydrogen') || m.startsWith('gemini-4');
}

async function fetchWithTimeout(url, options, timeoutMs = API_TIMEOUT_MS) {
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } catch (err) {
        if (err && err.name === 'AbortError') {
            throw new Error(`Hết thời gian chờ (${Math.round(timeoutMs / 1000)}s). Model phản hồi quá lâu hoặc kết nối bị nghẽn.`);
        }
        throw err;
    } finally {
        clearTimeout(timerId);
    }
}

function extractInteractionsText(data) {
    if (typeof data?.output_text === 'string' && data.output_text.trim()) {
        return data.output_text;
    }
    if (Array.isArray(data?.outputs)) {
        const textItems = data.outputs.filter(item => item && item.type === 'text' && typeof item.text === 'string');
        const candidates = textItems.length > 0
            ? textItems
            : data.outputs.filter(item => item && item.type !== 'thought' && typeof item.text === 'string');
        const text = candidates.map(item => item.text || '').join('\n').trim();
        if (text) return text;
    }
    return '';
}

async function callGenerateContent(model, key, systemPrompt, userPrompt, temperature = 0.3) {
    const generationConfig = { temperature };
    if (isHydrogenModel(model)) {
        generationConfig.thinkingConfig = { thinkingLevel: 'low' };
    }

    const response = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': key
            },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemPrompt }] },
                contents: [{ parts: [{ text: userPrompt }] }],
                generationConfig
            })
        }
    );

    const data = await parseJsonSafe(response);
    if (response.ok) {
        const text = data?.candidates?.[0]?.content?.parts?.filter(p => !p.thought).map(p => p.text || '').join('') || '';
        return text
            ? { ok: true, text, endpoint: 'generateContent' }
            : { ok: false, status: 500, errorMsg: 'API không trả về nội dung phản hồi.' };
    }

    return buildApiError(response, data, 'Lỗi không xác định từ API');
}

async function callInteractionsApi(model, key, systemPrompt, userPrompt, temperature = 0.3) {
    const generationConfig = { temperature };
    if (isHydrogenModel(model)) {
        generationConfig.thinking_level = 'low';
    }

    const response = await fetchWithTimeout('https://generativelanguage.googleapis.com/v1beta/interactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': key
        },
        body: JSON.stringify({
            model,
            system_instruction: systemPrompt,
            input: userPrompt,
            generation_config: generationConfig
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

async function requestModelCall(model, key, systemPrompt, userPrompt, temperature = 0.3, onStatusUpdate, keyIndex = 0) {
    const primaryRes = await callGenerateContent(model, key, systemPrompt, userPrompt, temperature);
    if (primaryRes.ok) return primaryRes;

    if (primaryRes.status === 404 || primaryRes.status === 400 || primaryRes.status === 401) {
        if (typeof onStatusUpdate === 'function') {
            onStatusUpdate(`Đang thử Interactions API cho ${model} (Key ${keyIndex + 1})...`);
        }
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
                const res = await requestModelCall(m, key, systemPrompt, userPrompt, temperature, onStatusUpdate, i);
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
                } else if (res.status === 400 || res.status === 401 || res.status === 403 || res.status === 429) {
                    break;
                }
            } catch (e) {
                errorMsg = e.message || 'Lỗi kết nối mạng';
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
 * Parses a score out of 10 from full-essay or paragraph grader Markdown output.
 */
function parseScoreFromMarkdown(markdown) {
    if (!markdown) return null;
    const totalMatch = markdown.match(/(?:TỔNG ĐIỂM|ĐIỂM ĐOẠN)[^\n]*?(\d+(?:[.,]\d+)?)\s*\/\s*10/i);
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

const PARAGRAPH_RUBRICS = {
    intro: {
        label: 'Mở bài (Introduction)',
        targetWords: '40–60 từ (2–3 câu)',
        criteria: `- Đã paraphrase lại đề bài bằng từ ngữ tự nhiên (không chép nguyên văn đề)?
- Đã có Thesis Statement rõ ràng, khớp với Khung của đề (VD: nêu Cause+Solution, trả lời 2 vế, nêu lập trường Agree/Disagree, hoặc giới thiệu Discuss Both Views + Opinion)?`
    },
    body1: {
        label: 'Thân bài 1 (Body Paragraph 1)',
        targetWords: '120–175 từ',
        criteria: `- Đi đúng trọng tâm phần 1 của đề bài (Causes / Vế 1 / View 1 / Advantages)?
- Cấu trúc PEEL mạch lạc: có câu chủ đề (Point), giải thích (Explain), ví dụ (Example) và câu chốt/liên kết (Link)?`
    },
    body2: {
        label: 'Thân bài 2 (Body Paragraph 2)',
        targetWords: '120–175 từ',
        criteria: `- Đi đúng trọng tâm phần 2 của đề bài (Solutions / Vế 2 / View 2 / Disadvantages + Phản biện Outweigh nếu là dạng Outweigh)?
- Cấu trúc PEEL mạch lạc, từ nối chuyển đoạn tự nhiên với Thân bài 1?`
    },
    conclusion: {
        label: 'Kết bài (Conclusion)',
        targetWords: '35–55 từ (2–3 câu)',
        criteria: `- Tóm tắt gọn các ý chính của bài bằng cách diễn đạt khác (paraphrase)?
- KHÔNG đưa thêm luận điểm mới toanh chưa từng xuất hiện ở thân bài?
- Nếu đề hỏi ý kiến (Agree/Disagree, Discuss+Opinion, Outweigh), đã chốt rõ quan điểm cá nhân?`
    }
};

async function gradeParagraphWithAI({ sectionType, question, paragraphText, onStatusUpdate }) {
    const rubric = PARAGRAPH_RUBRICS[sectionType] || PARAGRAPH_RUBRICS.intro;
    const systemPrompt = `Bạn là giảng viên chấm ENW493c chuyên nghiệp, tận tâm hỗ trợ sinh viên luyện viết từng đoạn.
NHIỆM VỤ: Chấm điểm và nhận xét riêng phần **${rubric.label}** (độ dài tham khảo: ${rubric.targetWords}) dựa trên Đề bài và Khung viết (${question.framework} - ${question.frameworkName}).

NGUYÊN TẮC QUAN TRỌNG:
- Học viên được TỰ DO dùng ý tưởng, lập trường và cách diễn đạt riêng. TUYỆT ĐỐI KHÔNG trừ điểm vì viết khác bài mẫu; chỉ chấm dựa trên việc có đúng yêu cầu đề bài, đúng cấu trúc đoạn, logic, từ vựng và ngữ pháp hay không.
- Trả về đúng định dạng Markdown gọn, dễ đọc:

### 🎯 ĐIỂM ĐOẠN: X.X / 10
*(Đánh giá công bằng theo mức độ sinh viên ENW493c: từ 6.0 trở lên là Đạt yêu cầu qua ải)*

**✅ Checklist cấu trúc ${rubric.label}:**
(Đánh dấu ✅ hoặc ⚠️ kèm nhận xét 1 dòng cho từng tiêu chí sau:)
${rubric.criteria}

**🔧 Sửa lỗi ngữ pháp & từ vựng (nếu có):**
- (Liệt kê tối đa 2-3 lỗi quan trọng nhất theo dạng ❌ Sai → ✅ Sửa → 💬 Giải thích ngắn)

**🚀 Phiên bản nâng cấp giữ nguyên ý của bạn (Band 7.5+):**
> (Viết lại đoạn văn trên mượt mà và học thuật hơn nhưng GIỮ ĐÚNG ý tưởng & lập trường mà học viên vừa viết)`;

    const userPrompt = `Đề bài (${question.title} | Khung ${question.framework}: ${question.frameworkName} | Mục tiêu cả bài: ${question.minWords}-${question.maxWords} từ):
----------------
${question.content}
----------------

Đoạn ${rubric.label} học viên tự viết:
----------------
${paragraphText}
----------------

Hãy chấm điểm và nhận xét theo đúng định dạng.`;

    return callGeminiWithRotation({
        systemPrompt,
        userPrompt,
        temperature: 0.3,
        onStatusUpdate
    });
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
