'use strict';
// ══════════════════════════════════════════════════════════════
//  BasicZombie.js — Zombie cơ bản
//  HP: 200 | Tốc độ: 0.28 | Không có giáp
//  Không cần override gì — dùng toàn bộ logic từ lớp cha Zombie
// ══════════════════════════════════════════════════════════════

class BasicZombie extends Zombie {
    constructor(row) { super('basic', row); }

    draw(ctx) {
        this.drawHitFlash(ctx);    // flash đỏ từ lớp cha
        drawBasicZombie(ctx, this.x, this.y, this.animTime, this.state, this.hpPct, this.deathT);
        this.drawSlowOverlay(ctx); // lớp băng xanh từ lớp cha
    }
}
