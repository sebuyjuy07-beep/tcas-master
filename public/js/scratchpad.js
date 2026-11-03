/**
 * TCAS Master - Standalone Scratchpad Whiteboard Controller
 * Handles high-DPI canvas drawing, geometry tools, undo/redo, and cross-tab sync.
 */

class TCASWhiteboard {
    constructor() {
        this.canvas = document.getElementById('whiteboard-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.workspace = document.getElementById('sp-workspace');

        this.tool = 'pen';
        this.color = '#06b6d4';
        this.size = 2;
        this.isDrawing = false;
        this.gridStyle = 'math';

        this.startX = 0;
        this.startY = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.snapshot = null;

        // Undo & Redo stacks
        this.undoStack = [];
        this.redoStack = [];
        this.maxHistory = 25;

        // Current Question context
        this.currentQuestionId = '_global';
        this.currentQuestionText = '';

        // Cross-window sync channel
        this.channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('tcas_scratchpad_channel') : null;

        this.init();
    }

    init() {
        if (!this.canvas || !this.ctx) return;

        this.parseQueryParams();
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.setupPointerListeners();
        this.setupKeyboardShortcuts();
        this.setupBroadcastSync();

        // Load initial drawing from storage or main window
        this.loadInitialDrawing();
    }

    parseQueryParams() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('q')) {
            this.currentQuestionId = params.get('q');
        }
        if (params.has('num')) {
            const num = params.get('num');
            const label = document.getElementById('sp-question-label');
            const badge = document.getElementById('bottom-q-badge');
            if (label) label.textContent = `📝 ข้อที่ ${num}`;
            if (badge) badge.textContent = `ข้อที่ ${num}`;
        }
        if (params.has('text')) {
            this.currentQuestionText = decodeURIComponent(params.get('text'));
            const textElem = document.getElementById('bottom-q-text');
            if (textElem) textElem.textContent = this.currentQuestionText;
        }
    }

    resizeCanvas() {
        if (!this.workspace || !this.canvas) return;

        const rect = this.workspace.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        // Save current canvas content before resize
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(this.canvas, 0, 0);

        // Set physical pixel dimensions
        this.canvas.width = Math.floor(rect.width * dpr);
        this.canvas.height = Math.floor(rect.height * dpr);

        // Reset transform and apply DPR scaling
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);

        // Restore content
        this.ctx.drawImage(tempCanvas, 0, 0, rect.width, rect.height);
    }

    getPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    applyContextStyle() {
        const ctx = this.ctx;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (this.tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.globalAlpha = 1.0;
            ctx.lineWidth = this.size * 8;
        } else if (this.tool === 'highlighter') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.35;
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.lineWidth = Math.max(14, this.size * 5);
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1.0;
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.lineWidth = this.size;
        }
    }

    setupPointerListeners() {
        const canvas = this.canvas;

        const onPointerDown = (e) => {
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            e.preventDefault();
            this.isDrawing = true;
            try { canvas.setPointerCapture(e.pointerId); } catch (_) {}

            // Save state for undo before drawing new stroke
            this.pushUndoState();

            this.applyContextStyle();
            const pos = this.getPos(e);
            this.startX = pos.x;
            this.startY = pos.y;
            this.lastX = pos.x;
            this.lastY = pos.y;

            // Save snapshot for shape tools (line, rect, circle)
            try {
                this.snapshot = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
            } catch (_) {}

            // Draw immediate dot for pen/highlighter
            if (this.tool === 'pen' || this.tool === 'highlighter' || this.tool === 'eraser') {
                this.ctx.beginPath();
                this.ctx.arc(pos.x, pos.y, Math.max(1, this.ctx.lineWidth / 2), 0, Math.PI * 2);
                this.ctx.fill();
            }
        };

        const onPointerMove = (e) => {
            if (!this.isDrawing) return;
            e.preventDefault();
            const pos = this.getPos(e);

            if (this.tool === 'pen' || this.tool === 'highlighter' || this.tool === 'eraser') {
                this.ctx.beginPath();
                this.ctx.moveTo(this.lastX, this.lastY);
                this.ctx.lineTo(pos.x, pos.y);
                this.ctx.stroke();
                this.lastX = pos.x;
                this.lastY = pos.y;
            } else if (this.tool === 'line') {
                if (this.snapshot) this.ctx.putImageData(this.snapshot, 0, 0);
                this.applyContextStyle();
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX, this.startY);
                this.ctx.lineTo(pos.x, pos.y);
                this.ctx.stroke();
            } else if (this.tool === 'rect') {
                if (this.snapshot) this.ctx.putImageData(this.snapshot, 0, 0);
                this.applyContextStyle();
                this.ctx.beginPath();
                this.ctx.strokeRect(this.startX, this.startY, pos.x - this.startX, pos.y - this.startY);
            } else if (this.tool === 'circle') {
                if (this.snapshot) this.ctx.putImageData(this.snapshot, 0, 0);
                this.applyContextStyle();
                const rx = Math.abs(pos.x - this.startX) / 2;
                const ry = Math.abs(pos.y - this.startY) / 2;
                const cx = Math.min(this.startX, pos.x) + rx;
                const cy = Math.min(this.startY, pos.y) + ry;
                this.ctx.beginPath();
                this.ctx.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        };

        const onPointerUp = (e) => {
            if (!this.isDrawing) return;
            this.isDrawing = false;
            try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}

            // Clear redo stack on new action
            this.redoStack = [];
            this.updateUndoRedoBtnStates();

            // Auto broadcast and persist
            this.saveAndBroadcast();
        };

        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerup', onPointerUp);
        canvas.addEventListener('pointercancel', onPointerUp);
    }

    pushUndoState() {
        if (!this.canvas) return;
        const dataUrl = this.canvas.toDataURL();
        this.undoStack.push(dataUrl);
        if (this.undoStack.length > this.maxHistory) {
            this.undoStack.shift();
        }
        this.updateUndoRedoBtnStates();
    }

    undo() {
        if (this.undoStack.length === 0) return;
        const currentState = this.canvas.toDataURL();
        this.redoStack.push(currentState);

        const prevState = this.undoStack.pop();
        this.renderDataUrl(prevState);
        this.updateUndoRedoBtnStates();
        this.saveAndBroadcast();
        this.showToast('ย้อนกลับ 1 ขั้น');
    }

    redo() {
        if (this.redoStack.length === 0) return;
        const nextState = this.redoStack.pop();
        this.pushUndoState();
        this.renderDataUrl(nextState);
        this.updateUndoRedoBtnStates();
        this.saveAndBroadcast();
        this.showToast('ทำซ้ำ 1 ขั้น');
    }

    updateUndoRedoBtnStates() {
        const undoBtn = document.getElementById('btn-undo');
        const redoBtn = document.getElementById('btn-redo');
        if (undoBtn) undoBtn.disabled = this.undoStack.length === 0;
        if (redoBtn) redoBtn.disabled = this.redoStack.length === 0;
    }

    renderDataUrl(url, callback) {
        if (!this.ctx || !this.canvas) return;
        const img = new Image();
        img.onload = () => {
            this.ctx.save();
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0);
            this.ctx.restore();
            if (callback) callback();
        };
        img.src = url;
    }

    setupKeyboardShortcuts() {
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
                e.preventDefault();
                if (e.shiftKey) this.redo();
                else this.undo();
            } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
                e.preventDefault();
                this.redo();
            }
        });
    }

    setTool(toolName) {
        this.tool = toolName;
        document.querySelectorAll('.btn-group .sp-btn').forEach(btn => {
            if (btn.id && btn.id.startsWith('tool-')) {
                btn.classList.remove('active');
            }
        });
        const activeBtn = document.getElementById(`tool-${toolName}`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    setColor(colorHex) {
        this.color = colorHex;
        if (this.tool === 'eraser') {
            this.setTool('pen');
        }
        document.querySelectorAll('.color-chip').forEach(btn => {
            if (btn.style.background === colorHex || btn.getAttribute('style')?.includes(colorHex)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    setSize(val) {
        this.size = parseInt(val, 10);
        const label = document.getElementById('sp-size-label');
        if (label) label.textContent = `${this.size}px`;
    }

    setGrid(style) {
        this.gridStyle = style;
        const ws = this.workspace;
        if (!ws) return;

        ws.classList.remove('grid-math', 'grid-graph', 'grid-dots', 'grid-blank');
        ws.classList.add(`grid-${style}`);

        document.querySelectorAll('#btn-grid-math, #btn-grid-graph, #btn-grid-blank').forEach(b => b.classList.remove('active'));
        const activeBtn = document.getElementById(`btn-grid-${style}`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    clearCanvas() {
        if (!this.ctx || !this.canvas) return;
        this.pushUndoState();
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
        this.saveAndBroadcast();
        this.showToast('ล้างกระดานเรียบร้อยแล้ว');
    }

    toggleFormulas() {
        const drawer = document.getElementById('formulas-drawer');
        if (drawer) drawer.classList.toggle('open');
    }

    saveAndBroadcast() {
        if (!this.canvas) return;
        const dataUrl = this.canvas.toDataURL();

        // 1. Save to localStorage
        const storageKey = `tcas_scratchpad_${this.currentQuestionId}`;
        try {
            localStorage.setItem(storageKey, dataUrl);
            localStorage.setItem('tcas_scratchpad_latest_qid', this.currentQuestionId);
        } catch (_) {}

        // 2. Broadcast via BroadcastChannel
        if (this.channel) {
            this.channel.postMessage({
                type: 'SCRATCHPAD_UPDATE',
                questionId: this.currentQuestionId,
                dataUrl: dataUrl
            });
        }
    }

    setupBroadcastSync() {
        // BroadcastChannel listener
        if (this.channel) {
            this.channel.onmessage = (event) => {
                const msg = event.data;
                if (!msg) return;

                if (msg.type === 'CHANGE_QUESTION') {
                    // Main exam switched to a new question
                    this.currentQuestionId = msg.questionId;
                    const label = document.getElementById('sp-question-label');
                    const badge = document.getElementById('bottom-q-badge');
                    const textElem = document.getElementById('bottom-q-text');

                    if (label) label.textContent = `📝 ข้อที่ ${msg.questionIndex + 1}`;
                    if (badge) badge.textContent = `ข้อที่ ${msg.questionIndex + 1}`;
                    if (textElem && msg.questionText) textElem.textContent = msg.questionText;

                    this.loadInitialDrawing();
                    this.showToast(`สลับมาที่ข้อที่ ${msg.questionIndex + 1} แล้ว`);
                } else if (msg.type === 'MAIN_SCRATCHPAD_SYNC' && msg.questionId === this.currentQuestionId) {
                    if (msg.dataUrl) {
                        this.renderDataUrl(msg.dataUrl);
                    }
                }
            };
        }

        // Storage fallback listener
        window.addEventListener('storage', (e) => {
            if (e.key === `tcas_scratchpad_${this.currentQuestionId}` && e.newValue) {
                this.renderDataUrl(e.newValue);
            }
        });
    }

    loadInitialDrawing() {
        const storageKey = `tcas_scratchpad_${this.currentQuestionId}`;
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            this.renderDataUrl(saved);
        } else {
            // Check global
            const globalSaved = localStorage.getItem('tcas_scratchpad__global');
            if (globalSaved && this.currentQuestionId === '_global') {
                this.renderDataUrl(globalSaved);
            } else {
                // Clear
                this.ctx.save();
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.restore();
            }
        }
    }

    showToast(message) {
        const toast = document.getElementById('sp-toast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 1800);
    }
}

// Start Whiteboard when DOM is ready
let pad;
document.addEventListener('DOMContentLoaded', () => {
    pad = new TCASWhiteboard();
});
