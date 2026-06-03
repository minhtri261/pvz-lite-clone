'use strict';
// ══════════════════════════════════════════════════════════════
//  Chomper.js — Bẫy ruồi Vệ Thần: cắn nhiều lần cho đến khi zombie chết
//  Cost: 150 ☀ | HP: 400 | Tầm cắn: 120px (xa gấp đôi)
//
//  Cơ chế mới (khác phiên bản cũ instakill):
//    - Mỗi nhát cắn gây 600 sát thương
//    - Nếu zombie CHẾT sau nhát cắn → tiêu hoá 38 giây
//    - Nếu zombie CÒN SỐNG → đợi 1.5s rồi cắn lại (liên tục)
//    - Zombie vẫn có thể ăn Chomper khi đang tiêu hoá (HP thấp = nguy hiểm)
//
//  Máy trạng thái:
//    ready → biting (400ms) → digesting (38s) → ready
//                          ↘ biteWaiting (1.5s) ↗ (nếu zombie còn sống)
//
//  Ví dụ:
//    - Basic (200 HP):    1 cắn → chết → tiêu hoá
//    - Conehead (560 HP): 1 cắn → chết → tiêu hoá
//    - Bucket (1100 HP):  cắn 1 (600→500 còn) → đợi → cắn 2 (500→chết) → tiêu hoá
//    - Brickhead (1700):  cắn 1→2→3 nhát → chết → tiêu hoá
// ══════════════════════════════════════════════════════════════

class Chomper extends Plant {
    constructor(col, row) {
        super('chomper', col, row);
        this.chompPhase    = 'ready';        // 'ready' | 'biting' | 'biteWaiting' | 'digesting'
        this.chompT        = 0;              // tiến trình animation cắn (0→1)
        this.biteWaitTimer = 0;
        this.digestTimer   = 0;
        this._target       = null;           // zombie đang bị nhắm
        this._damageDone   = false;          // đã gây sát thương nhát này chưa
    }

    update(dt, game) {
        super.update(dt);

        // ── TIÊU HOÁ ──────────────────────────────────────────
        if (this.chompPhase === 'digesting') {
            this.digestTimer += dt;
            if (this.digestTimer >= PLANT_DEFS.chomper.rechargeMs) {
                this.chompPhase  = 'ready';
                this.digestTimer = 0;
            }
            return; // dễ bị ăn trong giai đoạn này!
        }

        // ── ANIMATION CẮN ────────────────────────────────────
        if (this.chompPhase === 'biting') {
            this.chompT += dt / 400; // 400ms hoàn thành

            // Gây sát thương ở đỉnh animation (50%)
            if (!this._damageDone && this.chompT >= 0.5) {
                this._damageDone = true;
                if (this._target && !this._target.dying) {
                    const was = this._target.dying;
                    this._target.takeDamage(PLANT_DEFS.chomper.chompDmg, game.particles);
                    if (!was && this._target.dying) game.zombiesKilled++;
                }
            }

            if (this.chompT >= 1) {
                // Kết thúc animation cắn → kiểm tra zombie còn sống không
                const targetDead = !this._target || this._target.dying || this._target.isDead;
                if (targetDead) {
                    // Zombie chết → bắt đầu tiêu hoá
                    this.chompPhase  = 'digesting';
                    this.digestTimer = 0;
                    this._target     = null;
                } else {
                    // Zombie còn sống → chờ rồi cắn lại
                    this.chompPhase    = 'biteWaiting';
                    this.biteWaitTimer = PLANT_DEFS.chomper.biteInterval;
                    this._damageDone   = false;
                    this.chompT        = 0;
                }
            }
            return;
        }

        // ── CHỜ GIỮA 2 NHÁT CẮN ─────────────────────────────
        if (this.chompPhase === 'biteWaiting') {
            // Mục tiêu đã thoát hoặc chết → quay về ready
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
        // Tầm 120px — có thể với tới zombie trước khi nó chạm Chomper
        for (const z of game.zombies) {
            if (!z.dying && z.row === this.row) {
                const dist = z.x - this.cx;
                if (dist > -20 && dist < PLANT_DEFS.chomper.chompRange) {
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
        drawChomper(ctx, this.cx, this.cy, this.animTime, chomping, this.chompT, digesting);
    }
}
