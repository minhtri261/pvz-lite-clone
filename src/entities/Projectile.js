'use strict';
// ══════════════════════════════════════════════════════════════
//  Projectile.js — Viên đạn (pea) do Peashooter / SnowPea bắn ra
// ══════════════════════════════════════════════════════════════

class Projectile {
    // x, y: vị trí phát ra (đầu nòng súng)
    // row: hàng cây bắn ra — chỉ trúng zombie cùng hàng
    // isIce: true nếu là đạn băng của SnowPea
    constructor(x, y, row, isIce = false) {
        Object.assign(this, {
            x, y, row, isIce,
            speed: 8,                              // tốc độ bay (pixel/frame)
            dead: false,                           // true → bị xóa khỏi mảng
            animTime: Math.random() * Math.PI * 2, // offset ngẫu nhiên để xoay sprite
            damage: PLANT_DEFS.peashooter.peaDamage,
        });
    }

    update(dt) {
        // Bay sang phải
        this.x += this.speed * dt / 16.67;
        this.animTime += dt / 150;
        // Ra khỏi màn hình → đánh dấu xóa
        if (this.x > W + 30) this.dead = true;
    }

    draw(ctx) {
        // drawPea tự phân biệt đạn thường / đạn băng qua isIce
        drawPea(ctx, this.x, this.y, this.animTime, this.isIce);
    }
}
