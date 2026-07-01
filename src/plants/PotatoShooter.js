'use strict';
// ══════════════════════════════════════════════════════════════
//  PotatoShooter.js — Đậu Khoai (PeaShooter + PotatoMine fusion)
//
//  Hai chức năng:
//    1. Bắn đạn nâu (20 dmg) ngay từ đầu
//    2. Dome nổi lên ngay khi kết hợp (không còn trạng thái ngủ dưới
//       đất) → zombie dẫm lên là nổ 1800 damage ngay
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
        this.armed           = true; // nổi dome lên ngay khi kết hợp, không còn trạng thái ngủ dưới đất
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
            if (this.hasTargetInRow(game, { includeTombs: false })) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                // isBrown = true → đạn màu nâu đất
                game.projectiles.push(
                    new Projectile(this.cx + 38, this.cy + 8, this.row, false, false, true)
                );
            }
        }

        // ── Mine explosion animation ───────────────────────────
        if (this.exploding) {
            this.explodeT += dt / 600;
            if (this.explodeT >= 1) this.dead = true;
            return;
        }

        // ── Mine đã nổi dome ngay từ đầu — chỉ chờ zombie dẫm lên ──
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

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawPotatoShooter(ctx, this.cx, this.cy, this.animTime,
                          this.armed, this.exploding, this.explodeT, this.shootAnim);
    }
}
