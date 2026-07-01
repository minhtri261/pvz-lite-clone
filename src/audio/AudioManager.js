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

    // Phát nhạc theo theme: 'day' | 'night' | 'egypt' | 'egypt-night'
    // Giữ tương thích ngược: isDayTime=true → day, false → night
    play(themeOrDay = true) {
        let src;
        if (themeOrDay === 'egypt' || themeOrDay === 'egypt-night') {
            src = 'assets/music/egypt.mp3';
        } else if (themeOrDay === 'night' || themeOrDay === false) {
            src = 'assets/music/night.mp3';
        } else {
            src = 'assets/music/day.mp3';
        }
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

    // Phát âm thanh hiệu ứng (one-shot, không loop)
    // name: tên file trong assets/sounds/ (không cần .mp3)
    // Đặt file vào: assets/sounds/hit.mp3, assets/sounds/plant.mp3, v.v.
    //
    // Khi nhiều zombie/đạn trúng cùng lúc, phát liên tục cùng 1 file gốc
    // sẽ chồng âm rất chói tai (cộng dồn volume vì clip dài hơn cooldown
    // rất nhiều — VD hit.mp3 ~0.3-0.5s nhưng cooldown chỉ 45ms). Để giảm
    // việc này dù chỉ có 1 file:
    //   - pitch random: mỗi lần phát đổi nhẹ playbackRate → giả lập
    //     nhiều "biến thể" âm thanh từ cùng 1 file gốc
    //   - cooldown: bỏ qua các lần phát quá gần nhau (cùng tên SFX)
    //   - giới hạn đồng thời: tối đa maxConcurrent bản cùng tên được phát
    //     cùng lúc — vượt quá thì bỏ qua, tránh chồng âm khi combat dồn dập
    //     (vẫn giữ phản hồi nhanh lúc bắn thưa, khác cooldown đơn thuần)
    playSFX(name) {
        if (this.muted) return;

        if (!this._sfxCooldowns) this._sfxCooldowns = {};
        if (!this._activeSfx)    this._activeSfx    = {};

        const now = performance.now();
        const last = this._sfxCooldowns[name] || 0;
        const cooldownMs = 45; // tối thiểu giữa 2 lần phát cùng tên SFX
        if (now - last < cooldownMs) return;
        this._sfxCooldowns[name] = now;

        const active = this._activeSfx[name] || (this._activeSfx[name] = []);
        const maxConcurrent = 4; // tối đa 4 bản cùng tên chạy đồng thời
        if (active.length >= maxConcurrent) return;

        const src = `assets/sounds/${name}.mp3`;
        const sfx = new Audio(src);
        sfx.volume = 0.45;
        sfx.playbackRate = 0.85 + Math.random() * 0.3; // 0.85x – 1.15x: đổi cao độ ngẫu nhiên

        active.push(sfx);
        const removeFromActive = () => {
            const i = active.indexOf(sfx);
            if (i !== -1) active.splice(i, 1);
        };
        sfx.addEventListener('ended', removeFromActive);
        sfx.play().catch(removeFromActive); // bỏ qua + dọn dẹp nếu file chưa có/lỗi phát
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
