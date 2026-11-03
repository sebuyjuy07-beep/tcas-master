const { insertQuestionsBatch } = require('./add_questions_helper');

const batch2Questions = [
    {
        id: 'q_tgat1_17',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Career Advisor: "Welcome in, Liam. Looking through your academic profile, your quantitative scores in data modeling are outstanding."\nLiam: "Thank you. However, I am torn between pursuing financial analytics or machine learning research."\nCareer Advisor: "Both paths offer vast growth. If you thrive on rapid business impact, finance is ideal; whereas if you prefer algorithmic innovation, machine learning is superior. (1)_______?"\nLiam: "To be honest, I enjoy seeing immediate real-world business results from my statistical models."',
        question_text: 'Which guiding question by the Career Advisor best prompts Liam\'s reflection in blank (1)?',
        difficulty: 'medium',
        explanation: 'อาจารย์ที่ปรึกษาต้องการถามว่า เลียมให้คุณค่ากับสิ่งใดมากกว่าระหว่างผลลัพธ์ทางธุรกิจกับการวิจัยเชิงทฤษฎี ตัวเลือก "Which type of fulfillment resonates more deeply with your personal aspirations?" เป็นคำถามที่เปิดกว้างและตรงกับคำตอบของเลียมที่ระบุว่าชอบเห็นผลลัพธ์ทางธุรกิจโดยตรง',
        trap_analysis: 'ระวังตัวเลือกที่ชี้นำหรือตัดสินแทน เช่น "Why don\'t you just take the one that pays the highest salary?" ซึ่งไม่สอดคล้องกับบทบาทที่ปรึกษาอาชีพเชิงวิชาการ',
        options: [
            { label: '1', content: 'Why don\'t you just choose whichever job pays the highest entry bonus?', is_correct: 0 },
            { label: '2', content: 'Which type of outcome resonates more deeply with your day-to-day motivation?', is_correct: 1 },
            { label: '3', content: 'Do you realize that neither of those career paths has any future?', is_correct: 0 },
            { label: '4', content: 'Can your parents afford the tuition fees for another master\'s degree?', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_18',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Elena: "Our student council budget was reduced by twenty percent this term, yet student participation requests for the annual arts festival have doubled."\nMarcus: "We cannot cut funding for stage safety or sound engineering. That leaves marketing and printed merchandise."\nElena: "What if we switch entirely to digital promotional campaigns and interactive social media filters? (1)_______."\nMarcus: "That is brilliant! It not only eliminates printing costs but also aligns with our campus sustainability goals."',
        question_text: 'Which statement best completes Elena\'s suggestion in blank (1)?',
        difficulty: 'medium',
        explanation: 'เอเลนาเสนอการเปลี่ยนไปใช้สื่อดิจิทัลทั้งหมดเพื่อประหยัดงบพิมพ์และยังคงเข้าถึงกลุ่มเป้าหมายได้ดี ตัวเลือก "We could reallocate the saved printing funds directly into live performance equipment" หรือ "That would save nearly half our marketing expenses while reaching more students" ช่วยสนับสนุนข้อเสนออย่างสมเหตุสมผล',
        trap_analysis: 'ระวังตัวเลือกที่ขัดแย้งกับคำชมของมาร์คัส เช่น "Nobody uses social media nowadays anyway" หรือ "It will cost triple our remaining money"',
        options: [
            { label: '1', content: 'That will cost triple our total allocated funds', is_correct: 0 },
            { label: '2', content: 'It would slash promotional costs dramatically without sacrificing engagement', is_correct: 1 },
            { label: '3', content: 'Nobody on our campus uses mobile devices or digital media', is_correct: 0 },
            { label: '4', content: 'We should cancel the arts festival and hold a silent protest', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_19',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Roommate A: "Hey Chris, do you mind keeping the volume down after eleven at night? I have eight o\'clock physics lectures every morning."\nRoommate B: "Oh, I am really sorry! I didn\'t realize my gaming headset had leaked audio that much. (1)_______."\nRoommate A: "I really appreciate that, thanks for understanding."',
        question_text: 'Which solution by Roommate B best shows mutual respect in shared housing?',
        difficulty: 'easy',
        explanation: 'รูมเมต B แสดงความเกรงใจและเสนอทางออกที่แก้ปัญหาได้จริง: "From now on, I will switch to closed-ear monitors and keep my voice low." (นับจากนี้ ฉันจะเปลี่ยนไปใช้หูฟังแบบปิดและเบาเสียงลง)',
        trap_analysis: 'ระวังตัวเลือกที่ประชดประชัน เช่น "You should buy earplugs if you want to sleep" หรือ "I pay rent so I make noise whenever I want"',
        options: [
            { label: '1', content: 'You ought to buy industrial earplugs if you are so sensitive.', is_correct: 0 },
            { label: '2', content: 'From now on, I will strictly switch to sound-isolating headphones after 10:30 PM.', is_correct: 1 },
            { label: '3', content: 'I pay my share of rent, so I have the absolute right to blast audio.', is_correct: 0 },
            { label: '4', content: 'Why don\'t you drop your physics class instead?', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_20',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_spk_lc',
        stimulus: 'Intern: "Pardon me, Ms. Jenkins. I finished compiling the quarterly consumer sentiment spreadsheet, but I noticed an anomaly in region four\'s return rates."\nSupervisor: "Good catch, Daniel. Anomalies like that often reveal shipping damage or warehouse handling issues. (1)_______ before we finalize the executive summary?"\nIntern: "I will contact the regional logistics coordinator immediately to cross-reference the shipment tracking logs."',
        question_text: 'Which instruction by the supervisor logically leads to the intern\'s reply in blank (1)?',
        difficulty: 'medium',
        explanation: 'หัวหน้างานชมเชยที่สังเกตเห็นจุดผิดปกติ และสั่งการให้ตรวจสอบเพิ่มเติม: "Could you dig into the transit records and verify whether damaged goods were reported?" ซึ่งสอดคล้องกับการที่เด็กฝึกงานตอบว่าจะติดต่อผู้ประสานงานขนส่งทันที',
        trap_analysis: 'ระวังตัวเลือกที่สั่งให้เพิกเฉย เช่น "Just delete region four so our numbers look better" หรือสั่งลงโทษโดยไม่ตรวจสอบข้อเท็จจริง',
        options: [
            { label: '1', content: 'Could you cross-check with the logistics hub to verify if transit damage was logged?', is_correct: 1 },
            { label: '2', content: 'Why don\'t you falsify the statistics so the CEO doesn\'t get upset?', is_correct: 0 },
            { label: '3', content: 'Ignore the discrepancy completely; nobody ever reads region four.', is_correct: 0 },
            { label: '4', content: 'Delete the entire database and start your internship all over again.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_21',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Urban planners are increasingly embracing green corridors—continuous networks of vegetated land woven throughout dense metropolitan centers. These biodiversity corridors not only mitigate the urban heat island effect, but also (1)_______ wildlife species to navigate fragmented habitats safely without encountering major vehicular thoroughfares.',
        question_text: 'Choose the correct grammatical verb form to complete blank (1):',
        difficulty: 'medium',
        explanation: 'โครงสร้าง "not only [verb 1]..., but also [verb 2]..." ต้องเป็น Parallel Structure (คู่ขนาน) เมื่อกริยาแรกคือ "mitigate" (พหูพจน์สอดคล้องกับประธาน these biodiversity corridors) กริยาตัวหลังจึงต้องเป็น "enable" รูปธรรมดา ไม่เติม -s',
        trap_analysis: 'ระวังตัวเลือก "enables" (สับสนประธานเอกพจน์) หรือ "enabling" (รูป participle ขาดกริยาแท้) และ "enabled" (อดีตกาล ขัดกับข้อเท็จจริงปัจจุบัน)',
        options: [
            { label: '1', content: 'enables', is_correct: 0 },
            { label: '2', content: 'enable', is_correct: 1 },
            { label: '3', content: 'enabling', is_correct: 0 },
            { label: '4', content: 'has enabled', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_22',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Despite the pervasive myth that multitasking enhances workplace productivity, cognitive psychologists have proven that the human brain cannot consciously process two complex linguistic tasks simultaneously. Rather, frequent task-switching imposes an invisible "cognitive tax," leading to heightened mental fatigue and a substantial (2)_______ in error rates.',
        question_text: 'Which noun best completes blank (2) according to the passage\'s meaning?',
        difficulty: 'medium',
        explanation: 'บริบทระบุว่าการสลับทำงานไปมาบ่อยๆ (Multitasking) สร้างภาระให้สมอง ทำให้เหนื่อยล้า และส่งผลให้ "อัตราการทำผิดพลาดเพิ่มขึ้นอย่างมีนัยสำคัญ" คำว่า "surge" (การพุ่งสูงขึ้น / การเพิ่มขึ้นอย่างรวดเร็ว) สอดคล้องกับบริบททางลบที่สุด',
        trap_analysis: 'คำว่า "decline" หรือ "reduction" แปลว่าลดลง ซึ่งจะขัดแย้งกับใจความว่า Multitasking ทำให้เกิดผลเสียและเกิดความผิดพลาดมากขึ้น',
        options: [
            { label: '1', content: 'reduction', is_correct: 0 },
            { label: '2', content: 'surge', is_correct: 1 },
            { label: '3', content: 'diminution', is_correct: 0 },
            { label: '4', content: 'reversal', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_23',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Archaeological excavations in the Nile Delta have unearthed ceramic vessels bearing remnants of beeswax and medicinal herbs. Chemical residue analysis suggests that ancient embalmers possessed an astonishingly (1)_______ understanding of botanical preservation techniques long before modern pharmacology emerged.',
        question_text: 'Choose the best adjective to fill blank (1):',
        difficulty: 'medium',
        explanation: 'บริบทแสดงความชื่นชมความรู้ของผู้ดองศพโบราณที่มีความเข้าใจด้านพฤกษศาสตร์อย่าง "ลึกซึ้ง / ซับซ้อนก้าวหน้า" คำว่า "sophisticated" (ซับซ้อน ปราณีต เชี่ยวชาญขั้นสูง) จึงเหมาะสมและเป็นศัพท์ TCAS ยอดนิยม',
        trap_analysis: 'คำว่า "rudimentary" (ขั้นพื้นฐาน / หยาบๆ) หรือ "superficial" (ผิวเผิน) จะขัดแย้งกับคำว่า "astonishingly" (น่าทึ่ง)',
        options: [
            { label: '1', content: 'rudimentary', is_correct: 0 },
            { label: '2', content: 'sophisticated', is_correct: 1 },
            { label: '3', content: 'superficial', is_correct: 0 },
            { label: '4', content: 'negligible', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_24',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'When autonomous navigation software encounters ambiguous sensor data—such as dense fog obscuring lane markers—it must calculate safety margins in milliseconds. In such critical junctures, the vehicle must prioritize passenger safety (1)_______ compromising the physical well-being of nearby pedestrians.',
        question_text: 'Select the most appropriate prepositional phrase to fill blank (1):',
        difficulty: 'hard',
        explanation: 'สำนวน "without compromising..." แปลว่า "โดยไม่ลดทอน / โดยไม่กระทบต่อ..." หมายความว่ารถยนต์ต้องคำนึงถึงความปลอดภัยของผู้โดยสาร โดยต้องไม่ทำให้คนเดินถนนตกอยู่ในอันตรายด้วยเช่นกัน',
        trap_analysis: 'คำว่า "at the expense of" (โดยแลกกับการสูญเสีย...) มีความหมายตรงข้ามกับหลักจริยธรรมของ AI ที่ต้องพยายามไม่ให้คนเดินถนนได้รับอันตราย',
        options: [
            { label: '1', content: 'at the expense of', is_correct: 0 },
            { label: '2', content: 'without compromising', is_correct: 1 },
            { label: '3', content: 'regardless of', is_correct: 0 },
            { label: '4', content: 'in favor of', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_25',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'Historically, classical economists assumed that individual market participants behave with relentless rationality, calculating utility with mathematical precision. However, contemporary behavioral economics has debunked this assumption, demonstrating that cognitive biases and emotional impulses frequently (1)_______ consumers into making suboptimal financial decisions.',
        question_text: 'Choose the verb that best fits blank (1):',
        difficulty: 'medium',
        explanation: 'สำนวน "mislead / sway / steer someone into doing something" แปลว่า "ชักนำ / ล่อลวงให้ทำ..." ในที่นี้อารมณ์และอคติทางความคิดชักนำให้ผู้บริโภคตัดสินใจทางการเงินที่ผิดพลาด (suboptimal)',
        trap_analysis: 'คำว่า "deter" แปลว่า ยับยั้ง/ขัดขวาง ซึ่งต้องใช้กับ "from doing something" ไม่ใช่ "into doing"',
        options: [
            { label: '1', content: 'deter', is_correct: 0 },
            { label: '2', content: 'steer', is_correct: 1 },
            { label: '3', content: 'refrain', is_correct: 0 },
            { label: '4', content: 'exempt', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_26',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_tc',
        stimulus: 'The James Webb Space Telescope recently captured deep-field infrared spectroscopy of early galactic clusters formed less than 400 million years after the Big Bang. These observations challenge existing cosmological models, indicating that primordial stars grew and synthesized heavy elements far (1)_______ than theoretical simulations had previously predicted.',
        question_text: 'Choose the correct comparative phrase for blank (1):',
        difficulty: 'easy',
        explanation: 'การเปรียบเทียบขั้นกว่า (Comparative) เพื่อขยายกริยา "grew and synthesized" ต้องใช้รูป Adverb เปรียบเทียบ คือ "far more rapidly" (รวดเร็วกว่ามาก) โดยมี "far" ทำหน้าที่เป็น Intensifier ขยายขั้นกว่า',
        trap_analysis: 'ระวัง "more rapid" (เป็น adjective ขยายกริยาไม่ได้) หรือ "most rapidly" (ขั้นสุด ไม่ใช้กับ than)',
        options: [
            { label: '1', content: 'more rapid', is_correct: 0 },
            { label: '2', content: 'far more rapidly', is_correct: 1 },
            { label: '3', content: 'most rapidly', is_correct: 0 },
            { label: '4', content: 'as rapidly as', is_correct: 0 }
        ]
    }
];

insertQuestionsBatch(batch2Questions);
