# KẾ HOẠCH NÂNG CẤP WEB LUYỆN VIẾT ENW493c (v2.0)

> **Mục tiêu:** Biến web từ công cụ "chỉ để gõ bài & chấm điểm" thành nền tảng **"Học qua chơi (Leo Tháp 5 Ải) + Thi thử thực chiến"**, giúp người mất gốc tiếng Anh mở web lên là muốn làm ngay, không bị ngợp trước trang giấy trắng.

---

## 1. Đánh giá Codebase Hiện Tại & Điểm Cần Nâng Cấp

### Những điểm đã làm rất tốt (Giữ nguyên & Phát huy)
* **Engine gọi Gemini AI (`app.js`):** Đã có sẵn cơ chế xoay vòng nhiều API Key (`keyLoop`), tự dò danh sách `POTENTIAL_MODELS`, lưu `workingModel`, cho phép nhập `customModel`, và tự fallback giữa `generateContent` và `interactions`. Đây là lợi thế cực lớn.
* **Giao diện & Editor (`index.html`, `style.css`):** Dùng Quill.js gọn nhẹ, đã tắt `spellcheck` giống phòng thi thật, bố cục Sidebar + Workspace rõ ràng.
* **Sổ tay kiến thức (`knowledge.js`):** Nội dung 5 khung A–E cực kỳ thực chiến, dễ học.

### 4 điểm yếu cần khắc phục ở bản v2.0
1. **Dễ nản cho người mất gốc:** Vào đề là thấy khung trắng bắt viết 400–500 từ ngay lập tức.
2. **Chưa lưu bài đang viết dở:** Chuyển qua lại giữa các câu trong `#qList` hoặc F5 trang là mất bài đang gõ trong Quill.
3. **Sổ tay bị che màn hình:** Mở Modal Sổ tay là che mất khung viết, phải đóng mở liên tục để xem từ nối/cấu trúc.
4. **Dữ liệu và Logic đang gộp chung:** Mảng `questions` nằm trong `app.js`, nếu thêm lên 19 đề + dữ liệu 5 ải thì file `app.js` sẽ rất dài và khó bảo trì.

---

## 2. Kiến Trúc Thư Mục Sau Nâng Cấp

Vẫn giữ 100% Static Web (chạy mượt trên GitHub Pages, không cần Backend), chỉ tách file gọn gàng:

```text
ENW493---Writing/
├── index.html          # Thêm thanh chuyển chế độ (Leo Ải / Thi Thật), thanh XP, Panel gợi ý trượt
├── style.css           # Thêm CSS cho 5 Ải (thẻ chọn từ, kéo thả PEEL, badge trạng thái)
├── questions.js        # [MỚI] Chứa toàn bộ 19 đề (Q1-Q19) + dữ liệu Ải 1-4 cho từng đề
├── ai-service.js       # [MỚI] Tách phần gọi Gemini AI từ app.js ra thành hàm dùng chung
├── quest-mode.js       # [MỚI] Xử lý logic chơi 5 Ải + tính XP + lưu tiến độ localStorage
├── app.js              # Xử lý Sidebar, Quill Editor, Auto-save, Timer, và điều phối 2 chế độ
└── knowledge.js        # Cập nhật thêm hướng dẫn & ý tưởng cho 10 đề mới (Q10-Q19)
```

---

## 3. Thiết Kế Luồng Học: 2 Chế Độ Song Song (Mode Switcher)

Ngay dưới thanh `top-header` (hoặc đầu `.workspace`), thêm một thanh chuyển chế độ gồm 2 Tab:
* **Tab 1: `🎮 Chế độ Leo Ải (Ôn từ gốc)`** — Mặc định cho người mới/lười học.
* **Tab 2: `📝 Chế độ Thi Thật (60 phút)`** — Giao diện Quill Editor hiện tại, dùng để thi thử & chấm bài AI.

### Chi tiết 5 Ải trong `quest-mode.js` (Mỗi ải chỉ mất 1–3 phút)

| Ải | Tên Ải | Cơ chế tương tác (Không cần gõ nhiều) | Phần thưởng |
|---|---|---|---|
| **Ải 1** | **Soi Đề (15 giây)** | Trắc nghiệm nhanh 2 câu:<br>1. Đề này thuộc Khung nào (A/B/C/D/E)?<br>2. Đề yêu cầu bao nhiêu từ (350–400 hay 450–500)? | +15 XP & Mở khóa Ải 2 |
| **Ải 2** | **Lắp Ráp Mở Bài** | Hiển thị 2 câu Mở bài mẫu bị đục lỗ 3–4 từ khóa. Bên dưới có các nút từ (Word Chips kiểu Duolingo). Click từ để điền vào chỗ trống. | +20 XP & Mở khóa Ải 3 |
| **Ải 3** | **Xếp Lego Thân Bài 1** | Hiển thị 4–6 câu của Thân bài 1 bị xáo trộn. Người học bấm theo thứ tự (hoặc nút Lên/Xuống) để xếp đúng chuẩn **P → E → E → L**. Xếp đúng hiện nhãn màu xanh + dịch nghĩa. | +25 XP & Mở khóa Ải 4 |
| **Ải 4** | **Dịch Khung Thân Bài 2** | Hiển thị từng câu gợi ý Tiếng Việt + 2–3 từ khóa Tiếng Anh. Người học tự gõ câu Tiếng Anh vào ô nhỏ. Có 2 nút hỗ trợ:<br>• `✨ AI Sửa & Nâng cấp câu` (dùng AI có sẵn)<br>• `💡 Xem mẫu` (mở đáp án nếu bí) | +40 XP & Mở khóa Ải 5 |
| **Ải 5** | **Boss Fight (Viết Full)** | Tự động chuyển sang Tab **Thi Thật**, điền sẵn nhắc nhở số từ. Khi nộp bài và đạt **≥ 6.0/10** từ AI Grader → Đánh dấu **Hoàn thành đề (✅)** trên Sidebar! | +100 XP & Huy hiệu đề |

> **Mẹo chống chán:** Thêm tùy chọn **"Mở khóa tất cả ải (Chế độ tự do)"** nhỏ ở góc để ai đã khá hơn có thể nhảy thẳng vào Ải 4 hoặc Ải 5 mà không bị ép chơi lại từ đầu.

---

## 4. Chuẩn Hóa Cấu Trúc Dữ Liệu (`questions.js`)

Mỗi đề trong 19 đề sẽ dùng chung 1 cấu trúc Object như sau:

```javascript
const QUESTIONS_DATA = [
  {
    id: 1,
    code: "Q1",
    title: "Q1 - Culinary Traditions",
    framework: "A", // A, B, C, D, E
    frameworkName: "Cause + Solution",
    minWords: 350,
    maxWords: 400,
    content: `Writing topic\n\nThe growing presence of Western fast food chains...`,
    
    // Dữ liệu cho Sổ tay nhanh (Quick Drawer khi đang viết)
    quickHints: {
      vocab: ["convenience and affordability", "aggressive marketing", "traditional cuisine", "restore pride"],
      body1Vi: ["Nguyên nhân 1: Tiện lợi & giá rẻ (bận rộn, mua burger vài phút)", "Nguyên nhân 2: Toàn cầu hóa & quảng cáo (gắn với lối sống hiện đại)"],
      body2Vi: ["Giải pháp 1: Giáo dục (lớp nấu ăn, bữa trưa học đường ở Nhật)", "Giải pháp 2: Chính phủ & truyền thông (hỗ trợ quán nhỏ, lễ hội ẩm thực)"]
    },

    // Dữ liệu cho Ải 2: Điền từ Mở bài
    stage2Intro: {
      template: "In recent years, Western fast food chains have become increasingly {{1}}, {{2}} the way local people eat. This essay will examine the main {{3}} of this trend and propose practical {{4}} to preserve traditional cuisine.",
      answers: ["common", "reshaping", "causes", "solutions"],
      distractors: ["rare", "destroying", "benefits"], // Từ gây nhiễu
      viTranslation: "Gần đây, chuỗi đồ ăn nhanh phương Tây ngày càng phổ biến, định hình lại cách ăn uống của dân địa phương. Bài viết này sẽ phân tích nguyên nhân chính và đề xuất giải pháp thực tế để bảo tồn ẩm thực truyền thống."
    },

    // Dữ liệu cho Ải 3: Xếp Lego Thân bài 1 (đúng thứ tự, code sẽ tự shuffle khi hiển thị)
    stage3Body1: [
      { role: "Point 1", en: "One major reason is the convenience and affordability of fast food.", vi: "Một nguyên nhân chính là sự tiện lợi và giá rẻ của đồ ăn nhanh." },
      { role: "Explain 1", en: "With busy schedules, many people prefer meals that are quick, cheap and available everywhere.", vi: "Với lịch trình bận rộn, nhiều người thích bữa ăn nhanh, rẻ và có khắp nơi." },
      { role: "Example", en: "For instance, students and office workers can grab a burger within minutes, whereas cooking a traditional dish takes hours.", vi: "Ví dụ, sinh viên và dân văn phòng mua burger trong vài phút, còn nấu món truyền thống mất hàng giờ." },
      { role: "Point 2", en: "Another cause is globalisation and aggressive marketing.", vi: "Một nguyên nhân khác là toàn cầu hóa và quảng cáo mạnh mẽ." },
      { role: "Link", en: "As a result, traditional food is increasingly seen as old-fashioned.", vi: "Kết quả là món truyền thống ngày càng bị xem là lỗi thời." }
    ],

    // Dữ liệu cho Ải 4: Tập viết từng câu Thân bài 2
    stage4Body2: [
      { role: "Point 1", vi: "Giải pháp đầu tiên là giáo dục.", keywords: ["Education", "first solution"], sample: "Education is the first solution." },
      { role: "Explain 1", vi: "Trường học có thể tổ chức lớp nấu ăn và dạy trẻ về giá trị văn hóa của món địa phương.", keywords: ["cooking classes", "cultural value", "local dishes"], sample: "Schools could organise cooking classes and teach children the cultural value of local dishes." },
      { role: "Point 2", vi: "Ngoài ra, chính phủ và truyền thông nên tích cực quảng bá ẩm thực địa phương.", keywords: ["In addition", "governments", "actively promote"], sample: "In addition, governments and the media should actively promote local food." },
      { role: "Link", vi: "Các biện pháp này có thể giúp khôi phục niềm tự hào về ẩm thực địa phương.", keywords: ["These measures", "restore pride"], sample: "These measures could help restore pride in local cuisine." }
    ]
  }
];
```

---

## 5. Tái Sử Dụng Hệ Thống AI Sẵn Có (`ai-service.js`)

### Bước Refactor cốt lõi (Cực kỳ đáng làm)
Hiện tại `callGenerateContent` và `callInteractionsApi` trong `app.js` đang gắn cứng biến `systemPrompt` chấm bài. Bạn chỉ cần tách nó thành 1 hàm tổng quát nhận `customSystemPrompt` làm tham số:

```javascript
// Trong ai-service.js
async function callGeminiWithRotation({ systemPrompt, userPrompt, temperature = 0.3, onStatusUpdate }) {
  // Dùng lại 100% logic xoay vòng keys + POTENTIAL_MODELS + fallback Interactions API hiện tại của bạn!
  // Trả về: { ok: true, text: "...", model: "..." } hoặc { ok: false, errorMsg: "..." }
}
```

Sau khi tách xong hàm này, bạn có thể gắn ngay **3 tính năng AI siêu hữu ích** chỉ với vài chục dòng code:

### Tính năng AI #1: Sửa & Nâng Cấp 1 Câu Tức Thì (Dùng ở Ải 4)
* **Tác dụng:** Người mất gốc tự gõ câu sai ngữ pháp (VD: *"School should teach student cook Vietnam food"*), bấm nút sẽ được sửa ngay tại chỗ.
* **System Prompt đề xuất:**
```text
Bạn là gia sư tiếng Anh thân thiện dạy sinh viên mất gốc thi ENW493c.
Người học được giao viết 1 câu tiếng Anh dựa trên ý tiếng Việt.
Hãy trả về cực kỳ ngắn gọn (dưới 80 từ) theo đúng 3 dòng:
1. ✅ **Câu sửa tự nhiên (Band 6.5):** ...
2. 🚀 **Câu nâng cấp ăn điểm (Band 7.5+):** ...
3. 💡 **Ghi nhớ nhanh (Tiếng Việt):** Chỉ ra đúng 1-2 lỗi sai chính (nếu có) và khen 1 điểm tốt.
```

### Tính năng AI #2: Nút "Cứu Bí Ý" Thông Minh (Dùng ở Chế độ Thi Thật)
* **Tác dụng:** Đang viết dở bị đứng hình, bấm nút **"🆘 Bí ý? Hỏi AI"** → AI đọc đoạn người học vừa viết dở và gợi ý câu tiếp theo (không viết hộ cả bài).
* **System Prompt đề xuất:**
```text
Bạn là trợ giảng Writing ENW493c. Đọc đề bài và đoạn bài viết đang làm dở của sinh viên.
Đừng viết hộ nguyên đoạn. Chỉ trả về:
- **Gợi ý ý tiếp theo (Tiếng Việt):** 1 câu ngắn dẫn dắt theo cấu trúc PEEL.
- **Khung câu mở đầu (English):** Ví dụ "For instance, ..." hoặc "As a result, ..."
- **3 cụm từ vựng nên nhét vào câu này:** kèm nghĩa tiếng Việt ngắn.
```

### Tính năng AI #3 (Bonus): Nút "+ Tự Tạo Đề Mới Bằng AI"
* **Tác dụng:** Sau này thầy cô ra đề lạ ngoài 19 đề, bạn chỉ cần bấm **"+ Thêm đề mới"**, dán đề bài vào → AI tự sinh ra đúng cục JSON `stage2Intro`, `stage3Body1`, `stage4Body2`, `quickHints` rồi lưu vào `localStorage` để bạn chơi 5 Ải ngay lập tức!
* **Mẹo kỹ thuật:** Ép Gemini trả về JSON thuần (`responseMimeType: "application/json"` trong `generationConfig`) để `JSON.parse()` không bị lỗi.

---

## 6. Nâng Cấp Trải Nghiệm Người Dùng (UX & Gamification)

### 1. Hệ thống Tiến Độ & XP (Lưu 100% ở `localStorage`)
Tạo 1 object `enw493_progress` trong `localStorage`:
```json
{
  "xp": 240,
  "streakDays": 3,
  "lastActiveDate": "2026-11-20",
  "questions": {
    "1": { "unlockedStage": 5, "completedStages": [1, 2, 3, 4], "bestScore": 7.5, "passed": true },
    "2": { "unlockedStage": 2, "completedStages": [1], "bestScore": null, "passed": false }
  }
}
```
* **Hiển thị trên Sidebar (ngay dưới Logo):**
  * Thanh Progress Bar: `Đã chinh phục: 3/19 đề`
  * Danh hiệu theo XP:
    * `0 - 199 XP`: 🐣 *Tân binh Mất Gốc*
    * `200 - 599 XP`: 🧱 *Thợ Lắp Ráp PEEL*
    * `600 - 1199 XP`: ⚡ *Chiến Thần Template*
    * `1200+ XP`: 👑 *Trùm Cuối Qua Môn ENW493c*
* **Danh sách `#qList` trên Sidebar:**
  * Thêm bộ lọc nhanh theo Khung: `[Tất cả] [A] [B] [C] [D] [E]` để ôn theo từng dạng bài.
  * Mỗi `<li>` hiển thị thêm Badge Khung (VD: `[A]`) và trạng thái (`✅` đã qua, `🔥` đang dở, `⚪` chưa làm).

### 2. Nâng Cấp Chế Độ Thi Thật (Quill Editor)
* **Auto-save theo từng đề:** Mỗi khi gõ (`quill.on('text-change')`), debounce 1 giây rồi lưu `quill.root.innerHTML` vào `localStorage.setItem('draft_q_' + currentQuestion.id, ...)`. Khi chuyển đề sẽ tự load lại bài đang viết dở! Thêm nút **"🗑️ Xóa nháp"** nhỏ ở `.editor-footer`.
* **Bộ đếm từ thông minh (Smart Word Counter):**
  * Thay vì chỉ hiện `120 từ`, hiển thị: `120 / 350–400 từ` kèm màu sắc:
    * 🔴 Dưới `minWords`: Màu đỏ/xám (thiếu từ).
    * 🟢 Trong khoảng `minWords` – `maxWords`: Màu xanh lá (`#10b981` — Đạt chuẩn!).
    * 🟡 Vượt quá `maxWords + 50`: Màu cam (cảnh báo viết quá dài dễ hết giờ).
* **Ngăn kéo "Phao Cứu Sinh" (Slide-in Hint Drawer):**
  * Thêm nút **"📖 Xem gợi ý đề này"** ngay trên thanh `.top-header`.
  * Khi bấm, trượt 1 bảng nhỏ rộng `340px` bên cạnh phải (không che khung viết Quill) hiển thị đúng: *Khung của đề + Từ nối hay dùng + Ý chính Việt/Anh của riêng đề đang chọn*.

---

## 7. Lộ Trình Triển Khai Theo 4 Sprint (Mỗi Sprint 1–2 tiếng)

### Sprint 1: Dọn nền & Cập nhật 19 đề (Dễ nhất, thấy thành quả ngay)
- [ ] Tạo file `questions.js`, đưa 9 đề cũ + 10 đề mới (lấy từ file `ENW493_NEW_10_TOPICS_GUIDE.md`) vào.
- [ ] Cập nhật `knowledge.js` bổ sung nội dung hướng dẫn cho Q10–Q19.
- [ ] Thêm Auto-save nháp theo từng đề (`draft_q_{id}`) và bộ đếm từ đổi màu theo `minWords`/`maxWords`.
- [ ] Thêm bộ lọc Khung `[Tất cả | A | B | C | D | E]` ở cột trái Sidebar.

### Sprint 2: Tách Engine AI & Gắn Trợ Lý Mini
- [ ] Tách logic xoay vòng Key + gọi Gemini từ `app.js` sang `ai-service.js`.
- [ ] Kiểm tra lại nút "Chấm Điểm AI" đảm bảo chạy mượt như cũ.
- [ ] Thêm nút **"🆘 Bí ý? Gợi ý tiếp"** ngay cạnh bộ đếm từ trong `.editor-footer`.
- [ ] Thêm ngăn kéo trượt **"Phao gợi ý nhanh"** cho từng đề.

### Sprint 3: Xây dựng Chế độ "Leo Tháp 5 Ải" (`quest-mode.js`)
- [ ] Thêm thanh chuyển Tab `🎮 Leo Ải` / `📝 Thi Thật` vào `index.html`.
- [ ] Code giao diện thanh Stepper 5 ải (`Ải 1 → Ải 2 → Ải 3 → Ải 4 → Ải 5`).
- [ ] Code lần lượt:
  * Ải 1 (Quiz 2 câu trắc nghiệm).
  * Ải 2 (Click Word Chips điền Mở bài).
  * Ải 3 (Bấm chọn thứ tự xếp câu PEEL Thân bài 1).
  * Ải 4 (Gõ từng câu Thân bài 2 + nút gọi `ai-service.js` sửa câu).
  * Ải 5 (Nút chuyển sang Tab Thi Thật để viết full bài).

### Sprint 4: Gamification & Đánh bóng (Polish)
- [ ] Lưu XP, Rank, trạng thái hoàn thành (`✅`) của từng đề vào `localStorage`.
- [ ] Khi AI chấm bài ở Ải 5, dùng Regex bóc điểm tổng từ Markdown kết quả (VD: tìm `(\d+(\.\d+)?)\s*/\s*10`) để tự động đánh dấu `passed: true` nếu đạt ≥ 6.0 và cộng +100 XP (kèm hiệu ứng pháo giấy nhẹ bằng thư viện `canvas-confetti` CDN).
- [ ] (Tùy chọn) Thêm nút **"+ Tự tạo đề mới bằng AI"** ở cuối Sidebar.