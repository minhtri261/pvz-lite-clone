'use strict';
// ══════════════════════════════════════════════════════════════
//  AudioManager.js — Nhạc nền dùng HTML5 Audio (file MP3)
//
//  Đặt file nhạc vào thư mục assets/music/:
//    assets/music/day.mp3    — nhạc ban ngày (màn 1–10)
//    assets/music/night.mp3  — nhạc ban đêm  (màn 11–12)
//
//  Nếu file không tồn tại, trình duyệt sẽ bỏ qua lỗi âm thanh.
// ══════════════════════════════════════════════════════════════

class AudioManager {
    constructor() {
        this.audio       = null;   // HTMLAudioElement hiện tại
        this.muted       = false;
        this.volume      = 0.45;
        this._currentSrc = null;   // đường dẫn track đang phát
    }

    // Phát một track cụ thể (nếu đã đang phát cùng track thì không làm gì)
    playTrack(src) {
        if (this._currentSrc === src && this.audio && !this.audio.paused) return;
        this.stop(); // dừng track cũ
        this._currentSrc = src;
        this.audio       = new Audio(src);
        this.audio.loop   = true;
        this.audio.volume = this.muted ? 0 : this.volume;
        // Phát và xử lý lỗi autoplay (browser chặn cho đến khi user tương tác)
        this.audio.play().catch(() => {
            // Sẽ tự phát lại khi user click (xem retryPlay)
        });
    }

    // Phát nhạc theo thời gian: isDayTime=true → day.mp3, false → night.mp3
    play(isDayTime = true) {
        const src = isDayTime
            ? 'assets/music/day.mp3'
            : 'assets/music/night.mp3';
        this.playTrack(src);
    }

    // Tạm dừng (khi pause game hoặc vào menu)
    pause() {
        if (this.audio && !this.audio.paused) this.audio.pause();
    }

    // Tiếp tục phát
    resume() {
        if (this.audio && this.audio.paused) {
            this.audio.play().catch(() => {});
        }
    }

    // Dừng hẳn và giải phóng audio element
    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio = null;
        }
        this._currentSrc = null;
    }

    // Thử phát lại sau user gesture (giải quyết autoplay policy)
    retryPlay() {
        if (this.audio && this.audio.paused && this._currentSrc) {
            this.audio.play().catch(() => {});
        }
    }

    // Bật/tắt mute — trả về trạng thái muted mới
    toggleMute() {
        this.muted = !this.muted;
        if (this.audio) {
            this.audio.volume = this.muted ? 0 : this.volume;
        }
        return this.muted;
    }
}

const audioManager = new AudioManager();
