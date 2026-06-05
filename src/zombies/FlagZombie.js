'use strict';
// ══════════════════════════════════════════════════════════════
//  FlagZombie.js — Zombie cầm cờ (dẫn đầu làn sóng lớn)
//  HP: 200 | Tốc độ: 0.5 (nhanh hơn basic)
//  Cầm cờ đỏ có chữ "Z" — xuất hiện đầu tiên trong mỗi surge
//  Không có giáp, logic hoàn toàn giống BasicZombie
// ══════════════════════════════════════════════════════════════

class FlagZombie extends Zombie {
    constructor(row) { super('flag', row); }

    get render() {
        return {
            drawGearFn: !(this.state === 'dying' && this.deathT > 0.6) ? _drawFlagGear : null,
        };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
