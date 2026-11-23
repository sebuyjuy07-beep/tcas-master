/**
 * Subject Module: A-Level ภาษาบาลี (88)
 * Owned by: Exam Subject Agent (alevel_bal)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_bal",
    "code": "88",
    "name_th": "A-Level ภาษาบาลี",
    "name_en": "Pali Language",
    "category": "A_LEVEL",
    "total_questions": 50,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "บาลีไวยากรณ์ สมัญญาภิธาน สนธิ นาม อาขยาต กิตก์ สมาส ตัทธิต และการแปล",
    "icon_name": "flag",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_bal_1",
        "subject_id": "alevel_bal",
        "domain_name": "บาลีไวยากรณ์",
        "subtopic_name": "สมัญญาภิธาน สนธิ นาม อาขยาต กิตก์ สมาส ตัทธิต",
        "description": "บาลีไวยากรณ์ - สมัญญาภิธาน สนธิ นาม อาขยาต กิตก์ สมาส ตัทธิต",
        "target_questions": 30,
        "score_weight": 60,
        "order_index": 1
    },
    {
        "id": "bp_bal_2",
        "subject_id": "alevel_bal",
        "domain_name": "การแปลและสัมพันธ์คาถา",
        "subtopic_name": "การแปลมคธเป็นไทย และหลักอรรถกถา",
        "description": "การแปลและสัมพันธ์คาถา - การแปลมคธเป็นไทย และหลักอรรถกถา",
        "target_questions": 20,
        "score_weight": 40,
        "order_index": 2
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_bal_set1'
    questionFiles: [],
    legacyGenerators: []
};
