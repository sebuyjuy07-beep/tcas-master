/**
 * TCAS BLUEPRINT MASTER - CLIENT LOGIC
 * High-performance, reactive exam simulation & blueprint navigation
 */

// Global fetch interceptor to automatically attach Auth Bearer Token to all /api/ requests
const _originalFetch = window.fetch;
window.fetch = function (url, options = {}) {
    const token = localStorage.getItem('tcas_auth_token');
    if (token && typeof url === 'string' && url.startsWith('/api/')) {
        options.headers = options.headers || {};
        if (options.headers instanceof Headers) {
            if (!options.headers.has('Authorization')) {
                options.headers.set('Authorization', 'Bearer ' + token);
            }
        } else if (Array.isArray(options.headers)) {
            const hasAuth = options.headers.some(([k]) => k.toLowerCase() === 'authorization');
            if (!hasAuth) {
                options.headers.push(['Authorization', 'Bearer ' + token]);
            }
        } else {
            if (!options.headers['Authorization'] && !options.headers['authorization']) {
                options.headers['Authorization'] = 'Bearer ' + token;
            }
        }
    }
    return _originalFetch(url, options);
};

// ==========================================
// [Vector SVG Icons & Avatars moved to public/js/modules/icons.js]
const app = {
    // SVG & Avatar Vector Generator
    // Vector SVG & Avatar Helpers (implemented in public/js/modules/icons.js)
    svg(name, opts = {}) {
        return window.TCASIcons ? window.TCASIcons.svg(name, opts) : '';
    },

    renderAvatar(key, size = 48) {
        return window.TCASIcons ? window.TCASIcons.renderAvatar(key, size) : '';
    },

    // Current Application State
    state: {
        currentUser: null,
        authToken: localStorage.getItem('tcas_auth_token') || null,
        selectedAvatar: 'scholar-m',
        currentView: 'dashboard',
        subjects: [],
        currentSubjectId: 'tgat1',
        activeSession: null,
        currentQuestionIndex: 0,
        userAnswers: {}, // questionId -> { selected_option_id, time_spent_seconds, is_flagged }
        struckOptions: {}, // questionId -> string[] of struck optionIds
        timerInterval: null,
        timeRemainingSeconds: 0,
        examElapsedSeconds: 0,
        examPlayMode: localStorage.getItem('tcas_exam_play_mode') || 'timed', // 'timed' | 'free_roam'
        theme: localStorage.getItem('tcas_theme') || 'dark-v4', // 'dark-v4' (Espresso & Copper default) | ...
        cardStyle: localStorage.getItem('tcas_card_style') || 'classic', // 'classic' | 'dribbble'
        subjectSearchScope: 'all', // 'all' | 'name' | 'code'
        questionStartTime: 0,
        currentMistakeFilter: 'all',
        allMistakes: [],

        // Vocab Bank state
        allVocab: [],
        currentVocabFilter: 'all',
        flashcardIndex: 0,
        activeFlashcards: [],
        selectedText: '',
        selectedContext: '',
        selectedRange: null,

        // Scratchpad state
        scratchpadData: {}, // questionId -> dataURL
        scratchTool: 'pen',
        scratchColor: '#06b6d4',
        scratchStrokeSize: 2,
        isScratchDrawing: false,
        scratchGrid: true,
        highlightMode: false,

        // TCAS Master AI state
        aiCurrentQuestionId: null,
        aiCurrentSelectedOptionId: null,
        aiChatHistory: [],
        geminiApiKey: '',
        aiSavedQuestions: [],
        aiSavedFilter: 'all',
        aiCurrentQuestionData: null,

        // CEFR Vocab Quiz state
        cefrLevels: [],
        currentCefrLevel: 'B2',
        activeCefrQuiz: null,
        cefrCurrentQuestionIndex: 0,
        cefrQuizAnswers: [],
        cefrTimerInterval: null,
        cefrTimeLeftSeconds: 15,
        cefrQuizStartTime: 0,
        cefrQuizAnswered: false,
        cefrConfigLevel: 'B2',
        cefrWordCount: 10,
        cefrTimerMode: 'per_15',
        cefrRoundTimeLimitSeconds: 180,
        cefrTotalTimeElapsed: 0,

        // Mastered Questions state
        allMastered: [],
        currentMasteredSubject: 'all',

        // Subject filters
        subjectCategoryFilter: 'all',
        subjectReadyOnlyFilter: false,
        subjectSearchQuery: '',

        // TCAS Countdown & Target Faculty
        tcasCountdownTarget: 'tgat',
        tcasCountdownInterval: null,
        dreamFaculty: localStorage.getItem('tcas_dream_faculty') || 'bba',

        // CBT Exam controls
        examFontSize: localStorage.getItem('cbt_font_size') || 'md',
        isZenMode: false,
        questionStopwatchInterval: null,
        questionStopwatchSeconds: 0
    },

    // Initialization
    async init() {
        this.updateSoundUI();
        this.bindEvents();
        this.setupTextSelectionListener();
        this.initScratchpad();
        this.setupCrossWindowScratchpadSync();
        this.initAiKeyStatus();
        this.initTcasCountdown();
        this.initDreamFaculty();
        this.applyExamFontSize();
        const urlTheme = new URLSearchParams(window.location.search).get('theme');
        this.applyTheme(urlTheme || this.state.theme);
        this.initHeroShowcase();
        this.initExamSplitResizer();
        this.applyCardStyle(this.state.cardStyle);
        this.syncPlayModeUI();
        await this.initAuth();
        await this.loadSubjects();
        await this.loadDashboard();
        await this.loadVocab();
        await this.loadMastered();
        await this.loadUserStatus(true);
        await this.fetchSavedAiQuestions();
        this.renderMath();
    },

    // Event Bindings
    bindEvents() {
        // Keyboard navigation during exam
        window.addEventListener('keydown', (e) => {
            if (this.state.currentView !== 'exam' || !this.state.activeSession) return;

            // Numbers 1, 2, 3, 4, 5 to select options
            if (['1', '2', '3', '4', '5'].includes(e.key)) {
                const optIndex = parseInt(e.key, 10) - 1;
                const currentQ = this.state.activeSession.questions[this.state.currentQuestionIndex];
                if (currentQ && currentQ.options[optIndex]) {
                    this.selectOption(currentQ.options[optIndex].id);
                }
            } else if (e.key === 'ArrowRight') {
                this.nextQuestion();
            } else if (e.key === 'ArrowLeft') {
                this.prevQuestion();
            } else if (e.key.toLowerCase() === 'f') {
                this.toggleFlagCurrentQuestion();
            } else if (e.key.toLowerCase() === 'g') {
                if (!['input', 'textarea'].includes(document.activeElement?.tagName?.toLowerCase())) {
                    this.toggleQuestionPalette();
                }
            } else if (e.key === 'Escape') {
                this.toggleQuestionPalette(false);
            }

            // CEFR Quiz keyboard shortcuts (1, 2, 3, 4, Enter)
            if (this.state.currentView === 'cefr' && this.state.activeCefrQuiz) {
                if (!this.state.cefrQuizAnswered && ['1', '2', '3', '4'].includes(e.key)) {
                    this.selectCefrOption(parseInt(e.key, 10) - 1);
                } else if (this.state.cefrQuizAnswered && (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ')) {
                    e.preventDefault();
                    this.nextCefrQuestion();
                }
            }
        });

        // Modal backdrop click
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('open');
                }
            });
        });

        // Mode card radio toggle in quick start modal
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                const radio = card.querySelector('input');
                radio.checked = true;

                const bpGroup = document.getElementById('modal-blueprint-group');
                if (radio.value === 'topic_drill') {
                    bpGroup.style.display = 'block';
                } else {
                    bpGroup.style.display = 'none';
                }
            });
        });
    },

    // View Navigation
    navigate(viewName) {
        this.state.currentView = viewName;

        // Clear any lingering selection or action bubble when switching views
        const bubble = document.getElementById('selection-action-bubble');
        if (bubble) bubble.style.display = 'none';
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }

        // Update Nav Menu
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        const activeNav = document.getElementById(`nav-${viewName}`);
        if (activeNav) activeNav.classList.add('active');

        // Update Bottom Nav
        document.querySelectorAll('.bottom-nav-item').forEach(item => item.classList.remove('active'));
        const activeBottomNav = document.getElementById(`bottom-nav-${viewName}`);
        if (activeBottomNav) activeBottomNav.classList.add('active');

        // Close mobile sidebar and backdrop if open
        const sidebar = document.getElementById('main-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (sidebar && sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
        }
        if (backdrop && backdrop.classList.contains('open')) {
            backdrop.classList.remove('open');
        }

        // Update View Sections
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) targetView.classList.add('active');

        // Update Title
        const titleMap = {
            dashboard: 'แดชบอร์ดภาพรวม',
            blueprint: 'โครงสร้างข้อสอบ (Test Blueprint)',
            exam: 'ห้องสอบเสมือนจริง',
            results: 'วิเคราะห์ผลสอบและเฉลยละเอียด',
            mistakes: 'สมุดบันทึกข้อผิดพลาด (Mistake Notebook)',
            mastered: 'คลังข้อสอบที่พิชิตแล้ว (Mastered Bank)',
            vocab: 'คลังคำศัพท์และจดจำ (Vocab Bank)',
            cefr: 'ควิซคำศัพท์ตามระดับภาษา (CEFR)',
            status: 'สเตตัสตัวละครและสมรรถนะ (RPG Status)',
            add: 'เพิ่มข้อสอบเข้าคลัง / AI Prompt'
        };
        document.getElementById('view-title').textContent = titleMap[viewName] || 'TCAS Master';

        // Trigger view-specific loads
        if (viewName === 'dashboard') this.loadDashboard();
        if (viewName === 'blueprint') this.loadBlueprint(this.state.currentSubjectId);
        if (viewName === 'mistakes') this.loadMistakes();
        if (viewName === 'mastered') this.loadMastered();
        if (viewName === 'vocab') this.loadVocab();
        if (viewName === 'cefr') this.loadCefrOverview();
        if (viewName === 'status') this.loadUserStatus();
        if (viewName === 'add') this.populateAddFormSubjects();

        // Control Answer Sheet Floating Side Button
        const sideTabBtn = document.getElementById('btn-palette-side-tab');
        if (sideTabBtn) {
            sideTabBtn.style.display = (viewName === 'exam' && this.state.activeSession) ? 'flex' : 'none';
        }
        if (viewName !== 'exam') {
            this.toggleQuestionPalette(false);
            this.stopQuestionStopwatch();
            if (this.state.isZenMode) {
                this.toggleZenMode(false);
            }
        }

        // Close mobile sidebar if open
        const sb = document.getElementById('main-sidebar');
        const sbd = document.getElementById('sidebar-backdrop');
        if (sb) sb.classList.remove('mobile-open');
        if (sbd) sbd.classList.remove('open');
    },

    toggleSidebar() {
        const sb = document.getElementById('main-sidebar');
        const sbd = document.getElementById('sidebar-backdrop');
        if (sb) sb.classList.toggle('mobile-open');
        if (sbd) sbd.classList.toggle('open');
    },

    // Math Render helper using KaTeX
    renderMath() {
        if (window.renderMathInElement) {
            window.renderMathInElement(document.body, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false
            });
        }
    },

    // Toast Notification
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span style="display:inline-flex;align-items:center;margin-right:6px;">${type === 'success' ? app.svg('check-circle', { size: 18, color: '#34d399' }) : type === 'error' ? app.svg('alert-triangle', { size: 18, color: '#f43f5e' }) : type === 'warning' ? app.svg('alert-triangle', { size: 18, color: '#f59e0b' }) : app.svg('info', { size: 18, color: '#38bdf8' })}</span>
            <span>${message}</span>
        `;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 250);
        }, 3000);
    },

    // ==========================================
    // 0.5 TACTILE AUDIO & GAMIFIED FX ENGINE
    // ==========================================
    sfxMuted: localStorage.getItem('tcas_sfx_muted') === 'true',
    audioCtx: null,

    getAudioContext() {
        if (!this.audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) this.audioCtx = new AudioContextClass();
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        return this.audioCtx;
    },

    toggleSound() {
        this.sfxMuted = !this.sfxMuted;
        localStorage.setItem('tcas_sfx_muted', this.sfxMuted ? 'true' : 'false');
        this.updateSoundUI();
        if (!this.sfxMuted) this.playSfx('select');
    },

    updateSoundUI() {
        const btn = document.getElementById('btn-sound-toggle');
        const text = document.getElementById('sound-text-label');
        if (!btn) return;
        if (this.sfxMuted) {
            btn.classList.add('muted');
            if (text) text.textContent = 'เสียง: ปิด';
        } else {
            btn.classList.remove('muted');
            if (text) text.textContent = 'เสียง: เปิด';
        }
    },

    playSfx(type = 'click') {
        if (this.sfxMuted) return;
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;

            if (type === 'click') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.05);
            } else if (type === 'select') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(660, now + 0.07);
                gain.gain.setValueAtTime(0.09, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.09);
            } else if (type === 'correct') {
                [523.25, 659.25, 783.99].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.07);
                    gain.gain.setValueAtTime(0.12, now + idx * 0.07);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.16);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + idx * 0.07);
                    osc.stop(now + idx * 0.07 + 0.18);
                });
            } else if (type === 'wrong') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(190, now);
                osc.frequency.linearRampToValueAtTime(110, now + 0.14);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (type === 'level_up') {
                [440, 554.37, 659.25, 880].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.09);
                    gain.gain.setValueAtTime(0.14, now + idx * 0.09);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.25);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + idx * 0.09);
                    osc.stop(now + idx * 0.09 + 0.28);
                });
            }
        } catch (e) {
            // Audio context gesture check
        }
    },

    showFloatingExp(text = '+50 EXP', x, y) {
        const el = document.createElement('div');
        el.className = 'floating-exp-text';
        el.textContent = text;
        if (x !== undefined && y !== undefined) {
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
        } else {
            el.style.left = '50%';
            el.style.top = '40%';
            el.style.transform = 'translate(-50%, -50%)';
        }
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
    },

    launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        const W = (canvas.width = window.innerWidth);
        const H = (canvas.height = window.innerHeight);

        const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#ffffff'];
        const pieces = [];
        for (let i = 0; i < 90; i++) {
            pieces.push({
                x: W / 2 + (Math.random() - 0.5) * 260,
                y: H * 0.45,
                vx: (Math.random() - 0.5) * 14,
                vy: -(Math.random() * 13 + 6),
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 10
            });
        }

        let frames = 0;
        function render() {
            ctx.clearRect(0, 0, W, H);
            pieces.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.45;
                p.rotation += p.rSpeed;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
                ctx.restore();
            });

            frames++;
            if (frames < 75) {
                requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, W, H);
                canvas.style.display = 'none';
            }
        }
        render();
    },

    // ==========================================
    // 1. DATA LOADERS
    // ==========================================

    async loadSubjects() {
        try {
            const res = await fetch('/api/subjects');
            const data = await res.json();
            if (data.success) {
                this.state.subjects = data.data;
                this.renderSubjectCards(data.data);
                this.populateModalSubjects(data.data);
            }
        } catch (err) {
            console.error('Failed to load subjects', err);
        }
    },

    async loadDashboard() {
        try {
            const res = await fetch('/api/stats/overview');
            const result = await res.json();
            if (result.success) {
                const s = result.data;
                document.getElementById('stat-total-answered').textContent = s.total_answered;
                document.getElementById('stat-accuracy').textContent = `${s.accuracy_pct}%`;
                document.getElementById('stat-mistakes').textContent = s.total_mistakes;
                document.getElementById('stat-time-spent').textContent = `${s.total_time_spent_minutes} นาที`;
                document.getElementById('sidebar-mistakes-count').textContent = s.total_mistakes;

                this.renderRecentSessions(s.recent_sessions);
                this.renderHeroSparkline(s.recent_sessions);
            }
        } catch (err) {
            console.error('Failed to load dashboard stats', err);
        }
    },

    initHeroShowcase() {
        const params = new URLSearchParams(window.location.search);
        const heroParam = params.get('hero');
        const forestParam = params.get('forest');
        const slateParam = params.get('slate');
        const showcase = document.getElementById('hero-anim-showcase');
        const legacyBox = document.getElementById('hero-target-faculty-box');
        const rightCard = document.getElementById('hero-right-card');
        if (!showcase || !legacyBox) return;

        if (heroParam === 'off') {
            showcase.style.display = 'none';
            legacyBox.style.display = '';
            if (rightCard) rightCard.classList.remove('hero-card-seamless');
            return;
        }

        legacyBox.style.display = 'none';
        showcase.style.display = 'flex';
        if (rightCard) rightCard.classList.add('hero-card-seamless');

        // Deep Slate (dark) theme: Factory Production Line (?factory=1..4 or auto when theme === 'dark')
        const factoryParam = params.get('factory');
        if (['1', '2', '3', '4', '5'].includes(factoryParam) || (this.state.theme === 'dark' && !heroParam && !forestParam && !slateParam)) {
            const fxMode = ['1', '2', '3', '4', '5'].includes(factoryParam) ? factoryParam : '5';
            const gearPath = (n, rTip, rRoot) => {
                const step = (Math.PI * 2) / n;
                let d = '';
                for (let i = 0; i < n; i++) {
                    const a = i * step;
                    [[rRoot, a], [rTip, a + step * 0.18], [rTip, a + step * 0.42], [rRoot, a + step * 0.6]].forEach(([r, ang], j) => {
                        d += `${i === 0 && j === 0 ? 'M' : 'L'}${(r * Math.cos(ang)).toFixed(2)},${(r * Math.sin(ang)).toFixed(2)} `;
                    });
                }
                return `${d}Z`;
            };
            const gear = (x, y, n, m, dir, dur, cls = '', rot = 0) => {
                const rp = (n * m) / 2;
                const rTip = rp + m;
                const rRoot = rp - m * 1.1;
                const hub = Math.max(rp * 0.3, 5);
                const web = rRoot * 0.72;
                return `<g transform="translate(${x},${y}) rotate(${rot})"><g class="fx-gear ${dir} ${cls}" style="--dur:${dur}s;">
                    <path d="${gearPath(n, rTip, rRoot)}"/>
                    <circle r="${web.toFixed(1)}" class="fx-gear-web"/>
                    <rect x="-2" y="${(-web).toFixed(1)}" width="4" height="${(web * 2).toFixed(1)}" class="fx-gear-spoke"/>
                    <rect y="-2" x="${(-web).toFixed(1)}" height="4" width="${(web * 2).toFixed(1)}" class="fx-gear-spoke"/>
                    <circle r="${hub.toFixed(1)}" class="fx-gear-hub"/>
                    <circle r="${(hub * 0.4).toFixed(1)}" class="fx-gear-axle"/>
                </g></g>`;
            };
            const fxDefs = `<defs>
                <linearGradient id="fxMetal" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#64748b"/><stop offset="55%" stop-color="#334155"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
                <linearGradient id="fxAccent" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#818cf8"/><stop offset="100%" stop-color="#4f46e5"/></linearGradient>
                <linearGradient id="fxLiquid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#4f46e5"/></linearGradient>
            </defs>`;
            const status = (label) => `<span class="fx-status"><i></i>${label}</span>`;
            const beltHtml = () => {
                const rollers = Array.from({ length: 11 }, () => '<span class="fx-roller"></span>').join('');
                const boxes = [0, 1.5, 3, 4.5].map(d => `<span class="fx-box" style="animation-delay:-${d}s,-${d}s;"></span>`).join('');
                return `<div class="fx-floor"></div><div class="fx-rollers">${rollers}</div><div class="fx-belt"></div>${boxes}`;
            };
            const open = `<div class="fx-stage" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">`;

            if (fxMode === '5') {
                const rollers = Array.from({ length: 11 }, () => '<span class="fx-roller"></span>').join('');
                const legs = [22, 42, 62, 82].map(x => `<span class="fx5-leg" style="left:${x}%;"></span>`).join('');
                const lamps = [40, 54, 82].map(x => `
                    <div class="fx5-lamp" style="left:${x}%;">
                        <div class="fx5-lamp-cord"></div>
                        <div class="fx5-lamp-hood"></div>
                        <div class="fx5-lamp-cone"></div>
                    </div>`).join('');
                const stackLight = (pos) => `<div class="fx5-stack-light" style="${pos}"><i class="sl-r"></i><i class="sl-y"></i><i class="sl-g"></i></div>`;
                const items = [0, 2, 4, 6].map(d => `
                    <div class="fx5-item" style="--d:-${d}s;">
                        <span class="s s0"></span><span class="s s1"></span><span class="s s2"></span><span class="s s3"></span><span class="s s4"></span>
                    </div>`).join('');
                const labels = [[26, '01', 'RAW'], [40, '02', 'PRESS'], [54, '03', 'LASER'], [68, '04', 'ASSEMBLY'], [82, '05', 'QC SCAN']]
                    .map(([x, n, t]) => `<span class="fx5-label" style="left:${x}%;"><b>${n}</b>${t}</span>`).join('');
                const fd = -1.664;
                showcase.innerHTML = `${open}
                    ${status('LINE 05 · 5-STAGE ASSEMBLY')}
                    <div class="fx5-truss"></div>
                    <div class="fx5-pillar" style="left:16%;"></div>
                    <div class="fx5-pillar" style="right:2.5%;"></div>
                    ${lamps}
                    <div class="fx5-cable"></div>
                    <div class="fx-floor"></div>
                    ${legs}
                    <div class="fx-rollers">${rollers}</div>
                    <div class="fx-belt fx5-belt"></div>
                    <div class="fx5-motor"></div>
                    <svg class="fx5-drive-gears" viewBox="0 0 62 44">${fxDefs}${gear(18, 22, 12, 2.2, 'cw', 4)}${gear(44, 22, 9, 2.2, 'ccw', 3, 'accent', 15)}</svg>
                    ${items}
                    <div class="fx5-hopper"><div class="fx5-hopper-body"></div><span class="fx5-hopper-gate"></span></div>
                    <div class="fx5-exhaust" style="left:43%;"><span class="fx-steam" style="animation-delay:-0.43s;"></span></div>
                    <div class="fx-press fx5-press"><div class="fx-press-housing">${stackLight('top:-20px;right:4px;')}</div><div class="fx-piston"><span class="fx-piston-head"></span></div></div>
                    <span class="fx-spark fx5-spark-press" style="left:40%;"></span>
                    <div class="fx5-exhaust" style="left:57%;height:68px;"><span class="fx-steam" style="animation-delay:-1.05s;"></span></div>
                    <div class="fx5-laser"><div class="fx5-laser-carriage"><div class="fx5-laser-head"></div><span class="fx5-beam"></span></div>${stackLight('top:-14px;right:-4px;')}</div>
                    <div class="fx-rail fx5-rail"></div>
                    <div class="fx-robot fx5-robot" style="left:68%;">
                        <span class="fx-robot-mount"></span>
                        <div class="fx-arm1" style="animation-delay:${fd}s;">
                            <div class="fx-arm2" style="animation-delay:${fd}s;">
                                <div class="fx-grip"><i style="animation-delay:${fd}s;"></i><i style="animation-delay:${fd}s;"></i></div>
                            </div>
                        </div>
                    </div>
                    <span class="fx-spark weld fx5-weld" style="left:68%;"></span>
                    <div class="fx5-gate">${stackLight('top:-24px;right:-6px;')}</div>
                    <div class="fx5-bin"></div>
                    ${labels}
                </div>`;
                return;
            }

            if (fxMode === '1') {
                showcase.innerHTML = `${open}
                    ${status('LINE 01 · RUNNING')}
                    <svg class="fx-corner-gears" viewBox="0 0 130 90">${fxDefs}${gear(42, 45, 14, 4, 'cw', 7)}${gear(90, 45, 10, 4, 'ccw', 5, 'accent', 18)}</svg>
                    ${beltHtml()}
                    <div class="fx-press"><div class="fx-press-housing"></div><div class="fx-piston"><span class="fx-piston-head"></span></div></div>
                    <span class="fx-spark" style="left:55%;"></span>
                    <span class="fx-hud">STAMPING LINE // 01</span>
                </div>`;
            } else if (fxMode === '2') {
                showcase.innerHTML = `${open}
                    ${status('GEAR WORKS · ONLINE')}
                    <svg class="fx-gear-svg" viewBox="0 0 700 280" preserveAspectRatio="xMaxYMid slice">${fxDefs}
                        ${gear(297, 162, 28, 4, 'cw', 14)}
                        ${gear(387, 110, 24, 4, 'ccw', 12, '', 7.5)}
                        ${gear(470, 140, 20, 4, 'cw', 10, 'accent')}
                        ${gear(534, 140, 12, 4, 'ccw', 6, '', 15)}
                        ${gear(562, 92, 16, 4, 'cw', 8)}
                        ${gear(460, 199, 10, 4, 'ccw', 5, '', 18)}
                    </svg>
                    <div class="fx-gauge"><span class="fx-needle"></span></div>
                    <div class="fx-pistons">
                        <div class="fx-cyl"><span class="fx-rod"></span><span class="fx-steam"></span></div>
                        <div class="fx-cyl"><span class="fx-rod" style="animation-delay:-0.9s;"></span><span class="fx-steam" style="animation-delay:-0.9s;"></span></div>
                    </div>
                    <div class="fx-floor"></div>
                    <span class="fx-hud">GEAR WORKS // 02</span>
                </div>`;
            } else if (fxMode === '3') {
                const robot = (left, delay, flip) => `
                    <div class="fx-robot${flip ? ' flip' : ''}" style="left:${left}%;">
                        <span class="fx-robot-mount"></span>
                        <div class="fx-arm1" style="animation-delay:${delay}s;">
                            <div class="fx-arm2" style="animation-delay:${delay}s;">
                                <div class="fx-grip"><i style="animation-delay:${delay}s;"></i><i style="animation-delay:${delay}s;"></i></div>
                            </div>
                        </div>
                    </div>
                    <span class="fx-spark weld" style="left:${left}%;animation-delay:${delay}s;"></span>`;
                showcase.innerHTML = `${open}
                    ${status('ROBOTICS CELL · AUTO')}
                    <div class="fx-rail"><span class="fx-rail-beacon"></span></div>
                    ${robot(46, 0, false)}
                    ${robot(76, -1.5, true)}
                    ${beltHtml()}
                    <span class="fx-hud">ROBOTIC ASSEMBLY // 03</span>
                </div>`;
            } else {
                const winRows = [];
                [392, 414, 436, 458, 480, 502].forEach((x, i) => {
                    winRows.push(`<rect class="fx-win" x="${x}" y="190" width="10" height="8" rx="1" fill="#22d3ee" style="animation-delay:-${(i * 0.45).toFixed(2)}s;"/>`);
                    winRows.push(`<rect class="fx-win" x="${x}" y="215" width="10" height="8" rx="1" fill="#818cf8" style="animation-delay:-${(i * 0.6 + 0.3).toFixed(2)}s;"/>`);
                });
                [552, 574, 596, 618].forEach((x, i) => {
                    [140, 162, 184, 206].forEach((y, j) => {
                        winRows.push(`<rect class="fx-win" x="${x}" y="${y}" width="10" height="8" rx="1" fill="${(i + j) % 2 ? '#22d3ee' : '#a5b4fc'}" style="animation-delay:-${((i * 4 + j) * 0.37).toFixed(2)}s;"/>`);
                    });
                });
                const smoke = (cx, cy) => [0, 1.3, 2.6].map(d => `<circle class="fx-smoke" cx="${cx}" cy="${cy}" r="8" fill="rgba(148,163,184,0.35)" style="animation-delay:-${d}s;"/>`).join('');
                const pipe = (d, delay = 0) => `<path d="${d}" fill="none" stroke="#334155" stroke-width="6" stroke-linecap="round"/><path class="fx-flow" d="${d}" fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round" style="animation-delay:-${delay}s;"/>`;
                showcase.innerHTML = `${open}
                    ${status('SMART FACTORY · SYNC')}
                    <svg class="fx-skyline-svg" viewBox="0 0 700 280" preserveAspectRatio="xMaxYMax slice">${fxDefs}
                        ${smoke(306, 138)}${smoke(568, 58)}${smoke(607, 76)}
                        <rect x="250" y="190" width="110" height="60" fill="#172033" stroke="rgba(99,102,241,0.22)"/>
                        <rect x="300" y="140" width="12" height="50" fill="#334155"/>
                        <path d="M380,250 L380,170 L400,150 L400,170 L420,150 L420,170 L440,150 L440,170 L460,150 L460,170 L480,150 L480,170 L500,150 L500,170 L520,150 L520,250 Z" fill="#1e293b" stroke="rgba(99,102,241,0.3)"/>
                        <rect x="540" y="120" width="100" height="130" fill="#1e293b" stroke="rgba(99,102,241,0.3)"/>
                        <rect x="560" y="60" width="16" height="60" fill="#334155"/>
                        <rect x="600" y="78" width="14" height="42" fill="#334155"/>
                        <circle class="fx-beacon" cx="568" cy="56" r="3" fill="#f59e0b"/>
                        ${winRows.join('')}
                        <rect x="655" y="170" width="34" height="80" rx="6" fill="rgba(15,23,42,0.6)" stroke="#475569"/>
                        <rect class="fx-liquid" x="659" y="190" width="26" height="56" rx="3" fill="url(#fxLiquid)" opacity="0.85"/>
                        ${pipe('M140,244 H655', 0)}
                        ${pipe('M360,215 H380', 0.4)}
                        ${pipe('M520,185 H540', 0.8)}
                        ${pipe('M640,200 H672 V170', 1.2)}
                        <rect x="0" y="250" width="700" height="30" fill="rgba(15,23,42,0.85)"/>
                        <line x1="0" y1="250" x2="700" y2="250" stroke="rgba(99,102,241,0.3)"/>
                    </svg>
                    <span class="fx-hud">SMART FACTORY // 04</span>
                </div>`;
            }
            return;
        }

        // Legacy Deep Slate animations (only via ?slate=1..4)
        if (['1', '2', '3', '4'].includes(slateParam)) {
            const sMode = ['1', '2', '3', '4'].includes(slateParam) ? slateParam : '1';
            if (sMode === '1') {
                showcase.innerHTML = `
                    <div class="slate-stage" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                        <svg class="slate-neural-svg" viewBox="0 0 700 280" preserveAspectRatio="xMaxYMid slice">
                            <defs>
                                <linearGradient id="slateNeuralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#6366f1"/>
                                    <stop offset="50%" stop-color="#22d3ee"/>
                                    <stop offset="100%" stop-color="#a78bfa"/>
                                </linearGradient>
                            </defs>
                            <g>
                                <line class="neural-edge" x1="120" y1="145" x2="250" y2="75"/>
                                <line class="neural-edge" x1="120" y1="145" x2="270" y2="210"/>
                                <line class="neural-edge" x1="250" y1="75" x2="410" y2="120"/>
                                <line class="neural-edge" x1="250" y1="75" x2="390" y2="48"/>
                                <line class="neural-edge" x1="270" y1="210" x2="410" y2="120"/>
                                <line class="neural-edge" x1="270" y1="210" x2="440" y2="225"/>
                                <line class="neural-edge" x1="410" y1="120" x2="565" y2="80"/>
                                <line class="neural-edge" x1="410" y1="120" x2="555" y2="185"/>
                                <line class="neural-edge" x1="390" y1="48" x2="565" y2="80"/>
                                <line class="neural-edge" x1="440" y1="225" x2="555" y2="185"/>
                                <line class="neural-edge" x1="565" y1="80" x2="655" y2="135"/>
                                <line class="neural-edge" x1="555" y1="185" x2="655" y2="135"/>

                                <line class="neural-edge-flow" x1="120" y1="145" x2="250" y2="75"/>
                                <line class="neural-edge-flow" x1="250" y1="75" x2="410" y2="120" style="animation-delay:-1.2s;"/>
                                <line class="neural-edge-flow" x1="270" y1="210" x2="410" y2="120" style="animation-delay:-2.4s;"/>
                                <line class="neural-edge-flow" x1="410" y1="120" x2="565" y2="80" style="animation-delay:-0.7s;"/>
                                <line class="neural-edge-flow" x1="410" y1="120" x2="555" y2="185" style="animation-delay:-3.1s;"/>
                                <line class="neural-edge-flow" x1="565" y1="80" x2="655" y2="135" style="animation-delay:-1.9s;"/>
                            </g>
                            <circle class="neural-node indigo" cx="120" cy="145" r="4"/>
                            <circle class="neural-node" cx="250" cy="75" r="4.5" style="animation-delay:-0.8s;"/>
                            <circle class="neural-node indigo" cx="270" cy="210" r="4" style="animation-delay:-1.6s;"/>
                            <circle class="neural-node" cx="390" cy="48" r="3.5" style="animation-delay:-2.2s;"/>
                            <circle class="neural-node indigo" cx="410" cy="120" r="5.5" style="animation-delay:-0.4s;"/>
                            <circle class="neural-node" cx="440" cy="225" r="4" style="animation-delay:-2.8s;"/>
                            <circle class="neural-node" cx="565" cy="80" r="4.5" style="animation-delay:-1.1s;"/>
                            <circle class="neural-node indigo" cx="555" cy="185" r="4.5" style="animation-delay:-2.0s;"/>
                            <circle class="neural-node" cx="655" cy="135" r="5" style="animation-delay:-0.5s;"/>
                        </svg>
                        <span class="slate-hud-label">NEURAL MESH // 01</span>
                    </div>
                `;
            } else if (sMode === '2') {
                const heights = [0.45, 0.72, 0.55, 0.9, 0.65, 0.98, 0.75, 0.5, 0.85, 0.6, 0.92, 0.68, 0.48, 0.82, 0.62, 0.78, 0.52, 0.7];
                const barsHtml = heights.map((h, i) =>
                    `<span class="spec-bar" style="height:${Math.round(h * 155)}px;animation-delay:-${(i * 0.18).toFixed(2)}s;"></span>`
                ).join('');
                showcase.innerHTML = `
                    <div class="slate-stage" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                        <div class="slate-spec-wrap">${barsHtml}</div>
                        <span class="slate-hud-label">CYBER SPECTRUM // 02</span>
                    </div>
                `;
            } else if (sMode === '3') {
                showcase.innerHTML = `
                    <div class="slate-stage" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                        <div class="slate-grid-plane"></div>
                        <div class="slate-holo-diamond"></div>
                        <span class="slate-hud-label">BLUEPRINT WARP // 03</span>
                    </div>
                `;
            } else if (sMode === '4') {
                showcase.innerHTML = `
                    <div class="slate-stage" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                        <div class="slate-gyro-wrap">
                            <div class="gyro-core"></div>
                            <div class="gyro-ring g1"></div>
                            <div class="gyro-ring g2"></div>
                            <div class="gyro-ring g3"></div>
                        </div>
                        <span class="slate-hud-label">QUANTUM GYRO // 04</span>
                    </div>
                `;
            }
            return;
        }

        // Forest & Sand theme animations (?forest=1..5 or auto swaying forest when dark-v3 is active)
        if (['1', '2', '3', '4', '5'].includes(forestParam) || (this.state.theme === 'dark-v3' && !heroParam)) {
            const fMode = ['1', '2', '3', '4', '5'].includes(forestParam) ? forestParam : '5';
            if (fMode === '5') {
                showcase.innerHTML = `
                    <div class="forest-stage" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                        <div class="forest-mist-layer"></div>
                        <div class="forest-breeze-wrap">
                            <span class="breeze-line" style="top:24%;left:14%;width:150px;animation-delay:-1s;"></span>
                            <span class="breeze-line" style="top:44%;left:26%;width:190px;animation-delay:-3.8s;"></span>
                            <span class="breeze-line" style="top:64%;left:18%;width:130px;animation-delay:-5.2s;"></span>
                            <span class="breeze-leaf" style="top:30%;left:16%;animation-delay:-0.5s;"></span>
                            <span class="breeze-leaf sand" style="top:52%;left:34%;animation-delay:-4.2s;"></span>
                            <span class="breeze-leaf" style="top:22%;left:48%;animation-delay:-2.4s;"></span>
                            <span class="breeze-leaf sand" style="top:40%;left:64%;animation-delay:-6.1s;"></span>
                            <svg class="forest-canopy-svg" viewBox="0 0 760 280" preserveAspectRatio="xMaxYMax slice">
                                <!-- Back Mist Mountain Silhouette -->
                                <path d="M0,280 L0,210 Q140,155 290,198 T580,160 L760,185 L760,280 Z" fill="rgba(20, 38, 31, 0.72)"/>
                                <!-- Back Layer Trees (stretching from near text to far right) -->
                                <g class="sway-tree slow" style="animation-delay:-2.4s;">
                                    <path d="M60,275 L86,138 L112,275 Z" fill="#162e24"/>
                                    <path d="M68,215 L86,115 L104,215 Z" fill="#1a372b"/>
                                </g>
                                <g class="sway-tree slow" style="animation-delay:-1.2s;">
                                    <path d="M150,275 L180,118 L210,275 Z" fill="#173026"/>
                                    <path d="M158,205 L180,95 L202,205 Z" fill="#1c3b2e"/>
                                </g>
                                <g class="sway-tree slow" style="animation-delay:-3.1s;">
                                    <path d="M265,275 L298,96 L331,275 Z" fill="#173026"/>
                                    <path d="M274,195 L298,74 L322,195 Z" fill="#1b382d"/>
                                </g>
                                <g class="sway-tree slow" style="animation-delay:-0.6s;">
                                    <path d="M415,275 L450,88 L485,275 Z" fill="#173026"/>
                                    <path d="M425,190 L450,66 L475,190 Z" fill="#1b382d"/>
                                </g>
                                <g class="sway-tree slow" style="animation-delay:-4.0s;">
                                    <path d="M585,275 L620,96 L655,275 Z" fill="#173026"/>
                                    <path d="M595,194 L620,72 L645,194 Z" fill="#1b382d"/>
                                </g>
                                <!-- Mid Layer Trees -->
                                <g class="sway-tree med" style="animation-delay:-1.7s;">
                                    <path d="M105,278 L136,130 L167,278 Z" fill="#1e3f32"/>
                                    <path d="M114,212 L136,108 L158,212 Z" fill="#23493a"/>
                                </g>
                                <g class="sway-tree med" style="animation-delay:-2.1s;">
                                    <path d="M210,278 L244,112 L278,278 Z" fill="#1f4134"/>
                                    <path d="M220,202 L244,90 L268,202 Z" fill="#244b3c"/>
                                </g>
                                <g class="sway-tree med" style="animation-delay:-4.4s;">
                                    <path d="M340,278 L378,82 L416,278 Z" fill="#1f4134"/>
                                    <path d="M350,196 L378,58 L406,196 Z" fill="#275241"/>
                                    <path d="M360,136 L378,42 L396,136 Z" fill="#2f614d"/>
                                </g>
                                <g class="sway-tree med" style="animation-delay:-1.5s;">
                                    <path d="M500,278 L536,100 L572,278 Z" fill="#1f4134"/>
                                    <path d="M510,198 L536,76 L562,198 Z" fill="#275241"/>
                                </g>
                                <g class="sway-tree med" style="animation-delay:-3.3s;">
                                    <path d="M665,278 L702,94 L739,278 Z" fill="#1f4134"/>
                                    <path d="M675,194 L702,70 L729,194 Z" fill="#275241"/>
                                </g>
                                <!-- Front Accent Trees with Warm Sand / Sage Rim -->
                                <g class="sway-tree fast" style="animation-delay:-0.8s;">
                                    <path d="M292,280 L324,132 L356,280 Z" fill="#2a5947"/>
                                    <path d="M301,210 L324,106 L347,210 Z" fill="#326b55"/>
                                    <path d="M324,106 L347,210" stroke="rgba(230,199,156,0.35)" stroke-width="1.2"/>
                                </g>
                                <g class="sway-tree fast" style="animation-delay:-2.9s;">
                                    <path d="M445,280 L480,118 L515,280 Z" fill="#2a5947"/>
                                    <path d="M455,206 L480,92 L505,206 Z" fill="#326b55"/>
                                    <path d="M480,92 L505,206" stroke="rgba(110,231,183,0.4)" stroke-width="1.2"/>
                                </g>
                                <g class="sway-tree fast" style="animation-delay:-1.9s;">
                                    <path d="M610,280 L644,126 L678,280 Z" fill="#2a5947"/>
                                    <path d="M619,208 L644,102 L669,208 Z" fill="#326b55"/>
                                    <path d="M644,102 L669,208" stroke="rgba(230,199,156,0.32)" stroke-width="1.2"/>
                                </g>
                                <!-- Soft Ground Mist -->
                                <path d="M0,280 L0,252 Q180,232 380,254 T760,244 L760,280 Z" fill="rgba(17, 25, 22, 0.88)"/>
                            </svg>
                        </div>
                        <span class="forest-hud-label">FOREST BREEZE // 05</span>
                    </div>
                `;
            } else if (fMode === '1') {
                const fireflies = [
                    { x: 24, y: 22, s: 5, cls: 'sage', anim: 'tcasFireflyA 7s ease-in-out infinite', d: '-1s' },
                    { x: 42, y: 58, s: 6, cls: 'sand', anim: 'tcasFireflyB 8.5s ease-in-out infinite', d: '-3s' },
                    { x: 64, y: 30, s: 7, cls: 'sage', anim: 'tcasFireflyA 6.5s ease-in-out infinite', d: '-2.2s' },
                    { x: 78, y: 66, s: 5, cls: 'sand', anim: 'tcasFireflyB 9s ease-in-out infinite', d: '-4.5s' },
                    { x: 52, y: 20, s: 4, cls: 'sand', anim: 'tcasFireflyA 7.8s ease-in-out infinite', d: '-5.1s' },
                    { x: 35, y: 76, s: 6, cls: 'sage', anim: 'tcasFireflyB 8.2s ease-in-out infinite', d: '-1.8s' },
                    { x: 84, y: 38, s: 6, cls: 'sage', anim: 'tcasFireflyA 7.2s ease-in-out infinite', d: '-3.6s' },
                    { x: 58, y: 74, s: 5, cls: 'sand', anim: 'tcasFireflyB 6.8s ease-in-out infinite', d: '-0.8s' },
                    { x: 70, y: 50, s: 8, cls: 'sage', anim: 'tcasFireflyA 9.5s ease-in-out infinite', d: '-6s' },
                    { x: 46, y: 42, s: 4, cls: 'sand', anim: 'tcasFireflyB 7.5s ease-in-out infinite', d: '-2.7s' },
                    { x: 88, y: 78, s: 5, cls: 'sage', anim: 'tcasFireflyA 8.8s ease-in-out infinite', d: '-4s' },
                    { x: 28, y: 46, s: 4, cls: 'sand', anim: 'tcasFireflyB 9.2s ease-in-out infinite', d: '-5.5s' }
                ];
                const dotsHtml = fireflies.map(f =>
                    `<span class="firefly-dot ${f.cls}" style="left:${f.x}%;top:${f.y}%;width:${f.s}px;height:${f.s}px;animation:${f.anim};animation-delay:${f.d};"></span>`
                ).join('');
                showcase.innerHTML = `
                    <div class="forest-stage" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                        <div class="forest-mist-layer"></div>
                        ${dotsHtml}
                        <span class="forest-hud-label">FOREST FIREFLIES // 01</span>
                    </div>
                `;
            } else if (fMode === '2') {
                showcase.innerHTML = `
                    <div class="forest-stage" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                        <div class="forest-aurora-ribbon"></div>
                        <div class="forest-dunes-viewport">
                            <svg class="forest-dune-track dune-3" viewBox="0 0 1200 185" preserveAspectRatio="none">
                                <path d="M0,105 C180,65 360,135 540,95 C720,55 900,135 1200,95 L1200,185 L0,185 Z" fill="rgba(52,211,153,0.12)"/>
                                <path d="M0,105 C180,65 360,135 540,95 C720,55 900,135 1200,95" fill="none" stroke="rgba(110,231,183,0.45)" stroke-width="1.5"/>
                            </svg>
                            <svg class="forest-dune-track dune-2" viewBox="0 0 1200 185" preserveAspectRatio="none">
                                <path d="M0,125 C200,160 400,85 600,125 C800,160 1000,85 1200,125 L1200,185 L0,185 Z" fill="rgba(230,199,156,0.12)"/>
                                <path d="M0,125 C200,160 400,85 600,125 C800,160 1000,85 1200,125" fill="none" stroke="rgba(230,199,156,0.5)" stroke-width="1.6"/>
                            </svg>
                            <svg class="forest-dune-track dune-1" viewBox="0 0 1200 185" preserveAspectRatio="none">
                                <path d="M0,145 C150,115 300,168 450,140 C600,112 750,168 900,140 C1050,112 1150,155 1200,145 L1200,185 L0,185 Z" fill="rgba(16,185,129,0.16)"/>
                                <path d="M0,145 C150,115 300,168 450,140 C600,112 750,168 900,140 C1050,112 1150,155 1200,145" fill="none" stroke="#34d399" stroke-width="2"/>
                            </svg>
                        </div>
                        <span class="forest-hud-label">ZEN DUNES &amp; AURORA // 02</span>
                    </div>
                `;
            } else if (fMode === '3') {
                showcase.innerHTML = `
                    <div class="forest-stage" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                        <div class="forest-astrolabe-plane">
                            <div class="astrolabe-core"></div>
                            <div class="astrolabe-ring r1"><span class="astrolabe-node sand"></span></div>
                            <div class="astrolabe-ring r2"><span class="astrolabe-node sage"></span></div>
                            <div class="astrolabe-ring r3"><span class="astrolabe-node sand"></span></div>
                        </div>
                        <span class="forest-hud-label">BOTANICAL ASTROLABE // 03</span>
                    </div>
                `;
            } else if (fMode === '4') {
                showcase.innerHTML = `
                    <div class="forest-stage" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                        <div class="forest-pond-plane">
                            <div class="pond-dewdrop"></div>
                            <div class="pond-ripple rip-1"></div>
                            <div class="pond-ripple rip-2"></div>
                            <div class="pond-ripple rip-3"></div>
                            <div class="pond-ripple rip-4"></div>
                        </div>
                        <span class="forest-hud-label">ZEN POND RIPPLES // 04</span>
                    </div>
                `;
            }
            return;
        }

        const heroMode = ['1', '2', '3', '4'].includes(heroParam) ? heroParam : '1';

        if (heroMode === '1') {
            showcase.innerHTML = `
                <div class="solar-stage solar-mode-1" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                    <div class="solar-plane">
                        <div class="solar-sun"></div>
                        <div class="solar-orbit orbit-1"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-orbit orbit-2"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-orbit orbit-3"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-orbit orbit-4"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-orbit orbit-5"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-orbit orbit-6"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-orbit orbit-7"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-orbit orbit-8"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                    </div>
                    <span class="solar-hud-label">SOLAR SYSTEM // 8 PLANETS</span>
                </div>
            `;
        } else if (heroMode === '2') {
            showcase.innerHTML = `
                <div class="solar-stage solar-mode-2" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                    <div class="solar-flare-beam"></div>
                    <div class="solar-plane">
                        <div class="solar-sun"></div>
                        <div class="solar-orbit orbit-a"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-orbit orbit-b"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-orbit orbit-c"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                    </div>
                    <span class="solar-hud-label">ECLIPTIC HORIZON // 02</span>
                </div>
            `;
        } else if (heroMode === '3') {
            showcase.innerHTML = `
                <div class="solar-stage solar-mode-3" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                    <div class="solar-plane">
                        <div class="solar-sun"></div>
                        <div class="solar-orbit orbit-a"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-orbit orbit-b"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-orbit orbit-c"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                    </div>
                    <span class="solar-hud-label">HOLOGRAPHIC ORBIT // 03</span>
                </div>
            `;
        } else if (heroMode === '4') {
            showcase.innerHTML = `
                <div class="solar-stage solar-mode-4" onclick="app.openQuickStartModal()" title="คลิกเพื่อเริ่มฝึกซ้อม">
                    <div class="solar-plane">
                        <div class="solar-binary-core">
                            <div class="solar-binary-star-a"></div>
                            <div class="solar-binary-star-b"></div>
                        </div>
                        <div class="solar-orbit orbit-a"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                        <div class="solar-asteroid-belt"></div>
                        <div class="solar-orbit orbit-b"><div class="solar-planet-anchor"><div class="solar-planet"></div></div></div>
                    </div>
                    <span class="solar-hud-label">BINARY SYSTEM // 04</span>
                </div>
            `;
        }
    },

    // ==========================================
    // DRIBBBLE THEME, CARD STYLE & SPARKLINE HELPERS
    // ==========================================
    toggleTheme() {
        this.playSfx('select');
        const order = ['dark-v4', 'dark-v3', 'dark'];
        const currentIdx = order.indexOf(this.state.theme);
        const nextTheme = order[(currentIdx + 1) % order.length];
        this.applyTheme(nextTheme);

        const toastMessages = {
            'dark-v4': 'ธีม: เอสเปรสโซ-ทองแดง (Espresso & Copper)',
            'dark-v3': 'ธีม: เขียวป่าลึก-ทรายอุ่น (Deep Forest & Warm Sand)',
            'dark': 'ธีม: Deep Slate Dark (โหมดเดิม)'
        };
        this.showToast(toastMessages[nextTheme] || toastMessages['dark-v4'], 'info');
    },

    applyTheme(theme) {
        const validThemes = ['dark-v4', 'dark-v3', 'dark'];
        const resolved = validThemes.includes(theme) ? theme : 'dark-v4';
        this.state.theme = resolved;
        localStorage.setItem('tcas_theme', resolved);
        document.body.classList.remove(
            'theme-dark', 'theme-light', 'theme-claude-light', 'theme-claude-dark',
            'theme-claude-v1', 'theme-claude-v2', 'theme-claude-v3', 'theme-claude-v4',
            'theme-dark-v1', 'theme-dark-v2', 'theme-dark-v3', 'theme-dark-v4'
        );
        document.body.classList.add(`theme-${resolved}`);

        const iconEl = document.getElementById('theme-icon-svg');
        const labelEl = document.getElementById('theme-text-label');
        const moonSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
        const editorialSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/></svg>';

        if (iconEl) {
            iconEl.innerHTML = resolved === 'dark' ? moonSvg : editorialSvg;
        }
        if (labelEl) {
            const labels = {
                'dark-v4': 'ธีม: เอสเปรสโซ',
                'dark-v3': 'ธีม: เขียวป่า-ทราย',
                'dark': 'ธีม: Dark'
            };
            labelEl.textContent = labels[resolved] || 'ธีม: เอสเปรสโซ';
        }
        this.initHeroShowcase();
    },

    setCardStyle(style) {
        this.playSfx('select');
        this.applyCardStyle(style);
        this.showToast(
            style === 'dribbble'
                ? 'เปิดมุมมอง Clean Hover (ชี้การ์ดเพื่อแสดงปุ่ม)'
                : 'สลับเป็นมุมมองการ์ดเดิม (แสดงปุ่มครบทุกใบ)',
            'info'
        );
    },

    applyCardStyle(style) {
        const resolved = style === 'dribbble' ? 'dribbble' : 'classic';
        this.state.cardStyle = resolved;
        localStorage.setItem('tcas_card_style', resolved);

        const grid = document.getElementById('subjects-container');
        if (grid) {
            grid.classList.toggle('mode-clean-hover', resolved === 'dribbble');
        }
        document.querySelectorAll('.card-style-pill').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-card-style') === resolved);
        });
    },

    openFreeRoamQuickStart() {
        this.setExamPlayMode('free_roam');
        this.openQuickStartModal();
    },

    renderHeroSparkline(sessions) {
        const svgWrap = document.getElementById('hero-sparkline-svg');
        const badgeEl = document.getElementById('hero-sparkline-badge');
        if (!svgWrap || !badgeEl) return;

        const completed = Array.isArray(sessions) ? [...sessions].reverse() : [];
        if (completed.length === 0) {
            badgeEl.textContent = 'ยังไม่มีประวัติสอบ';
            badgeEl.style.color = '';
            svgWrap.innerHTML = `
                <svg viewBox="0 0 240 46" preserveAspectRatio="none">
                    <line x1="4" y1="36" x2="236" y2="36" stroke="rgba(148, 163, 184, 0.35)" stroke-width="2" stroke-dasharray="4 4" />
                    <circle cx="234" cy="36" r="3" fill="#64748b" />
                </svg>
            `;
            return;
        }

        const scores = completed.map(s => {
            const maxS = Number(s.max_score) || 100;
            const pct = Math.round(((Number(s.score_earned) || 0) / maxS) * 100);
            return Math.max(0, Math.min(100, pct));
        });

        // If only 1 session exists, duplicate it cleanly so a flat trend line draws across
        const plotPts = scores.length === 1 ? [scores[0], scores[0]] : scores;
        const W = 240;
        const H = 46;
        const padX = 6;
        const padY = 6;

        const coords = plotPts.map((val, idx) => {
            const x = padX + (idx / (plotPts.length - 1)) * (W - padX * 2);
            const y = (H - padY) - (val / 100) * (H - padY * 2);
            return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)), val };
        });

        const polylineStr = coords.map(c => `${c.x},${c.y}`).join(' ');
        const areaStr = `${coords[0].x},${H} ${polylineStr} ${coords[coords.length - 1].x},${H}`;
        const latest = scores[scores.length - 1];
        const prev = scores.length > 1 ? scores[scores.length - 2] : latest;
        const delta = latest - prev;
        const deltaStr = scores.length > 1 ? (delta >= 0 ? ` (+${delta}%)` : ` (${delta}%)`) : '';

        badgeEl.textContent = `ล่าสุด ${latest}%${deltaStr}`;
        badgeEl.style.color = delta >= 0 ? '#34d399' : '#fb7185';

        svgWrap.innerHTML = `
            <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="heroSparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.38" />
                        <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.0" />
                    </linearGradient>
                </defs>
                <polygon points="${areaStr}" fill="url(#heroSparkGrad)" />
                <polyline points="${polylineStr}" fill="none" stroke="#22d3ee" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                ${coords.map((c, i) => `<circle cx="${c.x}" cy="${c.y}" r="${i === coords.length - 1 ? 3.8 : 2.3}" fill="${i === coords.length - 1 ? '#34d399' : '#38bdf8'}"><title>${c.val}%</title></circle>`).join('')}
            </svg>
        `;
    },

    // [RPG Card, Level Tiers & Radar moved to public/js/modules/rpg-card.js]

    getSubjectGroupCategory(sub) {
        if (sub.category === 'TGAT') return 'TGAT';
        if (sub.category === 'TPAT') return 'TPAT';
        if (sub.category === 'A_LEVEL') {
            const mathSci = ['alevel_math1', 'alevel_math2', 'alevel_sci', 'alevel_phy', 'alevel_chem', 'alevel_bio'];
            if (mathSci.includes(sub.id)) return 'ALEVEL_MATH_SCI';
            const humanities = ['alevel_thai', 'alevel_soc', 'alevel_eng'];
            if (humanities.includes(sub.id)) return 'ALEVEL_HUMANITIES';
            return 'ALEVEL_LANG';
        }
        return 'OTHER';
    },

    getSubjectThemeClass(sub) {
        const group = this.getSubjectGroupCategory(sub);
        switch (group) {
            case 'TGAT': return 'card-theme-tgat';
            case 'TPAT': return 'card-theme-tpat';
            case 'ALEVEL_MATH_SCI': return 'card-theme-mathsci';
            case 'ALEVEL_HUMANITIES': return 'card-theme-humanities';
            case 'ALEVEL_LANG': return 'card-theme-languages';
            default: return '';
        }
    },

    setSubjectCategoryFilter(category) {
        this.state.subjectCategoryFilter = category;
        document.querySelectorAll('#subject-category-tabs .cat-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.cat === category);
        });
        this.renderSubjectCards(this.state.subjects);
    },

    toggleReadyOnlyFilter(isReadyOnly) {
        this.state.subjectReadyOnlyFilter = !!isReadyOnly;
        this.renderSubjectCards(this.state.subjects);
    },

    handleSubjectSearch(query) {
        this.state.subjectSearchQuery = (query || '').trim().toLowerCase();
        this.renderSubjectCards(this.state.subjects);
    },

    handleSubjectSearchScope(scope) {
        this.state.subjectSearchScope = scope || 'all';
        this.renderSubjectCards(this.state.subjects);
    },

    resetSubjectFilters() {
        this.state.subjectCategoryFilter = 'all';
        this.state.subjectReadyOnlyFilter = false;
        this.state.subjectSearchQuery = '';
        this.state.subjectSearchScope = 'all';

        document.querySelectorAll('#subject-category-tabs .cat-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.cat === 'all');
        });
        const toggle = document.getElementById('toggle-ready-only');
        if (toggle) toggle.checked = false;
        const searchInput = document.getElementById('subject-search-input');
        if (searchInput) searchInput.value = '';
        const scopeSel = document.getElementById('subject-search-scope');
        if (scopeSel) scopeSel.value = 'all';

        this.renderSubjectCards(this.state.subjects);
    },

    // ==========================================
    // TCAS68 COUNTDOWN & DREAM FACULTY HUB
    // ==========================================

    initTcasCountdown() {
        if (this.state.tcasCountdownInterval) {
            clearInterval(this.state.tcasCountdownInterval);
            this.state.tcasCountdownInterval = null;
        }
        const daysEl = document.getElementById('cd-days');
        if (!daysEl) return;
        this.updateCountdownDisplay();
        this.state.tcasCountdownInterval = setInterval(() => {
            this.updateCountdownDisplay();
        }, 1000);
    },

    switchCountdownTarget(target) {
        this.state.tcasCountdownTarget = target;
        const tabTgat = document.getElementById('tab-cd-tgat');
        const tabAlevel = document.getElementById('tab-cd-alevel');
        if (tabTgat && tabAlevel) {
            if (target === 'tgat') {
                tabTgat.classList.add('active');
                tabAlevel.classList.remove('active');
            } else {
                tabTgat.classList.remove('active');
                tabAlevel.classList.add('active');
            }
        }
        this.updateCountdownDisplay();
    },

    updateCountdownDisplay() {
        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minsEl = document.getElementById('cd-mins');
        const secsEl = document.getElementById('cd-secs');
        if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

        const now = new Date();
        const currentYear = now.getFullYear();

        // Target: TGAT/TPAT in early December, A-Level in late March
        let targetDate;
        if (this.state.tcasCountdownTarget === 'tgat') {
            targetDate = new Date(currentYear, 11, 7, 9, 0, 0); // Dec 7
            if (now > targetDate) {
                targetDate = new Date(currentYear + 1, 11, 7, 9, 0, 0);
            }
        } else {
            targetDate = new Date(currentYear, 2, 21, 9, 0, 0); // Mar 21
            if (now > targetDate) {
                targetDate = new Date(currentYear + 1, 2, 21, 9, 0, 0);
            }
        }

        const diffMs = Math.max(0, targetDate.getTime() - now.getTime());
        const totalSecs = Math.floor(diffMs / 1000);

        const days = Math.floor(totalSecs / 86400);
        const hours = Math.floor((totalSecs % 86400) / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(mins).padStart(2, '0');
        secsEl.textContent = String(secs).padStart(2, '0');
    },

    initDreamFaculty() {
        const savedFaculty = localStorage.getItem('tcas_dream_faculty') || 'bba';
        this.state.dreamFaculty = savedFaculty;
        const selectEl = document.getElementById('dream-faculty-select');
        if (selectEl) {
            selectEl.value = savedFaculty;
        }
        this.updateDreamFacultyReadiness(savedFaculty);
    },

    saveDreamFaculty(key) {
        this.state.dreamFaculty = key;
        localStorage.setItem('tcas_dream_faculty', key);
        this.updateDreamFacultyReadiness(key);

        const facultyNames = {
            med: 'คณะแพทยศาสตร์ / ทันตแพทย์',
            eng: 'คณะวิศวกรรมศาสตร์',
            bba: 'คณะพาณิชยศาสตร์ / บัญชี-บริหาร',
            comm: 'คณะนิเทศศาสตร์ / วารสารฯ',
            law: 'คณะนิติศาสตร์ / รัฐศาสตร์',
            arch: 'คณะสถาปัตยกรรมศาสตร์',
            sci: 'คณะวิทยาศาสตร์ / ไอที',
            arts: 'คณะอักษรฯ / มนุษยศาสตร์ / ศิลปศาสตร์'
        };
        this.showToast(`🎯 บันทึกเป้าหมาย ${facultyNames[key] || 'คณะในฝัน'} เรียบร้อย!`, 'success');
    },

    updateDreamFacultyReadiness(key = this.state.dreamFaculty) {
        const pctEl = document.getElementById('target-readiness-pct');
        const barEl = document.getElementById('target-readiness-bar');
        if (!pctEl || !barEl) return;

        const facultyConfig = {
            med: { targetAcc: 85, targetQ: 200, basePct: 58 },
            eng: { targetAcc: 78, targetQ: 150, basePct: 65 },
            bba: { targetAcc: 74, targetQ: 120, basePct: 70 },
            comm: { targetAcc: 68, targetQ: 90, basePct: 75 },
            law: { targetAcc: 72, targetQ: 100, basePct: 72 },
            arch: { targetAcc: 70, targetQ: 90, basePct: 70 },
            sci: { targetAcc: 72, targetQ: 110, basePct: 72 },
            arts: { targetAcc: 74, targetQ: 100, basePct: 74 }
        };

        const cfg = facultyConfig[key] || facultyConfig.bba;

        let calcPct = cfg.basePct;
        if (this.state.currentUser && this.state.currentUser.total_questions_answered > 0) {
            const acc = this.state.currentUser.overall_accuracy_pct || 65;
            const qCount = this.state.currentUser.total_questions_answered || 10;
            const accFactor = (acc / cfg.targetAcc) * 0.6;
            const volumeFactor = Math.min(1.0, qCount / cfg.targetQ) * 0.4;
            calcPct = Math.round((accFactor + volumeFactor) * 100);
            calcPct = Math.max(35, Math.min(99, calcPct));
        }

        pctEl.textContent = `${calcPct}%`;
        barEl.style.width = `${calcPct}%`;

        if (calcPct >= 80) {
            barEl.style.background = 'linear-gradient(90deg, #10b981, #06b6d4)';
        } else if (calcPct >= 60) {
            barEl.style.background = 'linear-gradient(90deg, #6366f1, #06b6d4)';
        } else {
            barEl.style.background = 'linear-gradient(90deg, #f59e0b, #ef4444)';
        }
    },

    renderSubjectCards(subjects) {
        const container = document.getElementById('subjects-container');
        if (!subjects || subjects.length === 0) {
            if (container) container.innerHTML = '<div class="empty-state">ไม่พบข้อมูลวิชา</div>';
            return;
        }

        // Update category tab badges
        const bAll = document.getElementById('tab-badge-all');
        const bTgat = document.getElementById('tab-badge-tgat');
        const bTpat = document.getElementById('tab-badge-tpat');
        const bMathSci = document.getElementById('tab-badge-mathsci');
        const bHumanities = document.getElementById('tab-badge-humanities');
        const bLanguages = document.getElementById('tab-badge-languages');

        if (bAll) bAll.textContent = subjects.length;
        if (bTgat) bTgat.textContent = subjects.filter(s => s.category === 'TGAT').length;
        if (bTpat) bTpat.textContent = subjects.filter(s => s.category === 'TPAT').length;
        if (bMathSci) bMathSci.textContent = subjects.filter(s => this.getSubjectGroupCategory(s) === 'ALEVEL_MATH_SCI').length;
        if (bHumanities) bHumanities.textContent = subjects.filter(s => this.getSubjectGroupCategory(s) === 'ALEVEL_HUMANITIES').length;
        if (bLanguages) bLanguages.textContent = subjects.filter(s => this.getSubjectGroupCategory(s) === 'ALEVEL_LANG').length;

        // Apply filters
        let filtered = [...subjects];

        if (this.state.subjectCategoryFilter !== 'all') {
            filtered = filtered.filter(s => this.getSubjectGroupCategory(s) === this.state.subjectCategoryFilter);
        }

        if (this.state.subjectReadyOnlyFilter) {
            filtered = filtered.filter(s => s.status === 'ready' || s.total_db_questions > 0);
        }

        if (this.state.subjectSearchQuery) {
            const q = this.state.subjectSearchQuery.toLowerCase();
            const scope = this.state.subjectSearchScope || 'all';
            filtered = filtered.filter(s => {
                const matchName = (s.name_th && s.name_th.toLowerCase().includes(q)) || (s.name_en && s.name_en.toLowerCase().includes(q));
                const matchCode = s.code && s.code.toLowerCase().includes(q);
                const matchDesc = s.description && s.description.toLowerCase().includes(q);
                if (scope === 'name') return matchName;
                if (scope === 'code') return matchCode;
                return matchName || matchCode || matchDesc;
            });
        }

        if (filtered.length === 0) {
            if (container) {
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1; padding: 3rem 1.5rem; text-align: center;">
                        <div style="display:flex;justify-content:center;margin-bottom: 0.5rem;">${this.svg('target', {size: 36, color: 'var(--accent-indigo)'})}</div>
                        <h4 style="margin-bottom: 0.5rem; color: #f8fafc;">ไม่พบวิชาที่ตรงกับเงื่อนไขการค้นหา</h4>
                        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">ลองเปลี่ยนหมวดหมู่ ปิดตัวกรองพร้อมสอบ หรือใช้คำค้นหาอื่น</p>
                        <button class="btn btn-outline btn-sm" onclick="app.resetSubjectFilters()">รีเซ็ตตัวกรองทั้งหมด</button>
                    </div>
                `;
            }
            return;
        }

        if (!container) return;

        container.innerHTML = filtered.map(sub => {
            const catClass = `cat-${sub.category.toLowerCase().replace('_', '')}`;
            const themeClass = this.getSubjectThemeClass(sub);
            const isComingSoon = sub.status === 'coming_soon' || (sub.total_db_questions === 0 && !['tgat1', 'tgat2', 'tgat3'].includes(sub.id));
            const dbTotal = Number(sub.total_db_questions) || 0;
            const masteredCount = Number(sub.mastered_count) || 0;
            const masteredPct = dbTotal > 0 ? Math.min(100, Math.round((masteredCount / dbTotal) * 100)) : 0;

            return `
                <div class="subject-card ${themeClass} ${isComingSoon ? 'is-coming-soon' : ''}">
                    ${isComingSoon ? '<div class="subject-ribbon-red">กำลังจัดทำ</div>' : ''}
                    <div>
                        <div class="subject-top">
                            <span class="subject-cat-badge ${catClass}">${sub.category}</span>
                            <span class="subject-code">รหัส ${sub.code}</span>
                            ${isComingSoon ? '<span class="badge-status-danger">เตรียมข้อสอบ</span>' : '<span class="badge-counter" style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 0.75rem;">พร้อมสอบจริง</span>'}
                        </div>
                        <h4 class="subject-name-th">${sub.name_th}</h4>
                        <div class="subject-name-en">${sub.name_en}</div>
                        <p class="subject-desc">${sub.description}</p>
                        ${!isComingSoon ? `
                            <div class="subject-progress-wrap">
                                <div class="subject-progress-labels">
                                    <span>พิชิตแล้ว ${masteredCount}/${dbTotal} ข้อ</span>
                                    <strong>${masteredPct}%</strong>
                                </div>
                                <div class="subject-progress-track">
                                    <div class="subject-progress-fill" style="width: ${masteredPct}%;"></div>
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <div>
                        <div class="subject-hover-hint">
                            <span>${this.state.examPlayMode === 'free_roam' ? `${this.svg('infinity', {size: 13})} Free Roam + AI` : `${this.svg('clock', {size: 13})} ${sub.duration_minutes} นาที • ${sub.total_questions} ข้อ`}</span>
                            <span style="color: var(--primary-light); font-weight: 600;">ชี้เพื่อดูเมนูสอบ →</span>
                        </div>
                        <div class="subject-hover-drawer">
                            <div class="subject-meta-chips">
                                <span class="meta-chip subject-time-chip" data-duration="${sub.duration_minutes}">${this.state.examPlayMode === 'free_roam' ? `${this.svg('infinity', {size: 13})} ไม่จับเวลา + AI` : `${this.svg('clock', {size: 13})} ${sub.duration_minutes} นาที`}</span>
                                <span class="meta-chip">${this.svg('file-text', {size: 13})} ${sub.total_questions} ข้อ</span>
                                <span class="meta-chip">${this.svg('award', {size: 13})} ${sub.total_score} คะแนน</span>
                                <span class="meta-chip">${this.svg('package', {size: 13})} ${sub.total_db_questions} ข้อในคลัง</span>
                            </div>

                            <div class="subject-actions">
                                ${isComingSoon ? `
                                    <button class="btn btn-secondary btn-sm" onclick="app.showComingSoonToast('${this.escapeHtml(sub.name_th)}')" style="opacity: 0.8; border-color: rgba(239, 68, 68, 0.4); color: #fca5a5;" title="อยู่ระหว่างจัดทำข้อสอบ">
                                        ${this.svg('clock', {size: 13})} เร็วๆ นี้
                                    </button>
                                ` : `
                                    <button class="btn btn-primary btn-sm" onclick="app.onFullMockClick('${sub.id}', ${sub.total_db_questions || 0}, ${sub.total_questions || 60})">
                                        ${this.svg('target', {size: 14})} Full Mock ${sub.total_db_questions > sub.total_questions ? `<span style="font-size: 0.75rem; opacity: 0.9; margin-left: 2px;">(${Math.floor(sub.total_db_questions / sub.total_questions)} ชุด)</span>` : ''}
                                    </button>
                                `}
                                <button class="btn btn-secondary btn-sm" onclick="app.openBlueprintView('${sub.id}')">
                                    ${this.svg('clipboard', {size: 14})} Blueprint
                                </button>
                                <button class="btn btn-warning btn-sm" onclick="app.openCheatSheetModal('${sub.id}')" title="ดูสรุปสูตร & แนวข้อสอบ">
                                    ${this.svg('book', {size: 14})} สรุปสูตร
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    renderRecentSessions(sessions) {
        const container = document.getElementById('recent-sessions-container');
        if (!sessions || sessions.length === 0) {
            container.innerHTML = '<div class="empty-state">ยังไม่มีประวัติการทำข้อสอบ เลือกลองทำชุดแรกดูเลย!</div>';
            return;
        }

        container.innerHTML = sessions.map(sess => {
            const dateStr = new Date(sess.finished_at).toLocaleString('th-TH', {
                dateStyle: 'short',
                timeStyle: 'short'
            });
            const minutes = Math.floor(sess.time_spent_seconds / 60);
            const seconds = sess.time_spent_seconds % 60;
            const timeStr = `${minutes}m ${seconds}s`;

            return `
                <div class="session-row">
                    <div>
                        <div class="session-subj">${sess.subject_name} (${sess.session_type === 'full_mock' ? 'Full Mock' : 'Topic Drill'})${sess.is_free_roam ? ` <span class="badge-freeroam-pill">${this.svg('infinity', {size: 11})} Free Roam</span>` : ''}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">${dateStr} • ใช้เวลา ${timeStr}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span class="session-score">${sess.score_earned} / ${sess.max_score} คะแนน</span>
                        <button class="btn btn-outline btn-sm" onclick="app.viewPastSessionReview('${sess.id}')">ดูเฉลย</button>
                    </div>
                </div>
            `;
        }).join('');
    },

    // ==========================================
    // 2. BLUEPRINT EXPLORER
    // ==========================================

    openBlueprintView(subjectId) {
        this.state.currentSubjectId = subjectId;
        this.navigate('blueprint');
    },

    async loadBlueprint(subjectId) {
        try {
            this.state.currentSubjectId = subjectId;
            const res = await fetch(`/api/subjects/${subjectId}`);
            const data = await res.json();
            if (!data.success) return;

            const sub = data.data;

            // Render Tabs
            const tabsContainer = document.getElementById('blueprint-tabs');
            tabsContainer.innerHTML = this.state.subjects.map(s => `
                <button class="blueprint-tab ${s.id === subjectId ? 'active' : ''}" onclick="app.loadBlueprint('${s.id}')">
                    ${s.code} ${s.name_th.split(' ')[0]}
                </button>
            `).join('');

            // Render Summary Box
            const summaryBox = document.getElementById('blueprint-summary-box');
            summaryBox.innerHTML = `
                <div>
                    <h3 class="blueprint-summary-title">${sub.name_th} (${sub.name_en})</h3>
                    <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.2rem;">
                        ${sub.description}
                    </p>
                </div>
                <div class="blueprint-summary-badges">
                    <span class="meta-chip">ข้อสอบทั้งหมด ${sub.total_questions} ข้อ</span>
                    <span class="meta-chip">เวลา ${sub.duration_minutes} นาที</span>
                    <span class="meta-chip">คะแนนเต็ม ${sub.total_score} คะแนน</span>
                </div>
            `;

            // Render Domains
            const domainsList = document.getElementById('blueprint-domains-list');
            if (!sub.blueprints || sub.blueprints.length === 0) {
                domainsList.innerHTML = '<div class="empty-state">ไม่มีข้อมูลพาร์ทในวิชานี้</div>';
                return;
            }

            domainsList.innerHTML = sub.blueprints.map((bp, idx) => `
                <div class="domain-card">
                    <div class="domain-card-header">
                        <div style="display: flex; align-items: flex-start;">
                            <span class="editorial-step-num">${String(idx + 1).padStart(2, '0')}</span>
                            <div>
                                <div class="domain-name">${bp.domain_name}</div>
                                <div class="domain-subtopic">${bp.subtopic_name}</div>
                            </div>
                        </div>
                        <div class="domain-metrics">
                            <span class="meta-chip" style="color: var(--accent-cyan);">เป้าหมาย ทปอ.: ${bp.target_questions} ข้อ</span>
                            <span class="meta-chip" style="color: var(--accent-emerald);">น้ำหนัก: ${bp.score_weight}%</span>
                        </div>
                    </div>

                    <p class="domain-desc">${bp.description}</p>

                    <div class="domain-footer">
                        <span class="domain-q-count">
                            ${this.svg('book', {size: 14})} มีข้อสอบในระบบแล้ว: <strong>${bp.current_question_count} ข้อ</strong>
                        </span>
                        <button class="btn btn-outline btn-sm" onclick="app.startExam('${sub.id}', 'topic_drill', '${bp.id}')">
                            ${this.svg('target', {size: 14})} เจาะข้อสอบพาร์ทนี้ (${bp.current_question_count} ข้อ)
                        </button>
                    </div>
                </div>
            `).join('');

        } catch (err) {
            console.error('Failed to load blueprint details', err);
        }
    },

    // ==========================================
    // 3. EXAM SIMULATOR & SET SELECTION
    // ==========================================

    onFullMockClick(subjectId, totalDbQuestions, totalQuestions) {
        if (totalDbQuestions > totalQuestions) {
            this.openSetModal(subjectId);
        } else {
            this.startExam(subjectId, 'full_mock');
        }
    },

    async openSetModal(subjectId) {
        const modal = document.getElementById('exam-set-modal');
        const contentEl = document.getElementById('set-modal-content');
        const badgeEl = document.getElementById('set-modal-badge');
        const titleEl = document.getElementById('set-modal-title');
        const descEl = document.getElementById('set-modal-desc');

        if (!modal) return;
        modal.classList.add('open');

        const subject = this.state.subjects.find(s => s.id === subjectId) || { id: subjectId, name_th: subjectId, code: subjectId };
        if (badgeEl) badgeEl.textContent = subject.code || 'TCAS';
        if (titleEl) titleEl.textContent = `เลือกชุดข้อสอบ ${subject.name_th}`;
        if (descEl) descEl.textContent = `มีข้อสอบพร้อมสอบ ${subject.total_db_questions || 0} ข้อ จัดแบ่งเป็นชุดมาตรฐานละ ${subject.total_questions || 60} ข้อ`;

        if (contentEl) {
            contentEl.innerHTML = '<div style="text-align:center; padding: 2.5rem; color: var(--text-muted);">⏳ กำลังโหลดรายการชุดข้อสอบ...</div>';
        }

        try {
            const res = await fetch(`/api/subjects/${subjectId}/sets`);
            const json = await res.json();
            const sets = json.data || [];

            const setMetadata = {
                tgat1: {
                    1: { title: 'ชุดที่ 1: Official Mock Standard', desc: 'บริบทชีวิตประจำวัน การสื่อสารในสังคม และการทำงานยุคใหม่ ตรงตาม Blueprint MyTCAS', icon: '🎯' },
                    2: { title: 'ชุดที่ 2: Digital World, AI & Tech Lifestyle', desc: 'โลกดิจิทัล ปัญญาประดิษฐ์ (AI) โซเชียลมีเดีย นวัตกรรม และเทคโนโลยีการศึกษา', icon: '🤖' },
                    3: { title: 'ชุดที่ 3: Green Planet & Sustainable Future', desc: 'สิ่งแวดล้อม วิกฤตภูมิอากาศ พลังงานสะอาด เศรษฐกิจหมุนเวียน และ ESG', icon: '🌱' },
                    4: { title: 'ชุดที่ 4: Global Business & Cultural Tourism', desc: 'ธุรกิจระหว่างประเทศ การค้าระดับโลก วัฒนธรรม โลจิสติกส์ และการท่องเที่ยวเชิงมรดก', icon: '🌍' },
                    5: { title: 'ชุดที่ 5: Academic Excellence & Neuroplasticity', desc: 'ทักษะวิชาการขั้นสูง วิทยาศาสตร์สมอง การเรียนรู้ จริยธรรมวิจัย และ Grand Mock', icon: '🧠' }
                },
                tgat2: {
                    1: { title: 'ชุดที่ 1: Official Authentic Blueprint', desc: 'แนวข้อสอบทางการ MyTCAS ครบ 4 มิติ ภาษา ตัวเลข มิติสัมพันธ์ และการคิดอย่างมีเหตุผล', icon: '🎯' },
                    2: { title: 'ชุดที่ 2: Smart Tech & Scientific Logic', desc: 'ตรรกะเทคโนโลยีอัจฉริยะ การวิเคราะห์ข้อมูล ปัญญาประดิษฐ์ และระเบียบวิธีทางวิทยาศาสตร์', icon: '🔬' },
                    3: { title: 'ชุดที่ 3: Economic Reasoning & Business Strategy', desc: 'การคิดเชิงเศรษฐศาสตร์ กลยุทธ์ธุรกิจ การเปรียบเทียบเชิงปริมาณ และการแก้โจทย์ปัญหาซับซ้อน', icon: '📊' },
                    4: { title: 'ชุดที่ 4: Social Dynamics & Civic Logic', desc: 'มิติสังคม สิ่งแวดล้อม ตรรกะพลเมือง และการวิเคราะห์ข้อความเชิงวิพากษ์', icon: '🌐' },
                    5: { title: 'ชุดที่ 5: Grand Mock Master & Deep Problem-Solving', desc: 'ชุดข้อสอบประมวลทักษะขั้นสูง การให้เหตุผลเชิงอนุมาน และสถานการณ์จำลองระดับยาก', icon: '🏆' }
                },
                tgat3: {
                    1: { title: 'ชุดที่ 1: Official Authentic Competencies', desc: 'สมรรถนะการทำงานในอนาคตตาม Blueprint ทางการ ครบ 4 ด้าน นวัตกรรม ปัญหาซับซ้อน อารมณ์ และพลเมือง', icon: '🎯' },
                    2: { title: 'ชุดที่ 2: Digital Age Agility & Tech Innovation', desc: 'การสร้างคุณค่าและนวัตกรรมดิจิทัล การคิดแก้ปัญหาด้วยเทคโนโลยี และการรับมือวิกฤตไซเบอร์', icon: '💡' },
                    3: { title: 'ชุดที่ 3: Startup Growth & Crisis Leadership', desc: 'การบริหารจัดการในองค์กรเติบโตเร็ว การตัดสินใจภาวะวิกฤต ความฉลาดทางอารมณ์ และผู้นำที่ยืดหยุ่น', icon: '🚀' },
                    4: { title: 'ชุดที่ 4: Sustainability, ESG & Community Impact', desc: 'การขับเคลื่อนความยั่งยืน จริยธรรมองค์กร ESG การมีส่วนร่วมของชุมชน และจิตสำนึกพลเมืองโลก', icon: '🌿' },
                    5: { title: 'ชุดที่ 5: Grand Workforce Master & Ethical Synergy', desc: 'ชุดข้อสอบประมวลสมรรถนะขั้นสูง ความขัดแย้งทางจริยธรรม การทำงานข้ามวัฒนธรรม และการแก้ปัญหาเชิงโครงสร้าง', icon: '👑' }
                }
            };

            const subMeta = setMetadata[subjectId] || {};

            let html = `
                <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));">
            `;

            sets.forEach(s => {
                const meta = subMeta[s.set_number] || {
                    title: `ชุดที่ ${s.set_number}: แนวข้อสอบจำลองสมบูรณ์แบบ`,
                    desc: `ข้อสอบมาตรฐาน ${s.count} ข้อ จับเวลาและคำนวณคะแนนตามพิมพ์เขียวทางการ`,
                    icon: '📝'
                };

                html += `
                    <div class="glass-panel" style="padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; background: rgba(30, 41, 59, 0.6); display: flex; flex-direction: column; justify-content: space-between; transition: all 0.2s ease;">
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span style="font-size: 1.5rem;">${meta.icon}</span>
                                    <h4 style="margin: 0; font-size: 1.05rem; color: #f8fafc; font-weight: 700;">${meta.title}</h4>
                                </div>
                                <span style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 9999px;">
                                    ${s.count} ข้อ
                                </span>
                            </div>
                            <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin: 0 0 1rem 0;">${meta.desc}</p>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem;">
                            <span class="set-card-time-label" data-duration="${subject.duration_minutes || 60}" data-score="${subject.total_score || 100}" style="font-size: 0.8rem; color: ${this.state.examPlayMode === 'free_roam' ? '#34d399' : '#64748b'};">${this.state.examPlayMode === 'free_roam' ? `${this.svg('infinity', {size: 13})} ไม่จับเวลา • เปิดใช้ AI ได้` : `${this.svg('clock', {size: 13})} ${subject.duration_minutes || 60} นาที • ${subject.total_score || 100} คะแนน`}</span>
                            <button class="btn btn-primary btn-sm" onclick="app.startExamFromSetModal('${subjectId}', ${s.set_number})">
                                ${this.svg('play', {size: 14})} เริ่มทำชุดนี้
                            </button>
                        </div>
                    </div>
                `;
            });

            // Random mix card
            html += `
                <div class="glass-panel" style="padding: 1.25rem; border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; background: rgba(88, 28, 135, 0.15); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="font-size: 1.5rem;">🎲</span>
                                <h4 style="margin: 0; font-size: 1.05rem; color: #e9d5ff; font-weight: 700;">สุ่มคละทุกชุด (Comprehensive Mix)</h4>
                            </div>
                            <span style="background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 9999px;">
                                สุ่ม ${subject.total_questions || 60} ข้อ
                            </span>
                        </div>
                        <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; margin: 0 0 1rem 0;">สุ่มข้อสอบ ${subject.total_questions || 60} ข้อจากคลังทั้งหมด ${subject.total_db_questions || 400} ข้อ เพื่อทดสอบความพร้อมรอบด้านโดยไม่จำกัดชุด</p>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem;">
                        <span class="set-card-time-label" data-duration="${subject.duration_minutes || 60}" data-score="${subject.total_score || 100}" style="font-size: 0.8rem; color: ${this.state.examPlayMode === 'free_roam' ? '#34d399' : '#a855f7'};">${this.state.examPlayMode === 'free_roam' ? `${this.svg('infinity', {size: 13})} ไม่จับเวลา • เปิดใช้ AI ได้` : `${this.svg('clock', {size: 13})} ${subject.duration_minutes || 60} นาที • ${subject.total_score || 100} คะแนน`}</span>
                        <button class="btn btn-secondary btn-sm" style="border-color: #a855f7; color: #e9d5ff;" onclick="app.startExamFromSetModal('${subjectId}', null)">
                            ${this.svg('shuffle', {size: 14})} เริ่มสอบแบบสุ่ม
                        </button>
                    </div>
                </div>
            `;

            html += `</div>`;
            if (contentEl) contentEl.innerHTML = html;
            this.syncPlayModeUI();
        } catch (err) {
            if (contentEl) contentEl.innerHTML = `<div style="color: #f87171; text-align: center; padding: 2rem;">เกิดข้อผิดพลาดในการโหลดชุดข้อสอบ: ${err.message}</div>`;
        }
    },

    setExamPlayMode(mode) {
        this.playSfx('select');
        this.state.examPlayMode = (mode === 'free_roam') ? 'free_roam' : 'timed';
        localStorage.setItem('tcas_exam_play_mode', this.state.examPlayMode);
        this.syncPlayModeUI();
        this.showToast(
            this.state.examPlayMode === 'free_roam'
                ? 'เปิดโหมด Free Roam: ไม่จับเวลา และเปิดใช้ AI ระหว่างทำข้อสอบได้'
                : 'สลับเป็นโหมดสอบจริง: จับเวลาถอยหลังตามเกณฑ์ ทปอ.',
            'info'
        );
    },

    syncPlayModeUI() {
        const mode = this.state.examPlayMode === 'free_roam' ? 'free_roam' : 'timed';
        const isFreeRoam = mode === 'free_roam';

        document.querySelectorAll('.play-mode-pill, .play-mode-card').forEach(el => {
            el.classList.toggle('active', el.getAttribute('data-play-mode') === mode);
        });

        // Update Subject Cards time chip dynamically
        document.querySelectorAll('.subject-time-chip').forEach(chip => {
            const mins = chip.getAttribute('data-duration') || '60';
            chip.innerHTML = isFreeRoam
                ? `${this.svg('infinity', { size: 13 })} ไม่จับเวลา + AI`
                : `${this.svg('clock', { size: 13 })} ${mins} นาที`;
            chip.style.color = isFreeRoam ? '#34d399' : '';
            chip.style.borderColor = isFreeRoam ? 'rgba(16, 185, 129, 0.35)' : '';
            chip.style.background = isFreeRoam ? 'rgba(16, 185, 129, 0.1)' : '';
        });

        // Update Exam Set Modal cards & footer dynamically
        document.querySelectorAll('.set-card-time-label').forEach(lbl => {
            const mins = lbl.getAttribute('data-duration') || '60';
            const score = lbl.getAttribute('data-score') || '100';
            lbl.innerHTML = isFreeRoam
                ? `${this.svg('infinity', { size: 13 })} ไม่จับเวลา • เปิดใช้ AI ได้`
                : `${this.svg('clock', { size: 13 })} ${mins} นาที • ${score} คะแนน`;
            lbl.style.color = isFreeRoam ? '#34d399' : '#64748b';
        });

        const setFooterInfo = document.getElementById('set-modal-footer-info');
        if (setFooterInfo) {
            setFooterInfo.innerHTML = isFreeRoam
                ? `<span style="color:#34d399;">${this.svg('infinity', { size: 14 })} โหมด Free Roam: ไม่จำกัดเวลา และเปิดใช้ TCAS Master AI ระหว่างทำข้อสอบได้ทุกข้อ</span>`
                : `<span>ทุกชุดมี 60 ข้อ จับเวลา 60 นาที คะแนนเต็ม 100 คะแนน</span>`;
        }
    },

    closeSetModal() {
        const modal = document.getElementById('exam-set-modal');
        if (modal) modal.classList.remove('open');
    },

    startExamFromSetModal(subjectId, setNumber) {
        this.closeSetModal();
        this.startExam(subjectId, 'full_mock', null, setNumber);
    },

    async startExam(subjectId, sessionType = 'full_mock', filterBlueprintId = null, setNumber = null, overridePlayMode = null) {
        try {
            const isFreeRoam = (overridePlayMode || this.state.examPlayMode) === 'free_roam';
            const bodyPayload = {
                subject_id: subjectId,
                session_type: sessionType,
                filter_blueprint_id: filterBlueprintId,
                is_free_roam: isFreeRoam
            };
            if (setNumber) bodyPayload.set_number = setNumber;

            const res = await fetch('/api/sessions/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyPayload)
            });

            const data = await res.json();
            if (!data.success) {
                if (data.is_all_mastered) {
                    if (confirm(`${data.error}\n\nต้องการเปิดดูข้อสอบใน "คลังข้อสอบที่พิชิตแล้ว" หรือไม่?`)) {
                        this.navigate('mastered');
                        this.loadMastered(subjectId);
                    }
                } else {
                    this.showToast(data.error || 'ไม่สามารถเริ่มการสอบได้', 'error');
                }
                return;
            }

            this.state.activeSession = data.data;
            this.state.currentQuestionIndex = 0;
            this.state.userAnswers = {};
            this.state.timeRemainingSeconds = data.data.time_limit_seconds;
            this.state.examElapsedSeconds = 0;

            const sessionFreeRoam = Boolean(data.data.is_free_roam);

            // Setup Header
            document.getElementById('exam-badge').textContent = data.data.subject.code;
            document.getElementById('exam-subject-name').textContent = data.data.subject.name_th;
            const setLabel = setNumber ? ` (ชุดที่ ${setNumber})` : '';
            const modeLabelBase = sessionType === 'full_mock'
                ? 'Full Mock'
                : (sessionType === 'mistakes_review' ? 'Mistakes Drill' : (sessionType === 'mastered_review' ? 'Mastered Review' : 'Topic Drill'));
            const examModeEl = document.getElementById('exam-mode-text');
            if (examModeEl) {
                examModeEl.textContent = modeLabelBase + setLabel + (sessionFreeRoam ? ' • Free Roam' : '');
                examModeEl.classList.toggle('freeroam', sessionFreeRoam);
            }
            document.getElementById('total-count-badge').textContent = data.data.total_questions;

            // Toggle In-Exam AI buttons (Only unlocked in Free Roam mode)
            const askAiBtn = document.getElementById('btn-exam-ask-ai');
            const headerAskAiBtn = document.getElementById('btn-header-ask-ai');
            if (askAiBtn) askAiBtn.style.display = sessionFreeRoam ? 'inline-flex' : 'none';
            if (headerAskAiBtn) headerAskAiBtn.style.display = sessionFreeRoam ? 'inline-flex' : 'none';

            // Switch to exam view
            this.navigate('exam');

            // Render exam section bar, current question & palette
            this.renderExamSectionBar();
            this.renderCurrentQuestion();
            this.renderQuestionPalette();

            // Start timer (untimed count-up in Free Roam, countdown in Standard)
            this.startTimer();

        } catch (err) {
            console.error('Failed to start exam', err);
            this.showToast('เกิดข้อผิดพลาดในการโหลดข้อสอบ', 'error');
        }
    },

    startTimer() {
        if (this.state.timerInterval) clearInterval(this.state.timerInterval);

        const timerEl = document.getElementById('exam-timer');
        const timerWrapper = document.getElementById('exam-timer-wrapper');
        const timerIcon = document.getElementById('exam-timer-icon');
        const isFreeRoam = Boolean(this.state.activeSession && this.state.activeSession.is_free_roam);

        if (isFreeRoam) {
            if (timerWrapper) {
                timerWrapper.classList.remove('timer-warning');
                timerWrapper.classList.add('timer-freeroam');
                timerWrapper.title = 'โหมด Free Roam: ไม่จับเวลา และสามารถเปิดใช้ AI ได้ระหว่างทำข้อสอบ';
            }
            if (timerIcon) {
                timerIcon.innerHTML = '<path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />';
            }
            if (timerEl) {
                timerEl.textContent = 'Free Roam • ไม่จับเวลา';
            }

            // Track elapsed seconds silently in background for session record without showing any ticking clock
            this.state.timerInterval = setInterval(() => {
                this.state.examElapsedSeconds++;
            }, 1000);
            return;
        }

        if (timerWrapper) {
            timerWrapper.classList.remove('timer-freeroam');
            timerWrapper.title = 'เวลาสอบที่เหลือ';
        }
        if (timerIcon) {
            timerIcon.innerHTML = '<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />';
        }

        const updateTimer = () => {
            if (this.state.timeRemainingSeconds <= 0) {
                clearInterval(this.state.timerInterval);
                this.showToast('หมดเวลาสอบ! ระบบกำลังส่งกระดาษคำตอบ...', 'error');
                this.executeSubmitExam();
                return;
            }

            this.state.timeRemainingSeconds--;
            this.state.examElapsedSeconds++;

            const mins = Math.floor(this.state.timeRemainingSeconds / 60);
            const secs = this.state.timeRemainingSeconds % 60;
            timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

            // Warn when less than 5 minutes
            if (this.state.timeRemainingSeconds < 300) {
                timerWrapper.classList.add('timer-warning');
            } else {
                timerWrapper.classList.remove('timer-warning');
            }
        };

        updateTimer();
        this.state.timerInterval = setInterval(updateTimer, 1000);
    },

    renderCurrentQuestion() {
        const session = this.state.activeSession;
        if (!session || !session.questions) return;

        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        // Meta
        document.getElementById('current-q-index').textContent = this.state.currentQuestionIndex + 1;
        document.getElementById('current-q-domain').textContent = q.subtopic_name || q.domain_name;

        const diffEl = document.getElementById('current-q-difficulty');
        diffEl.textContent = q.difficulty.toUpperCase();
        diffEl.className = `q-difficulty-pill diff-${q.difficulty}`;

        // Flag button
        const isFlagged = this.state.userAnswers[q.id]?.is_flagged;
        const flagBtn = document.getElementById('btn-flag');
        if (isFlagged) {
            flagBtn.classList.add('flagged');
            document.getElementById('flag-text').textContent = 'ปักหมุดแล้ว';
        } else {
            flagBtn.classList.remove('flagged');
            document.getElementById('flag-text').textContent = 'ปักหมุด';
        }

        // AI Saved bookmark button status
        const isSavedForAi = (this.state.aiSavedQuestions || []).some(sq => sq.question_id === q.id);
        const saveAiBtn = document.getElementById('btn-save-ai');
        const saveAiText = document.getElementById('ai-save-text');
        const saveAiIcon = document.getElementById('ai-save-icon');
        if (saveAiBtn) {
            if (isSavedForAi) {
                saveAiBtn.classList.add('saved');
                if (saveAiText) saveAiText.textContent = 'เก็บแล้ว';
                if (saveAiIcon) saveAiIcon.innerHTML = this.svg('check', { size: 14 });
            } else {
                saveAiBtn.classList.remove('saved');
                if (saveAiText) saveAiText.textContent = 'เก็บไว้ถาม AI';
                if (saveAiIcon) saveAiIcon.innerHTML = this.svg('bookmark', { size: 14 });
            }
        }

        // Split Layout / Stimulus
        const splitWrapper = document.getElementById('exam-split-wrapper');
        const stimulusPane = document.getElementById('stimulus-pane');
        const stimulusContent = document.getElementById('stimulus-content');

        // Defensive sanitization: strip any generator bracket tags like [ชุดวิเคราะห์ภาษา...] or [การคิดคำนวณ...]
        let cleanStimulus = q.stimulus ? q.stimulus.replace(/^\s*\[[^\]]+\]\s*/g, '').trim() : '';
        let cleanQuestionText = q.question_text ? q.question_text.replace(/^\s*\[[^\]]+\]\s*/g, '').trim() : '';

        // If stimulus is an analogy prompt and question is severed, merge into unified question
        if (cleanStimulus && cleanStimulus.includes('จงเลือกคู่คำที่มีความสัมพันธ์เหมือนกับ') && cleanQuestionText.includes('ข้อใดมีความสัมพันธ์เหมือนกับคู่คำที่กำหนดให้?')) {
            cleanQuestionText = cleanStimulus;
            cleanStimulus = '';
        }

        if (cleanStimulus && cleanStimulus.length > 0) {
            splitWrapper.classList.add('has-stimulus');
            stimulusPane.style.display = 'block';
            stimulusContent.textContent = cleanStimulus;
            if (this.state.examSplitLeftPct && window.innerWidth > 900) {
                splitWrapper.style.gridTemplateColumns = `${this.state.examSplitLeftPct}% 10px 1fr`;
            }
        } else {
            splitWrapper.classList.remove('has-stimulus');
            stimulusPane.style.display = 'none';
            splitWrapper.style.gridTemplateColumns = '';
        }

        // Question text
        document.getElementById('question-text').innerHTML = cleanQuestionText;

        // Options (with Strike-through support)
        const optionsList = document.getElementById('options-list');
        const currentAnswer = this.state.userAnswers[q.id]?.selected_option_id;
        const struckList = this.state.struckOptions[q.id] || [];

        optionsList.innerHTML = q.options.map((opt, idx) => {
            const isSelected = currentAnswer === opt.id;
            const isStruck = struckList.includes(opt.id);
            return `
            <div class="option-card ${isSelected ? 'selected' : ''} ${isStruck ? 'struck' : ''}"
                onclick="app.selectOption('${opt.id}')"
                oncontextmenu="app.toggleStrikeOption('${opt.id}', event)">
                <span class="opt-badge">${opt.label || idx + 1}</span>
                <span class="opt-text">${opt.content}</span>
                <button type="button" class="opt-strike-btn ${isStruck ? 'active' : ''}"
                    onclick="app.toggleStrikeOption('${opt.id}', event)"
                    title="${isStruck ? 'ยกเลิกขีดฆ่าตัวเลือกนี้' : 'ขีดฆ่าตัดตัวเลือกนี้ (หรือคลิกขวา)'}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                </button>
            </div>`;
        }).join('');

        // Smooth question enter transition
        const qPane = document.getElementById('question-pane');
        if (qPane) {
            qPane.classList.remove('q-pane-enter');
            void qPane.offsetWidth;
            qPane.classList.add('q-pane-enter');
        }
        this.updateExamProgressBar();

        // Navigation button states
        document.getElementById('btn-prev-q').disabled = this.state.currentQuestionIndex === 0;
        const nextBtn = document.getElementById('btn-next-q');
        if (this.state.currentQuestionIndex === session.questions.length - 1) {
            nextBtn.innerHTML = `ตรวจทาน / ส่ง <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else {
            nextBtn.innerHTML = `ข้อถัดไป <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
        }

        // Re-render Math
        this.renderMath();

        // Update palette drawer states
        this.updatePaletteActiveStates();

        const qTracker = document.getElementById('q-time-tracker');
        if (qTracker) {
            qTracker.style.display = session.is_free_roam ? 'none' : '';
        }

        // Start live question stopwatch (silent in Free Roam)
        this.startQuestionStopwatch();
    },

    selectOption(optionId) {
        this.playSfx('select');
        const session = this.state.activeSession;
        if (!session) return;

        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        if (!this.state.userAnswers[q.id]) {
            this.state.userAnswers[q.id] = {
                selected_option_id: optionId,
                time_spent_seconds: 0,
                is_flagged: false
            };
        } else {
            this.state.userAnswers[q.id].selected_option_id = optionId;
        }

        // Update answered count badge & progress bar
        const answeredCount = Object.values(this.state.userAnswers).filter(a => !!a.selected_option_id).length;
        document.getElementById('answered-count-badge').textContent = answeredCount;
        this.updateExamProgressBar();

        // Refresh UI
        this.renderCurrentQuestion();
    },

    toggleStrikeOption(optionId, event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const session = this.state.activeSession;
        if (!session) return;
        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        const list = this.state.struckOptions[q.id] || [];
        const idx = list.indexOf(optionId);
        if (idx >= 0) {
            list.splice(idx, 1);
        } else {
            list.push(optionId);
        }
        this.state.struckOptions[q.id] = list;
        this.playSfx('select');
        this.renderCurrentQuestion();
    },

    updateExamProgressBar() {
        const fill = document.getElementById('exam-progress-fill');
        const session = this.state.activeSession;
        if (!fill || !session || !session.questions || !session.questions.length) return;
        const answeredCount = Object.values(this.state.userAnswers).filter(a => !!a.selected_option_id).length;
        const pct = Math.min(100, Math.round((answeredCount / session.questions.length) * 100));
        fill.style.width = `${pct}%`;
    },

    initExamSplitResizer() {
        const resizer = document.getElementById('exam-split-resizer');
        const wrapper = document.getElementById('exam-split-wrapper');
        if (!resizer || !wrapper) return;

        let isDragging = false;
        const onMove = (clientX) => {
            if (!isDragging || window.innerWidth <= 900) return;
            const rect = wrapper.getBoundingClientRect();
            if (!rect.width) return;
            const pct = Math.max(26, Math.min(68, ((clientX - rect.left) / rect.width) * 100));
            this.state.examSplitLeftPct = Number(pct.toFixed(1));
            wrapper.style.gridTemplateColumns = `${this.state.examSplitLeftPct}% 10px 1fr`;
        };

        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            document.body.classList.add('exam-resizing');
        });
        window.addEventListener('mousemove', (e) => onMove(e.clientX));
        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            document.body.classList.remove('exam-resizing');
        });
    },

    toggleFlagCurrentQuestion() {
        const session = this.state.activeSession;
        if (!session) return;
        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        if (!this.state.userAnswers[q.id]) {
            this.state.userAnswers[q.id] = { selected_option_id: null, is_flagged: true, time_spent_seconds: 0 };
        } else {
            this.state.userAnswers[q.id].is_flagged = !this.state.userAnswers[q.id].is_flagged;
        }

        this.renderCurrentQuestion();
    },

    nextQuestion() {
        const session = this.state.activeSession;
        if (!session) return;

        this.saveCurrentScratchpad();

        if (this.state.currentQuestionIndex < session.questions.length - 1) {
            this.state.currentQuestionIndex++;
            this.renderCurrentQuestion();
            this.restoreCurrentScratchpad();
            this.notifyScratchpadQuestionChange();
        } else {
            this.confirmSubmitExam();
        }
    },

    prevQuestion() {
        if (this.state.currentQuestionIndex > 0) {
            this.saveCurrentScratchpad();
            this.state.currentQuestionIndex--;
            this.renderCurrentQuestion();
            this.restoreCurrentScratchpad();
            this.notifyScratchpadQuestionChange();
        }
    },

    jumpToQuestion(index) {
        this.saveCurrentScratchpad();
        this.state.currentQuestionIndex = index;
        this.renderCurrentQuestion();
        this.restoreCurrentScratchpad();
        this.notifyScratchpadQuestionChange();
        this.toggleQuestionPalette(false);
    },

    jumpToSection(sectionIndex) {
        const session = this.state.activeSession;
        if (!session || !session.sections || !session.sections[sectionIndex]) return;
        const sec = session.sections[sectionIndex];
        this.jumpToQuestion(sec.start_index);
    },

    renderExamSectionBar() {
        const session = this.state.activeSession;
        const bar = document.getElementById('exam-section-bar');
        if (!bar) return;

        if (!session || !session.sections || session.sections.length <= 1) {
            bar.style.display = 'none';
            bar.innerHTML = '';
            return;
        }

        bar.style.display = 'flex';
        bar.innerHTML = session.sections.map((sec, sIdx) => `
            <button class="section-pill-btn" id="section-pill-${sIdx}" onclick="app.jumpToSection(${sIdx})" title="${sec.name} (ข้อ ${sec.start_index + 1} - ${sec.end_index + 1})">
                <span class="section-pill-title">${sec.name}</span>
                <span class="section-pill-range">ข้อ ${sec.start_index + 1}-${sec.end_index + 1}</span>
                <span class="section-pill-badge" id="section-pill-badge-${sIdx}">0/${sec.count}</span>
            </button>
        `).join('');

        this.updateSectionPillActiveStates();
    },

    updateSectionPillActiveStates() {
        const session = this.state.activeSession;
        if (!session || !session.sections) return;

        const currentIdx = this.state.currentQuestionIndex;

        session.sections.forEach((sec, sIdx) => {
            const pill = document.getElementById(`section-pill-${sIdx}`);
            if (!pill) return;

            const isActive = currentIdx >= sec.start_index && currentIdx <= sec.end_index;
            if (isActive) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }

            // Count answered questions in this section
            let answered = 0;
            for (let i = sec.start_index; i <= sec.end_index; i++) {
                const q = session.questions[i];
                if (q && this.state.userAnswers[q.id]?.selected_option_id) {
                    answered++;
                }
            }

            const badge = document.getElementById(`section-pill-badge-${sIdx}`);
            if (badge) {
                badge.textContent = `${answered}/${sec.count}`;
                if (answered === sec.count) {
                    badge.classList.add('completed');
                } else {
                    badge.classList.remove('completed');
                }
            }

            const palSecBadge = document.getElementById(`palette-sec-badge-${sIdx}`);
            if (palSecBadge) {
                palSecBadge.textContent = `${answered}/${sec.count}`;
                if (answered === sec.count) {
                    palSecBadge.classList.add('completed');
                } else {
                    palSecBadge.classList.remove('completed');
                }
            }
        });
    },

    // Question Palette Off-Canvas Drawer
    toggleQuestionPalette(forceOpen) {
        const palette = document.getElementById('question-palette');
        const backdrop = document.getElementById('palette-backdrop');
        if (!palette) return;

        let shouldOpen;
        if (forceOpen === undefined) {
            shouldOpen = !palette.classList.contains('open');
        } else {
            shouldOpen = !!forceOpen;
        }

        if (shouldOpen) {
            palette.classList.add('open');
            if (backdrop) backdrop.classList.add('open');
            this.updatePaletteActiveStates();
        } else {
            palette.classList.remove('open');
            if (backdrop) backdrop.classList.remove('open');
        }
    },

    renderQuestionPalette() {
        const session = this.state.activeSession;
        if (!session) return;

        const grid = document.getElementById('palette-grid');
        if (!grid) return;

        if (session.sections && session.sections.length > 1) {
            // Grouped by section
            grid.innerHTML = session.sections.map((sec, sIdx) => {
                const btns = [];
                for (let i = sec.start_index; i <= sec.end_index; i++) {
                    btns.push(`
                        <button class="palette-btn" id="palette-btn-${i}" onclick="app.jumpToQuestion(${i})" title="ข้อที่ ${i + 1}">
                            ${i + 1}
                        </button>
                    `);
                }
                return `
                    <div class="palette-section-group">
                        <div class="palette-section-header">
                            <span class="sec-title">${sec.name}</span>
                            <span class="sec-count" id="palette-sec-badge-${sIdx}">0/${sec.count}</span>
                        </div>
                        <div class="palette-section-grid">
                            ${btns.join('')}
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            grid.innerHTML = session.questions.map((q, idx) => `
                <button class="palette-btn" id="palette-btn-${idx}" onclick="app.jumpToQuestion(${idx})" title="ข้อที่ ${idx + 1}">
                    ${idx + 1}
                </button>
            `).join('');
        }

        this.updatePaletteActiveStates();
    },

    updatePaletteActiveStates() {
        const session = this.state.activeSession;
        if (!session) return;

        const total = session.questions.length;
        let answeredCount = 0;

        session.questions.forEach((q, idx) => {
            const btn = document.getElementById(`palette-btn-${idx}`);
            const isCurrent = idx === this.state.currentQuestionIndex;
            const ans = this.state.userAnswers[q.id];
            const isAnswered = ans && !!ans.selected_option_id;
            const isFlagged = ans && ans.is_flagged;

            if (isAnswered) answeredCount++;

            if (btn) {
                btn.className = 'palette-btn';
                if (isAnswered) btn.classList.add('answered');
                if (isFlagged) btn.classList.add('flagged');
                if (isCurrent) btn.classList.add('current');
            }
        });

        // Update badge counters across the UI
        const ansBadge = document.getElementById('answered-count-badge');
        if (ansBadge) ansBadge.textContent = answeredCount;
        const totBadge = document.getElementById('total-count-badge');
        if (totBadge) totBadge.textContent = total;

        const sideBadge = document.getElementById('side-tab-badge');
        if (sideBadge) sideBadge.textContent = `${answeredCount}/${total}`;

        const palAnswered = document.getElementById('palette-answered-count');
        if (palAnswered) palAnswered.textContent = answeredCount;
        const palTotal = document.getElementById('palette-total-count');
        if (palTotal) palTotal.textContent = total;

        // Also update section pills and section badges
        this.updateSectionPillActiveStates();
    },

    // ==========================================
    // CBT EXAM CONTROLS (FONT RESIZER, ZEN MODE, QUESTION STOPWATCH)
    // ==========================================

    setExamFontSize(size) {
        if (!['sm', 'md', 'lg'].includes(size)) size = 'md';
        this.state.examFontSize = size;
        localStorage.setItem('cbt_font_size', size);
        this.applyExamFontSize();
    },

    applyExamFontSize() {
        const size = this.state.examFontSize || 'md';
        const examView = document.getElementById('view-exam');
        if (examView) {
            examView.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
            examView.classList.add(`font-size-${size}`);
        }

        ['sm', 'md', 'lg'].forEach(s => {
            const btn = document.getElementById(`btn-font-${s}`);
            if (btn) {
                if (s === size) btn.classList.add('active');
                else btn.classList.remove('active');
            }
        });
    },

    toggleZenMode(force) {
        const isZen = force !== undefined ? !!force : !this.state.isZenMode;
        this.state.isZenMode = isZen;

        if (isZen) {
            document.body.classList.add('zen-mode');
        } else {
            document.body.classList.remove('zen-mode');
        }

        const zenBtn = document.getElementById('btn-toggle-zen');
        const zenText = document.getElementById('zen-btn-text');
        if (zenBtn) {
            if (isZen) {
                zenBtn.classList.add('active');
                if (zenText) zenText.textContent = 'ออกจากสมาธิ';
            } else {
                zenBtn.classList.remove('active');
                if (zenText) zenText.textContent = 'โหมดสมาธิ';
            }
        }
    },

    startQuestionStopwatch() {
        if (this.state.questionStopwatchInterval) {
            clearInterval(this.state.questionStopwatchInterval);
            this.state.questionStopwatchInterval = null;
        }

        const session = this.state.activeSession;
        if (!session || !session.questions) return;
        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        const ans = this.state.userAnswers[q.id];
        this.state.questionStopwatchSeconds = (ans && ans.time_spent_seconds) ? ans.time_spent_seconds : 0;
        this.updateQuestionStopwatchDisplay();

        this.state.questionStopwatchInterval = setInterval(() => {
            this.state.questionStopwatchSeconds++;
            if (this.state.userAnswers[q.id]) {
                this.state.userAnswers[q.id].time_spent_seconds = this.state.questionStopwatchSeconds;
            } else {
                this.state.userAnswers[q.id] = {
                    selected_option_id: null,
                    is_flagged: false,
                    time_spent_seconds: this.state.questionStopwatchSeconds
                };
            }
            this.updateQuestionStopwatchDisplay();
        }, 1000);
    },

    stopQuestionStopwatch() {
        if (this.state.questionStopwatchInterval) {
            clearInterval(this.state.questionStopwatchInterval);
            this.state.questionStopwatchInterval = null;
        }
    },

    updateQuestionStopwatchDisplay() {
        const displayEl = document.getElementById('q-time-spent-display');
        if (!displayEl) return;
        const total = this.state.questionStopwatchSeconds;
        const mins = Math.floor(total / 60);
        const secs = total % 60;
        displayEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },

    // ==========================================
    // 4. SUBMIT EXAM & RESULTS
    // ==========================================

    confirmSubmitExam() {
        const session = this.state.activeSession;
        if (!session) return;

        const total = session.questions.length;
        const answered = Object.values(this.state.userAnswers).filter(a => !!a.selected_option_id).length;
        const unanswered = total - answered;
        const flagged = Object.values(this.state.userAnswers).filter(a => a.is_flagged).length;

        document.getElementById('modal-answered-num').textContent = answered;
        document.getElementById('modal-unanswered-num').textContent = unanswered;
        document.getElementById('modal-flagged-num').textContent = flagged;

        document.getElementById('confirm-submit-modal').classList.add('open');
    },

    closeSubmitModal() {
        document.getElementById('confirm-submit-modal').classList.remove('open');
    },

    async executeSubmitExam() {
        this.closeSubmitModal();
        if (this.state.timerInterval) clearInterval(this.state.timerInterval);
        this.stopQuestionStopwatch();

        const session = this.state.activeSession;
        if (!session) return;

        // Compile payload
        const answersPayload = session.questions.map(q => {
            const ans = this.state.userAnswers[q.id];
            return {
                question_id: q.id,
                selected_option_id: ans ? ans.selected_option_id : null,
                is_flagged: ans ? ans.is_flagged : false,
                time_spent_seconds: ans ? ans.time_spent_seconds : 0
            };
        });

        const totalTimeSpent = session.is_free_roam
            ? this.state.examElapsedSeconds
            : (session.time_limit_seconds - this.state.timeRemainingSeconds);

        try {
            const res = await fetch(`/api/sessions/${session.session_id}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    answers: answersPayload,
                    time_spent_seconds: Math.max(totalTimeSpent, 1)
                })
            });

            const result = await res.json();
            if (result.success) {
                this.renderResults(result.data, session);
                this.navigate('results');
                this.loadDashboard(); // Refresh stats in background
                this.loadUserStatus();
            } else {
                this.showToast('ไม่สามารถส่งกระดาษคำตอบได้', 'error');
            }
        } catch (err) {
            console.error('Failed to submit exam', err);
            this.showToast('เกิดข้อผิดพลาดในการประมวลผลคำตอบ', 'error');
        }
    },

    renderResults(result, session) {
        // Subject & Session Metadata at the top of results view
        const subCodeEl = document.getElementById('res-subject-code');
        const subTitleEl = document.getElementById('res-subject-title');
        const subDescEl = document.getElementById('res-subject-desc');
        const subBadgeEl = document.getElementById('res-session-type-badge');

        const curSubject = this.state.subjects.find(s => s.id === (result.subject_id || (session && session.subject_id)));
        const subjectCode = result.subject_code || (curSubject ? curSubject.code : 'TCAS');
        const subjectName = result.subject_name || (curSubject ? curSubject.name_th : 'วิชาสอบ');

        const mins = Math.floor(result.time_spent_seconds / 60);
        const secs = result.time_spent_seconds % 60;

        if (subCodeEl) subCodeEl.textContent = subjectCode;
        if (subTitleEl) subTitleEl.textContent = subjectName;
        if (subDescEl) {
            subDescEl.textContent = `วิเคราะห์ผลคะแนนและจุดอ่อนตามสัดส่วน Blueprint ของ ทปอ. • เวลาที่ใช้ ${mins} นาที ${secs} วินาที`;
        }
        if (subBadgeEl) {
            const st = result.session_type || (session && session.session_type);
            const isFreeRoamRes = Boolean(result.is_free_roam || (session && session.is_free_roam));
            let baseBadge = '';
            if (st === 'full_mock') baseBadge = `${this.svg('target', {size: 14})} จำลองสอบจริง (Full Mock)`;
            else if (st === 'mistakes_review' || st === 'mistake_drill') baseBadge = `${this.svg('alert-triangle', {size: 14})} ฝึกซ้ำสมุดจุดอ่อน (Mistakes Drill)`;
            else if (st === 'mastered_review') baseBadge = `${this.svg('award', {size: 14})} ทบทวนข้อสอบที่พิชิตแล้ว (Mastered Review)`;
            else baseBadge = `${this.svg('zap', {size: 14})} แบบฝึกหัดเจาะลึก Blueprint`;

            subBadgeEl.innerHTML = isFreeRoamRes
                ? `${baseBadge} <span class="badge-freeroam-pill">${this.svg('infinity', {size: 12})} Free Roam</span>`
                : baseBadge;
        }

        // Hero Score & Badge
        document.getElementById('res-score-earned').textContent = result.score_earned;
        document.getElementById('res-score-max').textContent = result.max_score;
        document.getElementById('res-accuracy-badge').textContent = `ความแม่นยำ ${result.accuracy_pct}%`;

        document.getElementById('res-correct-count').textContent = `${result.correct_count} ข้อ`;
        document.getElementById('res-wrong-count').textContent = `${result.wrong_count} ข้อ`;
        document.getElementById('res-time-spent').textContent = `${mins}:${String(secs).padStart(2, '0')}`;

        // Feedback Headline with Blueprint Rubber Stamps & Audio
        const headlineEl = document.getElementById('res-headline');
        if (result.accuracy_pct >= 80) {
            this.playSfx('level_up');
            this.launchConfetti();
            headlineEl.innerHTML = '🌟 ยอดเยี่ยมมาก! ระดับคะแนนพร้อมสอบจริง <span class="rubber-stamp stamp-gold">★ TOP TIER ★</span>';
        } else if (result.accuracy_pct >= 50) {
            this.playSfx('correct');
            this.launchConfetti();
            headlineEl.innerHTML = '👍 ดีมาก! ใกล้ถึงเป้าหมายแล้ว <span class="rubber-stamp">✓ ทปอ. PASS</span>';
        } else {
            this.playSfx('click');
            headlineEl.innerHTML = '💪 อย่ายอมแพ้! ฝึกซ้ำในสมุดจุดอ่อนเพื่ออุดรอยรั่ว <span class="rubber-stamp stamp-cyan">⚡ DRILL MORE</span>';
        }

        // Domain Breakdown (Robust Array / Object Parsing)
        const domainContainer = document.getElementById('res-domain-breakdown');
        let domainList = [];
        if (Array.isArray(result.domain_breakdown)) {
            domainList = result.domain_breakdown;
        } else if (result.domain_breakdown && typeof result.domain_breakdown === 'object') {
            domainList = Object.entries(result.domain_breakdown).map(([name, stat]) => ({
                domain_name: name,
                subtopic_name: stat.subtopic_name || name,
                correct: stat.correct !== undefined ? stat.correct : (stat.correct_in_domain || 0),
                total: stat.total !== undefined ? stat.total : (stat.total_in_domain || 1),
                accuracy_pct: stat.accuracy_pct
            }));
        }

        if (domainList.length === 0) {
            domainContainer.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;">ไม่มีข้อมูลพาร์ท</div>';
        } else {
            domainContainer.innerHTML = domainList.map(item => {
                const title = item.subtopic_name || item.domain_name || 'หมวดทั่วไป';
                const domainHeader = (item.domain_name && item.subtopic_name && item.domain_name !== item.subtopic_name)
                    ? `<span style="font-size: 0.76rem; color: var(--text-muted); display: block; margin-bottom: 2px;">${this.escapeHtml(item.domain_name)}</span>`
                    : '';
                const correct = item.correct !== undefined ? item.correct : (item.correct_in_domain !== undefined ? item.correct_in_domain : 0);
                const total = item.total !== undefined ? item.total : (item.total_in_domain !== undefined ? item.total_in_domain : 1);
                const pct = item.accuracy_pct !== undefined && !isNaN(item.accuracy_pct)
                    ? Math.round(item.accuracy_pct)
                    : Math.round((correct / Math.max(total, 1)) * 100);

                const color = pct >= 75 ? 'var(--accent-emerald)' : (pct >= 50 ? 'var(--accent-amber)' : 'var(--accent-rose)');
                const gradient = pct >= 75 ? 'linear-gradient(90deg, #10b981, #06b6d4)' : (pct >= 50 ? 'linear-gradient(90deg, #f59e0b, #eab308)' : 'linear-gradient(90deg, #f43f5e, #e11d48)');

                return `
                    <div class="domain-perf-card">
                        <div class="domain-perf-header">
                            <div style="flex: 1; padding-right: 0.5rem;">
                                ${domainHeader}
                                <span style="font-weight: 600; color: #fff; font-size: 0.92rem;">${this.escapeHtml(title)}</span>
                            </div>
                            <span style="color: ${color}; font-weight: 700; white-space: nowrap; font-size: 0.88rem;">${correct}/${total} ข้อ (${pct}%)</span>
                        </div>
                        <div class="domain-bar-bg" style="height: 8px; border-radius: 4px; background: rgba(255,255,255,0.08); overflow: hidden; margin-top: 0.6rem;">
                            <div class="domain-bar-fill" style="width: ${Math.min(pct, 100)}%; height: 100%; background: ${gradient}; border-radius: 4px; transition: width 0.5s ease;"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Render Spider Web Radar Chart & Diagnosis Matrix
        this.renderSessionRadarChart(domainList);
        this.renderDiagnosisCallouts(domainList, result);

        // Solutions & Traps
        const solContainer = document.getElementById('res-solutions-container');
        solContainer.innerHTML = result.evaluated_answers.map((ans, idx) => {
            const origQ = session.questions.find(q => q.id === ans.question_id);
            const selectedOpt = origQ ? origQ.options.find(o => o.id === ans.selected_option_id) : null;
            const correctOpt = ans.correct_option;

            return `
                <div class="solution-card ${ans.is_correct ? 'correct' : 'wrong'}">
                    <div class="solution-meta" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                            <span class="q-number-pill">ข้อที่ ${idx + 1}</span>
                            <span class="q-domain-pill">${ans.subtopic_name || ans.domain_name || 'ทั่วไป'}</span>
                            <span style="font-weight: 700; color: ${ans.is_correct ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">
                                ${ans.is_correct ? '✓ ถูกต้อง' : '✗ ตอบผิด'}
                            </span>
                        </div>
                        <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
                            <button class="btn btn-outline btn-xs" onclick="app.toggleSaveQuestionById('${ans.question_id}', '${ans.selected_option_id || ''}')" title="บันทึกข้อนี้ไว้ในคลังถาม AI">
                                🔖 เก็บไว้ถาม AI
                            </button>
                            <button class="btn-ai-tutor" onclick="app.openAiTutor('${ans.question_id}', '${ans.selected_option_id || ''}')" title="ปรึกษา TCAS Master AI สำหรับข้อนี้">
                                <span>🤖</span> คุยกับ AI ข้อนี้
                            </button>
                        </div>
                    </div>

                    ${origQ?.stimulus ? `<div class="stimulus-pane" style="margin-bottom: 0.85rem;"><div class="stimulus-body">${origQ.stimulus}</div></div>` : ''}

                    <div class="sol-q-text">${origQ ? origQ.question_text : ''}</div>

                    <div class="sol-answer-compare">
                        <div class="compare-line">
                            <span class="compare-label" style="color: ${ans.is_correct ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">คำตอบของคุณ:</span>
                            <span>${selectedOpt ? `${selectedOpt.label}. ${selectedOpt.content}` : '(ไม่ได้ตอบข้อนี้)'}</span>
                        </div>
                        <div class="compare-line">
                            <span class="compare-label" style="color: var(--accent-emerald)">คำตอบที่ถูกต้อง:</span>
                            <span>${correctOpt ? `${correctOpt.label}. ${correctOpt.content}` : '-'}</span>
                        </div>
                    </div>

                    <div class="explanation-box">
                        <div class="explanation-title">💡 เฉลยละเอียดและหลักคิด:</div>
                        <div class="explanation-body">${ans.explanation || 'ไม่มีคำอธิบาย'}</div>
                    </div>

                    ${ans.trap_analysis ? `
                        <div class="trap-box">
                            <span>⚠️</span>
                            <div><strong>ระวังจุดหลอก:</strong> ${ans.trap_analysis}</div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        this.renderMath();
    },

    // Step 5: Render Pure SVG Competency Radar Chart
    renderSessionRadarChart(domainList) {
        const container = document.getElementById('exam-radar-container');
        if (!container) return;

        let items = (domainList && domainList.length > 0) ? domainList.slice(0, 6) : [];

        // If fewer than 3 items, provide meaningful dimensions so spider web forms a polygon
        if (items.length === 0) {
            items = [
                { title: 'ความแม่นยำรวม', pct: 50 },
                { title: 'การจัดการเวลา', pct: 70 },
                { title: 'การตัดช้อยส์', pct: 60 }
            ];
        } else if (items.length === 1) {
            const first = items[0];
            const pct1 = first.accuracy_pct !== undefined ? Math.round(first.accuracy_pct) : 50;
            items = [
                { title: first.subtopic_name || first.domain_name || 'พาร์ตหลัก', pct: pct1 },
                { title: 'ความสม่ำเสมอ', pct: Math.min(100, Math.round(pct1 * 0.9)) },
                { title: 'การควบคุมเวลา', pct: 75 }
            ];
        } else if (items.length === 2) {
            items = [
                { title: items[0].subtopic_name || items[0].domain_name || 'พาร์ต 1', pct: Math.round(items[0].accuracy_pct || 50) },
                { title: items[1].subtopic_name || items[1].domain_name || 'พาร์ต 2', pct: Math.round(items[1].accuracy_pct || 50) },
                { title: 'ความเร็วเฉลี่ย', pct: 80 }
            ];
        } else {
            items = items.map(it => {
                const correct = it.correct !== undefined ? it.correct : (it.correct_in_domain || 0);
                const total = it.total !== undefined ? it.total : (it.total_in_domain || 1);
                const pct = it.accuracy_pct !== undefined && !isNaN(it.accuracy_pct)
                    ? Math.round(it.accuracy_pct)
                    : Math.round((correct / Math.max(total, 1)) * 100);
                return {
                    title: it.subtopic_name || it.domain_name || 'โดเมน',
                    pct: Math.max(0, Math.min(100, pct))
                };
            });
        }

        const n = items.length;
        const width = 420;
        const height = 360;
        const cx = width / 2;
        const cy = height / 2;
        const R = 115;

        const getCoordinates = (index, valuePct, maxR = R) => {
            const angle = (Math.PI * 2 / n) * index - (Math.PI / 2);
            const r = (valuePct / 100) * maxR;
            return {
                x: cx + r * Math.cos(angle),
                y: cy + r * Math.sin(angle),
                angle
            };
        };

        // Concentric web rings (25%, 50%, 75%, 100%)
        const ringLevels = [25, 50, 75, 100];
        let gridRingsSvg = '';
        ringLevels.forEach(lvl => {
            const ringPoints = [];
            for (let i = 0; i < n; i++) {
                const pt = getCoordinates(i, lvl);
                ringPoints.push(`${pt.x.toFixed(1)},${pt.y.toFixed(1)}`);
            }
            gridRingsSvg += `<polygon points="${ringPoints.join(' ')}" fill="none" stroke="rgba(255, 255, 255, ${lvl === 100 ? 0.2 : 0.08})" stroke-width="${lvl === 100 ? '1.5' : '1'}" stroke-dasharray="${lvl === 100 ? 'none' : '3 3'}"/>`;
        });

        // Radial spokes and Labels
        let spokesSvg = '';
        let labelsSvg = '';
        for (let i = 0; i < n; i++) {
            const outerPt = getCoordinates(i, 100);
            spokesSvg += `<line x1="${cx}" y1="${cy}" x2="${outerPt.x.toFixed(1)}" y2="${outerPt.y.toFixed(1)}" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.2"/>`;

            const labelPt = getCoordinates(i, 124);
            let textAnchor = 'middle';
            if (Math.abs(Math.cos(labelPt.angle)) > 0.3) {
                textAnchor = Math.cos(labelPt.angle) > 0 ? 'start' : 'end';
            }

            let labelText = items[i].title;
            if (labelText.length > 16) {
                labelText = labelText.substring(0, 14) + '...';
            }

            labelsSvg += `
                <text x="${labelPt.x.toFixed(1)}" y="${labelPt.y.toFixed(1)}" 
                      text-anchor="${textAnchor}" dominant-baseline="middle" 
                      fill="#94a3b8" font-size="11" font-weight="600" font-family="system-ui, sans-serif">
                    ${this.escapeHtml(labelText)}
                    <tspan fill="#38bdf8" font-weight="700"> (${items[i].pct}%)</tspan>
                </text>
            `;
        }

        // User data polygon points
        const dataPoints = [];
        const dotsSvgList = [];
        for (let i = 0; i < n; i++) {
            const visualPct = Math.max(8, items[i].pct);
            const pt = getCoordinates(i, visualPct);
            dataPoints.push(`${pt.x.toFixed(1)},${pt.y.toFixed(1)}`);

            dotsSvgList.push(`
                <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="4.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5">
                    <title>${this.escapeHtml(items[i].title)}: ${items[i].pct}%</title>
                </circle>
            `);
        }

        container.innerHTML = `
            <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 420px; height: auto; display: block; margin: 0 auto; overflow: visible;">
                <defs>
                    <linearGradient id="radarPolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.45"/>
                        <stop offset="100%" stop-color="#6366f1" stop-opacity="0.25"/>
                    </linearGradient>
                    <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                </defs>
                <circle cx="${cx}" cy="${cy}" r="${R}" fill="rgba(6, 182, 212, 0.03)" />
                ${gridRingsSvg}
                ${spokesSvg}
                <polygon points="${dataPoints.join(' ')}" fill="url(#radarPolyGrad)" stroke="#38bdf8" stroke-width="2.5" filter="url(#radarGlow)" stroke-linejoin="round"/>
                ${dotsSvgList.join('')}
                ${labelsSvg}
            </svg>
        `;
    },

    // Step 5: Render Strengths, Focus Areas & Pacing Diagnosis Callouts
    renderDiagnosisCallouts(domainList, result) {
        const container = document.getElementById('res-diagnosis-callout');
        if (!container) return;

        let items = Array.isArray(domainList) ? [...domainList] : [];
        items.forEach(it => {
            if (it.accuracy_pct === undefined) {
                const correct = it.correct !== undefined ? it.correct : (it.correct_in_domain || 0);
                const total = it.total !== undefined ? it.total : (it.total_in_domain || 1);
                it.accuracy_pct = Math.round((correct / Math.max(total, 1)) * 100);
            }
        });

        // 1. Strength
        let strengthTitle = 'ความแม่นยำภาพรวม';
        let strengthDesc = `ทำคะแนนโดยรวมได้ยอดเยี่ยม ${result.accuracy_pct}% ของชุดข้อสอบ`;
        if (items.length > 0) {
            const sorted = [...items].sort((a, b) => (b.accuracy_pct || 0) - (a.accuracy_pct || 0));
            const best = sorted[0];
            strengthTitle = `จุดแข็ง: ${best.subtopic_name || best.domain_name || 'โดเมนหลัก'}`;
            strengthDesc = `คุณทำความแม่นยำในส่วนนี้ได้สูงถึง ${best.accuracy_pct}% ถือเป็นจุดโกยคะแนนสำคัญในการสอบจริง ควรรักษาความแม่นยำนี้ไว้`;
        }

        // 2. Focus Area
        let focusTitle = 'สมุดบันทึกจุดอ่อน';
        let focusDesc = 'ทบทวนข้อที่ทำผิดอย่างสม่ำเสมอเพื่อปิดช่องโหว่ความรู้';
        if (items.length > 0) {
            const sortedAsc = [...items].sort((a, b) => (a.accuracy_pct || 0) - (b.accuracy_pct || 0));
            const lowest = sortedAsc[0];
            if (lowest.accuracy_pct < 70) {
                focusTitle = `จุดที่ต้องเน้น: ${lowest.subtopic_name || lowest.domain_name || 'โดเมน'}`;
                focusDesc = `ความแม่นยำอยู่ที่ ${lowest.accuracy_pct}% แนะนำให้ฝึกทำข้อสอบหมวดนี้ซ้ำ และกดดูเฉลยละเอียดพร้อมระวังจุดหลอก (Trap Analysis)`;
            } else {
                focusTitle = 'ทุกพาร์ตอยู่ในเกณฑ์ดีเยี่ยม';
                focusDesc = 'ไม่มีพาร์ตใดต่ำกว่า 70% ลองท้าทายตนเองด้วยข้อสอบความยากระดับสูง (Hard) เพิ่มเติม';
            }
        }

        // 3. Pacing Speed
        const totalQ = result.evaluated_answers ? result.evaluated_answers.length : 1;
        const avgSec = Math.round((result.time_spent_seconds || 0) / Math.max(totalQ, 1));
        let speedTitle = `สปีดเฉลี่ย ${avgSec} วินาที / ข้อ`;
        let speedDesc = '';
        if (avgSec <= 60) {
            speedDesc = '⚡ ความเร็วระดับยอดเยี่ยม! มีเวลาเหลือเพียงพอสำหรับการตรวจทานคำตอบรอบสองในสนามสอบจริง';
        } else if (avgSec <= 90) {
            speedDesc = '👍 การบริหารเวลาอยู่ในเกณฑ์ดีตามมาตรฐาน Blueprint ทปอ. บริหารจังหวะได้ดี';
        } else {
            speedDesc = '⏳ ค่อนข้างใช้เวลานานกับบางข้อ ควรฝึกเทคนิคสแกนคีย์เวิร์ด ตัดตัวเลือก หรือข้ามข้อติดขัดไปทำข้อง่ายก่อน';
        }

        container.innerHTML = `
            <div class="diag-card diag-strength">
                <div class="diag-card-title">
                    <span>🛡️</span>
                    <span style="color: #34d399;">${this.escapeHtml(strengthTitle)}</span>
                </div>
                <p class="diag-card-desc">${strengthDesc}</p>
            </div>

            <div class="diag-card diag-focus">
                <div class="diag-card-title">
                    <span>🎯</span>
                    <span style="color: #fbbf24;">${this.escapeHtml(focusTitle)}</span>
                </div>
                <p class="diag-card-desc">${focusDesc}</p>
            </div>

            <div class="diag-card diag-speed">
                <div class="diag-card-title">
                    <span>⏱️</span>
                    <span style="color: #38bdf8;">${this.escapeHtml(speedTitle)}</span>
                </div>
                <p class="diag-card-desc">${speedDesc}</p>
            </div>
        `;
    },

    async viewPastSessionReview(sessionId) {
        try {
            const res = await fetch(`/api/sessions/${sessionId}/review`);
            const data = await res.json();
            if (data.success) {
                const sess = data.data.session;
                const evaluated = data.data.answers.map(a => ({
                    question_id: a.question_id,
                    selected_option_id: a.selected_option_id,
                    is_correct: a.is_correct === 1,
                    correct_option: { label: a.correct_label, content: a.correct_content },
                    explanation: a.explanation,
                    trap_analysis: a.trap_analysis,
                    domain_name: a.domain_name,
                    subtopic_name: a.subtopic_name
                }));

                const synthSession = {
                    questions: data.data.answers.map(a => ({
                        id: a.question_id,
                        question_text: a.question_text,
                        stimulus: a.stimulus,
                        options: [
                            ...(a.selected_option_id ? [{ id: a.selected_option_id, label: a.selected_label, content: a.selected_content }] : [])
                        ]
                    }))
                };

                const domainMap = {};
                evaluated.forEach(a => {
                    const dom = a.subtopic_name || a.domain_name || 'ทั่วไป';
                    if (!domainMap[dom]) {
                        domainMap[dom] = { domain_name: dom, subtopic_name: dom, correct: 0, total: 0 };
                    }
                    domainMap[dom].total++;
                    if (a.is_correct) domainMap[dom].correct++;
                });
                const domainList = Object.values(domainMap).map(d => ({
                    ...d,
                    accuracy_pct: Math.round((d.correct / Math.max(d.total, 1)) * 100)
                }));

                const synthResult = {
                    score_earned: sess.score_earned,
                    max_score: sess.max_score,
                    accuracy_pct: Math.round((sess.correct_count / sess.total_questions) * 100),
                    correct_count: sess.correct_count,
                    wrong_count: sess.total_questions - sess.correct_count,
                    time_spent_seconds: sess.time_spent_seconds,
                    domain_breakdown: domainList,
                    evaluated_answers: evaluated
                };

                this.renderResults(synthResult, synthSession);
                this.navigate('results');
            }
        } catch (err) {
            console.error('Failed to view review', err);
        }
    },

    // [Mistakes & Mastered moved to public/js/modules/vocab-mistakes.js]

    // ==========================================
    // 6. QUICK START MODAL & CUSTOM QUESTIONS
    // ==========================================

    openQuickStartModal() {
        const modal = document.getElementById('quick-start-modal');
        modal.classList.add('open');
    },

    closeQuickStartModal() {
        document.getElementById('quick-start-modal').classList.remove('open');
    },

    populateModalSubjects(subjects) {
        const sel = document.getElementById('modal-subject-select');
        sel.innerHTML = subjects.map(s => `
            <option value="${s.id}">${s.code} - ${s.name_th}</option>
        `).join('');
        if (subjects.length > 0) {
            this.handleModalSubjectChange(subjects[0].id);
        }
    },

    async handleModalSubjectChange(subjectId) {
        try {
            const res = await fetch(`/api/subjects/${subjectId}`);
            const data = await res.json();
            if (data.success && data.data.blueprints) {
                const bpSelect = document.getElementById('modal-blueprint-select');
                bpSelect.innerHTML = `
                    <option value="">ทั้งหมดในวิชานี้ (สุ่มตามเกณฑ์)</option>
                    ${data.data.blueprints.map(bp => `
                        <option value="${bp.id}">${bp.domain_name} - ${bp.subtopic_name}</option>
                    `).join('')}
                `;
            }
        } catch (err) {
            console.error('Failed to populate blueprints for modal', err);
        }
    },

    startExamFromModal() {
        const subjectId = document.getElementById('modal-subject-select').value;
        const sessionType = document.querySelector('input[name="modal_session_type"]:checked').value;
        const bpId = document.getElementById('modal-blueprint-select').value;

        this.closeQuickStartModal();
        this.startExam(subjectId, sessionType, bpId || null);
    },

    // ==========================================
    // 7. ADD QUESTION & AI PROMPT
    // ==========================================

    populateAddFormSubjects() {
        const sel = document.getElementById('add-subject-select');
        sel.innerHTML = `
            <option value="">-- เลือกวิชา --</option>
            ${this.state.subjects.map(s => `<option value="${s.id}">${s.code} - ${s.name_th}</option>`).join('')}
        `;
    },

    async handleSubjectChangeInAddForm(subjectId) {
        const bpSelect = document.getElementById('add-blueprint-select');
        if (!subjectId) {
            bpSelect.innerHTML = '<option value="">-- กรุณาเลือกวิชาก่อน --</option>';
            return;
        }

        try {
            const res = await fetch(`/api/subjects/${subjectId}`);
            const data = await res.json();
            if (data.success && data.data.blueprints) {
                bpSelect.innerHTML = data.data.blueprints.map(bp => `
                    <option value="${bp.id}">${bp.domain_name} - ${bp.subtopic_name}</option>
                `).join('');
            }
        } catch (err) {
            console.error('Failed to load blueprints for add form', err);
        }
    },

    switchAddMode(mode) {
        const formManual = document.getElementById('form-add-question');
        const panelAI = document.getElementById('panel-add-ai');
        const tabManual = document.getElementById('tab-add-manual');
        const tabAI = document.getElementById('tab-add-ai');

        if (mode === 'manual') {
            formManual.style.display = 'block';
            panelAI.style.display = 'none';
            tabManual.classList.add('active');
            tabAI.classList.remove('active');
        } else {
            formManual.style.display = 'none';
            panelAI.style.display = 'block';
            tabManual.classList.remove('active');
            tabAI.classList.add('active');
        }
    },

    async handleSaveCustomQuestion(e) {
        e.preventDefault();

        const subjectId = document.getElementById('add-subject-select').value;
        const blueprintId = document.getElementById('add-blueprint-select').value;
        const stimulus = document.getElementById('add-stimulus').value;
        const questionText = document.getElementById('add-question-text').value;
        const difficulty = document.getElementById('add-difficulty').value;
        const explanation = document.getElementById('add-explanation').value;
        const trap = document.getElementById('add-trap').value;

        // Collect choices
        const optionRows = document.querySelectorAll('.option-input-row');
        const selectedCorrectRadio = document.querySelector('input[name="correct_opt"]:checked').value;

        const options = [];
        optionRows.forEach((row, idx) => {
            const content = row.querySelector('.opt-content').value;
            options.push({
                label: String(idx + 1),
                content: content,
                is_correct: parseInt(selectedCorrectRadio, 10) === idx
            });
        });

        try {
            const res = await fetch('/api/questions/custom', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject_id: subjectId,
                    blueprint_id: blueprintId,
                    stimulus,
                    question_text: questionText,
                    difficulty,
                    explanation,
                    trap_analysis: trap,
                    options
                })
            });

            const data = await res.json();
            if (data.success) {
                this.showToast('บันทึกข้อสอบลงในฐานข้อมูล SQLite สำเร็จ!', 'success');
                e.target.reset();
                this.loadSubjects();
            } else {
                this.showToast(data.error || 'ไม่สามารถบันทึกข้อสอบได้', 'error');
            }
        } catch (err) {
            console.error('Failed to save custom question', err);
            this.showToast('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์', 'error');
        }
    },

    copyAIPrompt() {
        const promptText = document.getElementById('ai-prompt-template').textContent.trim();
        navigator.clipboard.writeText(promptText).then(() => {
            this.showToast('คัดลอก Prompt สำหรับ AI เรียบร้อยแล้ว!', 'success');
        });
    },

    // [Highlighter & Vocab Bank moved to public/js/modules/vocab-mistakes.js]

    // ==========================================
    // 10. SCRATCHPAD MATH CANVAS ENGINE
    // ==========================================

    initScratchpad() {
        const canvas = document.getElementById('scratchpad-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        this.scratchCtx = ctx;

        this.setupScratchpadDrag();

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = rect.width > 0 ? (canvas.width / rect.width) : 1;
            const scaleY = rect.height > 0 ? (canvas.height / rect.height) : 1;
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        };

        const setupContext = () => {
            if (this.state.scratchTool === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.lineWidth = this.state.scratchStrokeSize * 8;
            } else {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = this.state.scratchColor;
                ctx.fillStyle = this.state.scratchColor;
                ctx.lineWidth = this.state.scratchStrokeSize;
            }
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        };

        const onPointerDown = (e) => {
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            e.preventDefault();
            this.state.isScratchDrawing = true;
            try { canvas.setPointerCapture(e.pointerId); } catch (_) { }

            setupContext();
            const pos = getPos(e);
            this.scratchStartX = pos.x;
            this.scratchStartY = pos.y;
            this.scratchLastX = pos.x;
            this.scratchLastY = pos.y;

            // Save snapshot for shape preview
            try {
                this.scratchSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
            } catch (_) { }

            // Immediate point/dot on click for pen or eraser
            if (this.state.scratchTool === 'pen' || this.state.scratchTool === 'eraser') {
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, Math.max(1, ctx.lineWidth / 2), 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const onPointerMove = (e) => {
            if (!this.state.isScratchDrawing) return;
            e.preventDefault();
            const pos = getPos(e);

            if (this.state.scratchTool === 'pen' || this.state.scratchTool === 'eraser') {
                ctx.beginPath();
                ctx.moveTo(this.scratchLastX, this.scratchLastY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                this.scratchLastX = pos.x;
                this.scratchLastY = pos.y;
            } else if (this.state.scratchTool === 'line') {
                if (this.scratchSnapshot) ctx.putImageData(this.scratchSnapshot, 0, 0);
                setupContext();
                ctx.beginPath();
                ctx.moveTo(this.scratchStartX, this.scratchStartY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            } else if (this.state.scratchTool === 'rect') {
                if (this.scratchSnapshot) ctx.putImageData(this.scratchSnapshot, 0, 0);
                setupContext();
                ctx.beginPath();
                ctx.strokeRect(
                    this.scratchStartX,
                    this.scratchStartY,
                    pos.x - this.scratchStartX,
                    pos.y - this.scratchStartY
                );
            } else if (this.state.scratchTool === 'circle') {
                if (this.scratchSnapshot) ctx.putImageData(this.scratchSnapshot, 0, 0);
                setupContext();
                const rx = Math.abs(pos.x - this.scratchStartX) / 2;
                const ry = Math.abs(pos.y - this.scratchStartY) / 2;
                const cx = Math.min(this.scratchStartX, pos.x) + rx;
                const cy = Math.min(this.scratchStartY, pos.y) + ry;
                ctx.beginPath();
                ctx.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
                ctx.stroke();
            }
        };

        const onPointerUp = (e) => {
            if (!this.state.isScratchDrawing) return;
            this.state.isScratchDrawing = false;
            try { canvas.releasePointerCapture(e.pointerId); } catch (_) { }
            this.saveCurrentScratchpad();
        };

        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerup', onPointerUp);
        canvas.addEventListener('pointercancel', onPointerUp);
    },

    setupScratchpadDrag() {
        const handle = document.getElementById('scratchpad-toolbar-handle');
        const dock = document.getElementById('scratchpad-dock');
        if (!handle || !dock) return;

        let isDragging = false;
        let startX = 0, startY = 0, origLeft = 0, origTop = 0;

        handle.addEventListener('pointerdown', (e) => {
            if (e.target.closest('button, input, select, .color-btn')) return;
            isDragging = true;
            try { handle.setPointerCapture(e.pointerId); } catch (_) { }
            const rect = dock.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            origLeft = rect.left;
            origTop = rect.top;
            dock.style.transform = 'none';
            dock.style.bottom = 'auto';
            dock.style.right = 'auto';
            dock.style.left = `${origLeft}px`;
            dock.style.top = `${origTop}px`;
        });

        handle.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const newLeft = Math.max(10, Math.min(window.innerWidth - 120, origLeft + dx));
            const newTop = Math.max(10, Math.min(window.innerHeight - 80, origTop + dy));
            dock.style.left = `${newLeft}px`;
            dock.style.top = `${newTop}px`;
        });

        const stopDrag = (e) => {
            if (!isDragging) return;
            isDragging = false;
            try { handle.releasePointerCapture(e.pointerId); } catch (_) { }
        };

        handle.addEventListener('pointerup', stopDrag);
        handle.addEventListener('pointercancel', stopDrag);
    },

    toggleScratchpad(forceOpen) {
        const dock = document.getElementById('scratchpad-dock');
        const backdrop = document.getElementById('scratchpad-backdrop');
        if (!dock) return;

        let isOpen;
        if (typeof forceOpen === 'boolean') {
            isOpen = forceOpen;
            if (isOpen) {
                dock.classList.add('open');
                if (backdrop) backdrop.classList.add('open');
            } else {
                dock.classList.remove('open');
                if (backdrop) backdrop.classList.remove('open');
            }
        } else {
            isOpen = dock.classList.toggle('open');
            if (backdrop) backdrop.classList.toggle('open', isOpen);
        }

        const btn = document.getElementById('btn-toggle-scratchpad');
        if (btn) {
            if (isOpen) btn.classList.add('btn-hl-active');
            else btn.classList.remove('btn-hl-active');
        }

        if (isOpen) {
            requestAnimationFrame(() => {
                this.ensureScratchpadCanvasSize();
                this.restoreCurrentScratchpad();
            });
        } else {
            this.saveCurrentScratchpad();
        }
    },

    openScratchpadWindow() {
        const session = this.state.activeSession;
        let qId = '_global';
        let qNum = 1;
        let qText = '';

        if (session && session.questions && session.questions[this.state.currentQuestionIndex]) {
            const q = session.questions[this.state.currentQuestionIndex];
            qId = q.id;
            qNum = this.state.currentQuestionIndex + 1;
            qText = q.question_text ? q.question_text.replace(/<[^>]+>/g, '').substring(0, 90) : '';
        }

        this.saveCurrentScratchpad();

        const url = `scratchpad.html?q=${encodeURIComponent(qId)}&num=${qNum}&text=${encodeURIComponent(qText)}`;
        const popup = window.open(url, 'TCAS_Scratchpad', 'width=1050,height=780,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=no');
        if (popup) {
            popup.focus();
            this.showToast('เปิดกระดานทดเลขเป็นหน้าต่างแยก (Pop-up Window) เรียบร้อยแล้ว!', 'info');
        } else {
            this.showToast('กรุณาอนุญาต Pop-up บนเบราว์เซอร์เพื่อเปิดหน้าต่างแยก', 'warning');
        }

        // Close center modal
        this.toggleScratchpad(false);
    },

    setupCrossWindowScratchpadSync() {
        if (typeof BroadcastChannel !== 'undefined') {
            this.scratchpadChannel = new BroadcastChannel('tcas_scratchpad_channel');
            this.scratchpadChannel.onmessage = (event) => {
                const msg = event.data;
                if (!msg) return;

                if (msg.type === 'SCRATCHPAD_UPDATE' && msg.questionId) {
                    this.state.scratchpadData[msg.questionId] = msg.dataUrl;
                    const currentKey = this.getScratchpadKey();
                    if (currentKey === msg.questionId) {
                        this.restoreCurrentScratchpad();
                    }
                }
            };
        }

        // Fallback for storage event
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('tcas_scratchpad_') && e.newValue) {
                const qId = e.key.replace('tcas_scratchpad_', '');
                this.state.scratchpadData[qId] = e.newValue;
                const currentKey = this.getScratchpadKey();
                if (currentKey === qId) {
                    this.restoreCurrentScratchpad();
                }
            }
        });
    },

    notifyScratchpadQuestionChange() {
        const session = this.state.activeSession;
        if (!session || !this.scratchpadChannel) return;
        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        this.scratchpadChannel.postMessage({
            type: 'CHANGE_QUESTION',
            questionId: q.id,
            questionIndex: this.state.currentQuestionIndex,
            questionText: q.question_text ? q.question_text.replace(/<[^>]+>/g, '').substring(0, 90) : ''
        });
    },

    ensureScratchpadCanvasSize() {
        const canvas = document.getElementById('scratchpad-canvas');
        const wrapper = document.getElementById('canvas-wrapper');
        if (!canvas || !wrapper) return;

        const w = Math.floor(wrapper.clientWidth) || 850;
        const h = Math.floor(wrapper.clientHeight) || 600;

        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            this.scratchCtx = canvas.getContext('2d');
        }
        if (!this.scratchCtx) {
            this.scratchCtx = canvas.getContext('2d');
        }
    },

    setScratchTool(tool) {
        this.state.scratchTool = tool;
        document.querySelectorAll('.tool-btn').forEach(btn => {
            if (btn.id && btn.id.startsWith('sp-tool-')) {
                btn.classList.remove('active');
            }
        });
        const activeBtn = document.getElementById(`sp-tool-${tool}`);
        if (activeBtn) activeBtn.classList.add('active');
    },

    setScratchColor(color) {
        this.state.scratchColor = color;
        if (this.state.scratchTool === 'eraser') {
            this.setScratchTool('pen');
        }
        document.querySelectorAll('.color-btn').forEach(btn => {
            if (btn.style.background === color || btn.getAttribute('style')?.includes(color)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    },

    setScratchStrokeSize(size) {
        this.state.scratchStrokeSize = parseInt(size, 10);
    },

    toggleScratchGrid() {
        const wrapper = document.getElementById('canvas-wrapper');
        const btn = document.getElementById('sp-grid-toggle');
        if (!wrapper) return;
        this.state.scratchGrid = !this.state.scratchGrid;
        if (this.state.scratchGrid) {
            wrapper.classList.add('grid-bg');
            if (btn) btn.classList.add('active');
            this.showToast('เปิดเส้นตารางกริดคณิตศาสตร์', 'info');
        } else {
            wrapper.classList.remove('grid-bg');
            if (btn) btn.classList.remove('active');
            this.showToast('ปิดเส้นตารางกริด', 'info');
        }
    },

    clearScratchpad() {
        const canvas = document.getElementById('scratchpad-canvas');
        if (!canvas) return;
        if (!this.scratchCtx) this.scratchCtx = canvas.getContext('2d');
        if (!this.scratchCtx) return;
        this.scratchCtx.clearRect(0, 0, canvas.width, canvas.height);
        this.saveCurrentScratchpad();
        this.showToast('ล้างกระดานทดเลขเรียบร้อย', 'info');
    },

    getScratchpadKey() {
        const session = this.state.activeSession;
        if (session && session.questions && session.questions[this.state.currentQuestionIndex]) {
            return session.questions[this.state.currentQuestionIndex].id;
        }
        return '_global';
    },

    saveCurrentScratchpad() {
        const canvas = document.getElementById('scratchpad-canvas');
        if (!canvas) return;
        const key = this.getScratchpadKey();
        this.state.scratchpadData[key] = canvas.toDataURL();
    },

    restoreCurrentScratchpad() {
        const canvas = document.getElementById('scratchpad-canvas');
        if (!canvas) return;
        if (!this.scratchCtx) this.scratchCtx = canvas.getContext('2d');
        if (!this.scratchCtx) return;
        const key = this.getScratchpadKey();

        this.scratchCtx.clearRect(0, 0, canvas.width, canvas.height);

        if (this.state.scratchpadData[key]) {
            const img = new Image();
            img.onload = () => {
                if (this.scratchCtx) {
                    this.scratchCtx.drawImage(img, 0, 0);
                }
            };
            img.src = this.state.scratchpadData[key];
        }
    },

    // [AI Tutor, CEFR Quiz & Auth moved to public/js/modules/{ai-tutor,cefr,auth}.js]

    // ==========================================
    // CHEAT SHEET & FORMULA GUIDE MODAL
    // ==========================================
    async openCheatSheetModal(subjectId) {
        // If subjectId is omitted, detect from activeSession or currentSubjectId
        const targetId = subjectId || (this.state.activeSession ? this.state.activeSession.subject.id : (this.state.currentSubjectId || 'tgat2'));
        this._lastCheatSheetSubjectId = targetId;

        const modal = document.getElementById('cheatsheet-modal');
        const titleEl = document.getElementById('cs-modal-title');
        const badgeEl = document.getElementById('cs-modal-badge');
        const descEl = document.getElementById('cs-modal-desc');
        const contentEl = document.getElementById('cs-modal-content');
        const startBtn = document.getElementById('cs-modal-start-btn');

        if (!modal) return;

        // Show modal and loading state
        modal.classList.add('open');
        if (titleEl) titleEl.textContent = 'กำลังโหลดสรุปสูตร & แนวข้อสอบ...';
        if (contentEl) contentEl.innerHTML = '<div style="text-align:center; padding: 2.5rem; color: var(--text-muted);">⏳ กำลังดึงข้อมูลจาก MyTCAS Blueprint Master...</div>';

        try {
            const res = await fetch(`/api/subjects/${targetId}/cheatsheet`);
            const json = await res.json();
            if (!json.success || !json.data) {
                throw new Error(json.error || 'ไม่พบข้อมูลสรุปสูตร');
            }

            const cs = json.data;
            if (titleEl) titleEl.textContent = cs.title;
            if (badgeEl) badgeEl.textContent = cs.badge;
            if (descEl) descEl.textContent = cs.description;

            // Handle start exam button visibility
            if (startBtn) {
                const isComingSoon = cs.subject && cs.subject.status === 'coming_soon';
                const isInExam = this.state.currentView === 'exam' && this.state.activeSession;
                if (isInExam || isComingSoon) {
                    startBtn.style.display = 'none';
                } else {
                    startBtn.style.display = 'inline-flex';
                }
            }

            if (contentEl && cs.sections) {
                contentEl.innerHTML = cs.sections.map(sec => `
                    <div class="cheat-section-block">
                        <h3 class="cheat-sec-heading">${sec.title}</h3>
                        <div class="cheat-sec-body">${sec.content}</div>
                    </div>
                `).join('');

                // Render KaTeX formulas if available
                if (window.renderMathInElement) {
                    window.renderMathInElement(contentEl, {
                        delimiters: [
                            { left: '$$', right: '$$', display: true },
                            { left: '$', right: '$', display: false }
                        ],
                        throwOnError: false
                    });
                }
            }
        } catch (err) {
            console.error('Failed to load cheatsheet', err);
            if (contentEl) {
                contentEl.innerHTML = `<div style="text-align:center; padding: 2rem; color: #f43f5e;">❌ ไม่สามารถโหลดข้อมูลสรุปสูตรได้: ${err.message}</div>`;
            }
        }
    },

    closeCheatSheetModal() {
        const modal = document.getElementById('cheatsheet-modal');
        if (modal) modal.classList.remove('open');
    },

    startExamFromCheatSheet() {
        this.closeCheatSheetModal();
        const subjectId = this._lastCheatSheetSubjectId || 'tgat2';
        this.startExam(subjectId, 'full_mock');
    },

    formatMarkdown(text) {
        if (!text) return '';
        let html = text
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(/^---$/gim, '<hr>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');

        return `<p>${html}</p>`;
    },

    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

