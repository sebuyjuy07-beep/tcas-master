/**
 * TCAS Master - AI Tutor Hub & Gemini Key Manager Module
 */
Object.assign(app, {
    // ==========================================
    // 11. AI TUTOR ASSISTANT CONTROLLER
    // ==========================================

    initAiKeyStatus() {
        const key = localStorage.getItem('tcas_gemini_key') || '';
        const savedModel = localStorage.getItem('tcas_gemini_model') || 'Gemini 3.8 Flash';
        this.state.geminiApiKey = key;
        const modelBadge = document.getElementById('ai-tutor-model-badge');
        if (modelBadge) {
            modelBadge.textContent = key ? (savedModel.toLowerCase().includes('gemini') ? savedModel : `Gemini ${savedModel}`) : 'TCAS Master AI (Offline)';
        }
    },

    openAiKeyModal() {
        const modal = document.getElementById('ai-key-modal');
        const input = document.getElementById('input-gemini-key');
        const resDiv = document.getElementById('ai-key-test-result');
        if (!modal) return;
        if (input) input.value = this.state.geminiApiKey || '';
        if (resDiv) resDiv.style.display = 'none';
        modal.classList.add('open');
    },

    closeAiKeyModal() {
        const modal = document.getElementById('ai-key-modal');
        if (modal) modal.classList.remove('open');
    },

    openAiKeyRecommendModal(onProceed = null) {
        this._pendingAiCallback = onProceed;
        const modal = document.getElementById('ai-key-recommend-modal');
        if (modal) modal.classList.add('open');
    },

    closeAiKeyRecommendModal() {
        const modal = document.getElementById('ai-key-recommend-modal');
        if (modal) modal.classList.remove('open');
    },

    proceedAiWithoutKey() {
        this.closeAiKeyRecommendModal();
        sessionStorage.setItem('tcas_dismiss_key_hint', 'true');
        if (typeof this._pendingAiCallback === 'function') {
            const cb = this._pendingAiCallback;
            this._pendingAiCallback = null;
            cb();
        }
    },

    openAiKeyModalFromRecommend() {
        this.closeAiKeyRecommendModal();
        this.openAiKeyModal();
    },

    async testGeminiKey() {
        const input = document.getElementById('input-gemini-key');
        const resDiv = document.getElementById('ai-key-test-result');
        if (!input || !resDiv) return;
        const val = input.value.trim();
        if (!val) {
            resDiv.style.display = 'block';
            resDiv.style.color = 'var(--accent-amber)';
            resDiv.textContent = 'กรุณากรอก API Key ก่อนทดสอบ';
            return;
        }

        resDiv.style.display = 'block';
        resDiv.style.color = 'var(--accent-cyan)';
        resDiv.textContent = '⏳ กำลังตรวจสอบกับ Google AI Studio...';

        const testBtn = document.querySelector('#ai-key-modal button[onclick*="testGeminiKey"]');
        if (testBtn) {
            testBtn.disabled = true;
            testBtn.textContent = '⏳ กำลังตรวจ...';
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const res = await fetch('/api/ai/verify-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                },
                body: JSON.stringify({ apiKey: val }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            const data = await res.json();
            if (data.success) {
                resDiv.style.color = 'var(--accent-emerald)';
                resDiv.textContent = `✅ ${data.message || 'ยอดเยี่ยม! API Key ใช้งานได้สมบูรณ์'}`;
                if (data.model) {
                    localStorage.setItem('tcas_gemini_model', data.model);
                    this.initAiKeyStatus();
                }
            } else {
                resDiv.style.color = 'var(--accent-rose)';
                resDiv.textContent = `❌ เกิดข้อผิดพลาด: ${data.error}`;
            }
        } catch (err) {
            clearTimeout(timeoutId);
            resDiv.style.color = 'var(--accent-rose)';
            if (err.name === 'AbortError') {
                resDiv.textContent = '❌ การเชื่อมต่อไปยังเซิร์ฟเวอร์หมดเวลา (Timeout) กรุณาลองใหม่อีกครั้ง';
            } else {
                resDiv.textContent = `❌ เชื่อมต่อล้มเหลว: ${err.message}`;
            }
        } finally {
            if (testBtn) {
                testBtn.disabled = false;
                testBtn.textContent = '🧪 ทดสอบ Key';
            }
        }
    },

    saveGeminiKey() {
        const input = document.getElementById('input-gemini-key');
        if (!input) return;
        const val = input.value.trim();
        this.state.geminiApiKey = val;
        if (val) {
            localStorage.setItem('tcas_gemini_key', val);
            this.showToast('บันทึก Gemini API Key เรียบร้อยแล้ว!', 'success');
        } else {
            localStorage.removeItem('tcas_gemini_key');
            localStorage.removeItem('tcas_gemini_model');
            this.showToast('ลบ API Key แล้ว (ระบบจะสลับไปใช้ TCAS Master AI Offline Mode)', 'info');
        }
        this.initAiKeyStatus();
        this.closeAiKeyModal();
    },

    removeGeminiKey() {
        const input = document.getElementById('input-gemini-key');
        if (input) input.value = '';
        this.saveGeminiKey();
    },

    // ------------------------------------------
    // SAVED QUESTIONS FOR AI MANAGEMENT
    // ------------------------------------------

    async fetchSavedAiQuestions() {
        try {
            const res = await fetch('/api/ai/saved-questions', {
                headers: {
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                }
            });
            const data = await res.json();
            if (data.success) {
                this.state.aiSavedQuestions = data.data || [];
                this.updateAiSavedBadges();
                this.renderAiSavedList();
            }
        } catch (err) {
            console.error('Error fetching saved AI questions:', err);
        }
    },

    updateAiSavedBadges() {
        const count = (this.state.aiSavedQuestions || []).length;
        const topbarBadge = document.getElementById('topbar-ai-count');
        const sidebarBadge = document.getElementById('sidebar-ai-count');
        const modalBadge = document.getElementById('ai-hub-saved-badge');

        if (topbarBadge) topbarBadge.textContent = count;
        if (sidebarBadge) sidebarBadge.textContent = count;
        if (modalBadge) modalBadge.textContent = count;
    },

    renderAiSavedList() {
        const listEl = document.getElementById('ai-saved-list');
        if (!listEl) return;

        const filter = this.state.aiSavedFilter || 'all';
        let items = this.state.aiSavedQuestions || [];
        if (filter !== 'all') {
            items = items.filter(q => {
                if (filter === 'alevel') return q.subject_id.startsWith('alevel_') || q.subject_id.startsWith('tpat');
                return q.subject_id === filter;
            });
        }

        if (items.length === 0) {
            listEl.innerHTML = `
                <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted); font-size: 0.8rem;">
                    <div style="display:flex;justify-content:center;margin-bottom: 0.4rem; opacity: 0.7;">${this.svg('bookmark', {size: 28, color: 'var(--accent-indigo)'})}</div>
                    <p style="margin: 0;">ยังไม่มีข้อสอบที่บันทึกไว้</p>
                    <p style="margin-top: 0.25rem; font-size: 0.72rem; color: var(--text-secondary);">
                        กดปุ่ม <strong>"เก็บไว้ถาม AI"</strong> เหนือข้อสอบขณะทำ หรือกดคุยได้ทันที
                    </p>
                </div>
            `;
            return;
        }

        listEl.innerHTML = items.map(item => {
            const isActive = item.question_id === this.state.aiCurrentQuestionId;
            const snippet = (item.question_text || '').replace(/<[^>]*>/g, '').substring(0, 65) + '...';
            const subjectCode = item.subject_code ? `[${item.subject_code}] ` : '';
            return `
                <div class="ai-saved-item ${isActive ? 'active' : ''}" onclick="app.selectAiSavedQuestion('${item.question_id}')">
                    <div class="ai-saved-item-top">
                        <span class="ai-saved-badge-tag">${subjectCode}${this.escapeHtml(item.subject_name_th || 'ข้อสอบ')}</span>
                        <button class="btn-delete-saved-q" onclick="event.stopPropagation(); app.deleteSavedQuestion('${item.question_id}')" title="ลบออกจากคลัง">✕</button>
                    </div>
                    <div class="ai-saved-item-title">${this.escapeHtml(snippet)}</div>
                    <div class="ai-saved-item-footer">
                        <span>💬 ${item.chat_count || 0} ข้อความ</span>
                        <span>${this.escapeHtml(item.subtopic_name || item.domain_name || '')}</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    filterSavedQuestions(filterCategory, btnEl) {
        this.state.aiSavedFilter = filterCategory;
        const chips = document.querySelectorAll('.ai-saved-filter-bar .ai-filter-chip');
        chips.forEach(c => c.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');
        this.renderAiSavedList();
    },

    async toggleSaveCurrentQuestionForAi() {
        const session = this.state.activeSession;
        if (!session || !session.questions) return;
        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        const isAlreadySaved = (this.state.aiSavedQuestions || []).some(sq => sq.question_id === q.id);
        const qNum = this.state.currentQuestionIndex + 1;

        if (isAlreadySaved) {
            // Un-save
            try {
                const res = await fetch(`/api/ai/saved-questions/${q.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                    }
                });
                const data = await res.json();
                if (data.success) {
                    this.state.aiSavedQuestions = this.state.aiSavedQuestions.filter(sq => sq.question_id !== q.id);
                    this.updateAiSavedBadges();
                    this.renderCurrentQuestion();
                    this.showToast(`นำข้อที่ ${qNum} ออกจากคลังถาม AI แล้ว`, 'info');
                }
            } catch (err) {
                this.showToast('เกิดข้อผิดพลาดในการยกเลิกบันทึก: ' + err.message, 'error');
            }
        } else {
            // Save
            const selectedOpt = this.state.userAnswers[q.id]?.selected_option_id;
            try {
                const res = await fetch('/api/ai/saved-questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                    },
                    body: JSON.stringify({
                        question_id: q.id,
                        session_id: session.id,
                        user_selected_option: selectedOpt || null
                    })
                });
                const data = await res.json();
                if (data.success) {
                    await this.fetchSavedAiQuestions();
                    this.renderCurrentQuestion();
                    this.showToast(`📌 บันทึกข้อที่ ${qNum} เข้าคลัง TCAS Master AI แล้ว`, 'success');
                }
            } catch (err) {
                this.showToast('เกิดข้อผิดพลาดในการบันทึก: ' + err.message, 'error');
            }
        }
    },

    async toggleSaveQuestionById(questionId, selectedOptionId) {
        if (!questionId) return;
        const isAlreadySaved = (this.state.aiSavedQuestions || []).some(sq => sq.question_id === questionId);
        if (isAlreadySaved) {
            await this.deleteSavedQuestion(questionId);
        } else {
            try {
                const res = await fetch('/api/ai/saved-questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                    },
                    body: JSON.stringify({
                        question_id: questionId,
                        session_id: this.state.activeSession?.id || null,
                        user_selected_option: selectedOptionId || null
                    })
                });
                const data = await res.json();
                if (data.success) {
                    await this.fetchSavedAiQuestions();
                    this.showToast('📌 บันทึกข้อสอบเข้าคลัง TCAS Master AI แล้ว', 'success');
                }
            } catch (err) {
                this.showToast('เกิดข้อผิดพลาดในการบันทึก: ' + err.message, 'error');
            }
        }
    },

    async deleteSavedQuestion(questionId) {
        try {
            const res = await fetch(`/api/ai/saved-questions/${questionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                }
            });
            const data = await res.json();
            if (data.success) {
                this.state.aiSavedQuestions = this.state.aiSavedQuestions.filter(sq => sq.question_id !== questionId);
                this.updateAiSavedBadges();
                this.renderAiSavedList();
                this.showToast('ลบข้อสอบออกจากรายการเรียบร้อย', 'info');
                if (this.state.currentView === 'exam') {
                    this.renderCurrentQuestion();
                }
            }
        } catch (err) {
            this.showToast('เกิดข้อผิดพลาดในการลบ: ' + err.message, 'error');
        }
    },

    // ------------------------------------------
    // OPENING & CONTROLLING AI CHAT HUB
    // ------------------------------------------

    async openAiChatHub() {
        // Lock AI during standard timed exams so users practice honestly; Free Roam keeps AI unlocked
        if (this.state.currentView === 'exam' && this.state.activeSession && !this.state.activeSession.is_free_roam) {
            this.showToast('โหมดจับเวลาสอบจริงจะล็อกผู้ช่วย AI ระหว่างทำข้อสอบ (กด "เก็บไว้ถาม AI" หรือสลับเป็นโหมด Free Roam ก่อนเริ่มสอบได้ครับ)', 'warning');
            return;
        }

        if (!this.state.geminiApiKey && !sessionStorage.getItem('tcas_dismiss_key_hint')) {
            this.openAiKeyRecommendModal(() => this.openAiChatHub());
            return;
        }

        const modal = document.getElementById('ai-tutor-modal');
        if (!modal) return;

        await this.fetchSavedAiQuestions();

        // If user is currently in exam, select active question
        if (this.state.currentView === 'exam' && this.state.activeSession?.questions) {
            const q = this.state.activeSession.questions[this.state.currentQuestionIndex];
            if (q) {
                this.openAiTutor(q.id, this.state.userAnswers[q.id]?.selected_option_id, true);
                return;
            }
        }

        // If there are saved questions, load the first one
        if (this.state.aiSavedQuestions.length > 0) {
            this.selectAiSavedQuestion(this.state.aiSavedQuestions[0].question_id, true);
            return;
        }

        // Otherwise open with general question prompt
        this.openAiTutor(null, null, true);
    },

    openAiChatForCurrentQuestion() {
        const session = this.state.activeSession;
        if (!session || !session.questions) return;
        if (this.state.currentView === 'exam' && !session.is_free_roam) {
            this.showToast('โหมดจับเวลาสอบจริงจะล็อกผู้ช่วย AI ระหว่างทำข้อสอบครับ', 'warning');
            return;
        }
        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        // Auto bookmark if not yet saved
        const isAlreadySaved = (this.state.aiSavedQuestions || []).some(sq => sq.question_id === q.id);
        if (!isAlreadySaved) {
            this.toggleSaveCurrentQuestionForAi();
        }

        const selectedOpt = this.state.userAnswers[q.id]?.selected_option_id;
        this.openAiTutor(q.id, selectedOpt);
    },

    selectAiSavedQuestion(questionId, bypassHint = false) {
        const saved = (this.state.aiSavedQuestions || []).find(q => q.question_id === questionId);
        const selectedOpt = saved ? saved.user_selected_option : null;
        this.openAiTutor(questionId, selectedOpt, bypassHint);
    },

    toggleAiSavedPanel() {
        const sidebar = document.getElementById('ai-hub-sidebar');
        if (sidebar) sidebar.classList.toggle('collapsed');
    },

    toggleAiContextCollapse() {
        const details = document.getElementById('ai-context-details');
        const chevron = document.getElementById('ai-context-chevron');
        if (!details) return;
        const isOpen = details.style.display !== 'none';
        details.style.display = isOpen ? 'none' : 'block';
        if (chevron) chevron.classList.toggle('open', !isOpen);
    },

    async openAiTutor(questionId, selectedOptionId, bypassHint = false) {
        if (!bypassHint && !this.state.geminiApiKey && !sessionStorage.getItem('tcas_dismiss_key_hint')) {
            this.openAiKeyRecommendModal(() => this.openAiTutor(questionId, selectedOptionId, true));
            return;
        }
        this.state.aiCurrentQuestionId = questionId;
        this.state.aiCurrentSelectedOptionId = selectedOptionId || null;
        this.state.aiChatHistory = [];

        const modal = document.getElementById('ai-tutor-modal');
        const thread = document.getElementById('ai-chat-thread');
        const contextEl = document.getElementById('ai-tutor-q-context');
        const input = document.getElementById('ai-tutor-input');

        if (!modal || !thread) return;

        this.initAiKeyStatus();
        this.renderAiSavedList();

        if (input) input.value = '';

        if (!questionId) {
            // General Hub without selected question
            if (contextEl) contextEl.textContent = 'เลือกข้อสอบจากแถบด้านซ้าย หรือพิมพ์คำถามทางวิชาการได้เลย';
            const contextBox = document.getElementById('ai-question-context-box');
            if (contextBox) contextBox.style.display = 'none';

            thread.innerHTML = `
                <div class="ai-msg tutor">
                    <div class="ai-msg-bubble">
                        <p style="margin: 0; font-weight: 500;">
                            👋 สวัสดีครับ! ผม <strong>TCAS Master AI</strong> พร้อมเป็นคู่คิดวิเคราะห์ข้อสอบและติวเข้มเนื้อหาตาม Test Blueprint ของ ทปอ. ร่วมกับคุณครับ
                        </p>
                        <p style="margin-top: 0.5rem; margin-bottom: 0; font-size: 0.85rem; color: var(--text-secondary);">
                            คุณสามารถเลือกข้อสอบที่บันทึกไว้จากแถบด้านซ้าย หรือพิมพ์หัวข้อที่ต้องการปรึกษาได้ทันทีครับ!
                        </p>
                    </div>
                </div>
            `;
            modal.classList.add('open');
            return;
        }

        // Fetch question context and existing chat history from server
        try {
            const contextBox = document.getElementById('ai-question-context-box');
            if (contextBox) contextBox.style.display = 'block';

            const res = await fetch(`/api/ai/chat/${questionId}`, {
                headers: {
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                }
            });
            const data = await res.json();

            if (data.success && data.question) {
                const q = data.question;
                this.state.aiCurrentQuestionData = q;

                const isFreeRoamInExam = this.state.currentView === 'exam' && Boolean(this.state.activeSession && this.state.activeSession.is_free_roam);

                // Update context header
                if (contextEl) {
                    contextEl.textContent = `${q.subject_name_th} • ${q.subtopic_name || q.domain_name} (Set ${q.set_number || 1})${isFreeRoamInExam ? ' • โหมด Free Roam (AI ช่วยคิดระหว่างทำ)' : ''}`;
                }
                const badge = document.getElementById('ai-context-subject-badge');
                if (badge) badge.textContent = q.subject_code ? `[${q.subject_code}] ${q.subject_name_th}` : q.subject_name_th;

                const snippetEl = document.getElementById('ai-context-snippet');
                if (snippetEl) {
                    snippetEl.textContent = (q.question_text || '').replace(/<[^>]*>/g, '').substring(0, 90) + '...';
                }

                const fullTextEl = document.getElementById('ai-context-full-text');
                if (fullTextEl) {
                    fullTextEl.innerHTML = `
                        ${q.stimulus ? `<div style="background: rgba(0,0,0,0.25); padding: 0.6rem; border-radius: 6px; margin-bottom: 0.5rem; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">${this.escapeHtml(q.stimulus)}</div>` : ''}
                        <strong>คำถาม:</strong> ${this.escapeHtml(q.question_text)}
                    `;
                }

                const optsEl = document.getElementById('ai-context-options');
                if (optsEl && q.options) {
                    optsEl.innerHTML = q.options.map(o => {
                        const isPicked = (this.state.aiCurrentSelectedOptionId && o.id === this.state.aiCurrentSelectedOptionId) || (q.user_selected_option && o.label === q.user_selected_option);
                        const revealCorrect = !isFreeRoamInExam && o.is_correct;
                        return `
                            <div class="ai-context-opt-item ${revealCorrect ? 'correct' : ''} ${isPicked ? 'user-picked' : ''}">
                                <strong>[${o.label}]</strong> ${this.escapeHtml(o.content)}
                                ${revealCorrect ? ' <span style="color: #34d399; font-size: 0.72rem;">(คำตอบที่ถูกต้อง)</span>' : ''}
                                ${isPicked ? ' <span style="color: var(--accent-amber); font-size: 0.72rem;">(ตัวเลือกที่คุณตอบ)</span>' : ''}
                            </div>
                        `;
                    }).join('');
                }

                // Render chat history
                thread.innerHTML = '';

                // If messages exist, render them
                if (data.messages && data.messages.length > 0) {
                    for (const m of data.messages) {
                        this.state.aiChatHistory.push({ role: m.role === 'user' ? 'user' : 'model', content: m.content });
                        const bubble = document.createElement('div');
                        bubble.className = `ai-msg ${m.role === 'user' ? 'user' : 'tutor'}`;
                        const formatted = m.role === 'user' ? `<p style="margin:0;">${this.escapeHtml(m.content)}</p>` : this.formatMarkdown(m.content);
                        bubble.innerHTML = `<div class="ai-msg-bubble">${formatted}</div>`;
                        thread.appendChild(bubble);
                    }
                } else {
                    // Initial welcome greeting
                    thread.innerHTML = `
                        <div class="ai-msg tutor">
                            <div class="ai-msg-bubble">
                                <p style="margin: 0; font-weight: 500;">
                                    👋 สวัสดีครับ! สำหรับข้อนี้ในวิชา <strong>${this.escapeHtml(q.subject_name_th)}</strong> (${this.escapeHtml(q.subtopic_name || q.domain_name)}) ผมได้อ่านโจทย์ ตัวเลือก และเฉลยเรียบร้อยแล้วครับ
                                </p>
                                <p style="margin-top: 0.5rem; margin-bottom: 0; font-size: 0.85rem; color: var(--text-secondary);">
                                    คุณสงสัยจุดไหนเป็นพิเศษ หรือต้องการให้อธิบายวิธีคิดข้อนี้ทีละขั้นตอน กดเลือกคำถามด่วนด้านบนหรือพิมพ์ถามผมได้ทันทีเลยครับ!
                                </p>
                            </div>
                        </div>
                    `;
                }
            }
        } catch (err) {
            console.error('Error loading question context:', err);
        }

        modal.classList.add('open');
        this.renderMath();
    },

    closeAiTutorModal() {
        const modal = document.getElementById('ai-tutor-modal');
        if (modal) modal.classList.remove('open');
    },

    async clearCurrentAiChatHistory() {
        const qId = this.state.aiCurrentQuestionId;
        if (!qId) return;

        if (!confirm('คุณต้องการล้างประวัติการสนทนาของข้อนี้ใช่หรือไม่?')) return;

        try {
            const res = await fetch(`/api/ai/chat/${qId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                }
            });
            const data = await res.json();
            if (data.success) {
                this.state.aiChatHistory = [];
                const thread = document.getElementById('ai-chat-thread');
                if (thread) {
                    thread.innerHTML = `
                        <div class="ai-msg tutor">
                            <div class="ai-msg-bubble">
                                <p style="margin: 0;">🧹 ล้างประวัติการสนทนาเรียบร้อยแล้วครับ เรามาเริ่มวิเคราะห์ข้อนี้กันใหม่ได้เลยครับ!</p>
                            </div>
                        </div>
                    `;
                }
                this.fetchSavedAiQuestions();
                this.showToast('ล้างประวัติแชทเรียบร้อยแล้ว', 'info');
            }
        } catch (err) {
            this.showToast('ไม่สามารถล้างประวัติได้: ' + err.message, 'error');
        }
    },

    sendAiQuickPrompt(promptType) {
        let query = '';
        if (promptType === 'why_wrong') query = 'ช่วยวิเคราะห์จุดหลอกหน่อยครับ ว่าทำไมตัวเลือกที่ผิดถึงผิด และผู้ออกข้อสอบมีเจตนาลวงตรงไหน';
        else if (promptType === 'speed_hack') query = 'ขอคำอธิบายวิธีคิดข้อนี้ทีละขั้นตอนแบบชัดเจน เข้าใจง่ายครับ';
        else if (promptType === 'key_formula') query = 'ข้อนี้มีสูตร กฎเกณฑ์ หรือคีย์เวิร์ดสำคัญอะไรที่ต้องจำตาม Blueprint บ้างครับ';
        else if (promptType === 'drill_more') query = 'ช่วยสร้างโจทย์แนวคิดเดียวกันมาให้ผมลองฝึกทำอีก 1 ข้อ พร้อมเฉลยและวิธีคิดด้วยครับ';

        if (query) {
            this.sendAiTutorQuery(query);
        }
    },

    handleAiInputSubmit() {
        const input = document.getElementById('ai-tutor-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        this.sendAiTutorQuery(text);
    },

    async sendAiTutorQuery(query) {
        const thread = document.getElementById('ai-chat-thread');
        const questionId = this.state.aiCurrentQuestionId;
        if (!thread) return;

        // 1. Append User Message
        const userBubble = document.createElement('div');
        userBubble.className = 'ai-msg user';
        userBubble.innerHTML = `<div class="ai-msg-bubble"><p style="margin:0;">${this.escapeHtml(query)}</p></div>`;
        thread.appendChild(userBubble);

        // 2. Append Typing Indicator
        const typingEl = document.createElement('div');
        typingEl.className = 'ai-msg tutor';
        typingEl.id = 'ai-typing-loader';
        typingEl.innerHTML = `
            <div class="ai-msg-bubble">
                <div class="ai-typing-indicator">
                    <span></span><span></span><span></span>
                </div>
                <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem;">TCAS Master AI กำลังวิเคราะห์และเรียบเรียงคำตอบ...</span>
            </div>
        `;
        thread.appendChild(typingEl);
        thread.scrollTop = thread.scrollHeight;

        // Track in history
        this.state.aiChatHistory.push({ role: 'user', content: query });

        try {
            const res = await fetch('/api/ai/tutor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : '',
                    'x-gemini-key': this.state.geminiApiKey || ''
                },
                body: JSON.stringify({
                    question_id: questionId,
                    user_query: query,
                    selected_option_id: this.state.aiCurrentSelectedOptionId,
                    chat_history: this.state.aiChatHistory,
                    custom_key: this.state.geminiApiKey || '',
                    preferred_model: localStorage.getItem('tcas_gemini_model') || '',
                    is_free_roam: this.state.currentView === 'exam' && Boolean(this.state.activeSession && this.state.activeSession.is_free_roam)
                })
            });

            const data = await res.json();
            const loader = document.getElementById('ai-typing-loader');
            if (loader) loader.remove();

            if (data.success && data.ai_response) {
                this.state.aiChatHistory.push({ role: 'model', content: data.ai_response });

                const replyBubble = document.createElement('div');
                replyBubble.className = 'ai-msg tutor';

                const formattedHtml = this.formatMarkdown(data.ai_response);
                replyBubble.innerHTML = `
                    <div class="ai-msg-bubble">
                        ${formattedHtml}
                        ${data.hint ? `<div style="margin-top: 0.75rem; font-size: 0.78rem; color: var(--accent-cyan); opacity: 0.85;">💡 ${data.hint}</div>` : ''}
                    </div>
                `;
                thread.appendChild(replyBubble);

                // Update chat count badge in sidebar list
                this.fetchSavedAiQuestions();
            } else {
                const errBubble = document.createElement('div');
                errBubble.className = 'ai-msg tutor';
                errBubble.innerHTML = `
                    <div class="ai-msg-bubble" style="border-color: rgba(244, 63, 94, 0.4);">
                        <p style="color: var(--accent-rose); margin: 0;">⚠️ ขออภัยครับ: ${data.error || 'ไม่สามารถติดต่อ TCAS Master AI ได้ในขณะนี้'}</p>
                    </div>
                `;
                thread.appendChild(errBubble);
            }
        } catch (err) {
            const loader = document.getElementById('ai-typing-loader');
            if (loader) loader.remove();

            const errBubble = document.createElement('div');
            errBubble.className = 'ai-msg tutor';
            errBubble.innerHTML = `
                <div class="ai-msg-bubble" style="border-color: rgba(244, 63, 94, 0.4);">
                    <p style="color: var(--accent-rose); margin: 0;">❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้: ${err.message}</p>
                </div>
            `;
            thread.appendChild(errBubble);
        }

        thread.scrollTop = thread.scrollHeight;
        this.renderMath();
    }
});
