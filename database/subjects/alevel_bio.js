/**
 * Subject Module: A-Level ชีววิทยา (66)
 * Owned by: Exam Subject Agent (alevel_bio)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_bio",
    "code": "66",
    "name_th": "A-Level ชีววิทยา",
    "name_en": "Biology",
    "category": "A_LEVEL",
    "total_questions": 40,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "เซลล์และการทำงานของร่างกาย พืช พันธุศาสตร์ วิวัฒนาการ และระบบนิเวศ",
    "icon_name": "feather",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_bio_1",
        "subject_id": "alevel_bio",
        "domain_name": "เซลล์และกระบวนการทำงาน",
        "subtopic_name": "โครงสร้างเซลล์ การลำเลียงสาร เอนไซม์และพลังงาน",
        "description": "เซลล์และกระบวนการทำงาน - โครงสร้างเซลล์ การลำเลียงสาร เอนไซม์และพลังงาน",
        "target_questions": 8,
        "score_weight": 20,
        "order_index": 1
    },
    {
        "id": "bp_bio_2",
        "subject_id": "alevel_bio",
        "domain_name": "กายวิภาคและสรีรวิทยา",
        "subtopic_name": "ระบบการทำงานในร่างกายมนุษย์และสัตว์",
        "description": "กายวิภาคและสรีรวิทยา - ระบบการทำงานในร่างกายมนุษย์และสัตว์",
        "target_questions": 12,
        "score_weight": 30,
        "order_index": 2
    },
    {
        "id": "bp_bio_3",
        "subject_id": "alevel_bio",
        "domain_name": "พฤกษศาสตร์และพืช",
        "subtopic_name": "โครงสร้างพืช การสืบพันธุ์ สรีรวิทยาของพืช",
        "description": "พฤกษศาสตร์และพืช - โครงสร้างพืช การสืบพันธุ์ สรีรวิทยาของพืช",
        "target_questions": 8,
        "score_weight": 20,
        "order_index": 3
    },
    {
        "id": "bp_bio_4",
        "subject_id": "alevel_bio",
        "domain_name": "พันธุศาสตร์และวิวัฒนาการ",
        "subtopic_name": "ดีเอ็นเอ ถ่ายทอดลักษณะ เทคโนโลยีดีเอ็นเอ",
        "description": "พันธุศาสตร์และวิวัฒนาการ - ดีเอ็นเอ ถ่ายทอดลักษณะ เทคโนโลยีดีเอ็นเอ",
        "target_questions": 8,
        "score_weight": 20,
        "order_index": 4
    },
    {
        "id": "bp_bio_5",
        "subject_id": "alevel_bio",
        "domain_name": "นิเวศวิทยาและสิ่งแวดล้อม",
        "subtopic_name": "ระบบนิเวศ ห่วงโซ่อาหาร ความหลากหลายทางชีวภาพ",
        "description": "นิเวศวิทยาและสิ่งแวดล้อม - ระบบนิเวศ ห่วงโซ่อาหาร ความหลากหลายทางชีวภาพ",
        "target_questions": 4,
        "score_weight": 10,
        "order_index": 5
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_bio_set1'
    questionFiles: [],
    legacyGenerators: []
};
