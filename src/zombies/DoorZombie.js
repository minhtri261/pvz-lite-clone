'use strict';
// ══════════════════════════════════════════════════════════════
//  DoorZombie.js — Zombie thường dùng cánh cửa gỗ làm khiên
//
//  Hai lớp HP độc lập: doorHp = 1400 (cửa) và hp = 270 (thân, bằng Basic).
//  Quy tắc sát thương (xem _takeShieldedDamage trong Zombie.js):
//    - Đạn thường (Pea, SnowPea…): cửa chặn hết, hp không giảm tới khi cửa vỡ
//    - Đạn ném vòng cung (Cabbage…): bỏ qua cửa, đánh thẳng vào hp
//    - Đạn xuyên (FumeShroom, Peanut…): trừ đồng thời cả cửa và hp
//    - Cửa vỡ (doorHp ≤ 0) → nổ mảnh gỗ, lộ ra BasicZombie bình thường
// ══════════════════════════════════════════════════════════════

class DoorZombie extends Zombie {
    constructor(row) {
        super('door', row);
        this.doorHp  = ZOMBIE_DEFS.door.doorHp; // 1400
        this.hasDoor = true;
        // hp tách biệt khỏi doorHp — luôn là HP thân Basic (270), không
        // cộng dồn vào maxHp như cách Zombie() khởi tạo mặc định
        this.hp    = ZOMBIE_DEFS.basic.maxHp;
        this.maxHp = ZOMBIE_DEFS.basic.maxHp;
    }

    takeDamage(amount, particles, opts) {
        this._takeShieldedDamage(amount, particles, opts, 'doorHp', 'hasDoor',
            p => spawnDoorBreakParticles(this.x, this.y, p || []));
    }

    get render() {
        if (!this.hasDoor) return {};
        const doorPct = Math.max(0, this.doorHp / ZOMBIE_DEFS.door.doorHp);
        return {
            drawShieldFn: (ctx, animTime, state) => _drawDoorShield(ctx, animTime, state, doorPct),
            drawArmsFn:   () => {}, // tay bị che hoàn toàn phía sau cửa
        };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
