/**
 * Subject Module: A-Level สังคมศึกษา (70)
 * Owned by: Exam Subject Agent (alevel_soc)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_soc",
    "code": "70",
    "name_th": "A-Level สังคมศึกษา",
    "name_en": "Social Studies",
    "category": "A_LEVEL",
    "total_questions": 50,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "ศาสนา ศีลธรรม หน้าที่พลเมือง เศรษฐศาสตร์ ประวัติศาสตร์ และภูมิศาสตร์",
    "icon_name": "globe",
    "status": "coming_soon"
},
    blueprints: [
    {
        "id": "bp_soc_1",
        "subject_id": "alevel_soc",
        "domain_name": "ศาสนา ศีลธรรม จริยธรรม",
        "subtopic_name": "หลักธรรม ค่านิยม และประเพณีวัฒนธรรม",
        "description": "ศาสนา ศีลธรรม จริยธรรม - หลักธรรม ค่านิยม และประเพณีวัฒนธรรม",
        "target_questions": 10,
        "score_weight": 20,
        "order_index": 1
    },
    {
        "id": "bp_soc_2",
        "subject_id": "alevel_soc",
        "domain_name": "หน้าที่พลเมืองและการเมือง",
        "subtopic_name": "กฎหมาย รัฐธรรมนูญ และระบอบประชาธิปไตย",
        "description": "หน้าที่พลเมืองและการเมือง - กฎหมาย รัฐธรรมนูญ และระบอบประชาธิปไตย",
        "target_questions": 10,
        "score_weight": 20,
        "order_index": 2
    },
    {
        "id": "bp_soc_3",
        "subject_id": "alevel_soc",
        "domain_name": "เศรษฐศาสตร์",
        "subtopic_name": "อุปสงค์-อุปทาน นโยบายการเงิน-การคลัง เศรษฐกิจพอเพียง",
        "description": "เศรษฐศาสตร์ - อุปสงค์-อุปทาน นโยบายการเงิน-การคลัง เศรษฐกิจพอเพียง",
        "target_questions": 10,
        "score_weight": 20,
        "order_index": 3
    },
    {
        "id": "bp_soc_4",
        "subject_id": "alevel_soc",
        "domain_name": "ประวัติศาสตร์",
        "subtopic_name": "ประวัติศาสตร์ไทยและสากล การเปลี่ยนแปลงยุคสมัย",
        "description": "ประวัติศาสตร์ - ประวัติศาสตร์ไทยและสากล การเปลี่ยนแปลงยุคสมัย",
        "target_questions": 10,
        "score_weight": 20,
        "order_index": 4
    },
    {
        "id": "bp_soc_5",
        "subject_id": "alevel_soc",
        "domain_name": "ภูมิศาสตร์และสิ่งแวดล้อม",
        "subtopic_name": "เครื่องมือทางภูมิศาสตร์ การจัดการทรัพยากรและภัยพิบัติ",
        "description": "ภูมิศาสตร์และสิ่งแวดล้อม - เครื่องมือทางภูมิศาสตร์ การจัดการทรัพยากรและภัยพิบัติ",
        "target_questions": 10,
        "score_weight": 20,
        "order_index": 5
    }
],
    cheatsheet: null,
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_soc_set1'
    questionFiles: [],
    legacyGenerators: []
};
