'use strict';
// ══════════════════════════════════════════════════════════════
//  BonkChoy.js — Võ sĩ quyền anh dưới hình dạng cây cải thìa
//  Cost: 100 ☀ | HP: 300 | Tầm đấm: 120px CẢ HAI BÊN (-120..+120)
//
//  Cơ chế:
//    - Tìm zombie gần nhất (trái HOẶC phải) trong tầm 120px, cùng hàng
//    - Tung cú đấm liên tục, đổi tay trái/phải mỗi 100ms (combo nhanh)
//    - Mỗi cú đấm gây 50 dmg, chỉ nhắm 1 mục tiêu duy nhất tại 1 thời điểm
//    - Mục tiêu chết/ra khỏi tầm → tự tìm mục tiêu gần nhất khác
// ══════════════════════════════════════════════════════════════

class BonkChoy extends Plant {
    constructor(col, row) {
        super('bonkchoy', col, row);
        this.target    = null;
        this.facing    = 1;   // 1 = đấm sang phải, -1 = đấm sang trái
        this.punchT    = 0;   // tiến trình cú đấm hiện tại (0→1)
        this.punchSide = -1;  // tay đang đấm: -1 = trái, 1 = phải
        this._damageDone = false;
    }

    update(dt, game) {
        super.update(dt);
        const def = PLANT_DEFS.bonkchoy;

        // Mục tiêu hiện tại không còn hợp lệ → bỏ
        if (this.target && (this.target.dying || this.target.isDead ||
            this.target.row !== this.row || Math.abs(this.target.x - this.cx) > def.punchRange)) {
            this.target = null;
        }

        // Chưa có mục tiêu → tìm zombie gần nhất (2 bên)
        if (!this.target) {
            let best = null, bestDist = Infinity;
            for (const z of game.zombies) {
                if (z.dying || z.row !== this.row) continue;
                const dist = Math.abs(z.x - this.cx);
                if (dist <= def.punchRange && dist < bestDist) { bestDist = dist; best = z; }
            }
            this.target = best;
        }

        if (!this.target) {
            this.punchT = 0;
            return;
        }

        this.facing = this.target.x >= this.cx ? 1 : -1;
        this.punchT += dt / def.punchInterval;

        // Gây sát thương ở đỉnh cú đấm (50% animation)
        if (!this._damageDone && this.punchT >= 0.5) {
            this._damageDone = true;
            if (!this.target.dying) {
                const was = this.target.dying;
                this.target.takeDamage(def.punchDmg, game.particles);
                if (!was && this.target.dying) game.zombiesKilled++;
            }
        }

        // Hết 1 cú đấm → đổi tay, bắt đầu cú tiếp theo ngay (combo liên tục)
        if (this.punchT >= 1) {
            this.punchT      = 0;
            this._damageDone = false;
            this.punchSide   *= -1;
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        const punching = !!this.target;
        drawBonkChoy(ctx, this.cx, this.cy, this.animTime, punching, this.punchT, this.punchSide, this.facing);
    }
}
