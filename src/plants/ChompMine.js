'use strict';
// ══════════════════════════════════════════════════════════════
//  ChompMine.js — Chomp Mine (Chomper + Potato Mine fusion)
//  Ăn thịt zombie giống Chomper, nhưng:
//    - Hồi cắn NHANH hơn Chomper (biteInterval/rechargeMs ngắn hơn)
//    - Khi bị zombie CẮN TRÚNG → phát nổ trong phạm vi 1 ô như Potato Mine
//
//  Cơ chế nổ: override takeDamage() để chặn sát thương và đặt cờ
//  _biteTriggered — xử lý kích nổ ở update() (giống PotatoMine.js,
//  vì takeDamage không có tham chiếu đến `game`).
// ══════════════════════════════════════════════════════════════

class ChompMine extends Plant {
    constructor(col, row) {
        super('chompmine', col, row);
        this.chompPhase     = 'ready';        // 'ready' | 'biting' | 'biteWaiting' | 'digesting'
        this.chompT         = 0;
        this.biteWaitTimer  = 0;
        this.digestTimer    = 0;
        this._target        = null;
        this._damageDone    = false;
        this._biteTriggered = false;          // zombie cắn trúng → kích nổ ở frame tiếp theo
        this.exploding      = false;
        this.explodeT       = 0;
    }

    // Bị zombie ăn → kích nổ ngay thay vì mất máu (giống PotatoMine khi armed)
    takeDamage(amount, particles) {
        if (!this.exploding) {
            this._biteTriggered = true;
        }
    }

    update(dt, game) {
        // Cập nhật thủ công (không gọi Plant.update vì nó không cần giảm HP ở đây)
        this.animTime += dt / 1000;
        if (this.hitFlash > 0) this.hitFlash -= dt / 1000;
        const def = PLANT_DEFS.chompmine;

        // ── ĐANG NỔ ──────────────────────────────────────────
        if (this.exploding) {
            this.explodeT += dt / 600;
            if (this.explodeT >= 1) this.dead = true;
            return;
        }

        // ── BỊ CẮN TRÚNG → KÍCH NỔ ───────────────────────────
        if (this._biteTriggered) {
            this._biteTriggered = false;
            this.exploding      = true;
            this.hitFlash       = 0.15;
            for (const z of game.zombies) {
                if (z.dying || z.row !== this.row) continue;
                if (Math.abs(z.x - this.cx) > def.blastRange) continue;
                const was = z.dying;
                z.takeDamage(def.blastDmg, game.particles);
                if (!was && z.dying) game.zombiesKilled++;
            }
            spawnBigExplosionParticles(this.cx, this.cy - 5, game.particles);
            return;
        }

        // ── TIÊU HOÁ ──────────────────────────────────────────
        if (this.chompPhase === 'digesting') {
            this.digestTimer += dt;
            if (this.digestTimer >= def.rechargeMs) {
                this.chompPhase  = 'ready';
                this.digestTimer = 0;
            }
            return;
        }

        // ── ANIMATION CẮN ────────────────────────────────────
        if (this.chompPhase === 'biting') {
            this.chompT += dt / 400;
            if (!this._damageDone && this.chompT >= 0.5) {
                this._damageDone = true;
                if (this._target && !this._target.dying) {
                    const was = this._target.dying;
                    this._target.takeDamage(def.chompDmg, game.particles);
                    if (!was && this._target.dying) game.zombiesKilled++;
                }
            }
            if (this.chompT >= 1) {
                const targetDead = !this._target || this._target.dying || this._target.isDead;
                if (targetDead) {
                    this.chompPhase  = 'digesting';
                    this.digestTimer = 0;
                    this._target     = null;
                } else {
                    this.chompPhase    = 'biteWaiting';
                    this.biteWaitTimer = def.biteInterval;
                    this._damageDone   = false;
                    this.chompT        = 0;
                }
            }
            return;
        }

        // ── CHỜ GIỮA 2 NHÁT CẮN ─────────────────────────────
        if (this.chompPhase === 'biteWaiting') {
            if (!this._target || this._target.dying || this._target.isDead) {
                this.chompPhase = 'ready';
                this._target    = null;
                return;
            }
            this.biteWaitTimer -= dt;
            if (this.biteWaitTimer <= 0) {
                this.chompPhase  = 'biting';
                this.chompT      = 0;
                this._damageDone = false;
            }
            return;
        }

        // ── READY: tìm zombie trong tầm cắn ─────────────────
        for (const z of game.zombies) {
            if (!z.dying && z.row === this.row) {
                const dist = z.x - this.cx;
                if (dist > -20 && dist < def.chompRange) {
                    this._target     = z;
                    this.chompPhase  = 'biting';
                    this.chompT      = 0;
                    this._damageDone = false;
                    break;
                }
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        const chomping  = this.chompPhase === 'biting';
        const digesting = this.chompPhase === 'digesting';
        drawChompMine(ctx, this.cx, this.cy, this.animTime, chomping, this.chompT, digesting,
                      this.exploding, this.explodeT);
    }
}
