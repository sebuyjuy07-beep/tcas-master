/**
 * Subject Module: A-Level วิทยาศาสตร์ประยุกต์ (63)
 * Owned by: Exam Subject Agent (alevel_sci)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_sci",
    "code": "63",
    "name_th": "A-Level วิทยาศาสตร์ประยุกต์",
    "name_en": "Applied Science",
    "category": "A_LEVEL",
    "total_questions": 30,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "วิทยาศาสตร์ชีวภาพ วิทยาศาสตร์กายภาพ วิทยาศาสตร์โลกและอวกาศ",
    "icon_name": "flask",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_sci_1",
        "subject_id": "alevel_sci",
        "domain_name": "วิทยาศาสตร์ชีวภาพ",
        "subtopic_name": "ระบบนิเวศ พันธุศาสตร์ และสิ่งมีชีวิต",
        "description": "วิทยาศาสตร์ชีวภาพ - ระบบนิเวศ พันธุศาสตร์ และสิ่งมีชีวิต",
        "target_questions": 10,
        "score_weight": 33.3,
        "order_index": 1
    },
    {
        "id": "bp_sci_2",
        "subject_id": "alevel_sci",
        "domain_name": "วิทยาศาสตร์กายภาพ",
        "subtopic_name": "สารและสมบัติของสาร แรงและการเคลื่อนที่ พลังงาน",
        "description": "วิทยาศาสตร์กายภาพ - สารและสมบัติของสาร แรงและการเคลื่อนที่ พลังงาน",
        "target_questions": 10,
        "score_weight": 33.3,
        "order_index": 2
    },
    {
        "id": "bp_sci_3",
        "subject_id": "alevel_sci",
        "domain_name": "วิทยาศาสตร์โลกและอวกาศ",
        "subtopic_name": "ธรณีวิทยา ธรณีพิบัติภัย และดาราศาสตร์",
        "description": "วิทยาศาสตร์โลกและอวกาศ - ธรณีวิทยา ธรณีพิบัติภัย และดาราศาสตร์",
        "target_questions": 10,
        "score_weight": 33.4,
        "order_index": 3
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_sci_set1'
    questionFiles: [],
    legacyGenerators: []
};
