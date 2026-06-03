'use strict';
// ══════════════════════════════════════════════════════════════
//  TwinSun.js — Hoa Hướng Dương Đôi (PvZ2)
//  Cost: 125 ☀ | HP: 300 | Cooldown: 15s
//
//  Hai đầu hoa mỗi đầu sản xuất 25 sun → mỗi chu kỳ (25s) được 50 sun
//  Hiệu quả hơn 2 Sunflower (23s × 2 = 46s cho 50 sun) nhưng đắt hơn
//  và dễ bị ăn (chỉ 1 ô).
//
//  Chiến lược: thay thế hàng Sunflower khi đã ổn định phòng thủ,
//  tiết kiệm 1 ô mà vẫn sản xuất đủ sun.
// ══════════════════════════════════════════════════════════════

class TwinSun extends Plant {
    constructor(col, row) {
        super('twinsun', col, row);
        this.sunTimer    = 0;
        this.producePulse = 0;
    }

    update(dt, game) {
        super.update(dt);
        this.sunTimer    += dt;
        this.producePulse = Math.max(0, this.producePulse - dt / 1000);

        if (this.sunTimer >= PLANT_DEFS.twinsun.sunInterval) {
            this.sunTimer    = 0;
            this.producePulse = 0.5;
            // Hai đầu hoa → hai sun xuất hiện ở hai vị trí khác nhau
            game.suns.push(new Sun(this.cx - 20 + randFloat(-12, 12), this.cy - 50, false));
            game.suns.push(new Sun(this.cx + 20 + randFloat(-12, 12), this.cy - 50, false));
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawTwinSun(ctx, this.cx, this.cy, this.animTime, this.producePulse > 0);
    }
}
