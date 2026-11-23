/**
 * TCAS Master - Mistakes Notebook, Mastered Bank, Highlighter & Vocab Bank Module
 */
Object.assign(app, {
    // ==========================================
    // 5. MISTAKE NOTEBOOK
    // ==========================================

    async loadMistakes() {
        try {
            const res = await fetch('/api/mistakes');
            const data = await res.json();
            if (data.success) {
                this.state.allMistakes = data.data;
                document.getElementById('sidebar-mistakes-count').textContent = data.data.filter(m => m.mastery_status !== 'mastered').length;
                this.renderMistakesList();
            }
        } catch (err) {
            console.error('Failed to load mistakes', err);
        }
    },

    filterMistakes(status) {
        this.state.currentMistakeFilter = status;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.status === status) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        this.renderMistakesList();
    },

    renderMistakesList() {
        const container = document.getElementById('mistakes-list');
        const filter = this.state.currentMistakeFilter;
        const list = filter === 'all'
            ? this.state.allMistakes
            : this.state.allMistakes.filter(m => m.mastery_status === filter);

        if (list.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    🎉 เยี่ยมมาก! ไม่มีข้อสอบที่ต้องทบทวนในหมวดนี้
                </div>
            `;
            return;
        }

        container.innerHTML = list.map(m => `
            <div class="mistake-card glass-panel" id="mistake-card-${m.question_id}">
                <div class="mistake-top">
                    <div class="mistake-tags">
                        <span class="subject-cat-badge cat-tgat">${m.subject_name}</span>
                        <span class="q-domain-pill">${m.subtopic_name || m.domain_name}</span>
                        <span class="meta-chip" style="color: var(--accent-rose);">ผิดไปแล้ว ${m.times_wrong} ครั้ง</span>
                    </div>

                    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                        <button class="btn btn-outline btn-sm" onclick="app.toggleSaveQuestionById('${m.question_id}', '')" title="บันทึกข้อนี้ไว้ในคลังถาม AI">
                            🔖 เก็บไว้ถาม AI
                        </button>
                        <button class="btn-ai-tutor" onclick="app.openAiTutor('${m.question_id}', '')" title="ปรึกษา TCAS Master AI เกี่ยวกับข้อที่เคยทำผิด">
                            <span>🤖</span> คุยกับ AI ข้อนี้
                        </button>
                        <select class="mistake-status-select" onchange="app.updateMistakeStatus('${m.question_id}', this.value)">
                            <option value="need_review" ${m.mastery_status === 'need_review' ? 'selected' : ''}>⚠️ ต้องทบทวนด่วน</option>
                            <option value="reviewing" ${m.mastery_status === 'reviewing' ? 'selected' : ''}>🔄 กำลังฝึกฝน</option>
                            <option value="mastered" ${m.mastery_status === 'mastered' ? 'selected' : ''}>✅ แม่นยำแล้ว</option>
                        </select>
                        <button class="btn btn-outline btn-sm" onclick="app.removeMistake('${m.question_id}')" title="ลบออกจากสมุดจุดอ่อน">🗑️</button>
                    </div>
                </div>

                ${m.stimulus ? `<div class="stimulus-pane" style="max-height: 180px;"><div class="stimulus-body">${m.stimulus}</div></div>` : ''}

                <div class="sol-q-text">${m.question_text}</div>

                <div class="sol-answer-compare">
                    <div class="compare-line">
                        <span class="compare-label" style="color: var(--accent-emerald);">คำตอบที่ถูกต้อง:</span>
                        <span>${m.correct_label ? `${m.correct_label}. ${m.correct_content}` : ''}</span>
                    </div>
                </div>

                <div class="explanation-box">
                    <div class="explanation-title">💡 เฉลยละเอียด:</div>
                    <div class="explanation-body">${m.explanation}</div>
                </div>

                ${m.trap_analysis ? `
                    <div class="trap-box">
                        <span>⚠️</span>
                        <div><strong>ข้อนี้ชอบหลอกตรงไหน:</strong> ${m.trap_analysis}</div>
                    </div>
                ` : ''}

                <div>
                    <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted);">📝 โน้ตเตือนใจส่วนตัว (พิมพ์สูตรลัดหรือจุดที่เคยลืม):</label>
                    <textarea class="mistake-note-input" rows="2" placeholder="เช่น จำสับสนระหว่างคำว่า reluctant กับ eager, ข้อนี้อย่าลืมกลับเครื่องหมายอสมการ..."
                        onblur="app.saveMistakeNote('${m.question_id}', this.value)">${m.user_note || ''}</textarea>
                </div>
            </div>
        `).join('');

        this.renderMath();
    },

    async updateMistakeStatus(questionId, status) {
        try {
            await fetch(`/api/mistakes/${questionId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mastery_status: status })
            });
            this.showToast('อัปเดตสถานะสำเร็จ', 'success');
            await this.loadMistakes();
        } catch (err) {
            console.error('Failed to update status', err);
        }
    },

    async saveMistakeNote(questionId, note) {
        try {
            await fetch(`/api/mistakes/${questionId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_note: note })
            });
            this.showToast('บันทึกโน้ตสำเร็จ', 'success');
        } catch (err) {
            console.error('Failed to save note', err);
        }
    },

    async removeMistake(questionId) {
        if (!confirm('ต้องการลบข้อสอบนี้ออกจากสมุดจุดอ่อนหรือไม่?')) return;
        try {
            await fetch(`/api/mistakes/${questionId}`, { method: 'DELETE' });
            this.showToast('ลบออกจากสมุดจุดอ่อนแล้ว', 'info');
            await this.loadMistakes();
        } catch (err) {
            console.error('Failed to delete mistake', err);
        }
    },

    async confirmClearAllMistakes() {
        if (!this.state.allMistakes || this.state.allMistakes.length === 0) {
            this.showToast('ไม่มีข้อสอบในสมุดจุดอ่อนให้ลบ', 'info');
            return;
        }
        if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อสอบในสมุดจุดอ่อน "ทั้งหมด"? ข้อมูลข้อสอบที่เคยบันทึกไว้จะถูกรีเซ็ตและไม่สามารถย้อนกลับได้')) {
            return;
        }
        try {
            const res = await fetch('/api/mistakes', { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                this.state.allMistakes = [];
                const badge = document.getElementById('sidebar-mistakes-count');
                if (badge) badge.textContent = '0';
                this.renderMistakesList();
                this.showToast('ลบข้อสอบในสมุดจุดอ่อนทั้งหมดเรียบร้อยแล้ว', 'success');
            } else {
                throw new Error(data.error);
            }
        } catch (err) {
            console.error('Failed to clear all mistakes', err);
            this.showToast('เกิดข้อผิดพลาดในการลบ: ' + err.message, 'error');
        }
    },

    practiceMistakes() {
        if (this.state.allMistakes.length === 0) {
            this.showToast('ไม่มีข้อสอบในสมุดจุดอ่อนให้ฝึกทำ', 'info');
            return;
        }
        this.startExam('all', 'mistakes_review');
    },

    // ==========================================
    // 5.1 MASTERED / COMPLETED QUESTIONS CONTROLLER
    // ==========================================

    async loadMastered(subjectId = 'all') {
        try {
            this.state.currentMasteredSubject = subjectId;
            let url = '/api/questions/mastered';
            if (subjectId && subjectId !== 'all') {
                url += `?subject_id=${subjectId}`;
            }

            const res = await fetch(url);
            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            this.state.allMastered = data.data.questions || [];
            const stats = data.data.subject_stats || [];

            // Update sidebar badge
            const sideMasteredBadge = document.getElementById('sidebar-mastered-count');
            if (sideMasteredBadge) sideMasteredBadge.textContent = data.data.total_mastered || 0;

            this.renderMasteredFilters(stats, subjectId);
            this.renderMasteredQuestions();
        } catch (err) {
            console.error('Failed to load mastered questions:', err);
        }
    },

    renderMasteredFilters(stats, activeSubId) {
        const container = document.getElementById('mastered-subject-pills');
        if (!container) return;

        const totalAll = stats.reduce((acc, s) => acc + (s.mastered_count || 0), 0);
        let html = `
            <button class="filter-pill ${activeSubId === 'all' ? 'active' : ''}" onclick="app.loadMastered('all')">
                ทั้งหมด (${totalAll})
            </button>
        `;

        stats.forEach(s => {
            const count = s.mastered_count || 0;
            html += `
                <button class="filter-pill ${activeSubId === s.subject_id ? 'active' : ''}" onclick="app.loadMastered('${s.subject_id}')">
                    ${s.code} ${this.escapeHtml(s.name_th)} (${count}/${s.catalog_total})
                </button>
            `;
        });

        container.innerHTML = html;
    },

    renderMasteredQuestions() {
        const container = document.getElementById('mastered-list');
        if (!container) return;

        const list = this.state.allMastered;
        if (!list || list.length === 0) {
            container.innerHTML = `
                <div class="empty-state glass-panel" style="text-align: center; padding: 3.5rem 2rem;">
                    <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🏆</span>
                    <h3 style="color: #fff; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">ยังไม่มีข้อสอบในคลังที่พิชิตแล้ว</h3>
                    <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem;">
                        เมื่อคุณทำข้อสอบในโหมดจำลองสอบจริงและตอบถูก ข้อสอบจะถูกคัดออกจากคลังหลักและบันทึกมาไว้ที่นี่อัตโนมัติ!
                    </p>
                    <button class="btn btn-primary" onclick="app.navigate('dashboard')">
                        ⚡ เริ่มทำข้อสอบเพื่อเก็บแต้ม
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = list.map((q, idx) => {
            const passedDate = q.last_passed_at ? new Date(q.last_passed_at).toLocaleDateString('th-TH') : '';
            return `
                <div class="mastered-card glass-panel" id="mastered-card-${q.id}">
                    <div class="mastered-card-header">
                        <div class="mastered-meta-tags">
                            <span class="subject-pill">${q.subject_code || q.subject_id}</span>
                            <span class="domain-pill">${this.escapeHtml(q.subtopic_name || q.domain_name || 'ทั่วไป')}</span>
                            <span class="passed-badge">✓ ตอบถูกแล้ว ${q.times_correct} ครั้ง</span>
                            ${passedDate ? `<span class="date-pill">ล่าสุด: ${passedDate}</span>` : ''}
                        </div>
                        <div class="mastered-card-actions">
                            <button class="btn btn-outline-danger btn-sm" onclick="app.removeMasteredQuestion('${q.id}')" title="ย้ายข้อนี้กลับเข้าสู่คลังข้อสอบหลักเพื่อฝึกซ้ำ">
                                🔄 ย้ายกลับเข้าคลังหลัก
                            </button>
                        </div>
                    </div>

                    ${q.stimulus ? `<div class="question-stimulus">${this.escapeHtml(q.stimulus)}</div>` : ''}
                    <div class="question-text" style="font-size: 1.05rem; font-weight: 600; color: #fff; margin: 0.75rem 0;">
                        ${this.escapeHtml(q.question_text)}
                    </div>

                    <div class="mastered-options-preview">
                        ${q.options.map(opt => `
                            <div class="mastered-opt-row ${opt.is_correct ? 'is-correct' : ''}">
                                <span class="opt-label">${opt.label}</span>
                                <span class="opt-content">${this.escapeHtml(opt.content)}</span>
                                ${opt.is_correct ? '<span class="correct-tag">✓ คำตอบที่ถูกต้อง</span>' : ''}
                            </div>
                        `).join('')}
                    </div>

                    ${q.explanation ? `
                        <div class="explanation-box" style="margin-top: 1rem;">
                            <span class="exp-title">💡 เฉลยละเอียด & คำอธิบาย:</span>
                            <p style="margin: 0.25rem 0 0; color: #e2e8f0; font-size: 0.9rem;">${this.escapeHtml(q.explanation)}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    },

    async removeMasteredQuestion(questionId) {
        try {
            const res = await fetch(`/api/questions/mastered/${questionId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                this.showToast('ย้ายข้อสอบกลับเข้าสู่คลังหลักเรียบร้อย', 'success');
                await this.loadMastered(this.state.currentMasteredSubject);
                await this.loadSubjects();
            } else {
                this.showToast(data.error || 'เกิดข้อผิดพลาด', 'error');
            }
        } catch (err) {
            this.showToast('เกิดข้อผิดพลาด: ' + err.message, 'error');
        }
    },

    async confirmResetMastered() {
        const sub = this.state.currentMasteredSubject;
        const msg = sub === 'all'
            ? 'คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อสอบที่ผ่านแล้วทั้งหมดกลับเข้าสู่คลังข้อสอบหลัก?'
            : `คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อสอบวิชานี้กลับเข้าสู่คลังข้อสอบหลัก?`;

        if (!confirm(msg)) return;

        try {
            const res = await fetch('/api/questions/mastered/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject_id: sub })
            });
            const data = await res.json();
            if (data.success) {
                this.showToast(data.message || 'รีเซ็ตข้อสอบกลับสู่คลังหลักเรียบร้อย', 'success');
                await this.loadMastered(sub);
                await this.loadSubjects();
                await this.loadDashboard();
            }
        } catch (err) {
            this.showToast('เกิดข้อผิดพลาด: ' + err.message, 'error');
        }
    },

    async startMasteredReview() {
        const sub = this.state.currentMasteredSubject || 'all';
        await this.startExam(sub, 'mastered_review');
    },


    // ==========================================
    // 8. TEXT SELECTION, HIGHLIGHTER & TRANSLATE
    // ==========================================

    setupTextSelectionListener() {
        const handleSelection = () => {
            const bubble = document.getElementById('selection-action-bubble');
            if (!bubble) return;

            // 1. Only allow highlighter / vocab lookup in exam-related and study views
            const allowedViews = ['exam', 'results', 'mistakes', 'vocab'];
            if (!allowedViews.includes(this.state.currentView)) {
                bubble.style.display = 'none';
                return;
            }

            const selection = window.getSelection();
            const text = selection ? selection.toString().trim() : '';

            if (!text || text.length === 0 || text.length > 300) {
                bubble.style.display = 'none';
                return;
            }

            const anchorNode = selection.anchorNode;
            if (!anchorNode) {
                bubble.style.display = 'none';
                return;
            }
            const parentElem = anchorNode.nodeType === 3 ? anchorNode.parentElement : anchorNode;

            // 2. Avoid triggering anywhere inside non-content UI, form controls, scratchpad, modals, headers, or SVG
            if (parentElem.closest('input, textarea, button, select, svg, .radar-svg, .rpg-panel, .rpg-hero-card, .rpg-power-card, .scratchpad-overlay, #selection-action-bubble, .modal-overlay, .topbar, .sidebar, .badge, .meta-chip, .user-chip')) {
                bubble.style.display = 'none';
                return;
            }

            // 3. Strict container check - text must be within an exam passage, question, solution explanation, mistake, or vocab card
            const allowedContainer = parentElem.closest(
                '.exam-passage-pane, .exam-question-pane, #exam-passage-container, #exam-question-container, ' +
                '.solution-card, .mistake-card, .vocab-card, .flashcard-box, .sol-q-text, .sol-explanation, .sol-trap, .stimulus-pane'
            );
            if (!allowedContainer) {
                bubble.style.display = 'none';
                return;
            }

            this.state.selectedText = text;
            try {
                this.state.selectedRange = selection.getRangeAt(0).cloneRange();
                const rect = selection.getRangeAt(0).getBoundingClientRect();
                if (rect.width === 0 && rect.height === 0) {
                    bubble.style.display = 'none';
                    return;
                }

                // If Highlight Mode is explicitly turned on, immediately apply highlight to selection!
                if (this.state.highlightMode) {
                    this.highlightSelection('yellow');
                    return;
                }

                // Extract sentence context for vocab lookup
                const fullText = parentElem.innerText || parentElem.textContent || '';
                this.state.selectedContext = this.extractContextSentence(fullText, text);

                // Smart vertical positioning:
                const bubbleHeight = 46;
                const bubbleWidth = bubble.offsetWidth || 300;
                let topPos;
                if (rect.top - bubbleHeight - 14 < 80) {
                    topPos = rect.bottom + 10;
                } else {
                    topPos = rect.top - bubbleHeight - 10;
                }

                const centerX = rect.left + rect.width / 2;
                const minLeft = bubbleWidth / 2 + 16;
                const maxLeft = window.innerWidth - bubbleWidth / 2 - 16;
                const leftPos = Math.max(minLeft, Math.min(maxLeft, centerX));

                bubble.style.position = 'fixed';
                bubble.style.left = `${leftPos}px`;
                bubble.style.top = `${topPos}px`;
                bubble.style.transform = 'translateX(-50%)';
                bubble.style.display = 'flex';
            } catch (err) {
                console.error('Selection rect error:', err);
                bubble.style.display = 'none';
            }
        };

        document.addEventListener('mouseup', (e) => {
            if (e.target.closest('#selection-action-bubble') || e.target.closest('#vocab-lookup-modal')) return;
            setTimeout(handleSelection, 20);
        });

        document.addEventListener('keyup', (e) => {
            if (['Shift', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                handleSelection();
            } else if (e.key === 'Escape') {
                const bubble = document.getElementById('selection-action-bubble');
                if (bubble) bubble.style.display = 'none';
            }
        });

        // Auto-dismiss bubble whenever selection is cleared or collapsed
        document.addEventListener('selectionchange', () => {
            const sel = window.getSelection();
            if (!sel || sel.isCollapsed || sel.rangeCount === 0 || !sel.toString().trim()) {
                const bubble = document.getElementById('selection-action-bubble');
                if (bubble && bubble.style.display !== 'none') {
                    bubble.style.display = 'none';
                }
            }
        });

        // Hide bubble when clicking outside
        document.addEventListener('mousedown', (e) => {
            const bubble = document.getElementById('selection-action-bubble');
            if (bubble && !e.target.closest('#selection-action-bubble') && !e.target.closest('#vocab-lookup-modal')) {
                bubble.style.display = 'none';
            }
        });

        window.addEventListener('scroll', () => {
            const bubble = document.getElementById('selection-action-bubble');
            if (bubble && bubble.style.display !== 'none') {
                bubble.style.display = 'none';
            }
        }, { passive: true, capture: true });
    },

    extractContextSentence(fullText, phrase) {
        if (!fullText || !phrase) return '';
        const idx = fullText.toLowerCase().indexOf(phrase.toLowerCase());
        if (idx === -1) return phrase;

        let start = idx;
        while (start > 0 && !['.', '!', '?', '\n'].includes(fullText[start - 1])) {
            start--;
        }

        let end = idx + phrase.length;
        while (end < fullText.length && !['.', '!', '?', '\n'].includes(fullText[end])) {
            end++;
        }
        if (end < fullText.length && ['.', '!', '?'].includes(fullText[end])) end++;

        return fullText.substring(start, end).trim();
    },

    toggleHighlightMode() {
        this.state.highlightMode = !this.state.highlightMode;
        const btn = document.getElementById('btn-toggle-highlighter');
        const label = document.getElementById('hl-mode-label');
        if (this.state.highlightMode) {
            if (btn) btn.classList.add('btn-hl-active');
            if (label) label.textContent = '🖍️ โหมดไฮไลต์ (เปิด)';
            this.showToast('โหมดไฮไลต์เปิด: ลากคลุมข้อความที่ต้องการเน้น', 'info');
        } else {
            if (btn) btn.classList.remove('btn-hl-active');
            if (label) label.textContent = '🖍️ โหมดไฮไลต์';
            this.showToast('ปิดโหมดไฮไลต์แล้ว', 'info');
        }
    },

    highlightSelection(color = 'yellow') {
        const selection = window.getSelection();
        const range = this.state.selectedRange || (selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null);
        if (!range || range.collapsed) return;

        const mark = document.createElement('mark');
        mark.className = `exam-hl-${color}`;
        mark.title = 'แตะเพื่อลบไฮไลต์';
        mark.onclick = (e) => {
            e.stopPropagation();
            const parent = mark.parentNode;
            while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
            parent.removeChild(mark);
            app.showToast('ลบไฮไลต์แล้ว', 'info');
        };

        try {
            range.surroundContents(mark);
        } catch (err) {
            try {
                const fragment = range.extractContents();
                mark.appendChild(fragment);
                range.insertNode(mark);
            } catch (err2) {
                console.error('Highlight failed:', err2);
                document.execCommand('hiliteColor', false, color === 'yellow' ? '#facc15' : color === 'emerald' ? '#10b981' : '#f43f5e');
            }
        }

        if (window.getSelection()) {
            window.getSelection().removeAllRanges();
        }

        const bubble = document.getElementById('selection-action-bubble');
        if (bubble) bubble.style.display = 'none';
        this.showToast('ไฮไลต์ข้อความเรียบร้อย! (แตะที่สีเพื่อลบ)', 'success');
    },

    removeSelectionHighlight() {
        const selection = window.getSelection();
        if (selection && selection.anchorNode) {
            const elem = selection.anchorNode.nodeType === 3 ? selection.anchorNode.parentElement : selection.anchorNode;
            const mark = elem.closest('mark');
            if (mark) {
                const parent = mark.parentNode;
                while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
                parent.removeChild(mark);
                this.showToast('ลบไฮไลต์แล้ว', 'info');
            }
        }
        const bubble = document.getElementById('selection-action-bubble');
        if (bubble) bubble.style.display = 'none';
    },

    async translateSelectedText() {
        const rawWord = this.state.selectedText;
        if (!rawWord) return;

        // Clean punctuation from word
        const cleanWord = rawWord.trim().replace(/^['"“‘(\[]+|[.,!?;:)'"”’\]]+$/g, '');
        if (!cleanWord) return;

        const bubble = document.getElementById('selection-action-bubble');
        if (bubble) bubble.style.display = 'none';

        try {
            this.showToast(`กำลังแปลคำว่า "${cleanWord}"...`, 'info');
            const res = await fetch(`/api/vocab/translate?word=${encodeURIComponent(cleanWord)}`);
            const result = await res.json();
            if (result.success) {
                const data = result.data;
                document.getElementById('vocab-modal-word').textContent = data.word;
                document.getElementById('vocab-modal-phonetic').textContent = data.phonetic || '';
                document.getElementById('vocab-modal-pos').textContent = data.pos || '';
                document.getElementById('vocab-modal-def').value = data.definition_th || '';
                document.getElementById('vocab-modal-context').value = this.state.selectedContext || '';

                document.getElementById('vocab-lookup-modal').classList.add('open');
            }
        } catch (err) {
            console.error('Translation failed', err);
            this.showToast('ไม่สามารถแปลคำศัพท์ได้', 'error');
        }
    },

    speakWord(customWord) {
        const word = customWord || document.getElementById('vocab-modal-word').textContent.trim();
        if (!word) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(word);
            utter.lang = 'en-US';
            utter.rate = 0.9;
            window.speechSynthesis.speak(utter);
        } else {
            this.showToast('เบราว์เซอร์ไม่รองรับระบบออกเสียง', 'info');
        }
    },

    closeVocabModal() {
        document.getElementById('vocab-lookup-modal').classList.remove('open');
    },

    async saveCurrentVocab() {
        const word = document.getElementById('vocab-modal-word').textContent.trim();
        const phonetic = document.getElementById('vocab-modal-phonetic').textContent.trim();
        const pos = document.getElementById('vocab-modal-pos').textContent.trim();
        const def = document.getElementById('vocab-modal-def').value.trim();
        const context = document.getElementById('vocab-modal-context').value.trim();

        const currentQ = this.state.activeSession?.questions[this.state.currentQuestionIndex];

        try {
            const res = await fetch('/api/vocab', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    word,
                    phonetic,
                    part_of_speech: pos,
                    definition_th: def,
                    context_sentence: context,
                    source_question_id: currentQ ? currentQ.id : null
                })
            });

            const data = await res.json();
            if (data.success) {
                this.showToast(`บันทึกคำว่า "${word}" เข้าคลังคำศัพท์แล้ว!`, 'success');
                this.closeVocabModal();
                await this.loadVocab();
            } else {
                this.showToast(data.error || 'ไม่สามารถบันทึกได้', 'error');
            }
        } catch (err) {
            console.error('Failed to save vocab', err);
            this.showToast('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์', 'error');
        }
    },

    // ==========================================
    // 9. VOCABULARY BANK VIEW & FLASHCARDS
    // ==========================================

    async loadVocab() {
        try {
            const res = await fetch('/api/vocab');
            const data = await res.json();
            if (data.success) {
                this.state.allVocab = data.data;
                const activeCount = data.data.filter(v => v.mastery_status !== 'mastered').length;
                const badge = document.getElementById('sidebar-vocab-count');
                if (badge) badge.textContent = activeCount;
                this.renderVocabList();
            }
        } catch (err) {
            console.error('Failed to load vocab', err);
        }
    },

    filterVocab(status) {
        this.state.currentVocabFilter = status;
        document.querySelectorAll('[data-vstatus]').forEach(btn => {
            if (btn.dataset.vstatus === status) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        this.renderVocabList();
    },

    searchVocab(query) {
        const q = (query || '').toLowerCase().trim();
        const container = document.getElementById('vocab-list-container');
        if (!container) return;

        let list = this.state.currentVocabFilter === 'all'
            ? this.state.allVocab
            : this.state.allVocab.filter(v => v.mastery_status === this.state.currentVocabFilter);

        if (q) {
            list = list.filter(v =>
                v.word.toLowerCase().includes(q) ||
                v.definition_th.toLowerCase().includes(q) ||
                (v.context_sentence && v.context_sentence.toLowerCase().includes(q))
            );
        }

        this.renderVocabItems(list);
    },

    renderVocabList() {
        const filter = this.state.currentVocabFilter;
        const list = filter === 'all'
            ? this.state.allVocab
            : this.state.allVocab.filter(v => v.mastery_status === filter);
        this.renderVocabItems(list);
    },

    renderVocabItems(list) {
        const container = document.getElementById('vocab-list-container');
        if (!container) return;

        if (list.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; padding: 3rem 1.5rem; text-align: center;">
                    <div style="display:flex;justify-content:center;margin-bottom: 0.75rem;">${this.svg('book', {size: 36, color: 'var(--accent-indigo)'})}</div>
                    <div style="font-weight: 700; font-size: 1.1rem; color: #f1f5f9; margin-bottom: 0.5rem;">ยังไม่มีคำศัพท์ในหมวดนี้</div>
                    <p style="color: var(--text-secondary); max-width: 460px; margin: 0 auto; font-size: 0.9rem;">
                        ขณะฝึกทำข้อสอบภาษาอังกฤษ สามารถลากคลุมเฉพาะคำศัพท์ที่ไม่คุ้นเคยเพื่อแปลและบันทึกเข้าคลังคำศัพท์นี้ได้ทันที
                    </p>
                </div>
            `;
            return;
        }

        container.innerHTML = list.map(v => {
            const escapedWord = v.word.replace(/'/g, "\\'");
            // Highlight target word in context sentence
            let formattedContext = v.context_sentence || '';
            if (formattedContext && v.word) {
                const regex = new RegExp(`\\b(${v.word})\\b`, 'gi');
                formattedContext = formattedContext.replace(regex, '<mark>$1</mark>');
            }

            return `
                <div class="vocab-card" id="vocab-card-${v.id}">
                    <div class="vocab-card-top">
                        <div class="vocab-card-word-group">
                            <div class="vocab-card-word">
                                <span>${v.word}</span>
                                <button class="vocab-speak-btn" onclick="app.speakWord('${escapedWord}')" title="ฟังการออกเสียง (Pronounce)">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                                </button>
                            </div>
                            <div class="vocab-card-meta">
                                ${v.phonetic ? `<span class="vocab-card-phonetic">${v.phonetic}</span>` : ''}
                                ${v.part_of_speech ? `<span class="vocab-card-pos">${v.part_of_speech}</span>` : ''}
                            </div>
                        </div>

                        <select class="vocab-status-select" onchange="app.updateVocabStatus('${v.id}', this.value)">
                            <option value="learning" ${v.mastery_status === 'learning' ? 'selected' : ''}>📖 กำลังจำ</option>
                            <option value="reviewing" ${v.mastery_status === 'reviewing' ? 'selected' : ''}>🔄 ทบทวน</option>
                            <option value="mastered" ${v.mastery_status === 'mastered' ? 'selected' : ''}>✅ จำแม่นแล้ว</option>
                        </select>
                    </div>

                    <div class="vocab-card-def">
                        <span style="color: #10b981; font-weight: 700; margin-right: 0.35rem;">แปล:</span>${v.definition_th}
                    </div>

                    ${formattedContext ? `<div class="vocab-card-context">“${formattedContext}”</div>` : ''}

                    <div class="vocab-card-footer">
                        <span class="vocab-date-badge">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            ${new Date(v.created_at).toLocaleDateString('th-TH')}
                        </span>
                        <button class="vocab-delete-btn" onclick="app.deleteVocab('${v.id}')" title="ลบคำศัพท์นี้ออกจากคลัง">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            ลบ
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    async updateVocabStatus(id, status) {
        try {
            await fetch(`/api/vocab/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mastery_status: status })
            });
            this.showToast('อัปเดตสถานะคำศัพท์สำเร็จ', 'success');
            await this.loadVocab();
        } catch (err) {
            console.error('Failed to update vocab', err);
        }
    },

    async deleteVocab(id) {
        if (!confirm('ต้องการลบคำศัพท์นี้ออกจากคลังหรือไม่?')) return;
        try {
            await fetch(`/api/vocab/${id}`, { method: 'DELETE' });
            this.showToast('ลบคำศัพท์แล้ว', 'info');
            await this.loadVocab();
        } catch (err) {
            console.error('Failed to delete vocab', err);
        }
    },

    // Flashcards Runner
    startVocabFlashcards() {
        if (this.state.allVocab.length === 0) {
            this.showToast('ไม่มีคำศัพท์ในคลังให้เริ่มโหมดการ์ด', 'info');
            return;
        }

        this.state.activeFlashcards = [...this.state.allVocab].sort(() => Math.random() - 0.5);
        this.state.flashcardIndex = 0;

        document.getElementById('flashcard-runner').style.display = 'flex';
        document.getElementById('vocab-list-container').style.display = 'none';

        this.renderCurrentFlashcard();
    },

    stopVocabFlashcards() {
        document.getElementById('flashcard-runner').style.display = 'none';
        document.getElementById('vocab-list-container').style.display = 'grid';
    },

    renderCurrentFlashcard() {
        const list = this.state.activeFlashcards;
        const idx = this.state.flashcardIndex;
        if (!list || list.length === 0 || !list[idx]) return;

        const v = list[idx];
        const cardBox = document.getElementById('flashcard-box');
        cardBox.classList.remove('flipped');

        document.getElementById('fc-index').textContent = idx + 1;
        document.getElementById('fc-total').textContent = list.length;

        document.getElementById('fc-word-front').textContent = v.word;
        document.getElementById('fc-phonetic-front').textContent = v.phonetic || '';
        document.getElementById('fc-pos-front').textContent = v.part_of_speech || '';

        document.getElementById('fc-def-back').textContent = v.definition_th;
        document.getElementById('fc-context-back').textContent = v.context_sentence ? `"${v.context_sentence}"` : '';

        // Auto pronounce when front shows
        this.speakWord(v.word);
    },

    flipFlashcard() {
        document.getElementById('flashcard-box').classList.toggle('flipped');
    },

    nextFlashcard() {
        if (this.state.flashcardIndex < this.state.activeFlashcards.length - 1) {
            this.state.flashcardIndex++;
            this.renderCurrentFlashcard();
        } else {
            this.showToast('🎉 จบชุดการ์ดคำศัพท์แล้ว!', 'success');
            this.stopVocabFlashcards();
        }
    },

    prevFlashcard() {
        if (this.state.flashcardIndex > 0) {
            this.state.flashcardIndex--;
            this.renderCurrentFlashcard();
        }
    },

    async markFlashcardMastered() {
        const v = this.state.activeFlashcards[this.state.flashcardIndex];
        if (v) {
            await this.updateVocabStatus(v.id, 'mastered');
            this.showToast(`บันทึกคำว่า "${v.word}" ว่าจำได้แล้ว!`, 'success');
            this.nextFlashcard();
        }
    }
});
