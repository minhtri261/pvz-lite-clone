'use strict';
// ══════════════════════════════════════════════════════════════
//  Repeater.js — Bắn 2 viên đạn liên tiếp mỗi lần (burst)
//  Cost: 200 ☀ | HP: 300 | Cooldown: 7.5s
//
//  Cơ chế burst:
//    1. Phát hiện zombie → bắn viên 1 (nòng trên, shootAnim1)
//    2. Đợi burstDelay (150ms) → bắn viên 2 (nòng dưới, shootAnim2)
//    3. Chờ fireRate (1500ms) cho burst tiếp theo
//
//  DPS: 2 × 20 dmg / 1.5s ≈ 26 dmg/s (so với Peashooter: 13 dmg/s)
// ══════════════════════════════════════════════════════════════

class Repeater extends Plant {
    constructor(col, row) {
        super('repeater', col, row);
        this.shootTimer  = 0;
        this.shootAnim1  = 0;  // giật nòng trên
        this.shootAnim2  = 0;  // giật nòng dưới
        this._burst      = 0;  // 0=chờ, 1=đã bắn viên 1, chờ viên 2
        this._burstTimer = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.shootAnim1 = Math.max(0, this.shootAnim1 - dt / 250);
        this.shootAnim2 = Math.max(0, this.shootAnim2 - dt / 250);

        // Pha 2: đợi rồi bắn viên thứ 2
        if (this._burst === 1) {
            this._burstTimer -= dt;
            if (this._burstTimer <= 0) {
                if (game.zombies.some(z => z.row === this.row && !z.dying && z.x > this.cx)) {
                    this.shootAnim2 = 1;
                    game.projectiles.push(new Projectile(this.cx + 42, this.cy - 2, this.row, false, false));
                }
                this._burst = 0;
            }
            return;
        }

        // Pha 1: bắn viên đầu tiên
        this.shootTimer += dt;
        if (this.shootTimer >= PLANT_DEFS.repeater.fireRate) {
            if (game.zombies.some(z => z.row === this.row && !z.dying && z.x > this.cx)) {
                this.shootTimer  = 0;
                this.shootAnim1  = 1;
                game.projectiles.push(new Projectile(this.cx + 42, this.cy - 10, this.row, false, false));
                // Lên lịch viên thứ 2
                this._burst      = 1;
                this._burstTimer = PLANT_DEFS.repeater.burstDelay;
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawRepeater(ctx, this.cx, this.cy, this.animTime, this.shootAnim1, this.shootAnim2);
    }
}
