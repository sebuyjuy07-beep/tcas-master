/**
 * Subject Module: TPAT3 ความถนัดวิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์ (30)
 * Owned by: Exam Subject Agent (tpat3)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "tpat3",
    "code": "30",
    "name_th": "TPAT3 ความถนัดวิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์",
    "name_en": "Science, Technology, and Engineering Aptitude",
    "category": "TPAT",
    "total_questions": 70,
    "total_score": 100,
    "duration_minutes": 180,
    "description": "วัดความถนัดเชิงตัวเลข มิติสัมพันธ์ เชิงกลและฟิสิกส์ประยุกต์ พร้อมความรู้ด้านวิทยาการคำนวณและเทคโนโลยี",
    "icon_name": "cpu",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "tpat3_num",
        "subject_id": "tpat3",
        "domain_name": "การทดสอบความถนัด (Aptitude Test)",
        "subtopic_name": "1. ด้านตัวเลข (Numerical Aptitude)",
        "description": "การคิดคำนวณตัวเลขทางวิทยาศาสตร์ การวิเคราะห์อัตราส่วน ร้อยละ และความน่าจะเป็นเชิงวิศวกรรม",
        "target_questions": 15,
        "score_weight": 20,
        "order_index": 1
    },
    {
        "id": "tpat3_spatial",
        "subject_id": "tpat3",
        "domain_name": "การทดสอบความถนัด (Aptitude Test)",
        "subtopic_name": "2. ด้านมิติสัมพันธ์ (Spatial Aptitude)",
        "description": "การมองภาพ 3 มิติ การหมุนวัตถุ ภาพฉาย (Orthographic Projection) และการคลี่รูปทรงเรขาคณิต",
        "target_questions": 15,
        "score_weight": 20,
        "order_index": 2
    },
    {
        "id": "tpat3_mech",
        "subject_id": "tpat3",
        "domain_name": "การทดสอบความถนัด (Aptitude Test)",
        "subtopic_name": "3. ด้านเชิงกลและฟิสิกส์ประยุกต์ (Mechanical & Physics)",
        "description": "กลศาสตร์พื้นฐาน รอก คาน เฟือง ไฮดรอลิกส์ และวงจรไฟฟ้าประยุกต์",
        "target_questions": 15,
        "score_weight": 20,
        "order_index": 3
    },
    {
        "id": "tpat3_science",
        "subject_id": "tpat3",
        "domain_name": "การทดสอบความคิดเชิงวิทยาศาสตร์และเทคโนโลยี",
        "subtopic_name": "4. ความคิดเชิงวิทยาศาสตร์และวิศวกรรม (Engineering Thinking)",
        "description": "การแก้ปัญหาทางวิศวกรรม การตั้งสมมติฐาน และการวิเคราะห์ข้อผิดพลาดในระบบ",
        "target_questions": 15,
        "score_weight": 20,
        "order_index": 4
    },
    {
        "id": "tpat3_computing",
        "subject_id": "tpat3",
        "domain_name": "การทดสอบความคิดเชิงวิทยาศาสตร์และเทคโนโลยี",
        "subtopic_name": "5. ความรู้ด้านวิทยาการคำนวณและเทคโนโลยี (Computational Thinking)",
        "description": "ตรรกะคอมพิวเตอร์ ผังงาน (Flowchart) ความปลอดภัยไซเบอร์ และเทคโนโลยีปัญญาประดิษฐ์",
        "target_questions": 10,
        "score_weight": 20,
        "order_index": 5
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/tpat3_set1'
    questionFiles: [],
    legacyGenerators: ["database/generators/gen_tpat3.js"]
};
