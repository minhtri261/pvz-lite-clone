'use strict';
// ══════════════════════════════════════════════════════════════
//  SunShroom.js — Nấm Mặt Trời (PuffShroom + SunFlower fusion)
//  Tạo hình giống PvZ1: nấm nhỏ nâu-vàng, không lớn lên
//
//  Sản xuất sun:
//    Ban ngày: 25☀ mỗi 25s
//    Ban đêm:  25☀ mỗi 20s (nấm thích bóng tối — NHANH HƠN!)
//
//  Lưu ý: KHÔNG dùng nhân hệ số đêm x2 như các cây khác
//  vì SunShroom vốn được thiết kế để hiệu quả hơn ban đêm.
// ══════════════════════════════════════════════════════════════

class SunShroom extends Plant {
    constructor(col, row) {
        super('sunshroom', col, row);
        this.sunTimer    = 0;
        this.producePulse = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.sunTimer    += dt;
        this.producePulse = Math.max(0, this.producePulse - dt / 1000);

        // SunShroom có interval riêng cho ngày/đêm — không dùng multiplier x2 chung
        const interval = game.levelDef?.isNight
            ? PLANT_DEFS.sunshroom.sunIntervalNight  // 20s — nhanh hơn
            : PLANT_DEFS.sunshroom.sunIntervalDay;   // 25s — bình thường

        if (this.sunTimer >= interval) {
            this.sunTimer    = 0;
            this.producePulse = 0.5;
            game.suns.push(new Sun(this.cx + randFloat(-25, 25), this.cy - 50, false));
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawSunShroom(ctx, this.cx, this.cy, this.animTime, this.producePulse);
    }
}
