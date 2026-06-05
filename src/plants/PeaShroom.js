'use strict';
// ══════════════════════════════════════════════════════════════
//  PeaShroom.js — Nấm Đậu (PuffShroom + PeaShooter fusion)
//  Bắn đạn xanh toàn hàng như PeaShooter, nhưng là nấm nên có thể xếp chồng 2.
//  HP: 200 | Tầm: toàn hàng | Damage: 20/viên | FireRate: 1500ms
// ══════════════════════════════════════════════════════════════

class PeaShroom extends Plant {
    constructor(col, row) {
        super('peashroom', col, row);
        this.shootTimer = 0;
        this.shootAnim  = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.shootAnim = Math.max(0, this.shootAnim - dt / 300);
        this.shootTimer += dt;

        if (this.shootTimer >= PLANT_DEFS.peashroom.fireRate) {
            const hasTarget = game.zombies.some(
                z => z.row === this.row && !z.dying && z.x > this.cx
            );
            if (hasTarget) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                game.projectiles.push(new Projectile(this.cx + 36, this.cy + 3, this.row, false));
                if (this.stackCount === 2)
                    game.projectiles.push(new Projectile(this.cx + 36, this.cy - 6, this.row, false));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawPeaShroom(ctx, this.cx, this.cy, this.animTime, this.shootAnim, this.stackCount);
    }
}
