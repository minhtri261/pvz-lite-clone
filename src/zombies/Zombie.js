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
            frozenTimer: 0,    // > 0 → đang bị đóng băng hoàn toàn (Ice Lettuce)
            chillTimer:  0,    // > 0 → đang chịu hiệu ứng làm lạnh (đóng băng + sau rã đông)
        });
    }

    get hpPct()  { return this.hp / this.maxHp; }
    get isDead() { return this.remove; }

    // true khi đang bị đóng băng hoàn toàn — không di chuyển, không tấn công
    get frozen()  { return this.frozenTimer > 0; }
    // true khi đang chịu hiệu ứng làm lạnh (đóng băng hoặc sau khi rã đông) — chậm 50%
    get chilled() { return this.chillTimer > 0; }

    // Default render config — subclasses override to add hat/gear/outfit/rageEyes.
    get render()  { return {}; }

    // Active status effects as a string array consumed by drawZombieBase.
    // Add more flags here as new mechanics are introduced.
    get effects() {
        const fx = [];
        if (this.chillTimer > 0) fx.push('frozen');
        return fx;
    }

    // Ice Lettuce: đóng băng hoàn toàn freezeMs, rồi chịu hiệu ứng làm lạnh
    // (chậm 50%) cho đến khi tổng thời gian chillMs trôi qua
    applyFreeze(freezeMs, chillMs) {
        this.frozenTimer = Math.max(this.frozenTimer, freezeMs);
        this.chillTimer  = Math.max(this.chillTimer, chillMs);
    }

    // Snow Pea (và các plant làm lạnh khác trong tương lai): chỉ áp hiệu
    // ứng làm lạnh (chậm 50% di chuyển + ăn, phủ xanh dương nhạt), không
    // đóng băng hoàn toàn — dùng chung cơ chế chillTimer với Ice Lettuce
    applyChill(chillMs) {
        this.chillTimer = Math.max(this.chillTimer, chillMs);
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

    // Trừ thẳng vào HP cơ thể — dùng bởi takeDamage() và bởi lớp con khi
    // sát thương "thừa" sau khi phá vỡ giáp (nón/xô) cần dồn vào cơ thể
    _applyBodyDamage(amount, particles) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.dying = true;
            this.state = 'dying';
            spawnDeathParticles(this.x, this.y - 20, particles || []);
        }
    }

    // Sát thương trừ vào lớp giáp (nón/xô) trước; khi giáp vỡ, phần sát
    // thương thừa dồn vào HP cơ thể và maxHp trở về basic.
    // armorField: tên field HP giáp (vd 'coneHp'), hasArmorField: tên field
    // cờ còn giáp (vd 'hasCone') — dùng bởi ConeheadZombie, BucketZombie
    _takeArmoredDamage(amount, particles, armorField, hasArmorField) {
        if (this.dying) return;
        this.hitFlash = 0.1;

        if (this[hasArmorField] && this[armorField] > 0) {
            this[armorField] -= amount;
            if (this[armorField] <= 0) {
                const overflow = -this[armorField]; // sát thương thừa sau khi phá giáp
                this[hasArmorField] = false;
                this.maxHp = ZOMBIE_DEFS.basic.maxHp; // đặt lại maxHp về 200
                this.hp    = Math.min(this.hp, this.maxHp);
                if (overflow > 0) this._applyBodyDamage(overflow, particles);
            }
        } else {
            // Giáp đã rơi → tấn công trực tiếp vào HP
            this._applyBodyDamage(amount, particles);
        }
    }

    // Sát thương cho zombie có 2 lớp HP ĐỘC LẬP: khiên (báo/cửa/…) rồi
    // thân — khác _takeArmoredDamage (nón/xô/gạch) ở chỗ shieldHp và hp
    // là 2 pool tách biệt ngay từ đầu (hp không cộng dồn với shieldHp,
    // subclass tự đặt hp = ZOMBIE_DEFS.basic.maxHp khi khởi tạo).
    // Dùng bởi NewspaperZombie, DoorZombie — và mọi zombie cầm khiên
    // tương tự được thêm sau này.
    //
    // shieldField/hasShieldField: tên field HP khiên + cờ còn khiên.
    // onBreak(particles): gọi đúng 1 lần khi khiên vừa vỡ (đổi rage
    // stat, nổ mảnh vỡ…).
    //
    // opts:
    //   lobbed {bool} — đạn ném vòng cung (Cabbage…): rơi từ trên cao
    //                    xuống đầu nên bỏ qua khiên, đánh thẳng vào hp
    //   pierce {bool} — đạn xuyên (FumeShroom, Peanut…): trừ ĐỒNG THỜI
    //                    cả khiên và hp, không chọn một trong hai
    // Mặc định (không opts): khiên chặn toàn bộ sát thương trước, hp chỉ
    // giảm khi khiên đã vỡ (sát thương dư sau khi phá khiên dồn vào hp).
    // Sau mọi nhánh: hp <= 0 → chết ngay, không quan tâm shieldHp còn hay hết.
    _takeShieldedDamage(amount, particles, opts, shieldField, hasShieldField, onBreak) {
        if (this.dying) return;
        this.hitFlash = 0.1;
        const { lobbed = false, pierce = false } = opts || {};

        if (lobbed) {
            this._applyBodyDamage(amount, particles);
            return;
        }

        const hasShield = this[hasShieldField] && this[shieldField] > 0;

        if (pierce) {
            if (hasShield) {
                this[shieldField] -= amount;
                if (this[shieldField] <= 0) {
                    this[hasShieldField] = false;
                    if (onBreak) onBreak(particles);
                }
            }
            this._applyBodyDamage(amount, particles);
            return;
        }

        if (hasShield) {
            this[shieldField] -= amount;
            if (this[shieldField] <= 0) {
                const overflow = -this[shieldField]; // sát thương thừa sau khi phá khiên
                this[hasShieldField] = false;
                if (onBreak) onBreak(particles);
                if (overflow > 0) this._applyBodyDamage(overflow, particles);
            }
        } else {
            this._applyBodyDamage(amount, particles);
        }
    }

    // Tìm cây gần nhất phía trước mặt zombie (trong phạm vi cắn)
    // Phạm vi: zombie.x - plant.cx nằm trong khoảng (-40, 40)
    findTarget(plants) {
        let best = null;
        for (const p of plants) {
            if (p.row === this.row && !p.isDead) {
                const dist = this.x - p.cx;
                // dist > -40: cây không quá xa bên phải
                // dist < 40: cây chưa ở sau lưng zombie
                if (dist > -40 && dist < 40 && (!best || p.cx > best.cx)) best = p;
            }
        }
        return best; // cây gần zombie nhất được ưu tiên
    }

    update(dt, plants) {
        this.animTime += dt / 1000;
        if (this.hitFlash > 0) this.hitFlash -= dt / 1000;

        // Đếm ngược hiệu ứng đóng băng / làm lạnh (Ice Lettuce, Snow Pea)
        if (this.frozenTimer > 0) {
            this.frozenTimer -= dt;
            if (this.frozenTimer < 0) this.frozenTimer = 0;
        }
        if (this.chillTimer > 0) {
            this.chillTimer -= dt;
            if (this.chillTimer < 0) this.chillTimer = 0;
        }

        if (this.dying) {
            // Animation ngã: xoay và mờ dần trong 1.2 giây
            this.deathT += dt / 1200;
            if (this.deathT >= 1) this.remove = true; // xóa khỏi game
            return;
        }

        // Đóng băng hoàn toàn → không di chuyển, không tấn công
        if (this.frozen) return;

        const target = this.findTarget(plants);
        if (target) {
            // Vừa chạm cây (chuyển từ đi → ăn) → phát tiếng cắn ngay, không
            // chờ đủ attackRate mới có tiếng đầu tiên (chỉ ảnh hưởng âm
            // thanh, không đổi nhịp gây sát thương thật)
            if (this.state !== 'eating') audioManager.playSFX('bite');
            // Có cây trước mặt → đứng lại tấn công
            this.state = 'eating';
            // Hiệu ứng làm lạnh: tốc độ ăn chậm hơn 50%
            this.eatTimer += this.chilled ? dt * 0.5 : dt;
            if (this.eatTimer >= this.attackRate) {
                this.eatTimer = 0;
                target.takeDamage(this.damage);
                audioManager.playSFX('bite');
            }
        } else {
            // Không có cây → tiếp tục đi
            this.state = 'walking';
            this.eatTimer = 0;
            // Tốc độ giảm 50% khi đang chịu hiệu ứng làm lạnh
            const speedMul = this.chilled ? 0.5 : 1;
            this.x -= this.speed * speedMul * (dt / 16.67);
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
}
