'use strict';
// ══════════════════════════════════════════════════════════════
//  Peanut.js — Đậu Phộng (PvZ Fusion): Wall-nut + Peashooter
//  Cost: 150 ☀ | HP: 4000 | Cooldown: 30s
//
//  Đây là cây lai:
//    → HP 4000 như Wall-nut → zombie phải tốn nhiều thời gian ăn
//    → Bắn đạn nâu mỗi 2.2s → vẫn gây sát thương trong khi chặn
//
//  Khác với Wall-nut + Peashooter riêng lẻ:
//    → Tiết kiệm 1 ô so với dùng cả hai
//    → Bắn chậm hơn Peashooter (2.2s vs 1.5s)
//    → Mặt thay đổi theo máu (như Wall-nut)
// ══════════════════════════════════════════════════════════════

class Peanut extends Plant {
    constructor(col, row) {
        super('peanut', col, row);
        this.shootTimer = 0;
        this.shootAnim  = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.shootAnim = Math.max(0, this.shootAnim - dt / 300);
        this.shootTimer += dt;

        if (this.shootTimer >= PLANT_DEFS.peanut.fireRate) {
            if (game.zombies.some(z => z.row === this.row && !z.dying && z.x > this.cx)
             || game.tombs.some(t => !t.dead && t.row === this.row && t.cellX > this.cx)) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                // isBrown=true → drawPea vẽ màu nâu đất | pierce=true → xuyên qua mọi mục tiêu
                game.projectiles.push(
                    new Projectile(this.cx + 52, this.cy, this.row, false, false, true, false, PLANT_DEFS.peanut.pierce)
                );
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawPeanut(ctx, this.cx, this.cy, this.animTime, this.hpPct, this.shootAnim);
    }
}
