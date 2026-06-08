'use strict';
// ══════════════════════════════════════════════════════════════
//  Sun.js — Ánh nắng (tài nguyên để đặt cây)
//  Có 2 nguồn gốc:
//    fromSky=true  → rơi từ trên trời (tự nhiên mỗi 8–12 giây)
//    fromSky=false → Sunflower tạo ra (nằm ngay tại vị trí cây)
//
//  UX: có thể nhặt ngay trong khi đang rơi (không cần đợi chạm đất)
//      vùng click rộng 50px radius (dễ bấm hơn)
// ══════════════════════════════════════════════════════════════

class Sun {
    constructor(x, y, fromSky, amount = 25) {
        this.amount = amount;
        this.x    = x;
        this.y    = fromSky ? -30 : y;
        this.targetY = fromSky
            ? GY + randFloat(30, GRID_H - 60)
            : y;
        this.dead       = false;
        this.collected  = false;
        this.animTime   = Math.random() * Math.PI * 2;
        this.lifetime   = 7000;
        this.vy         = fromSky ? 0.5 : 0;
        this.settled    = !fromSky;
        this.collectAnim = 0;
        this.alpha      = fromSky ? 0 : 1;
    }

    update(dt) {
        this.animTime += dt / 1000;

        if (this.collected) {
            // Bay lên và mờ dần sau khi thu
            this.collectAnim += dt / 400;
            this.y    -= 3 * dt / 16.67;
            this.alpha = Math.max(0, 1 - this.collectAnim);
            if (this.collectAnim >= 1) this.dead = true;
            return;
        }

        if (!this.settled) {
            // Đang rơi từ trời — vẫn có thể nhặt
            this.vy    += 0.08 * dt / 16.67;
            this.y     += this.vy * dt / 16.67;
            this.alpha  = Math.min(1, this.alpha + dt / 300);
            if (this.y >= this.targetY) {
                this.y       = this.targetY;
                this.settled = true;
            }
        } else {
            // Đứng yên — đếm ngược lifetime
            this.lifetime -= dt;
            if (this.lifetime <= 0) {
                this.alpha -= dt / 600;
                if (this.alpha <= 0) this.dead = true;
            }
        }
    }

    // Thu sun — không cần đợi chạm đất nữa
    collect() {
        if (!this.collected) this.collected = true;
    }

    draw(ctx) { drawSun(ctx, this.x, this.y, this.animTime, this.alpha); }

    // Có thể nhặt ngay khi đã hiện đủ (alpha > 0.3) — không cần settled
    isClickable() { return !this.collected && !this.dead && this.alpha > 0.3; }
}
