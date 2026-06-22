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
        this._takeArmoredDamage(amount, particles, 'brickHp', 'hasBrick');
    }

    get render() {
        if (!this.hasBrick) return {};
        const brickPct = Math.max(0, this.brickHp / ZOMBIE_DEFS.brickhead.brickHp);
        return { drawHatFn: (ctx, hy) => _drawBrickHat(ctx, hy, brickPct) };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
