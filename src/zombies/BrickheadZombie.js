'use strict';
// ══════════════════════════════════════════════════════════════
//  BrickheadZombie.js — Zombie đội cục gạch (PvZ2)
//  HP tổng: 1700 = 1500 (gạch) + 200 (cơ thể)
//  Tốc độ: 0.20 (chậm nhất trong game — gạch quá nặng)
//
//  Cơ chế giáp:
//    Gạch hấp thụ 1500 sát thương đầu tiên.
//    Khi gạch vỡ → chỉ còn cơ thể 200 HP, chạy nhanh hơn.
//    Phần sát thương thừa sau khi phá gạch → trừ vào HP cơ thể.
//
//  Vết nứt:
//    brickPct < 0.65 → nứt nhẹ (1 đường)
//    brickPct < 0.30 → nứt nặng (nhiều đường)
//
//  Counter: Cherry Bomb (2000 dmg) phá ~1/1 gạch;
//           Repeater tốn ~75 viên = 112s để phá một mình.
//           Snow Pea làm chậm → Peashooter/Repeater có thêm thời gian.
// ══════════════════════════════════════════════════════════════

class BrickheadZombie extends Zombie {
    constructor(row) {
        super('brickhead', row);
        this.brickHp  = ZOMBIE_DEFS.brickhead.brickHp; // 1500
        this.hasBrick = true;
    }

    // Override: xử lý lớp giáp gạch trước khi giảm HP cơ thể
    takeDamage(amount, particles) {
        if (this.dying) return;
        this.hitFlash = 0.1;

        if (this.hasBrick && this.brickHp > 0) {
            this.brickHp -= amount;
            if (this.brickHp <= 0) {
                const overflow = -this.brickHp; // sát thương thừa
                this.hasBrick = false;
                this.maxHp   = ZOMBIE_DEFS.basic.maxHp; // reset về 200
                this.hp      = Math.min(this.hp, this.maxHp);
                if (overflow > 0) {
                    this.hp -= overflow;
                    if (this.hp <= 0) {
                        this.dying = true; this.state = 'dying';
                        spawnDeathParticles(this.x, this.y - 20, particles || []);
                    }
                }
            }
        } else {
            this.hp -= amount;
            if (this.hp <= 0) {
                this.dying = true; this.state = 'dying';
                spawnDeathParticles(this.x, this.y - 20, particles || []);
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        const brickPct = this.hasBrick
            ? Math.max(0, this.brickHp / ZOMBIE_DEFS.brickhead.brickHp)
            : 0;
        drawBrickheadZombie(ctx,
            this.x, this.y, this.animTime,
            this.state, this.hpPct,
            this.hasBrick, brickPct, this.deathT);
        this.drawSlowOverlay(ctx);
    }
}
