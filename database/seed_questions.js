const db = require('./db');

const sampleQuestions = [
    // ==========================================
    // TGAT 1: English Communication
    // ==========================================
    {
        id: 'q_tgat1_01',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_qr',
        stimulus: null,
        question_text: 'Situation: You are in an elevator with a colleague who looks distressed holding a stack of dropped documents.\n\nWhat is the most appropriate question to offer assistance?',
        difficulty: 'easy',
        explanation: 'ในการเสนอความช่วยเหลือ (Offering help) สำนวนที่สุภาพและเป็นธรรมชาติที่สุดในบริบทเพื่อนร่วมงานคือ "Would you like a hand with that?" (ต้องการให้ช่วยไหม) ส่วนสำนวน "Give me that" เป็นคำสั่ง และ "Why did you drop it?" เป็นการซ้ำเติม',
        trap_analysis: 'ระวังตัวเลือกที่แปลตรงตัวจากภาษาไทย เช่น "Can I assist your problem?" ซึ่งไม่เป็นธรรมชาติในภาษาอังกฤษ',
        options: [
            { label: '1', content: 'Why did you drop all of those files?', is_correct: 0 },
            { label: '2', content: 'Would you like a hand with that?', is_correct: 1 },
            { label: '3', content: 'You should have been more careful.', is_correct: 0 },
            { label: '4', content: 'Give me that right now.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_02',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Mark: "I really apologize for missing the project deadline yesterday. My laptop crashed completely."\nProject Lead: "_______, but please ensure your backup is synced to the cloud from now on."',
        question_text: 'Which response best fits the Project Lead\'s professional and understanding tone?',
        difficulty: 'medium',
        explanation: 'สำนวน "I understand, these things happen" แสดงถึงความเข้าใจอย่างมืออาชีพพร้อมรับคำขอโทษ ก่อนที่จะให้คำแนะนำเรื่องการสำรองข้อมูลในประโยคถัดไป',
        trap_analysis: 'ตัวเลือก "It doesn\'t matter at all" ดูไม่จริงจังต่อกำหนดส่งงาน และ "You must buy a new computer" ก้าวก่ายเกินไป',
        options: [
            { label: '1', content: 'It doesn\'t matter at all, take your time.', is_correct: 0 },
            { label: '2', content: 'I understand, these things happen', is_correct: 1 },
            { label: '3', content: 'Never say sorry to me again.', is_correct: 0 },
            { label: '4', content: 'You must buy a brand new computer immediately.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_03',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Autonomous electric vehicles are projected to transform public transit. However, widespread adoption still hinges on infrastructure availability. Without robust charging networks and unified regulations, consumers remain (1)_______ to make the transition away from fossil fuels.',
        question_text: 'Choose the best word to fill in blank (1):',
        difficulty: 'medium',
        explanation: 'บริบทบอกว่า "หากปราศจากโครงสร้างพื้นฐานที่ดีและกฎหมายที่ชัดเจน ผู้บริโภคก็ยังคง..." คำว่า "reluctant" (ลังเล / ไม่เต็มใจ) จึงสอดคล้องกับความหมายเชิงลบของประโยคที่สุด',
        trap_analysis: 'คำว่า "eager" (กระตือรือร้น) หรือ "determined" (มุ่งมั่น) จะขัดแย้งกับคำว่า "Without robust charging networks"',
        options: [
            { label: '1', content: 'reluctant', is_correct: 1 },
            { label: '2', content: 'eager', is_correct: 0 },
            { label: '3', content: 'determined', is_correct: 0 },
            { label: '4', content: 'indifferent', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_04',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Recent sleep neuroscience research highlights the critical role of slow-wave sleep in synaptic pruning—a cellular process where the brain removes redundant neural connections formed during wakefulness. Far from being a passive rest period, non-REM sleep acts as an active housekeeping phase that consolidates working memory and enhances cognitive flexibility for subsequent learning.',
        question_text: 'According to the passage, what is the primary function of "synaptic pruning" during sleep?',
        difficulty: 'hard',
        explanation: 'บทความระบุชัดเจนว่า synaptic pruning คือ "a cellular process where the brain removes redundant neural connections" ซึ่งหมายถึงการตัด/กำจัดการเชื่อมต่อของเซลล์ประสาทที่ไม่จำเป็นออก เพื่อเพิ่มประสิทธิภาพการเรียนรู้',
        trap_analysis: 'อย่าสับสนกับคำว่า "creates new memories directly" เพราะ pruning แปลว่าการตัดแต่งกิ่งไม้ (กำจัดของส่วนเกิน)',
        options: [
            { label: '1', content: 'Eliminating unnecessary neural pathways to optimize brain function', is_correct: 1 },
            { label: '2', content: 'Triggering rapid eye movement for emotional dreaming', is_correct: 0 },
            { label: '3', content: 'Preventing the brain from entering deep sleep stages', is_correct: 0 },
            { label: '4', content: 'Generating additional neurons to replace damaged cells', is_correct: 0 }
        ]
    },

    // ==========================================
    // TGAT 2: Critical & Logical Thinking
    // ==========================================
    {
        id: 'q_tgat2_01',
        subject_id: 'tgat2',
        blueprint_id: 'tgat2_verbal',
        stimulus: 'พิจารณาข้อความต่อไปนี้:\n(1) ปัจจุบันขยะอิเล็กทรอนิกส์เพิ่มปริมาณขึ้นอย่างรวดเร็วทั่วโลก\n(2) เนื่องจากความก้าวหน้าทางเทคโนโลยีที่ทำให้มีการเปลี่ยนอุปกรณ์ใหม่บ่อยครั้ง\n(3) ส่งผลให้สารพิษปนเปื้อนลงสู่แหล่งน้ำใต้ดินและระบบนิเวศ\n(4) การสร้างจิตสำนึกและการออกกฎหมายรีไซเคิลที่เข้มงวดจึงเป็นทางออกเร่งด่วน',
        question_text: 'ข้อใดคือ "ใจความสำคัญที่สุด" (Main Idea) ของข้อความนี้?',
        difficulty: 'medium',
        explanation: 'โครงสร้างของบทความนี้ขึ้นต้นด้วยการระบุปัญหา (ขยะเพิ่ม) -> สาเหตุ (เทคโนโลยีเปลี่ยนเร็ว) -> ผลกระทบ (สารพิษปนเปื้อน) และจบด้วย "ข้อสรุป/ทางออก" ในข้อ (4) ดังนั้น ใจความสำคัญคือจำเป็นต้องเร่งแก้ปัญหาด้วยกฎหมายและจิตสำนึกรีไซเคิล',
        trap_analysis: 'ผู้สอบมักเลือกข้อ (1) เพราะเป็นประโยคแรก แต่ประโยคแรกเป็นเพียงแค่การเกริ่นปัญหา (Background) ไม่ใช่ประเด็นหลักที่ผู้เขียนต้องการเน้น',
        options: [
            { label: '1', content: 'เทคโนโลยีที่เปลี่ยนเร็วเป็นต้นเหตุหลักของขยะอิเล็กทรอนิกส์', is_correct: 0 },
            { label: '2', content: 'สารพิษจากอุปกรณ์ไอทีสร้างมลพิษต่อแหล่งน้ำใต้ดิน', is_correct: 0 },
            { label: '3', content: 'การเร่งแก้ปัญหาขยะอิเล็กทรอนิกส์ด้วยกฎหมายและจิตสำนึกรีไซเคิล', is_correct: 1 },
            { label: '4', content: 'ปริมาณขยะอิเล็กทรอนิกส์ที่เพิ่มขึ้นสูงในปัจจุบัน', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat2_02',
        subject_id: 'tgat2',
        blueprint_id: 'tgat2_numerical',
        stimulus: null,
        question_text: 'พิจารณาอนุกรมตัวเลขต่อไปนี้:\n3, 7, 16, 35, 74, ?\n\nตัวเลขถัดไปในเครื่องหมาย ? คือจำนวนใด?',
        difficulty: 'medium',
        explanation: 'สังเกตรูปแบบความสัมพันธ์แบบ x2 + ค่าคงที่เพิ่มขึ้น:\n- 3 x 2 + 1 = 7\n- 7 x 2 + 2 = 16\n- 16 x 2 + 3 = 35\n- 35 x 2 + 4 = 74\nดังนั้น พจน์ถัดไปคือ: 74 x 2 + 5 = 148 + 5 = 153',
        trap_analysis: 'ถ้าคิดแบบผลต่างชั้นเดียว: +4, +9, +19, +39 ผลต่างชั้นที่สองคือ +5, +10, +20 (คูณ 2) ชั้นถัดไปคือ +40 -> 39 + 40 = 79 -> 74 + 79 = 153 ได้คำตอบเท่ากัน แต่การคิดแบบคูณ 2 แล้วบวก n จะเร็วกว่าในห้องสอบ',
        options: [
            { label: '1', content: '148', is_correct: 0 },
            { label: '2', content: '151', is_correct: 0 },
            { label: '3', content: '153', is_correct: 1 },
            { label: '4', content: '155', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat2_03',
        subject_id: 'tgat2',
        blueprint_id: 'tgat2_spatial',
        stimulus: null,
        question_text: 'เมื่อคลี่ลูกบาศก์ออกมาเป็นรูปกางเขน (Net of a cube):\n- หน้า A อยู่ตรงข้ามกับหน้า C\n- หน้า B อยู่ตรงข้ามกับหน้า D\n- หน้า E อยู่ตรงข้ามกับหน้า F\nถ้านำมาประกอบกลับเป็นลูกบาศก์ แล้วมองเห็นหน้า A อยู่ด้านบน และหน้า B อยู่ด้านหน้า\n\nหน้าใดต่อไปนี้ "ไม่มีทาง" อยู่ติดกับหน้า A ได้?',
        difficulty: 'easy',
        explanation: 'ตามเงื่อนไขที่กำหนด หน้า A อยู่ตรงข้ามกับหน้า C เมื่อประกอบเป็นลูกบาศก์ หน้าที่อยู่ "ตรงข้ามกัน" จะไม่มีวันขนานหรือแตะติดกันได้เลย ดังนั้นหน้า C จึงไม่มีทางอยู่ติดกับหน้า A',
        trap_analysis: 'อย่าเสียเวลานึกทิศทางหมุน 3 มิตินานเกินไป ให้ดูนิยามของ "หน้าตรงข้าม" ทันที หน้าตรงข้ามจะไม่มีทางแชร์ขอบหรืออยู่ติดกัน',
        options: [
            { label: '1', content: 'หน้า B', is_correct: 0 },
            { label: '2', content: 'หน้า C', is_correct: 1 },
            { label: '3', content: 'หน้า E', is_correct: 0 },
            { label: '4', content: 'หน้า F', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat2_04',
        subject_id: 'tgat2',
        blueprint_id: 'tgat2_reasoning',
        stimulus: null,
        question_text: 'กำหนดเงื่อนไขตรรกศาสตร์:\n1. นักเรียนทุกคนที่สอบผ่าน TGAT ได้ฝึกทำข้อสอบจับเวลา\n2. คนที่ฝึกทำข้อสอบจับเวลาทุกคน จะบริหารเวลาในห้องสอบได้ดี\n3. กานดาเป็นนักเรียนที่บริหารเวลาในห้องสอบได้ไม่ดี\n\nข้อใดสรุปได้อย่าง "สมเหตุสมผลที่สุด"?',
        difficulty: 'medium',
        explanation: 'จากเงื่อนไข:\n(สอบผ่าน TGAT) -> (ฝึกทำจับเวลา) -> (บริหารเวลาได้ดี)\nกานดา (บริหารเวลาได้ไม่ดี) ซึ่งเป็นนิเสธของผลลัพธ์ (Modus Tollens) ดังนั้น กานดาไม่ได้ฝึกทำข้อสอบจับเวลา และกานดาสอบไม่ผ่าน TGAT',
        trap_analysis: 'ระวังการสรุปกลับทิศ เช่น "คนที่ไม่สอบผ่าน TGAT จะบริหารเวลาไม่ดีเสมอ" ซึ่งเป็น Fallacy',
        options: [
            { label: '1', content: 'กานดาสอบไม่ผ่าน TGAT', is_correct: 1 },
            { label: '2', content: 'กานดาไม่เคยอ่านหนังสือวิชาอื่นเลย', is_correct: 0 },
            { label: '3', content: 'นักเรียนที่ฝึกทำข้อสอบทุกคนจะสอบผ่าน TGAT', is_correct: 0 },
            { label: '4', content: 'กานดาสอบผ่านแต่ลืมดูนาฬิกา', is_correct: 0 }
        ]
    },

    // ==========================================
    // TGAT 3: Future Workforce Competencies
    // ==========================================
    {
        id: 'q_tgat3_01',
        subject_id: 'tgat3',
        blueprint_id: 'tgat3_value',
        stimulus: null,
        question_text: 'สถานการณ์: ร้านกาแฟที่คุณเป็นผู้จัดการกำลังเผชิญกับปัญหายอดขายตกต่ำ เพราะมีคาเฟ่แฟรนไชส์ขนาดใหญ่มาเปิดตรงข้าม และจัดโปรโมชันลดราคาอย่างหนัก\n\nการตัดสินใจในข้อใดสะท้อน "การสร้างคุณค่าและนวัตกรรม (Value Creation)" ที่ยั่งยืนที่สุด?',
        difficulty: 'medium',
        explanation: 'การลดราคาแข่งกับแฟรนไชส์ทุนหนามีแต่จะทำให้ขาดทุน การสร้าง Value Creation ที่แท้จริงคือการค้นหาจุดเด่นที่แตกต่าง (Differentiation) เช่น การจับมือกับโรงคั่วท้องถิ่น สร้างเมนู Signature และสร้างคอมมูนิตี้ลูกค้าประจำที่คู่แข่งลอกเลียนแบบไม่ได้',
        trap_analysis: 'ข้อสอบ TGAT3 วัดมุมมองการเติบโต (Growth Mindset) และการสร้างคุณค่า ช้อยส์ "ตัดราคาแข่ง" มักเป็นคำตอบที่ผิดตามเกณฑ์สมรรถนะ',
        options: [
            { label: '1', content: 'ลดราคากาแฟทุกเมนูลง 50% ให้ถูกกว่าคู่แข่งเพื่อดึงลูกค้าคืนมาทันที', is_correct: 0 },
            { label: '2', content: 'จัดสัมภาษณ์ลูกค้าประจำ พัฒนาเมล็ดกาแฟ Specialty ท้องถิ่น และสร้างพื้นที่ Co-learning สำหรับชุมชน', is_correct: 1 },
            { label: '3', content: 'ยื่นเรื่องร้องเรียนเทศบาลว่าร้านคู่แข่งตั้งป้ายโฆษณาบังหน้าร้าน', is_correct: 0 },
            { label: '4', content: 'ปลดพนักงานพาร์ตไทม์ออกครึ่งหนึ่งเพื่อลดต้นทุนค่าจ้างประคองร้าน', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat3_02',
        subject_id: 'tgat3',
        blueprint_id: 'tgat3_complex_prob',
        stimulus: null,
        question_text: 'สถานการณ์: ทีมงานฝ่ายไอทีตรวจพบว่าระบบฐานข้อมูลลูกค้าของบริษัทถูกเจาะระบบ (Data Breach) ในช่วงกลางดึกวันศุกร์ และอาจมีข้อมูลรั่วไหลบางส่วน\n\nในฐานะหัวหน้าทีม ลำดับขั้นตอนแรกสุดในการ "แก้ไขปัญหาที่ซับซ้อน" ควรทำอย่างไร?',
        difficulty: 'medium',
        explanation: 'หลักการแก้ปัญหาเฉพาะหน้าทางไซเบอร์และความเสี่ยงคือ "การควบคุมความเสียหายทันที (Containment)" โดยตัดการเชื่อมต่อระบบที่ถูกบุกรุกเพื่อไม่ให้ลุกลาม แล้วจึงประเมินขอบเขตผลกระทบ แจ้งผู้เกี่ยวข้อง และวางมาตรการฟื้นฟู',
        trap_analysis: 'การรีบหาคนผิดมาลงโทษเป็นข้อห้ามในการแก้ปัญหาระดับองค์กร ลำดับแรกต้องหยุดยั้งความเสียหายก่อนเสมอ',
        options: [
            { label: '1', content: 'เรียกประชุมด่วนเพื่อหาตัวโปรแกรมเมอร์ที่เขียนโค้ดช่องโหว่มาลงโทษ', is_correct: 0 },
            { label: '2', content: 'สั่งแยกเซิร์ฟเวอร์ที่ถูกบุกรุกออกจากเครือข่ายทันทีเพื่อหยุดความเสียหาย แล้ววิเคราะห์ขอบเขตผลกระทบ', is_correct: 1 },
            { label: '3', content: 'โพสต์ลงโซเชียลมีเดียขอโทษลูกค้าก่อนตรวจสอบข้อเท็จจริง', is_correct: 0 },
            { label: '4', content: 'รอจนถึงเช้าวันจันทร์เพื่อให้ทีมงานหลักเข้าออฟฟิศพร้อมกัน', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat3_03',
        subject_id: 'tgat3',
        blueprint_id: 'tgat3_emotional',
        stimulus: null,
        question_text: 'สถานการณ์: ในการนำเสนองานกลุ่มหน้าห้อง เพื่อนร่วมกลุ่มคนหนึ่งตอบคำถามอาจารย์ผิดพลาดอย่างมาก จนทำให้อาจารย์ติติงผลงานของทั้งกลุ่ม เมื่อกลับมานั่งที่ เพื่อนคนนั้นแสดงอาการเครียดและน้ำตาคลอ\n\nพฤติกรรมใดแสดงถึง "ความฉลาดทางอารมณ์ (Emotional Governance & Empathy)" ที่ดีที่สุด?',
        difficulty: 'easy',
        explanation: 'การแสดง Empathy คือการเข้าใจความรู้สึกของเพื่อน ไม่ซ้ำเติมในจุดที่เกิดความผิดพลาด และชวนกันโฟกัสว่าจุดที่อาจารย์ติติงจะนำมาแก้ไขร่วมกันอย่างไรหลังจบคาบ',
        trap_analysis: 'การพูดว่า "บอกแล้วว่าอย่าตอบแบบนั้น" แม้จะเป็นความจริง แต่ขาด Empathy และทำลายความสัมพันธ์ในทีม',
        options: [
            { label: '1', content: 'พูดปลอบใจเพื่อนด้วยความเข้าใจ และเสนอว่าค่อยมาช่วยกันปรับแก้จุดผิดพลาดหลังเลิกเรียน', is_correct: 1 },
            { label: '2', content: 'แอบส่งข้อความบอกเพื่อนคนอื่นในกลุ่มว่าครั้งหน้าห้ามให้เพื่อนคนนี้ตอบคำถามอีก', is_correct: 0 },
            { label: '3', content: 'บอกเพื่อนทันทีว่า "เราเตือนเธอแล้วว่าให้จำสไลด์ให้ดี"', is_correct: 0 },
            { label: '4', content: 'ทำเฉยเมยไม่สนใจเพื่อไม่ให้เพื่อนรู้สึกอับอายไปมากกว่านี้', is_correct: 0 }
        ]
    },

    // ==========================================
    // A-Level Mathematics 1
    // ==========================================
    {
        id: 'q_alevel_math_01',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'กำหนดให้ลำดับเลขคณิตชุดหนึ่ง มีพจน์ที่ 3 เท่ากับ 11 และพจน์ที่ 8 เท่ากับ 31\n\nผลบวก 10 พจน์แรก ($S_{10}$) ของลำดับชุดนี้มีค่าเท่ากับเท่าใด?',
        difficulty: 'medium',
        explanation: 'จากสูตร $a_n = a_1 + (n-1)d$:\n- $a_3 = a_1 + 2d = 11$ ---(1)\n- $a_8 = a_1 + 7d = 31$ ---(2)\nนำ (2) - (1): $5d = 20 \\Rightarrow d = 4$\nแทนใน (1): $a_1 + 2(4) = 11 \\Rightarrow a_1 = 3$\n\nหาผลบวก 10 พจน์แรกจากสูตร $S_n = \\frac{n}{2}[2a_1 + (n-1)d]$:\n$S_{10} = \\frac{10}{2}[2(3) + 9(4)] = 5[6 + 36] = 5(42) = 210$',
        trap_analysis: 'ระวังลืมคูณ 2 ที่ $a_1$ ในสูตร หรือสับสนระหว่างสูตร $S_n$ กับ $a_n$',
        options: [
            { label: '1', content: '190', is_correct: 0 },
            { label: '2', content: '205', is_correct: 0 },
            { label: '3', content: '210', is_correct: 1 },
            { label: '4', content: '220', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math_02',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_calc',
        stimulus: null,
        question_text: 'กำหนดฟังก์ชัน $f(x) = 2x^3 - 9x^2 + 12x + 5$\n\nจุดต่ำสุดสัมพัทธ์ (Relative Minimum) ของฟังก์ชัน $f(x)$ เกิดขึ้นที่ค่า $x$ เท่ากับเท่าใด?',
        difficulty: 'medium',
        explanation: 'หาอนุพันธ์อันดับ 1:\n$f\'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2)$\nให้ $f\'(x) = 0$ ได้จุดวิกฤต $x = 1, 2$\n\nตรวจสอบด้วยอนุพันธ์อันดับ 2:\n$f\'\'(x) = 12x - 18$\n- ที่ $x = 1: f\'\'(1) = 12(1) - 18 = -6 < 0$ (จุดสูงสุดสัมพัทธ์)\n- ที่ $x = 2: f\'\'(2) = 12(2) - 18 = 6 > 0$ (จุดต่ำสุดสัมพัทธ์)\nดังนั้น จุดต่ำสุดสัมพัทธ์เกิดขึ้นที่ $x = 2$',
        trap_analysis: 'ระวังตอบสลับระหว่าง $x = 1$ (สูงสุดสัมพัทธ์) กับ $x = 2$ (ต่ำสุดสัมพัทธ์) จำง่ายๆ ว่าถ้า $f\'\' > 0$ เส้นกราฟจะหงาย จึงเกิดจุดต่ำสุด',
        options: [
            { label: '1', content: 'x = 1', is_correct: 0 },
            { label: '2', content: 'x = 2', is_correct: 1 },
            { label: '3', content: 'x = 3', is_correct: 0 },
            { label: '4', content: 'x = -2', is_correct: 0 }
        ]
    },

    // ==========================================
    // TGAT 1: New questions (Long Conversation & Cloze)
    // ==========================================
    {
        id: 'q_tgat1_05',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Student: "Excuse me, Professor Evans. I was reviewing the preliminary syllabus, and I noticed that the mid-term exam overlaps with our mandatory university sports meet."\nProfessor Evans: "Thank you for bringing that up early. (1)_______, as long as you provide the official exemption letter from the athletic director at least one week in advance."\nStudent: "That is wonderful to hear! I will get that paperwork sorted right away."',
        question_text: 'Which response best completes blank (1) while remaining professional and accommodating?',
        difficulty: 'medium',
        explanation: 'ในสถานการณ์วิชาการที่อาจารย์ตอบรับการขอสอบชดเชยอย่างมีเงื่อนไขและเป็นมืออาชีพ ตัวเลือก "I can certainly arrange an alternate makeup exam session for you" เป็นคำตอบที่เหมาะสม ชัดเจน และสุภาพที่สุด',
        trap_analysis: 'ระวังตัวเลือกที่แสดงอารมณ์ไม่เป็นทางการหรือตัดบท เช่น "I guess I don\'t really care" หรือ "You will fail if you miss it" ซึ่งขัดแย้งกับประโยคถัดไป',
        options: [
            { label: '1', content: 'You will simply forfeit your exam score without exception', is_correct: 0 },
            { label: '2', content: 'I can certainly arrange an alternate makeup exam session for you', is_correct: 1 },
            { label: '3', content: 'Why didn\'t the university sports club tell me earlier?', is_correct: 0 },
            { label: '4', content: 'I guess I don\'t really care what you decide to do', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_06',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Marine biologists have observed that microplastic fibers in coastal coral reefs not only obstruct the filtration systems of aquatic organisms, but also act as vectors for toxic synthetic additives. Consequently, juvenile fish populations residing near contaminated coastlines become increasingly (1)_______ to chronic metabolic stress and predatory threats.',
        question_text: 'Choose the most appropriate word to complete blank (1):',
        difficulty: 'hard',
        explanation: 'สำนวน "susceptible to..." แปลว่า "อ่อนแอ / ไวต่อ / เสี่ยงต่ออันตรายจาก..." ซึ่งตรงกับบริบททางนิเวศวิทยาที่ลูกปลาได้รับสารพิษและตกอยู่ในภาวะเครียดเรื้อรัง',
        trap_analysis: 'คำว่า "immune" (มีภูมิคุ้มกัน) และ "resistant" (ต้านทาน) มีความหมายตรงกันข้ามกับบริบทอันตราย ส่วน "oblivious" แปลว่าไม่ใส่ใจหรือไม่รับรู้',
        options: [
            { label: '1', content: 'immune', is_correct: 0 },
            { label: '2', content: 'susceptible', is_correct: 1 },
            { label: '3', content: 'resistant', is_correct: 0 },
            { label: '4', content: 'oblivious', is_correct: 0 }
        ]
    },

    // ==========================================
    // TGAT 2: New questions (Numerical & Reasoning)
    // ==========================================
    {
        id: 'q_tgat2_05',
        subject_id: 'tgat2',
        blueprint_id: 'tgat2_numerical',
        stimulus: null,
        question_text: 'พิจารณาแบบรูปความสัมพันธ์ของตัวเลขต่อไปนี้:\n3,  7,  16,  35,  74,  ( ? )\n\nจำนวนในเครื่องหมาย ( ? ) ควรเป็นค่าใด?',
        difficulty: 'medium',
        explanation: 'วิเคราะห์รูปแบบการเพิ่มขึ้นของอนุกรม:\n- $3 \\times 2 + 1 = 7$\n- $7 \\times 2 + 2 = 16$\n- $16 \\times 2 + 3 = 35$\n- $35 \\times 2 + 4 = 74$\nดังนั้น จำนวนถัดไปคือ $74 \\times 2 + 5 = 148 + 5 = 153$',
        trap_analysis: 'ระวังคิดผลต่างชั้นเดียวโดยไม่ดูแบบรูปสองชั้น: $4, 9, 19, 39$ แล้วสับสนการคูณ 2 ลบ 1 หรือบวกตัวเลขผิดหลัก',
        options: [
            { label: '1', content: '148', is_correct: 0 },
            { label: '2', content: '151', is_correct: 0 },
            { label: '3', content: '153', is_correct: 1 },
            { label: '4', content: '157', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat2_06',
        subject_id: 'tgat2',
        blueprint_id: 'tgat2_reasoning',
        stimulus: null,
        question_text: 'กำหนดเงื่อนไขตรรกะดังต่อไปนี้:\n1. ถ้าวันที่จัดกิจกรรมมีฝนตกหนัก แล้วทางผู้จัดจะย้ายเวทีเข้าหอประชุมในร่ม\n2. ถ้าทางผู้จัดย้ายเวทีเข้าหอประชุมในร่ม แล้วจำนวนผู้เข้าชมจะถูกจำกัดไม่เกิน 500 คน\nข้อเท็จจริงในวันนี้: "จำนวนผู้เข้าชมในกิจกรรมไม่ได้ถูกจำกัดที่ 500 คน (มีผู้เข้าชมได้มากกว่า 1,000 คน)"\n\nข้อสรุปใดต่อไปนี้สมเหตุสมผลที่สุดตามหลักตรรกศาสตร์?',
        difficulty: 'medium',
        explanation: 'จากหลัก Modus Tollens:\n- กำหนด $P$ = ฝนตกหนัก, $Q$ = ย้ายเวทีเข้าหอประชุม, $R$ = จำนวนผู้เข้าชมจำกัดไม่เกิน 500 คน\n- เงื่อนไข: $P \\rightarrow Q$ และ $Q \\rightarrow R$ ส่งผลให้ $P \\rightarrow R$\n- ข้อเท็จจริงคือ $\\sim R$ (ไม่ถูกจำกัดที่ 500 คน)\n- ดังนั้น สรุปได้แน่นอนว่า $\\sim P$ (วันที่จัดกิจกรรมไม่มีฝนตกหนัก)',
        trap_analysis: 'ระวังข้อสรุปที่คิดไปเองนอกเหนือเงื่อนไข เช่น "หอประชุมพัง" หรือข้อสรุปที่กลับทิศทางเงื่อนไข',
        options: [
            { label: '1', content: 'ในวันที่จัดกิจกรรมไม่มีฝนตกหนัก', is_correct: 1 },
            { label: '2', content: 'ทางผู้จัดยังคงย้ายเวทีเข้าหอประชุมในร่ม', is_correct: 0 },
            { label: '3', content: 'กิจกรรมถูกยกเลิกเนื่องจากฝนตกหนัก', is_correct: 0 },
            { label: '4', content: 'ไม่สามารถสรุปสิ่งใดเกี่ยวกับสภาพอากาศได้เลย', is_correct: 0 }
        ]
    },

    // ==========================================
    // TGAT 3: New questions (Civic Engagement & Value Creation)
    // ==========================================
    {
        id: 'q_tgat3_04',
        subject_id: 'tgat3',
        blueprint_id: 'tgat3_civic',
        stimulus: null,
        question_text: 'สถานการณ์: ในหมู่บ้านของคุณมีปัญหาขยะตกค้างและส่งกลิ่นเหม็นรุนแรง เนื่องจากซอยแคบทำให้รถเก็บขยะของเทศบาลเข้าถึงได้เพียงสัปดาห์ละ 1 ครั้ง ส่งผลให้ชาวบ้านบางหลังคาเรือนเริ่มนำขยะไปแอบเผาในพื้นที่รกร้างท้ายซอยจนเกิดกลุ่มควันและมลพิษ PM 2.5 รบกวนคนในชุมชน\n\nในฐานะพลเมืองที่มีส่วนร่วม (Active Citizen) คุณควรเลือกดำเนินการอย่างไรเพื่อแก้ปัญหาได้อย่างสร้างสรรค์และยั่งยืนที่สุด?',
        difficulty: 'medium',
        explanation: 'แนวทางของ Active Citizen ที่ยั่งยืนคือการประสานความร่วมมือระหว่างชุมชนและหน่วยงานรัฐ จัดเวทีพูดคุยเพื่อตั้งจุดทิ้งขยะรวมที่ปากซอย พร้อมรณรงค์คัดแยกขยะต้นทาง และแจ้งเทศบาลปรับรอบรับขยะ ซึ่งเป็นการแก้ปัญหาที่ต้นเหตุและสร้างการมีส่วนร่วมของทุกคน',
        trap_analysis: 'ระวังตัวเลือกที่ใช้ความรุนแรงหรือทางลัด เช่น ถ่ายคลิปประจานเพื่อนบ้านลงโซเชียล หรือตัวเลือกที่ผลักภาระหนีปัญหาโดยการย้ายที่พัก ซึ่งได้คะแนนสมรรถนะต่ำสุดตามเกณฑ์ ทปอ.',
        options: [
            { label: '1', content: 'แอบถ่ายคลิปเพื่อนบ้านที่กำลังจุดไฟเผาขยะแล้วนำไปโพสต์ประจานในโซเชียลมีเดีย', is_correct: 0 },
            { label: '2', content: 'ประสานผู้นำชุมชนจัดประชุมเพื่อกำหนดจุดพักขยะรวมปากซอย ร่วมรณรงค์คัดแยกขยะ และประสานเทศบาลปรับรอบเก็บ', is_correct: 1 },
            { label: '3', content: 'ปิดประตูหน้าต่างบ้านตนเองให้สนิทและซื้อเครื่องฟอกอากาศมาใช้เพื่อความปลอดภัยส่วนตัว', is_correct: 0 },
            { label: '4', content: 'นำขยะของบ้านตนเองไปโยนทิ้งรวมไว้ที่หน้าสำนักงานเทศบาลเพื่อประท้วงการทำงาน', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat3_05',
        subject_id: 'tgat3',
        blueprint_id: 'tgat3_value',
        stimulus: null,
        question_text: 'สถานการณ์: ทีมของคุณกำลังออกแบบระบบบริการออนไลน์สำหรับประชาชน แต่จากการทดสอบกลุ่มตัวอย่าง (User Testing) พบว่า ผู้สูงอายุและผู้พิการทางสายตา 80% ไม่สามารถใช้งานได้เนื่องจากสีและขนาดตัวอักษรกลืนไปกับพื้นหลัง ทว่ากำหนดส่งมอบงานของทีมเหลืออีกเพียง 4 วัน และหัวหน้าทีมกังวลว่าจะส่งงานไม่ทัน\n\nคุณควรเสนอแนวทางแก้ไขในที่ประชุมทีมอย่างไร เพื่อสร้างคุณค่าที่แท้จริงและรักษามาตรฐานงานอย่างมืออาชีพ?',
        difficulty: 'medium',
        explanation: 'การสร้างคุณค่าและนวัตกรรม (Value Creation) ต้องคำนึงถึงความครอบคลุม (Inclusivity & Accessibility) การเสนอจัดทำโหมด High Contrast / Large Font เฉพาะจุดสำคัญเป็น Quick Win ก่อนส่งมอบ และวางแผนอัปเดตเวอร์ชันเต็ม เป็นการบริหารจัดการความเสี่ยงที่ยังรักษาคุณค่าของผู้ใช้งานทุกคน',
        trap_analysis: 'ระวังตัวเลือกที่ละเลยผู้ใช้งาน เช่น "ปล่อยระบบออกไปก่อนเพราะผู้สูงอายุไม่ใช่กลุ่มเป้าหมายหลัก" ซึ่งขัดต่อหลักการ Inclusive Design และจริยธรรมวิชาชีพ',
        options: [
            { label: '1', content: 'เสนอให้ตัดฟังก์ชันสำหรับผู้สูงอายุทิ้งไปก่อนเพื่อส่งมอบงานให้ตรงเวลา และเน้นเฉพาะกลุ่มคนรุ่นใหม่', is_correct: 0 },
            { label: '2', content: 'เสนอปรับปรุง Accessibility ด่วนเฉพาะส่วนหลัก (Quick Win) เช่น ขนาดฟอนต์และความต่างของสี แล้ววางแผนอัปเดตรอบถัดไปทันที', is_correct: 1 },
            { label: '3', content: 'ขอให้หัวหน้าทีมแจ้งยกเลิกโครงการทั้งหมดเพื่อเริ่มนับหนึ่งใหม่เนื่องจากระบบมีข้อบกพร่อง', is_correct: 0 },
            { label: '4', content: 'ปิดผลการทดสอบไว้เป็นความลับ และส่งมอบงานตามกำหนดโดยไม่แก้ไขใดๆ', is_correct: 0 }
        ]
    },

    // ==========================================
    // A-Level คณิต 1: New questions (Geometry & Statistics)
    // ==========================================
    {
        id: 'q_alevel_math_03',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_geo',
        stimulus: null,
        question_text: 'กำหนดวงรี $E$ มีสมการเป็น $\\frac{(x - 2)^2}{25} + \\frac{(y + 1)^2}{16} = 1$ โดยมีวงกลม $C$ ซึ่งมีจุดศูนย์กลางอยู่ที่จุดโฟกัสด้านขวาของวงรี $E$ และวงกลม $C$ นี้สัมผัสกับแกน $y$\n\nสมการของวงกลม $C$ ตรงกับข้อใดต่อไปนี้?',
        difficulty: 'medium',
        explanation: 'วิเคราะห์วงรี $E$:\n- จุดศูนย์กลาง $(h, k) = (2, -1)$\n- แกนเอกขนานกับแกน $x$, $a^2 = 25 \\Rightarrow a = 5$, $b^2 = 16 \\Rightarrow b = 4$\n- ระยะโฟกัส $c = \\sqrt{a^2 - b^2} = \\sqrt{25 - 16} = 3$\n- จุดโฟกัสด้านขวาคือ $(h + c, k) = (2 + 3, -1) = (5, -1)$\n\nวิเคราะห์วงกลม $C$:\n- จุดศูนย์กลางวงกลมคือ $(5, -1)$\n- เนื่องจากวงกลมสัมผัสแกน $y$ รัศมี $r = |x_c| = |5| = 5$\n- สมการวงกลมคือ $(x - 5)^2 + (y + 1)^2 = 5^2 = 25$',
        trap_analysis: 'ระวังจุดหลอก: สับสนระยะ $c$ ลืมบวกค่า $h=2$ ทำให้ได้จุดศูนย์กลางเป็น $(3, -1)$ หรือใช้รัศมี $r = 1$ จากระยะสัมผัสแกน $x$',
        options: [
            { label: '1', content: '$(x - 3)^2 + (y + 1)^2 = 9$', is_correct: 0 },
            { label: '2', content: '$(x - 5)^2 + (y + 1)^2 = 25$', is_correct: 1 },
            { label: '3', content: '$(x - 5)^2 + (y - 1)^2 = 25$', is_correct: 0 },
            { label: '4', content: '$(x - 2)^2 + (y + 1)^2 = 16$', is_correct: 0 },
            { label: '5', content: '$(x - 3)^2 + (y - 1)^2 = 25$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math_04',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_stats',
        stimulus: null,
        question_text: 'คะแนนสอบวิชาคณิตศาสตร์ของนักเรียนระดับชั้น ม.6 มีการแจกแจงปกติ โดยมีค่าเฉลี่ยเลขคณิตเท่ากับ 60 คะแนน และส่วนเบี่ยงเบนมาตรฐานเท่ากับ 10 คะแนน\nกำหนดตารางพื้นที่ใต้เส้นโค้งปกติมาตรฐาน $Z$ ระหว่าง $0$ ถึง $Z$:\n- $P(0 < Z < 1.28) = 0.4000$\n- $P(0 < Z < 1.64) = 0.4500$\n- $P(0 < Z < 1.96) = 0.4750$\n\nถ้านักเรียนที่จะได้รับทุนการศึกษาต้องมีคะแนนอยู่ในกลุ่มคะแนนสูงสุด 5% แรกของระดับชั้น คะแนนสอบต่ำสุดที่จะได้รับทุนการศึกษาคือเท่าใด?',
        difficulty: 'medium',
        explanation: 'วิเคราะห์การแจกแจงปกติ:\n- กลุ่มคะแนนสูงสุด 5% แรก หมายถึงพื้นที่หางขวาเท่ากับ $0.05$\n- พื้นที่จากกึ่งกลาง ($Z = 0$) ถึงคะแนนตัดทุนคือ $0.5000 - 0.0500 = 0.4500$\n- จากตารางที่กำหนด ค่า $Z$ ที่ตรงกับพื้นที่ $0.4500$ คือ $Z = 1.64$\n- จากสูตรคะแนนมาตรฐาน $Z = \\frac{x - \\mu}{\\sigma}$:\n  $$1.64 = \\frac{x - 60}{10} \\Rightarrow x - 60 = 16.4 \\Rightarrow x = 76.4$$\nดังนั้น คะแนนต่ำสุดที่ได้รับทุนคือ 76.4 คะแนน',
        trap_analysis: 'จุดหลอกยอดนิยม: ไปใช้ค่า $Z = 1.28$ (ซึ่งสอดคล้องกับพื้นที่ 10% แรก) หรือลืมว่าพื้นที่ครึ่งซีกเท่ากับ 0.5 แล้วเอา 0.05 ไปเปิดตารางตรงๆ',
        options: [
            { label: '1', content: '72.8 คะแนน', is_correct: 0 },
            { label: '2', content: '76.4 คะแนน', is_correct: 1 },
            { label: '3', content: '79.6 คะแนน', is_correct: 0 },
            { label: '4', content: '82.5 คะแนน', is_correct: 0 },
            { label: '5', content: '85.0 คะแนน', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math_05',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_stats',
        stimulus: null,
        question_text: 'ในกล่องทึบใบหนึ่งมีลูกบอลขนาดเท่ากันทั้งหมด 8 ลูก ประกอบด้วย ลูกบอลสีแดง 4 ลูก, สีขาว 3 ลูก และสีน้ำเงิน 1 ลูก ทำการสุ่มหยิบลูกบอลออกมาพร้อมกัน 3 ลูก\n\nความน่าจะเป็นที่จะได้ลูกบอลครบทั้งสามสี มีค่าเท่ากับข้อใดต่อไปนี้?',
        difficulty: 'medium',
        explanation: '1. หาจำนวนวิธีในแซมเปิลสเปซ $n(S)$ (สุ่มหยิบ 3 ลูกจาก 8 ลูก):\n   $$n(S) = \\binom{8}{3} = \\frac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = 56$$\n\n2. หาจำนวนวิธีที่ได้ลูกบอลครบทั้ง 3 สี $n(E)$ (ต้องได้ แดง 1, ขาว 1, น้ำเงิน 1):\n   $$n(E) = \\binom{4}{1} \\times \\binom{3}{1} \\times \\binom{1}{1} = 4 \\times 3 \\times 1 = 12$$\n\n3. คำนวณความน่าจะเป็น:\n   $$P(E) = \\frac{n(E)}{n(S)} = \\frac{12}{56} = \\frac{3}{14}$$',
        trap_analysis: 'ระวังคิดเป็นหยิบทีละลูกแล้วลืมตัวคูณการสลับที่ $3!$ หรือคิด $n(S)$ เป็น $8 \\times 7 \\times 6$ ซึ่งจะทำให้สัดส่วนผิดหากไม่หารด้วยการสลับสิ่งของ',
        options: [
            { label: '1', content: '$\\frac{1}{14}$', is_correct: 0 },
            { label: '2', content: '$\\frac{3}{28}$', is_correct: 0 },
            { label: '3', content: '$\\frac{3}{14}$', is_correct: 1 },
            { label: '4', content: '$\\frac{5}{14}$', is_correct: 0 },
            { label: '5', content: '$\\frac{9}{28}$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math_06',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_geo',
        stimulus: null,
        question_text: 'กำหนดให้มุม $\\theta$ สอดคล้องกับสมการ $\\sin \\theta - \\cos \\theta = \\frac{1}{2}$ โดยที่ $0 < \\theta < \\frac{\\pi}{2}$\n\nค่าของ $\\sin 2\\theta$ เท่ากับข้อใดต่อไปนี้?',
        difficulty: 'medium',
        explanation: 'จากสมการ $\\sin \\theta - \\cos \\theta = \\frac{1}{2}$ ยกกำลังสองทั้งสองข้าง:\n$$(\\sin \\theta - \\cos \\theta)^2 = \\left(\\frac{1}{2}\\right)^2$$\n$$\\sin^2 \\theta - 2\\sin\\theta\\cos\\theta + \\cos^2 \\theta = \\frac{1}{4}$$\n\nจากเอกลักษณ์ตรีโกณมิติ $\\sin^2 \\theta + \\cos^2 \\theta = 1$ และ $2\\sin\\theta\\cos\\theta = \\sin 2\\theta$:\n$$1 - \\sin 2\\theta = \\frac{1}{4}$$\n$$\\sin 2\\theta = 1 - \\frac{1}{4} = \\frac{3}{4}$$',
        trap_analysis: 'ระวังคิดเครื่องหมายผิดเป็น $1 + \\sin 2\\theta = \\frac{1}{4} \\Rightarrow \\sin 2\\theta = -\\frac{3}{4}$ ซึ่งเป็นไปไม่ได้เพราะ $0 < \\theta < \\frac{\\pi}{2}$',
        options: [
            { label: '1', content: '$\\frac{1}{4}$', is_correct: 0 },
            { label: '2', content: '$\\frac{1}{2}$', is_correct: 0 },
            { label: '3', content: '$\\frac{3}{4}$', is_correct: 1 },
            { label: '4', content: '$\\frac{\\sqrt{3}}{2}$', is_correct: 0 },
            { label: '5', content: '$\\frac{7}{8}$', is_correct: 0 }
        ]
    }
];

function seed() {
    const insertQuestion = db.prepare(`
        INSERT OR REPLACE INTO questions (id, subject_id, blueprint_id, stimulus, question_text, image_url, difficulty, explanation, trap_analysis, is_custom)
        VALUES (@id, @subject_id, @blueprint_id, @stimulus, @question_text, @image_url, @difficulty, @explanation, @trap_analysis, 0)
    `);

    const insertOption = db.prepare(`
        INSERT OR REPLACE INTO question_options (id, question_id, label, content, is_correct, order_index)
        VALUES (@id, @question_id, @label, @content, @is_correct, @order_index)
    `);

    const transaction = db.transaction(() => {
        for (const q of sampleQuestions) {
            insertQuestion.run({
                id: q.id,
                subject_id: q.subject_id,
                blueprint_id: q.blueprint_id,
                stimulus: q.stimulus,
                question_text: q.question_text,
                image_url: q.image_url || null,
                difficulty: q.difficulty,
                explanation: q.explanation,
                trap_analysis: q.trap_analysis
            });

            // Insert options
            q.options.forEach((opt, idx) => {
                insertOption.run({
                    id: `${q.id}_opt_${idx + 1}`,
                    question_id: q.id,
                    label: opt.label,
                    content: opt.content,
                    is_correct: opt.is_correct,
                    order_index: idx
                });
            });
        }
    });

    transaction();
    console.log(`✅ Seeded ${sampleQuestions.length} blueprint-compliant questions with options!`);
}

if (require.main === module) {
    seed();
}

module.exports = { seed, sampleQuestions };
