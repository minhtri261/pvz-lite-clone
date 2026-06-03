'use strict';
// ══════════════════════════════════════════════════════════════
//  AudioManager.js — Nhạc nền sinh tổng hợp (Web Audio API)
//
//  Không cần file âm thanh — tạo nhạc trực tiếp từ oscillator.
//  Giai điệu C major vui nhộn kiểu PvZ, lặp liên tục.
//
//  LƯU Ý: Browser yêu cầu user gesture trước khi phát âm thanh.
//  Hàm init() sẽ được gọi tự động khi người chơi click lần đầu.
// ══════════════════════════════════════════════════════════════

class AudioManager {
    constructor() {
        this.ctx     = null;    // AudioContext
        this.master  = null;    // Master GainNode (volume control)
        this.muted   = false;
        this._handle = null;    // setTimeout handle cho loop tiếp theo
        this._active = false;   // đang phát nhạc hay chưa
    }

    // Khởi tạo AudioContext — phải gọi trong/sau user gesture
    init() {
        if (this.ctx) return;
        try {
            this.ctx    = new (window.AudioContext || window.webkitAudioContext)();
            this.master = this.ctx.createGain();
            this.master.gain.value = 0.20;
            this.master.connect(this.ctx.destination);
        } catch (e) {
            console.warn('AudioManager: Web Audio API không khả dụng');
        }
    }

    // Bắt đầu phát nhạc (gọi khi vào màn chơi)
    play() {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        if (!this._active) { this._active = true; this._scheduleLoop(); }
    }

    // Tạm dừng âm thanh (khi pause game hoặc vào menu)
    pause()  { if (this.ctx) this.ctx.suspend(); }

    // Tiếp tục phát (khi resume game)
    resume() {
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }

    // Bật/tắt mute — trả về trạng thái muted mới
    toggleMute() {
        this.muted = !this.muted;
        if (this.master && this.ctx) {
            const vol = this.muted ? 0 : 0.20;
            this.master.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.08);
        }
        return this.muted;
    }

    // ── Phát 1 nốt nhạc ──────────────────────────────────────
    // type: 'triangle' (ấm), 'sine' (mềm), 'square' (cứng)
    _note(freq, startTime, duration, vol = 0.4, type = 'triangle') {
        if (!this.ctx || !this.master) return;
        const osc = this.ctx.createOscillator();
        const env = this.ctx.createGain();
        osc.connect(env); env.connect(this.master);
        osc.type = type;
        osc.frequency.value = freq;
        // ADSR đơn giản: attack nhanh, decay dần
        env.gain.setValueAtTime(0, startTime);
        env.gain.linearRampToValueAtTime(vol, startTime + 0.02);
        env.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.start(startTime);
        osc.stop(startTime + duration + 0.06);
    }

    // ── Lên lịch một vòng nhạc (32 beats = 8s ở 120 BPM) ────
    _scheduleLoop() {
        if (!this.ctx || this.ctx.state === 'closed') return;
        const now = this.ctx.currentTime + 0.05;
        const q   = 0.25; // quarter note = 0.25s tại 120 BPM

        // ── Giai điệu chính (C major, marimba-like triangle) ──
        const melody = [
            // Bar 1-2: arpeggio lên xuống
            [523.25,  0], [659.25,  1], [783.99,  2], [659.25,  3],
            [698.46,  4], [880.00,  5], [783.99,  6], [659.25,  7],
            // Bar 3-4: chạy lên cao rồi note dài
            [523.25,  8], [659.25,  9], [783.99, 10], [987.77, 11],
            [1046.50, 12],              [1046.50, 14],
            // Bar 5-6: F major feel, giai điệu nhẹ nhàng
            [587.33, 16], [698.46, 17], [880.00, 18], [698.46, 19],
            [659.25, 20], [783.99, 21], [698.46, 22], [587.33, 23],
            // Bar 7-8: giải quyết về C
            [523.25, 24], [659.25, 25], [783.99, 26], [659.25, 27],
            [523.25, 28],               [523.25, 30],
        ];
        for (const [f, b] of melody) {
            const isLong = (b === 12 || b === 28);
            this._note(f, now + b * q, isLong ? q * 1.85 : q * 0.85, 0.36, 'triangle');
        }

        // ── Harmony (5ths bên dưới, sine nhẹ hơn) ────────────
        const harmony = [
            [392.00,  0], [523.25,  4], [392.00,  8], [523.25, 12],
            [349.23, 16], [392.00, 20], [349.23, 24], [392.00, 28],
        ];
        for (const [f, b] of harmony) {
            this._note(f, now + b * q, q * 2.8, 0.16, 'sine');
        }

        // ── Bass line (đánh mỗi 4 beat) ──────────────────────
        const bass = [
            [130.81,  0], [130.81,  4], [174.61,  8], [196.00, 12],
            [174.61, 16], [164.81, 20], [130.81, 24], [130.81, 28],
        ];
        for (const [f, b] of bass) {
            this._note(f, now + b * q, q * 3.5, 0.26, 'sine');
        }

        // ── Tick nhịp (quarter note accent) ──────────────────
        for (let b = 0; b < 32; b += 4) {
            this._note(880, now + b * q, 0.03, 0.08, 'square');
        }

        // Lên lịch vòng lặp tiếp, trước khi vòng này kết thúc 200ms
        const loopMs = (32 * q - 0.2) * 1000;
        this._handle = setTimeout(() => {
            this._handle = null;
            if (this._active && this.ctx && this.ctx.state !== 'closed') {
                this._scheduleLoop();
            }
        }, loopMs);
    }

    // Dừng hẳn (không còn lên lịch nữa)
    stop() {
        this._active = false;
        if (this._handle) { clearTimeout(this._handle); this._handle = null; }
    }
}

// Instance toàn cục — được dùng bởi Game.js và main.js
const audioManager = new AudioManager();
