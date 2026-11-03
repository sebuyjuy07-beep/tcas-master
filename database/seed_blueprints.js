const db = require('./db');

const subjects = [
    {
        id: 'tgat1',
        code: '91',
        name_th: 'TGAT1 การสื่อสารภาษาอังกฤษ',
        name_en: 'English Communication',
        category: 'TGAT',
        total_questions: 60,
        total_score: 100,
        duration_minutes: 60,
        description: 'วัดทักษะการสื่อสารภาษาอังกฤษ ทั้งการพูด (Speaking) และการอ่าน (Reading) ในบริบทชีวิตประจำวันและการทำงาน',
        icon_name: 'languages'
    },
    {
        id: 'tgat2',
        code: '92',
        name_th: 'TGAT2 การคิดอย่างมีเหตุผล',
        name_en: 'Critical & Logical Thinking',
        category: 'TGAT',
        total_questions: 80,
        total_score: 100,
        duration_minutes: 60,
        description: 'วัดความสามารถทางภาษา, ตัวเลข, มิติสัมพันธ์ และเหตุผล เน้นความเร็วและความแม่นยำ (เฉลี่ยข้อละ 45 วินาที)',
        icon_name: 'brain'
    },
    {
        id: 'tgat3',
        code: '93',
        name_th: 'TGAT3 สมรรถนะการทำงาน',
        name_en: 'Future Workforce Competencies',
        category: 'TGAT',
        total_questions: 60,
        total_score: 100,
        duration_minutes: 60,
        description: 'วัดทัศนคติและสมรรถนะในการทำงานในอนาคต เช่น การสร้างนวัตกรรม, การแก้ปัญหาซับซ้อน, EQ และจิตสำนึกต่อสังคม',
        icon_name: 'briefcase'
    },
    {
        id: 'alevel_math1',
        code: '61',
        name_th: 'A-Level คณิตศาสตร์ประยุกต์ 1',
        name_en: 'Applied Mathematics 1',
        category: 'A_LEVEL',
        total_questions: 30,
        total_score: 100,
        duration_minutes: 90,
        description: 'ข้อสอบคณิตศาสตร์ระดับ ม.ปลาย (สายวิทย์-คณิต) ครอบคลุม พีชคณิต, แคลคูลัส, สถิติ, ตรีโกณมิติ และเวกเตอร์',
        icon_name: 'calculator'
    },
    {
        id: 'tpat3',
        code: '30',
        name_th: 'TPAT3 ความถนัดวิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์',
        name_en: 'Science, Technology, and Engineering Aptitude',
        category: 'TPAT',
        total_questions: 70,
        total_score: 100,
        duration_minutes: 180,
        description: 'วัดความถนัดเชิงตัวเลข มิติสัมพันธ์ เชิงกลและฟิสิกส์ประยุกต์ พร้อมความรู้ด้านวิทยาการคำนวณและเทคโนโลยี',
        icon_name: 'cpu'
    }
];

const blueprints = [
    // --- TGAT 1 ---
    {
        id: 'tgat1_spk_qr',
        subject_id: 'tgat1',
        domain_name: 'ทักษะการพูด (Speaking Skill)',
        subtopic_name: '1.1 Question-Response',
        description: 'ถาม-ตอบสั้นๆ เลือกคำตอบที่เหมาะสมกับคำถามหรือประโยคที่กำหนดให้ตามมารยาททางสังคมและบริบท',
        target_questions: 10,
        score_weight: 16.67,
        order_index: 1
    },
    {
        id: 'tgat1_spk_sc',
        subject_id: 'tgat1',
        domain_name: 'ทักษะการพูด (Speaking Skill)',
        subtopic_name: '1.2 Short Conversation',
        description: 'บทสนทนาสั้น 3-4 บทสนทนา ในสถานการณ์ต่างๆ เช่น การถามทาง สั่งอาหาร ขอความช่วยเหลือ หรือปรึกษาเพื่อน',
        target_questions: 10,
        score_weight: 16.67,
        order_index: 2
    },
    {
        id: 'tgat1_spk_lc',
        subject_id: 'tgat1',
        domain_name: 'ทักษะการพูด (Speaking Skill)',
        subtopic_name: '1.3 Long Conversation',
        description: 'บทสนทนายาว 2 บทสนทนา มีการแลกเปลี่ยนความคิดเห็นหรือเจรจาต่อรอง',
        target_questions: 10,
        score_weight: 16.67,
        order_index: 3
    },
    {
        id: 'tgat1_rd_tc',
        subject_id: 'tgat1',
        domain_name: 'ทักษะการอ่าน (Reading Skill)',
        subtopic_name: '2.1 Text Completion (Cloze Test)',
        description: 'เติมคำหรือข้อความลงในช่องว่างของบทความให้ได้ใจความสมบูรณ์และถูกต้องตามไวยากรณ์ (Grammar & Vocabulary in context)',
        target_questions: 15,
        score_weight: 25.0,
        order_index: 4
    },
    {
        id: 'tgat1_rd_rc',
        subject_id: 'tgat1',
        domain_name: 'ทักษะการอ่าน (Reading Skill)',
        subtopic_name: '2.2 Reading Comprehension',
        description: 'อ่านบทความ ข่าว ประกาศ กราฟ/อินโฟกราฟิก แล้วตอบคำถามจับใจความ ตีความ ทัศนคติผู้เขียน และวัตถุประสงค์',
        target_questions: 15,
        score_weight: 25.0,
        order_index: 5
    },

    // --- TGAT 2 ---
    {
        id: 'tgat2_verbal',
        subject_id: 'tgat2',
        domain_name: 'ความสามารถทางภาษา (Verbal Ability)',
        subtopic_name: '1. ภาษาไทยเชิงวิเคราะห์และการสื่อความ',
        description: 'การเรียงลำดับข้อความ, การจับใจความสำคัญ, การสรุปความ, การใช้ภาษาฟุ่มเฟือย/กำกวม และการเลือกใช้คำให้ตรงความหมาย',
        target_questions: 20,
        score_weight: 25.0,
        order_index: 1
    },
    {
        id: 'tgat2_numerical',
        subject_id: 'tgat2',
        domain_name: 'ความสามารถทางตัวเลข (Numerical Ability)',
        subtopic_name: '2. อนุกรมและคณิตศาสตร์เหตุผล',
        description: 'อนุกรมตัวเลขหลากชั้น, การเปรียบเทียบเชิงปริมาณ (คอลัมน์ A vs B), การคำนวณร้อยละ อัตราส่วน และโจทย์คณิตศาสตร์เชาวน์',
        target_questions: 20,
        score_weight: 25.0,
        order_index: 2
    },
    {
        id: 'tgat2_spatial',
        subject_id: 'tgat2',
        domain_name: 'ความสามารถทางมิติสัมพันธ์ (Spatial Ability)',
        subtopic_name: '3. มิติสัมพันธ์และการจัดวางรูปทรง',
        description: 'การหมุนภาพ 2 มิติและ 3 มิติ, การพับลูกบาศก์/กล่องคลี่, อนุกรมภาพเรขาคณิต, การประกอบรูปชิ้นส่วน และการตัดพับกระดาษ',
        target_questions: 20,
        score_weight: 25.0,
        order_index: 3
    },
    {
        id: 'tgat2_reasoning',
        subject_id: 'tgat2',
        domain_name: 'ความสามารถทางเหตุผล (Logical Reasoning)',
        subtopic_name: '4. ตรรกะและเหตุผลเชิงนามธรรม',
        description: 'การวิเคราะห์ข้อความเชิงตรรกศาสตร์ (ถ้า...แล้ว), การสรุปความจากเงื่อนไขสัญลักษณ์, อุปมาอุปไมย และการหาข้อสรุปที่สมเหตุสมผล',
        target_questions: 20,
        score_weight: 25.0,
        order_index: 4
    },

    // --- TGAT 3 ---
    {
        id: 'tgat3_value',
        subject_id: 'tgat3',
        domain_name: 'สมรรถนะการทำงาน (Workplace Competencies)',
        subtopic_name: '1. การสร้างคุณค่าและนวัตกรรม',
        description: 'การคิดเชิงวิพากษ์ (Critical Thinking), การคิดสร้างสรรค์ (Creative Thinking), และการแก้ปัญหาเพื่อสร้างมูลค่าเพิ่มแก่องค์กร',
        target_questions: 15,
        score_weight: 25.0,
        order_index: 1
    },
    {
        id: 'tgat3_complex_prob',
        subject_id: 'tgat3',
        domain_name: 'สมรรถนะการทำงาน (Workplace Competencies)',
        subtopic_name: '2. การแก้ไขปัญหาที่ซับซ้อน',
        description: 'การระบุรากเหง้าของปัญหา (Root Cause), การค้นหาทางเลือก, การประเมินความเสี่ยง และการตัดสินใจในสถานการณ์กำกวม',
        target_questions: 15,
        score_weight: 25.0,
        order_index: 2
    },
    {
        id: 'tgat3_emotional',
        subject_id: 'tgat3',
        domain_name: 'สมรรถนะการทำงาน (Workplace Competencies)',
        subtopic_name: '3. การบริหารจัดการอารมณ์และสัมพันธภาพ',
        description: 'ความตระหนักรู้ในตนเอง (Self-Awareness), การควบคุมอารมณ์ภายใต้ความกดดัน, ความเห็นอกเห็นใจ (Empathy) และการทำงานเป็นทีม',
        target_questions: 15,
        score_weight: 25.0,
        order_index: 3
    },
    {
        id: 'tgat3_civic',
        subject_id: 'tgat3',
        domain_name: 'สมรรถนะการทำงาน (Workplace Competencies)',
        subtopic_name: '4. การเป็นพลเมืองที่มีส่วนร่วมของสังคม',
        description: 'จิตสำนึกต่อสิ่งแวดล้อม (Sustainability), จริยธรรมในการทำงาน, ความรับผิดชอบต่อส่วนรวม และการเคารพความหลากหลาย',
        target_questions: 15,
        score_weight: 25.0,
        order_index: 4
    },

    // --- A-Level Math 1 ---
    {
        id: 'alevel_math_algebra',
        subject_id: 'alevel_math1',
        domain_name: 'สาระจำนวนและพีชคณิต',
        subtopic_name: 'เซต, ตรรกศาสตร์, ฟังก์ชัน, เอกซ์โพ/ลอการิทึม, เมทริกซ์, ลำดับและอนุกรม',
        description: 'การแก้สมการ อสมการ การดำเนินการฟังก์ชัน และการประยุกต์เรื่องลำดับอนุกรม',
        target_questions: 11,
        score_weight: 36.6,
        order_index: 1
    },
    {
        id: 'alevel_math_geo',
        subject_id: 'alevel_math1',
        domain_name: 'สาระการวัดและเรขาคณิต',
        subtopic_name: 'เรขาคณิตวิเคราะห์ ภาคตัดกรวย ตรีโกณมิติ และเวกเตอร์',
        description: 'สมการวงกลม วงรี พาราโบลา ไฮเพอร์โบลา ฟังก์ชันตรีโกณมิติ และผลคูณเชิงสเกลาร์/เวกเตอร์',
        target_questions: 6,
        score_weight: 20.0,
        order_index: 2
    },
    {
        id: 'alevel_math_stats',
        subject_id: 'alevel_math1',
        domain_name: 'สาระสถิติและความน่าจะเป็น',
        subtopic_name: 'สถิติศาสตร์, หลักการนับเบื้องต้น, ความน่าจะเป็น, การแจกแจงความน่าจะเป็น',
        description: 'ค่ากลาง ตำแหน่งข้อมูล การกระจาย การแจกแจงทวินาม และการแจกแจงปกติ',
        target_questions: 7,
        score_weight: 23.4,
        order_index: 3
    },
    {
        id: 'alevel_math_calc',
        subject_id: 'alevel_math1',
        domain_name: 'สาระแคลคูลัส',
        subtopic_name: 'ลิมิต ความต่อเนื่อง อนุพันธ์ และปริพันธ์',
        description: 'การหาอนุพันธ์ การประยุกต์หาจุดสูงสุด-ต่ำสุดสัมพัทธ์ และพื้นที่ใต้เส้นโค้ง',
        target_questions: 6,
        score_weight: 20.0,
        order_index: 4
    },

    // --- TPAT 3: Science, Technology & Engineering Aptitude ---
    {
        id: 'tpat3_num',
        subject_id: 'tpat3',
        domain_name: 'การทดสอบความถนัด (Aptitude Test)',
        subtopic_name: '1. ด้านตัวเลข (Numerical Aptitude)',
        description: 'การคิดคำนวณตัวเลขทางวิทยาศาสตร์ การวิเคราะห์อัตราส่วน ร้อยละ และความน่าจะเป็นเชิงวิศวกรรม',
        target_questions: 15,
        score_weight: 20.0,
        order_index: 1
    },
    {
        id: 'tpat3_spatial',
        subject_id: 'tpat3',
        domain_name: 'การทดสอบความถนัด (Aptitude Test)',
        subtopic_name: '2. ด้านมิติสัมพันธ์ (Spatial Aptitude)',
        description: 'การมองภาพ 3 มิติ การหมุนวัตถุ ภาพฉาย (Orthographic Projection) และการคลี่รูปทรงเรขาคณิต',
        target_questions: 15,
        score_weight: 20.0,
        order_index: 2
    },
    {
        id: 'tpat3_mech',
        subject_id: 'tpat3',
        domain_name: 'การทดสอบความถนัด (Aptitude Test)',
        subtopic_name: '3. ด้านเชิงกลและฟิสิกส์ประยุกต์ (Mechanical & Physics)',
        description: 'กลศาสตร์พื้นฐาน รอก คาน เฟือง ไฮดรอลิกส์ และวงจรไฟฟ้าประยุกต์',
        target_questions: 15,
        score_weight: 20.0,
        order_index: 3
    },
    {
        id: 'tpat3_science',
        subject_id: 'tpat3',
        domain_name: 'การทดสอบความคิดเชิงวิทยาศาสตร์และเทคโนโลยี',
        subtopic_name: '4. ความคิดเชิงวิทยาศาสตร์และวิศวกรรม (Engineering Thinking)',
        description: 'การแก้ปัญหาทางวิศวกรรม การตั้งสมมติฐาน และการวิเคราะห์ข้อผิดพลาดในระบบ',
        target_questions: 15,
        score_weight: 20.0,
        order_index: 4
    },
    {
        id: 'tpat3_computing',
        subject_id: 'tpat3',
        domain_name: 'การทดสอบความคิดเชิงวิทยาศาสตร์และเทคโนโลยี',
        subtopic_name: '5. ความรู้ด้านวิทยาการคำนวณและเทคโนโลยี (Computational Thinking)',
        description: 'ตรรกะคอมพิวเตอร์ ผังงาน (Flowchart) ความปลอดภัยไซเบอร์ และเทคโนโลยีปัญญาประดิษฐ์',
        target_questions: 10,
        score_weight: 20.0,
        order_index: 5
    }
];

function seed() {
    const insertSubject = db.prepare(`
        INSERT INTO subjects (id, code, name_th, name_en, category, total_questions, total_score, duration_minutes, description, icon_name)
        VALUES (@id, @code, @name_th, @name_en, @category, @total_questions, @total_score, @duration_minutes, @description, @icon_name)
        ON CONFLICT(id) DO UPDATE SET
            code = excluded.code,
            name_th = excluded.name_th,
            name_en = excluded.name_en,
            category = excluded.category,
            total_questions = excluded.total_questions,
            total_score = excluded.total_score,
            duration_minutes = excluded.duration_minutes,
            description = excluded.description,
            icon_name = excluded.icon_name
    `);

    const insertBlueprint = db.prepare(`
        INSERT INTO blueprints (id, subject_id, domain_name, subtopic_name, description, target_questions, score_weight, order_index)
        VALUES (@id, @subject_id, @domain_name, @subtopic_name, @description, @target_questions, @score_weight, @order_index)
        ON CONFLICT(id) DO UPDATE SET
            subject_id = excluded.subject_id,
            domain_name = excluded.domain_name,
            subtopic_name = excluded.subtopic_name,
            description = excluded.description,
            target_questions = excluded.target_questions,
            score_weight = excluded.score_weight,
            order_index = excluded.order_index
    `);

    const transaction = db.transaction(() => {
        for (const s of subjects) {
            insertSubject.run(s);
        }
        for (const b of blueprints) {
            insertBlueprint.run(b);
        }
    });

    transaction();
    console.log(`✅ Seeded ${subjects.length} subjects and ${blueprints.length} blueprints successfully!`);
}

if (require.main === module) {
    seed();
}

module.exports = { seed, subjects, blueprints };
