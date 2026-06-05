'use strict';
// ══════════════════════════════════════════════════════════════
//  MineNut.js — Hạt Mìn (WallNut + PotatoMine fusion)
//  HP: 4000 (WallNut) — NHƯNG khi hết máu sẽ PHÁT NỔ rồi mới chết!
//
//  Vòng đời:
//    Đặt xuống → chặn zombie bình thường (HP cao như WallNut)
//    HP về 0 → KÍCh NỔ (1800 dmg, 2 ô range, cùng hàng)
//    Animation nổ 800ms → cây biến mất
//
//  Chiến thuật: đặt ở cột gần zombie lane để vừa chặn vừa bẫy
// ══════════════════════════════════════════════════════════════

class MineNut extends Plant {
    constructor(col, row) {
        super('minenut', col, row);
        this._shouldExplode = false;
        this._exploding     = false;
        this._explodeT      = 0;
    }

    // Override: khi HP ≤ 0, không chết ngay — trigger explosion
    takeDamage(amount) {
        this.hp -= amount;
        this.hitFlash = 0.15;
        if (this.hp <= 0 && !this._exploding && !this._shouldExplode) {
            this.hp             = 0;
            this._shouldExplode = true;
            // Không set dead = true ở đây
        }
    }

    update(dt, game) {
        // Cập nhật hitFlash + animTime từ lớp cha (không gọi takeDamage)
        this.animTime += dt / 1000;
        if (this.hitFlash > 0) this.hitFlash -= dt / 1000;

        // Phase: đang animation nổ
        if (this._exploding) {
            this._explodeT += dt / 800;
            if (this._explodeT >= 1) this.dead = true;
            return;
        }

        // Phase: cần kích nổ ngay bây giờ
        if (this._shouldExplode) {
            this._shouldExplode = false;
            this._exploding     = true;

            // Gây sát thương zombie cùng hàng trong phạm vi 2 ô
            for (const z of game.zombies) {
                if (z.dying || z.row !== this.row) continue;
                if (Math.abs(z.x - this.cx) > PLANT_DEFS.minenut.blastRange) continue;
                const was = z.dying;
                z.takeDamage(PLANT_DEFS.minenut.blastDmg, game.particles);
                if (!was && z.dying) game.zombiesKilled++;
            }
            spawnBigExplosionParticles(this.cx, this.cy - 10, game.particles);
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawMineNut(ctx, this.cx, this.cy, this.animTime,
                    this.hpPct, this._exploding, this._explodeT);
    }
}
