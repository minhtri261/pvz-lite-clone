'use strict';
// ══════════════════════════════════════════════════════════════
//  BucketZombie.js — Zombie đội xô kim loại
//  HP tổng: 1100 = 900 (xô thép) + 200 (cơ thể)
//
//  Cơ chế giáp: tương tự ConeheadZombie nhưng xô bền hơn nhiều.
//    bucketHp = 900: cần tấn công liên tục mới phá được xô.
//    Khi xô rơi → phần sát thương thừa trừ vào HP cơ thể.
//    Chiến thuật: dùng Cherry Bomb (9999 dmg) để instakill ngay cả xô.
// ══════════════════════════════════════════════════════════════

class BucketZombie extends Zombie {
    constructor(row) {
        super('bucket', row);
        this.bucketHp  = ZOMBIE_DEFS.bucket.bucketHp; // 900
        this.hasBucket = true;
    }

    // Override để xử lý lớp giáp xô (xô → cơ thể)
    takeDamage(amount, particles) {
        this._takeArmoredDamage(amount, particles, 'bucketHp', 'hasBucket');
    }

    get render() {
        return { drawHatFn: this.hasBucket ? _drawBucketHat : null };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
