/**
 * Subject Module: A-Level ภาษาเกาหลี (86)
 * Owned by: Exam Subject Agent (alevel_kor)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_kor",
    "code": "86",
    "name_th": "A-Level ภาษาเกาหลี",
    "name_en": "Korean Language",
    "category": "A_LEVEL",
    "total_questions": 50,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "คำศัพท์ ไวยากรณ์ สำนวน และการอ่านเพื่อความเข้าใจ (ระดับ TOPIK I - II)",
    "icon_name": "flag",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_kor_1",
        "subject_id": "alevel_kor",
        "domain_name": "คำศัพท์และไวยากรณ์",
        "subtopic_name": "어휘와 문법 (Vocabulary & Grammar)",
        "description": "คำศัพท์และไวยากรณ์ - 어휘와 문법 (Vocabulary & Grammar)",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 1
    },
    {
        "id": "bp_kor_2",
        "subject_id": "alevel_kor",
        "domain_name": "การอ่านและการสื่อสาร",
        "subtopic_name": "읽기와 의사소통 (Reading & Communication)",
        "description": "การอ่านและการสื่อสาร - 읽기와 의사소통 (Reading & Communication)",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 2
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_kor_set1'
    questionFiles: [],
    legacyGenerators: []
};
