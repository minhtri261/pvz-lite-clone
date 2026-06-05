'use strict';
// ══════════════════════════════════════════════════════════════
//  NutShroom.js — Nấm Óc Chó (PuffShroom + WallNut fusion)
//  Tường chắn thụ động, nửa trên tím nửa dưới trắng.
//  HP: 2200 | Không tấn công | Stackable 2 per cell
// ══════════════════════════════════════════════════════════════

class NutShroom extends Plant {
    constructor(col, row) { super('nutshroom', col, row); }

    draw(ctx) {
        this.drawHitFlash(ctx);
        const rightHpPct = this.stackCount === 2
            ? Math.max(0, this._rightHp / this.maxHp)
            : this.hpPct;
        drawNutShroom(ctx, this.cx, this.cy, this.animTime, this.hpPct, this.stackCount, rightHpPct);
    }
}
