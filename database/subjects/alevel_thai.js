/**
 * Subject Module: A-Level ภาษาไทย (81)
 * Owned by: Exam Subject Agent (alevel_thai)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_thai",
    "code": "81",
    "name_th": "A-Level ภาษาไทย",
    "name_en": "Thai Language",
    "category": "A_LEVEL",
    "total_questions": 50,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "การอ่านวิเคราะห์ การเขียนสื่อความ การพูดและการฟัง หลักภาษาและการใช้ภาษาไทย",
    "icon_name": "book-open",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_th_1",
        "subject_id": "alevel_thai",
        "domain_name": "การอ่าน",
        "subtopic_name": "การจับใจความ ตีความ วิเคราะห์จุดประสงค์และทัศนะ",
        "description": "การอ่าน - การจับใจความ ตีความ วิเคราะห์จุดประสงค์และทัศนะ",
        "target_questions": 20,
        "score_weight": 40,
        "order_index": 1
    },
    {
        "id": "bp_th_2",
        "subject_id": "alevel_thai",
        "domain_name": "การเขียนและการสื่อสาร",
        "subtopic_name": "การเรียงลำดับ การใช้คำถูกต้องตามบริบทและสำนวน",
        "description": "การเขียนและการสื่อสาร - การเรียงลำดับ การใช้คำถูกต้องตามบริบทและสำนวน",
        "target_questions": 15,
        "score_weight": 30,
        "order_index": 2
    },
    {
        "id": "bp_th_3",
        "subject_id": "alevel_thai",
        "domain_name": "หลักการใช้ภาษาไทย",
        "subtopic_name": "เสียง คำ ประโยค ระดับภาษา และการใช้ภาษาเชิงวิชาการ",
        "description": "หลักการใช้ภาษาไทย - เสียง คำ ประโยค ระดับภาษา และการใช้ภาษาเชิงวิชาการ",
        "target_questions": 15,
        "score_weight": 30,
        "order_index": 3
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_thai_set1'
    questionFiles: [],
    legacyGenerators: []
};
