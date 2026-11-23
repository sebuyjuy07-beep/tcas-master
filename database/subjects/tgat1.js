/**
 * Subject Module: TGAT1 การสื่อสารภาษาอังกฤษ (91)
 * Owned by: Exam Subject Agent (tgat1)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "tgat1",
    "code": "91",
    "name_th": "TGAT1 การสื่อสารภาษาอังกฤษ",
    "name_en": "English Communication",
    "category": "TGAT",
    "total_questions": 60,
    "total_score": 100,
    "duration_minutes": 60,
    "description": "วัดทักษะการสื่อสารภาษาอังกฤษ ทั้งการพูด (Speaking) และการอ่าน (Reading) ในบริบทชีวิตประจำวันและการทำงาน",
    "icon_name": "languages",
    "status": "ready"
},
    blueprints: [
    {
        "id": "tgat1_spk_qr",
        "subject_id": "tgat1",
        "domain_name": "ทักษะการพูด (Speaking Skill)",
        "subtopic_name": "1.1 การถาม–ตอบ (Question-Response)",
        "description": "คำถาม-คำตอบในสถานการณ์จริง วัดการตอบสนองที่ถูกต้องตามเจตนาการสื่อสารและโครงสร้างไวยากรณ์",
        "target_questions": 10,
        "score_weight": 16.67,
        "order_index": 1
    },
    {
        "id": "tgat1_spk_sc",
        "subject_id": "tgat1",
        "domain_name": "ทักษะการพูด (Speaking Skill)",
        "subtopic_name": "1.2 เติมบทสนทนาแบบสั้น (Short Conversations)",
        "description": "บทสนทนาสั้น 3 บทสนทนา (3-4 ข้อต่อบทสนทนา) ในบริบทชีวิตประจำวัน การซื้อสินค้า และการศึกษา",
        "target_questions": 10,
        "score_weight": 16.67,
        "order_index": 2
    },
    {
        "id": "tgat1_spk_lc",
        "subject_id": "tgat1",
        "domain_name": "ทักษะการพูด (Speaking Skill)",
        "subtopic_name": "1.3 เติมบทสนทนาแบบยาว (Long Conversations)",
        "description": "บทสนทนายาว 2 บทสนทนา (บทสนทนาละ 5 ข้อ) ในสถานการณ์การทำงาน การสัมภาษณ์งาน และการเดินทางระหว่างประเทศ",
        "target_questions": 10,
        "score_weight": 16.67,
        "order_index": 3
    },
    {
        "id": "tgat1_rd_tc",
        "subject_id": "tgat1",
        "domain_name": "ทักษะการอ่าน (Reading Skill)",
        "subtopic_name": "2.1 เติมข้อความในเนื้อเรื่องให้สมบูรณ์ (Text Completion)",
        "description": "บทความเติมคำ 2 บทความ (7-8 ข้อต่อบทความ) วัดคำศัพท์ตามบริบท โครงสร้างไวยากรณ์ และความสอดคล้องของเนื้อเรื่อง",
        "target_questions": 15,
        "score_weight": 25,
        "order_index": 4
    },
    {
        "id": "tgat1_rd_rc",
        "subject_id": "tgat1",
        "domain_name": "ทักษะการอ่าน (Reading Skill)",
        "subtopic_name": "2.2 อ่านเพื่อจับใจความ (Reading Comprehension)",
        "description": "บทความอ่านจับใจความ 3 บทความ (บทความละ 5 ข้อ) ข่าวประชาสัมพันธ์ สารคดีวิทยาศาสตร์ และสิ่งแวดล้อม",
        "target_questions": 15,
        "score_weight": 25,
        "order_index": 5
    }
],
    cheatsheet: {
    "subject_id": "tgat1",
    "title": "สรุปสูตร & เทคนิคพิชิต TGAT1 91 การสื่อสารภาษาอังกฤษ",
    "badge": "TGAT1 • 91",
    "description": "รวมสำนวน Question-Response, กฎไวยากรณ์ Text Completion และเทคนิคการอ่านจับใจความ Reading",
    "sections": [
        {
            "title": "🗣️ 1. ทักษะการพูด (Speaking & Conversation Mastery)",
            "icon": "message-circle",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>❓ Question-Response Patterns</h4>\n        <ul>\n            <li><strong>Would you mind...?</strong> (คุณจะรังเกียจไหม...)\n                <br>• ตอบตกลง (ยินดีทำ): <em>Not at all. / Of course not. / I'd be glad to.</em>\n                <br>• <span style=\"color:#f43f5e;\">ห้ามตอบ Yes, of course</span> เพราะจะแปลว่า รังเกียจ!\n            </li>\n            <li><strong>How do you like...?</strong> (คุณรู้สึกอย่างไรกับ...)\n                <br>• ถามความเห็น/ความประทับใจ → <em>It's fascinating / I'm enjoying it.</em>\n            </li>\n            <li><strong>What do you say we...?</strong> (เรา...กันดีไหม)\n                <br>• เป็นการชักชวน → <em>Sounds like a plan! / Count me in!</em>\n            </li>\n            <li><strong>Alternative Questions (A or B?):</strong>\n                <br>• ห้ามตอบ Yes หรือ No ต้องเลือกสิ่งใดสิ่งหนึ่ง\n            </li>\n        </ul>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🤝 Situational Idioms (สำนวนยอดฮิต)</h4>\n        <ul>\n            <li><strong>ขอโทษ / ปลอบใจ:</strong> <em>Don't worry about it. / These things happen.</em></li>\n            <li><strong>แสดงความยินดี:</strong> <em>Congratulations! / I knew you could do it!</em></li>\n            <li><strong>เสนอตัวช่วยเหลือ:</strong> <em>Could I give you a hand? / Can I be of any assistance?</em></li>\n            <li><strong>ขอเวลา:</strong> <em>Give me a second. / Hold on a moment.</em></li>\n        </ul>\n    </div>\n</div>\n"
        },
        {
            "title": "📖 2. ไวยากรณ์สำคัญใน Text Completion (Grammar Cheat Sheet)",
            "icon": "book-open",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>✨ Subjunctive Mood (ข้อสอบชอบออก!)</h4>\n        <p style=\"color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 0.4rem;\">หลังกริยา/คุณศัพท์แสดงคำแนะนำ ข้อกำหนด (recommend, suggest, insist, vital, essential, mandatory):</p>\n        <div class=\"grammar-rule-badge\">\n            It is recommended that <span class=\"syntax-hl\">S + (should) + V<sub>base form</sub></span>\n        </div>\n        <p style=\"font-size: 0.85rem; margin-top: 0.5rem; line-height: 1.5;\">เช่น: <em>It is vital that every student <strong>be</strong> on time.</em> (ไม่ใช่ is)</p>\n        <p style=\"font-size: 0.85rem; line-height: 1.5;\">เช่น: <em>She suggested that he <strong>study</strong> harder.</em> (ไม่ใช่ studies)</p>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🌪️ Inversion (การสลับประธาน-กริยา)</h4>\n        <p style=\"color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 0.4rem;\">เมื่อขึ้นต้นประโยคด้วยคำปฏิเสธ (Negative Adverbs):</p>\n        <div class=\"grammar-rule-badge\">\n            <span class=\"syntax-keyword\">Not only / Rarely / Seldom / Scarcely</span> + <span class=\"syntax-hl\">V<sub>ช่วย</sub> + S + V<sub>แท้</sub></span>\n        </div>\n        <p style=\"font-size: 0.85rem; margin-top: 0.5rem; line-height: 1.5;\">เช่น: <em>Not only <strong>does this show</strong> respect, but it also opens doors...</em></p>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🧩 Participle Clauses (ลดรูปร่วมประธาน)</h4>\n        <ul>\n            <li><strong>Present Participle (V<sub>ing</sub>):</strong> ประธานกระทำเอง\n                <br>• <em>..., enabling clinicians to detect tumors early.</em>\n            </li>\n            <li><strong>Past Participle (V<sub>3</sub>):</strong> ประธานถูกกระทำ\n                <br>• <em>Designed in 1977, the museum reopened today.</em>\n            </li>\n        </ul>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>⏳ Conditionals (ประโยคเงื่อนไข)</h4>\n        <ul>\n            <li><strong>Type 1:</strong> If + Present Simple, will + V.inf (เป็นไปได้ในอนาคต)</li>\n            <li><strong>Type 2:</strong> If + Past Simple, would + V.inf (สมมติตรงข้ามปัจจุบัน)</li>\n            <li><strong>Type 3:</strong> If + had + V.3, would have + V.3 (เสียดายในอดีต)</li>\n        </ul>\n    </div>\n</div>\n"
        },
        {
            "title": "📰 3. กลยุทธ์การทำ Reading Comprehension",
            "icon": "file-text",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>🎯 4 ขั้นตอนทำข้อสอบจับใจความ</h4>\n        <ol>\n            <li><strong>อ่านโจทย์ก่อนอ่านเนื้อเรื่อง:</strong> ขีดเส้นใต้คีย์เวิร์ดในคำถาม (ชื่อคน ปี พ.ศ. คำเฉพาะ)</li>\n            <li><strong>Skimming:</strong> กวาดสายตาอ่านย่อหน้าแรกและย่อหน้าสุดท้ายเพื่อจับ Main Idea</li>\n            <li><strong>Scanning:</strong> มองหาคีย์เวิร์ดในเนื้อหาเพื่อตอบข้อคำถามเจาะจง</li>\n            <li><strong>Context Clues:</strong> หาความหมายคำศัพท์จากคำเชื่อมและบริบทข้างเคียง</li>\n        </ol>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🚫 4 ช้อยส์ลวงยอดนิยม (Trap Choices)</h4>\n        <ul>\n            <li>1. <strong>Too Broad:</strong> ความหมายกว้างเกินเนื้อเรื่องที่กำหนด</li>\n            <li>2. <strong>Too Narrow:</strong> ถูกต้องตามข้อเท็จจริง แต่เป็นเพียงตัวอย่างย่อย ไม่ใช่ Main Idea</li>\n            <li>3. <strong>Extreme Words:</strong> ตัวเลือกที่มีคำเด็ดขาด เช่น <em>always, never, completely, all</em> มักจะผิด</li>\n            <li>4. <strong>Not Mentioned:</strong> ฟังดูดีแต่ไม่มีระบุในบทความ</li>\n        </ul>\n    </div>\n</div>\n"
        }
    ]
},
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/tgat1_set1'
    questionFiles: [],
    legacyGenerators: ["database/seed_tgat1_official.js","database/generators/tgat1/build_tgat1_all.js"]
};
