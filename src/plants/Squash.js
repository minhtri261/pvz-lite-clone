'use strict';
// ══════════════════════════════════════════════════════════════
//  Squash.js — Quả bí dùng cả thân hình để đè bẹp zombie
//  Cost: 50 ☀ | HP: 300 | Tầm phát hiện: 120px CẢ HAI BÊN | Hồi: 50s
//
//  Vòng đời (dùng 1 lần rồi biến mất, giống Cherry Bomb/Potato Mine):
//    idle (rình mục tiêu) → crouch (nén lò xo 250ms)
//      → air (nhảy vọt + bay tới đúng vị trí zombie, 450ms)
//      → impact (đè bẹp, gây 1800 dmg trong bán kính 80px quanh điểm rơi)
//      → biến mất
// ══════════════════════════════════════════════════════════════

class Squash extends Plant {
    constructor(col, row) {
        super('squash', col, row);
        this.phase    = 'idle';  // 'idle' | 'crouch' | 'air' | 'impact'
        this.phaseT   = 0;       // tiến trình phase hiện tại (0→1)
        this.target   = null;
        this.targetX  = null;    // điểm rơi — chốt lúc bắt đầu bay (phase 'air')
    }

    update(dt, game) {
        super.update(dt);
        const def = PLANT_DEFS.squash;

        if (this.phase === 'idle') {
            let best = null, bestDist = Infinity;
            for (const z of game.zombies) {
                if (z.dying || z.row !== this.row) continue;
                const dist = Math.abs(z.x - this.cx);
                if (dist <= def.detectRange && dist < bestDist) { bestDist = dist; best = z; }
            }
            if (best) {
                this.target  = best;
                this.phase   = 'crouch';
                this.phaseT  = 0;
            }
            return;
        }

        if (this.phase === 'crouch') {
            // Mục tiêu biến mất trước khi nhảy → hủy, quay lại rình
            if (!this.target || this.target.dying || this.target.isDead) {
                this.phase  = 'idle';
                this.target = null;
                return;
            }
            this.phaseT += dt / def.crouchMs;
            if (this.phaseT >= 1) {
                // Chốt điểm rơi ngay lúc bật nhảy — bay thẳng tới đó
                this.targetX = this.target.x;
                this.phase   = 'air';
                this.phaseT  = 0;
            }
            return;
        }

        if (this.phase === 'air') {
            this.phaseT += dt / def.airMs;
            if (this.phaseT >= 1) {
                this.phaseT = 1;
                this._land(game);
                this.phase  = 'impact';
                this.phaseT = 0;
            }
            return;
        }

        if (this.phase === 'impact') {
            this.phaseT += dt / def.impactMs;
            if (this.phaseT >= 1) this.dead = true;
        }
    }

    _land(game) {
        const def = PLANT_DEFS.squash;
        for (const z of game.zombies) {
            if (z.dying || z.row !== this.row) continue;
            if (Math.abs(z.x - this.targetX) > def.splashRange) continue;
            const was = z.dying;
            z.takeDamage(def.splashDmg, game.particles);
            if (!was && z.dying) game.zombiesKilled++;
        }
        spawnBigExplosionParticles(this.targetX, this.cy, game.particles);
    }

    draw(ctx) {
        const def = PLANT_DEFS.squash;
        let drawX = this.cx, elevation = 0;

        if (this.phase === 'air') {
            const ease = this.phaseT * this.phaseT * (3 - 2 * this.phaseT); // smoothstep
            drawX     = this.cx + (this.targetX - this.cx) * ease;
            elevation = Math.sin(Math.min(this.phaseT, 1) * Math.PI) * 70;
        } else if (this.phase === 'impact') {
            drawX = this.targetX;
        }

        this.drawHitFlash(ctx);
        drawSquash(ctx, drawX, this.cy, this.animTime, this.phase, this.phaseT, elevation);
    }
}
