/**
 * TCAS Master - User Account, Auth & Leaderboard Module
 */
Object.assign(app, {
    // ==========================================
    // 9. USER ACCOUNT & AUTHENTICATION CONTROLLER
    // ==========================================

    async initAuth() {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (data.success && data.user) {
                this.state.currentUser = data.user;
            } else {
                this.state.currentUser = null;
            }
        } catch (err) {
            console.error('Failed to initialize user session:', err);
            this.state.currentUser = null;
        }
        this.updateUserUI();
    },

    updateUserUI() {
        const u = this.state.currentUser;
        const topbarSection = document.getElementById('topbar-user-section');
        const sidebarAvatar = document.getElementById('sidebar-user-avatar');
        const sidebarName = document.getElementById('sidebar-user-name');
        const sidebarSub = document.getElementById('sidebar-user-sub');
        const sidebarBadge = document.getElementById('sidebar-level-badge');
        const sidebarAuthBtn = document.getElementById('btn-sidebar-auth');

        if (u && u.role !== 'guest') {
            const lvl = u.stats ? u.stats.level : 1;
            const avatar = u.avatar_url || 'scholar-m';

            if (sidebarAvatar) sidebarAvatar.innerHTML = this.renderAvatar(avatar, 38);
            if (sidebarName) sidebarName.textContent = u.display_name || u.username;
            if (sidebarSub) sidebarSub.textContent = `@${u.username} • Lv.${lvl}`;
            if (sidebarBadge) sidebarBadge.textContent = `Lv.${lvl}`;
            const heroLvl = document.getElementById('rpg-hero-level');
            if (heroLvl) heroLvl.textContent = `Lv.${lvl}`;

            if (sidebarAuthBtn) {
                sidebarAuthBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                `;
                sidebarAuthBtn.title = 'ออกจากระบบ';
            }

            if (topbarSection) {
                topbarSection.innerHTML = `
                    <div class="topbar-user-chip" onclick="app.navigate('status')" title="คลิกดูสเตตัสตัวละคร RPG ของคุณ">
                        <span class="topbar-avatar">${this.renderAvatar(avatar, 26)}</span>
                        <span class="topbar-user-name btn-text-responsive">${this.escapeHtml(u.display_name || u.username)}</span>
                        <span class="topbar-user-badge">Lv.${lvl}</span>
                        <button class="btn btn-outline btn-sm btn-logout-chip" onclick="event.stopPropagation(); app.handleLogout()" title="ออกจากระบบ">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                            <span class="btn-text-responsive">ออก</span>
                        </button>
                    </div>
                `;
            }
        } else {
            // Guest mode
            if (sidebarAvatar) sidebarAvatar.innerHTML = this.renderAvatar('scholar-m', 38);
            if (sidebarName) sidebarName.textContent = 'ผู้ใช้งานทั่วไป';
            if (sidebarSub) sidebarSub.textContent = 'คลิกเพื่อเข้าสู่ระบบ';
            if (sidebarBadge) sidebarBadge.textContent = 'Guest';
            const mistBadge = document.getElementById('sidebar-mistakes-count');
            if (mistBadge) mistBadge.textContent = '0';
            const mastBadge = document.getElementById('sidebar-mastered-count');
            if (mastBadge) mastBadge.textContent = '0';
            if (sidebarAuthBtn) {
                sidebarAuthBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                `;
                sidebarAuthBtn.title = 'เข้าสู่ระบบ / สมัครสมาชิก';
            }

            if (topbarSection) {
                topbarSection.innerHTML = `
                    <button class="btn btn-primary btn-sm" onclick="app.openAuthModal('login')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span class="btn-text-responsive">เข้าสู่ระบบ</span>
                    </button>
                `;
            }
        }
    },

    openAuthModal(tab = 'login') {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.add('open');
            this.switchAuthTab(tab);
        }
    },

    closeAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) modal.classList.remove('open');
    },

    switchAuthTab(tab) {
        const tabLogin = document.getElementById('tab-btn-login');
        const tabReg = document.getElementById('tab-btn-register');
        const formLogin = document.getElementById('form-login');
        const formReg = document.getElementById('form-register');

        if (tab === 'login') {
            tabLogin.classList.add('active');
            tabReg.classList.remove('active');
            formLogin.style.display = 'flex';
            formReg.style.display = 'none';
        } else {
            tabReg.classList.add('active');
            tabLogin.classList.remove('active');
            formReg.style.display = 'flex';
            formLogin.style.display = 'none';
        }
    },

    selectAvatar(key, btn) {
        this.state.selectedAvatar = key;
        document.querySelectorAll('.avatar-option-btn').forEach(b => b.classList.remove('selected'));
        if (btn) btn.classList.add('selected');
    },

    async handleLoginForm(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const btn = document.getElementById('btn-submit-login');

        if (!username || !password) {
            this.showToast('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน', 'warning');
            return;
        }

        try {
            btn.disabled = true;
            btn.textContent = 'กำลังตรวจสอบ...';

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (data.success && data.token) {
                localStorage.setItem('tcas_auth_token', data.token);
                this.state.authToken = data.token;
                this.state.currentUser = data.user;
                this.showToast(`ยินดีต้อนรับกลับมา, ${data.user.display_name}!`, 'success');
                this.closeAuthModal();
                this.updateUserUI();

                // Refresh data to reflect this user's isolated records
                await this.loadDashboard();
                await this.loadMistakes();
                await this.loadVocab();
                await this.loadUserStatus(true);
            } else {
                this.showToast(data.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error');
            }
        } catch (err) {
            console.error('Login error:', err);
            this.showToast('เข้าสู่ระบบไม่สำเร็จ: ' + err.message, 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = '🚀 เข้าสู่ระบบ';
        }
    },

    async handleRegisterForm(e) {
        e.preventDefault();
        const username = document.getElementById('register-username').value.trim();
        const display_name = document.getElementById('register-displayname').value.trim();
        const password = document.getElementById('register-password').value;
        const confirm_password = document.getElementById('register-confirm-password').value;
        const avatar_url = this.state.selectedAvatar || 'scholar-m';
        const btn = document.getElementById('btn-submit-register');

        if (!username || !password) {
            this.showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
            return;
        }
        if (password !== confirm_password) {
            this.showToast('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน', 'warning');
            return;
        }

        try {
            btn.disabled = true;
            btn.textContent = 'กำลังสร้างบัญชี...';

            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, display_name, avatar_url })
            });

            const data = await res.json();
            if (data.success && data.token) {
                localStorage.setItem('tcas_auth_token', data.token);
                this.state.authToken = data.token;
                this.state.currentUser = data.user;
                this.showToast('สร้างบัญชีสำเร็จ ยินดีต้อนรับสู่ TCAS Master!', 'success');
                this.closeAuthModal();
                this.updateUserUI();

                // Refresh views with blank new student slate
                await this.loadDashboard();
                await this.loadMistakes();
                await this.loadVocab();
                await this.loadUserStatus(true);
            } else {
                this.showToast(data.error || 'สมัครสมาชิกไม่สำเร็จ', 'error');
            }
        } catch (err) {
            console.error('Registration error:', err);
            this.showToast('เกิดข้อผิดพลาด: ' + err.message, 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = '✨ สร้างบัญชีและเริ่มบันทึกคะแนน';
        }
    },

    async handleLogout() {
        if (!confirm('คุณต้องการออกจากระบบหรือไม่?')) return;
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (err) {
            console.warn('Logout notification error:', err);
        }
        localStorage.removeItem('tcas_auth_token');
        this.state.authToken = null;
        this.state.currentUser = null;
        this.showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
        await this.initAuth();
        await this.loadDashboard();
        await this.loadMistakes();
        await this.loadVocab();
        await this.loadUserStatus(true);
    },

    handleUserChipClick() {
        if (this.state.currentUser && this.state.currentUser.role !== 'guest') {
            this.navigate('status');
        } else {
            this.openAuthModal('login');
        }
    },

    handleAuthButtonAction() {
        if (this.state.currentUser && this.state.currentUser.role !== 'guest') {
            this.handleLogout();
        } else {
            this.openAuthModal('login');
        }
    },

    async openLeaderboardModal() {
        const modal = document.getElementById('leaderboard-modal');
        if (modal) modal.classList.add('open');

        const tbody = document.getElementById('leaderboard-rows');
        const myRankEl = document.getElementById('leaderboard-my-rank');
        if (tbody) tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">กำลังโหลดตารางอันดับ...</td></tr>';

        try {
            const res = await fetch('/api/auth/leaderboard');
            const data = await res.json();
            if (data.success && data.data) {
                const currentUserId = this.state.currentUser ? this.state.currentUser.id : null;
                let userRank = null;

                tbody.innerHTML = data.data.map((u, idx) => {
                    const rank = idx + 1;
                    if (u.id === currentUserId) userRank = rank;

                    let rankBadgeHtml = `<span class="rank-badge rank-badge-other">${rank}</span>`;
                    if (rank === 1) rankBadgeHtml = `<span class="rank-badge rank-badge-1" style="display:inline-flex;align-items:center;justify-content:center;">${this.svg('medal', { size: 18, color: '#f59e0b' })}</span>`;
                    else if (rank === 2) rankBadgeHtml = `<span class="rank-badge rank-badge-2" style="display:inline-flex;align-items:center;justify-content:center;">${this.svg('medal', { size: 18, color: '#cbd5e1' })}</span>`;
                    else if (rank === 3) rankBadgeHtml = `<span class="rank-badge rank-badge-3" style="display:inline-flex;align-items:center;justify-content:center;">${this.svg('medal', { size: 18, color: '#d97706' })}</span>`;

                    const isCurrent = (u.id === currentUserId) ? 'current-user-row' : '';

                    return `
                        <tr class="${isCurrent}">
                            <td>${rankBadgeHtml}</td>
                            <td>
                                <div class="user-cell">
                                    <span class="user-cell-avatar">${this.renderAvatar(u.avatar_url, 28)}</span>
                                    <div class="user-cell-names">
                                        <span class="user-cell-display">${this.escapeHtml(u.display_name)} ${u.id === currentUserId ? '<span style="color: #38bdf8; font-size: 0.75rem;">(คุณ)</span>' : ''}</span>
                                        <span class="user-cell-handle">@${this.escapeHtml(u.username)}</span>
                                    </div>
                                </div>
                            </td>
                            <td style="text-align: center;">
                                <span class="badge-counter" style="background: rgba(99, 102, 241, 0.2); color: #a5b4fc; font-weight: 700;">Lv.${u.level}</span>
                            </td>
                            <td style="text-align: center; font-weight: 600;">${u.total_exams}</td>
                            <td style="text-align: right; font-weight: 700; color: #10b981;">${u.total_score}</td>
                            <td style="text-align: right; font-weight: 700; color: #f59e0b;">${u.total_xp.toLocaleString()} XP</td>
                        </tr>
                    `;
                }).join('');

                if (myRankEl) {
                    if (userRank) {
                        myRankEl.innerHTML = `คุณอยู่อันดับที่ <strong style="color: #38bdf8;">#${userRank}</strong> ของระบบ`;
                    } else {
                        myRankEl.textContent = 'เข้าสู่ระบบและเริ่มทำข้อสอบเพื่อติดอันดับ!';
                    }
                }
            }
        } catch (err) {
            console.error('Failed to load leaderboard', err);
            if (tbody) tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--accent-danger);">เกิดข้อผิดพลาดในการโหลดตารางอันดับ</td></tr>';
        }
    },

    closeLeaderboardModal() {
        const modal = document.getElementById('leaderboard-modal');
        if (modal) modal.classList.remove('open');
    },

    showComingSoonToast(subjectName) {
        this.showToast(`🚧 ข้อสอบ ${subjectName} อยู่ระหว่างเตรียมข้อสอบตามพิมพ์เขียวปี 68 จะเปิดให้ฝึกทำในเร็วๆ นี้ครับ!`, 'warning');
    }
});
