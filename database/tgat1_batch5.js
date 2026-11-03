const { insertQuestionsBatch } = require('./add_questions_helper');

const batch5Questions = [
    {
        id: 'q_tgat1_47',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'Flight Attendant: "Excuse me, sir. Would you prefer the grilled salmon fillet or the vegetarian pasta for dinner?"',
        question_text: 'What is the most natural and polite way to state your dietary preference?',
        difficulty: 'easy',
        explanation: 'สำนวนในการเลือกอาหารบนเครื่องบินอย่างสุภาพคือ "I would like the vegetarian pasta, please. Thank you." (ขอเป็นพาสต้าเจครับ ขอบคุณครับ)',
        trap_analysis: 'ระวังตัวเลือกที่ห้วนหรือก้าวร้าว เช่น "Give me both right now" หรือ "Your food smells awful"',
        options: [
            { label: '1', content: 'Give me both meals immediately because I paid for this flight.', is_correct: 0 },
            { label: '2', content: 'I would like the vegetarian pasta, please. Thank you.', is_correct: 1 },
            { label: '3', content: 'Your airplane kitchen smells utterly disgusting.', is_correct: 0 },
            { label: '4', content: 'Why are you bothering me while I am watching a movie?', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_48',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_qr',
        stimulus: 'Professor: "Would anyone like to volunteer to lead next week\'s seminar discussion on macroeconomic policy?"',
        question_text: 'Which response indicates a proactive student volunteering appropriately?',
        difficulty: 'easy',
        explanation: 'สำนวน "I would be more than happy to take the lead on that topic, Professor." แสดงถึงความกระตือรือร้นและมารยาททางวิชาการที่เหมาะสม',
        trap_analysis: 'ระวังตัวเลือกที่ปัดความรับผิดชอบให้เพื่อน เช่น "Pick John, he talks too much" หรือ "Nobody in this classroom cares"',
        options: [
            { label: '1', content: 'Pick John instead, he talks way too much in class anyway.', is_correct: 0 },
            { label: '2', content: 'I would be more than happy to facilitate next week\'s discussion, Professor.', is_correct: 1 },
            { label: '3', content: 'Macroeconomics is the most boring subject on Earth.', is_correct: 0 },
            { label: '4', content: 'Only if you promise to give me an automatic grade A.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_49',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Maya: "I am having second thoughts about giving my keynote address tomorrow. My palms are sweating just thinking about the audience size."\nLiam: "_______! You spent three months researching this project, and nobody in that auditorium knows the data better than you do."',
        question_text: 'Which statement best provides empathetic reassurance and confidence?',
        difficulty: 'easy',
        explanation: 'สำนวน "Take a deep breath and trust your preparation" เป็นการให้กำลังใจที่สมเหตุสมผลและตรงกับบริบทก่อนขึ้นพูดต่อหน้าคนจำนวนมาก',
        trap_analysis: 'ระวังคำพูดซ้ำเติม เช่น "You will definitely embarrass yourself" หรือ "Cancel the speech right now"',
        options: [
            { label: '1', content: 'You will undoubtedly freeze on stage and embarrass us all.', is_correct: 0 },
            { label: '2', content: 'Take a deep breath and trust your preparation; you are going to do great.', is_correct: 1 },
            { label: '3', content: 'Just call in sick so you don\'t have to face the crowd.', is_correct: 0 },
            { label: '4', content: 'Audience members are usually very judgmental and unforgiving.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_50',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_sc',
        stimulus: 'Tenant: "Good morning, Mrs. Gable. The kitchen sink pipe began leaking heavily early this morning."\nLandlord: "Oh dear, thank you for letting me know immediately. _______ so water doesn\'t damage the floorboards."',
        question_text: 'Which immediate action by the landlord best addresses the urgent household repair?',
        difficulty: 'easy',
        explanation: 'เจ้าของบ้านควรแสดงความรับผิดชอบและส่งช่างมาแก้ไขทันที: "I will dispatch an emergency plumber to your unit within the hour"',
        trap_analysis: 'ระวังตัวเลือกที่ผลักภาระให้ผู้เช่าซ่อมเองโดยไม่ช่วยเหลือ เช่น "Go buy tools and fix it yourself" หรือบอกให้รออีกสองสัปดาห์',
        options: [
            { label: '1', content: 'I suggest you move to a new apartment building by this evening.', is_correct: 0 },
            { label: '2', content: 'I will dispatch our building plumber over to your unit within the hour,', is_correct: 1 },
            { label: '3', content: 'Water leaks are completely normal, just let it flood.', is_correct: 0 },
            { label: '4', content: 'I am on holiday, so do not call me until next month.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_51',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Study Group Leader: "We need to finalize our semester capstone proposal by midnight, but the methodology section is completely lacking citation sources."\nMember A: "I found five peer-reviewed papers from Oxford University Press that validate our statistical approach."\nStudy Group Leader: "Fantastic. (1)_______ while the rest of us refine the executive summary and bibliography?"\nMember A: "On it! I will format the in-text citations according to APA guidelines right now."',
        question_text: 'Which task delegation by the Study Group Leader logically leads to Member A\'s reply in blank (1)?',
        difficulty: 'medium',
        explanation: 'หัวหน้ากลุ่มมอบหมายงานตามความถนัดของ Member A ที่พบบทความวิจัย: "Could you synthesize those findings into our methodology section and insert the citations?" ซึ่งสอดคล้องกับคำตอบของ Member A ที่บอกว่าจะจัดฟอร์แมต APA ทันที',
        trap_analysis: 'ระวังตัวเลือกที่ไม่เกี่ยวข้อง เช่น "Could you go order pizza for everyone?" หรือ "Delete all your files"',
        options: [
            { label: '1', content: 'Could you integrate those citations directly into the methodology subsection?', is_correct: 1 },
            { label: '2', content: 'Can you drive across town and purchase late-night energy drinks for the group?', is_correct: 0 },
            { label: '3', content: 'Why don\'t you throw away those papers and invent imaginary data?', is_correct: 0 },
            { label: '4', content: 'Please erase our capstone project so we get a failing grade.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_52',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Customer Service: "Thank you for calling Apex Cloud Solutions. My name is Carlos. How may I assist you today?"\nClient: "Hi Carlos. Our web server went offline abruptly twenty minutes ago, and our e-commerce portal is losing thousands of dollars in checkout orders every minute."\nCustomer Service: "I understand the extreme urgency of this outage, ma\'am. (1)_______ so I can initiate a priority server diagnostic on our backend cluster?"\nClient: "Yes, our enterprise account ID is APX-99420, registered under Horizon Retailers."',
        question_text: 'Which request by Carlos in blank (1) best matches the client\'s response with their account ID?',
        difficulty: 'easy',
        explanation: 'คาร์ลอสต้องการข้อมูลเพื่อเข้าถึงระบบของลูกค้า: "Could you please provide your enterprise account number and registered company name?" ซึ่งสอดคล้องกับคำตอบของลูกค้าที่แจ้งรหัส APX-99420 ทันที',
        trap_analysis: 'ระวังตัวเลือกที่ถามเรื่องอื่น เช่น "Can you tell me your favorite color?" หรือ "Would you like to buy a warranty?"',
        options: [
            { label: '1', content: 'Could you verify your enterprise account number and registered business name,', is_correct: 1 },
            { label: '2', content: 'Would you care to hear our promotional marketing song while you wait?', is_correct: 0 },
            { label: '3', content: 'Why are you selling products online during server maintenance hours?', is_correct: 0 },
            { label: '4', content: 'Can you describe what the Internet looks like from your office window?', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_53',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Agricultural scientists are pioneering vertical aeroponic farming systems, in which crop roots are suspended in air and misted with nutrient-dense aerosols. By utilizing closed-loop water recirculation, these indoor facilities consume ninety-five percent less freshwater than conventional open-field cultivation, (1)_______ completely eliminating the necessity for chemical insecticides.',
        question_text: 'Choose the most natural correlative conjunction to fill blank (1):',
        difficulty: 'medium',
        explanation: 'สำนวน "while at the same time..." หรือ "as well as..." ใช้เชื่อมข้อดีสองประการเข้าด้วยกัน (ประหยัดน้ำ 95% พร้อมทั้งกำจัดการใช้สารเคมีฆ่าแมลงได้อย่างสิ้นเชิง)',
        trap_analysis: 'คำว่า "nonetheless" หรือ "whereas" ใช้แสดงความขัดแย้ง ซึ่งไม่เข้ากับข้อความที่กล่าวถึงข้อดีทั้งสองส่วน',
        options: [
            { label: '1', content: 'while simultaneously', is_correct: 1 },
            { label: '2', content: 'nonetheless', is_correct: 0 },
            { label: '3', content: 'in spite of', is_correct: 0 },
            { label: '4', content: 'whereas', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_54',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Despite initial skepticism regarding remote work flexibility, recent corporate empirical audits demonstrate that knowledge workers granted autonomous schedules exhibit enhanced job satisfaction and lower turnover intentions. Companies that stubbornly insist on rigid five-day office mandates risk (1)_______ top-tier engineering talent to more progressive competing enterprises.',
        question_text: 'Choose the correct gerund verb form to fill blank (1):',
        difficulty: 'easy',
        explanation: 'กริยา "risk" เป็นกริยาที่ต้องตามด้วย Gerund (V-ing) เสมอ (เช่น risk losing, risk failing) ดังนั้นจึงต้องใช้ "forfeiting" หรือ "losing" ในรูป -ing',
        trap_analysis: 'ระวังตัวเลือก "to forfeit" (Infinitive with to) หรือ "forfeited" (V.2/V.3) ซึ่งผิดกฎไวยากรณ์หลังกริยา risk',
        options: [
            { label: '1', content: 'to forfeit', is_correct: 0 },
            { label: '2', content: 'forfeiting', is_correct: 1 },
            { label: '3', content: 'forfeited', is_correct: 0 },
            { label: '4', content: 'having been forfeited', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_55',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'INFOGRAPHIC SUMMARY: RENEWABLE GRID BATTERIES (2026)\n- Utility-Scale Iron-Flow Batteries: Levelized cost of storage: $0.05/kWh; cycle life: 25,000 cycles; non-flammable; round-trip efficiency: 72%.\n- Lithium-Iron-Phosphate (LFP) Batteries: Levelized cost of storage: $0.09/kWh; cycle life: 6,000 cycles; minimal fire risk; round-trip efficiency: 91%.\n- Vanadium Redox Batteries: Levelized cost of storage: $0.08/kWh; cycle life: 20,000 cycles; non-toxic electrolytes; round-trip efficiency: 78%.\nConclusion: For long-duration stationary storage (10+ hours), Iron-Flow technology offers the most durable operational lifespan at the lowest levelized financial cost, despite modest round-trip efficiency.',
        question_text: 'Which battery storage technology offers the highest round-trip electrical efficiency according to the infographic?',
        difficulty: 'easy',
        explanation: 'เมื่อเปรียบเทียบค่า Round-trip efficiency:\n- Iron-Flow: 72%\n- LFP: 91%\n- Vanadium: 78%\nดังนั้น Lithium-Iron-Phosphate (LFP) มีประสิทธิภาพการชาร์จ/จ่ายไฟคืนสูงสุดที่ 91%',
        trap_analysis: 'ระวังตอบ Iron-Flow เพราะเห็นว่าราคาถูกสุดและอายุรอบการใช้งานสูงสุด (25,000 cycles) แต่คำถามถามเจาะจงเรื่อง "highest round-trip electrical efficiency"',
        options: [
            { label: '1', content: 'Utility-Scale Iron-Flow Batteries', is_correct: 0 },
            { label: '2', content: 'Lithium-Iron-Phosphate (LFP) Batteries', is_correct: 1 },
            { label: '3', content: 'Vanadium Redox Batteries', is_correct: 0 },
            { label: '4', content: 'Traditional Lead-Acid Automotive Batteries', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_56',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Based on the aforementioned infographic, why is Iron-Flow technology considered particularly well-suited for long-duration stationary grid storage?',
        question_text: 'What distinct advantages make Iron-Flow batteries advantageous for long-duration utility storage?',
        difficulty: 'medium',
        explanation: 'จากข้อสรุปในบทความ: "For long-duration stationary storage (10+ hours), Iron-Flow technology offers the most durable operational lifespan at the lowest levelized financial cost" (มีอายุการใช้งานยาวนานที่สุดถึง 25,000 รอบ และมีต้นทุนการกักเก็บพลังงานต่อหน่วยต่ำที่สุดเพียง $0.05/kWh)',
        trap_analysis: 'ระวังตัวเลือกที่บอกว่า "น้ำหนักเบาที่สุดสำหรับใส่ในสมาร์ตโฟน" ซึ่งขัดกับบริบทว่าเป็นแบตเตอรี่แบบติดตั้งอยู่กับที่ (stationary grid storage)',
        options: [
            { label: '1', content: 'They are exceptionally lightweight and compact for wearable smart gadgets.', is_correct: 0 },
            { label: '2', content: 'They combine the longest operational cycle lifespan with the lowest cost per kilowatt-hour stored.', is_correct: 1 },
            { label: '3', content: 'They require no chemical electrolytes whatsoever to function.', is_correct: 0 },
            { label: '4', content: 'They achieve 100% round-trip efficiency without any electrical resistance.', is_correct: 0 }
        ]
    }
];

insertQuestionsBatch(batch5Questions);
