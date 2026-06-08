'use strict';
// ══════════════════════════════════════════════════════════════
//  SnowPea.js — Đậu Băng: bắn đạn băng làm chậm zombie
//  Cost: 175 ☀ | HP: 300 | Bắn mỗi 1.5s | Damage: 20/viên
//
//  Giống Peashooter nhưng:
//    - Đạn màu xanh băng (isIce = true)
//    - Zombie trúng đạn bị chậm 50% trong 3 giây (slowTimer)
//    - Hiệu ứng xanh băng xuất hiện trên zombie đang bị chậm
// ══════════════════════════════════════════════════════════════

class SnowPea extends Plant {
    constructor(col, row) {
        super('snowpea', col, row);
        this.shootTimer = 0;
        this.shootAnim  = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.shootAnim = Math.max(0, this.shootAnim - dt / 300);
        this.shootTimer += dt;

        if (this.shootTimer >= PLANT_DEFS.snowpea.fireRate) {
            const hasTarget = game.zombies.some(z => z.row === this.row && !z.dying && z.x > this.cx)
                           || game.tombs.some(t => !t.dead && t.row === this.row && t.cellX > this.cx);
            if (hasTarget) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                // isIce = true → khi trúng zombie, Game.js sẽ set z.slowed = true
                game.projectiles.push(new Projectile(this.cx + 45, this.cy - 8, this.row, true));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawSnowPea(ctx, this.cx, this.cy, this.animTime, this.shootAnim);
    }
}
