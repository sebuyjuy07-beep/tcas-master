/**
 * Subject Module: A-Level ภาษาอังกฤษ (82)
 * Owned by: Exam Subject Agent (alevel_eng)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_eng",
    "code": "82",
    "name_th": "A-Level ภาษาอังกฤษ",
    "name_en": "English Language",
    "category": "A_LEVEL",
    "total_questions": 80,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "Listening and Speaking Skills, Reading Skills, Writing Skills (ระดับวิชาการเข้มข้น)",
    "icon_name": "message-square",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_eng_1",
        "subject_id": "alevel_eng",
        "domain_name": "Listening and Speaking Skills",
        "subtopic_name": "Situational Dialogues & Academic Discussions",
        "description": "Listening and Speaking Skills - Situational Dialogues & Academic Discussions",
        "target_questions": 20,
        "score_weight": 25,
        "order_index": 1
    },
    {
        "id": "bp_eng_2",
        "subject_id": "alevel_eng",
        "domain_name": "Reading Skills",
        "subtopic_name": "Short & Long Academic Passages, Inference, Tone",
        "description": "Reading Skills - Short & Long Academic Passages, Inference, Tone",
        "target_questions": 40,
        "score_weight": 50,
        "order_index": 2
    },
    {
        "id": "bp_eng_3",
        "subject_id": "alevel_eng",
        "domain_name": "Writing Skills",
        "subtopic_name": "Text Completion & Paragraph Organization",
        "description": "Writing Skills - Text Completion & Paragraph Organization",
        "target_questions": 20,
        "score_weight": 25,
        "order_index": 3
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_eng_set1'
    questionFiles: [],
    legacyGenerators: []
};
