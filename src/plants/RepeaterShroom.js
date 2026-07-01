'use strict';
// ══════════════════════════════════════════════════════════════
//  RepeaterShroom.js — Nấm Liên Đạn (PeaShroom + PeaShooter fusion)
//  Bắn burst 2 viên mỗi lượt như Repeater, nhưng là nấm nên có thể
//  xếp chồng 2 con cùng ô (giống các Shroom khác) — khi xếp chồng,
//  mỗi viên trong burst được bắn nhân đôi (4 viên/lượt).
// ══════════════════════════════════════════════════════════════

class RepeaterShroom extends Plant {
    constructor(col, row) {
        super('repeatershroom', col, row);
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
                if (this.hasTargetInRow(game, { includeTombs: false })) {
                    this.shootAnim2 = 1;
                    game.projectiles.push(new Projectile(this.cx + 36, this.cy + 5, this.row, false));
                    if (this.stackCount === 2)
                        game.projectiles.push(new Projectile(this.cx + 36, this.cy - 4, this.row, false));
                }
                this._burst = 0;
            }
            return;
        }

        // Pha 1: bắn viên đầu tiên
        this.shootTimer += dt;
        if (this.shootTimer >= PLANT_DEFS.repeatershroom.fireRate) {
            if (this.hasTargetInRow(game, { includeTombs: false })) {
                this.shootTimer  = 0;
                this.shootAnim1  = 1;
                game.projectiles.push(new Projectile(this.cx + 36, this.cy - 3, this.row, false));
                if (this.stackCount === 2)
                    game.projectiles.push(new Projectile(this.cx + 36, this.cy - 12, this.row, false));
                // Lên lịch viên thứ 2
                this._burst      = 1;
                this._burstTimer = PLANT_DEFS.repeatershroom.burstDelay;
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawRepeaterShroom(ctx, this.cx, this.cy, this.animTime, this.shootAnim1, this.shootAnim2, this.stackCount);
    }
}
