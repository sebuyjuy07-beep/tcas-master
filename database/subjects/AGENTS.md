# Exam Subject Content Agent Rules (`database/subjects/`)

กฎมาตรฐานสำหรับ Agent ที่รับผิดชอบสร้างหรืออัปเดตข้อสอบรายวิชาในโฟลเดอร์ `database/subjects/`

---

## 1. โครงสร้างไฟล์ต่อ 1 วิชา (Strict Per-Subject Isolation)
- 1 วิชา = 1 ไฟล์หลักที่ `database/subjects/<subject_id>.js`
- ไฟล์ชุดข้อสอบของวิชานั้นวางที่ `database/subjects/questions/<subject_id>_set1.js`, `<subject_id>_set2.js`, ...
- **ห้าม** แก้ไฟล์วิชาอื่น, `server.js`, หรือไฟล์ใน `public/` เมื่อกำลังทำเนื้อหาข้อสอบของวิชาตัวเอง

---

## 2. รูปแบบ Export มาตรฐานของ `<subject_id>.js`
```javascript
module.exports = {
    subject: {
        id: 'alevel_phy',
        code: '64',
        name_th: 'A-Level ฟิสิกส์',
        name_en: 'Physics',
        category: 'A_LEVEL', // 'TGAT' | 'TPAT' | 'A_LEVEL'
        total_questions: 30,
        total_score: 100,
        duration_minutes: 90,
        description: '...',
        icon_name: 'zap',
        status: 'ready' // ใช้ 'ready' เมื่อมีข้อสอบครบชุดพร้อมสอบ หรือ 'coming_soon' หากกำลังจัดทำ
    },
    blueprints: [
        {
            id: 'bp_phy_1',
            subject_id: 'alevel_phy',
            domain_name: 'กลศาสตร์',
            subtopic_name: '...',
            description: '...',
            target_questions: 10,
            score_weight: 32,
            order_index: 1
        }
    ],
    cheatsheet: null, // หรือ Object สรุปสูตรสำหรับเปิดดูในห้องสอบ
    questionFiles: [
        // รายชื่อไฟล์ใน database/subjects/questions/ เช่น './questions/alevel_phy_set1'
    ]
};
```

---

## 3. มาตรฐานคุณภาพข้อสอบ (TCAS Blueprint Quality Contract)
1. **Schema ของแต่ละข้อ:**
   - `id`: ไม่ซ้ำกันทั่วระบบ เช่น `q_phy_s1_01`
   - `subject_id`: ต้องตรงกับชื่อวิชา
   - `blueprint_id`: ต้องอ้างอิง `id` ที่มีอยู่ใน `blueprints` ของวิชานั้นจริง
   - `set_number`: เลขชุดข้อสอบ (`1`, `2`, ...)
   - `stimulus`: บทความ/ข้อมูลนำ (ใส่ `null` หากไม่มี)
   - `question_text`: โจทย์คำถามชัดเจน **ห้าม** ขึ้นต้นด้วย Tag ขยะเช่น `[ชุดวิเคราะห์...]`
   - `difficulty`: `'easy'` | `'medium'` | `'hard'`
   - `explanation`: เฉลยละเอียดภาษาไทย อธิบายทีละขั้นและบอกว่าตัวเลือกอื่นผิดเพราะอะไร
   - `trap_analysis`: วิเคราะห์จุดหลอกที่ ทปอ. มักตั้ง (ต้องมีทุกข้อ ไม่ปล่อยว่าง)
   - `options`: อาร์เรย์ `4` หรือ `5` ตัวเลือก (`label`, `content`, `is_correct`) โดยมี **`is_correct: 1` เพียง 1 ข้อเท่านั้น**
2. **คณิตศาสตร์ & วิทยาศาสตร์:** ใช้ LaTeX Math `$...$` (inline) หรือ `$$...$$` (block) เสมอ เพื่อให้ KaTeX เรนเดอร์สวยงาม
3. **ห้ามใช้อิโมจิเกินจำเป็นในข้อความเฉลยแบบ UI** — เน้นภาษาวิชาการที่ชัดเจน อ่านง่าย

---

## 4. คำสั่งนำเข้าและตรวจสอบเฉพาะวิชาของตัวเอง
หลังสร้างหรือแก้ไขข้อสอบเสร็จ ให้รันคำสั่งนี้เสมอเพื่อบันทึกเฉพาะวิชานั้นลง SQLite และตรวจ Integrity:
```bash
node database/subjects/seed_subject.js <subject_id>
```
(สคริปต์จะตรวจสอบว่า `blueprint_id` ถูกต้อง, ทุกข้อมีตัวเลือกครบ 4–5 ข้อ และมีคำตอบถูกเพียง 1 ข้อ)
