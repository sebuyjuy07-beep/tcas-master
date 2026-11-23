/**
 * Subject Module: A-Level คณิตศาสตร์ประยุกต์ 2 (62)
 * Owned by: Exam Subject Agent (alevel_math2)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_math2",
    "code": "62",
    "name_th": "A-Level คณิตศาสตร์ประยุกต์ 2",
    "name_en": "Applied Mathematics 2",
    "category": "A_LEVEL",
    "total_questions": 30,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "จำนวนและพีชคณิต การวัดและเรขาคณิต สถิติและความน่าจะเป็น (คณิตพื้นฐานสายศิลป์)",
    "icon_name": "calculator",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_m2_1",
        "subject_id": "alevel_math2",
        "domain_name": "จำนวนและพีชคณิต",
        "subtopic_name": "เซต ตรรกศาสตร์ ลำดับและอนุกรม ดอกเบี้ย",
        "description": "จำนวนและพีชคณิต - เซต ตรรกศาสตร์ ลำดับและอนุกรม ดอกเบี้ย",
        "target_questions": 14,
        "score_weight": 46,
        "order_index": 1
    },
    {
        "id": "bp_m2_2",
        "subject_id": "alevel_math2",
        "domain_name": "การวัดและเรขาคณิต",
        "subtopic_name": "เรขาคณิตวิเคราะห์และตรีโกณมิติพื้นฐาน",
        "description": "การวัดและเรขาคณิต - เรขาคณิตวิเคราะห์และตรีโกณมิติพื้นฐาน",
        "target_questions": 4,
        "score_weight": 14,
        "order_index": 2
    },
    {
        "id": "bp_m2_3",
        "subject_id": "alevel_math2",
        "domain_name": "สถิติและความน่าจะเป็น",
        "subtopic_name": "การนำเสนอข้อมูล สถิติวิเคราะห์ และหลักการนับ",
        "description": "สถิติและความน่าจะเป็น - การนำเสนอข้อมูล สถิติวิเคราะห์ และหลักการนับ",
        "target_questions": 12,
        "score_weight": 40,
        "order_index": 3
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_math2_set1'
    questionFiles: [],
    legacyGenerators: []
};
