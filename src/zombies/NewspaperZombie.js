'use strict';
// ══════════════════════════════════════════════════════════════
//  NewspaperZombie.js — Zombie Đọc Báo (giống PvZ1)
//
//  Hai giai đoạn:
//    1. CÒN BÁO: speed=0.28, attackRate=1000 (bình thường như Basic)
//    2. MẤT BÁO: speed=0.5 (!), attackRate=2000 → chạy nhanh gấp đôi!
//
//  Hai lớp HP độc lập: paperHp (báo) và hp = 270 (thân, bằng Basic).
//  Quy tắc sát thương (xem _takeShieldedDamage trong Zombie.js):
//    - Đạn thường (Pea, SnowPea…): báo chặn hết, hp không giảm tới khi báo rách
//    - Đạn ném vòng cung (Cabbage…): bỏ qua báo, đánh thẳng vào hp
//    - Đạn xuyên (FumeShroom, Peanut…): trừ đồng thời cả báo và hp
//    - Báo rách (paperHp ≤ 0) → zombie điên loạn, chạy nhanh gấp đôi
// ══════════════════════════════════════════════════════════════

class NewspaperZombie extends Zombie {
    constructor(row) {
        super('newspaper', row);
        this.paperHp  = ZOMBIE_DEFS.newspaper.paperHp; // 800
        this.hasPaper = true;
        // hp tách biệt khỏi paperHp — luôn là HP thân Basic (270), không
        // cộng dồn vào maxHp như cách Zombie() khởi tạo mặc định
        this.hp    = ZOMBIE_DEFS.basic.maxHp;
        this.maxHp = ZOMBIE_DEFS.basic.maxHp;
    }

    takeDamage(amount, particles, opts) {
        this._takeShieldedDamage(amount, particles, opts, 'paperHp', 'hasPaper', () => {
            this.speed      = ZOMBIE_DEFS.newspaper.ragespeed;      // 0.5
            this.attackRate = ZOMBIE_DEFS.newspaper.rageAttackRate; // 2000
            this.damage     = ZOMBIE_DEFS.newspaper.rageDamage;     // 250 — cắn mạnh hơn để bù nhịp cắn chậm
        });
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
