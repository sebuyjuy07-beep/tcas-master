const { insertQuestionsBatch } = require('./add_questions_helper');

const batch4Questions = [
    {
        id: 'q_tgat1_37',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Passage 1:\nDeep-sea hydrothermal vents, discovered along mid-ocean ridges in the late 1970s, utterly overturned long-held biological paradigms. Prior to their discovery, scientists assumed that all terrestrial and marine ecosystems fundamentally depended upon photosynthetic energy derived from solar radiation. In the pitch-black abyssal zone, however, specialized chemosynthetic bacteria thrive by oxidizing toxic hydrogen sulfide spewing from geothermal fissures. These microbes form the bedrock of an astonishing food web, nourishing colossal tube worms, ghostly crustaceans, and bioluminescent predators in an environment under crushing hydrostatic pressure.',
        question_text: 'What was the primary scientific misconception disproven by the discovery of hydrothermal vents?',
        difficulty: 'medium',
        explanation: 'ย่อหน้าระบุว่า ก่อนการค้นพบปล่องน้ำร้อนใต้สมุทร นักวิทยาศาสตร์เคยเชื่อว่า "สิ่งมีชีวิตทุกระบบนิเวศบนโลกต้องพึ่งพาพลังงานการสังเคราะห์ด้วยแสงจากดวงอาทิตย์เป็นพื้นฐาน" แต่การค้นพบแบคทีเรียที่ใช้เคมีสังเคราะห์ (Chemosynthesis) ในความมืดมิดได้ลบล้างความเชื่อเดิมนี้',
        trap_analysis: 'ระวังตัวเลือกที่บอกว่า "เชื่อว่าใต้ทะเลไม่มีน้ำแรงดันสูง" หรือ "เชื่อว่าไม่มีสัตว์มีพิษ" ซึ่งไม่ใช่ประเด็นการปฏิวัติกระบวนทัศน์ทางชีววิทยา (biological paradigm shift)',
        options: [
            { label: '1', content: 'That ocean trenches were completely devoid of volcanic fissures.', is_correct: 0 },
            { label: '2', content: 'That all life on Earth ultimately requires sunlight as its foundational energy source.', is_correct: 1 },
            { label: '3', content: 'That bacteria could never survive in warm aquatic temperatures.', is_correct: 0 },
            { label: '4', content: 'That tube worms were the ancestors of modern crustaceans.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_38',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Passage 1:\nDeep-sea hydrothermal vents, discovered along mid-ocean ridges in the late 1970s, utterly overturned long-held biological paradigms. Prior to their discovery, scientists assumed that all terrestrial and marine ecosystems fundamentally depended upon photosynthetic energy derived from solar radiation. In the pitch-black abyssal zone, however, specialized chemosynthetic bacteria thrive by oxidizing toxic hydrogen sulfide spewing from geothermal fissures. These microbes form the bedrock of an astonishing food web, nourishing colossal tube worms, ghostly crustaceans, and bioluminescent predators in an environment under crushing hydrostatic pressure.',
        question_text: 'Which organism serves as the foundational energy producer in these ecosystems?',
        difficulty: 'easy',
        explanation: 'ข้อความระบุชัดเจน: "specialized chemosynthetic bacteria thrive by oxidizing toxic hydrogen sulfide... These microbes form the bedrock of an astonishing food web" ดังนั้น แบคทีเรียเคมีสังเคราะห์คือผู้ผลิตปฐมภูมิ',
        trap_analysis: 'ระวังตอบ "tube worms" หรือ "crustaceans" ซึ่งเป็นผู้บริโภคที่อาศัยพึ่งพาพลังงานจากแบคทีเรียอีกทอดหนึ่ง',
        options: [
            { label: '1', content: 'Sunlight-absorbing marine phytoplankton', is_correct: 0 },
            { label: '2', content: 'Chemosynthetic sulfur-oxidizing bacteria', is_correct: 1 },
            { label: '3', content: 'Giant predatory tube worms', is_correct: 0 },
            { label: '4', content: 'Bioluminescent deep-sea sharks', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_39',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Passage 2:\nUrban rewilding represents a transformative shift in landscape architecture. Rather than manicuring sterile decorative lawns that demand copious chemical pesticides and excessive irrigation, municipalities are deliberately reintroducing native perennials, pollinator pathways, and miniature pocket forests into urban cores. Studies conducted in European capitals indicate that rewilded public parks foster up to a 400% increase in wild bee diversity and reduce localized stormwater runoff by nearly half. Nonetheless, proponents often face resistance from residents who equate untamed vegetation with neglect, urban decay, or pest infestation.',
        question_text: 'What is the primary obstacle that urban rewilding initiatives encounter according to Passage 2?',
        difficulty: 'medium',
        explanation: 'ประโยคสุดท้ายของบทความระบุ: "proponents often face resistance from residents who equate untamed vegetation with neglect, urban decay, or pest infestation." (ผู้สนับสนุนมักเผชิญการต่อต้านจากชาวบ้านที่มองว่าต้นไม้รกๆ ตามธรรมชาติคือการละเลยความสะอาด ความเสื่อมโทรม หรือแหล่งสะสมแมลงสัตว์กัดต่อย)',
        trap_analysis: 'ระวังตัวเลือกที่บอกว่า "ขาดแคลนพันธุ์พืชพื้นเมือง" หรือ "ผึ้งไม่ยอมบินมา" ซึ่งขัดแย้งกับสถิติที่ระบุว่าความหลากหลายของผึ้งเพิ่มขึ้นถึง 400%',
        options: [
            { label: '1', content: 'A complete lack of native plant nurseries across European cities.', is_correct: 0 },
            { label: '2', content: 'Public skepticism from locals who perceive unmanicured growth as unsightly or neglected.', is_correct: 1 },
            { label: '3', content: 'Excessive stormwater flooding that destroys small pocket forests.', is_correct: 0 },
            { label: '4', content: 'A dangerous decline in urban pollinator populations.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_40',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Passage 2:\nUrban rewilding represents a transformative shift in landscape architecture. Rather than manicuring sterile decorative lawns that demand copious chemical pesticides and excessive irrigation, municipalities are deliberately reintroducing native perennials, pollinator pathways, and miniature pocket forests into urban cores. Studies conducted in European capitals indicate that rewilded public parks foster up to a 400% increase in wild bee diversity and reduce localized stormwater runoff by nearly half. Nonetheless, proponents often face resistance from residents who equate untamed vegetation with neglect, urban decay, or pest infestation.',
        question_text: 'What does the passage imply about traditional decorative turf lawns?',
        difficulty: 'medium',
        explanation: 'บทความกล่าวถึงสนามหญ้าตัดแต่งแบบเดิม (decorative lawns) ว่า "sterile" (แห้งแล้งไร้ชีวิต) และ "demand copious chemical pesticides and excessive irrigation" (ต้องใช้สารเคมีฆ่าแมลงและใช้น้ำรดมหาศาล) แสดงว่าสนามหญ้าแบบดั้งเดิมส่งผลเสียต่อระบบนิเวศและสิ้นเปลืองทรัพยากร',
        trap_analysis: 'ระวังตัวเลือกที่บอกว่าสนามหญ้าดั้งเดิมป้องกันน้ำท่วมได้ดีกว่า ซึ่งตรงข้ามกับบทความที่บอกว่าป่าฟื้นฟูช่วยลดน้ำหลากได้เกือบครึ่ง',
        options: [
            { label: '1', content: 'They are far superior at preventing urban flash floods.', is_correct: 0 },
            { label: '2', content: 'They require substantial resource inputs and offer meager ecological value.', is_correct: 1 },
            { label: '3', content: 'They provide critical breeding sanctuaries for wild honeybees.', is_correct: 0 },
            { label: '4', content: 'They cost significantly less to maintain than native wildflower meadows.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_41',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Passage 3:\nIn clinical radiology, machine learning algorithms trained on millions of high-resolution computed tomography (CT) scans can detect incipient pulmonary nodules with diagnostic sensitivity rivaling veteran radiologists. However, medical ethicists caution against premature full automation. A major predicament is the "black box" conundrum: deep neural networks synthesize complex non-linear feature abstractions that even software developers cannot unpack into transparent clinical logic. When an algorithm misclassifies a benign shadow as a malignant carcinoma, doctors cannot ascertain the exact mathematical chain of inference behind the diagnostic error, complicating patient disclosure and liability.',
        question_text: 'Which title best captures the core focus of Passage 3?',
        difficulty: 'hard',
        explanation: 'บทความกล่าวถึงทั้งความสามารถอันยอดเยี่ยมของ AI ในการตรวจภาพสแกนปอด และประเด็นปัญหาเรื่อง "Black box" ที่แพทย์ไม่สามารถตรวจสอบตรรกะเบื้องหลังได้เมื่อเกิดข้อผิดพลาด หัวข้อที่ครอบคลุมทั้งประโยชน์และข้อกังวลทางคลินิกคือ "AI in Diagnostic Imaging: Diagnostic Promise and Interpretability Dilemmas"',
        trap_analysis: 'ระวังหัวข้อที่มองแง่เดียว เช่น "Why Doctors Must Be Fired Immediately" หรือ "The Complete Failure of Medical Software"',
        options: [
            { label: '1', content: 'The Immediate Replacement of Physicians by Neural Algorithms', is_correct: 0 },
            { label: '2', content: 'AI in Radiology: Breakthrough Diagnostic Accuracy and the Challenge of Interpretability', is_correct: 1 },
            { label: '3', content: 'How to Prevent Malignant Lung Cancer through Diet and Exercise', is_correct: 0 },
            { label: '4', content: 'A Technical Manual on Constructing Computed Tomography Hardware', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_42',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Passage 3:\nIn clinical radiology, machine learning algorithms trained on millions of high-resolution computed tomography (CT) scans can detect incipient pulmonary nodules with diagnostic sensitivity rivaling veteran radiologists. However, medical ethicists caution against premature full automation. A major predicament is the "black box" conundrum: deep neural networks synthesize complex non-linear feature abstractions that even software developers cannot unpack into transparent clinical logic. When an algorithm misclassifies a benign shadow as a malignant carcinoma, doctors cannot ascertain the exact mathematical chain of inference behind the diagnostic error, complicating patient disclosure and liability.',
        question_text: 'What does the author mean by the "black box conundrum"?',
        difficulty: 'medium',
        explanation: 'จากเนื้อหา: "deep neural networks synthesize complex non-linear feature abstractions that even software developers cannot unpack into transparent clinical logic" หมายความว่า การทำงานภายในของ AI ซับซ้อนจนมนุษย์ไม่สามารถมองเห็นหรืออธิบายเหตุผลทีละขั้นตอนได้อย่างโปร่งใส',
        trap_analysis: 'ระวังตัวเลือกที่แปลตรงตัวว่า "กล่องสีดำที่ใส่คอมพิวเตอร์" หรือ "กล่องบันทึกการบินของเครื่องบิน"',
        options: [
            { label: '1', content: 'The physical protective casing of CT scanners is painted opaque black.', is_correct: 0 },
            { label: '2', content: 'The internal decision-making process of the algorithm lacks human-interpretable transparency.', is_correct: 1 },
            { label: '3', content: 'Radiologists refuse to operate digital workstations in dimly lit clinic rooms.', is_correct: 0 },
            { label: '4', content: 'Patients are strictly prohibited from viewing their own medical laboratory records.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_43',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Passage 4:\nLinguistic anthropologists estimate that of the roughly 7,000 languages currently spoken worldwide, more than half may vanish before the turn of the next century. As globalization fuels cultural homogenization, younger generations in indigenous communities increasingly abandon ancestral tongues in favor of national lingua francas that offer broader economic mobility. When an unwritten indigenous language perishes, the loss extends far beyond syntax and phonology; it erases millennia of unique ethnobotanical knowledge, oral folklore, and nuanced conceptual frameworks for understanding local biodiversity.',
        question_text: 'According to Passage 4, why do younger generations often stop speaking their ancestral languages?',
        difficulty: 'medium',
        explanation: 'บทความระบุ: "younger generations in indigenous communities increasingly abandon ancestral tongues in favor of national lingua francas that offer broader economic mobility." (คนรุ่นใหม่หันไปใช้ภาษาส่วนกลางเนื่องจากเปิดโอกาสทางเศรษฐกิจและการทำงานที่กว้างขวางกว่า)',
        trap_analysis: 'ระวังตัวเลือกที่บอกว่า "รัฐบาลสั่งประหารชีวิตคนพูดภาษาถิ่น" หรือ "ภาษาถิ่นไม่มีคำศัพท์พอ" ซึ่งไม่ได้กล่าวถึงในบทความ',
        options: [
            { label: '1', content: 'Ancient languages are legally banned by international education conventions.', is_correct: 0 },
            { label: '2', content: 'Dominant national languages provide greater employment and economic opportunities.', is_correct: 1 },
            { label: '3', content: 'Indigenous vocabularies have been proven scientifically inaccurate.', is_correct: 0 },
            { label: '4', content: 'Digital translation software has rendered foreign languages obsolete.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_44',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Passage 4:\nLinguistic anthropologists estimate that of the roughly 7,000 languages currently spoken worldwide, more than half may vanish before the turn of the next century. As globalization fuels cultural homogenization, younger generations in indigenous communities increasingly abandon ancestral tongues in favor of national lingua francas that offer broader economic mobility. When an unwritten indigenous language perishes, the loss extends far beyond syntax and phonology; it erases millennia of unique ethnobotanical knowledge, oral folklore, and nuanced conceptual frameworks for understanding local biodiversity.',
        question_text: 'What tone does the author convey regarding language loss?',
        difficulty: 'medium',
        explanation: 'ผู้เขียนบรรยายว่าการสูญสิ้นของภาษาไม่ได้เป็นแค่เรื่องของไวยากรณ์ แต่เป็นการลบล้างองค์ความรู้ทางพฤกษศาสตร์พื้นบ้านและกรอบความคิดที่มีคุณค่านับพันปี น้ำเสียงจึงเป็นความห่วงใย เสียดาย และตระหนักถึงความสูญเสียทางปัญญา (concerned, grave, and appreciative of indigenous heritage)',
        trap_analysis: 'ระวังตัวเลือกอย่าง "indifferent" (เพิกเฉย ไม่แคร์) หรือ "enthusiastic / celebratory" (ยินดีปรีดาที่ภาษาโบราณหายไป)',
        options: [
            { label: '1', content: 'Indifferent and detached', is_correct: 0 },
            { label: '2', content: 'Gravely concerned and lamenting the irreversible cultural loss', is_correct: 1 },
            { label: '3', content: 'Celebratory about the unification of a single global dialect', is_correct: 0 },
            { label: '4', content: 'Mocking and dismissive toward ancient folklore', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_45',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Passage 5:\nSleep consolidation is fundamentally linked to the glymphatic system—a specialized waste clearance pathway in the mammalian central nervous system. During deep slow-wave sleep, glial cells shrink by up to sixty percent, widening interstitial spaces and allowing cerebrospinal fluid to flush through cerebral tissue rapidly. This nocturnal cleansing cycle washes away metabolic waste products accumulated during wakefulness, notably beta-amyloid plaques and tau proteins associated with Alzheimer\'s disease. Chronic sleep deprivation, therefore, does not merely cause lethargy; it directly impairs the brain\'s mechanical sanitation mechanism.',
        question_text: 'What physiological change occurs in glial cells during deep slow-wave sleep?',
        difficulty: 'easy',
        explanation: 'จากข้อความ: "During deep slow-wave sleep, glial cells shrink by up to sixty percent, widening interstitial spaces..." (เซลล์เกลียจะหดตัวลงมากถึง 60% ทำให้ช่องว่างระหว่างเซลล์กว้างขึ้น เพื่อให้น้ำไขสันหลังไหลเวียนชะล้างของเสียได้เร็ว)',
        trap_analysis: 'ระวังตัวเลือกที่บอกว่า "เซลล์เกลียบวมขึ้น 60%" (swelling) ซึ่งตรงกันข้ามกับคำว่า "shrink" (หดตัว)',
        options: [
            { label: '1', content: 'They swell to double their normal size to store energy.', is_correct: 0 },
            { label: '2', content: 'They contract substantially to enlarge pathways for cerebrospinal fluid flow.', is_correct: 1 },
            { label: '3', content: 'They produce toxic beta-amyloid proteins at an accelerated pace.', is_correct: 0 },
            { label: '4', content: 'They detach from the central nervous system permanently.', is_correct: 0 }
        ]
    },
    {
        id: 'q_tgat1_46',
        subject_id: 'tgat1',
        blueprint_id: 'tgat1_rd_rc',
        stimulus: 'Passage 5:\nSleep consolidation is fundamentally linked to the glymphatic system—a specialized waste clearance pathway in the mammalian central nervous system. During deep slow-wave sleep, glial cells shrink by up to sixty percent, widening interstitial spaces and allowing cerebrospinal fluid to flush through cerebral tissue rapidly. This nocturnal cleansing cycle washes away metabolic waste products accumulated during wakefulness, notably beta-amyloid plaques and tau proteins associated with Alzheimer\'s disease. Chronic sleep deprivation, therefore, does not merely cause lethargy; it directly impairs the brain\'s mechanical sanitation mechanism.',
        question_text: 'What major clinical risk is associated with persistent sleep deprivation?',
        difficulty: 'medium',
        explanation: 'บทความระบุว่า การล้างของเสียในสมองช่วยกำจัดโปรตีนเบต้าอะไมลอยด์และทาวที่เชื่อมโยงกับโรคอัลไซเมอร์ การอดนอนเรื้อรังจึงทำให้กระบวนการนี้บกพร่อง และเสี่ยงต่อการสะสมของเสียที่ก่อโรคประสาทเสื่อมถอย (neurodegenerative diseases)',
        trap_analysis: 'ระวังตัวเลือกที่บอกว่าเป็นแค่ "ความง่วงนอนชั่วคราว" (temporary tiredness) ซึ่งบทความเน้นย้ำว่า "does not merely cause lethargy" แต่มันสร้างความเสียหายเชิงโครงสร้างสมอง',
        options: [
            { label: '1', content: 'Temporary daytime eye irritation that resolves spontaneously.', is_correct: 0 },
            { label: '2', content: 'Heightened accumulation of neurotoxic proteins linked to Alzheimer\'s pathology.', is_correct: 1 },
            { label: '3', content: 'An irrepressible surge in photographic memory capacity.', is_correct: 0 },
            { label: '4', content: 'Total immunity from viral respiratory infections.', is_correct: 0 }
        ]
    }
];

insertQuestionsBatch(batch4Questions);
