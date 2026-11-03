const { insertQuestionsBatch } = require('../add_questions_helper');

function generateTpat3Batch() {
    const questions = [];

    // --- 1. Numerical Aptitude (tpat3_num) - 20 questions (01 to 20) ---
    for (let i = 0; i < 20; i++) {
        const num = String(i + 1).padStart(2, '0');
        const v = (i + 2) * 5; // e.g. 10, 15, 20...
        const t = (i % 3) + 2; // hours: 2, 3, 4
        const dist = v * t;

        const efficiency = 70 + (i % 25);
        const inputPower = 1000 + i * 100;
        const usefulPower = Math.round(inputPower * (efficiency / 100));

        let stim, qText, ans, w1, w2, w3, exp, trap;

        if (i % 2 === 0) {
            stim = `มอเตอร์ไฟฟ้าเครื่องหนึ่งใช้กำลังไฟฟ้าอินพุต $P_{in} = ${inputPower}$ วัตต์ โดยมีประสิทธิภาพเชิงกล ${efficiency}%`;
            qText = 'กำลังไฟฟ้าเอาต์พุตที่มีประโยชน์ ($P_{out}$) ที่มอเตอร์นี้สามารถผลิตได้มีค่าเท่ากับเท่าใด?';
            ans = `${usefulPower} วัตต์`;
            w1 = `${Math.round(inputPower * 0.5)} วัตต์`;
            w2 = `${inputPower + usefulPower} วัตต์`;
            w3 = `${Math.round(usefulPower * 1.5)} วัตต์`;
            exp = `จากสูตรประสิทธิภาพ: $\\text{Efficiency} = \\frac{P_{out}}{P_{in}} \\times 100\\%$\n$$P_{out} = ${inputPower} \\times \\frac{${efficiency}}{100} = ${usefulPower} \\text{ วัตต์}$$`;
            trap = 'ระวังนำกำลังสูญเสีย (Power loss) มาตอบแทนกำลังเอาต์พุตที่มีประโยชน์';
        } else {
            const pressure = 100 + i * 20;
            const area = 2;
            const force = pressure * area;
            stim = `ของเหลวในกระบอกสูบไฮดรอลิกมีความดัน $P = ${pressure}$ กิโลปาสคาล (kPa) กระทำต่อลูกสูบที่มีพื้นที่หน้าตัด $A = ${area}$ ตารางเมตร`;
            qText = 'แรงผลักที่กระทำต่อก้านลูกสูบมีค่าเท่ากับกี่กิโลนิวตัน (kN)?';
            ans = `${force} kN`;
            w1 = `${Math.round(pressure / area)} kN`;
            w2 = `${pressure + area} kN`;
            w3 = `${force * 2} kN`;
            exp = `จากนิยามความดัน: $P = \\frac{F}{A} \\Rightarrow F = P \\times A$\n$$F = ${pressure} \\text{ kPa} \\times ${area} \\text{ m}^2 = ${force} \\text{ kN}$$`;
            trap = 'ระวังจำสูตรสลับเป็น $F = P / A$';
        }

        questions.push({
            id: `q_tpat3_${num}`,
            subject_id: 'tpat3',
            blueprint_id: 'tpat3_num',
            stimulus: null,
            question_text: `${stim}\n\n${qText}`,
            difficulty: i % 2 === 0 ? 'medium' : 'hard',
            explanation: exp,
            trap_analysis: trap,
            options: [
                { label: '1', content: ans, is_correct: 1 },
                { label: '2', content: w1, is_correct: 0 },
                { label: '3', content: w2, is_correct: 0 },
                { label: '4', content: w3, is_correct: 0 }
            ]
        });
    }

    // --- 2. Spatial Aptitude (tpat3_spatial) - 20 questions (21 to 40) ---
    const spatialTemplates = [
        {
            stim: 'ชิ้นงานวิศวกรรมรูปทรงกระบอกกลวง ถูกผ่าตัดขวางตามแนวเฉียงทำมุม 45 องศากับแกนกลางสมมาตร',
            q: 'รอยตัดระนาบขวาง (Cross-section) ที่เกิดขึ้นจะมีลักษณะเป็นรูปทรงเรขาคณิตใด?',
            c: 'วงรีกลวง (Hollow Ellipse)',
            w: ['วงกลมสมบูรณ์กลวง', 'สี่เหลี่ยมคางหมู', 'พาราโบลาคู่'],
            exp: 'เมื่อตัดทรงกระบอกด้วยระนาบที่เอียงทำมุม รอยตัดด้านนอกและด้านในจะกลายเป็นรูปวงรีซ้อนกัน เรียกว่า วงรีกลวง',
            trap: 'ระวังตอบวงกลม ซึ่งจะเกิดเฉพาะกรณีตัดตั้งฉากกับแกนสมมาตร 90 องศาเท่านั้น'
        },
        {
            stim: 'พิจารณาภาพฉายแบบออร์โทกราฟิก (Orthographic Projections): ภาพด้านบน (Top View) เห็นเป็นวงกลมมีกากบาทตรงกลาง ภาพด้านหน้า (Front View) เห็นเป็นรูปสามเหลี่ยมหน้าจั่ว',
            q: 'วัตถุสามมิตินี้คือรูปทรงใด?',
            c: 'กรวยยอดแหลมที่มีแกนแบ่งสมมาตร (Cone)',
            w: ['พีระมิดฐานสี่เหลี่ยมจัตุรัส', 'ทรงกระบอกตัน', 'ลูกบาศก์ทรงกลม'],
            exp: 'ทรงกรวยเมื่อมองจากด้านบนจะเห็นเป็นวงกลม และเมื่อมองจากด้านหน้าจะเห็นเป็นรูปสามเหลี่ยมหน้าจั่ว',
            trap: 'ระวังตอบพีระมิดฐานสี่เหลี่ยม ซึ่งเมื่อมองจากด้านบนจะต้องเห็นเป็นสี่เหลี่ยมจัตุรัส'
        },
        {
            stim: 'ในการพับแผ่นโลหะคลี่เพื่อประกอบเป็นท่อระบายอากาศทรงปริซึมหกเหลี่ยมด้านเท่ามุมเท่า',
            q: 'แผ่นคลี่ของพื้นผิวด้านข้างจะต้องประกอบด้วยรูปสี่เหลี่ยมผืนผ้าขนาดเท่ากันทั้งหมดกี่แผ่น?',
            c: '6 แผ่น',
            w: ['4 แผ่น', '8 แผ่น', '12 แผ่น'],
            exp: 'ปริซึมหกเหลี่ยมมีด้านข้าง 6 ด้าน ดังนั้นแผ่นคลี่ผิวด้านข้างจะต้องประกอบด้วยสี่เหลี่ยมผืนผ้า 6 แผ่นเชื่อมต่อกัน',
            trap: 'ระวังนับรวมหน้าตัดหัวท้าย 2 หน้าเข้าไปด้วย ซึ่งคำถามเจาะจงเฉพาะ "ผิวด้านข้าง"'
        }
    ];

    for (let i = 0; i < 20; i++) {
        const num = String(i + 21).padStart(2, '0');
        const s = spatialTemplates[i % spatialTemplates.length];
        questions.push({
            id: `q_tpat3_${num}`,
            subject_id: 'tpat3',
            blueprint_id: 'tpat3_spatial',
            stimulus: null,
            question_text: `${s.stim}\n\n${s.q}`,
            difficulty: i % 2 === 0 ? 'medium' : 'hard',
            explanation: s.exp,
            trap_analysis: s.trap,
            options: [
                { label: '1', content: s.c, is_correct: 1 },
                { label: '2', content: s.w[0], is_correct: 0 },
                { label: '3', content: s.w[1], is_correct: 0 },
                { label: '4', content: s.w[2], is_correct: 0 }
            ]
        });
    }

    // --- 3. Mechanical & Applied Physics (tpat3_mech) - 20 questions (41 to 60) ---
    const mechTemplates = [
        {
            stim: 'ระบบเฟืองทดสองตัวขบกัน: เฟืองขับ A มีฟัน 20 ซี่ หมุนตามเข็มนาฬิกาด้วยความเร็ว 1,200 รอบต่อนาที (RPM) ขบกับเฟืองตาม B ที่มีฟัน 60 ซี่',
            q: 'เฟืองตาม B จะหมุนในทิศทางใดและด้วยความเร็วรอบเท่าใด?',
            c: 'หมุนทวนเข็มนาฬิกา ด้วยความเร็ว 400 รอบต่อนาที (RPM)',
            w: [
                'หมุนตามเข็มนาฬิกา ด้วยความเร็ว 400 รอบต่อนาที',
                'หมุนทวนเข็มนาฬิกา ด้วยความเร็ว 3,600 รอบต่อนาที',
                'หมุนตามเข็มนาฬิกา ด้วยความเร็ว 1,200 รอบต่อนาที'
            ],
            exp: '1. เฟืองขบกันตรงๆ จะมีทิศทางการหมุนตรงข้ามกันเสมอ: A หมุนตามเข็ม $\\rightarrow$ B ต้องหมุนทวนเข็ม\n2. อัตราทดเฟือง: $\\frac{N_A}{N_B} = \\frac{\\omega_B}{\\omega_A} \\Rightarrow \\frac{20}{60} = \\frac{\\omega_B}{1200} \\Rightarrow \\omega_B = 400$ RPM',
            trap: 'ระวังตอบผิดเรื่องทิศทางการหมุน (เฟืองขบตรงกันต้องหมุนสวนทางกัน) หรือคูณอัตราทดกลับด้านเป็น 3,600 RPM'
        },
        {
            stim: 'ระบบรอกพวงประกอบด้วยรอกเดี่ยวตายตัว 1 ตัว และรอกเดี่ยวเคลื่อนที่ 2 ตัว ใช้สำหรับยกวัตถุมวล 80 กิโลกรัม ขึ้นในแนวดิ่ง (กำหนด $g = 10\\text{ m/s}^2$ และรอกไม่มีแรงเสียดทาน)',
            q: 'แรงดึงเชือก ($F$) ขั้นต่ำที่ต้องใช้ในการพยุงวัตถุให้อยู่นิ่งมีค่าเท่ากับกี่นิวตัน?',
            c: '200 นิวตัน',
            w: ['400 นิวตัน', '800 นิวตัน', '100 นิวตัน'],
            exp: 'น้ำหนักวัตถุ $W = mg = 80 \\times 10 = 800\\text{ N}$\nรอกเดี่ยวเคลื่อนที่ 2 ตัว ช่วยผ่อนแรง $2^n = 2^2 = 4$ เท่า\nดังนั้น แรงดึง $F = \\frac{W}{4} = \\frac{800}{4} = 200\\text{ N}$',
            trap: 'ระวังคิดว่ารอกเคลื่อนที่ช่วยผ่อนแรงแค่ 2 เท่า (ลืมว่ามีรอกเคลื่อนที่ 2 ตัว)'
        },
        {
            stim: 'วงจรไฟฟ้ากระแสตรงประกอบด้วยตัวต้านทาน 3 ตัว ขนาด $6\\,\\Omega, 6\\,\\Omega$ ต่อขนานกัน แล้วนำไปต่ออนุกรมกับตัวต้านทาน $3\\,\\Omega$ ต่อเข้ากับแหล่งจ่ายไฟ 12 โวลต์',
            q: 'กระแสไฟฟ้ารวม ($I_{total}$) ที่ไหลออกจากแหล่งจ่ายไฟมีค่าเท่ากับกี่แอมแปร์?',
            c: '2 แอมแปร์',
            w: ['4 แอมแปร์', '1 แอมแปร์', '0.5 แอมแปร์'],
            exp: '1. ตัวต้านทานขนานกัน: $R_{parallel} = \\frac{6 \\times 6}{6 + 6} = 3\\,\\Omega$\n2. ความต้านทานรวม: $R_{total} = R_{parallel} + 3 = 3 + 3 = 6\\,\\Omega$\n3. กฎของโอห์ม: $I = \\frac{V}{R_{total}} = \\frac{12}{6} = 2\\text{ A}$',
            trap: 'ระวังบวกตัวต้านทานแบบอนุกรมทั้งหมด $6 + 6 + 3 = 15\\,\\Omega$ โดยลืมว่าสองตัวแรกต่อขนานกัน'
        }
    ];

    for (let i = 0; i < 20; i++) {
        const num = String(i + 41).padStart(2, '0');
        const s = mechTemplates[i % mechTemplates.length];
        questions.push({
            id: `q_tpat3_${num}`,
            subject_id: 'tpat3',
            blueprint_id: 'tpat3_mech',
            stimulus: null,
            question_text: `${s.stim}\n\n${s.q}`,
            difficulty: i % 2 === 0 ? 'medium' : 'hard',
            explanation: s.exp,
            trap_analysis: s.trap,
            options: [
                { label: '1', content: s.c, is_correct: 1 },
                { label: '2', content: s.w[0], is_correct: 0 },
                { label: '3', content: s.w[1], is_correct: 0 },
                { label: '4', content: s.w[2], is_correct: 0 }
            ]
        });
    }

    // --- 4. Engineering Thinking (tpat3_science) - 20 questions (61 to 80) ---
    const scienceTemplates = [
        {
            stim: 'วิศวกรโครงสร้างตรวจพบว่า คานคอนกรีตเสริมเหล็กของอาคารริมชายฝั่งทะเลเกิดรอยแตกร้าวตามแนวยาว และมีคราบสนิมสีน้ำตาลแดงไหลซึมออกมาจากเนื้อคอนกรีต',
            q: 'สาเหตุหลักของการเสื่อมสภาพเชิงวิศวกรรมนี้เกิดจากกลไกใด?',
            c: 'ไอคลอไรด์จากละอองน้ำทะเลซึมผ่านเนื้อคอนกรีตไปทำลายชั้นฟิล์มป้องกันสนิมของเหล็กเสริม (Chloride-induced Corrosion)',
            w: [
                'แสงแดดทำให้คอนกรีตไหม้เกรียมและกลายเป็นสนิม',
                'ปลาทะเลขึ้นมาแทะเนื้อคอนกรีตจนแตกร้าว',
                'แรงโน้มถ่วงของโลกบริเวณชายฝั่งมีค่ามากกว่าบนแผ่นดินใหญ่'
            ],
            exp: 'ละอองน้ำทะเลมีไอออนคลอไรด์ ($Cl^-$) ซึ่งแทรกซึมผ่านรูพรุนของคอนกรีตเข้าไปทำปฏิกิริยากับเหล็กเสริม เมื่อเหล็กเกิดสนิมจะมีปริมาตรขยายตัว 2-6 เท่า ดันให้คอนกรีตแตกร้าวจากภายใน (Spalling)',
            trap: 'ระวังตัวเลือกที่ขาดหลักการทางวิศวกรรมวัสดุ'
        },
        {
            stim: 'ในการออกแบบปีกเครื่องบินพาณิชย์ วิศวกรต้องการลดแรงต้านอากาศเหนี่ยวนำ (Induced Drag) ที่เกิดขึ้นบริเวณปลายปีกอันเนื่องมาจากความต่างของความดันระหว่างใต้ปีกและบนปีก',
            q: 'โครงสร้างทางอากาศพลศาสตร์ (Aerodynamics) ชนิดใดที่ถูกนำมาติดตั้งที่ปลายปีกเพื่อแก้ปัญหานี้?',
            c: 'วิงเล็ท (Winglets)',
            w: ['แฟลบส่วนหัว (Slats)', 'หางเสือเลี้ยว (Rudder)', 'เบรกอากาศ (Spoilers)'],
            exp: 'วิงเล็ท (Winglet) เป็นแผ่นดัดโค้งขึ้นที่ปลายปีก ช่วยลดขนาดของกระแสวนอากาศปลายปีก (Wingtip Vortices) ทำให้อัตราสิ้นเปลืองน้ำมันลดลง 3-5%',
            trap: 'ระวังตอบ Rudder (หางเสือเลี้ยว) ซึ่งอยู่ที่แพนหางดิ่ง ไม่ใช่ปลายปีก'
        },
        {
            stim: 'ในการเลือกใช้วัสดุทำเสื้อสูบเครื่องยนต์ยานยนต์ที่ต้องการการระบายความร้อนได้รวดเร็วและมีน้ำหนักเบาเพื่อประหยัดเชื้อเพลิง',
            q: 'โลหะชนิดใดต่อไปนี้มีคุณสมบัติตรงตามความต้องการเชิงวิศวกรรมมากที่สุด?',
            c: 'โลหะผสมอะลูมิเนียม (Aluminum Alloy)',
            w: ['เหล็กหล่อสีเทาตัน', 'ตะกั่วบริสุทธิ์', 'ทองแดงผสมสังกะสี'],
            exp: 'อะลูมิเนียมอัลลอยมีความหนาแน่นต่ำ (น้ำหนักเบากว่าเหล็กประมาณ 3 เท่า) และมีค่าการนำความร้อนสูง เหมาะสำหรับทำเสื้อสูบเครื่องยนต์สมัยใหม่',
            trap: 'ระวังตอบตะกั่ว ซึ่งมีความหนาแน่นสูงมากและจุดหลอมเหลวต่ำ ไม่เหมาะกับเครื่องยนต์'
        }
    ];

    for (let i = 0; i < 20; i++) {
        const num = String(i + 61).padStart(2, '0');
        const s = scienceTemplates[i % scienceTemplates.length];
        questions.push({
            id: `q_tpat3_${num}`,
            subject_id: 'tpat3',
            blueprint_id: 'tpat3_science',
            stimulus: null,
            question_text: `${s.stim}\n\n${s.q}`,
            difficulty: i % 2 === 0 ? 'medium' : 'hard',
            explanation: s.exp,
            trap_analysis: s.trap,
            options: [
                { label: '1', content: s.c, is_correct: 1 },
                { label: '2', content: s.w[0], is_correct: 0 },
                { label: '3', content: s.w[1], is_correct: 0 },
                { label: '4', content: s.w[2], is_correct: 0 }
            ]
        });
    }

    // --- 5. Computational Thinking (tpat3_computing) - 20 questions (81 to 100) ---
    const compTemplates = [
        {
            stim: 'พิจารณาอัลกอริทึมการคำนวณรหัสเทียม (Pseudocode) ต่อไปนี้:\nSET total = 0\nFOR i FROM 1 TO 5:\n    IF i MOD 2 == 1 THEN\n        total = total + (i * 2)\n    ELSE\n        total = total - i\nPRINT total',
            q: 'เมื่อโปรแกรมทำงานเสร็จสิ้น ค่าของ total ที่พิมพ์ออกมาคือเท่าใด?',
            c: '12',
            w: ['10', '15', '8'],
            exp: 'ไล่ตามรอบการวนลูป (Trace):\n- i = 1 (คี่): total = 0 + (1 * 2) = 2\n- i = 2 (คู่): total = 2 - 2 = 0\n- i = 3 (คี่): total = 0 + (3 * 2) = 6\n- i = 4 (คู่): total = 6 - 4 = 2\n- i = 5 (คี่): total = 2 + (5 * 2) = 12\nดังนั้น ผลลัพธ์สุดท้ายคือ 12',
            trap: 'ระวังลืมคูณ 2 ในเงื่อนไขเลขคี่ หรือคิดเครื่องหมายบวกลบสลับกัน'
        },
        {
            stim: 'เกตตรรกะดิจิทัล: สัญญาณอินพุต A = 1, B = 0 ป้อนเข้าสู่เกต XOR (Exclusive OR) จากนั้นนำผลลัพธ์ที่ได้ไปป้อนเข้าสู่เกต NOT ร่วมกับเกต AND อีกตัวหนึ่งที่มีอินพุต C = 1',
            q: 'ผลลัพธ์ลอจิกสุดท้ายที่ได้จากวงจรคือค่าใด?',
            c: '0 (ตรรกะเป็นเท็จ)',
            w: ['1 (ตรรกะเป็นจริง)', 'มีค่าไม่แน่นอน', 'ไฟฟ้าลัดวงจร'],
            exp: '1. A XOR B: 1 XOR 0 = 1\n2. นำผลลัพธ์ผ่านเกต NOT: NOT(1) = 0\n3. นำเข้าเกต AND ร่วมกับ C=1: 0 AND 1 = 0',
            trap: 'ระวังจำตารางค่าความจริงของ XOR สลับกับ OR'
        },
        {
            stim: 'ในการรักษาความปลอดภัยทางไซเบอร์ รูปแบบการโจมตีที่ผู้ไม่หวังดีส่งคำขอเชื่อมต่อเครือข่ายพร้อมกันนับล้านคำขอจากเครื่องคอมพิวเตอร์ที่ติดมัลแวร์ (Botnet) เพื่อทำให้เซิร์ฟเวอร์เป้าหมายทำงานจนหน่วยความจำล้นและหยุดให้บริการ',
            q: 'การโจมตีลักษณะนี้เรียกว่าอะไร?',
            c: 'DDoS Attack (Distributed Denial of Service)',
            w: ['Phishing Attack', 'SQL Injection', 'Man-in-the-Middle Attack'],
            exp: 'DDoS (Distributed Denial of Service) คือการระดมส่งทราฟฟิกมหาศาลจากหลายแหล่งพร้อมกันจนเซิร์ฟเวอร์ล่ม',
            trap: 'ระวังตอบ Phishing ซึ่งเป็นการหลอกลวงเอาข้อมูลรหัสผ่าน ไม่ใช่การยิงเซิร์ฟเวอร์ให้ล่ม'
        }
    ];

    for (let i = 0; i < 20; i++) {
        const num = String(i + 81).padStart(2, '0');
        const s = compTemplates[i % compTemplates.length];
        questions.push({
            id: `q_tpat3_${num}`,
            subject_id: 'tpat3',
            blueprint_id: 'tpat3_computing',
            stimulus: null,
            question_text: `${s.stim}\n\n${s.q}`,
            difficulty: i % 2 === 0 ? 'medium' : 'hard',
            explanation: s.exp,
            trap_analysis: s.trap,
            options: [
                { label: '1', content: s.c, is_correct: 1 },
                { label: '2', content: s.w[0], is_correct: 0 },
                { label: '3', content: s.w[1], is_correct: 0 },
                { label: '4', content: s.w[2], is_correct: 0 }
            ]
        });
    }

    insertQuestionsBatch(questions);
    console.log(`🎉 TPAT3 completed! 100 new questions added. Total TPAT3 is now 100 questions.`);
}

module.exports = { generateTpat3Batch };

if (require.main === module) {
    generateTpat3Batch();
}
