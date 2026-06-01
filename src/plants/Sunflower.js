'use strict';
// ══════════════════════════════════════════════════════════════
//  Sunflower.js — Hoa Hướng Dương: sản xuất ánh nắng
//  Cost: 50 ☀ | HP: 300 | Cooldown: 7.5s
//  Cứ 23 giây tạo 1 sun (25 ánh nắng) xuất hiện gần cây
// ══════════════════════════════════════════════════════════════

class Sunflower extends Plant {
    constructor(col, row) {
        super('sunflower', col, row);
        this.sunTimer    = 0;   // đếm thời gian từ lần tạo sun trước
        this.producePulse = 0;  // > 0 trong khoảnh khắc tạo sun → animation phồng to
    }

    update(dt, game) {
        super.update(dt); // xử lý hitFlash, animTime từ lớp cha
        this.sunTimer    += dt;
        this.producePulse = Math.max(0, this.producePulse - dt / 1000);

        if (this.sunTimer >= PLANT_DEFS.sunflower.sunInterval) {
            this.sunTimer    = 0;
            this.producePulse = 0.5; // kích hoạt animation 0.5 giây
            // Thêm sun vào danh sách — xuất hiện ngẫu nhiên quanh cây (không từ trời)
            game.suns.push(new Sun(this.cx + randFloat(-30, 30), this.cy - 50, false));
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx); // lớp cha vẽ flash đỏ nếu cần
        drawSunflower(ctx, this.cx, this.cy, this.animTime, this.producePulse > 0);
    }
}
