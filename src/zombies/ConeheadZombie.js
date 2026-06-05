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

    // Override để xử lý hệ thống giáp 2 lớp
    takeDamage(amount, particles) {
        if (this.dying) return;
        this.hitFlash = 0.1;

        if (this.hasCone && this.coneHp > 0) {
            this.coneHp -= amount;
            if (this.coneHp <= 0) {
                const overflow = -this.coneHp; // sát thương thừa sau khi phá nón
                this.hasCone = false;
                this.maxHp   = ZOMBIE_DEFS.basic.maxHp; // đặt lại maxHp về 200
                this.hp      = Math.min(this.hp, this.maxHp);
                // Áp phần sát thương thừa vào HP cơ thể (fix: không bỏ phí)
                if (overflow > 0) {
                    this.hp -= overflow;
                    if (this.hp <= 0) {
                        this.dying = true;
                        this.state = 'dying';
                        spawnDeathParticles(this.x, this.y - 20, particles || []);
                    }
                }
            }
        } else {
            // Nón đã rơi → tấn công trực tiếp vào HP
            this.hp -= amount;
            if (this.hp <= 0) {
                this.dying = true;
                this.state = 'dying';
                spawnDeathParticles(this.x, this.y - 20, particles || []);
            }
        }
    }

    get render() {
        return { drawHatFn: this.hasCone ? _drawConeHat : null };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
