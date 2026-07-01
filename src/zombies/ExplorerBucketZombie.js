'use strict';
// ══════════════════════════════════════════════════════════════
//  ExplorerBucketZombie.js — Bản nâng cấp của Explorer Zombie,
//  thêm xô thép đội trên đầu (giáp lấy y nguyên từ Buckethead Zombie)
//
//  Ngoại hình + chỉ số y hệt Explorer Zombie (đuốc đốt cây, tốc độ
//  0.4, tắt đuốc vĩnh viễn khi dính lạnh/đóng băng), cộng thêm lớp
//  giáp xô độc lập (bucketHp = 1100) hấp thụ sát thương trước khi
//  rơi — xô rơi thì lộ lại đúng ngoại hình Explorer (mũ khảo cổ).
// ══════════════════════════════════════════════════════════════

class ExplorerBucketZombie extends Zombie {
    constructor(row) {
        super('explorerbucket', row);
        this.torchLit  = true; // còn đuốc cháy → đốt mọi cây trong tầm ăn
        this.burnTimer = 0;
        this.bucketHp  = ZOMBIE_DEFS.explorerbucket.bucketHp; // 1100, lấy y nguyên Buckethead
        this.hasBucket = true;
    }

    // Cơ chế đuốc — y hệt ExplorerZombie (xem ExplorerZombie.js)
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

        this.burnTimer += dt;
        if (this.burnTimer >= ZOMBIE_DEFS.explorerbucket.burnRate) {
            this.burnTimer = 0;
            for (const p of plants) {
                if (p.row === this.row && !p.isDead && (this.x - p.cx) > -20 && (this.x - p.cx) < 58) {
                    p.takeDamage(ZOMBIE_DEFS.explorerbucket.burnDamage);
                }
            }
        }
    }

    // Lớp giáp xô (giống BucketZombie) — xô hấp thụ trước, sát thương dư dồn vào thân
    takeDamage(amount, particles) {
        this._takeArmoredDamage(amount, particles, 'bucketHp', 'hasBucket');
    }

    get render() {
        const lit = this.torchLit;
        return {
            drawOutfitFn: _drawArchaeologistOutfit,
            // Còn xô → xô che kín đầu; xô rơi → lộ lại mũ khảo cổ Explorer
            drawHatFn:    this.hasBucket ? _drawBucketHat : _drawExplorerHat,
            drawArmsFn:   _drawTorchArms,
            drawGearFn:   (ctx, animTime, eatBob) => _drawTorchGear(ctx, animTime, eatBob, lit),
        };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
