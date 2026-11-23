/**
 * Subject Module: TGAT3 สมรรถนะการทำงาน (93)
 * Owned by: Exam Subject Agent (tgat3)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "tgat3",
    "code": "93",
    "name_th": "TGAT3 สมรรถนะการทำงาน",
    "name_en": "Future Workforce Competencies",
    "category": "TGAT",
    "total_questions": 60,
    "total_score": 100,
    "duration_minutes": 60,
    "description": "วัดทัศนคติและสมรรถนะในการทำงานในอนาคต เช่น การสร้างนวัตกรรม, การแก้ปัญหาซับซ้อน, EQ และจิตสำนึกต่อสังคม",
    "icon_name": "briefcase",
    "status": "ready"
},
    blueprints: [
    {
        "id": "tgat3_value",
        "subject_id": "tgat3",
        "domain_name": "สมรรถนะการทำงาน (Workplace Competencies)",
        "subtopic_name": "1. การสร้างคุณค่าและนวัตกรรม",
        "description": "การคิดเชิงวิเคราะห์ การแก้ไขปัญหาอย่างมืออาชีพ และความคิดเชิงนวัตกรรม",
        "target_questions": 15,
        "score_weight": 25,
        "order_index": 1
    },
    {
        "id": "tgat3_complex_prob",
        "subject_id": "tgat3",
        "domain_name": "สมรรถนะการทำงาน (Workplace Competencies)",
        "subtopic_name": "2. การแก้ไขปัญหาที่ซับซ้อน",
        "description": "การระบุปัญหา การแสวงหาทางออก การนำทางออกไปปฏิบัติ และการประเมินทางออก",
        "target_questions": 15,
        "score_weight": 25,
        "order_index": 2
    },
    {
        "id": "tgat3_emotional",
        "subject_id": "tgat3",
        "domain_name": "สมรรถนะการทำงาน (Workplace Competencies)",
        "subtopic_name": "3. การบริหารจัดการอารมณ์",
        "description": "ความตระหนักรู้ตนเอง การควบคุมอารมณ์และบุคลิกภาพ และความเข้าใจผู้อื่น",
        "target_questions": 15,
        "score_weight": 25,
        "order_index": 3
    },
    {
        "id": "tgat3_civic",
        "subject_id": "tgat3",
        "domain_name": "สมรรถนะการทำงาน (Workplace Competencies)",
        "subtopic_name": "4. การเป็นพลเมืองที่มีส่วนร่วมของสังคม",
        "description": "การมุ่งเน้นการบริการสังคม จิตสำนึกรับผิดชอบต่อสิ่งแวดล้อม และการสร้างสรรค์ประโยชน์แก่ท้องถิ่น",
        "target_questions": 15,
        "score_weight": 25,
        "order_index": 4
    }
],
    cheatsheet: {
    "subject_id": "tgat3",
    "title": "สรุปแนวคิด & ทัศนคติพิชิต TGAT3 93 สมรรถนะการทำงาน",
    "badge": "TGAT3 • 93",
    "description": "กรอบแนวคิดสมรรถนะการทำงาน 4 ด้าน การคิดเชิงวิเคราะห์ การแก้ปัญหาซับซ้อน วุฒิภาวะทางอารมณ์ และพลเมืองโลก",
    "sections": [
        {
            "title": "💡 1. การสร้างคุณค่าและนวัตกรรม (Value Creation)",
            "icon": "zap",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>🔍 การคิดเชิงวิเคราะห์ (Analytical Thinking)</h4>\n        <ul>\n            <li>มองลึกถึง <strong>รากเหง้าของปัญหา (Root Cause)</strong> ไม่ใช่แค่ดูอาการผิวเผิน (Symptom)</li>\n            <li>แยกแยะข้อเท็จจริง (Facts) ออกจากความรู้สึกหรืออคติส่วนตัว</li>\n            <li>รวบรวมข้อมูลจากผู้มีส่วนได้ส่วนเสียรอบด้าน (Multi-stakeholders)</li>\n        </ul>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🚀 ความคิดเชิงนวัตกรรม (Innovative Thinking)</h4>\n        <ul>\n            <li><strong>User-Centric Design:</strong> ปรับเทคโนโลยีให้เข้ากับพฤติกรรมผู้ใช้ ไม่บังคับให้ผู้ใช้ฝืนธรรมชาติ</li>\n            <li><strong>Shared Value Creation:</strong> สร้างคุณค่าที่ทั้งธุรกิจเติบโตและสังคมได้ประโยชน์ร่วมกันอย่างยั่งยืน</li>\n            <li>การทดลองต้นแบบขนาดเล็ก (MVP / Pilot Test) ก่อนทุ่มงบประมาณก้อนใหญ่</li>\n        </ul>\n    </div>\n</div>\n"
        },
        {
            "title": "🧩 2. การแก้ไขปัญหาที่ซับซ้อน (Complex Problem Solving)",
            "icon": "crosshair",
            "content": "\n<div class=\"cheat-card\">\n    <h4>🔄 วงจร 4 ขั้นตอนการแก้ปัญหาตามพิมพ์เขียว ทปอ.</h4>\n    <div class=\"steps-flow\">\n        <div class=\"step-box\">\n            <span class=\"step-num\">1</span>\n            <strong>ระบุปัญหา (Identifying)</strong>\n            <p>ทำความเข้าใจบริบทแวดล้อม หาสาเหตุที่แท้จริง และดึงผู้เกี่ยวข้องมาร่วมระบุปัญหา</p>\n        </div>\n        <div class=\"step-arrow\">→</div>\n        <div class=\"step-box\">\n            <span class=\"step-num\">2</span>\n            <strong>แสวงหาทางออก (Solutions)</strong>\n            <p>ระดมความคิดสร้างทางเลือกที่หลากหลาย และประเมินทางเลือกที่ลดความเสี่ยงสูงสุด</p>\n        </div>\n        <div class=\"step-arrow\">→</div>\n        <div class=\"step-box\">\n            <span class=\"step-num\">3</span>\n            <strong>นำไปปฏิบัติ (Implementation)</strong>\n            <p>ลงมือตามแผนอย่างยืดหยุ่น ปรับเปลี่ยนตามสถานการณ์เฉพาะหน้าอย่างรอบคอบ</p>\n        </div>\n        <div class=\"step-arrow\">→</div>\n        <div class=\"step-box\">\n            <span class=\"step-num\">4</span>\n            <strong>ประเมินผล (Evaluation)</strong>\n            <p>วัดผลลัพธ์จากข้อมูลจริง สรุปบทเรียนเพื่อการพัฒนาปรับปรุงอย่างต่อเนื่อง</p>\n        </div>\n    </div>\n</div>\n"
        },
        {
            "title": "❤️ 3. การบริหารจัดการอารมณ์ (Emotional Intelligence)",
            "icon": "heart",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>🧘 ความตระหนักรู้ & ควบคุมตนเอง (Self Awareness)</h4>\n        <ul>\n            <li>รู้เท่าทันอารมณ์ตนเองในเสี้ยววินาทีแรก (เช่น น้อยใจ, วิตกกังวล, โกรธ)</li>\n            <li><strong>De-escalation:</strong> ควบคุมสติ สีหน้า ท่าทาง และน้ำเสียง ไม่โต้เถียงด้วยอารมณ์ในที่สาธารณะ</li>\n            <li>แยกแยะ <em>\"ข้อผิดพลาดในเนื้องาน\"</em> ออกจาก <em>\"คุณค่าในตัวเอง\"</em></li>\n        </ul>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🤝 ความเข้าใจผู้อื่น (Interpersonal Understanding)</h4>\n        <ul>\n            <li><strong>Empathy:</strong> มองทะลุพฤติกรรมก้าวร้าวเพื่อค้นหาความต้องการแท้จริง (Core Needs) เช่น ความยุติธรรม หรือความช่วยเหลือ</li>\n            <li><strong>Assertive Communication:</strong> สื่อสารความรู้สึกและข้อเท็จจริงอย่างสุภาพ ตรงไปตรงมา และไม่ก้าวร้าว</li>\n            <li>เปลี่ยนความขัดแย้งให้เป็นความร่วมมือโดยเน้นเป้าหมายร่วม</li>\n        </ul>\n    </div>\n</div>\n"
        },
        {
            "title": "🌍 4. การเป็นพลเมืองที่มีส่วนร่วมของสังคม (Civic Engagement)",
            "icon": "globe",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>🌿 สิ่งแวดล้อม & ความยั่งยืน</h4>\n        <ul>\n            <li><strong>Paris Agreement (COP21):</strong> เป้าหมายสำคัญคือ <em>ควบคุมการเพิ่มขึ้นของอุณหภูมิโลกไม่ให้เกิน 1.5 - 2.0 °C</em></li>\n            <li><strong>Circular Economy (เศรษฐกิจหมุนเวียน):</strong> การนำขยะ/เศษอาหารกลับมาแปรรูปเป็นทรัพยากรหมุนเวียน 100%</li>\n            <li><strong>การจัดการขยะยั่งยืน:</strong> มุ่งเน้นการสอนคัดแยกขยะตั้งแต่ต้นทาง (ผลกระทบต่อวิถีชีวิตน้อยที่สุด)</li>\n        </ul>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🏘️ ประโยชน์ของท้องถิ่น & บริการสังคม</h4>\n        <ul>\n            <li>การพัฒนาสินค้าชุมชน (เช่น ข้าวแต๋นลำปาง, ผ้าคราม) ต้องชวนคนในชุมชนร่วมคิดเรื่อง <em>อัตลักษณ์, การตลาด และการดีไซน์</em></li>\n            <li>Universal Design (อารยสถาปัตย์) เพื่อความเท่าเทียมของผู้พิการและผู้สูงอายุ</li>\n            <li>การฟื้นฟูศักดิ์ศรีความเป็นมนุษย์ (ให้โอกาสฝึกอาชีพ) ดีกว่าการแจกของสงเคราะห์อย่างเดียว</li>\n        </ul>\n    </div>\n</div>\n"
        }
    ]
},
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/tgat3_set1'
    questionFiles: [],
    legacyGenerators: ["database/seed_tgat3_official.js","database/generators/tgat3/build_tgat3_all.js"]
};
