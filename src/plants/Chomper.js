'use strict';
// ══════════════════════════════════════════════════════════════
//  Chomper.js — Cây cắn: ăn ngay 1 zombie, sau đó cần 38s tiêu hoá
//  Cost: 150 ☀ | HP: 150 (thấp — dễ bị ăn khi đang tiêu hoá!)
//
//  Vòng đời:
//    Ready → (zombie vào vùng chompRange) → Chomping (400ms animation)
//    → Recharging (38s tiêu hoá) → Ready
//
//  Lưu ý: trong khi Recharging, zombie vẫn có thể ăn Chomper bình thường.
//  Chiến thuật: đặt Chomper sau Wall-nut để bắt zombie đã ăn xong Wall-nut.
// ══════════════════════════════════════════════════════════════

class Chomper extends Plant {
    constructor(col, row) {
        super('chomper', col, row);
        this.chomping      = false;  // đang animation cắn
        this.chompT        = 0;      // tiến trình animation (0→1)
        this.recharging    = false;  // đang tiêu hoá, chưa cắn được
        this.rechargeTimer = 0;
    }

    update(dt, game) {
        super.update(dt);

        if (this.chomping) {
            // Animation cắn: 400ms
            this.chompT += dt / 400;
            if (this.chompT >= 1) {
                this.chomping   = false;
                this.chompT     = 0;
                this.recharging = true;
                this.rechargeTimer = 0;
            }
            return; // không làm gì khác trong khi đang cắn
        }

        if (this.recharging) {
            this.rechargeTimer += dt;
            if (this.rechargeTimer >= PLANT_DEFS.chomper.rechargeMs) {
                this.recharging = false;
                this.rechargeTimer = 0;
            }
            // Khi đang tiêu hoá → zombie vẫn có thể ăn cây (Plant.takeDamage chạy bình thường)
            return;
        }

        // Ready — tìm zombie trong vùng chompRange để cắn
        for (const z of game.zombies) {
            if (!z.dying && z.row === this.row) {
                const dist = z.x - this.cx; // dương = zombie bên phải
                if (dist > -20 && dist < PLANT_DEFS.chomper.chompRange) {
                    const was = z.dying;
                    z.takeDamage(99999, game.particles); // instakill
                    if (!was && z.dying) game.zombiesKilled++;
                    this.chomping = true;
                    this.chompT   = 0;
                    break; // chỉ cắn 1 zombie mỗi lần
                }
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        const rechargePct = this.recharging
            ? this.rechargeTimer / PLANT_DEFS.chomper.rechargeMs
            : 0;
        drawChomper(ctx, this.cx, this.cy, this.animTime,
                    this.chomping, this.chompT, this.recharging);
    }
}
