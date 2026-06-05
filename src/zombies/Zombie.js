'use strict';
// ══════════════════════════════════════════════════════════════
//  Zombie.js — Lớp cơ sở cho tất cả các loại zombie
//
//  Trạng thái (state):
//    'walking' → đi về phía trái
//    'eating'  → đang ăn/tấn công cây trước mặt
//    'dying'   → đang ngã (animation chết), chưa bị xóa
//
//  Lớp con (ConeheadZombie, BucketZombie) override takeDamage()
//  để xử lý lớp giáp (nón / xô) trước khi giảm HP cơ thể.
// ══════════════════════════════════════════════════════════════

class Zombie {
    constructor(type, row) {
        const d = ZOMBIE_DEFS[type];
        Object.assign(this, {
            type, row,
            x: ZOMBIE_SPAWN_X,  // xuất hiện ngoài màn hình bên phải
            y: cy(row),         // tọa độ Y của hàng (tâm ô)
            hp: d.maxHp, maxHp: d.maxHp,
            speed: d.speed,
            damage: d.damage,
            attackRate: d.attackRate,
            eatTimer: 0,       // đếm thời gian giữa các đòn tấn công
            animTime: 0,
            state: 'walking',
            dying: false,
            deathT: 0,         // tiến trình animation chết (0→1)
            hitFlash: 0,       // flash đỏ khi trúng đạn
            remove: false,     // true → xóa khỏi mảng game.zombies
            slowTimer: 0,      // thời gian hiệu ứng chậm còn lại (ms)
            slowed: false,     // true → đang bị Snow Pea làm chậm
        });
    }

    get hpPct()  { return this.hp / this.maxHp; }
    get isDead() { return this.remove; }

    // Default render config — subclasses override to add hat/gear/outfit/rageEyes.
    get render()  { return {}; }

    // Active status effects as a string array consumed by drawZombieBase.
    // Add more flags here as new mechanics are introduced.
    get effects() {
        const fx = [];
        if (this.slowed) fx.push('slow');
        return fx;
    }

    // Nhận sát thương — lớp con override nếu có giáp
    takeDamage(amount, particles) {
        if (this.dying) return; // không nhận sát thương khi đang chết
        this.hp -= amount;
        this.hitFlash = 0.1;
        if (this.hp <= 0) {
            this.dying = true;
            this.state = 'dying';
            spawnDeathParticles(this.x, this.y - 20, particles);
        }
    }

    // Tìm cây gần nhất phía trước mặt zombie (trong phạm vi cắn)
    // Phạm vi: zombie.x - plant.cx nằm trong khoảng (-20, 58)
    findTarget(plants) {
        let best = null;
        for (const p of plants) {
            if (p.row === this.row && !p.isDead) {
                const dist = this.x - p.cx;
                // dist > -20: cây không quá xa bên phải
                // dist < 58: cây chưa ở sau lưng zombie
                if (dist > -20 && dist < 58 && (!best || p.cx > best.cx)) best = p;
            }
        }
        return best; // cây gần zombie nhất được ưu tiên
    }

    update(dt, plants) {
        this.animTime += dt / 1000;
        if (this.hitFlash > 0) this.hitFlash -= dt / 1000;

        // Đếm ngược hiệu ứng chậm (Snow Pea)
        if (this.slowTimer > 0) {
            this.slowTimer -= dt;
            if (this.slowTimer <= 0) { this.slowTimer = 0; this.slowed = false; }
        }

        if (this.dying) {
            // Animation ngã: xoay và mờ dần trong 1.2 giây
            this.deathT += dt / 1200;
            if (this.deathT >= 1) this.remove = true; // xóa khỏi game
            return;
        }

        const target = this.findTarget(plants);
        if (target) {
            // Có cây trước mặt → đứng lại tấn công
            this.state = 'eating';
            this.eatTimer += dt;
            if (this.eatTimer >= this.attackRate) {
                this.eatTimer = 0;
                target.takeDamage(this.damage);
            }
        } else {
            // Không có cây → tiếp tục đi
            this.state = 'walking';
            this.eatTimer = 0;
            // Tốc độ giảm 55% khi bị chậm
            this.x -= (this.slowed ? this.speed * 0.45 : this.speed) * (dt / 16.67);
        }
    }

    // Vòng tròn đỏ flash khi trúng đạn
    drawHitFlash(ctx) {
        if (this.hitFlash <= 0) return;
        ctx.save();
        ctx.globalAlpha = clamp(this.hitFlash / 0.1, 0, 1) * 0.6;
        ctx.fillStyle = '#FF4444';
        ctx.beginPath(); ctx.arc(this.x, this.y - 20, 28, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }

    // Lớp phủ xanh băng khi đang bị Snow Pea làm chậm
    drawSlowOverlay(ctx) {
        if (!this.slowed || this.dying) return;
        ctx.save();
        ctx.globalAlpha = 0.28;
        ctx.fillStyle = '#00E5FF';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y - 20, 24, 35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
