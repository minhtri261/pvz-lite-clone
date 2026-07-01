'use strict';
// ══════════════════════════════════════════════════════════════
//  FumeShroom.js — Nấm Khói Tím: bắn 3 bong bóng xuyên, tầm 4 ô
//  Cost: 75☀ | HP: 200 | Dmg: 20/bong (= PuffShroom)
//
//  Đặc điểm:
//    - Tầm bắn 4 ô (320px) — xa hơn PuffShroom (3 ô)
//    - Bắn 3 bong bóng tím cùng lúc, xuyên qua mọi zombie
//    - Đạn biến mất khi đến hết 4 ô (không đi tiếp)
//    - Có thể xếp chồng 2 con cùng ô (SHROOM_TYPES)
// ══════════════════════════════════════════════════════════════

class FumeShroom extends Plant {
    constructor(col, row) {
        super('fumeshroom', col, row);
        this.shootTimer = 0;
        this.shootAnim  = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.shootAnim = Math.max(0, this.shootAnim - dt / 300);
        this.shootTimer += dt;

        if (this.shootTimer >= PLANT_DEFS.fumeshroom.fireRate) {
            if (this.hasTargetInRow(game, { maxRange: PLANT_DEFS.fumeshroom.range, includeTombs: false })) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                const sx       = this.cx + 40;
                const maxRange = PLANT_DEFS.fumeshroom.range;
                // 1 chuỗi bong bóng ooooo xuyên qua zombie
                game.projectiles.push(new Projectile(sx, this.cy + 3, this.row, false, false, false, false, true, maxRange, true));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawFumeShroom(ctx, this.cx, this.cy, this.animTime, this.shootAnim, this.stackCount);
    }
}
