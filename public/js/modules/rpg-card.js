// ==========================================
// RPG CARD LEVEL TIERS & VISUAL ART CONFIG
// Art Agent: Edit tier thresholds, rarity labels, and CSS tier-* themes in public/css/rpg-card.css
// ==========================================
const RPG_CARD_TIERS = [
    { minLevel: 20, className: 'tier-mythic', rarity: '★ MYTHIC TCAS ★', borderColor: '#ec4899', gradStops: ['#1c0b30', '#2b1046', '#0e031a'] },
    { minLevel: 10, className: 'tier-gold',   rarity: '★ UR EDITION ★',  borderColor: '#f59e0b', gradStops: ['#221908', '#352509', '#140f03'] },
    { minLevel: 5,  className: 'tier-silver', rarity: '★ SSR EDITION ★', borderColor: '#38bdf8', gradStops: ['#0f172a', '#1e293b', '#090d16'] },
    { minLevel: 1,  className: 'tier-bronze', rarity: '★ SR EDITION ★',  borderColor: '#b45309', gradStops: ['#1a130e', '#2a1d15', '#110b07'] }
];
window.RPG_CARD_TIERS = RPG_CARD_TIERS;

Object.assign(app, {
    getCardTierForLevel(lvl) {
        return RPG_CARD_TIERS.find(t => (lvl || 1) >= t.minLevel) || RPG_CARD_TIERS[RPG_CARD_TIERS.length - 1];
    },

    async loadUserStatus(isInitial = false) {
        try {
            const res = await fetch('/api/stats/rpg-status');
            const result = await res.json();
            if (!result.success) return;
            const d = result.data;

            // 1. Update Sidebar Badges & Header User Chip
            const sideAvatar = document.getElementById('sidebar-user-avatar');
            const sideName = document.getElementById('sidebar-user-name');
            const sideSub = document.getElementById('sidebar-user-sub');
            const sideBadge = document.getElementById('sidebar-level-badge');
            const topBadge = document.querySelector('.topbar-user-badge');

            if (this.state.currentUser) {
                this.state.currentUser.stats = this.state.currentUser.stats || {};
                this.state.currentUser.stats.level = d.level;
                this.state.currentUser.stats.total_xp = d.total_xp;
                if (!this.state.currentUser.avatar_url && d.user && d.user.avatar_url) {
                    this.state.currentUser.avatar_url = d.user.avatar_url;
                }
            }

            const avatar = (this.state.currentUser && this.state.currentUser.avatar_url) ? this.state.currentUser.avatar_url : ((d.user && d.user.avatar_url) ? d.user.avatar_url : '👨‍🎓');
            const username = (this.state.currentUser && this.state.currentUser.username) ? this.state.currentUser.username : ((d.user && d.user.username) ? d.user.username : 'student');

            if (sideAvatar) sideAvatar.innerHTML = this.renderAvatar(avatar, 38);
            if (sideName) sideName.textContent = (this.state.currentUser && this.state.currentUser.display_name) ? this.state.currentUser.display_name : (d.user && d.user.display_name ? d.user.display_name : d.rank_title);
            if (sideSub) sideSub.textContent = `@${username} • Lv.${d.level}`;
            if (sideBadge) sideBadge.textContent = `Lv.${d.level}`;
            if (topBadge) topBadge.textContent = `Lv.${d.level}`;

            // 2. Update Hero Card
            const heroLvl = document.getElementById('rpg-hero-level');
            const heroBadge = document.getElementById('rpg-hero-badge');
            const heroStreak = document.getElementById('rpg-hero-streak');
            const heroTitle = document.getElementById('rpg-hero-title');
            const heroSubtitle = document.getElementById('rpg-hero-subtitle');
            const expText = document.getElementById('rpg-exp-text');
            const expFill = document.getElementById('rpg-exp-fill');
            const combatPower = document.getElementById('rpg-combat-power');

            if (heroLvl) heroLvl.textContent = `Lv.${d.level}`;
            if (heroBadge) {
                heroBadge.textContent = d.rank_badge;
                heroBadge.style.borderColor = d.rank_color;
                heroBadge.style.color = d.rank_color;
            }
            const streakVal = document.getElementById('rpg-streak-days-val');
            if (streakVal) streakVal.textContent = `${d.streak_days} วันติด`;
            const topStreak = document.getElementById('hero-streak-badge');
            if (topStreak) topStreak.innerHTML = `${this.svg('flame', { size: 14, color: '#f59e0b' })} ${d.streak_days} วันติด`;
            if (heroTitle) heroTitle.textContent = d.rank_title;
            if (heroSubtitle) heroSubtitle.textContent = `TCAS Challenger • ค่าประสบการณ์รวม ${d.total_xp.toLocaleString()} XP`;
            if (expText) expText.textContent = `${d.xp_in_level.toLocaleString()} / ${d.xp_needed.toLocaleString()} XP (${d.xp_percent}%)`;
            if (expFill) expFill.style.width = `${d.xp_percent}%`;
            if (combatPower) combatPower.textContent = d.combat_power.toLocaleString();

            // 2.5 Update Collectible Trading Card Elements
            const cardAvatar = document.getElementById('card-avatar-display');
            const cardName = document.getElementById('card-player-name');
            const cardSerial = document.getElementById('card-serial-no');
            const cardRarity = document.getElementById('card-rarity-badge');
            const cardFront = document.getElementById('tcas-card-front');

            if (cardAvatar) cardAvatar.innerHTML = this.renderAvatar(avatar, 108);
            if (cardName) cardName.textContent = (this.state.currentUser && this.state.currentUser.display_name) ? this.state.currentUser.display_name : (d.user && d.user.display_name ? d.user.display_name : username);
            if (cardSerial) cardSerial.textContent = `#TCAS-68-${username.toUpperCase().slice(0, 8)}`;
            const tier = this.getCardTierForLevel(d.level);
            if (cardRarity) {
                cardRarity.textContent = tier.rarity;
            }
            if (cardFront) {
                cardFront.classList.remove(...RPG_CARD_TIERS.map(t => t.className));
                cardFront.classList.add(tier.className);
            }

            // Card Back Stats
            const bAns = document.getElementById('card-back-answered');
            const bAcc = document.getElementById('card-back-accuracy');
            const bMas = document.getElementById('card-back-mastered');
            const bTime = document.getElementById('card-back-time');
            if (bAns) bAns.textContent = `${d.raw ? d.raw.total_answered || 0 : 0} ข้อ`;
            if (bAcc) bAcc.textContent = `${d.stats ? d.stats.accuracy || 0 : 0}%`;
            if (bMas) bMas.textContent = `${d.raw ? d.raw.total_mastered || 0 : 0} คำ`;
            if (bTime) bTime.textContent = `${d.raw ? Math.round((d.raw.total_time_spent_seconds || 0) / 60) : 0} นาที`;

            this.setupTradingCardTilt();

            // If background update and user is not looking at status view, don't re-render chart
            if (isInitial && this.state.currentView !== 'status') return;

            // 3. Render Dynamic SVG Radar Chart
            this.renderRpgRadarChart(d.stats);

            // 4. Render Core Attributes List
            this.renderRpgAttributes(d.stats, d.raw);

            // 5. Render Achievements
            this.renderRpgAchievements(d.achievements);

        } catch (err) {
            console.error('Failed to load RPG status', err);
        }
    },

    renderRpgRadarChart(stats) {
        const container = document.getElementById('rpg-radar-container');
        if (!container) return;

        const cx = 190;
        const cy = 185;
        const R = 115;
        const numAxes = 5;

        // Angles for 5 vertices: -90° (top), -18°, 54°, 126°, 198°
        const angles = [];
        for (let i = 0; i < numAxes; i++) {
            angles.push((i * (2 * Math.PI / numAxes)) - (Math.PI / 2));
        }

        // Web Rings (20%, 40%, 60%, 80%, 100%)
        const ringLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
        const ringsSvg = ringLevels.map(lvl => {
            const pts = angles.map(ang => {
                const x = cx + R * lvl * Math.cos(ang);
                const y = cy + R * lvl * Math.sin(ang);
                return `${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(' ');
            return `<polygon points="${pts}" fill="${lvl === 1.0 ? 'rgba(255,255,255,0.02)' : 'none'}" stroke="rgba(148, 163, 184, ${lvl === 1.0 ? 0.35 : 0.18})" stroke-width="${lvl === 1.0 ? '1.5' : '1'}" stroke-dasharray="${lvl === 1.0 ? 'none' : '3,3'}" />`;
        }).join('\n');

        // Axis Lines
        const axisLinesSvg = angles.map(ang => {
            const x = cx + R * Math.cos(ang);
            const y = cy + R * Math.sin(ang);
            return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(148, 163, 184, 0.25)" stroke-width="1.2" />`;
        }).join('\n');

        // Data Polygon points (scaled between 10 and 100, or 0 if completely uninitialized)
        const hasAnyStats = ((stats.accuracy || 0) + (stats.speed || 0) + (stats.defense || 0) + (stats.mastery || 0) + (stats.consistency || 0)) > 0;
        const values = [
            hasAnyStats ? Math.max(10, Math.min(100, stats.accuracy || 0)) : 0,
            hasAnyStats ? Math.max(10, Math.min(100, stats.speed || 0)) : 0,
            hasAnyStats ? Math.max(10, Math.min(100, stats.defense || 0)) : 0,
            hasAnyStats ? Math.max(10, Math.min(100, stats.mastery || 0)) : 0,
            hasAnyStats ? Math.max(10, Math.min(100, stats.consistency || 0)) : 0
        ];

        const dataPts = values.map((val, i) => {
            const scale = val / 100;
            const x = cx + R * scale * Math.cos(angles[i]);
            const y = cy + R * scale * Math.sin(angles[i]);
            return { x, y, val };
        });

        const polygonPoints = dataPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

        // Glowing Vertex Nodes
        const nodesSvg = dataPts.map(p => `
            <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" fill="#38bdf8" stroke="#ffffff" stroke-width="2">
                <title>${p.val}/100</title>
            </circle>
        `).join('\n');

        // Labels definitions
        const labelsData = [
            { text: 'ACC แม่นยำ', score: stats.accuracy, color: '#38bdf8', anchor: 'middle', baseline: 'auto', dx: 0, dy: -14 },
            { text: 'SPD สปีด', score: stats.speed, color: '#f59e0b', anchor: 'start', baseline: 'middle', dx: 14, dy: 0 },
            { text: 'DEF ต้านจุดหลอก', score: stats.defense, color: '#10b981', anchor: 'start', baseline: 'hanging', dx: 8, dy: 14 },
            { text: 'MST ทบทวนแม่น', score: stats.mastery, color: '#a78bfa', anchor: 'end', baseline: 'hanging', dx: -8, dy: 14 },
            { text: 'CON วินัยต่อเนื่อง', score: stats.consistency, color: '#f43f5e', anchor: 'end', baseline: 'middle', dx: -14, dy: 0 }
        ];

        const labelsSvg = labelsData.map((lbl, i) => {
            const ang = angles[i];
            const lx = cx + R * Math.cos(ang) + lbl.dx;
            const ly = cy + R * Math.sin(ang) + lbl.dy;
            return `
                <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${lbl.anchor}" dominant-baseline="${lbl.baseline}" font-size="11.5" font-weight="600" fill="#e2e8f0" font-family="'Prompt', sans-serif">
                    ${lbl.text}
                    <tspan font-weight="700" fill="${lbl.color}"> ${lbl.score}</tspan>
                </text>
            `;
        }).join('\n');

        container.innerHTML = `
            <svg class="radar-svg" viewBox="0 0 380 370" width="100%" height="340" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="radarRadialGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.18" />
                        <stop offset="70%" stop-color="#6366f1" stop-opacity="0.08" />
                        <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
                    </radialGradient>
                    <linearGradient id="radarPolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.7" />
                        <stop offset="50%" stop-color="#6366f1" stop-opacity="0.5" />
                        <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.35" />
                    </linearGradient>
                    <filter id="radarFilterGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <!-- Center Glow -->
                <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#radarRadialGlow)" />

                <!-- Grid Web & Axes -->
                ${ringsSvg}
                ${axisLinesSvg}

                <!-- Stats Polygon Area -->
                <polygon points="${polygonPoints}" fill="url(#radarPolyGrad)" stroke="#06b6d4" stroke-width="2.5" filter="url(#radarFilterGlow)" />

                <!-- Node Markers -->
                ${nodesSvg}

                <!-- Center Bullseye -->
                <circle cx="${cx}" cy="${cy}" r="3" fill="#94a3b8" opacity="0.6" />

                <!-- Labels -->
                ${labelsSvg}
            </svg>
        `;
    },

    renderRpgAttributes(stats, raw = {}) {
        const container = document.getElementById('rpg-attr-list');
        if (!container) return;

        const isGuestOrEmpty = !raw.total_answered || raw.total_answered === 0;

        const attrs = [
            {
                code: 'ACC',
                name: 'Accuracy (ความแม่นยำในการตอบ)',
                icon: this.svg('target', { size: 18, color: '#06b6d4' }),
                value: stats.accuracy || 0,
                color: '#06b6d4',
                desc: isGuestOrEmpty
                    ? 'ยังไม่มีประวัติการทำข้อสอบ (เริ่มทำข้อสอบเพื่อวัดระดับ)'
                    : `ตอบถูกทั้งหมด ${raw.total_correct} จาก ${raw.total_answered} ข้อ ในการทดสอบทั้งหมด`
            },
            {
                code: 'SPD',
                name: 'Speed (ความเร็วเฉลี่ยต่อข้อ)',
                icon: this.svg('zap', { size: 18, color: '#f59e0b' }),
                value: stats.speed || 0,
                color: '#f59e0b',
                desc: isGuestOrEmpty || !raw.avg_time_seconds
                    ? 'ยังไม่มีประวัติการจับเวลา (เกณฑ์แนะนำ ทปอ. 45-60 วินาที/ข้อ)'
                    : `ใช้เวลาเฉลี่ย ${raw.avg_time_seconds} วินาที/ข้อ (เกณฑ์แนะนำ ทปอ. 45-60 วินาที)`
            },
            {
                code: 'DEF',
                name: 'Trap Defense (ภูมิคุ้มกันจุดหลอก)',
                icon: this.svg('shield', { size: 18, color: '#10b981' }),
                value: stats.defense || 0,
                color: '#10b981',
                desc: raw.total_trap_q > 0
                    ? `ตรวจจับและรอดพ้นจุดหลอก ${raw.trap_defended || 0} จาก ${raw.total_trap_q} ข้อ`
                    : 'ความสามารถในการตรวจจับช้อยส์ลวงและจุดหลอกที่ ทปอ. มักตั้งไว้'
            },
            {
                code: 'MST',
                name: 'Mastery (การแก้ไขจุดอ่อน & คลังศัพท์)',
                icon: this.svg('brain', { size: 18, color: '#8b5cf6' }),
                value: stats.mastery || 0,
                color: '#8b5cf6',
                desc: (raw.mastered_mistakes > 0 || raw.mastered_vocab > 0)
                    ? `พิชิตจุดอ่อน ${raw.mastered_mistakes || 0} ข้อ • แม่นยำคำศัพท์ ${raw.mastered_vocab || 0} คำ`
                    : 'ยังไม่มีประวัติพิชิตจุดอ่อนหรือคำศัพท์'
            },
            {
                code: 'CON',
                name: 'Consistency (ไฟความต่อเนื่อง & วินัย)',
                icon: this.svg('flame', { size: 18, color: '#f43f5e' }),
                value: stats.consistency || 0,
                color: '#f43f5e',
                desc: raw.total_sessions > 0
                    ? `ฝึกฝนต่อเนื่องและทำข้อสอบจำลองจบไปแล้ว ${raw.total_sessions} ชุดเต็ม`
                    : 'ยังไม่มีประวัติการทำข้อสอบจำลองจบชุด'
            }
        ];

        container.innerHTML = attrs.map(a => `
            <div class="attr-card">
                <div class="attr-header">
                    <div class="attr-title-group">
                        <span class="attr-icon">${a.icon}</span>
                        <div>
                            <span class="attr-name">${a.name}</span>
                            <span class="attr-tag" style="background: ${a.color}22; color: ${a.color}; border: 1px solid ${a.color}44;">${a.code}</span>
                        </div>
                    </div>
                    <span class="attr-score" style="color: ${a.color};">${a.value} <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 400;">/100</span></span>
                </div>
                <div class="attr-bar-track">
                    <div class="attr-bar-fill" style="width: ${a.value}%; background: linear-gradient(90deg, ${a.color}aa, ${a.color});"></div>
                </div>
                <p class="attr-desc">${a.desc}</p>
            </div>
        `).join('');
    },

    renderRpgAchievements(achievements) {
        const countEl = document.getElementById('rpg-achieve-count');
        const container = document.getElementById('rpg-achieve-grid');
        if (!container || !achievements) return;

        const unlockedCount = achievements.filter(a => a.unlocked).length;
        if (countEl) {
            countEl.textContent = `${unlockedCount}/${achievements.length} สำเร็จ`;
        }

        container.innerHTML = achievements.map(a => `
            <div class="achievement-card ${a.unlocked ? 'unlocked' : 'locked'}">
                <div class="achieve-icon-box">
                    <span class="achieve-icon">${a.icon}</span>
                </div>
                <div class="achieve-content">
                    <div class="achieve-header">
                        <h4 class="achieve-title">${a.name}</h4>
                        <span class="achieve-status-badge ${a.unlocked ? 'status-unlocked' : 'status-locked'}">
                            ${a.unlocked ? '<span style="display:inline-flex;align-items:center;gap:4px;">' + this.svg('check-circle', { size: 13, color: '#34d399' }) + ' ปลดล็อกแล้ว</span>' : '<span style="display:inline-flex;align-items:center;gap:4px;">' + this.svg('lock', { size: 13, color: '#94a3b8' }) + ' ล็อกอยู่</span>'}
                        </span>
                    </div>
                    <p class="achieve-desc">${a.desc}</p>
                </div>
            </div>
        `).join('');
    },

    // ==========================================
    // 3D COLLECTIBLE TRADING CARD ENGINE
    // ==========================================
        // ==========================================
    // 3D COLLECTIBLE TRADING CARD ENGINE
    // ==========================================
    setupTradingCardTilt() {
        const card = document.getElementById('tcas-card-3d-wrapper');
        const tilt = document.getElementById('tcas-card-tilt');
        const flip = document.getElementById('tcas-card-flip');
        const glare = document.getElementById('card-holo-glare');
        if (!card || !tilt || card._tiltBound) return;
        card._tiltBound = true;

        const handleMove = (clientX, clientY) => {
            if (flip && flip.classList.contains('is-flipped')) {
                tilt.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                if (glare) glare.style.opacity = '0';
                return;
            }
            const rect = card.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            const halfW = rect.width / 2;
            const halfH = rect.height / 2;

            const rotateX = ((halfH - y) / halfH) * 12;
            const rotateY = ((x - halfW) / halfW) * 12;

            tilt.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            if (glare) {
                glare.style.opacity = '1';
                glare.style.background = `radial-gradient(circle at ${(x / rect.width * 100).toFixed(1)}% ${(y / rect.height * 100).toFixed(1)}%, rgba(255,255,255,0.45) 0%, rgba(236,72,153,0.2) 35%, transparent 70%)`;
            }
        };

        const handleReset = () => {
            tilt.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            if (glare) glare.style.opacity = '0';
        };

        card.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
        card.addEventListener('mouseleave', handleReset);

        // Touch support for iPad / Mobile
        card.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0]) {
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });
        card.addEventListener('touchend', handleReset);
    },

    flipTradingCard() {
        const flip = document.getElementById('tcas-card-flip');
        if (!flip) return;
        this.playSfx('select');
        const isFlipped = flip.classList.toggle('is-flipped');
        const tilt = document.getElementById('tcas-card-tilt');
        if (tilt) {
            tilt.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
        const glare = document.getElementById('card-holo-glare');
        if (glare) glare.style.opacity = '0';

        const btn = document.getElementById('btn-flip-card');
        if (btn) {
            btn.innerHTML = isFlipped
                ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: text-bottom; margin-right: 4px;"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>พลิกดูหน้าการ์ด`
                : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: text-bottom; margin-right: 4px;"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>พลิกดูหลังการ์ด`;
        }
    },

    downloadTradingCard() {
        this.playSfx('click');
        this.showToast('กำลังสร้างรูปการ์ดพลังความละเอียดสูง...', 'info');

        const canvas = document.createElement('canvas');
        canvas.width = 750;
        canvas.height = 1100;
        const ctx = canvas.getContext('2d');

        const u = this.state.currentUser || {};
        const stats = u.stats || {};
        const lvl = stats.level || 1;
        const name = (u.display_name || u.username || 'นักรบ TCAS');
        const avatar = u.avatar_url || '👨‍🎓';
        const cp = document.getElementById('rpg-combat-power')?.textContent || '0';
        const rank = document.getElementById('rpg-hero-badge')?.textContent || 'Tier V';
        const title = document.getElementById('rpg-hero-title')?.textContent || 'ผู้เริ่มต้นการเดินทาง';

        // 1. Background Frame
        const tier = this.getCardTierForLevel(lvl);
        const borderCol = tier.borderColor;
        const stops = tier.gradStops || ['#1a130e', '#2a1d15', '#110b07'];
        const bgGrad = ctx.createLinearGradient(0, 0, 750, 1100);
        bgGrad.addColorStop(0, stops[0]);
        bgGrad.addColorStop(0.5, stops[1]);
        bgGrad.addColorStop(1, stops[2]);

        // Draw Card Body
        ctx.fillStyle = bgGrad;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(20, 20, 710, 1060, 36);
        else ctx.rect(20, 20, 710, 1060);
        ctx.fill();
        ctx.lineWidth = 8;
        ctx.strokeStyle = borderCol;
        ctx.stroke();

        // Inner Border Ring
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(32, 32, 686, 1036, 28);
        else ctx.rect(32, 32, 686, 1036);
        ctx.stroke();

        // 2. Header
        ctx.fillStyle = borderCol;
        ctx.font = 'bold 22px Outfit, sans-serif';
        ctx.fillText(tier.rarity, 50, 75);

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 18px Outfit, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`TCAS68 • #00${lvl}`, 700, 75);
        ctx.textAlign = 'left';

        // 3. Avatar Box
        ctx.save();
        ctx.beginPath();
        ctx.arc(375, 260, 115, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = borderCol;
        ctx.stroke();

        const initialLabel = (name || 'T').trim().charAt(0).toUpperCase();
        ctx.fillStyle = '#e0e7ff';
        ctx.font = 'bold 88px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initialLabel, 375, 264);
        ctx.restore();

        // Level Badge
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(315, 365, 120, 42, 21);
        else ctx.rect(315, 365, 120, 42);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Lv.${lvl}`, 375, 393);

        // 4. Character Title & Name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 38px Kanit, sans-serif';
        ctx.fillText(name, 375, 470);

        ctx.fillStyle = borderCol;
        ctx.font = '24px Prompt, sans-serif';
        ctx.fillText(`${title} • ${rank}`, 375, 515);

        // 5. Combat Power Box
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(65, 560, 620, 180, 24);
        else ctx.rect(65, 560, 620, 180);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 20px Outfit, sans-serif';
        ctx.fillText('COMBAT POWER (CP)', 375, 605);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 64px Outfit, sans-serif';
        ctx.fillText(cp, 375, 680);

        // 6. Blueprint Certified Stamp
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(200, 775, 350, 65, 12);
        else ctx.rect(200, 775, 350, 65);
        ctx.fill();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 24px Outfit, sans-serif';
        ctx.fillText('✓ ทปอ. BLUEPRINT SPEC', 375, 816);

        // 7. Footer Trademark
        ctx.fillStyle = '#64748b';
        ctx.font = '16px Outfit, sans-serif';
        ctx.fillText('TCAS BLUEPRINT MASTER • OFFICIAL COLLECTIBLE TCG', 375, 960);
        ctx.fillText('tcas-master.onrender.com', 375, 990);

        // Trigger Download
        setTimeout(() => {
            const link = document.createElement('a');
            link.download = `TCAS-Card-${u.username || 'Student'}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            this.playSfx('correct');
            this.showToast('บันทึกรูปการ์ดพลังเรียบร้อยแล้ว!', 'success');
        }, 300);
    }
});
