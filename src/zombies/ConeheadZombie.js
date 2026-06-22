'use strict';
// ══════════════════════════════════════════════════════════════
//  ConeheadZombie.js — Zombie đội nón giao thông
//  HP tổng: 560 = 360 (nón) + 200 (cơ thể)
//
//  Cơ chế giáp:
//    Sát thương trừ vào coneHp trước.
//    Khi coneHp ≤ 0 → nón rơi, phần sát thương thừa trừ vào HP cơ thể.
//    Sau khi mất nón: maxHp = 200, hành xử như BasicZombie.
// ══════════════════════════════════════════════════════════════

class ConeheadZombie extends Zombie {
    constructor(row) {
        super('conehead', row);
        this.coneHp  = ZOMBIE_DEFS.conehead.coneHp; // 360
        this.hasCone = true;
    }

    // Override để xử lý hệ thống giáp 2 lớp (nón → cơ thể)
    takeDamage(amount, particles) {
        this._takeArmoredDamage(amount, particles, 'coneHp', 'hasCone');
    }

    get render() {
        return { drawHatFn: this.hasCone ? _drawConeHat : null };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
