'use strict';
// ══════════════════════════════════════════════════════════════
//  IceLettuce.js — Xà Lách Băng: đóng băng zombie đến gần (dùng 1 lần)
//  Cost: 175 ☀ | HP: 300 | Cooldown: 7.5s
//
//  Khi zombie cùng hàng tiến vào tầm (range), nó bị đóng băng
//  hoàn toàn (không di chuyển, không tấn công) trong 5s, kèm
//  hiệu ứng làm lạnh (màu xanh dương nhạt). Sau khi rã đông,
//  zombie vẫn chịu hiệu ứng làm lạnh thêm 5s nữa (chậm 50% tốc
//  độ đi và 50% tốc độ ăn).
//
//  Sau khi kích hoạt, IceLettuce biến mất (giống Potato Mine).
// ══════════════════════════════════════════════════════════════

class IceLettuce extends Plant {
    constructor(col, row) {
        super('icelettuce', col, row);
    }

    update(dt, game) {
        super.update(dt);

        const def = PLANT_DEFS.icelettuce;
        for (const z of game.zombies) {
            if (z.dying || z.row !== this.row || z.chillTimer > 0) continue;
            const dist = z.x - this.cx;
            if (dist > -20 && dist < def.range) {
                z.applyFreeze(def.freezeMs, def.chillMs);
                this.dead = true; // dùng 1 lần — biến mất sau khi đóng băng
                break;
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawIceLettuce(ctx, this.cx, this.cy, this.animTime, 0);
    }
}
