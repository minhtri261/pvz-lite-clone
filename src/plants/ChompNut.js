'use strict';
// ══════════════════════════════════════════════════════════════
//  ChompNut.js — Chomp-nut (Chomper + Wall-nut fusion)
//  Máu trâu như Wall-nut (4000 HP) + cơ chế ăn thịt giống Chomper.
//  Máy trạng thái cắn giống hệt Chomper — chỉ khác bộ thông số
//  (PLANT_DEFS.chompnut) và hình vẽ (thân Wall-nut, không mắt,
//  miệng Chomper tô màu tím).
// ══════════════════════════════════════════════════════════════

class ChompNut extends Plant {
    constructor(col, row) {
        super('chompnut', col, row);
        this.chompPhase    = 'ready';        // 'ready' | 'biting' | 'biteWaiting' | 'digesting'
        this.chompT        = 0;
        this.biteWaitTimer = 0;
        this.digestTimer   = 0;
        this._target       = null;
        this._damageDone   = false;
    }

    update(dt, game) {
        super.update(dt);
        const def = PLANT_DEFS.chompnut;

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
        drawChompNut(ctx, this.cx, this.cy, this.animTime, this.hpPct, chomping, this.chompT, digesting);
    }
}
