'use strict';
// ══════════════════════════════════════════════════════════════
//  ConeheadZombie.js — Zombie đội nón giao thông
//  HP tổng: 560 = 360 (nón) + 200 (cơ thể)
//
//  Cơ chế giáp:
//    Sát thương trừ vào coneHp trước.
//    Khi coneHp ≤ 0 → nón vỡ (animation ~500ms), phần sát thương thừa
//    trừ vào HP cơ thể. Sau khi mất nón: maxHp = 200, hành xử như BasicZombie.
//
//  Biến dạng nón theo 3 mốc % máu nón còn lại (xem drawConeheadZombie.js):
//    > 60% nguyên | 30-60% méo nhẹ/nứt | ≤ 30% bẹp/gãy gập nặng
// ══════════════════════════════════════════════════════════════

class ConeheadZombie extends Zombie {
    constructor(row) {
        super('conehead', row);
        this.coneHp      = ZOMBIE_DEFS.conehead.coneHp; // 360
        this.hasCone      = true;
        this.coneBreaking = false; // đang chơi animation vỡ nón
        this.coneBreakT   = 0;     // tiến trình animation vỡ (0→1)
    }

    // Override để xử lý hệ thống giáp 2 lớp (nón → cơ thể)
    takeDamage(amount, particles) {
        const hadCone = this.hasCone;
        this._takeArmoredDamage(amount, particles, 'coneHp', 'hasCone');
        if (hadCone && !this.hasCone) {
            this.coneBreaking = true;
            this.coneBreakT   = 0;
            spawnConeBreakParticles(this.x, this.y, particles || []);
        }
    }

    update(dt, plants) {
        super.update(dt, plants);
        if (this.coneBreaking) {
            this.coneBreakT += dt / 500; // animation vỡ nón ~500ms
            if (this.coneBreakT >= 1) this.coneBreaking = false;
        }
    }

    get render() {
        if (this.coneBreaking) {
            return { drawHatFn: (ctx, hy) => _drawConeBreaking(ctx, hy, this.coneBreakT) };
        }
        if (!this.hasCone) return {};
        const pct = Math.max(0, this.coneHp / ZOMBIE_DEFS.conehead.coneHp);
        return { drawHatFn: (ctx, hy, animTime, state) => _drawConeHat(ctx, hy, animTime, state, pct) };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
