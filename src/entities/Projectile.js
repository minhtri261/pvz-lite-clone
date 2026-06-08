'use strict';
// ══════════════════════════════════════════════════════════════
//  Projectile.js — Viên đạn do các cây bắn ra
//  isIce=true    → băng xanh (SnowPea) — làm chậm zombie
//  isYellow=true → vàng cam (Sun-Shooter)
//  isBrown=true  → nâu đất (Peanut)
//  isSpore=true  → tím bào tử (Puff-shroom)
//  tất cả false  → xanh lá (Peashooter, Repeater)
// ══════════════════════════════════════════════════════════════

class Projectile {
    constructor(x, y, row, isIce = false, isYellow = false, isBrown = false, isSpore = false, pierce = false) {
        Object.assign(this, {
            x, y, row, isIce, isYellow, isBrown, isSpore, pierce,
            speed:    8,
            dead:     false,
            animTime: Math.random() * Math.PI * 2,
            damage:   PLANT_DEFS.peashooter.peaDamage,
            hitTargets: pierce ? new Set() : null, // tránh trúng lại cùng 1 mục tiêu khi xuyên
        });
    }

    update(dt) {
        this.x += this.speed * dt / 16.67;
        this.animTime += dt / 150;
        if (this.x > W + 30) this.dead = true;
    }

    draw(ctx) {
        drawPea(ctx, this.x, this.y, this.animTime,
                this.isIce, this.isYellow, this.isBrown, this.isSpore);
    }
}
