'use strict';
// ══════════════════════════════════════════════════════════════
//  PeaFume.js — Nấm Khói Xanh Lá (FumeShroom + Peashooter fusion)
//  Giống hệt FumeShroom nhưng đổi sang màu xanh lá, đạn ooooo xanh lá,
//  sát thương tăng lên 50/bong.
// ══════════════════════════════════════════════════════════════

class PeaFume extends Plant {
    constructor(col, row) {
        super('peafume', col, row);
        this.shootTimer = 0;
        this.shootAnim  = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.shootAnim = Math.max(0, this.shootAnim - dt / 300);
        this.shootTimer += dt;

        if (this.shootTimer >= PLANT_DEFS.peafume.fireRate) {
            if (this.hasTargetInRow(game, { maxRange: PLANT_DEFS.peafume.range, includeTombs: false })) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                const sx       = this.cx + 40;
                const maxRange = PLANT_DEFS.peafume.range;
                game.projectiles.push(new Projectile(sx, this.cy + 3, this.row, false, false, false, false, true, maxRange, true, PLANT_DEFS.peafume.peaDamage, 'green'));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawFumeShroom(ctx, this.cx, this.cy, this.animTime, this.shootAnim, this.stackCount, 'green');
    }
}
