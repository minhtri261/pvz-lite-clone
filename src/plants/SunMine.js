'use strict';
// ══════════════════════════════════════════════════════════════
//  SunMine.js — Mìn Mặt Trời (SunFlower + PotatoMine fusion)
//
//  Hai chức năng độc lập:
//    1. Sản xuất sun mỗi 23s (như Sunflower, bắt đầu ngay lập tức)
//    2. Sau 14s kích hoạt: zombie dẫm lên → nổ 1800 damage
//
//  Khi nổ: cây biến mất (không còn tạo sun nữa)
//  Ban đêm: sun production chậm 2× (46s/cycle)
//
//  Chiến thuật: đặt ở cột gần nhà để vừa tạo sun vừa bẫy zombie
// ══════════════════════════════════════════════════════════════

class SunMine extends Plant {
    constructor(col, row) {
        super('sunmine', col, row);
        this.sunTimer        = 0;
        this.producePulse    = 0;
        this.armTimer        = 0;
        this.armed           = false;
        this.exploding       = false;
        this.explodeT        = 0;
        this._biteTriggered  = false;
    }

    // Khi armed + zombie cắn → đánh dấu nổ thay vì nhận sát thương
    takeDamage(amount) {
        if (this.armed && !this.exploding) { this._biteTriggered = true; return; }
        super.takeDamage(amount);
    }

    update(dt, game) {
        super.update(dt);

        // ── Sản xuất sun (hoạt động ngay, không cần arm) ──────
        this.sunTimer    += dt;
        this.producePulse = Math.max(0, this.producePulse - dt / 1000);
        const sunIv = PLANT_DEFS.sunmine.sunInterval * (game.levelDef?.isNight ? 2 : 1);
        if (this.sunTimer >= sunIv) {
            this.sunTimer    = 0;
            this.producePulse = 0.5;
            game.suns.push(new Sun(this.cx + randFloat(-28, 28), this.cy - 55, false, PLANT_DEFS.sunmine.sunAmount));
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
            if (this.armTimer >= PLANT_DEFS.sunmine.armMs) this.armed = true;
        } else {
            // Zombie cắn hoặc bước vào vùng (dist -20..58)
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
                            z.takeDamage(PLANT_DEFS.sunmine.blastDmg, game.particles);
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
        drawSunMine(ctx, this.cx, this.cy, this.animTime,
                    this.armed, this.exploding, this.explodeT,
                    this.producePulse > 0);
    }
}
