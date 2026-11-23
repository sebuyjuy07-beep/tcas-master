/**
 * Subject Module: A-Level คณิตศาสตร์ประยุกต์ 1 (61)
 * Owned by: Exam Subject Agent (alevel_math1)
 * See rules: database/subjects/AGENTS.md
 */

module.exports = {
    subject: {
    "id": "alevel_math1",
    "code": "61",
    "name_th": "A-Level คณิตศาสตร์ประยุกต์ 1",
    "name_en": "Applied Mathematics 1",
    "category": "A_LEVEL",
    "total_questions": 30,
    "total_score": 100,
    "duration_minutes": 90,
    "description": "ข้อสอบคณิตศาสตร์ระดับ ม.ปลาย (สายวิทย์-คณิต) ครอบคลุม พีชคณิต, แคลคูลัส, สถิติ, ตรีโกณมิติ และเวกเตอร์",
    "icon_name": "calculator",
    "status": "ready"
},
    blueprints: [
    {
        "id": "alevel_math_algebra",
        "subject_id": "alevel_math1",
        "domain_name": "สาระจำนวนและพีชคณิต",
        "subtopic_name": "เซต, ตรรกศาสตร์, ฟังก์ชัน, เอกซ์โพ/ลอการิทึม, เมทริกซ์, ลำดับและอนุกรม",
        "description": "การแก้สมการ อสมการ การดำเนินการฟังก์ชัน และการประยุกต์เรื่องลำดับอนุกรม",
        "target_questions": 14,
        "score_weight": 36.6,
        "order_index": 1
    },
    {
        "id": "alevel_math_geo",
        "subject_id": "alevel_math1",
        "domain_name": "สาระการวัดและเรขาคณิต",
        "subtopic_name": "เรขาคณิตวิเคราะห์ ภาคตัดกรวย ตรีโกณมิติ และเวกเตอร์",
        "description": "สมการวงกลม วงรี พาราโบลา ไฮเพอร์โบลา ฟังก์ชันตรีโกณมิติ และผลคูณเชิงสเกลาร์/เวกเตอร์",
        "target_questions": 6,
        "score_weight": 20,
        "order_index": 2
    },
    {
        "id": "alevel_math_stats",
        "subject_id": "alevel_math1",
        "domain_name": "สาระสถิติและความน่าจะเป็น",
        "subtopic_name": "สถิติศาสตร์, หลักการนับเบื้องต้น, ความน่าจะเป็น, การแจกแจงความน่าจะเป็น",
        "description": "ค่ากลาง ตำแหน่งข้อมูล การกระจาย การแจกแจงทวินาม และการแจกแจงปกติ",
        "target_questions": 7,
        "score_weight": 23.4,
        "order_index": 3
    },
    {
        "id": "alevel_math_calc",
        "subject_id": "alevel_math1",
        "domain_name": "สาระแคลคูลัส",
        "subtopic_name": "ลิมิต ความต่อเนื่อง อนุพันธ์ และปริพันธ์",
        "description": "การหาอนุพันธ์ การประยุกต์หาจุดสูงสุด-ต่ำสุดสัมพัทธ์ และพื้นที่ใต้เส้นโค้ง",
        "target_questions": 3,
        "score_weight": 20,
        "order_index": 4
    }
],
    cheatsheet: {
    "subject_id": "alevel_math1",
    "title": "สรุปสูตร A-Level คณิตศาสตร์ประยุกต์ 1 (Math 1)",
    "badge": "A-Level • 61",
    "description": "รวมสูตรสำคัญ แคลคูลัส สถิติ ตรีโกณมิติ ลำดับและอนุกรม เมทริกซ์ เวกเตอร์ และจำนวนจริง",
    "sections": [
        {
            "title": "📐 1. แคลคูลัส (Calculus)",
            "icon": "trending-up",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>⚡ สูตรอนุพันธ์พื้นฐาน</h4>\n        <ul>\n            <li>$\\frac{d}{dx}(x^n) = n x^{n-1}$</li>\n            <li>กฎผลคูณ: $(uv)' = u'v + uv'$</li>\n            <li>กฎผลหาร: $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$</li>\n            <li>กฎลูกโซ่ (Chain Rule): $\\frac{df}{dx} = f'(g(x)) \\cdot g'(x)$</li>\n            <li><strong>จุดวิกฤต:</strong> จุดที่ $f'(x) = 0$ หรือหาค่าไม่ได้\n                <br>• $f''(x) > 0 \\implies$ จุดต่ำสุดสัมพัทธ์\n                <br>• $f''(x) < 0 \\implies$ จุดสูงสุดสัมพัทธ์\n            </li>\n        </ul>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>∫ ปริพันธ์ (Integration)</h4>\n        <ul>\n            <li>$\\int x^n dx = \\frac{x^{n+1}}{n+1} + c \\quad (n \\neq -1)$</li>\n            <li>ทฤษฎีบทมูลฐาน: $\\int_a^b f(x) dx = F(b) - F(a)$</li>\n            <li><strong>พื้นที่ปิดล้อมด้วยเส้นโค้ง:</strong>\n                <br>$$A = \\int_a^b |f(x) - g(x)| dx$$\n            </li>\n        </ul>\n    </div>\n</div>\n"
        },
        {
            "title": "📊 2. สถิติ & การแจกแจงความน่าจะเป็น",
            "icon": "bar-chart-2",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>🎯 ค่ามาตรฐาน & การแจกแจงปกติ</h4>\n        <ul>\n            <li><strong>ค่ามาตรฐาน (Z-Score):</strong>\n                <br>$$z = \\frac{x - \\mu}{\\sigma}$$\n            </li>\n            <li>พื้นที่ใต้โค้งปกติมาตรฐานรวมเท่ากับ $1.0$ (สมมาตรรอบ $z = 0$)</li>\n            <li>$P(\\mu - \\sigma < X < \\mu + \\sigma) \\approx 68.2\\%$</li>\n            <li>$P(\\mu - 2\\sigma < X < \\mu + 2\\sigma) \\approx 95.4\\%$</li>\n        </ul>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🎲 ความน่าจะเป็น & การแจกแจงทวินาม</h4>\n        <ul>\n            <li>กฎการนับ: $P_{n,r} = \\frac{n!}{(n-r)!}$, $C_{n,r} = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}$</li>\n            <li><strong>การแจกแจงทวินาม $X \\sim B(n, p)$:</strong>\n                <br>• $P(X = x) = \\binom{n}{x} p^x (1-p)^{n-x}$\n                <br>• ค่าคาดหมาย: $\\mu = E(X) = np$\n                <br>• ส่วนเบี่ยงเบนมาตรฐาน: $\\sigma = \\sqrt{np(1-p)}$\n            </li>\n        </ul>\n    </div>\n</div>\n"
        },
        {
            "title": "🔺 3. ตรีโกณมิติ & เวกเตอร์",
            "icon": "triangle",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>📐 เอกลักษณ์ตรีโกณมิติ</h4>\n        <ul>\n            <li>$\\sin^2 \\theta + \\cos^2 \\theta = 1$</li>\n            <li>$\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B$</li>\n            <li>$\\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B$</li>\n            <li>$\\sin 2A = 2\\sin A \\cos A$</li>\n            <li>$\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A$</li>\n            <li><strong>กฎของโคไซน์:</strong> $c^2 = a^2 + b^2 - 2ab\\cos C$</li>\n        </ul>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🧭 เวกเตอร์ & เมทริกซ์</h4>\n        <ul>\n            <li><strong>Dot Product:</strong> $\\vec{u} \\cdot \\vec{v} = |\\vec{u}||\\vec{v}|\\cos\\theta = u_1 v_1 + u_2 v_2 + u_3 v_3$\n                <br>• ถ้า $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$\n            </li>\n            <li><strong>Cross Product:</strong> $|\\vec{u} \\times \\vec{v}| = |\\vec{u}||\\vec{v}|\\sin\\theta$ (ได้พื้นที่สี่เหลี่ยมด้านขนาน)</li>\n            <li><strong>Matrix Inverse (2x2):</strong>\n                <br>$$A^{-1} = \\frac{1}{\\det A} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$$\n            </li>\n        </ul>\n    </div>\n</div>\n"
        },
        {
            "title": "🔢 4. ลำดับและอนุกรม (Sequences & Series)",
            "icon": "layers",
            "content": "\n<div class=\"cheat-grid\">\n    <div class=\"cheat-card\">\n        <h4>🔢 ลำดับเลขคณิต & เรขาคณิต</h4>\n        <ul>\n            <li><strong>ลำดับเลขคณิต:</strong> $a_n = a_1 + (n-1)d$\n                <br>• ผลรวม: $S_n = \\frac{n}{2}(a_1 + a_n) = \\frac{n}{2}[2a_1 + (n-1)d]$\n            </li>\n            <li><strong>ลำดับเรขาคณิต:</strong> $a_n = a_1 r^{n-1}$\n                <br>• ผลรวมจำกัด: $S_n = \\frac{a_1 (1 - r^n)}{1 - r} \\quad (r \\neq 1)$\n            </li>\n            <li><strong>อนุกรมเรขาคณิตอนันต์ ($|r| < 1$):</strong>\n                <br>$$S_\\infty = \\frac{a_1}{1 - r}$$\n            </li>\n        </ul>\n    </div>\n    <div class=\"cheat-card\">\n        <h4>🌱 ดอกเบี้ยทบต้นและมูลค่าเงินตามเวลา</h4>\n        <ul>\n            <li><strong>ดอกเบี้ยทบต้น:</strong>\n                <br>$$A = P \\left(1 + \\frac{r}{k}\\right)^{kn}$$\n                <br>($P$ เงินต้น, $r$ อัตราดอกเบี้ยต่อปี, $k$ จำนวนครั้งที่ทบต้นต่อปี, $n$ จำนวนปี)\n            </li>\n            <li><strong>มูลค่าปัจจุบัน (Present Value):</strong>\n                <br>$$P = A \\left(1 + \\frac{r}{k}\\right)^{-kn}$$\n            </li>\n        </ul>\n    </div>\n</div>\n"
        }
    ]
},
    // Add per-set question files inside database/subjects/questions/, e.g. './questions/alevel_math1_set1'
    questionFiles: [],
    legacyGenerators: ["database/seed_tcas68_math1.js","database/generators/gen_alevel_math1.js"]
};
