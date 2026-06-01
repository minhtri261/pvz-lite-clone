'use strict';
// ══════════════════════════════════════════════════════════════
//  FlagZombie.js — Zombie cầm cờ (dẫn đầu làn sóng lớn)
//  HP: 200 | Tốc độ: 0.5 (nhanh hơn basic)
//  Cầm cờ đỏ có chữ "Z" — xuất hiện đầu tiên trong mỗi surge
//  Không có giáp, logic hoàn toàn giống BasicZombie
// ══════════════════════════════════════════════════════════════

class FlagZombie extends Zombie {
    constructor(row) { super('flag', row); }

    draw(ctx) {
        this.drawHitFlash(ctx);
        // drawFlagZombie = drawBasicZombie + cột cờ + cờ vẫy
        drawFlagZombie(ctx, this.x, this.y, this.animTime, this.state, this.hpPct, this.deathT);
        this.drawSlowOverlay(ctx);
    }
}
