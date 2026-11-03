const db = require('./database/db');

// 1. Add status column to subjects if not exists
try {
    const cols = db.prepare("PRAGMA table_info(subjects)").all();
    if (!cols.some(c => c.name === 'status')) {
        db.prepare("ALTER TABLE subjects ADD COLUMN status TEXT DEFAULT 'ready'").run();
        console.log('✅ Added status column to subjects table');
    }
} catch (e) {
    console.error('Column status check:', e.message);
}

// 2. Define subjects from C:\ข้อสอบอีกแล้วว
const newSubjects = [
    {
        id: 'alevel_math2',
        code: '62',
        name_th: 'A-Level คณิตศาสตร์ประยุกต์ 2',
        name_en: 'Applied Mathematics 2',
        category: 'A_LEVEL',
        total_questions: 30,
        total_score: 100,
        duration_minutes: 90,
        description: 'จำนวนและพีชคณิต การวัดและเรขาคณิต สถิติและความน่าจะเป็น (คณิตพื้นฐานสายศิลป์)',
        icon_name: 'calculator',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_m2_1', domain: 'จำนวนและพีชคณิต', subtopic: 'เซต ตรรกศาสตร์ ลำดับและอนุกรม ดอกเบี้ย', questions: 14, weight: 46 },
            { id: 'bp_m2_2', domain: 'การวัดและเรขาคณิต', subtopic: 'เรขาคณิตวิเคราะห์และตรีโกณมิติพื้นฐาน', questions: 4, weight: 14 },
            { id: 'bp_m2_3', domain: 'สถิติและความน่าจะเป็น', subtopic: 'การนำเสนอข้อมูล สถิติวิเคราะห์ และหลักการนับ', questions: 12, weight: 40 }
        ]
    },
    {
        id: 'alevel_sci',
        code: '63',
        name_th: 'A-Level วิทยาศาสตร์ประยุกต์',
        name_en: 'Applied Science',
        category: 'A_LEVEL',
        total_questions: 30,
        total_score: 100,
        duration_minutes: 90,
        description: 'วิทยาศาสตร์ชีวภาพ วิทยาศาสตร์กายภาพ วิทยาศาสตร์โลกและอวกาศ',
        icon_name: 'flask',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_sci_1', domain: 'วิทยาศาสตร์ชีวภาพ', subtopic: 'ระบบนิเวศ พันธุศาสตร์ และสิ่งมีชีวิต', questions: 10, weight: 33.3 },
            { id: 'bp_sci_2', domain: 'วิทยาศาสตร์กายภาพ', subtopic: 'สารและสมบัติของสาร แรงและการเคลื่อนที่ พลังงาน', questions: 10, weight: 33.3 },
            { id: 'bp_sci_3', domain: 'วิทยาศาสตร์โลกและอวกาศ', subtopic: 'ธรณีวิทยา ธรณีพิบัติภัย และดาราศาสตร์', questions: 10, weight: 33.4 }
        ]
    },
    {
        id: 'alevel_phy',
        code: '64',
        name_th: 'A-Level ฟิสิกส์',
        name_en: 'Physics',
        category: 'A_LEVEL',
        total_questions: 30,
        total_score: 100,
        duration_minutes: 90,
        description: 'กลศาสตร์ คลื่นกลและแสง ไฟฟ้าแม่เหล็ก อุณหพลศาสตร์ และฟิสิกส์ยุคใหม่',
        icon_name: 'zap',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_phy_1', domain: 'กลศาสตร์', subtopic: 'การเคลื่อนที่ แรง กฎนิวตัน งาน พลังงาน โมเมนตัม', questions: 10, weight: 32 },
            { id: 'bp_phy_2', domain: 'คลื่นกลและแสง', subtopic: 'คลื่น เสียง แสงเชิงกายภาพและเรขาคณิต', questions: 6, weight: 20 },
            { id: 'bp_phy_3', domain: 'ไฟฟ้าและแม่เหล็ก', subtopic: 'ไฟฟ้าสถิต ไฟฟ้ากระแส แม่เหล็กไฟฟ้า', questions: 7, weight: 24 },
            { id: 'bp_phy_4', domain: 'อุณหพลศาสตร์และสมบัติสาร', subtopic: 'ความร้อน แก๊ส ของแข็งและของไหล', questions: 4, weight: 12 },
            { id: 'bp_phy_5', domain: 'ฟิสิกส์แผนใหม่', subtopic: 'ฟิสิกส์อะตอม ฟิสิกส์นิวเคลียร์และอนุภาค', questions: 3, weight: 12 }
        ]
    },
    {
        id: 'alevel_chem',
        code: '65',
        name_th: 'A-Level เคมี',
        name_en: 'Chemistry',
        category: 'A_LEVEL',
        total_questions: 35,
        total_score: 100,
        duration_minutes: 90,
        description: 'สมบัติอะตอมและตารางธาตุ พันธะเคมี ปริมาณสารสัมพันธ์ สมดุลเคมี กรด-เบส เคมีอินทรีย์',
        icon_name: 'droplet',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_chm_1', domain: 'โครงสร้างและสมบัติของสาร', subtopic: 'อะตอม ตารางธาตุ พันธะเคมี และสารประกอบ', questions: 9, weight: 25 },
            { id: 'bp_chm_2', domain: 'การเปลี่ยนแปลงและปฏิกิริยาเคมี', subtopic: 'ปริมาณสารสัมพันธ์ อัตราการเกิดปฏิกิริยา สมดุลเคมี', questions: 15, weight: 45 },
            { id: 'bp_chm_3', domain: 'เคมีอินทรีย์และสารชีวโมเลกุล', subtopic: 'สารประกอบไฮโดรคาร์บอน พอลิเมอร์ และพลังงาน', questions: 11, weight: 30 }
        ]
    },
    {
        id: 'alevel_bio',
        code: '66',
        name_th: 'A-Level ชีววิทยา',
        name_en: 'Biology',
        category: 'A_LEVEL',
        total_questions: 40,
        total_score: 100,
        duration_minutes: 90,
        description: 'เซลล์และการทำงานของร่างกาย พืช พันธุศาสตร์ วิวัฒนาการ และระบบนิเวศ',
        icon_name: 'feather',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_bio_1', domain: 'เซลล์และกระบวนการทำงาน', subtopic: 'โครงสร้างเซลล์ การลำเลียงสาร เอนไซม์และพลังงาน', questions: 8, weight: 20 },
            { id: 'bp_bio_2', domain: 'กายวิภาคและสรีรวิทยา', subtopic: 'ระบบการทำงานในร่างกายมนุษย์และสัตว์', questions: 12, weight: 30 },
            { id: 'bp_bio_3', domain: 'พฤกษศาสตร์และพืช', subtopic: 'โครงสร้างพืช การสืบพันธุ์ สรีรวิทยาของพืช', questions: 8, weight: 20 },
            { id: 'bp_bio_4', domain: 'พันธุศาสตร์และวิวัฒนาการ', subtopic: 'ดีเอ็นเอ ถ่ายทอดลักษณะ เทคโนโลยีดีเอ็นเอ', questions: 8, weight: 20 },
            { id: 'bp_bio_5', domain: 'นิเวศวิทยาและสิ่งแวดล้อม', subtopic: 'ระบบนิเวศ ห่วงโซ่อาหาร ความหลากหลายทางชีวภาพ', questions: 4, weight: 10 }
        ]
    },
    {
        id: 'alevel_soc',
        code: '70',
        name_th: 'A-Level สังคมศึกษา',
        name_en: 'Social Studies',
        category: 'A_LEVEL',
        total_questions: 50,
        total_score: 100,
        duration_minutes: 90,
        description: 'ศาสนา ศีลธรรม หน้าที่พลเมือง เศรษฐศาสตร์ ประวัติศาสตร์ และภูมิศาสตร์',
        icon_name: 'globe',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_soc_1', domain: 'ศาสนา ศีลธรรม จริยธรรม', subtopic: 'หลักธรรม ค่านิยม และประเพณีวัฒนธรรม', questions: 10, weight: 20 },
            { id: 'bp_soc_2', domain: 'หน้าที่พลเมืองและการเมือง', subtopic: 'กฎหมาย รัฐธรรมนูญ และระบอบประชาธิปไตย', questions: 10, weight: 20 },
            { id: 'bp_soc_3', domain: 'เศรษฐศาสตร์', subtopic: 'อุปสงค์-อุปทาน นโยบายการเงิน-การคลัง เศรษฐกิจพอเพียง', questions: 10, weight: 20 },
            { id: 'bp_soc_4', domain: 'ประวัติศาสตร์', subtopic: 'ประวัติศาสตร์ไทยและสากล การเปลี่ยนแปลงยุคสมัย', questions: 10, weight: 20 },
            { id: 'bp_soc_5', domain: 'ภูมิศาสตร์และสิ่งแวดล้อม', subtopic: 'เครื่องมือทางภูมิศาสตร์ การจัดการทรัพยากรและภัยพิบัติ', questions: 10, weight: 20 }
        ]
    },
    {
        id: 'alevel_thai',
        code: '81',
        name_th: 'A-Level ภาษาไทย',
        name_en: 'Thai Language',
        category: 'A_LEVEL',
        total_questions: 50,
        total_score: 100,
        duration_minutes: 90,
        description: 'การอ่านวิเคราะห์ การเขียนสื่อความ การพูดและการฟัง หลักภาษาและการใช้ภาษาไทย',
        icon_name: 'book-open',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_th_1', domain: 'การอ่าน', subtopic: 'การจับใจความ ตีความ วิเคราะห์จุดประสงค์และทัศนะ', questions: 20, weight: 40 },
            { id: 'bp_th_2', domain: 'การเขียนและการสื่อสาร', subtopic: 'การเรียงลำดับ การใช้คำถูกต้องตามบริบทและสำนวน', questions: 15, weight: 30 },
            { id: 'bp_th_3', domain: 'หลักการใช้ภาษาไทย', subtopic: 'เสียง คำ ประโยค ระดับภาษา และการใช้ภาษาเชิงวิชาการ', questions: 15, weight: 30 }
        ]
    },
    {
        id: 'alevel_eng',
        code: '82',
        name_th: 'A-Level ภาษาอังกฤษ',
        name_en: 'English Language',
        category: 'A_LEVEL',
        total_questions: 80,
        total_score: 100,
        duration_minutes: 90,
        description: 'Listening and Speaking Skills, Reading Skills, Writing Skills (ระดับวิชาการเข้มข้น)',
        icon_name: 'message-square',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_eng_1', domain: 'Listening and Speaking Skills', subtopic: 'Situational Dialogues & Academic Discussions', questions: 20, weight: 25 },
            { id: 'bp_eng_2', domain: 'Reading Skills', subtopic: 'Short & Long Academic Passages, Inference, Tone', questions: 40, weight: 50 },
            { id: 'bp_eng_3', domain: 'Writing Skills', subtopic: 'Text Completion & Paragraph Organization', questions: 20, weight: 25 }
        ]
    },
    {
        id: 'alevel_fra',
        code: '83',
        name_th: 'A-Level ภาษาฝรั่งเศส',
        name_en: 'French Language',
        category: 'A_LEVEL',
        total_questions: 50,
        total_score: 100,
        duration_minutes: 90,
        description: 'Grammaire, Vocabulaire, Expression, et Compréhension écrite',
        icon_name: 'flag',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_fra_1', domain: 'ไวยากรณ์และคำศัพท์', subtopic: 'Grammaire et Vocabulaire fondamental', questions: 25, weight: 50 },
            { id: 'bp_fra_2', domain: 'การอ่านและการสื่อสาร', subtopic: 'Compréhension écrite et situations quotidiennes', questions: 25, weight: 50 }
        ]
    },
    {
        id: 'alevel_deu',
        code: '84',
        name_th: 'A-Level ภาษาเยอรมัน',
        name_en: 'German Language',
        category: 'A_LEVEL',
        total_questions: 50,
        total_score: 100,
        duration_minutes: 90,
        description: 'Grammatik, Wortschatz, Leseverstehen und Kommunikation',
        icon_name: 'flag',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_deu_1', domain: 'ไวยากรณ์และคำศัพท์', subtopic: 'Grammatik und Grundwortschatz', questions: 25, weight: 50 },
            { id: 'bp_deu_2', domain: 'การอ่านและการสื่อสาร', subtopic: 'Leseverstehen und Alltagssituationen', questions: 25, weight: 50 }
        ]
    },
    {
        id: 'alevel_jpn',
        code: '85',
        name_th: 'A-Level ภาษาญี่ปุ่น',
        name_en: 'Japanese Language',
        category: 'A_LEVEL',
        total_questions: 50,
        total_score: 100,
        duration_minutes: 90,
        description: 'ตัวอักษร คันจิ ไวยากรณ์ คำศัพท์ และการอ่านบทความ (ระดับ N4 - N3)',
        icon_name: 'flag',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_jpn_1', domain: 'ตัวอักษร คันจิ และไวยากรณ์', subtopic: '文字・語彙・文法 (Vocab & Grammar N4-N3)', questions: 25, weight: 50 },
            { id: 'bp_jpn_2', domain: 'การอ่านจับใจความและการสื่อสาร', subtopic: '読解・コミュニケーション (Reading Comprehension)', questions: 25, weight: 50 }
        ]
    },
    {
        id: 'alevel_kor',
        code: '86',
        name_th: 'A-Level ภาษาเกาหลี',
        name_en: 'Korean Language',
        category: 'A_LEVEL',
        total_questions: 50,
        total_score: 100,
        duration_minutes: 90,
        description: 'คำศัพท์ ไวยากรณ์ สำนวน และการอ่านเพื่อความเข้าใจ (ระดับ TOPIK I - II)',
        icon_name: 'flag',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_kor_1', domain: 'คำศัพท์และไวยากรณ์', subtopic: '어휘와 문법 (Vocabulary & Grammar)', questions: 25, weight: 50 },
            { id: 'bp_kor_2', domain: 'การอ่านและการสื่อสาร', subtopic: '읽기와 의사소통 (Reading & Communication)', questions: 25, weight: 50 }
        ]
    },
    {
        id: 'alevel_chn',
        code: '87',
        name_th: 'A-Level ภาษาจีน',
        name_en: 'Chinese Language',
        category: 'A_LEVEL',
        total_questions: 50,
        total_score: 100,
        duration_minutes: 90,
        description: 'สัทอักษร พินอิน ไวยากรณ์ คำศัพท์ และการอ่านบทความ (ระดับ HSK 3 - 4)',
        icon_name: 'flag',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_chn_1', domain: 'สัทศาสตร์ ไวยากรณ์และคำศัพท์', subtopic: '语音・词汇・语法 (Phonetics, Vocab, Grammar)', questions: 25, weight: 50 },
            { id: 'bp_chn_2', domain: 'การอ่านจับใจความและวัฒนธรรม', subtopic: '阅读理解・中国文化 (Reading & Culture)', questions: 25, weight: 50 }
        ]
    },
    {
        id: 'alevel_bal',
        code: '88',
        name_th: 'A-Level ภาษาบาลี',
        name_en: 'Pali Language',
        category: 'A_LEVEL',
        total_questions: 50,
        total_score: 100,
        duration_minutes: 90,
        description: 'บาลีไวยากรณ์ สมัญญาภิธาน สนธิ นาม อาขยาต กิตก์ สมาส ตัทธิต และการแปล',
        icon_name: 'flag',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_bal_1', domain: 'บาลีไวยากรณ์', subtopic: 'สมัญญาภิธาน สนธิ นาม อาขยาต กิตก์ สมาส ตัทธิต', questions: 30, weight: 60 },
            { id: 'bp_bal_2', domain: 'การแปลและสัมพันธ์คาถา', subtopic: 'การแปลมคธเป็นไทย และหลักอรรถกถา', questions: 20, weight: 40 }
        ]
    },
    {
        id: 'alevel_esp',
        code: '89',
        name_th: 'A-Level ภาษาสเปน',
        name_en: 'Spanish Language',
        category: 'A_LEVEL',
        total_questions: 50,
        total_score: 100,
        duration_minutes: 90,
        description: 'Gramática, Vocabulario, Lectura y Comunicación en español (DELE A2 - B1)',
        icon_name: 'flag',
        status: 'coming_soon',
        blueprints: [
            { id: 'bp_esp_1', domain: 'ไวยากรณ์และคำศัพท์', subtopic: 'Gramática y Vocabulario (DELE A2-B1)', questions: 25, weight: 50 },
            { id: 'bp_esp_2', domain: 'การอ่านและการสื่อสาร', subtopic: 'Comprensión de lectura y situaciones', questions: 25, weight: 50 }
        ]
    }
];

// Ensure existing subjects are marked ready
db.prepare("UPDATE subjects SET status = 'ready' WHERE id IN ('tgat1', 'tgat2', 'tgat3')").run();
db.prepare("UPDATE subjects SET status = 'coming_soon' WHERE id IN ('tpat3')").run();

// Upsert subjects and blueprints
const insertSub = db.prepare(`
    INSERT INTO subjects (id, code, name_th, name_en, category, total_questions, total_score, duration_minutes, description, icon_name, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        code = excluded.code,
        name_th = excluded.name_th,
        name_en = excluded.name_en,
        category = excluded.category,
        total_questions = excluded.total_questions,
        total_score = excluded.total_score,
        duration_minutes = excluded.duration_minutes,
        description = excluded.description,
        icon_name = excluded.icon_name,
        status = excluded.status
`);

const insertBp = db.prepare(`
    INSERT INTO blueprints (id, subject_id, domain_name, subtopic_name, description, target_questions, score_weight, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        domain_name = excluded.domain_name,
        subtopic_name = excluded.subtopic_name,
        description = excluded.description,
        target_questions = excluded.target_questions,
        score_weight = excluded.score_weight,
        order_index = excluded.order_index
`);

const tx = db.transaction(() => {
    for (const sub of newSubjects) {
        insertSub.run(
            sub.id,
            sub.code,
            sub.name_th,
            sub.name_en,
            sub.category,
            sub.total_questions,
            sub.total_score,
            sub.duration_minutes,
            sub.description,
            sub.icon_name,
            sub.status
        );

        if (sub.blueprints) {
            sub.blueprints.forEach((bp, idx) => {
                insertBp.run(
                    bp.id,
                    sub.id,
                    bp.domain,
                    bp.subtopic,
                    `${bp.domain} - ${bp.subtopic}`,
                    bp.questions,
                    bp.weight,
                    idx + 1
                );
            });
        }
    }
});

tx();

console.log('✅ All subjects from C:\\ข้อสอบอีกแล้วว inserted successfully with status = coming_soon!');
const allSubs = db.prepare("SELECT id, code, name_th, category, status FROM subjects ORDER BY category, code").all();
console.table(allSubs);
