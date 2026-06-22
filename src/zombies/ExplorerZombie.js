'use strict';
// ══════════════════════════════════════════════════════════════
//  ExplorerZombie.js — Zombie Nhà Khảo Cổ (PvZ2-style)
//  HP: 380 | Tốc độ: 0.28 (bằng Basic)
//
//  Cơ chế đuốc:
//    - Khi đuốc còn cháy (torchLit = true): KHÔNG dừng lại để ăn —
//      vừa đi vừa đốt TẤT CẢ cây cùng hàng đang ngáng đường (mọi
//      cây ở phía trước, kể cả còn xa) mỗi burnRate (0.5s), mỗi
//      lần burnDamage (70) → 140 dps mỗi cây, mạnh hơn Basic (100 dps)
//    - Khi dính hiệu ứng làm lạnh hoặc đóng băng (chillTimer/
//      frozenTimer > 0): đuốc tắt VĨNH VIỄN → từ đó hành xử y hệt
//      Basic Zombie (dừng lại, ăn 1 cây/lần, damage=100, attackRate=1000)
// ══════════════════════════════════════════════════════════════

class ExplorerZombie extends Zombie {
    constructor(row) {
        super('explorer', row);
        this.torchLit  = true; // còn đuốc cháy → đốt mọi cây trong tầm ăn
        this.burnTimer = 0;
    }

    update(dt, plants) {
        // Dính lạnh/đóng băng → đuốc tắt vĩnh viễn, từ đây ăn như Basic Zombie
        if (this.torchLit && (this.chillTimer > 0 || this.frozenTimer > 0)) {
            this.torchLit  = false;
            this.burnTimer = 0;
        }

        if (!this.torchLit) {
            super.update(dt, plants);
            return;
        }

        // ── Đuốc còn cháy: vừa đi vừa đốt mọi cây ngáng đường, không dừng lại ăn ──
        this.animTime += dt / 1000;
        if (this.hitFlash > 0) this.hitFlash -= dt / 1000;

        if (this.dying) {
            this.deathT += dt / 1200;
            if (this.deathT >= 1) this.remove = true;
            return;
        }

        this.state = 'walking';
        this.x -= this.speed * (dt / 16.67);

        // Đốt mọi cây cùng hàng đang ở phía trước (chưa đi qua), Có giới hạn khoảng cách
        this.burnTimer += dt;
        if (this.burnTimer >= ZOMBIE_DEFS.explorer.burnRate) {
            this.burnTimer = 0;
            for (const p of plants) {
                if (p.row === this.row && !p.isDead && (this.x - p.cx) > -20 && (this.x - p.cx) < 58) {
                    p.takeDamage(ZOMBIE_DEFS.explorer.burnDamage);
                }
            }
        }
    }

    get render() {
        const lit = this.torchLit;
        return {
            drawOutfitFn: _drawArchaeologistOutfit,
            drawHatFn:    _drawExplorerHat,
            drawArmsFn:   _drawTorchArms,
            drawGearFn:   (ctx, animTime, eatBob) => _drawTorchGear(ctx, animTime, eatBob, lit),
        };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
