'use strict';
// ══════════════════════════════════════════════════════════════
//  GraveBuster.js — Grave Buster: khoan phá lăng mộ
//  Cost: 0 ☀ | HP: 300 | Recharge: 10s
//
//  Chỉ có thể đặt lên ô đang có lăng mộ (xem Game._tryPlace).
//  Sau 3 giây khoan rễ, lăng mộ bị phá huỷ và Grave Buster biến
//  mất theo. Nếu bị zombie ăn hết HP trước khi hoàn thành (3s),
//  lăng mộ sẽ KHÔNG bị phá.
// ══════════════════════════════════════════════════════════════

class GraveBuster extends Plant {
    constructor(col, row) {
        super('gravebuster', col, row);
        this.timer = 0; // thời gian đã khoan (ms)
    }

    update(dt, game) {
        super.update(dt);
        if (this.dead) return; // đã bị ăn mất giữa chừng → không phá mộ được nữa

        const tomb = game.tombs.find(t => !t.dead && t.col === this.col && t.row === this.row);
        if (!tomb) { this.dead = true; return; } // mộ đã không còn → tự rút lui

        const def = PLANT_DEFS.gravebuster;
        this.timer += dt;

        // Rễ khoan rung lắc lăng mộ — càng gần hoàn thành càng mạnh
        tomb.shakeIntensity = (this.timer / def.bustMs) * 3;

        // Bụi cát bật lên liên tục khi đang khoan
        if (Math.random() < 0.3) {
            spawnGraveDustParticles(this.cx + (Math.random() - 0.5) * 12, this.cy + 16, game.particles);
        }

        if (this.timer >= def.bustMs) {
            tomb.shakeIntensity = 0;
            tomb.hp = 0;
            tomb.dead = true;
            spawnGraveDebrisParticles(tomb.cellX, tomb.cellY, game.particles);
            this.dead = true; // hoàn thành nhiệm vụ → biến mất cùng lăng mộ
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        const progress = Math.min(1, this.timer / PLANT_DEFS.gravebuster.bustMs);
        drawGraveBuster(ctx, this.cx, this.cy, this.animTime, progress);
    }
}
