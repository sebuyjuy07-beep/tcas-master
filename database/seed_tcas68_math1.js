const db = require('./db');

console.log('📐 Seeding Official TCAS68 A-Level Applied Mathematics 1 (ข้อสอบจริง 9 มีนาคม 2568)...');

const tcas68Math1Questions = [
    // -------------------------------------------------------------
    // ข้อ 1 - 25: ปรนัย 5 ตัวเลือก (ข้อละ 3 คะแนน)
    // -------------------------------------------------------------
    {
        id: 'q_alevel_math68_01',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'สำหรับเซต $S$ ใด ๆ ให้ $P(S)$ แทนเพาเวอร์เซตของ $S$\n\nให้เซต $A = \\{\\emptyset, \\sqrt{2}\\}$ แล้วเซต $P(P(A)) \\cup P(A)$ มีสมาชิกกี่ตัว',
        difficulty: 'medium',
        explanation: '1. พิจารณาจำนวนสมาชิกของเซต $A$:\n   $A = \\{\\emptyset, \\sqrt{2}\\} \\implies n(A) = 2$\n\n2. หาจำนวนสมาชิกของเพาเวอร์เซต $P(A)$:\n   $$n(P(A)) = 2^{n(A)} = 2^2 = 4$$\n   โดยที่ $P(A) = \\{\\emptyset, \\{\\emptyset\\}, \\{\\sqrt{2}\\}, A\\}$\n\n3. หาจำนวนสมาชิกของ $P(P(A))$:\n   $$n(P(P(A))) = 2^{n(P(A))} = 2^4 = 16$$\n\n4. หาจำนวนสมาชิกที่ซ้ำกัน $n(P(P(A)) \\cap P(A))$:\n   เซต $X \\in P(P(A)) \\cap P(A) \\iff X \\subseteq P(A)$ และ $X \\in P(A)$ (นั่นคือ $X \\subseteq A$)\n   ดังนั้น สมาชิกใน $X$ ต้องเป็นทั้งสมาชิกของ $A$ และ $P(A)$ ซึ่ง $A \\cap P(A) = \\{\\emptyset\\}$ (มีเพียง 1 ตัว)\n   ซับเซตของ $\\{\\emptyset\\}$ จึงมี $2^1 = 2$ เซต คือ $\\emptyset$ และ $\\{\\emptyset\\}$\n   ดังนั้น $n(P(P(A)) \\cap P(A)) = 2$\n\n5. คำนวณตามสูตรยูเนียน:\n   $$n(P(P(A)) \\cup P(A)) = 16 + 4 - 2 = 18 \\text{ ตัว}$$',
        trap_analysis: 'จุดลวง: หลายคนคิดว่า $P(P(A))$ และ $P(A)$ ไม่มีสมาชิกร่วมกันเลย จึงตอบ $16 + 4 = 20$ ตัว หรือลืมว่าเซตว่าง $\\emptyset$ เป็นสมาชิกของเพาเวอร์เซตทุกเซต',
        options: [
            { label: '1', content: '10', is_correct: 0 },
            { label: '2', content: '16', is_correct: 0 },
            { label: '3', content: '18', is_correct: 1 },
            { label: '4', content: '19', is_correct: 0 },
            { label: '5', content: '20', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_02',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'ให้ $p, q$ และ $r$ เป็นประพจน์ แล้วประพจน์ใดต่อไปนี้มีค่าความจริงเป็นจริงในบางกรณี และเป็นเท็จในบางกรณี',
        difficulty: 'medium',
        explanation: 'ประพจน์ที่เป็นจริงบางกรณีและเท็จบางกรณี คือประพจน์ที่ไม่เป็นสัจนิรันดร์ (Tautology) และไม่เป็นข้อขัดแย้ง (Contradiction):\n\n1. $(p \\lor \\sim p) \\to (r \\land \\sim r) \\equiv T \\to F \\equiv F$ (เท็จเสมอ)\n2. $(\\sim p \\land q) \\land (p \\land r) \\equiv (\\sim p \\land p) \\land (q \\land r) \\equiv F \\land (q \\land r) \\equiv F$ (เท็จเสมอ)\n3. $(q \\to r) \\leftrightarrow (q \\land \\sim r)$ เนื่องจาก $q \\land \\sim r \\equiv \\sim(q \\to r)$ ดังนั้นจะได้รูป $A \\leftrightarrow \\sim A \\equiv F$ (เท็จเสมอ)\n4. $(p \\lor r) \\land (q \\lor \\sim r)$:\n   - ถ้า $p = T, q = T$ จะได้ $(T \\lor r) \\land (T \\lor \\sim r) \\equiv T \\land T \\equiv T$\n   - ถ้า $p = F, q = F$ จะได้ $(F \\lor r) \\land (F \\lor \\sim r) \\equiv r \\land \\sim r \\equiv F$\n   จึงเป็นจริงในบางกรณีและเป็นเท็จในบางกรณี ถูกต้องตามเงื่อนไข\n5. $(p \\land q) \\land (\\sim p \\lor \\sim q) \\equiv (p \\land q) \\land \\sim(p \\land q) \\equiv F$ (เท็จเสมอ)',
        trap_analysis: 'ตัวเลือก 3 เป็นรูปแบบที่พบบ่อยในข้อสอบ ทปอ. นักเรียนมักเข้าใจผิดว่าสมมูลกัน แต่จริง ๆ แล้วเป็นนิเสธซึ่งกันและกัน ($A \\leftrightarrow \\sim A$ ให้ค่าเท็จทุกกรณี)',
        options: [
            { label: '1', content: '$(p \\lor \\sim p) \\to (r \\land \\sim r)$', is_correct: 0 },
            { label: '2', content: '$(\\sim p \\land q) \\land (p \\land r)$', is_correct: 0 },
            { label: '3', content: '$(q \\to r) \\leftrightarrow (q \\land \\sim r)$', is_correct: 0 },
            { label: '4', content: '$(p \\lor r) \\land (q \\lor \\sim r)$', is_correct: 1 },
            { label: '5', content: '$(p \\land q) \\land (\\sim p \\lor \\sim q)$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_03',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'กำหนดให้ $p(x)$ และ $q(x)$ เป็นพหุนามดีกรี 3 ที่ทำให้ $p(-1) = 1$ และ $q(-1) = -1$\n\nแล้วพหุนามในข้อใดต่อไปนี้ หารด้วย $x + 1$ ลงตัว',
        difficulty: 'easy',
        explanation: 'จากทฤษฎีบทเศษเหลือ (Remainder Theorem) พหุนาม $R(x)$ หารด้วย $x + 1$ ลงตัว ก็ต่อเมื่อ $R(-1) = 0$\n\nแทนค่า $x = -1$ ลงในแต่ละตัวเลือก:\n1. $(-1)p(-1) + q(-1) = (-1)(1) + (-1) = -2 \\neq 0$\n2. $p(-1) + (-1)q(-1) = 1 + (-1)(-1) = 2 \\neq 0$\n3. $p(-1)q(-1) + (-1) = (1)(-1) - 1 = -2 \\neq 0$\n4. $p(-1)q(-1) + (-1)^2 = (1)(-1) + 1 = 0$ (หารลงตัวพอดี)\n5. $p(-1) + q(-1) + (-1) = 1 + (-1) - 1 = -1 \\neq 0$',
        trap_analysis: 'ระวังแทนค่า $x = 1$ แทนที่จะเป็น $x = -1$ จากตัวหาร $x - c = x - (-1)$',
        options: [
            { label: '1', content: '$x p(x) + q(x)$', is_correct: 0 },
            { label: '2', content: '$p(x) + x q(x)$', is_correct: 0 },
            { label: '3', content: '$p(x) q(x) + x$', is_correct: 0 },
            { label: '4', content: '$p(x) q(x) + x^2$', is_correct: 1 },
            { label: '5', content: '$p(x) + q(x) + x$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_04',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'สำนักข่าวออนไลน์แห่งหนึ่งมีบริการสำหรับสมาชิกรายเดือน โดยปัจจุบันค่าบริการรายเดือนอยู่ที่ 70 บาทต่อคน และมีสมาชิกอยู่ 18,000 คน นอกจากนี้ จากการสำรวจกลุ่มผู้ใช้บริการ พบว่าการปรับราคาค่าบริการจะมีผลต่อจำนวนสมาชิกในรูปแบบฟังก์ชันเชิงเส้น โดยการขึ้นค่าบริการทุก ๆ 1 บาทต่อคน จะทำให้จำนวนสมาชิกลดลง 200 คน (ตัวอย่างเช่น ถ้าขึ้นค่าบริการ 5 บาทต่อคน เป็น 75 บาทต่อคน จะทำให้จำนวนสมาชิกลดลง 1,000 คน เหลือเพียง 17,000 คน)\n\nให้ $f$ แทนฟังก์ชันรายได้ต่อเดือนของสำนักข่าวเมื่อเก็บค่าบริการ $x$ บาทต่อคน จะได้ว่ากราฟของฟังก์ชัน $f$ มีลักษณะอย่างไร',
        difficulty: 'medium',
        explanation: '1. เมื่อเก็บค่าบริการ $x$ บาทต่อคน ส่วนต่างของราคาที่เพิ่มขึ้นคือ $x - 70$ บาท\n2. จำนวนสมาชิก $N(x) = 18,000 - 200(x - 70) = 18,000 - 200x + 14,000 = 32,000 - 200x$\n3. ฟังก์ชันรายได้ $f(x) = (\\text{ค่าบริการต่อคน}) \\times (\\text{จำนวนสมาชิก})$:\n   $$f(x) = x(32,000 - 200x) = -200x^2 + 32,000x$$\n4. กราฟมีสัมประสิทธิ์ของ $x^2$ เป็นลบ ($-200$) จึงเป็น **พาราโบลาคว่ำ**\n5. หาจุดยอด $x$:\n   $$x = -\\frac{b}{2a} = -\\frac{32,000}{2(-200)} = \\frac{32,000}{400} = 80$$\nดังนั้น กราฟของฟังก์ชัน $f$ เป็นรูปพาราโบลาคว่ำที่มีจุดยอดที่ $x = 80$',
        trap_analysis: 'อย่าสับสนระหว่างราคาเดิม 70 บาท กับจุดยอดสูงสุด 80 บาท และอย่าลืมว่าฟังก์ชันรายได้คือ $x \\cdot N(x)$ ซึ่งเป็นสมการกำลังสอง ไม่ใช่เส้นตรง',
        options: [
            { label: '1', content: 'เป็นรูปพาราโบลาหงายที่มีจุดยอดที่ $x = 0$', is_correct: 0 },
            { label: '2', content: 'เป็นรูปพาราโบลาหงายที่มีจุดยอดที่ $x = 70$', is_correct: 0 },
            { label: '3', content: 'เป็นรูปพาราโบลาคว่ำที่มีจุดยอดที่ $x = 75$', is_correct: 0 },
            { label: '4', content: 'เป็นรูปพาราโบลาคว่ำที่มีจุดยอดที่ $x = 80$', is_correct: 1 },
            { label: '5', content: 'เป็นกราฟเส้นตรงที่มีค่าความชันเป็นบวก', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_05',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'กำหนดให้ $x$ เป็นจำนวนจริงบวกที่สอดคล้องกับสมการ $e^{x^e} = e^e$\n\nค่าของ $\\ln(\\ln x)$ ตรงกับข้อใดต่อไปนี้',
        difficulty: 'medium',
        explanation: '1. จาก $e^{x^e} = e^e$ เนื่องจากฐานเท่ากันจะได้:\n   $$x^e = e$$\n2. ยกกำลัง $\\frac{1}{e}$ ทั้งสองข้าง:\n   $$x = e^{1/e}$$\n3. หาค่า $\\ln x$:\n   $$\\ln x = \\ln\\left(e^{1/e}\\right) = \\frac{1}{e} = e^{-1}$$\n4. หาค่า $\\ln(\\ln x)$:\n   $$\\ln(\\ln x) = \\ln\\left(e^{-1}\\right) = -1$$\nดังนั้น ค่าของ $\\ln(\\ln x)$ เท่ากับ $-1$',
        trap_analysis: 'ระวังสับสนระหว่าง $(e^x)^e = e^{ex}$ กับ $e^{(x^e)}$ ซึ่งเป็นเลขชี้กำลังซ้อน',
        options: [
            { label: '1', content: '$0$', is_correct: 0 },
            { label: '2', content: '$1$', is_correct: 0 },
            { label: '3', content: '$-1$', is_correct: 1 },
            { label: '4', content: '$e$', is_correct: 0 },
            { label: '5', content: '$-e$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_06',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'ให้ $f$ และ $g$ เป็นฟังก์ชันที่นิยามโดย $f(x) = \\sqrt{2 - x}$ และ $g(x) = \\log_3(5 - x)$\n\nจะได้ว่าโดเมนของฟังก์ชัน $f \\circ g$ ตรงกับข้อใดต่อไปนี้',
        difficulty: 'medium',
        explanation: 'โดเมนของ $f \\circ g$ คือ $D_{f \\circ g} = \\{x \\in D_g \\mid g(x) \\in D_f\\}$:\n\n1. หาโดเมนของ $g$ (หลัง $\\log$ ต้องมากกว่า 0):\n   $$5 - x > 0 \\implies x < 5 \\implies D_g = (-\\infty, 5)$$\n\n2. หาเงื่อนไข $g(x) \\in D_f$ (ในสแควร์รูทต้อง $\\ge 0$):\n   $$2 - g(x) \\ge 0 \\implies g(x) \\le 2$$\n   $$\\log_3(5 - x) \\le 2$$\n   เนื่องจากฐาน 3 มากกว่า 1 (ฟังก์ชันเพิ่ม) เครื่องหมายไม่เปลี่ยน:\n   $$5 - x \\le 3^2 = 9 \\implies -x \\le 4 \\implies x \\ge -4$$\n\n3. อินเตอร์เซกทั้งสองเงื่อนไข:\n   $$x \\ge -4 \\text{ และ } x < 5 \\implies x \\in [-4, 5)$$',
        trap_analysis: 'หากลืมเงื่อนไข $5 - x > 0$ ของโดเมนฟังก์ชันลอการิทึม จะทำให้ผิดไปตอบ $[-4, \\infty)$',
        options: [
            { label: '1', content: '$(-\\infty, 5)$', is_correct: 0 },
            { label: '2', content: '$(-\\infty, 2]$', is_correct: 0 },
            { label: '3', content: '$(-3, 2]$', is_correct: 0 },
            { label: '4', content: '$[-4, 5)$', is_correct: 1 },
            { label: '5', content: '$[-4, \\infty)$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_07',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_geo',
        stimulus: null,
        question_text: 'ค่าของ $\\cot\\left(\\frac{\\pi}{12}\\right) - \\tan\\left(\\frac{\\pi}{12}\\right)$ ตรงกับข้อใดต่อไปนี้',
        difficulty: 'medium',
        explanation: 'ใช้เอกลักษณ์ตรีโกณมิติ:\n$$\\cot \\theta - \\tan \\theta = \\frac{\\cos \\theta}{\\sin \\theta} - \\frac{\\sin \\theta}{\\cos \\theta} = \\frac{\\cos^2 \\theta - \\sin^2 \\theta}{\\sin \\theta \\cos \\theta}$$\nจากสูตรมุมสองเท่า: $\\cos^2 \\theta - \\sin^2 \\theta = \\cos 2\\theta$ และ $\\sin \\theta \\cos \\theta = \\frac{1}{2}\\sin 2\\theta$:\n$$\\cot \\theta - \\tan \\theta = \\frac{\\cos 2\\theta}{\\frac{1}{2}\\sin 2\\theta} = 2\\cot 2\\theta$$\nแทนค่า $\\theta = \\frac{\\pi}{12}$ ($15^\\circ$):\n$$2\\cot\\left(2 \\times \\frac{\\pi}{12}\\right) = 2\\cot\\left(\\frac{\\pi}{6}\\right) = 2(\\sqrt{3}) = 2\\sqrt{3}$$',
        trap_analysis: 'หากคำนวณ $\\tan 15^\\circ = 2 - \\sqrt{3}$ และ $\\cot 15^\\circ = 2 + \\sqrt{3}$ แล้วลบกัน $(2 + \\sqrt{3}) - (2 - \\sqrt{3}) = 2\\sqrt{3}$ ก็จะได้ค่าเท่ากัน แต่ต้องระวังเครื่องหมายลบหน้าวงเล็บ',
        options: [
            { label: '1', content: '$\\sqrt{3}$', is_correct: 0 },
            { label: '2', content: '$2\\sqrt{3}$', is_correct: 1 },
            { label: '3', content: '$4\\sqrt{3}$', is_correct: 0 },
            { label: '4', content: '$\\frac{9}{2}$', is_correct: 0 },
            { label: '5', content: '$\\frac{15}{2}$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_08',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'กำหนดให้เมทริกซ์แต่งเติมของระบบสมการเชิงเส้นระบบหนึ่งคือ\n$$\\left[\\begin{array}{ccc|c} 1 & -2 & 2 & 5 \\\\ -2 & 3 & -1 & -4 \\\\ 1 & -2 & 1 & 4 \\end{array}\\right]$$\nเมื่อใช้การดำเนินการตามแถวแปลงเมทริกซ์แต่งเติมนี้ได้เป็น\n$$\\left[\\begin{array}{ccc|c} 1 & -2 & 2 & a \\\\ 0 & -1 & 3 & b \\\\ 0 & 0 & -1 & c \\end{array}\\right]$$\nจะได้ว่า $a + b + c$ มีค่าเท่ากับข้อใดต่อไปนี้',
        difficulty: 'medium',
        explanation: 'วิเคราะห์การดำเนินการตามแถวทีละขั้น:\n1. แถว 1 ไม่เปลี่ยนแปลง: $a = 5$\n2. กำจัดสมาชิกหลักที่ 1 ของแถว 2 ด้วย $R_2\' = R_2 + 2R_1$:\n   $$R_2\' = [-2 + 2(1), \\ 3 + 2(-2), \\ -1 + 2(2) \\mid -4 + 2(5)] = [0, -1, 3 \\mid 6]$$\n   ดังนั้น $b = 6$\n3. กำจัดสมาชิกหลักที่ 1 และ 2 ของแถว 3 ด้วย $R_3\' = R_3 - R_1$:\n   $$R_3\' = [1 - 1, \\ -2 - (-2), \\ 1 - 2 \\mid 4 - 5] = [0, 0, -1 \\mid -1]$$\n   ดังนั้น $c = -1$\n4. คำนวณผลรวม:\n   $$a + b + c = 5 + 6 + (-1) = 10$$',
        trap_analysis: 'ระวังเครื่องหมายลบในแถว $R_3 - R_1$: $4 - 5 = -1$ ไม่ใช่ $1$',
        options: [
            { label: '1', content: '$-10$', is_correct: 0 },
            { label: '2', content: '$-5$', is_correct: 0 },
            { label: '3', content: '$0$', is_correct: 0 },
            { label: '4', content: '$5$', is_correct: 0 },
            { label: '5', content: '$10$', is_correct: 1 }
        ]
    },
    {
        id: 'q_alevel_math68_09',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'กำหนดให้ $A = \\begin{bmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{bmatrix}$, $B = \\begin{bmatrix} b_1 & b_2 & b_3 \\\\ a_1 & a_2 & a_3 \\\\ 2c_1 & 2c_2 & 2c_3 \\end{bmatrix}$ และ $C = \\begin{bmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ a_1 - 3c_1 & a_2 - 3c_2 & a_3 - 3c_3 \\end{bmatrix}$\n\nพิจารณาข้อความต่อไปนี้:\nก. $\\det(B) = 2\\det(A)$\nข. $\\det(C) = \\det(A)$\nค. $\\det(B + C) = 0$\n\nข้อใดกล่าวถูกต้องเสมอ',
        difficulty: 'hard',
        explanation: 'พิจารณาสมบัติของดีเทอร์มิแนนต์:\n- ข้อความ ก: เมทริกซ์ $B$ เกิดจากการสลับแถวที่ 1 และ 2 (det คูณด้วย $-1$) และดึงตัวร่วม 2 ออกจากแถวที่ 3 (det คูณด้วย 2)\n  ดังนั้น $\\det(B) = (-1)(2)\\det(A) = -2\\det(A)$ $\\implies$ ข้อ ก ผิด\n- ข้อความ ข: เมทริกซ์ $C$ แถวที่ 3 เกิดจาก $R_3\' = R_1 - 3R_3$ การกระจาย det ตามแถวที่ 3:\n  $\\det(C) = \\det \\begin{bmatrix} R_1 \\\\ R_2 \\\\ R_1 \\end{bmatrix} - 3\\det \\begin{bmatrix} R_1 \\\\ R_2 \\\\ R_3 \\end{bmatrix} = 0 - 3\\det(A) = -3\\det(A) \\neq \\det(A)$ $\\implies$ ข้อ ข ผิด\n- ข้อความ ค: เมื่อหา $B + C$:\n  $$B + C = \\begin{bmatrix} a_1 + b_1 & a_2 + b_2 & a_3 + b_3 \\\\ a_1 + b_1 & a_2 + b_2 & a_3 + b_3 \\\\ a_1 - c_1 & a_2 - c_2 & a_3 - c_3 \\end{bmatrix}$$\n  สังเกตว่า **แถวที่ 1 และ แถวที่ 2 ของ $B + C$ มีสมาชิกเหมือนกันทุกตัว!**\n  จากสมบัติของดีเทอร์มิแนนต์ หากมีสองแถวที่เหมือนกัน ค่าดีเทอร์มิแนนต์จะเป็น 0 เสมอ\n  ดังนั้น $\\det(B + C) = 0$ เสมอ $\\implies$ **ข้อความ ค ถูกต้องเพียงข้อเดียวเท่านั้น**',
        trap_analysis: 'จุดลวง: สังเกตแถวที่ 1 ของ $B$ คือ $[b_1, b_2, b_3]$ และแถวที่ 1 ของ $C$ คือ $[a_1, a_2, a_3]$ เมื่อนำมาบวกกันจะได้ $[a_1+b_1, a_2+b_2, a_3+b_3]$ ซึ่งเท่ากับแถวที่ 2 พอดี ทำให้ไม่ต้องเสียเวลาคิดเลขลึก',
        options: [
            { label: '1', content: 'ข้อความ ข. ถูกต้องเพียงข้อเดียวเท่านั้น', is_correct: 0 },
            { label: '2', content: 'ข้อความ ค. ถูกต้องเพียงข้อเดียวเท่านั้น', is_correct: 1 },
            { label: '3', content: 'ข้อความ ก. และ ข. ถูกต้องเพียงสองข้อ', is_correct: 0 },
            { label: '4', content: 'ข้อความ ก. และ ค. ถูกต้องเพียงสองข้อ', is_correct: 0 },
            { label: '5', content: 'ข้อความทั้งสามถูกต้อง', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_10',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'ให้ $a_n$ เป็นลำดับที่สอดคล้องกับ $a_{n+1} = a_n + \\frac{n}{2}$ สำหรับทุกจำนวนนับ $n$\n\nถ้า $a_{30} = 219$ แล้ว $a_1$ มีค่าเท่ากับข้อใดต่อไปนี้',
        difficulty: 'medium',
        explanation: '1. จากความสัมพันธ์เวียนเกิด $a_{n+1} - a_n = \\frac{n}{2}$ หาผลต่างเทเลสโคปิก (Telescoping Sum):\n   $$a_{30} - a_1 = \\sum_{n=1}^{29} (a_{n+1} - a_n) = \\sum_{n=1}^{29} \\frac{n}{2}$$\n2. คำนวณผลบวกอนุกรมเลขคณิต:\n   $$\\sum_{n=1}^{29} \\frac{n}{2} = \\frac{1}{2} \\sum_{n=1}^{29} n = \\frac{1}{2} \\left( \\frac{29 \\times 30}{2} \\right) = \\frac{1}{2} (435) = \\frac{435}{2} = 217.5$$\n3. หาค่า $a_1$:\n   $$a_1 = a_{30} - 217.5 = 219 - 217.5 = 1.5 = \\frac{3}{2}$$',
        trap_analysis: 'ระวังจำนวนพจน์ในการบวก: ตั้งแต่ $n = 1$ ถึง $n = 29$ มี 29 พจน์ (ไม่ใช่ 30 พจน์)',
        options: [
            { label: '1', content: '$-29$', is_correct: 0 },
            { label: '2', content: '$-\\frac{27}{2}$', is_correct: 0 },
            { label: '3', content: '$\\frac{3}{2}$', is_correct: 1 },
            { label: '4', content: '$16$', is_correct: 0 },
            { label: '5', content: '$30$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_11',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'พิจารณาอสมการ $x^2 - 4x + 1 < 0$\n\nถ้า $a$ เป็นจำนวนเต็มที่น้อยที่สุดที่สอดคล้องกับอสมการดังกล่าว และ $b$ เป็นจำนวนเต็มที่มากที่สุดที่สอดคล้องกับอสมการดังกล่าว\n\nแล้วระยะห่างที่น้อยที่สุดระหว่างจำนวนเต็มบวกและจำนวนเต็มลบที่เป็นคำตอบของอสมการ $|x - a| \\ge b$ เท่ากับข้อใดต่อไปนี้',
        difficulty: 'medium',
        explanation: '1. แก้สมการ $x^2 - 4x + 1 = 0$:\n   $$x = \\frac{4 \\pm \\sqrt{16 - 4}}{2} = 2 \\pm \\sqrt{3}$$\n   ช่วงคำตอบของอสมการ $x^2 - 4x + 1 < 0$ คือ $(2 - \\sqrt{3}, 2 + \\sqrt{3})$\n   เนื่องจาก $\\sqrt{3} \\approx 1.732$ จะได้ช่วงคือ $(0.268, 3.732)$\n2. จำนวนเต็มในช่วงนี้คือ $1, 2, 3$:\n   - จำนวนเต็มที่น้อยที่สุด $a = 1$\n   - จำนวนเต็มที่มากที่สุด $b = 3$\n3. แก้สมการ $|x - a| \\ge b \\implies |x - 1| \\ge 3$:\n   - $x - 1 \\ge 3 \\implies x \\ge 4$\n   - $x - 1 \\le -3 \\implies x \\le -2$\n4. คำตอบที่เป็นจำนวนเต็ม:\n   - จำนวนเต็มบวกที่เป็นคำตอบคือ $\\{4, 5, 6, \\dots\\}$ (ตัวน้อยสุดคือ 4)\n   - จำนวนเต็มลบที่เป็นคำตอบคือ $\\{-2, -3, -4, \\dots\\}$ (ตัวมากสุดคือ -2)\n5. ระยะห่างที่น้อยที่สุดระหว่างจำนวนเต็มบวกและลบ:\n   $$\\text{ระยะห่าง} = 4 - (-2) = 6$$',
        trap_analysis: 'ระวังคิดระยะห่างระหว่างช่วงผิดเป็น $4 - (-3) = 7$ หรือคำนวณ $b - a$ ผิด',
        options: [
            { label: '1', content: '$6$', is_correct: 1 },
            { label: '2', content: '$8$', is_correct: 0 },
            { label: '3', content: '$10$', is_correct: 0 },
            { label: '4', content: '$12$', is_correct: 0 },
            { label: '5', content: '$14$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_12',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: 'ปิงฝากเงินครั้งแรก 1,000 บาทตอนต้นปีที่ 1 และฝากเพิ่มในบัญชีเดิมอีก 1,000 บาทตอนต้นปีที่ 2 ถ้าบัญชีนี้ได้รับดอกเบี้ยในอัตราร้อยละ 1 ต่อปี คิดดอกเบี้ยทบต้นทุกปี หากปิงต้องการให้เงินในบัญชีมีมากกว่า 4,020 บาท ปิงต้องคงเงินจำนวนนี้ไว้ในธนาคารอย่างน้อยกี่ปีนับตั้งแต่ที่เริ่มฝากเงินครั้งแรก\n\n(กำหนดให้ $\\log_{1.01} 2 \\approx 69.6$)',
        difficulty: 'hard',
        explanation: '1. ให้เวลาผ่านไป $n$ ปีนับจากต้นปีที่ 1 (สิ้นปีที่ $n$):\n   - เงินฝากก้อนที่ 1 (1,000 บาท) ฝากไว้ครบ $n$ ปี จะมีมูลค่า $1,000(1.01)^n$\n   - เงินฝากก้อนที่ 2 (1,000 บาท) ฝากไว้ครบ $n - 1$ ปี จะมีมูลค่า $1,000(1.01)^{n-1}$\n2. รวมมูลค่าเงินในบัญชี:\n   $$1,000(1.01)^n + 1,000(1.01)^{n-1} > 4,020$$\n   ดึงตัวร่วม $1,000(1.01)^{n-1}$:\n   $$1,000(1.01)^{n-1} (1.01 + 1) > 4,020$$\n   $$1,000(1.01)^{n-1} (2.01) > 4,020$$\n   $$2,010 (1.01)^{n-1} > 4,020$$\n   $$(1.01)^{n-1} > \\frac{4,020}{2,010} = 2$$\n3. เทค $\\log_{1.01}$:\n   $$n - 1 > \\log_{1.01} 2 \\approx 69.6$$\n   $$n > 70.6$$\nเนื่องจาก $n$ เป็นจำนวนเต็มปี ดังนั้น $n = 71$ ปี',
        trap_analysis: 'จุดลวง: เมื่อได้ $n - 1 > 69.6 \\implies n - 1 \\ge 70 \\implies n \\ge 71$ ปี ถ้าลืมบวก 1 จะตอบ 70 ปี ซึ่งผิด',
        options: [
            { label: '1', content: '68 ปี', is_correct: 0 },
            { label: '2', content: '69 ปี', is_correct: 0 },
            { label: '3', content: '70 ปี', is_correct: 0 },
            { label: '4', content: '71 ปี', is_correct: 1 },
            { label: '5', content: '72 ปี', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_13',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_geo',
        stimulus: null,
        question_text: 'ถ้า $ABC$ เป็นรูปสามเหลี่ยมที่มีพิกัดของ $A, B$ และ $C$ คือ $(7, 6), (1, 2)$ และ $(1, -2)$ ตามลำดับ แล้วส่วนสูงของรูปสามเหลี่ยม $ABC$ จากจุดยอด $B$ ไปยังฐาน $AC$ ยาวกี่หน่วย',
        difficulty: 'medium',
        explanation: 'ส่วนสูงจากจุด $B$ ไปยังฐาน $AC$ คือระยะทางจากจุด $B(1, 2)$ ไปยังเส้นตรงที่ผ่านจุด $A(7, 6)$ และ $C(1, -2)$:\n\n1. หาสมการเส้นตรง $AC$:\n   - ความชัน $m = \\frac{-2 - 6}{1 - 7} = \\frac{-8}{-6} = \\frac{4}{3}$\n   - สมการเส้นตรง: $y - 6 = \\frac{4}{3}(x - 7) \\implies 3y - 18 = 4x - 28 \\implies 4x - 3y - 10 = 0$\n\n2. ใช้สูตรระยะทางจากจุด $(x_1, y_1)$ ไปยังเส้นตรง $Ax + By + C = 0$:\n   $$d = \\frac{|Ax_1 + By_1 + C|}{\\sqrt{A^2 + B^2}}$$\n   แทนพิกัด $B(1, 2)$:\n   $$d = \\frac{|4(1) - 3(2) - 10|}{\\sqrt{4^2 + (-3)^2}} = \\frac{|4 - 6 - 10|}{\\sqrt{25}} = \\frac{|-12|}{5} = \\frac{12}{5} = 2.4\\text{ หน่วย}$$',
        trap_analysis: 'อาจคำนวณผ่านพื้นที่สามเหลี่ยม $\\frac{1}{2} \\times \\text{ฐาน} \\times \\text{สูง}$ ก็ได้ผลลัพธ์ $2.4$ เท่ากัน แต่ต้องระวังคิดเลขความยาวฐาน $AC = \\sqrt{6^2 + 8^2} = 10$',
        options: [
            { label: '1', content: '0.8', is_correct: 0 },
            { label: '2', content: '1.6', is_correct: 0 },
            { label: '3', content: '2.4', is_correct: 1 },
            { label: '4', content: '4', is_correct: 0 },
            { label: '5', content: '4.8', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_14',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_geo',
        stimulus: null,
        question_text: 'วงรีวงหนึ่ง มีจุด $P(0, 0)$ และ $Q(10, 0)$ เป็นจุดโฟกัส และมีจุด $R(15, 0)$ เป็นจุดที่อยู่บนวงรี ถ้าวงรีวงนี้ตัดแกน $Y$ ที่จุด $(0, a)$ และจุด $(0, b)$ โดยที่ $a > b$ แล้ว $a - b$ เท่ากับข้อใดต่อไปนี้',
        difficulty: 'hard',
        explanation: '1. จุดโฟกัส $P(0, 0)$ และ $Q(10, 0)$ อยู่บนแกน $X$ แสดงว่าเป็นวงรีแนวนอน:\n   - จุดกึ่งกลางระหว่างโฟกัสคือ จุดศูนย์กลาง $(h, k) = (5, 0)$\n   - ระยะโฟกัส $c = 5$\n2. จุด $R(15, 0)$ อยู่บนวงรี และอยู่บนแกนเอก ดังนั้น $R$ คือจุดยอด:\n   - ระยะครึ่งแกนเอก $a = 15 - 5 = 10$\n   - หา $b^2$: $b^2 = a^2 - c^2 = 10^2 - 5^2 = 100 - 25 = 75$\n3. หาสมการวงรี:\n   $$\\frac{(x - 5)^2}{100} + \\frac{y^2}{75} = 1$$\n4. หาจุดตัดแกน $Y$ (แทน $x = 0$):\n   $$\\frac{(0 - 5)^2}{100} + \\frac{y^2}{75} = 1 \\implies \\frac{25}{100} + \\frac{y^2}{75} = 1 \\implies \\frac{1}{4} + \\frac{y^2}{75} = 1$$\n   $$\\frac{y^2}{75} = \\frac{3}{4} \\implies y^2 = \\frac{225}{4} \\implies y = \\pm \\frac{15}{2}$$\n5. จุดตัดแกน $Y$ คือ $(0, \\frac{15}{2})$ และ $(0, -\\frac{15}{2})$:\n   $$a = \\frac{15}{2}, \\ b = -\\frac{15}{2} \\implies a - b = \\frac{15}{2} - \\left(-\\frac{15}{2}\\right) = 15$$',
        trap_analysis: 'ระวังอย่าจำสับสนตัวแปร $a$ ในโจทย์ (พิกัด $y$) กับ $a$ ของวงรี (ความยาวครึ่งแกนเอก)',
        options: [
            { label: '1', content: '10', is_correct: 0 },
            { label: '2', content: '15', is_correct: 1 },
            { label: '3', content: '$10\\sqrt{3}$', is_correct: 0 },
            { label: '4', content: '20', is_correct: 0 },
            { label: '5', content: '$20\\sqrt{3}$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_15',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_geo',
        stimulus: null,
        question_text: 'ให้ $\\vec{u}$ และ $\\vec{v}$ เป็นเวกเตอร์หนึ่งหน่วย และ $\\theta$ เป็นขนาดของมุมระหว่าง $\\vec{u}$ และ $\\vec{v}$\n\nถ้า $\\vec{u} - 2\\vec{v}$ ตั้งฉากกับ $4\\vec{u} + \\vec{v}$ แล้ว $\\sec\\theta$ มีค่าเท่าใด',
        difficulty: 'medium',
        explanation: '1. เนื่องจากเวกเตอร์ตั้งฉากกัน ผลคูณเชิงสเกลาร์ (Dot Product) ต้องเท่ากับ 0:\n   $$(\\vec{u} - 2\\vec{v}) \\cdot (4\\vec{u} + \\vec{v}) = 0$$\n2. กระจายผลคูณ:\n   $$4|\\vec{u}|^2 + \\vec{u} \\cdot \\vec{v} - 8\\vec{u} \\cdot \\vec{v} - 2|\\vec{v}|^2 = 0$$\n   $$4|\\vec{u}|^2 - 7(\\vec{u} \\cdot \\vec{v}) - 2|\\vec{v}|^2 = 0$$\n3. เนื่องจาก $\\vec{u}$ และ $\\vec{v}$ เป็นเวกเตอร์หนึ่งหน่วย ($|\\vec{u}| = 1, |\\vec{v}| = 1$):\n   $$4(1)^2 - 7(\\cos\\theta) - 2(1)^2 = 0$$\n   $$2 - 7\\cos\\theta = 0 \\implies \\cos\\theta = \\frac{2}{7}$$\n4. หาค่า $\\sec\\theta$:\n   $$\\sec\\theta = \\frac{1}{\\cos\\theta} = \\frac{7}{2}$$',
        trap_analysis: 'ลืมกลับเศษเป็นส่วน: หา $\\cos\\theta = 2/7$ ได้แล้วตอบ $2/7$ ทันทีโดยลืมว่าโจทย์ถาม $\\sec\\theta$',
        options: [
            { label: '1', content: '$\\frac{7}{2}$', is_correct: 1 },
            { label: '2', content: '$\\frac{2}{7}$', is_correct: 0 },
            { label: '3', content: '$\\frac{\\sqrt{85}}{2}$', is_correct: 0 },
            { label: '4', content: '$\\frac{2}{\\sqrt{85}}$', is_correct: 0 },
            { label: '5', content: 'หาค่าไม่ได้', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_16',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_geo',
        stimulus: null,
        question_text: 'ให้ $O$ เป็นจุดกำเนิดในระบบพิกัดฉากสามมิติ และให้ $A$ และ $B$ เป็นจุดที่มีพิกัดเป็น $(-3, 1, 0)$ และ $(t, -4, 4)$ ตามลำดับ โดยที่ $t$ เป็นจำนวนจริงบวก\n\nถ้า $|\\vec{AB}| = 3|\\vec{OA}|$ แล้วรูปสามเหลี่ยม $OAB$ มีพื้นที่กี่ตารางหน่วย',
        difficulty: 'hard',
        explanation: '1. หาเวกเตอร์และขนาดของ $\\vec{OA}$:\n   $$\\vec{OA} = \\begin{bmatrix} -3 \\\\ 1 \\\\ 0 \\end{bmatrix} \\implies |\\vec{OA}| = \\sqrt{(-3)^2 + 1^2 + 0^2} = \\sqrt{10}$$\n2. หาเวกเตอร์ $\\vec{AB} = B - A = \\begin{bmatrix} t - (-3) \\\\ -4 - 1 \\\\ 4 - 0 \\end{bmatrix} = \\begin{bmatrix} t + 3 \\\\ -5 \\\\ 4 \\end{bmatrix}$:\n   $$|\\vec{AB}|^2 = (t + 3)^2 + (-5)^2 + 4^2 = (t + 3)^2 + 41$$\n3. จากโจทย์ $|\\vec{AB}| = 3|\\vec{OA}| = 3\\sqrt{10}$:\n   $$(t + 3)^2 + 41 = (3\\sqrt{10})^2 = 90$$\n   $$(t + 3)^2 = 49 \\implies t + 3 = 7 \\implies t = 4 \\quad (t > 0)$$\n   ดังนั้น $B(4, -4, 4)$ และ $\\vec{OB} = \\begin{bmatrix} 4 \\\\ -4 \\\\ 4 \\end{bmatrix}$\n4. พื้นที่ $\\triangle OAB = \\frac{1}{2}|\\vec{OA} \\times \\vec{OB}|$:\n   $$\\vec{OA} \\times \\vec{OB} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ -3 & 1 & 0 \\\\ 4 & -4 & 4 \\end{vmatrix} = 4\\vec{i} - (-12)\\vec{j} + (12 - 4)\\vec{k} = 4\\vec{i} + 12\\vec{j} + 8\\vec{k} = 4(\\vec{i} + 3\\vec{j} + 2\\vec{k})$$\n   $$|\\vec{OA} \\times \\vec{OB}| = 4\\sqrt{1^2 + 3^2 + 2^2} = 4\\sqrt{14}$$\n   $$\\text{พื้นที่} = \\frac{1}{2}(4\\sqrt{14}) = 2\\sqrt{14} \\text{ ตารางหน่วย}$$',
        trap_analysis: 'ลืมคูณ $\\frac{1}{2}$ ของพื้นที่สามเหลี่ยม ทำให้ได้คำตอบ $4\\sqrt{14}$ ซึ่งเป็นพื้นที่สี่เหลี่ยมด้านขนาน',
        options: [
            { label: '1', content: '$4\\sqrt{7}$', is_correct: 0 },
            { label: '2', content: '$2\\sqrt{10}$', is_correct: 0 },
            { label: '3', content: '$4\\sqrt{10}$', is_correct: 0 },
            { label: '4', content: '$2\\sqrt{14}$', is_correct: 1 },
            { label: '5', content: '$4\\sqrt{14}$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_17',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_stats',
        stimulus: null,
        question_text: 'น้องหมูเด้งต้องการตั้งรหัสปลดล็อกโทรศัพท์มือถือเป็นรหัส 6 หลัก ประกอบด้วยตัวเลขที่แตกต่างกันทั้งหมด โดยมีเลข 0 อยู่หนึ่งตัว แต่ไม่มีเลข 1 ไม่มีเลข 4 และไม่มีเลข 7 จากข้อมูลนี้ มีรหัสปลดล็อกที่เป็นไปได้ทั้งหมดกี่แบบ',
        difficulty: 'medium',
        explanation: '1. ตัวเลขโดดทั้งหมดมี 10 ตัวคือ $\\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}$\n2. ตัดเลขที่ไม่ใช้ออก (ห้ามมี 1, 4, 7) จะเหลือเลขที่ใช้ได้ 7 ตัว คือ:\n   $$\\{0, 2, 3, 5, 6, 8, 9\\}$$\n3. ต้องมีเลข 0 หนึ่งตัวเสมอ และเลือกเลขอีก 5 ตัวจากที่เหลือ 6 ตัว (คือ $\\{2, 3, 5, 6, 8, 9\\}$):\n   $$\\binom{6}{5} = 6 \\text{ วิธี}$$\n4. รหัสโทรศัพท์มือถือ 6 หลัก สามารถขึ้นต้นด้วย 0 ได้ จึงเป็นการเรียงสับเปลี่ยนตัวเลข 6 ตัวที่แตกต่างกัน:\n   $$6! \\text{ วิธี}$$\n5. จำนวนรหัสที่เป็นไปได้ทั้งหมด:\n   $$6 \\times 6! \\text{ แบบ}$$',
        trap_analysis: 'อย่าจำสับสนกับจำนวนเต็ม 6 หลัก: รหัสผ่านมือถือ (Passcode) สามารถมีเลข 0 อยู่หลักแรกได้ (เช่น 082356)',
        options: [
            { label: '1', content: '$6 \\times 6!$', is_correct: 1 },
            { label: '2', content: '$7 \\times 6!$', is_correct: 0 },
            { label: '3', content: '$3 \\times 7!$', is_correct: 0 },
            { label: '4', content: '$6 \\times 6^5$', is_correct: 0 },
            { label: '5', content: '$6 \\times 7^5$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_18',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_stats',
        stimulus: null,
        question_text: 'ขวัญสุ่มหยิบลูกบอลจากกล่องซึ่งมีลูกบอล 5 ลูก เป็นลูกบอลสีแดง 1 ลูก และลูกบอลสีขาว 4 ลูก เป็นจำนวน 5 ครั้ง โดยหลังการหยิบลูกบอลแต่ละครั้งจะนำลูกบอลที่หยิบได้ใส่คืน\n\nจงหาความน่าจะเป็นที่ขวัญจะหยิบได้ลูกบอลสีแดง 3 ครั้งจาก 5 ครั้ง',
        difficulty: 'easy',
        explanation: 'การทดลองสุ่มนี้เป็นการแจกแจงทวินาม (Binomial Distribution) $n = 5$ ครั้ง และใส่คืน (อิสระต่อกัน):\n- ความน่าจะเป็นที่จะได้ลูกบอลสีแดง $p = \\frac{1}{5}$\n- ความน่าจะเป็นที่จะได้ลูกบอลสีขาว $q = 1 - p = \\frac{4}{5}$\n\nความน่าจะเป็นที่ได้สีแดง $k = 3$ ครั้ง:\n$$P(X = 3) = \\binom{n}{k} p^k q^{n-k} = \\binom{5}{3} \\left(\\frac{1}{5}\\right)^3 \\left(\\frac{4}{5}\\right)^{5-3} = 10 \\left(\\frac{1}{5}\\right)^3 \\left(\\frac{4}{5}\\right)^2$$',
        trap_analysis: 'ลืมคูณสัมประสิทธิ์ทวินาม $\\binom{5}{3} = 10$ ทำให้อาจไปเลือกตัวเลือก 4',
        options: [
            { label: '1', content: '$\\left(\\frac{1}{5}\\right)^3$', is_correct: 0 },
            { label: '2', content: '$10 \\left(\\frac{1}{5}\\right)^3$', is_correct: 0 },
            { label: '3', content: '$10 \\left(\\frac{1}{5}\\right)^5$', is_correct: 0 },
            { label: '4', content: '$\\left(\\frac{1}{5}\\right)^3 \\left(\\frac{4}{5}\\right)^2$', is_correct: 0 },
            { label: '5', content: '$10 \\left(\\frac{1}{5}\\right)^3 \\left(\\frac{4}{5}\\right)^2$', is_correct: 1 }
        ]
    },
    {
        id: 'q_alevel_math68_19',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_stats',
        stimulus: null,
        question_text: 'ให้ $x_1, x_2, \\dots, x_{10}$ เป็นข้อมูลชุดหนึ่งที่มีค่าเฉลี่ยเลขคณิตคือ 78\n\nถ้าตัด $x_1$ และ $x_2$ ออกไป จะทำให้ค่าเฉลี่ยเลขคณิตของข้อมูลชุดนี้เหลือ 70\nถ้าตัดเพียง $x_1$ ออกไป จะทำให้ค่าเฉลี่ยเลขคณิตของข้อมูลชุดนี้เหลือ 75\n\nจงหาว่า $|x_1 - x_2|$ มีค่าเท่ากับข้อใด',
        difficulty: 'medium',
        explanation: '1. ผลรวมของข้อมูลทั้ง 10 ตัว:\n   $$\\sum_{i=1}^{10} x_i = 10 \\times 78 = 780$$\n2. เมื่อตัด $x_1$ และ $x_2$ ออก (เหลือ 8 ตัว) ค่าเฉลี่ยคือ 70:\n   $$\\sum_{i=3}^{10} x_i = 8 \\times 70 = 560$$\n   ดังนั้น $x_1 + x_2 = 780 - 560 = 220$\n3. เมื่อตัดเพียง $x_1$ ออก (เหลือ 9 ตัว) ค่าเฉลี่ยคือ 75:\n   $$\\sum_{i=2}^{10} x_i = 9 \\times 75 = 675$$\n   ดังนั้น $x_1 = 780 - 675 = 105$\n4. หาค่า $x_2$:\n   $$x_2 = 220 - 105 = 115$$\n5. คำนวณ $|x_1 - x_2|$:\n   $$|x_1 - x_2| = |105 - 115| = 10$$',
        trap_analysis: 'ระวังจำนวนข้อมูลที่เหลือ: ตัดออก 2 ตัวเหลือ 8 ตัว, ตัดออก 1 ตัวเหลือ 9 ตัว (อย่าคูณด้วย 10 ซ้ำ)',
        options: [
            { label: '1', content: '$0$', is_correct: 0 },
            { label: '2', content: '$10$', is_correct: 1 },
            { label: '3', content: '$20$', is_correct: 0 },
            { label: '4', content: '$30$', is_correct: 0 },
            { label: '5', content: '$40$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_20',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_stats',
        stimulus: null,
        question_text: 'ในรายการเกมวัดดวง ผู้เข้าแข่งขันต้องเลือกรหัสซึ่งประกอบด้วยเลขโดดจำนวน 3 ตัว (ที่ไม่จำเป็นต้องแตกต่างกัน) มาหนึ่งรหัส หลังจากนั้น พิธีกรให้ข้อมูลว่าผู้เข้าแข่งขันจะได้รับรางวัล หากรหัสที่เลือกนี้มีเลขโดดที่เป็นจำนวนคี่และมีเลขโดดที่มากกว่า 3\n\nจงหาความน่าจะเป็นที่ผู้เข้าแข่งขันจะได้รับรางวัล',
        difficulty: 'hard',
        explanation: '1. แซมเปิลสเปซ: รหัสเลขโดด 3 ตัว (000 - 999) $n(S) = 10^3 = 1,000$\n2. ให้ $A$ คือเหตุการณ์ที่มีเลขคี่อย่างน้อย 1 ตัว\n   $\\sim A$ คือเหตุการณ์ที่ทุกหลักเป็นเลขคู่ $\\{0, 2, 4, 6, 8\\} \\implies n(\\sim A) = 5^3 = 125$\n3. ให้ $B$ คือเหตุการณ์ที่มีเลขมากกว่า 3 อย่างน้อย 1 ตัว\n   $\\sim B$ คือเหตุการณ์ที่ทุกหลัก $\\le 3$ คือ $\\{0, 1, 2, 3\\} \\implies n(\\sim B) = 4^3 = 64$\n4. หา $\\sim A \\cap \\sim B$ (ทุกหลักเป็นเลขคู่ และ $\\le 3$):\n   ตัวเลขที่เป็นไปได้คือ $\\{0, 2\\} \\implies n(\\sim A \\cap \\sim B) = 2^3 = 8$\n5. หาเหตุการณ์ที่ไม่ได้รับรางวัล $\\sim A \\cup \\sim B$:\n   $$n(\\sim A \\cup \\sim B) = 125 + 64 - 8 = 181$$\n6. ความน่าจะเป็นที่จะได้รับรางวัล:\n   $$P(A \\cap B) = 1 - \\frac{181}{1,000} = \\frac{819}{1,000} = 0.819$$',
        trap_analysis: 'การใช้หลักการบวก-ลบเข้าออกของคอมพลีเมนต์ (Inclusion-Exclusion on Complement) ช่วยลดความผิดพลาดได้มาก หากคิดตรงๆ จะต้องแบ่งหลายกรณีและอาจตกหล่น',
        options: [
            { label: '1', content: '0.181', is_correct: 0 },
            { label: '2', content: '0.188', is_correct: 0 },
            { label: '3', content: '0.300', is_correct: 0 },
            { label: '4', content: '0.811', is_correct: 0 },
            { label: '5', content: '0.819', is_correct: 1 }
        ]
    },
    {
        id: 'q_alevel_math68_21',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_stats',
        stimulus: null,
        question_text: 'นายสมจิตรพิมพ์รายงานฉบับหนึ่งที่มี 20 หน้า โดยในแต่ละหน้ามีความน่าจะเป็น 0.2 ที่นายสมจิตรจะพิมพ์คำบางคำในหน้านั้นผิด\n\nจงหาความน่าจะเป็นที่นายสมจิตรจะพิมพ์รายงานทั้งฉบับโดยไม่มีคำที่พิมพ์ผิดเลย',
        difficulty: 'easy',
        explanation: '1. ความน่าจะเป็นที่แต่ละหน้าจะไม่มีคำผิดเลยคือ $1 - 0.2 = 0.8$\n2. เนื่องจากแต่ละหน้ามีความเป็นอิสระต่อกัน (Independent Events)\n3. ความน่าจะเป็นที่ทั้ง 20 หน้าจะไม่มีคำผิดเลย คือ:\n   $$(0.8) \\times (0.8) \\times \\dots \\times (0.8) = (0.8)^{20}$$',
        trap_analysis: 'อย่าสับสนนำ 20 ไปคูณข้างหน้า $(20 \\times 0.8^{20})$ ซึ่งนั่นคือสูตรสำหรับเหตุการณ์ผิด 1 หน้า ไม่ใช่ไม่มีคำผิดเลย',
        options: [
            { label: '1', content: '$(0.8)^{20}$', is_correct: 1 },
            { label: '2', content: '$(0.2)^{20}$', is_correct: 0 },
            { label: '3', content: '$20(0.8)^{20}$', is_correct: 0 },
            { label: '4', content: '$20(0.2)^{20}$', is_correct: 0 },
            { label: '5', content: '$10(0.8)^{20} + 10(0.2)^{20}$', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_22',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_stats',
        stimulus: null,
        question_text: 'โรงงานแห่งหนึ่งผลิตน้ำผลไม้กล่องเพื่อจัดจำหน่าย โดยปริมาตรของน้ำผลไม้ในแต่ละกล่องมีการแจกแจงแบบปกติที่มีค่าเฉลี่ยเป็น 498.2 มิลลิลิตร และความแปรปรวนเป็น 1.44 มิลลิลิตร$^2$\n\nกำหนดตารางค่าความน่าจะเป็นของการแจกแจงปกติมาตรฐาน ดังนี้\n\n| $z$ | 0.25 | 0.50 | 1.00 | 1.25 | 1.50 |\n| :---: | :---: | :---: | :---: | :---: | :---: |\n| $P(Z < z)$ | 0.5987 | 0.6915 | 0.8413 | 0.8944 | 0.9332 |\n\nจงหาความน่าจะเป็นที่น้ำผลไม้กล่องหนึ่งที่ผลิตจากโรงงานแห่งนี้มีปริมาตรเกิน 500 มิลลิลิตร',
        difficulty: 'medium',
        explanation: '1. กำหนด $\\mu = 498.2$ และ $\\sigma^2 = 1.44 \\implies \\sigma = \\sqrt{1.44} = 1.2$\n2. แปลง $X = 500$ เป็นคะแนนมาตรฐาน $Z$:\n   $$Z = \\frac{X - \\mu}{\\sigma} = \\frac{500 - 498.2}{1.2} = \\frac{1.8}{1.2} = 1.50$$\n3. ต้องการหาความน่าจะเป็นที่ปริมาตรเกิน 500 มล. ($P(X > 500)$):\n   $$P(Z > 1.50) = 1 - P(Z < 1.50)$$\n4. อ่านค่าจากตาราง $P(Z < 1.50) = 0.9332$:\n   $$P(Z > 1.50) = 1 - 0.9332 = 0.0668$$',
        trap_analysis: 'ระวังลืมถอดรากที่สองของความแปรปรวน $1.44$ เพื่อหา $\\sigma = 1.2$ และระวังตอบค่า $P(Z < 1.50) = 0.9332$ แทนที่จะเป็นส่วนที่เกิน ($1 - 0.9332$)',
        options: [
            { label: '1', content: '0.9332', is_correct: 0 },
            { label: '2', content: '0.8944', is_correct: 0 },
            { label: '3', content: '0.3085', is_correct: 0 },
            { label: '4', content: '0.1056', is_correct: 0 },
            { label: '5', content: '0.0668', is_correct: 1 }
        ]
    },
    {
        id: 'q_alevel_math68_23',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_calc',
        stimulus: null,
        question_text: 'ให้ $F\'(2x) = f(x + 2)$ โดยที่ $F(0) = 10, \\ F(1) = 14.5, \\ F(2) = 20$ และ $F(3) = 26.5$\n\nถ้า $f$ เป็นฟังก์ชันต่อเนื่องบน $[2, 3]$ แล้ว $\\int_2^3 f(x)\\,dx$ มีค่าเท่ากับข้อใด',
        difficulty: 'hard',
        explanation: '1. จากอินทิกรัลที่ต้องการ $\\int_2^3 f(x)\\,dx$ เปลี่ยนตัวแปร $x = u + 2 \\implies dx = du$:\n   - เมื่อ $x = 2 \\implies u = 0$\n   - เมื่อ $x = 3 \\implies u = 1$\n   $$\\int_2^3 f(x)\\,dx = \\int_0^1 f(u + 2)\\,du$$\n2. จากเงื่อนไขโจทย์ $f(u + 2) = F\'(2u)$:\n   $$\\int_0^1 f(u + 2)\\,du = \\int_0^1 F\'(2u)\\,du$$\n3. เปลี่ยนตัวแปรอีกครั้งให้ $w = 2u \\implies dw = 2\\,du \\implies du = \\frac{dw}{2}$:\n   - เมื่อ $u = 0 \\implies w = 0$\n   - เมื่อ $u = 1 \\implies w = 2$\n   $$\\int_0^1 F\'(2u)\\,du = \\int_0^2 F\'(w)\\,\\frac{dw}{2} = \\frac{1}{2} [F(2) - F(0)]$$\n4. แทนค่า $F(2) = 20$ และ $F(0) = 10$:\n   $$\\frac{1}{2} (20 - 10) = \\frac{10}{2} = 5$$',
        trap_analysis: 'ระวังตัวประกอบ $\\frac{1}{2}$ จากการเปลี่ยนตัวแปร $dw = 2du$ หากลืมหาร 2 จะได้คำตอบเป็น 10',
        options: [
            { label: '1', content: '3.25', is_correct: 0 },
            { label: '2', content: '5', is_correct: 1 },
            { label: '3', content: '6.5', is_correct: 0 },
            { label: '4', content: '8.25', is_correct: 0 },
            { label: '5', content: '10', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_24',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_calc',
        stimulus: null,
        question_text: 'กำหนดกราฟของฟังก์ชัน $f$ และ $g$ ดังรูป\n\n<div class="exam-figure" style="text-align:center; margin:16px 0;"><img src="/images/exams/tcas68_math1_q24.png" alt="กราฟของฟังก์ชัน f และ g" style="max-width:100%; max-height:220px; border-radius:8px; border:1px solid #cbd5e1; box-shadow:0 2px 8px rgba(0,0,0,0.06);"></div>\n\nพิจารณาข้อความต่อไปนี้:\nก. $\\lim_{x \\to 1} (f(x) + g(x))$ หาค่าได้\nข. ฟังก์ชัน $f + g$ มีความต่อเนื่องบนช่วง $[-2, 5]$\nค. $\\lim_{x \\to 1} (f(x)g(x))$ หาค่าได้\n\nจากข้อความ ก. ข. และ ค. ข้างต้น ข้อความใดต่อไปนี้กล่าวถูกต้อง',
        difficulty: 'hard',
        explanation: 'อ่านค่าลิมิตซ้ายและขวาที่ $x = 1$ จากกราฟ:\n- สำหรับ $f$:\n  $\\lim_{x \\to 1^-} f(x) = 1$ และ $\\lim_{x \\to 1^+} f(x) = 2$\n- สำหรับ $g$:\n  $\\lim_{x \\to 1^-} g(x) = 3$ และ $\\lim_{x \\to 1^+} g(x) = 2$\n\nตรวจสอบแต่ละข้อความ:\n- **ข้อความ ก:**\n  - ลิมิตซ้ายของผลบวก: $\\lim_{x \\to 1^-} (f(x) + g(x)) = 1 + 3 = 4$\n  - ลิมิตขวาของผลบวก: $\\lim_{x \\to 1^+} (f(x) + g(x)) = 2 + 2 = 4$\n  เนื่องจากลิมิตซ้ายเท่ากับลิมิตขวา ดังนั้น $\\lim_{x \\to 1} (f(x) + g(x)) = 4$ **หาค่าได้ (ข้อ ก ถูกต้อง)**\n\n- **ข้อความ ข:**\n  ค่าของฟังก์ชันที่จุด $x = 1$: $f(1) = 1$ (จุดทึบ) และ $g(1) = 2$ (จุดทึบ)\n  ดังนั้น $(f + g)(1) = 1 + 2 = 3 \\neq 4$ (ลิมิตไม่เท่ากับค่าฟังก์ชัน) ฟังก์ชัน $f + g$ จึง **ไม่ต่อเนื่อง** ที่ $x = 1$ **(ข้อ ข ผิด)**\n\n- **ข้อความ ค:**\n  - ลิมิตซ้ายของผลคูณ: $1 \\times 3 = 3$\n  - ลิมิตขวาของผลคูณ: $2 \\times 2 = 4$\n  ลิมิตซ้ายไม่เท่ากับลิมิตขวา ดังนั้นลิมิตผลคูณ **หาค่าไม่ได้ (ข้อ ค ผิด)**\n\nสรุป: ข้อความ ก. ถูกต้องเพียงข้อเดียว',
        trap_analysis: 'แม้ว่าทั้ง $f$ และ $g$ จะไม่มีลิมิตที่ $x = 1$ แต่ผลบวกของลิมิตสามารถหาค่าได้เนื่องจากผลรวมลิมิตซ้ายและขวาบังเอิญเท่ากันพอดี ($1 + 3 = 2 + 2 = 4$)',
        options: [
            { label: '1', content: 'ข้อความ ก. ถูกต้องเพียงข้อเดียว', is_correct: 1 },
            { label: '2', content: 'ข้อความ ค. ถูกต้องเพียงข้อเดียว', is_correct: 0 },
            { label: '3', content: 'ข้อความ ก. และ ข. ถูกต้องเพียงสองข้อ', is_correct: 0 },
            { label: '4', content: 'ข้อความ ก. และ ค. ถูกต้องเพียงสองข้อ', is_correct: 0 },
            { label: '5', content: 'ข้อความ ข. และ ค. ถูกต้องเพียงสองข้อ', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_25',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_calc',
        stimulus: null,
        question_text: 'ให้ $f$ เป็นฟังก์ชันที่มีกราฟและเส้นสัมผัสที่ $x = 1$ ดังรูป\n\n<div class="exam-figure" style="text-align:center; margin:16px 0;"><img src="/images/exams/tcas68_math1_q25.png" alt="กราฟของฟังก์ชัน f และเส้นสัมผัสที่ x=1" style="max-width:100%; max-height:220px; border-radius:8px; border:1px solid #cbd5e1; box-shadow:0 2px 8px rgba(0,0,0,0.06);"></div>\n\nค่าของ $f\'(1)$ เท่ากับข้อใดต่อไปนี้',
        difficulty: 'medium',
        explanation: '1. ความหมายเชิงเรขาคณิตของอนุพันธ์: $f\'(1)$ คือ **ความชันของเส้นสัมผัสกราฟ $f$ ที่จุด $x = 1$**\n2. จากกราฟ เส้นสัมผัสที่ $x = 1$ เป็นเส้นตรงที่ผ่านจุดสองจุดชัดเจนคือ:\n   - จุดสัมผัส $(1, 3)$\n   - จุดตัดแกน $X$ ที่ $(7, 0)$\n3. คำนวณความชัน $m$ ของเส้นตรง:\n   $$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{0 - 3}{7 - 1} = \\frac{-3}{6} = -\\frac{1}{2}$$\n4. ดังนั้น $f\'(1) = -\\frac{1}{2}$',
        trap_analysis: 'ระวังคิดเครื่องหมายความชันผิด เส้นตรงเอียงลงจากซ้ายไปขวา ความชันต้องติดลบ',
        options: [
            { label: '1', content: '$-3$', is_correct: 0 },
            { label: '2', content: '$-2$', is_correct: 0 },
            { label: '3', content: '$-\\frac{1}{2}$', is_correct: 1 },
            { label: '4', content: '$\\frac{1}{2}$', is_correct: 0 },
            { label: '5', content: '$3$', is_correct: 0 }
        ]
    },

    // -------------------------------------------------------------
    // ข้อ 26 - 30: ตอนที่ 2 แบบระบายคำตอบที่เป็นตัวเลข (ข้อละ 5 คะแนน)
    // -------------------------------------------------------------
    {
        id: 'q_alevel_math68_26',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_geo',
        stimulus: null,
        question_text: '*(ข้อสอบจริงตอนที่ 2 แบบระบายคำตอบที่เป็นตัวเลข: ข้อละ 5 คะแนน)*\n\nกำหนดให้รูปสามเหลี่ยม $ABC$ สอดคล้องกับสมการ\n$$\\frac{\\sin A}{4} = \\frac{\\sin B}{5} = \\frac{\\sin C}{6}$$\nจงหาค่าของ $\\cos A$',
        difficulty: 'hard',
        explanation: '1. จากกฎของไซน์ (Law of Sines): $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$\n   จะได้ว่าอัตราส่วนความยาวด้านแปรผันตรงกับไซน์ของมุมตรงข้าม:\n   $$a : b : c = \\sin A : \\sin B : \\sin C = 4 : 5 : 6$$\n   กำหนดให้ $a = 4k, \\ b = 5k, \\ c = 6k$ (โดย $k > 0$)\n\n2. ใช้กฎของโคไซน์ (Law of Cosines) เพื่อหา $\\cos A$:\n   $$a^2 = b^2 + c^2 - 2bc \\cos A$$\n   $$\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}$$\n\n3. แทนค่า $a, b, c$:\n   $$\\cos A = \\frac{(5k)^2 + (6k)^2 - (4k)^2}{2(5k)(6k)} = \\frac{25k^2 + 36k^2 - 16k^2}{60k^2} = \\frac{45k^2}{60k^2} = \\frac{45}{60} = \\frac{3}{4} = 0.75$$\n\nดังนั้น คำตอบคือ **0.75** (หรือระบายในกระดาษคำตอบเป็น 0000.75)',
        trap_analysis: 'ระวังมุมที่โจทย์ถาม: โจทย์ถาม $\\cos A$ ต้องนำด้าน $a$ มาเป็นตัวลบ ($b^2 + c^2 - a^2$)',
        options: [
            { label: '1', content: '0.50', is_correct: 0 },
            { label: '2', content: '0.60', is_correct: 0 },
            { label: '3', content: '0.75 (คำตอบจริง)', is_correct: 1 },
            { label: '4', content: '0.80', is_correct: 0 },
            { label: '5', content: '0.85', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_27',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: '*(ข้อสอบจริงตอนที่ 2 แบบระบายคำตอบที่เป็นตัวเลข: ข้อละ 5 คะแนน)*\n\nถ้า $z_1 = 3 - 2i$ และ $z_2 = 1 + 5i$ แล้ว $|z_1^2 + 2z_1z_2 + z_2^2|$ มีค่าเท่าใด',
        difficulty: 'medium',
        explanation: '1. จัดรูปนิพจน์กำลังสองสมบูรณ์:\n   $$z_1^2 + 2z_1z_2 + z_2^2 = (z_1 + z_2)^2$$\n2. จากสมบัติของค่าสัมบูรณ์ของจำนวนเชิงซ้อน $|w^2| = |w|^2$:\n   $$|z_1^2 + 2z_1z_2 + z_2^2| = |(z_1 + z_2)^2| = |z_1 + z_2|^2$$\n3. คำนวณ $z_1 + z_2$:\n   $$z_1 + z_2 = (3 - 2i) + (1 + 5i) = (3 + 1) + (-2 + 5)i = 4 + 3i$$\n4. หาขนาด $|z_1 + z_2|$:\n   $$|z_1 + z_2| = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$$\n5. ยกกำลังสอง:\n   $$|z_1 + z_2|^2 = 5^2 = 25$$\n\nดังนั้น คำตอบคือ **25** (ระบาย 0025.00)',
        trap_analysis: 'หากไปคำนวณ $z_1^2, 2z_1z_2, z_2^2$ ทีละตัวจะเสียเวลามากและเสี่ยงต่อการคิดเลขผิด ควรยุบเป็นกำลังสองสมบูรณ์ $(z_1+z_2)^2$ ก่อน',
        options: [
            { label: '1', content: '15', is_correct: 0 },
            { label: '2', content: '20', is_correct: 0 },
            { label: '3', content: '25 (คำตอบจริง)', is_correct: 1 },
            { label: '4', content: '30', is_correct: 0 },
            { label: '5', content: '35', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_28',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: '*(ข้อสอบจริงตอนที่ 2 แบบระบายคำตอบที่เป็นตัวเลข: ข้อละ 5 คะแนน)*\n\nให้ $a_1, a_2, a_3, \\dots, a_n, \\dots$ เป็นลำดับเลขคณิตที่มี $a_6 = -17$ และ $a_{17} = -50$\n\nถ้า $s$ และ $t$ เป็นจำนวนเต็มบวกที่ทำให้\n$$3^{a_1} + 3^{a_2} + 3^{a_3} + \\dots + 3^{a_n} + \\dots = \\frac{s}{t}$$\nโดยที่ $\\frac{s}{t}$ เป็นเศษส่วนอย่างต่ำ แล้ว $s + t$ เท่ากับเท่าใด',
        difficulty: 'hard',
        explanation: '1. หาพจน์ทั่วไปของลำดับเลขคณิต $a_n$:\n   $$a_{17} - a_6 = (17 - 6)d = 11d$$\n   $$-50 - (-17) = 11d \\implies -33 = 11d \\implies d = -3$$\n   หาพจน์แรก $a_1$:\n   $$a_1 = a_6 - 5d = -17 - 5(-3) = -17 + 15 = -2$$\n\n2. พิจารณาอนุกรม $3^{a_1} + 3^{a_2} + 3^{a_3} + \\dots$:\n   - พจน์แรก $c_1 = 3^{a_1} = 3^{-2} = \\frac{1}{9}$\n   - พจน์ที่สอง $c_2 = 3^{a_2} = 3^{a_1 + d} = 3^{-2 - 3} = 3^{-5} = \\frac{1}{243}$\n   - อัตราส่วนร่วม $r = \\frac{c_2}{c_1} = 3^d = 3^{-3} = \\frac{1}{27}$\n   เนื่องจาก $|r| = \\frac{1}{27} < 1$ จึงเป็นอนุกรมเรขาคณิตอนันต์ที่ลู่เข้า\n\n3. คำนวณผลบวกอนุกรมอนันต์:\n   $$S_\\infty = \\frac{c_1}{1 - r} = \\frac{\\frac{1}{9}}{1 - \\frac{1}{27}} = \\frac{\\frac{1}{9}}{\\frac{26}{27}} = \\frac{1}{9} \\times \\frac{27}{26} = \\frac{3}{26}$$\n\n4. เทียบกับ $\\frac{s}{t}$ (ซึ่ง $\\gcd(3, 26) = 1$ เป็นเศษส่วนอย่างต่ำแล้ว):\n   $$s = 3, \\ t = 26 \\implies s + t = 3 + 26 = 29$$\n\nดังนั้น คำตอบคือ **29** (ระบาย 0029.00)',
        trap_analysis: 'ระวังคิดอัตราส่วนร่วมผิดเป็น $r = -3$ อัตราส่วนร่วมของอนุกรมคือ $3^d = 3^{-3} = \\frac{1}{27}$',
        options: [
            { label: '1', content: '23', is_correct: 0 },
            { label: '2', content: '26', is_correct: 0 },
            { label: '3', content: '29 (คำตอบจริง)', is_correct: 1 },
            { label: '4', content: '32', is_correct: 0 },
            { label: '5', content: '35', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_29',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_algebra',
        stimulus: null,
        question_text: '*(ข้อสอบจริงตอนที่ 2 แบบระบายคำตอบที่เป็นตัวเลข: ข้อละ 5 คะแนน)*\n\nกำหนดให้ $A, B, C$ เป็นเซต โดยที่ $n(A) = 40, \\ n(A \\cap B) = 27, \\ n(A \\cap C) = 21$ และ $n(A \\cap B \\cap C) = 10$\n\nจงหาจำนวนสมาชิกของเซต $A - (B \\cup C)$',
        difficulty: 'medium',
        explanation: '1. จากสมบัติของเซต:\n   $$A - (B \\cup C) = A - [(A \\cap B) \\cup (A \\cap C)]$$\n2. สมาชิกในส่วนที่ถูกตัดออกคือ $(A \\cap B) \\cup (A \\cap C)$ ซึ่งมีจำนวนสมาชิก:\n   $$n((A \\cap B) \\cup (A \\cap C)) = n(A \\cap B) + n(A \\cap C) - n((A \\cap B) \\cap (A \\cap C))$$\n   เนื่องจาก $(A \\cap B) \\cap (A \\cap C) = A \\cap B \\cap C$:\n   $$n((A \\cap B) \\cup (A \\cap C)) = 27 + 21 - 10 = 38$$\n3. หา $n(A - (B \\cup C))$:\n   $$n(A - (B \\cup C)) = n(A) - n((A \\cap B) \\cup (A \\cap C)) = 40 - 38 = 2$$\n\nดังนั้น คำตอบคือ **2** (ระบาย 0002.00)',
        trap_analysis: 'หากลืมบวกจุดตัด 3 เซตกลับคืนตามหลักการรวมเข้า-ตัดออก จะได้ $40 - (27 + 21) = -8$ ซึ่งติดลบและเป็นไปไม่ได้',
        options: [
            { label: '1', content: '2 (คำตอบจริง)', is_correct: 1 },
            { label: '2', content: '4', is_correct: 0 },
            { label: '3', content: '6', is_correct: 0 },
            { label: '4', content: '8', is_correct: 0 },
            { label: '5', content: '10', is_correct: 0 }
        ]
    },
    {
        id: 'q_alevel_math68_30',
        subject_id: 'alevel_math1',
        blueprint_id: 'alevel_math_stats',
        stimulus: null,
        question_text: '*(ข้อสอบจริงตอนที่ 2 แบบระบายคำตอบที่เป็นตัวเลข: ข้อละ 5 คะแนน)*\n\nนิกกี้แบ่งเวลาเพื่ออ่านหนังสือเตรียมสอบ 4 วิชา (คณิตศาสตร์ เคมี ฟิสิกส์ ชีววิทยา) ใน 3 วัน (จันทร์ อังคาร พุธ) โดยแต่ละวิชาจะอ่านเป็นเวลาเพียงครึ่งวันในช่วงเช้าหรือช่วงบ่ายของวันใดวันหนึ่งเพียงวันเดียว โดยมีเงื่อนไขดังนี้\n- ทุกวันอ่านหนังสืออย่างน้อยหนึ่งวิชา\n- วิชาเคมีอ่านก่อนวันพุธ\n\nจงหาจำนวนวิธีการจัดตารางการอ่านหนังสือของนิกกี้',
        difficulty: 'hard',
        explanation: '1. วิเคราะห์ช่วงเวลาว่าง: 3 วัน วันละ 2 ช่วง (เช้า/บ่าย) รวม 6 ช่วง\n2. จัด 4 วิชาลง 3 วันโดยทุกวันมีอย่างน้อย 1 วิชา:\n   รูปแบบจำนวนวิชาในแต่ละวัน (จันทร์, อังคาร, พุธ) มีผลบวกเป็น 4 ต้องเป็น $(2, 1, 1)$ สลับที่ได้ 3 กรณี\n3. สำหรับทุกการจับคู่วิชาลงวัน:\n   - วันที่มี 2 วิชา: ลงทั้งเช้าและบ่าย สลับช่วงเวลาได้ $2! = 2$ วิธี\n   - วันที่มี 1 วิชา: เลือกว่าจะลงเช้าหรือบ่ายได้ $\\binom{2}{1} = 2$ วิธี\n   ดังนั้น การลงช่วงเวลาเช้า/บ่าย จะมี $2 \\times 2 \\times 2 = 8$ วิธีเสมอ\n\n4. นับจำนวนวิธีแจกแจงวิชาลงวันตามเงื่อนไข "เคมีอ่านก่อนวันพุธ" (เคมีต้องอยู่วันจันทร์หรืออังคาร):\n   - **กรณี 1 (จันทร์ 2, อังคาร 1, พุธ 1):**\n     - ถ้าเคมีอยู่วันจันทร์: เลือกอีก 1 วิชามาคู่วันจันทร์ $\\binom{3}{1} = 3$ วิธี ที่เหลือ 2 วิชาลงอังคารกับพุธได้ $2! = 2$ วิธี $\\implies 3 \\times 2 = 6$ วิธี\n     - ถ้าเคมีอยู่วันอังคาร: อีก 3 วิชาต้องเลือก 2 วิชาลงวันจันทร์ $\\binom{3}{2} = 3$ วิธี และที่เหลือ 1 วิชาลงวันพุธ $\\implies 3$ วิธี\n     รวมกรณี 1 ได้ $6 + 3 = 9$ วิธี\n   - **กรณี 2 (จันทร์ 1, อังคาร 2, พุธ 1):**\n     - ถ้าเคมีอยู่วันจันทร์: 3 วิชาที่เหลือเลือก 2 วิชาลงวันอังคาร $\\implies \\binom{3}{2} = 3$ วิธี\n     - ถ้าเคมีอยู่วันอังคาร: เลือกอีก 1 วิชามาคู่อังคาร $\\binom{3}{1} = 3$ วิธี ที่เหลือลงจันทร์กับพุธได้ $2! = 2$ วิธี $\\implies 3 \\times 2 = 6$ วิธี\n     รวมกรณี 2 ได้ $3 + 6 = 9$ วิธี\n   - **กรณี 3 (จันทร์ 1, อังคาร 1, พุธ 2):**\n     - ถ้าเคมีอยู่วันจันทร์: เลือก 1 วิชาลงอังคาร $\\binom{3}{1} = 3$ วิธี ที่เหลือ 2 วิชาลงวันพุธ $\\implies 3$ วิธี\n     - ถ้าเคมีอยู่วันอังคาร: เลือก 1 วิชาลงจันทร์ $\\binom{3}{1} = 3$ วิธี ที่เหลือ 2 วิชาลงวันพุธ $\\implies 3$ วิธี\n     รวมกรณี 3 ได้ $3 + 3 = 6$ วิธี\n\n5. รวมจำนวนวิธีแจกวิชาลงวัน: $9 + 9 + 6 = 24$ วิธี\n6. คูณจำนวนวิธีจัดช่วงเช้า/บ่าย (8 วิธี):\n   $$\\text{จำนวนวิธีทั้งหมด} = 24 \\times 8 = 192 \\text{ วิธี}$$\n\nดังนั้น คำตอบคือ **192** (ระบาย 0192.00)',
        trap_analysis: 'จุดลวง: อย่าลืมว่าแต่ละวันมี 2 ช่วงเวลา (เช้าและบ่าย) สำหรับวันที่อ่าน 1 วิชา จะเลือกได้ 2 แบบ (เช้าหรือบ่าย) ทำให้มีตัวคูณ $2^3 = 8$ เสมอ',
        options: [
            { label: '1', content: '96', is_correct: 0 },
            { label: '2', content: '144', is_correct: 0 },
            { label: '3', content: '192 (คำตอบจริง)', is_correct: 1 },
            { label: '4', content: '216', is_correct: 0 },
            { label: '5', content: '240', is_correct: 0 }
        ]
    }
];

function seed() {
    console.log(`Found ${tcas68Math1Questions.length} official questions to seed.`);

    // 1. Delete previous alevel_math1 questions
    const oldMathQIds = db.prepare("SELECT id FROM questions WHERE subject_id = 'alevel_math1'").all().map(r => r.id);
    console.log(`Deleting ${oldMathQIds.length} previous/synthetic Math 1 questions...`);

    const delOption = db.prepare("DELETE FROM question_options WHERE question_id = ?");
    const delMistake = db.prepare("DELETE FROM mistake_notebook WHERE question_id = ?");
    const delMastered = db.prepare("DELETE FROM user_mastered_questions WHERE question_id = ?");
    const delAnswer = db.prepare("DELETE FROM user_answers WHERE question_id = ?");
    const delQ = db.prepare("DELETE FROM questions WHERE id = ?");

    const deleteTx = db.transaction(() => {
        for (const qid of oldMathQIds) {
            delOption.run(qid);
            delMistake.run(qid);
            delMastered.run(qid);
            delAnswer.run(qid);
            delQ.run(qid);
        }
    });
    deleteTx();
    console.log('✅ Previous Math 1 questions deleted.');

    // 2. Insert the 30 official questions and options
    const insertQ = db.prepare(`
        INSERT INTO questions (id, subject_id, blueprint_id, stimulus, question_text, image_url, difficulty, explanation, trap_analysis, is_custom)
        VALUES (@id, @subject_id, @blueprint_id, @stimulus, @question_text, @image_url, @difficulty, @explanation, @trap_analysis, 0)
    `);

    const insertOpt = db.prepare(`
        INSERT INTO question_options (id, question_id, label, content, is_correct, order_index)
        VALUES (@id, @question_id, @label, @content, @is_correct, @order_index)
    `);

    const insertTx = db.transaction(() => {
        for (const q of tcas68Math1Questions) {
            insertQ.run({
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

            q.options.forEach((opt, idx) => {
                insertOpt.run({
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

    insertTx();
    console.log(`✅ Successfully seeded all ${tcas68Math1Questions.length} official TCAS68 Math 1 questions with options!`);

    // 3. Update subjects metadata for A-Level Math 1 (30 questions, 100 score, 90 mins)
    db.prepare(`
        UPDATE subjects 
        SET total_questions = 30, total_score = 100, duration_minutes = 90
        WHERE id = 'alevel_math1'
    `).run();

    // 4. Update blueprints target counts for alevel_math1
    db.prepare("UPDATE blueprints SET target_questions = 14 WHERE id = 'alevel_math_algebra'").run();
    db.prepare("UPDATE blueprints SET target_questions = 6 WHERE id = 'alevel_math_geo'").run();
    db.prepare("UPDATE blueprints SET target_questions = 7 WHERE id = 'alevel_math_stats'").run();
    db.prepare("UPDATE blueprints SET target_questions = 3 WHERE id = 'alevel_math_calc'").run();

    console.log('✅ Subject and Blueprints targets updated.');
}

if (require.main === module) {
    seed();
}

module.exports = { seed, tcas68Math1Questions };
