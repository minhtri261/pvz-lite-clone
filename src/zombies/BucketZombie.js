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

    // Override để xử lý lớp giáp xô
    takeDamage(amount, particles) {
        if (this.dying) return;
        this.hitFlash = 0.1;

        if (this.hasBucket && this.bucketHp > 0) {
            this.bucketHp -= amount;
            if (this.bucketHp <= 0) {
                const overflow = -this.bucketHp; // sát thương thừa sau khi phá xô
                this.hasBucket = false;
                this.maxHp     = ZOMBIE_DEFS.basic.maxHp; // đặt lại maxHp về 200
                this.hp        = Math.min(this.hp, this.maxHp);
                // Áp phần sát thương thừa vào HP cơ thể
                if (overflow > 0) {
                    this.hp -= overflow;
                    if (this.hp <= 0) {
                        this.dying = true;
                        this.state = 'dying';
                        spawnDeathParticles(this.x, this.y - 20, particles || []);
                    }
                }
            }
        } else {
            // Xô đã rơi → tấn công trực tiếp vào HP
            this.hp -= amount;
            if (this.hp <= 0) {
                this.dying = true;
                this.state = 'dying';
                spawnDeathParticles(this.x, this.y - 20, particles || []);
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        // hasBucket điều khiển việc vẽ hay không vẽ xô
        drawBucketZombie(ctx, this.x, this.y, this.animTime, this.state, this.hpPct, this.hasBucket, this.deathT);
        this.drawSlowOverlay(ctx);
    }
}
