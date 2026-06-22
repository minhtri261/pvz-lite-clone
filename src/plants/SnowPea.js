'use strict';
// ══════════════════════════════════════════════════════════════
//  SnowPea.js — Đậu Băng: bắn đạn băng làm chậm zombie
//  Fusion: Peashooter + Ice Lettuce | HP: 300 | Bắn mỗi 1.5s | Damage: 20/viên
//
//  Giống Peashooter nhưng:
//    - Đạn màu xanh băng (isIce = true)
//    - Zombie trúng đạn bị dính hiệu ứng làm lạnh (chillTimer) — chậm 50%
//      tốc độ đi và 50% tốc độ ăn, dùng chung cơ chế với Ice Lettuce
//    - Hiệu ứng xanh dương nhạt xuất hiện trên zombie đang bị làm lạnh
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
            if (this.hasTargetInRow(game)) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                // isIce = true → khi trúng zombie, Game.js sẽ gọi z.applyChill(...)
                game.projectiles.push(new Projectile(this.cx + 45, this.cy - 8, this.row, true));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawSnowPea(ctx, this.cx, this.cy, this.animTime, this.shootAnim);
    }
}
