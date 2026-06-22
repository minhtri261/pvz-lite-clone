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

    // Có mục tiêu (zombie và/hoặc lăng mộ) phía trước trong cùng hàng không?
    // maxRange: giới hạn khoảng cách (px), mặc định không giới hạn
    // includeTombs: có tính cả lăng mộ làm mục tiêu không (mặc định có)
    hasTargetInRow(game, { maxRange = Infinity, includeTombs = true } = {}) {
        const inRange = d => d > 0 && d <= maxRange;
        if (game.zombies.some(z => z.row === this.row && !z.dying && inRange(z.x - this.cx))) return true;
        if (includeTombs && game.tombs.some(t => !t.dead && t.row === this.row && inRange(t.cellX - this.cx))) return true;
        return false;
    }

    // Tìm tọa độ X mục tiêu để ném (zombie gần nhất, hoặc lăng mộ gần nhất nếu
    // không có zombie) trong cùng hàng — dùng cho Cabbage / Ice Cabbage
    findLobTargetX(game) {
        let nearest = null, bestDist = Infinity;
        for (const z of game.zombies) {
            if (!z.dying && z.row === this.row && z.x > this.cx) {
                const d = z.x - this.cx;
                if (d < bestDist) { bestDist = d; nearest = z; }
            }
        }
        if (nearest) return nearest.x;

        let targetX = null, bestTombDist = Infinity;
        for (const t of game.tombs) {
            if (!t.dead && t.row === this.row && t.cellX > this.cx) {
                const d = t.cellX - this.cx;
                if (d < bestTombDist) { bestTombDist = d; targetX = t.cellX; }
            }
        }
        return targetX;
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
