'use strict';
// ══════════════════════════════════════════════════════════════
//  Peashooter.js — Đậu Bắn: bắn đạn xanh về phía zombie
//  Cost: 100 ☀ | HP: 300 | Bắn mỗi 1.5s | Damage: 20/viên
//  Chỉ bắn khi có zombie ở cùng hàng VÀ phía trước (x > this.cx)
// ══════════════════════════════════════════════════════════════

class Peashooter extends Plant {
    constructor(col, row) {
        super('peashooter', col, row);
        this.shootTimer = 0; // đếm thời gian từ lần bắn trước
        this.shootAnim  = 0; // > 0 khi đang animation giật nòng (0→1→0)
    }

    update(dt, game) {
        super.update(dt);
        // Giảm animation giật nòng về 0
        this.shootAnim = Math.max(0, this.shootAnim - dt / 300);
        this.shootTimer += dt;

        if (this.shootTimer >= PLANT_DEFS.peashooter.fireRate) {
            // Chỉ bắn nếu có zombie sống ở cùng hàng phía bên phải
            const hasTarget = game.zombies.some(z => z.row === this.row && !z.dying && z.x > this.cx)
                           || game.tombs.some(t => !t.dead && t.row === this.row && t.cellX > this.cx);
            if (hasTarget) {
                this.shootTimer = 0;
                this.shootAnim  = 1; // kích hoạt animation giật nòng
                // Tạo viên đạn xuất phát từ đầu nòng (+45px từ tâm cây, -8px lên trên)
                game.projectiles.push(new Projectile(this.cx + 45, this.cy - 8, this.row, false));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawPeashooter(ctx, this.cx, this.cy, this.animTime, this.shootAnim);
    }
}
