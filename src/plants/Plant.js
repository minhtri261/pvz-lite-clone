'use strict';
// ══════════════════════════════════════════════════════════════
//  Plant.js — Lớp cơ sở cho tất cả các loại cây
//
//  Mọi cây (Sunflower, Peashooter, WallNut...) đều kế thừa từ đây.
//  Lớp này xử lý: máu, hoạt ảnh bị trúng đòn, trạng thái chết.
//  Mỗi subclass tự override phương thức update() và draw().
// ══════════════════════════════════════════════════════════════

class Plant {
    // type: 'sunflower' | 'peashooter' | 'wallnut' | 'cherrybomb' | 'snowpea'
    // col, row: vị trí trên lưới (0-based)
    constructor(type, col, row) {
        const d = PLANT_DEFS[type]; // đọc thông số từ bảng dữ liệu
        Object.assign(this, {
            type, col, row,
            cx: cx(col), cy: cy(row), // tọa độ pixel tâm ô (tính sẵn)
            hp: d.hp, maxHp: d.hp,
            animTime: 0,   // đồng hồ hoạt ảnh (tính bằng giây, tăng liên tục)
            dead: false,   // true → sẽ bị xóa khỏi game
            hitFlash: 0,   // bộ đếm hiệu ứng flash đỏ khi trúng đòn (giây)
            stackCount: 1, // số lượng xếp chồng (chỉ có nghĩa với Shroom, tối đa 2)
        });
    }

    // Tỉ lệ máu còn lại (1.0 = đầy, 0.0 = hết)
    get hpPct()  { return this.hp / this.maxHp; }
    get isDead() { return this.dead; }

    // Nhận sát thương từ zombie
    takeDamage(amount) {
        this.hitFlash = 0.15;
        if (this.stackCount === 2) {
            // Con bên phải bị ăn trước — khi hết HP thì con trái tiếp quản nguyên HP
            this._rightHp -= amount;
            if (this._rightHp <= 0) {
                this.stackCount = 1;
                this.hp = this.maxHp;
            }
        } else {
            this.hp -= amount;
            if (this.hp <= 0) this.dead = true;
        }
    }

    // Gọi mỗi frame — subclass override để thêm logic riêng
    update(dt) {
        this.animTime += dt / 1000; // dt tính bằng ms, animTime tính bằng giây
        if (this.hitFlash > 0) this.hitFlash -= dt / 1000;
    }

    // Vẽ vòng tròn đỏ mờ khi cây vừa bị đánh — subclass gọi trước khi vẽ sprite
    drawHitFlash(ctx) {
        if (this.hitFlash <= 0) return;
        ctx.save();
        // Độ mờ tỉ lệ với thời gian flash còn lại
        ctx.globalAlpha = clamp(this.hitFlash / 0.15, 0, 1) * 0.55;
        ctx.fillStyle = '#FF2020';
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
