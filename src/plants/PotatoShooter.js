'use strict';
// ══════════════════════════════════════════════════════════════
//  PotatoShooter.js — Đậu Khoai (PeaShooter + PotatoMine fusion)
//
//  Hai chức năng:
//    1. Bắn đạn nâu (20 dmg) ngay từ đầu — không cần arm
//    2. Sau 14s kích hoạt: zombie dẫm lên → nổ 1800 damage
//
//  Khi nổ: cây biến mất (không còn bắn nữa)
//  Đạn màu nâu (isBrown = true), tầm bắn không giới hạn
//
//  Chiến thuật: đặt ở cột cuối — bắn từ xa, bẫy zombie gần nhà
// ══════════════════════════════════════════════════════════════

class PotatoShooter extends Plant {
    constructor(col, row) {
        super('potatoshooter', col, row);
        this.shootTimer      = 0;
        this.shootAnim       = 0;
        this.armTimer        = 0;
        this.armed           = false;
        this.exploding       = false;
        this.explodeT        = 0;
        this._biteTriggered  = false;
    }

    takeDamage(amount) {
        if (this.armed && !this.exploding) { this._biteTriggered = true; return; }
        super.takeDamage(amount);
    }

    update(dt, game) {
        super.update(dt);
        this.shootAnim = Math.max(0, this.shootAnim - dt / 300);

        // ── Bắn đạn nâu (bắt đầu ngay, không cần arm) ────────
        this.shootTimer += dt;
        if (this.shootTimer >= PLANT_DEFS.potatoshooter.fireRate) {
            if (game.zombies.some(z => z.row === this.row && !z.dying && z.x > this.cx)) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                // isBrown = true → đạn màu nâu đất
                const projY = this.armed ? this.cy + 8 : this.cy + 14;
                game.projectiles.push(
                    new Projectile(this.cx + 38, projY, this.row, false, false, true)
                );
            }
        }

        // ── Mine explosion animation ───────────────────────────
        if (this.exploding) {
            this.explodeT += dt / 600;
            if (this.explodeT >= 1) this.dead = true;
            return;
        }

        // ── Kích hoạt mine ─────────────────────────────────────
        if (!this.armed) {
            this.armTimer += dt;
            if (this.armTimer >= PLANT_DEFS.potatoshooter.armMs) this.armed = true;
        } else {
            let boom = this._biteTriggered;
            if (!boom) {
                for (const z of game.zombies) {
                    if (!z.dying && z.row === this.row) {
                        const d = z.x - this.cx;
                        if (d > -20 && d < 58) { boom = true; break; }
                    }
                }
            }
            if (boom) {
                this._biteTriggered = false;
                for (const z of game.zombies) {
                    if (!z.dying && z.row === this.row) {
                        const d = z.x - this.cx;
                        if (d > -20 && d < 58) {
                            const was = z.dying;
                            z.takeDamage(PLANT_DEFS.potatoshooter.blastDmg, game.particles);
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
        drawPotatoShooter(ctx, this.cx, this.cy, this.animTime,
                          this.armed, this.exploding, this.explodeT, this.shootAnim);
    }
}
