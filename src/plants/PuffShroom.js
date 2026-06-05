'use strict';
// ══════════════════════════════════════════════════════════════
//  PuffShroom.js — Nấm Bào Tử: miễn phí ban đêm, bắn 3 ô
//  Cost: 75☀ (ban ngày) | 0☀ FREE (ban đêm) | HP: 200
//
//  Đặc điểm:
//    - Tầm bắn giới hạn 3 ô (240px) trước mặt
//    - Ban đêm: miễn phí hoàn toàn — đặt thoải mái!
//    - Ban ngày: phải trả 75☀ như cây thông thường
//    - Sát thương bằng Peashooter (20/viên bào tử)
//
//  Chiến thuật màn 11-12:
//    Đặt Puff-shroom ở cột 7-8 (cột cuối) để bắn zombie từ xa
//    đến gần. Rẻ ở ban đêm → đặt thành "tường bắn" nhiều cột.
// ══════════════════════════════════════════════════════════════

class PuffShroom extends Plant {
    constructor(col, row) {
        super('puffshroom', col, row);
        this.shootTimer = 0;
        this.shootAnim  = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.shootAnim = Math.max(0, this.shootAnim - dt / 300);
        this.shootTimer += dt;

        if (this.shootTimer >= PLANT_DEFS.puffshroom.fireRate) {
            // Chỉ bắn zombie trong tầm 3 ô (range = 240px)
            const hasTarget = game.zombies.some(z =>
                z.row === this.row &&
                !z.dying &&
                z.x > this.cx &&
                (z.x - this.cx) <= PLANT_DEFS.puffshroom.range
            );
            if (hasTarget) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                game.projectiles.push(new Projectile(this.cx + 36, this.cy + 3, this.row, false, false, false, true));
                if (this.stackCount === 2)
                    game.projectiles.push(new Projectile(this.cx + 36, this.cy - 6, this.row, false, false, false, true));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawPuffShroom(ctx, this.cx, this.cy, this.animTime, this.shootAnim, this.stackCount);
    }
}
