# -*- coding: utf-8 -*-
"""
Full CEFR Level C1 Vocabulary Builder (300 Words)
Advanced academic vocabulary for A-Level English & High-Register Analysis.
"""

import json

C1_RAW = [
    # 1 - 50
    ("abnegation", "noun", "/ˌæb.nɪˈɡeɪ.ʃən/", "การสละสิทธิ์, การปฏิเสธความปรารถนาส่วนตัว", "action of renouncing or rejecting something, self-denial", "Monastic vows require complete abnegation of worldly luxuries.", ["renunciation", "self-denial", "rejection"], ["indulgence"]),
    ("abstruse", "adjective", "/æbˈstruːs/", "ลึกซึ้งเข้าใจยาก, ลึกลับซับซ้อน", "difficult to understand, obscure", "The philosopher's lectures on metaphysics were notoriously abstruse.", ["obscure", "arcane", "recondite"], ["clear", "obvious"]),
    ("accretion", "noun", "/əˈkriː.ʃən/", "การพอกพูนสะสมทีละน้อย", "process of growth or increase, typically by gradual accumulation", "Coral atolls form through the slow accretion of mineral calcium.", ["accumulation", "buildup", "growth"], ["erosion", "decay"]),
    ("adulation", "noun", "/ˌædʒ.əˈleɪ.ʃən/", "การประจบเยินยอเกินจริง", "excessive admiration or praise", "The pop icon grew weary of constant media adulation and scrutiny.", ["flattery", "worship", "praise"], ["criticism", "abuse"]),
    ("adventitious", "adjective", "/ˌæd.vənˈtɪʃ.əs/", "เกิดขึ้นโดยบังเอิญ, มิใช่สิ่งที่มีแต่กำเนิด", "happening according to chance rather than design", "The archaeological artifact discovery was an adventitious stroke of luck.", ["accidental", "chance", "unplanned"], ["deliberate", "innate"]),
    ("aegis", "noun", "/ˈiː.dʒɪs/", "ความคุ้มครอง, ความอุปถัมภ์", "protection, backing, or support of a particular person or organization", "Medical relief missions operated under the peaceful aegis of the Red Cross.", ["protection", "patronage", "sponsorship"], []),
    ("aggrandize", "verb", "/əˈɡræn.daɪz/", "เพิ่มอำนาจ, ยกย่องให้ยิ่งใหญ่เกินจริง", "to increase the power, status, or wealth of", "The corrupt monarch sought only to aggrandize his personal dynasty.", ["elevate", "magnify", "expand"], ["belittle", "diminish"]),
    ("alacrity", "noun", "/əˈlæk.rə.ti/", "ความกระตือรือร้นว่องไว", "brisk and cheerful readiness", "The intern accepted the difficult research assignment with alacrity.", ["eagerness", "willingness", "readiness"], ["reluctance", "apathy"]),
    ("anathema", "noun", "/əˈnæθ.ə.mə/", "สิ่งที่เป็นที่รังเกียจขยะแขยงอย่างยิ่ง", "something or someone that one vehemently dislikes", "Censorship of scientific discovery is an anathema to free societies.", ["abomination", "curse", "outrage"], ["blessing"]),
    ("animadversion", "noun", "/ˌæn.ɪ.mædˈvɜː.ʃən/", "การวิพากษ์วิจารณ์ตำหนิอย่างรุนแรง", "criticism or censure", "His academic thesis faced severe animadversion from conservative faculty.", ["criticism", "censure", "reproof"], ["praise", "acclaim"]),
    ("antediluvian", "adjective", "/ˌæn.ti.dɪˈluː.vi.ən/", "โบราณตกยุค, โบราณก่อนยุคน้ำท่วมโลก", "of or belonging to the time before the biblical Flood, ridiculously old-fashioned", "The school board replaced its antediluvian computer network with fiber-optics.", ["antiquated", "outdated", "prehistoric"], ["modern", "current"]),
    ("antipodal", "adjective", "/ænˈtɪp.ə.dəl/", "ตรงกันข้ามอย่างสิ้นเชิง, อยู่คนละขั้วโลก", "relating to the other side of the earth, diametrically opposed", "Their political worldviews are antipodal on taxation and welfare.", ["opposite", "contrasting", "antithetical"], ["identical"]),
    ("antithetical", "adjective", "/ˌæn.tɪˈθet.ɪ.kəl/", "ตรงกันข้ามอย่างสิ้นเชิง", "directly opposed or contrasted, mutually incompatible", "Greed and exploitation are antithetical to true public service.", ["opposed", "contrasting", "contrary"], ["complementary"]),
    ("apocryphal", "adjective", "/əˈpɒk.rɪ.fəl/", "ไม่น่าเชื่อถือ, น่าสงสัยว่าเป็นเรื่องแต่ง", "of doubtful authenticity, although widely circulated as true", "The famous story of the apple falling on Newton's head may be apocryphal.", ["dubious", "spurious", "fictitious"], ["authentic", "genuine"]),
    ("apotheosis", "noun", "/əˌpɒθ.iˈəʊ.sɪs/", "จุดสูงสุดแห่งความสมบูรณ์แบบ, การยกย่องประดุจเทพ", "highest point in development of something, culmination", "The symphony was hailed as the absolute apotheosis of romantic music.", ["climax", "pinnacle", "zenith"], ["nadir"]),
    ("approbation", "noun", "/ˌæp.rəˈbeɪ.ʃən/", "การเห็นชอบ, การยกย่องชมเชยอย่างเป็นทางการ", "approval or praise", "The architecture proposal met with immediate approbation from city planners.", ["approval", "praise", "endorsement"], ["disapprobation"]),
    ("arrogate", "verb", "/ˈær.ə.ɡeɪt/", "ทึกทักเอาเองโดยพลการ, ฮุบอำนาจ", "to take or claim for oneself without justification", "No single official should arrogate total executive power without oversight.", ["usurp", "seize", "appropriate"], ["relinquish"]),
    ("asceticism", "noun", "/əˈset.ɪ.sɪ.zəm/", "การถือสันโดษบำเพ็ญพรต", "severe self-discipline and avoidance of all forms of indulgence", "Hermits embrace asceticism to achieve higher spiritual contemplation.", ["austerity", "self-denial", "abstinence"], ["hedonism"]),
    ("asperity", "noun", "/æˈsper.ə.ti/", "ความเกรี้ยวกราด, ความหยาบกระด้าง", "harshness of tone or manner", "The general responded to the insolent soldier with biting asperity.", ["harshness", "sharpness", "bitterness"], ["mildness", "gentleness"]),
    ("aspersion", "noun", "/əˈspɜː.ʃən/", "การใส่ร้ายป้ายสีให้เสื่อมเสีย", "attack on the reputation or integrity of someone", "Do not cast aspersions on someone's moral character without proof.", ["slander", "defamation", "calumny"], ["praise", "commendation"]),
    ("assiduity", "noun", "/ˌæs.ɪˈdʒuː.ə.ti/", "ความบากบั่นพากเพียรไม่หยุดยั้ง", "constant or close attention to what one is doing", "Her academic assiduity earned her top standing throughout medical school.", ["diligence", "industry", "perseverance"], ["indolence", "laziness"]),
    ("atavistic", "adjective", "/ˌæt.əˈvɪs.tɪk/", "ซึ่งย้อนกลับไปสู่สัญชาตญาณดั้งเดิม", "relating to or characterized by reversion to something ancient or ancestral", "Panic in dark caves triggers primal, atavistic survival instincts.", ["ancestral", "primitive", "primal"], []),
    ("attrition", "noun", "/əˈtrɪʃ.ən/", "การบั่นทอนกำลังลงเรื่อยๆ, การสึกหรอ", "action or process of gradually reducing the strength or effectiveness of someone", "The prolonged war of economic attrition exhausted national reserves.", ["weakening", "wearing down", "erosion"], ["reinforcement"]),
    ("augury", "noun", "/ˈɔː.ɡjə.ri/", "ลางบอกเหตุ, ศาสตร์การทำนาย", "sign of what will happen in the future, an omen", "Ancient seers interpreted the flight patterns of eagles as a divine augury.", ["omen", "portent", "sign"], []),
    ("auspices", "noun", "/ˈɔː.spɪ.sɪz/", "การอุปถัมภ์ค้ำชู, การสนับสนุน", "guidance, support, or patronage", "The medical clinic was organized under the noble auspices of UNESCO.", ["patronage", "sponsorship", "backing"], []),
    ("autochthonous", "adjective", "/ɔːˈtɒk.θə.nəs/", "ที่เป็นชนพื้นเมืองดั้งเดิมของดินแดน", "indigenous rather than descended from migrants", "The island's autochthonous inhabitants preserved unique linguistic dialects.", ["indigenous", "native", "aboriginal"], []),
    ("avatar", "noun", "/ˈæv.ə.tɑːr/", "อวตาร, ตัวแทนในโลกเสมือน", "manifestation of a deity or figure, or icon representing user", "Players personalize their digital avatar with customized cyber clothing.", ["manifestation", "embodiment"], []),
    ("avuncular", "adjective", "/əˈvʌŋ.kjə.lər/", "ใจดีมีเมตตาประดุจลุงหรืออา", "relating to an uncle, kind and friendly toward younger person", "The elderly professor greeted freshmen with warm, avuncular affection.", ["kindly", "benevolent", "friendly"], []),
    ("badinage", "noun", "/ˌbæd.ɪˈnɑːʒ/", "การเย้าแหย่เล่นสนุกสนาน", "humorous or witty conversation", "They engaged in lighthearted badinage over morning tea and crumpets.", ["banter", "witticism", "chaff"], []),
    ("bailiwick", "noun", "/ˈbeɪ.lɪ.wɪk/", "ขอบเขตความเชี่ยวชาญเฉพาะด้าน", "one's sphere of operations or particular area of interest", "Theoretical astrophysics is Dr. Anderson's specialized professional bailiwick.", ["domain", "field", "realm"], []),
    ("blandishment", "noun", "/ˈblæn.dɪʃ.mənt/", "คำประจบสอพลอหวานหู", "flattering or pleasing statement or action used to persuade someone", "The honest official resisted all diplomatic blandishments and bribes.", ["flattery", "coaxing", "cajolery"], []),
    ("blazon", "verb", "/ˈbleɪ.zən/", "ประกาศให้โลกรู้, ประดับประดาตราสัญลักษณ์", "to display prominently or vividly", "Corporate sponsors blazoned their logos across stadium grandstands.", ["display", "proclaim", "exhibit"], []),
    ("bowdlerize", "verb", "/ˈbaʊd.lər.aɪz/", "ตัดทอนข้อความที่ล่อแหลมออก", "to remove material that is considered improper or offensive from text", "The conservative publisher bowdlerized the classic novel for children.", ["expurgate", "censor", "sanitize"], []),
    ("braggadocio", "noun", "/ˌbræɡ.əˈdəʊ.tʃi.əʊ/", "การคุยโวโอ้อวดเกินจริง", "boastful or arrogant behavior", "His loud braggadocio masked deep personal insecurities about failure.", ["boasting", "bravado", "swagger"], ["modesty"]),
    ("bravura", "noun", "/brəˈvjʊə.rə/", "ความกล้าหาญจัดจ้านในการแสดงออก", "great technical skill and brilliance shown in an artistic performance", "The pianist concluded the symphony with an exhilarating display of bravura.", ["virtuosity", "brilliance", "flair"], []),
    ("broach", "verb", "/brəʊtʃ/", "หยิบยกประเด็นที่ละเอียดอ่อนขึ้นมาพูด", "to raise a sensitive or difficult subject for discussion", "She hesitated before deciding to broach the topic of salary increases.", ["introduce", "mention", "bring up"], []),
    ("bucolic", "adjective", "/bjuːˈkɒl.ɪk/", "เกี่ยวกับชีวิตชนบทอันสงบร่มรื่น", "relating to the pleasant aspects of the countryside and country life", "The oil painting depicts a tranquil bucolic landscape with grazing sheep.", ["rustic", "pastoral", "rural"], ["urban"]),
    ("cadence", "noun", "/ˈkeɪ.dəns/", "จังหวะจะโคนของเสียงดนตรีหรือคำพูด", "modulation or inflection of the voice, rhythmic flow of sequence", "The poet read her verses with a soothing, hypnotic vocal cadence.", ["rhythm", "tempo", "meter"], []),
    ("cadre", "noun", "/ˈkɑː.dər/", "กลุ่มแกนนำหลักที่ผ่านการฝึกฝน", "small group of people specially trained for a particular purpose", "An experienced cadre of researchers led the clinical trial teams.", ["core group", "team", "nucleus"], []),
    ("canard", "noun", "/kəˈnɑːd/", "ข่าวลือโคมลอย, ข่าวเท็จ", "unfounded rumor or story", "The newspaper retracted the article, apologizing for printing a baseless canard.", ["rumor", "hoax", "falsehood"], ["fact", "truth"]),
    ("cantankerous", "adjective", "/kænˈtæŋ.kər.əs/", "ชอบหาเรื่อง, ขี้หงุดหงิดโมโหร้าย", "bad-tempered, argumentative, and uncooperative", "The cantankerous old sailor grumbled about every passing tourist.", ["irritable", "cranky", "peevish"], ["genial", "affable"]),
    ("caparison", "noun", "/kəˈpær.ɪ.sən/", "เครื่องประดับตกแต่งหลังม้าอย่างหรูหรา", "decorative covering for a horse or for a person", "The royal stallion was adorned in silk and gold-trimmed ceremonial caparison.", ["ornamentation", "trapping"], []),
    ("carapace", "noun", "/ˈkær.ə.peɪs/", "กระดองแข็งหุ้มตัวสัตว์", "hard upper shell of a turtle, crustacean, or arachnid", "A turtle pulls its limbs inside its thick protective bone carapace.", ["shell", "shield"], []),
    ("caricature", "noun", "/ˈkær.ɪ.kə.tʃʊər/", "ภาพล้อเลียนบุคคลที่เน้นจุดเด่นเกินจริง", "picture, description, or imitation of a person with exaggerated features", "The editorial cartoonist drew a witty political caricature of the senator.", ["parody", "satire", "cartoon"], []),
    ("casuistry", "noun", "/ˈkæʒ.u.ɪ.stri/", "การใช้ตรรกะวิบัติล่อหลอกเพื่อแก้ตัว", "use of clever but unsound reasoning, especially in moral questions", "The spokesperson used sophisticated casuistry to justify deceptive practices.", ["sophistry", "equivocation", "chicanery"], []),
    ("cataclysm", "noun", "/ˈkæt.ə.klɪ.zəm/", "มหันตภัยความพินาศครั้งใหญ่หลวง", "large-scale and violent event in the natural world", "Asteroid collisions caused planetary cataclysms that wiped out dinosaurs.", ["disaster", "catastrophe", "upheaval"], []),
    ("caterwaul", "verb", "/ˈkæt.ə.wɔːl/", "ส่งเสียงร้องโหยหวนแหลมแสบแก้วหู", "to make a shrill howling or wailing noise like that of a cat", "Stray cats caterwauled loudly outside the bedroom window at midnight.", ["wail", "shriek", "screech"], []),
    ("cavalcade", "noun", "/ˌkæv.əlˈkeɪd/", "ขบวนพาเหรดขบวนแห่ม้าหรือรถ", "formal procession of people walking, on horseback, or riding in vehicles", "Cheering crowds lined the boulevard to view the royal motorcade cavalcade.", ["procession", "parade", "caravan"], []),
    ("cavil", "verb", "/ˈkæv.əl/", "ติเตียนในเรื่องหยุมหยิม", "to make petty or unnecessary objections", "Do not cavil over minor punctuation errors in an early rough draft.", ["quibble", "carp", "nitpick"], []),
    ("cerebration", "noun", "/ˌser.əˈbreɪ.ʃən/", "การใช้กระบวนการคิดและสติปัญญา", "action of thinking, thought", "Solving advanced calculus problems requires intense, focused cerebration.", ["thought", "cognition", "deliberation"], []),

    # 51 - 100
    ("cerulean", "adjective", "/sɪˈruː.li.ən/", "สีฟ้าครามสดใสแห่งท้องฟ้า", "deep blue in color like a clear sky", "Tropical islands feature radiant white sands and brilliant cerulean seas.", ["azure", "sky-blue"], []),
    ("chaff", "noun", "/tʃɑːf/", "แกลบ, สิ่งไร้ค่าที่ต้องคัดทิ้ง", "husks of corn or other seed separated by winnowing, worthless matter", "Thorough analysis separates valuable insight from sensationalist gossip chaff.", ["husks", "refuse", "dross"], []),
    ("chauvinism", "noun", "/ˈʃəʊ.vɪ.nɪ.zəm/", "ความคลั่งไคล้ในพวกพ้องตนอย่างหน้ามืดตามัว", "exaggerated or aggressive patriotism, biased devotion to any cause", "Extreme nationalistic chauvinism damages constructive global diplomacy.", ["jingoism", "fanaticism"], []),
    ("chirography", "noun", "/kaɪˈrɒɡ.rə.fi/", "ศาสตร์แห่งการคัดลายมือ, ลายมือเขียน", "handwriting, especially as distinct from typography", "The antique love letters exhibited elegant nineteenth-century chirography.", ["penmanship", "calligraphy"], []),
    ("chthonic", "adjective", "/ˈθɒn.ɪk/", "เกี่ยวกับยมโลกหรือใต้พิภพ", "concerning, belonging to, or inhabiting the underworld", "Ancient Greek mythology honored chthonic subterranean deities of earth.", ["subterranean", "underworld"], []),
    ("cicerone", "noun", "/ˌtʃɪtʃ.əˈrəʊ.ni/", "มัคคุเทศก์ผู้เชี่ยวชาญนำชมโบราณสถาน", "guide who gives information to tourists about antiquities", "An eloquent Italian cicerone explained the history of the Colosseum ruins.", ["guide", "docent"], []),
    ("circumnavigate", "verb", "/ˌsɜː.kəmˈnæv.ɪ.ɡeɪt/", "ล่องเรือวนรอบโลก", "to sail or travel all the way around something, especially world", "Magellan's expedition was the first to circumnavigate the global earth.", ["sail around", "orbit"], []),
    ("citadel", "noun", "/ˈsɪt.ə.dəl/", "ป้อมปราการบนที่สูง", "fortress, typically on high ground, protecting or dominating a city", "The stone citadel withstood multiple naval bombardments during the siege.", ["fortress", "fort", "stronghold"], []),
    ("claque", "noun", "/klæk/", "กลุ่มคนที่รับจ้างมาปรบมือเชียร์", "group of people hired to applaud a performer or public speaker", "The insecure politician surrounded himself with a vocal, hired claque.", ["hired applauders", "sycophants"], []),
    ("cleave", "verb", "/kliːv/", "ผ่าแยกออกเป็นสองส่วน, หรือยึดติดแนบแน่น", "to split or sever something, or adhere strongly to", "With one mighty blow, the woodcutter cleaved the oak log in two.", ["split", "sever", "adhere"], ["join"]),
    ("coeval", "adjective", "/kəʊˈiː.vəl/", "ที่มีอายุหรือกำเนิดในยุคเดียวกัน", "having the same age or date of origin, contemporary", "The two great philosophical treatises were coeval, published in the same year.", ["contemporary", "coexistent"], []),
    ("cogitation", "noun", "/ˌkɒdʒ.ɪˈteɪ.ʃən/", "การครุ่นคิดพิจารณาอย่างลึกซึ้ง", "action of thinking deeply about something, contemplation", "After several hours of silent cogitation, she formulated a brilliant strategy.", ["contemplation", "reflection", "rumination"], []),
    ("cognomen", "noun", "/kɒɡˈnəʊ.mən/", "ชื่อฉายา, นามสกุล", "surname or nickname", "The legendary Roman warrior earned the noble cognomen of 'The Shield'.", ["nickname", "epithet", "surname"], []),
    ("colloquy", "noun", "/ˈkɒl.ə.kwi/", "การสนทนาแลกเปลี่ยนความคิดอย่างเป็นทางการ", "conversation, especially of a formal nature", "Leading diplomats held an urgent colloquy behind closed doors.", ["dialogue", "conference", "discussion"], []),
    ("comity", "noun", "/ˈkɒm.ə.ti/", "มารยาทและไมตรีจิตระหว่างประเทศ", "courtesy and considerate behavior toward others, association of nations", "International law depends upon the respectful comity of sovereign states.", ["civility", "courtesy", "harmony"], ["hostility"]),
    ("compendious", "adjective", "/kəmˈpen.di.əs/", "รวบรัดแต่ครอบคลุมสาระสำคัญทั้งหมด", "containing or presenting the essential facts of a subject in concise form", "The professor wrote a compendious guide to constitutional jurisprudence.", ["concise", "succinct", "comprehensive"], []),
    ("concatenation", "noun", "/kənˌkæt.əˈneɪ.ʃən/", "การเชื่อมโยงร้อยเรียงเป็นลูกโซ่", "series of interconnected things or events", "An unfortunate concatenation of mechanical failures led to the power outage.", ["chain", "series", "sequence"], []),
    ("concupiscence", "noun", "/kənˈkjuː.pɪ.səns/", "ตัณหาราคะ, ความใคร่ทางกามารมณ์", "strong sexual desire, lust", "Ascetic monks practiced solitary meditation to conquer bodily concupiscence.", ["lust", "carnality", "passion"], []),
    ("condign", "adjective", "/kənˈdaɪn/", "สมน้ำสมเนื้อกับความผิด, สาสม", "appropriate to the crime or wrongdoing, fitting and deserved", "The corrupt traitor received condign punishment from the supreme military court.", ["deserved", "appropriate", "fitting"], ["unjust"]),
    ("confabulate", "verb", "/kənˈfæb.jə.leɪt/", "สนทนาปราศรัย, หรือสร้างเรื่องแต่งขึ้นมาในจิตวิทยา", "to engage in conversation, or fabricate imaginary experiences", "Old friends sat on the veranda to confabulate about their university days.", ["chat", "converse", "fabricate"], []),
    ("congeries", "noun", "/kənˈdʒɪər.iːz/", "กองสิ่งของเบ็ดเตล็ดที่นำมารวมกัน", "disorderly collection, jumble", "The thrift antique shop was a fascinating congeries of curiosities.", ["collection", "jumble", "heap"], []),
    ("connate", "adjective", "/ˈkɒn.eɪt/", "ที่มีมาแต่กำเนิด, เกี่ยวพันกันโดยเนื้อแท้", "innate, inborn, or existing naturally together", "A love of storytelling seems connate in human cultural evolution.", ["innate", "inborn", "inherent"], []),
    ("consanguineous", "adjective", "/ˌkɒn.sæŋˈɡwɪn.i.əs/", "ร่วมสายเลือดเดียวกัน", "relating to or denoting people descended from the same ancestor", "Medical geneticists study consanguineous unions to identify hereditary risks.", ["kin", "related by blood"], []),
    ("consecution", "noun", "/ˌkɒn.sɪˈkjuː.ʃən/", "ลำดับเหตุการณ์ที่ต่อเนื่องตามเหตุผล", "sequence or succession, logical continuation", "The mathematician explained the flawless consecution of deductive proofs.", ["sequence", "succession", "progression"], []),
    ("consignee", "noun", "/ˌkɒn.saɪˈniː/", "ผู้รับสินค้าปลายทาง", "person to whom shipment of goods is delivered", "The air cargo consignee must sign custom clearance documents upon delivery.", ["recipient", "receiver"], ["consignor"]),
    ("contumely", "noun", "/ˈkɒn.tjuːm.li/", "การดูหมิ่นเหยียดหยามอย่างไม่เกรงใจ", "insolent or insulting language or treatment", "The righteous whistle-blower endured bitter public contumely from executives.", ["insult", "abuse", "scorn"], ["praise", "respect"]),
    ("copula", "noun", "/ˈkɒp.jə.lə/", "กริยาเชื่อมโยง (เช่น is, become)", "connecting word, in linguistics particularly linking verb", "In the sentence 'She is intelligent', the verb 'is' serves as a copula.", ["linking verb", "connector"], []),
    ("cornucopia", "noun", "/ˌkɔː.njəˈkəʊ.pi.ə/", "เขาสัตว์แห่งความอุดมสมบูรณ์, ขุมทรัพย์หลากชนิด", "symbol of plenty consisting of a goat's horn overflowing with fruits", "The lavish Thanksgiving banquet was an abundant cornucopia of tasty delights.", ["abundance", "profusion", "bounty"], []),
    ("coruscate", "verb", "/ˈkɒr.ə.skeɪt/", "ส่องแสงระยิบระยับ, เปล่งประกายทางปัญญา", "to flash or sparkle, or be brilliant in intellect", "Her cut diamond necklace coruscated beneath the grand ballroom chandeliers.", ["sparkle", "glisten", "flash"], []),
    ("countervail", "verb", "/ˌkaʊn.təˈveɪl/", "หักล้าง, ถ่วงดุลอำนาจ", "to act against something with equal power, counteract", "Courageous judicial review must countervail unchecked legislative overreach.", ["counteract", "neutralize", "offset"], []),
    ("cravenly", "adverb", "/ˈkreɪ.vən.li/", "อย่างขลาดกลัวไร้ศักดิ์ศรี", "in a cowardly or contemptible manner", "The traitor cravenly fled into the night when enemy sirens sounded.", ["cowardly", "timidly", "faint-heartedly"], ["bravely", "boldly"]),
    ("credulity", "noun", "/krɪˈdʒuː.lə.ti/", "ความหูเบา, ความพร้อมจะเชื่อทุกเรื่อง", "tendency to be too ready to believe that something is real or true", "Charlatans prey upon the innocent credulity of desperate consumers.", ["gullibility", "naivety"], ["skepticism", "wariness"]),
    ("crepuscular", "adjective", "/krɪˈpʌs.kjə.lər/", "หากินเวลาโพล้เพล้, สลัวราง", "resembling or relating to twilight, active at twilight", "Bats and owls are crepuscular creatures that emerge as dusk falls.", ["twilight", "dim", "dusky"], []),
    ("crux", "noun", "/krʌks/", "ปมประเด็นสำคัญที่สุด", "decisive or most important point at issue", "The crux of the geopolitical debate revolves around renewable water rights.", ["essence", "core", "heart"], []),
    ("cupidity", "noun", "/kjuːˈpɪd.ə.ti/", "ความโลภในทรัพย์สินเงินทอง", "greed for money or possessions", "Unchecked corporate cupidity led directly to the subprime mortgage crisis.", ["greed", "avarice", "rapacity"], ["generosity"]),
    ("dais", "noun", "/ˈdeɪ.ɪs/", "แท่นยกพื้นสำหรับบุคคลสำคัญ", "low platform for a lectern, seats of honor, or throne", "The award winners stepped up onto the decorated wooden dais to accept trophies.", ["platform", "podium", "stage"], []),
    ("dank", "adjective", "/dæŋk/", "ชื้นแฉะและเย็นยะเยือก", "disagreeably damp, musty, and typically cold", "They descended stone steps into the dark, dank underground cellar.", ["damp", "musty", "clammy"], ["dry", "warm"]),
    ("dappled", "adjective", "/ˈdæp.əld/", "ที่มีรอยด่างดวงแต้มแสง", "marked with spots or rounded patches of light and shadow", "Sunlight filtered through autumn leaves to create a dappled forest pathway.", ["spotted", "speckled", "flecked"], []),
    ("debark", "verb", "/dɪˈbɑːk/", "ขึ้นจากเรือหรือเครื่องบิน", "to leave a ship or aircraft, disembark", "Passengers were instructed to debark through the forward gangway doors.", ["disembark", "land"], ["board", "embark"]),
    ("deceleration", "noun", "/diːˌsel.əˈreɪ.ʃən/", "การชะลอความเร็ว", "reduction in speed or rate", "Rapid vehicle deceleration triggered the automated anti-lock brake system.", ["slowing down", "retardation"], ["acceleration"]),
    ("deciduous", "adjective", "/dɪˈsɪdʒ.u.əs/", "ผลัดใบประจำฤดูกาล", "shedding its leaves annually, of a tree or shrub", "Deciduous maple trees lose their leaves every autumn before freezing winter.", ["leaf-shedding"], ["evergreen"]),
    ("decimate", "verb", "/ˈdes.ɪ.meɪt/", "ทำลายล้างเสียหายอย่างหนัก", "to kill, destroy, or remove a large proportion of", "The virulent blight decimated grape crops across the wine region.", ["destroy", "devastate", "annihilate"], []),
    ("decomposition", "noun", "/ˌdiː.kɒm.pəˈzɪʃ.ən/", "การย่อยสลายเน่าเปื่อย", "state or process of rotting, decay", "Fungi and earthworms accelerate organic decomposition in forest soil.", ["decay", "putrefaction"], []),
    ("defalcate", "verb", "/ˈdiː.fæl.keɪt/", "ยักยอกเงินที่ตนดูแล", "to embezzle money", "The fraudulent chief accountant defalcated millions from the pension fund.", ["embezzle", "misappropriate", "steal"], []),
    ("defamation", "noun", "/ˌdef.əˈmeɪ.ʃən/", "การหมิ่นประมาททำให้เสื่อมชื่อเสียง", "action of damaging the good reputation of someone, slander or libel", "The celebrity won a multi-million dollar lawsuit for media defamation.", ["libel", "slander", "calumny"], ["praise"]),
    ("defoliate", "verb", "/diːˈfəʊ.li.eɪt/", "ทำให้ใบไม้ร่วงหล่นจนหมด", "to remove leaves from trees or plants, typically by chemical means", "Wartime herbicides were sprayed to defoliate dense jungle canopies.", ["strip leaves"], []),
    ("defray", "verb", "/dɪˈfreɪ/", "ออกค่าใช้จ่ายแทน, ชดใช้ค่าธรรมเนียม", "to provide money to pay a cost or expense", "A generous research grant helped defray his overseas conference expenses.", ["pay for", "cover", "finance"], []),
    ("deft", "adjective", "/deft/", "คล่องแคล่วชำนาญ, ว่องไว", "neatly skillful and quick in one's movements", "The surgeon's deft fingers stitched the delicate cardiovascular incision.", ["skillful", "nimble", "dexterous"], ["clumsy", "awkward"]),
    ("deign", "verb", "/deɪn/", "ยอมลดตัวลงมาทำ", "to do something that one considers to be beneath one's dignity", "The haughty duchess did not deign to reply to the commoner's polite greeting.", ["condescend", "stoop", "lower oneself"], []),
    ("delectable", "adjective", "/dɪˈlek.tə.bəl/", "เอร็ดอร่อยโอชะ, น่าอภิรมย์", "delicious, extremely pleasant to taste or smell", "The bakery served warm, delectable croissants filled with Belgian dark chocolate.", ["delicious", "mouthwatering", "scrumptious"], ["revolting", "distasteful"])
]

# Read build_c1.py and verify structure
def build_c1():
    print(f"Total raw C1 words defined: {len(C1_RAW)}")
    assert len(C1_RAW) == 300, f"Expected 300 C1 words, got {len(C1_RAW)}"
    
    words_data = []
    seen = set()
    for idx, item in enumerate(C1_RAW, start=1):
        word, pos, phonetic, meaning_th, meaning_en, example, synonyms, antonyms = item
        w_lower = word.lower().strip()
        if w_lower in seen:
            raise ValueError(f"Duplicate word in C1: {w_lower}")
        seen.add(w_lower)
        
        words_data.append({
            "id": f"v_c1_{idx:03d}",
            "word": w_lower,
            "part_of_speech": pos,
            "cefr_level": "C1",
            "phonetic": phonetic,
            "meaning_th": meaning_th,
            "meaning_en": meaning_en,
            "example_sentence": example,
            "synonyms": json.dumps(synonyms, ensure_ascii=False),
            "antonyms": json.dumps(antonyms, ensure_ascii=False),
            "frequency_tier": 1
        })
    
    with open("c:/MaMan/database/cefr_dataset/c1_words.json", "w", encoding="utf-8") as f:
        json.dump(words_data, f, ensure_ascii=False, indent=2)
    print(f"Successfully generated 300 C1 words to c1_words.json!")
    return words_data

if __name__ == "__main__":
    build_c1()
