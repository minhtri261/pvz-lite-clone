'use strict';
// ══════════════════════════════════════════════════════════════
//  IceFumeShooter.js — Nấm Khói Băng Tối Thượng
//  Fusion: IceFume + Peashooter  HOẶC  PeaFume + IceLettuce
//  Kết hợp cả 2 ưu điểm: sát thương 50/bong (như PeaFume) + làm chậm
//  toàn bộ zombie trúng chuỗi đạn xuyên (như IceFume). Tạo hình
//  FumeShroom với tông màu lục lam (cyan) + gai băng quanh mũ nấm.
// ══════════════════════════════════════════════════════════════

class IceFumeShooter extends Plant {
    constructor(col, row) {
        super('icefumeshooter', col, row);
        this.shootTimer = 0;
        this.shootAnim  = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.shootAnim = Math.max(0, this.shootAnim - dt / 300);
        this.shootTimer += dt;

        if (this.shootTimer >= PLANT_DEFS.icefumeshooter.fireRate) {
            if (this.hasTargetInRow(game, { maxRange: PLANT_DEFS.icefumeshooter.range, includeTombs: false })) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                const sx       = this.cx + 40;
                const maxRange = PLANT_DEFS.icefumeshooter.range;
                game.projectiles.push(new Projectile(sx, this.cy + 3, this.row, true, false, false, false, true, maxRange, true, PLANT_DEFS.icefumeshooter.peaDamage, 'cyan'));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawFumeShroom(ctx, this.cx, this.cy, this.animTime, this.shootAnim, this.stackCount, 'cyan');
    }
}
