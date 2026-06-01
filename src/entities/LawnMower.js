'use strict';
// ══════════════════════════════════════════════════════════════
//  LawnMower.js — Máy cắt cỏ (lớp phòng thủ cuối cùng)
//
//  Vòng đời (state machine):
//    'ready'  → đứng yên bên trái lưới, chờ kích hoạt
//    'active' → chạy sang phải, tiêu diệt mọi zombie cùng hàng
//    'gone'   → đã chạy ra khỏi màn hình, không còn bảo vệ hàng đó
//
//  Kích hoạt khi: zombie vượt qua MOWER_TRIGGER (x ≤ 138)
//  Game Over khi: zombie vượt qua HOUSE_X (x ≤ 76) và mower đã 'gone'
// ══════════════════════════════════════════════════════════════

class LawnMower {
    constructor(row) {
        Object.assign(this, {
            row,
            x: MOWER_X_INIT, // 106 — vị trí nghỉ
            state: 'ready',
            animTime: 0,
            speed: 11,        // tốc độ chạy (pixel/frame khi active)
        });
    }

    // Chuyển sang trạng thái chạy
    activate() { this.state = 'active'; }

    update(dt, zombies, particles) {
        this.animTime += dt / 1000;
        if (this.state !== 'active') return;

        // Di chuyển sang phải
        this.x += this.speed * dt / 16.67;

        // Kiểm tra va chạm với zombie cùng hàng
        for (const z of zombies) {
            // Khoảng cách nhỏ hơn 36px → nghiền nát zombie (sát thương 99999)
            if (!z.dying && z.row === this.row && Math.abs(z.x - this.x) < 36) {
                z.takeDamage(99999, particles);
            }
        }

        // Khi đã ra khỏi màn hình → đánh dấu 'gone'
        if (this.x > W + 100) this.state = 'gone';
    }

    draw(ctx) {
        if (this.state === 'gone') return; // không vẽ nếu đã biến mất
        drawLawnMower(ctx, this.x, cy(this.row), this.state === 'active', this.animTime);
    }
}
