'use strict';
// ══════════════════════════════════════════════════════════════
//  PotatoMine.js — Mìn Khoai Tây: bẫy tiêu diệt zombie tức thì
//  Cost: 25 ☀ | HP: 300 | Cooldown: 30s
//
//  Vòng đời:
//    Unarmed (14s) → Armed → Exploding → biến mất
//
//  Bug fix: Zombie bắt đầu cắn khi dist < 58 (theo Zombie.findTarget),
//  nhưng check cũ chỉ trigger khi |dist| < 34 → zombie ăn hết HP mà
//  mìn không nổ. Fix bằng cách override takeDamage() khi armed.
//
//  Khi nổ: giết TẤT CẢ zombie trong cùng hàng và trong vùng ăn (dist -20..58)
// ══════════════════════════════════════════════════════════════

class PotatoMine extends Plant {
    constructor(col, row) {
        super('potatomine', col, row);
        this.armTimer      = 0;
        this.armed         = false;
        this.exploding     = false;
        this.explodeT      = 0;
        this._biteTriggered = false; // zombie cắn mìn đã armed → set true
    }

    // Override: khi đã armed, chặn sát thương và đánh dấu "đã bị cắn"
    // (takeDamage không có tham chiếu game, nên dùng cờ → xử lý ở update)
    takeDamage(amount) {
        if (this.armed && !this.exploding) {
            this._biteTriggered = true; // sẽ nổ ở update() frame tiếp
            return;                     // KHÔNG giảm HP khi armed
        }
        super.takeDamage(amount);       // unarmed → zombie có thể ăn bình thường
    }

    update(dt, game) {
        super.update(dt);

        if (this.exploding) {
            this.explodeT += dt / 600;
            if (this.explodeT >= 1) this.dead = true;
            return;
        }

        if (!this.armed) {
            this.armTimer += dt;
            if (this.armTimer >= PLANT_DEFS.potatomine.armMs) this.armed = true;
        } else {
            // Kiểm tra kích nổ:
            //   1. Zombie cắn mìn (takeDamage đã set cờ _biteTriggered)
            //   2. Zombie đi vào vùng ăn (dist -20..58, khớp với Zombie.findTarget)
            let shouldBoom = this._biteTriggered;
            if (!shouldBoom) {
                for (const z of game.zombies) {
                    if (!z.dying && z.row === this.row) {
                        const d = z.x - this.cx;
                        if (d > -20 && d < 58) { shouldBoom = true; break; }
                    }
                }
            }

            if (shouldBoom) {
                this._biteTriggered = false;
                // Nổ tất cả zombie trong cùng hàng và vùng ăn
                for (const z of game.zombies) {
                    if (!z.dying && z.row === this.row) {
                        const d = z.x - this.cx;
                        if (d > -20 && d < 58) {
                            const was = z.dying;
                            z.takeDamage(PLANT_DEFS.potatomine.blastDmg, game.particles);
                            if (!was && z.dying) game.zombiesKilled++;
                        }
                    }
                }
                spawnBigExplosionParticles(this.cx, this.cy - 5, game.particles);
                this.exploding = true;
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawPotatoMine(ctx, this.cx, this.cy, this.animTime, this.armed, this.exploding, this.explodeT);
    }
}
