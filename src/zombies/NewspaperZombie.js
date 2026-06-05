'use strict';
// ══════════════════════════════════════════════════════════════
//  NewspaperZombie.js — Zombie Đọc Báo (giống PvZ1)
//
//  Hai giai đoạn:
//    1. CÒN BÁO: speed=0.28, attackRate=1000 (bình thường như Basic)
//    2. MẤT BÁO: speed=0.5 (!), attackRate=2000 → chạy nhanh gấp đôi!
//
//  Cơ chế báo:
//    - Báo có HP riêng (100), tất cả đạn đều gây sát thương cho báo VÀ thân
//    - Khi báo HP ≤ 0 → báo rách, zombie điên loạn và chạy nhanh
//    - HP thân vẫn bị trừ bình thường — zombie có thể chết trước khi mất báo
// ══════════════════════════════════════════════════════════════

class NewspaperZombie extends Zombie {
    constructor(row) {
        super('newspaper', row);
        this.paperHp  = ZOMBIE_DEFS.newspaper.paperHp; // 100
        this.hasPaper = true;
    }

    // Override: damage cả báo lẫn thân cùng lúc
    takeDamage(amount, particles) {
        if (this.dying) return;
        this.hitFlash = 0.1;

        // Trừ HP báo (riêng biệt, không ảnh hưởng thân)
        if (this.hasPaper && this.paperHp > 0) {
            this.paperHp -= amount;
            if (this.paperHp <= 0) {
                this.hasPaper   = false;
                this.speed      = ZOMBIE_DEFS.newspaper.ragespeed;      // 0.5
                this.attackRate = ZOMBIE_DEFS.newspaper.rageAttackRate; // 2000
            }
        }

        // Trừ HP thân bình thường
        this.hp -= amount;
        if (this.hp <= 0) {
            this.dying = true;
            this.state = 'dying';
            spawnDeathParticles(this.x, this.y - 20, particles);
        }
    }

    get render() {
        const showPaper = this.hasPaper && !(this.state === 'dying' && this.deathT > 0.6);
        return {
            rageEyes:   !this.hasPaper,
            drawGearFn: showPaper ? _drawNewspaperGear : null,
        };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
