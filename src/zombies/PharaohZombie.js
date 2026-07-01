'use strict';
// ══════════════════════════════════════════════════════════════
//  PharaohZombie.js — Zombie Pharaoh (PvZ2-style)
//
//  Hai trạng thái:
//    1. SARCOPHAGUS (quan tài): bọc kín toàn thân, chỉ lộ 2 chân.
//       TẤT CẢ sát thương (đạn thường/ném/xuyên/nổ…) đều trừ thẳng
//       vào sarcophagusHp, KHÔNG có ngoại lệ. Khi quan tài vỡ, sát
//       thương dư bị hủy hoàn toàn — không tràn sang hp thân.
//       Miễn nhiễm mọi hiệu ứng khống chế (slow/freeze/chill…).
//    2. PHARAOH REVEALED: xác ướp lộ ra, nhanh hơn và mạnh hơn.
//
//  Hai lớp HP độc lập: sarcophagusHp = 1200, hp = 300 (tổng 1500).
// ══════════════════════════════════════════════════════════════

class PharaohZombie extends Zombie {
    constructor(row) {
        super('pharaoh', row);
        const def = ZOMBIE_DEFS.pharaoh;
        this.sarcophagusHp  = def.sarcophagusHp; // 1200
        this.hasSarcophagus = true;
        // hp tách biệt khỏi sarcophagusHp — luôn là HP thân xác ướp (300),
        // không cộng dồn vào maxHp như cách Zombie() khởi tạo mặc định
        this.hp     = def.bodyHp;
        this.maxHp  = def.bodyHp;
        this.speed  = def.speed;   // 0.2 — chậm khi còn quan tài
        this.damage = def.damage;  // 100 — đập bằng quan tài
    }

    // Miễn nhiễm mọi hiệu ứng khống chế (đóng băng/làm lạnh/…) khi còn quan tài
    applyFreeze(freezeMs, chillMs) {
        if (this.hasSarcophagus) return;
        super.applyFreeze(freezeMs, chillMs);
    }
    applyChill(chillMs) {
        if (this.hasSarcophagus) return;
        super.applyChill(chillMs);
    }

    // Còn quan tài: TOÀN BỘ sát thương (mọi loại, không ngoại lệ) trừ vào
    // sarcophagusHp. Sát thương dư sau khi quan tài vỡ bị hủy hoàn toàn —
    // không có overflow truyền sang hp thân.
    takeDamage(amount, particles) {
        if (this.dying) return;
        this.hitFlash = 0.1;

        if (this.hasSarcophagus) {
            this.sarcophagusHp -= amount;
            if (this.sarcophagusHp <= 0) {
                this.sarcophagusHp  = 0; // clamp — không cho âm, không tràn sang hp
                this.hasSarcophagus = false;
                this.speed  = ZOMBIE_DEFS.pharaoh.revealSpeed;  // 0.5
                this.damage = ZOMBIE_DEFS.pharaoh.revealDamage; // 200
                spawnSarcophagusBreakParticles(this.x, this.y, particles || []);
            }
            return;
        }

        this._applyBodyDamage(amount, particles);
    }

    get render() {
        if (this.hasSarcophagus) {
            const pct = Math.max(0, this.sarcophagusHp / ZOMBIE_DEFS.pharaoh.sarcophagusHp);
            return {
                // Quan tài che kín từ chân lên quá đỉnh đầu — ẩn hẳn đầu/tay
                drawShieldFn: (ctx, animTime, state) => _drawSarcophagus(ctx, animTime, state, pct),
                drawHeadFn:   () => {},
                drawArmsFn:   () => {},
            };
        }
        return {
            drawOutfitFn: _drawMummyOutfit,
            drawArmsFn:   _drawMummyArms,
            drawHeadFn:   _drawMummyHead,
            drawHatFn:    _drawNemesHat,
        };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
