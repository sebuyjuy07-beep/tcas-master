/**
 * Subject Module: A-Level ภาษาญี่ปุ่น (85)
 * Owned by: Exam Subject Agent (alevel_jpn)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_jpn",
    "code": "85",
    "name_th": "A-Level ภาษาญี่ปุ่น",
    "name_en": "Japanese Language",
    "category": "A_LEVEL",
    "total_questions": 50,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "ตัวอักษร คันจิ ไวยากรณ์ คำศัพท์ และการอ่านบทความ (ระดับ N4 - N3)",
    "icon_name": "flag",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_jpn_1",
        "subject_id": "alevel_jpn",
        "domain_name": "ตัวอักษร คันจิ และไวยากรณ์",
        "subtopic_name": "文字・語彙・文法 (Vocab & Grammar N4-N3)",
        "description": "ตัวอักษร คันจิ และไวยากรณ์ - 文字・語彙・文法 (Vocab & Grammar N4-N3)",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 1
    },
    {
        "id": "bp_jpn_2",
        "subject_id": "alevel_jpn",
        "domain_name": "การอ่านจับใจความและการสื่อสาร",
        "subtopic_name": "読解・コミュニケーション (Reading Comprehension)",
        "description": "การอ่านจับใจความและการสื่อสาร - 読解・コミュニケーション (Reading Comprehension)",
        "target_questions": 25,
        "score_weight": 50,
        "order_index": 2
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_jpn_set1'
    questionFiles: [],
    legacyGenerators: []
};
