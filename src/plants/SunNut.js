'use strict';
// ══════════════════════════════════════════════════════════════
//  SunNut.js — Hạt Mặt Trời (WallNut + SunFlower fusion)
//  Kết hợp khả năng chặn zombie của WallNut VÀ sản xuất sun
//
//  HP: 4000 (bằng WallNut) — zombie mất nhiều thời gian để phá
//  Sun: 25 mỗi 28s (chậm hơn Sunflower 23s vì đã quá mạnh)
//  Ban đêm: sun production chậm thêm 2× (56s/cycle)
//
//  Chiến thuật: đặt ở hàng 1-2 để vừa tạo sun vừa chặn đường
// ══════════════════════════════════════════════════════════════

class SunNut extends Plant {
    constructor(col, row) {
        super('sunnut', col, row);
        this.sunTimer     = 0;
        this.producePulse = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.sunTimer     += dt;
        this.producePulse  = Math.max(0, this.producePulse - dt / 1000);

        const interval = PLANT_DEFS.sunnut.sunInterval * (game.levelDef?.isNight ? 2 : 1);
        if (this.sunTimer >= interval) {
            this.sunTimer     = 0;
            this.producePulse = 0.5;
            game.suns.push(new Sun(this.cx + randFloat(-28, 28), this.cy - 55, false));
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawSunNut(ctx, this.cx, this.cy, this.animTime, this.hpPct, this.producePulse > 0);
    }
}
