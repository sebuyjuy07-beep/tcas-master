/**
 * TCAS Master - CEFR Vocabulary Quiz Controller (A1 - C2)
 */
Object.assign(app, {
    // ==========================================
    // CEFR VOCABULARY QUIZ CONTROLLER (A1 - C2)
    // ==========================================

    async loadCefrOverview() {
        try {
            const res = await fetch('/api/cefr/levels');
            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            this.state.cefrLevels = data.data;

            // Compute summary numbers
            let totalWords = 0;
            let totalMastered = 0;
            let totalQuizzes = 0;

            this.state.cefrLevels.forEach(lvl => {
                totalWords += lvl.total_words || 0;
                totalMastered += lvl.mastered_words || 0;
                totalQuizzes += lvl.quizzes_taken || 0;
            });

            const totalWordsEl = document.getElementById('cefr-total-words-val');
            const masteredWordsEl = document.getElementById('cefr-mastered-words-val');
            const quizzesTakenEl = document.getElementById('cefr-quizzes-taken-val');

            if (totalWordsEl) totalWordsEl.textContent = totalWords;
            if (masteredWordsEl) masteredWordsEl.textContent = totalMastered;
            if (quizzesTakenEl) quizzesTakenEl.textContent = totalQuizzes;

            this.renderCefrLevelCards();
        } catch (err) {
            console.error('Error loading CEFR overview:', err);
            this.showToast('ไม่สามารถโหลดข้อมูล CEFR ได้: ' + err.message, 'error');
        }
    },

    renderCefrLevelCards() {
        const container = document.getElementById('cefr-levels-container');
        if (!container) return;

        const levelMetadata = {
            A1: {
                title: 'Beginner',
                examTarget: 'ปูพื้นฐานการสื่อสาร',
                desc: 'คำศัพท์พื้นฐานสำหรับเริ่มต้น เหมาะสำหรับปูพื้นฐานภาษาอังกฤษให้แน่นตั้งแต่ก้าวแรก',
                accentClass: 'lvl-a1'
            },
            A2: {
                title: 'Elementary',
                examTarget: 'ศัพท์ชีวิตประจำวัน',
                desc: 'คำศัพท์ทั่วไปในชีวิตประจำวัน สิ่งแวดล้อม และบริบทการสนทนาเบื้องต้น',
                accentClass: 'lvl-a2'
            },
            B1: {
                title: 'Intermediate',
                examTarget: '⭐ พื้นฐาน TGAT1',
                desc: 'คำศัพท์ระดับกลางที่พบบ่อยในข้อสอบ TGAT1 พาร์ท Speaking & Reading สื่อสารคล่องแคล่ว',
                accentClass: 'lvl-b1'
            },
            B2: {
                title: 'Upper Intermediate',
                examTarget: '🏆 แกนหลัก TGAT1 / TCAS',
                desc: 'คำศัพท์ที่ชี้ขาดผลคะแนน TGAT1 และข้อสอบมหาวิทยาลัย เช่น การทำงาน, ประกาศ, บทความวิเคราะห์',
                accentClass: 'lvl-b2'
            },
            C1: {
                title: 'Advanced',
                examTarget: '🥇 แกนหลัก A-Level อังกฤษ',
                desc: 'คำศัพท์วิชาการขั้นสูง (Academic Vocabulary) สำหรับบทความวิทยาศาสตร์ ปรัชญา และงานวิจัย',
                accentClass: 'lvl-c1'
            },
            C2: {
                title: 'Proficiency',
                examTarget: '👑 ระดับสูง / สายแพทย์ / อินเตอร์',
                desc: 'คำศัพท์ชั้นครูระดับเชี่ยวชาญ วรรณกรรม คลังศัพท์ชั้นเลิศสำหรับผู้ต้องการพิชิต 90+ คะแนน',
                accentClass: 'lvl-c2'
            }
        };

        let html = '';
        this.state.cefrLevels.forEach(lvl => {
            const meta = levelMetadata[lvl.level] || {
                title: lvl.title,
                examTarget: 'ทั่วไป',
                desc: 'ทดสอบคำศัพท์ในระดับ ' + lvl.level,
                accentClass: 'lvl-b1'
            };

            const progress = lvl.progress_percentage || 0;

            html += `
                <div class="cefr-level-card ${meta.accentClass}">
                    <div>
                        <div class="cefr-card-top">
                            <span class="cefr-level-badge-large">${lvl.level}</span>
                            <span class="cefr-exam-badge">${meta.examTarget}</span>
                        </div>
                        <h4 class="cefr-card-title">${lvl.level} - ${meta.title}</h4>
                        <p class="cefr-card-desc">${meta.desc}</p>

                        <div class="cefr-progress-row">
                            <div class="cefr-progress-labels">
                                <span>จดจำแม่นยำ (${lvl.mastered_words}/${lvl.total_words} คำ)</span>
                                <span>${progress}%</span>
                            </div>
                            <div class="cefr-level-progress-track">
                                <div class="cefr-level-progress-bar" style="width: ${progress}%;"></div>
                            </div>
                        </div>
                    </div>

                    <div class="cefr-card-actions">
                        <button class="btn btn-primary" onclick="app.openCefrQuizConfig('${lvl.level}')">
                            ⚡ ทำควิซ (${lvl.level})
                        </button>
                        <button class="btn btn-outline" onclick="app.openCefrWordList('${lvl.level}')">
                            📖 ดูคำศัพท์
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    openCefrQuizConfig(level) {
        this.state.cefrConfigLevel = level;
        const modal = document.getElementById('modal-cefr-config');
        const titleEl = document.getElementById('cefr-cfg-title');
        const countBadge = document.getElementById('cefr-count-badge');
        const btnCount = document.getElementById('cefr-btn-word-count');
        const slider = document.getElementById('cefr-word-slider');

        if (titleEl) {
            titleEl.textContent = `ตั้งค่าควิซคำศัพท์ ${level === 'MIXED' ? 'Mixed Challenge' : 'Level ' + level}`;
        }
        const count = this.state.cefrWordCount || 10;
        if (countBadge) countBadge.textContent = `${count} คำ`;
        if (btnCount) btnCount.textContent = count;
        if (slider) slider.value = count;

        if (modal) modal.classList.add('open');
    },

    closeCefrConfigModal() {
        const modal = document.getElementById('modal-cefr-config');
        if (modal) modal.classList.remove('open');
    },

    setCefrWordCount(count, btn) {
        this.state.cefrWordCount = parseInt(count, 10);
        const countBadge = document.getElementById('cefr-count-badge');
        const btnCount = document.getElementById('cefr-btn-word-count');
        const slider = document.getElementById('cefr-word-slider');
        if (countBadge) countBadge.textContent = `${this.state.cefrWordCount} คำ`;
        if (btnCount) btnCount.textContent = this.state.cefrWordCount;
        if (slider) slider.value = this.state.cefrWordCount;

        document.querySelectorAll('.preset-chip').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');

        this.updateCefrRoundEstimate();
    },

    onCefrSliderChange(val) {
        this.state.cefrWordCount = parseInt(val, 10);
        const countBadge = document.getElementById('cefr-count-badge');
        const btnCount = document.getElementById('cefr-btn-word-count');
        if (countBadge) countBadge.textContent = `${this.state.cefrWordCount} คำ`;
        if (btnCount) btnCount.textContent = this.state.cefrWordCount;

        document.querySelectorAll('.preset-chip').forEach(b => {
            const num = parseInt(b.textContent, 10);
            if (num === this.state.cefrWordCount) b.classList.add('active');
            else b.classList.remove('active');
        });

        this.updateCefrRoundEstimate();
    },

    setCefrTimerMode(mode) {
        this.state.cefrTimerMode = mode;
        document.querySelectorAll('.timer-radio-card').forEach(c => c.classList.remove('active'));
        const target = document.getElementById(`timer-card-${mode}`);
        if (target) target.classList.add('active');
        this.updateCefrRoundEstimate();
    },

    updateCefrRoundEstimate() {
        const count = this.state.cefrWordCount || 10;
        const totalMinutes = Math.max(1, Math.round((count * 15) / 60));
        const descEl = document.getElementById('cefr-round-time-desc');
        if (descEl) descEl.textContent = `${totalMinutes} นาที`;
        this.state.cefrRoundTimeLimitSeconds = totalMinutes * 60;
    },

    async launchConfiguredCefrQuiz() {
        this.closeCefrConfigModal();
        const level = this.state.cefrConfigLevel || 'B2';
        const count = this.state.cefrWordCount || 10;
        const timerMode = this.state.cefrTimerMode || 'per_15';
        await this.startCefrQuiz(level, 'meaning', count, timerMode);
    },

    async startCefrQuiz(level, mode = 'meaning', count = 10, timerMode = 'per_15') {
        try {
            this.state.currentCefrLevel = level;
            this.state.cefrWordCount = count;
            this.state.cefrTimerMode = timerMode;
            this.showToast(`กำลังเตรียมควิซระดับ ${level} (${count} คำ)...`, 'info');

            const res = await fetch('/api/cefr/quiz/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ level, count, mode, timer_type: timerMode })
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            this.state.activeCefrQuiz = data.data;
            this.state.cefrCurrentQuestionIndex = 0;
            this.state.cefrQuizAnswers = [];
            this.state.cefrQuizAnswered = false;
            this.state.cefrTotalTimeElapsed = 0;

            // Initialize total round time if in round_total mode
            if (timerMode === 'round_total') {
                this.state.cefrTimeLeftSeconds = this.state.cefrRoundTimeLimitSeconds || Math.max(60, count * 15);
            }

            // Switch screen
            document.getElementById('cefr-screen-overview').style.display = 'none';
            document.getElementById('cefr-screen-results').style.display = 'none';
            document.getElementById('cefr-screen-quiz').style.display = 'block';

            // Level indicator
            const pillEl = document.getElementById('cefr-quiz-level-pill');
            if (pillEl) {
                pillEl.textContent = level === 'MIXED' ? `Mixed (${count} คำ)` : `Level ${level} (${count} คำ)`;
            }

            this.renderCefrQuestion();
        } catch (err) {
            console.error('Error starting CEFR quiz:', err);
            this.showToast('ไม่สามารถเริ่มควิซได้: ' + err.message, 'error');
        }
    },

    renderCefrQuestion() {
        if (!this.state.activeCefrQuiz) return;
        const qList = this.state.activeCefrQuiz.questions;
        const currIndex = this.state.cefrCurrentQuestionIndex;
        if (currIndex >= qList.length) {
            this.finishCefrQuiz();
            return;
        }

        const q = qList[currIndex];
        this.state.cefrQuizAnswered = false;
        this.state.cefrQuizStartTime = Date.now();

        // Counter & Progress
        const counterEl = document.getElementById('cefr-quiz-counter');
        const progressBar = document.getElementById('cefr-progress-bar');
        if (counterEl) counterEl.textContent = `คำที่ ${currIndex + 1} / ${qList.length}`;
        if (progressBar) progressBar.style.width = `${((currIndex + 1) / qList.length) * 100}%`;

        // Word card
        const wordEl = document.getElementById('cefr-active-word');
        const phoneticEl = document.getElementById('cefr-active-phonetic');
        const posEl = document.getElementById('cefr-active-pos');
        const exampleEl = document.getElementById('cefr-active-example');
        const starBtn = document.getElementById('cefr-star-btn');

        if (wordEl) wordEl.textContent = q.word;
        if (phoneticEl) phoneticEl.textContent = q.phonetic || '';
        if (posEl) posEl.textContent = q.part_of_speech || '';
        if (exampleEl) exampleEl.textContent = q.example_sentence ? `"${q.example_sentence}"` : 'ตัวอย่างประโยคบริบทการใช้งาน';

        if (starBtn) {
            starBtn.classList.remove('starred');
            starBtn.setAttribute('data-word-id', q.word_id);
        }

        // Options
        const container = document.getElementById('cefr-options-container');
        if (container) {
            container.innerHTML = q.options.map((opt, idx) => `
                <button class="cefr-option-btn" id="cefr-opt-${idx}" onclick="app.selectCefrOption(${idx})">
                    <span class="cefr-opt-key">${idx + 1}</span>
                    <span class="cefr-opt-text">${this.escapeHtml(opt.content)}</span>
                </button>
            `).join('');
        }

        // Hide feedback banner
        const fbBanner = document.getElementById('cefr-feedback-banner');
        if (fbBanner) fbBanner.style.display = 'none';

        // Start 15s Timer
        this.startCefrTimer();
    },

    startCefrTimer() {
        if (this.state.cefrTimerInterval) clearInterval(this.state.cefrTimerInterval);
        const timerBox = document.getElementById('cefr-timer-box');
        const timerText = document.getElementById('cefr-timer-text');
        if (timerBox) timerBox.classList.remove('timer-urgent');

        const mode = this.state.cefrTimerMode || 'per_15';

        if (mode === 'zen') {
            if (timerText) timerText.textContent = 'Zen';
            this.state.cefrTimerInterval = setInterval(() => {
                this.state.cefrTotalTimeElapsed++;
                const m = Math.floor(this.state.cefrTotalTimeElapsed / 60);
                const s = this.state.cefrTotalTimeElapsed % 60;
                if (timerText) timerText.textContent = `${m}:${String(s).padStart(2, '0')}`;
            }, 1000);
            return;
        }

        if (mode === 'round_total') {
            const updateDisplay = () => {
                const m = Math.floor(this.state.cefrTimeLeftSeconds / 60);
                const s = this.state.cefrTimeLeftSeconds % 60;
                if (timerText) timerText.textContent = `${m}:${String(s).padStart(2, '0')}`;
            };
            updateDisplay();

            this.state.cefrTimerInterval = setInterval(() => {
                this.state.cefrTimeLeftSeconds--;
                this.state.cefrTotalTimeElapsed++;
                updateDisplay();

                if (this.state.cefrTimeLeftSeconds <= 30 && timerBox) {
                    timerBox.classList.add('timer-urgent');
                }

                if (this.state.cefrTimeLeftSeconds <= 0) {
                    clearInterval(this.state.cefrTimerInterval);
                    this.showToast('หมดเวลารวมของควิซแล้ว! สรุปคะแนนทันที', 'warning');
                    this.finishCefrQuiz();
                }
            }, 1000);
            return;
        }

        // Per question modes (per_15 or per_30)
        const secondsPerQ = mode === 'per_30' ? 30 : 15;
        this.state.cefrTimeLeftSeconds = secondsPerQ;
        if (timerText) timerText.textContent = `${secondsPerQ}s`;

        this.state.cefrTimerInterval = setInterval(() => {
            this.state.cefrTimeLeftSeconds--;
            this.state.cefrTotalTimeElapsed++;
            if (timerText) timerText.textContent = `${this.state.cefrTimeLeftSeconds}s`;

            if (this.state.cefrTimeLeftSeconds <= 5 && timerBox) {
                timerBox.classList.add('timer-urgent');
            }

            if (this.state.cefrTimeLeftSeconds <= 0) {
                clearInterval(this.state.cefrTimerInterval);
                this.handleCefrTimeout();
            }
        }, 1000);
    },

    selectCefrOption(optIndex) {
        if (this.state.cefrQuizAnswered) return;
        this.state.cefrQuizAnswered = true;
        clearInterval(this.state.cefrTimerInterval);

        const q = this.state.activeCefrQuiz.questions[this.state.cefrCurrentQuestionIndex];
        const selectedOpt = q.options[optIndex];
        const isCorrect = selectedOpt && selectedOpt.is_correct === 1;
        const timeSpent = Math.max(1, Math.round((Date.now() - this.state.cefrQuizStartTime) / 1000));

        // Record Answer
        this.state.cefrQuizAnswers.push({
            word_id: q.word_id,
            word: q.word,
            part_of_speech: q.part_of_speech,
            selected_meaning: selectedOpt ? selectedOpt.content : 'ไม่ได้ตอบ',
            correct_meaning: q.correct_meaning_th,
            is_correct: isCorrect ? 1 : 0,
            time_spent_seconds: timeSpent
        });

        // Highlight Buttons
        q.options.forEach((opt, idx) => {
            const btn = document.getElementById(`cefr-opt-${idx}`);
            if (!btn) return;
            btn.disabled = true;
            if (opt.is_correct === 1) {
                btn.classList.add('opt-correct');
            } else if (idx === optIndex && !isCorrect) {
                btn.classList.add('opt-wrong');
            }
        });

        // Show Feedback
        const fbBanner = document.getElementById('cefr-feedback-banner');
        const fbIcon = document.getElementById('cefr-feedback-icon');
        const fbTitle = document.getElementById('cefr-feedback-title');
        const fbDesc = document.getElementById('cefr-feedback-desc');

        if (fbBanner) {
            fbBanner.style.display = 'flex';
            if (isCorrect) {
                this.playSfx('correct');
                this.showFloatingExp('+20 EXP', window.innerWidth / 2, window.innerHeight * 0.45);
                fbIcon.innerHTML = this.svg('check-circle', { size: 40, color: '#34d399' });
                fbTitle.textContent = 'ถูกต้อง แม่นยำมาก!';
                fbTitle.style.color = '#34d399';
                fbDesc.textContent = `ความหมาย: ${q.correct_meaning_th}`;
            } else {
                this.playSfx('wrong');
                fbIcon.innerHTML = this.svg('lightbulb', { size: 40, color: '#fb7185' });
                fbTitle.textContent = 'ยังไม่ถูกต้อง!';
                fbTitle.style.color = '#fb7185';
                fbDesc.textContent = `คำตอบที่ถูกต้องคือ: ${q.correct_meaning_th}`;
            }
        }
    },

    handleCefrTimeout() {
        if (this.state.cefrQuizAnswered) return;
        this.state.cefrQuizAnswered = true;

        const q = this.state.activeCefrQuiz.questions[this.state.cefrCurrentQuestionIndex];
        this.state.cefrQuizAnswers.push({
            word_id: q.word_id,
            word: q.word,
            part_of_speech: q.part_of_speech,
            selected_meaning: 'หมดเวลา (ไม่ได้ตอบ)',
            correct_meaning: q.correct_meaning_th,
            is_correct: 0,
            time_spent_seconds: 15
        });

        // Reveal correct answer
        q.options.forEach((opt, idx) => {
            const btn = document.getElementById(`cefr-opt-${idx}`);
            if (btn) {
                btn.disabled = true;
                if (opt.is_correct === 1) btn.classList.add('opt-correct');
            }
        });

        const fbBanner = document.getElementById('cefr-feedback-banner');
        const fbIcon = document.getElementById('cefr-feedback-icon');
        const fbTitle = document.getElementById('cefr-feedback-title');
        const fbDesc = document.getElementById('cefr-feedback-desc');

        if (fbBanner) {
            fbBanner.style.display = 'flex';
            fbIcon.textContent = '⏱️';
            fbTitle.textContent = 'หมดเวลา!';
            fbTitle.style.color = '#f59e0b';
            fbDesc.textContent = `คำแปลที่ถูกต้องคือ: ${q.correct_meaning_th}`;
        }
    },

    nextCefrQuestion() {
        clearInterval(this.state.cefrTimerInterval);
        this.state.cefrCurrentQuestionIndex++;
        this.renderCefrQuestion();
    },

    exitCefrQuiz() {
        clearInterval(this.state.cefrTimerInterval);
        this.showCefrOverview();
    },

    async finishCefrQuiz() {
        clearInterval(this.state.cefrTimerInterval);
        this.showToast('กำลังประมวลผลคะแนนและ EXP...', 'info');

        try {
            const res = await fetch('/api/cefr/quiz/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quiz_id: this.state.activeCefrQuiz.quiz_id,
                    level: this.state.currentCefrLevel,
                    mode: this.state.activeCefrQuiz.mode,
                    answers: this.state.cefrQuizAnswers,
                    time_spent_seconds: this.state.cefrQuizAnswers.reduce((sum, a) => sum + a.time_spent_seconds, 0)
                })
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            // Update user status and EXP
            await this.loadUserStatus(true);

            // Display Results
            document.getElementById('cefr-screen-quiz').style.display = 'none';
            document.getElementById('cefr-screen-results').style.display = 'block';

            const r = data.data;
            const trophyEl = document.getElementById('cefr-result-trophy');
            const headingEl = document.getElementById('cefr-result-heading');
            const subtitleEl = document.getElementById('cefr-result-subtitle');
            const scoreEl = document.getElementById('cefr-result-score');
            const pctEl = document.getElementById('cefr-result-pct');
            const expEl = document.getElementById('cefr-result-exp');

            if (scoreEl) scoreEl.textContent = `${r.correct_count} / ${r.total_questions}`;
            if (pctEl) pctEl.textContent = `${r.score_percentage}%`;
            if (expEl) expEl.textContent = `+${r.exp_earned} EXP`;

            if (r.score_percentage >= 80) {
                this.playSfx('level_up');
                this.launchConfetti();
                if (trophyEl) trophyEl.innerHTML = this.svg('award', { size: 48, color: '#fbbf24' });
                if (headingEl) headingEl.textContent = 'ยอดเยี่ยม ไร้ที่ติ!';
                if (subtitleEl) subtitleEl.textContent = `คุณเชี่ยวชาญคำศัพท์ระดับ ${r.level} พร้อมพิชิตข้อสอบจริงแล้ว`;
            } else if (r.score_percentage >= 50) {
                this.playSfx('correct');
                this.launchConfetti();
                if (trophyEl) trophyEl.innerHTML = this.svg('star', { size: 48, color: '#fbbf24' });
                if (headingEl) headingEl.textContent = 'ทำได้ดี มีพัฒนาการ!';
                if (subtitleEl) subtitleEl.textContent = `คะแนนผ่านเกณฑ์ ทบทวนคำที่ตอบผิดอีกนิดจะจำได้แม่นยำขึ้นครับ`;
            } else {
                this.playSfx('wrong');
                if (trophyEl) trophyEl.innerHTML = this.svg('book', { size: 48, color: '#94a3b8' });
                if (headingEl) headingEl.textContent = 'พยายามต่อไป!';
                if (subtitleEl) subtitleEl.textContent = `แนะนำให้กด ⭐ ปักหมุดคำที่ตอบผิดเพื่อกลับมาทบทวนซ้ำครับ`;
            }

            // Render breakdown
            const listContainer = document.getElementById('cefr-breakdown-list');
            if (listContainer) {
                listContainer.innerHTML = this.state.cefrQuizAnswers.map(a => `
                    <div class="cefr-breakdown-item">
                        <div class="cefr-breakdown-left">
                            <span class="cefr-item-status">${a.is_correct ? this.svg('check-circle', { size: 16, color: '#34d399' }) : this.svg('x', { size: 16, color: '#f43f5e' })}</span>
                            <div>
                                <span class="cefr-item-word">${this.escapeHtml(a.word)}</span>
                                <span class="cefr-item-pos">(${a.part_of_speech})</span>
                            </div>
                        </div>
                        <div class="cefr-item-def">
                            ${this.escapeHtml(a.correct_meaning)}
                        </div>
                    </div>
                `).join('');
            }

        } catch (err) {
            console.error('Error submitting CEFR quiz:', err);
            this.showToast('ไม่สามารถบันทึกผลได้: ' + err.message, 'error');
        }
    },

    showCefrOverview() {
        document.getElementById('cefr-screen-quiz').style.display = 'none';
        document.getElementById('cefr-screen-results').style.display = 'none';
        document.getElementById('cefr-screen-overview').style.display = 'block';
        this.loadCefrOverview();
    },

    retryCefrQuiz() {
        this.startCefrQuiz(this.state.currentCefrLevel, 'meaning');
    },

    async toggleCurrentWordStar() {
        const starBtn = document.getElementById('cefr-star-btn');
        if (!starBtn) return;
        const wordId = starBtn.getAttribute('data-word-id');
        if (!wordId) return;

        try {
            const res = await fetch(`/api/cefr/words/${wordId}/toggle-star`, { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                if (data.is_starred) {
                    starBtn.classList.add('starred');
                    this.showToast('⭐ ปักหมุดคำศัพท์นี้เรียบร้อยแล้ว', 'success');
                } else {
                    starBtn.classList.remove('starred');
                    this.showToast('ยกเลิกปักหมุดคำศัพท์แล้ว', 'info');
                }
            }
        } catch (err) {
            console.error('Error starring word:', err);
        }
    },

    async openCefrWordList(level) {
        try {
            const res = await fetch(`/api/cefr/words?level=${level}`);
            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            const titleEl = document.getElementById('modal-cefr-title');
            const subtitleEl = document.getElementById('modal-cefr-subtitle');
            const countEl = document.getElementById('modal-cefr-count');
            const listEl = document.getElementById('modal-cefr-word-list');
            const startBtn = document.getElementById('modal-cefr-start-btn');

            if (titleEl) titleEl.textContent = `สมุดคำศัพท์ระดับ ${level}`;
            if (subtitleEl) subtitleEl.textContent = `รายการคำศัพท์ภาษาอังกฤษระดับ ${level} ในคลังระบบ`;
            if (countEl) countEl.textContent = `ทั้งหมด ${data.data.length} คำ`;

            if (startBtn) {
                startBtn.onclick = () => {
                    this.closeCefrWordList();
                    this.startCefrQuiz(level, 'meaning');
                };
            }

            if (listEl) {
                listEl.innerHTML = data.data.map(w => `
                    <div class="cefr-explorer-item">
                        <div class="cefr-explorer-main">
                            <div>
                                <h4>${this.escapeHtml(w.word)}</h4>
                                <span class="phonetic">${this.escapeHtml(w.phonetic || '')}</span>
                                <span class="cefr-pos-badge">${this.escapeHtml(w.part_of_speech || '')}</span>
                            </div>
                            <div class="cefr-explorer-def">
                                <strong>${this.escapeHtml(w.meaning_th)}</strong>
                                ${w.meaning_en ? ` - <span style="color: #94a3b8;">${this.escapeHtml(w.meaning_en)}</span>` : ''}
                            </div>
                            ${w.example_sentence ? `<div class="cefr-explorer-example">"${this.escapeHtml(w.example_sentence)}"</div>` : ''}
                        </div>
                    </div>
                `).join('');
            }

            const modal = document.getElementById('modal-cefr-words');
            if (modal) modal.classList.add('open');
        } catch (err) {
            console.error('Error opening word list:', err);
            this.showToast('ไม่สามารถเปิดรายการคำศัพท์ได้: ' + err.message, 'error');
        }
    },

    closeCefrWordList() {
        const modal = document.getElementById('modal-cefr-words');
        if (modal) modal.classList.remove('open');
    }
});
