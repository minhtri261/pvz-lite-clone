'use strict';
// ══════════════════════════════════════════════════════════════
//  Particle.js — Hệ thống hạt (hiệu ứng visual ngắn hạn)
//  Mỗi hạt là một chấm tròn bay ra theo hướng ngẫu nhiên,
//  mờ dần rồi biến mất. Dùng cho: trúng đạn, chết, nổ, thu sun.
// ══════════════════════════════════════════════════════════════

class Particle {
    // x,y: vị trí ban đầu | vx,vy: vận tốc (pixel/frame)
    // color: màu CSS | size: bán kính | life: thời gian sống (ms)
    constructor(x, y, vx, vy, color, size, life) {
        Object.assign(this, { x, y, vx, vy, color, size, maxLife: life, life });
    }

    update(dt) {
        // Di chuyển theo vận tốc
        this.x  += this.vx * dt / 16.67;
        this.y  += this.vy * dt / 16.67;
        // Trọng lực kéo xuống
        this.vy += 0.18 * dt / 16.67;
        // Ma sát làm chậm theo chiều ngang
        this.vx *= 0.97;
        // Đếm ngược thời gian sống
        this.life -= dt;
    }

    draw(ctx) {
        const t = this.life / this.maxLife; // t = 1 lúc mới sinh, 0 lúc chết
        ctx.save();
        ctx.globalAlpha = t * t; // mờ dần theo bình phương (nhanh hơn tuyến tính)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.size * t, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Trả về true khi hạt đã hết thời gian sống → sẽ bị xóa khỏi mảng
    get isDead() { return this.life <= 0; }
}

// ── Hàm tạo hạt nhanh (spawn helpers) ─────────────────────────

// Hạt màu xanh lá khi đạn trúng zombie
function spawnHitParticles(x, y, particles) {
    for (let i = 0; i < 8; i++) {
        const a = Math.random() * Math.PI * 2; // hướng ngẫu nhiên (radian)
        const s = randFloat(2, 5);             // tốc độ ngẫu nhiên
        particles.push(new Particle(
            x, y,
            Math.cos(a) * s, Math.sin(a) * s - 2,            // vy âm → bay lên nhẹ
            `hsl(${randInt(90, 140)},90%,55%)`,               // xanh lá → vàng
            randFloat(3, 6), randFloat(300, 600)
        ));
    }
}

// Hạt màu xám/nâu khi zombie chết
function spawnDeathParticles(x, y, particles) {
    for (let i = 0; i < 14; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = randFloat(1, 6);
        particles.push(new Particle(
            x, y,
            Math.cos(a) * s, Math.sin(a) * s - 3,
            `hsl(${randInt(0, 60)},20%,${randInt(40, 70)}%)`, // màu đất/xám
            randFloat(4, 8), randFloat(500, 900)
        ));
    }
}

// Hạt cam/đỏ/vàng khi Cherry Bomb nổ — nhiều hạt lớn, bay xa
function spawnBigExplosionParticles(x, y, particles) {
    for (let i = 0; i < 35; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = randFloat(3, 14); // bay nhanh hơn nhiều
        particles.push(new Particle(
            x, y,
            Math.cos(a) * s, Math.sin(a) * s - 5,
            `hsl(${randInt(0, 55)},100%,${randInt(50, 85)}%)`, // đỏ-cam-vàng
            randFloat(5, 14), randFloat(600, 1400)
        ));
    }
}

// Hạt vàng khi click thu ánh nắng
function spawnSunCollectParticles(x, y, particles) {
    for (let i = 0; i < 10; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = randFloat(2, 5);
        particles.push(new Particle(
            x, y,
            Math.cos(a) * s, Math.sin(a) * s - 4,
            `hsl(${randInt(40, 60)},100%,${randInt(60, 85)}%)`, // vàng sáng
            randFloat(3, 7), randFloat(400, 700)
        ));
    }
}

// Hiệu ứng kết hợp plant (Fusion) — tia vàng + điểm sáng trắng
function spawnFusionParticles(x, y, particles) {
    // Vòng tia vàng/xanh lá bùng ra
    for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        const s = randFloat(4, 10);
        particles.push(new Particle(
            x, y,
            Math.cos(a) * s, Math.sin(a) * s - 2,
            `hsl(${randInt(45, 75)}, 100%, ${randInt(60, 88)}%)`, // vàng-xanh lá
            randFloat(4, 8),
            randFloat(550, 1000)
        ));
    }
    // Điểm sáng trắng lấp lánh
    for (let i = 0; i < 10; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = randFloat(6, 13);
        particles.push(new Particle(
            x, y,
            Math.cos(a) * s, Math.sin(a) * s - 5,
            '#FFFFFF',
            randFloat(2, 4),
            randFloat(350, 650)
        ));
    }
}
