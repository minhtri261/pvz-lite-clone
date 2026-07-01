'use strict';
// ══════════════════════════════════════════════════════════════
//  IceFume.js — Nấm Khói Xanh Dương (FumeShroom + IceLettuce fusion)
//  Giống hệt FumeShroom nhưng đổi sang màu xanh dương, đạn ooooo xanh
//  dương. Đạn xuyên (pierce) + isIce → mọi zombie trúng chuỗi đạn đều
//  bị làm chậm (xem nhánh pierce trong Game.js áp applyChill cho từng
//  mục tiêu bị trúng).
// ══════════════════════════════════════════════════════════════

class IceFume extends Plant {
    constructor(col, row) {
        super('icefume', col, row);
        this.shootTimer = 0;
        this.shootAnim  = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.shootAnim = Math.max(0, this.shootAnim - dt / 300);
        this.shootTimer += dt;

        if (this.shootTimer >= PLANT_DEFS.icefume.fireRate) {
            if (this.hasTargetInRow(game, { maxRange: PLANT_DEFS.icefume.range, includeTombs: false })) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                const sx       = this.cx + 40;
                const maxRange = PLANT_DEFS.icefume.range;
                game.projectiles.push(new Projectile(sx, this.cy + 3, this.row, true, false, false, false, true, maxRange, true, PLANT_DEFS.icefume.peaDamage, 'blue'));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawFumeShroom(ctx, this.cx, this.cy, this.animTime, this.shootAnim, this.stackCount, 'blue');
    }
}
