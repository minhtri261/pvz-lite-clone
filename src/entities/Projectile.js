'use strict';
// ══════════════════════════════════════════════════════════════
//  Projectile.js — Viên đạn do các cây bắn ra
//  Các loại đạn:
//    isIce=true  → đạn băng xanh (SnowPea) — làm chậm zombie
//    isYellow=true → đạn vàng (Sun-Shooter) — không có hiệu ứng đặc biệt
//    cả hai false → đạn xanh lá (Peashooter, Repeater)
// ══════════════════════════════════════════════════════════════

class Projectile {
    constructor(x, y, row, isIce = false, isYellow = false) {
        Object.assign(this, {
            x, y, row, isIce, isYellow,
            speed: 8,
            dead: false,
            animTime: Math.random() * Math.PI * 2,
            damage: PLANT_DEFS.peashooter.peaDamage,
        });
    }

    update(dt) {
        this.x += this.speed * dt / 16.67;
        this.animTime += dt / 150;
        if (this.x > W + 30) this.dead = true;
    }

    draw(ctx) {
        drawPea(ctx, this.x, this.y, this.animTime, this.isIce, this.isYellow);
    }
}
