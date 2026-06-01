'use strict';
// ══════════════════════════════════════════════════════════════
//  WallNut.js — Quả Óc Chó: tường chắn thụ động
//  Cost: 50 ☀ | HP: 4000 | Cooldown: 30s
//  Không tấn công — chỉ chặn zombie, mặt thay đổi khi bị đánh:
//    HP > 66% → mỉm cười  |  33–66% → bình thường  |  < 33% → lo lắng + chảy nước mắt
// ══════════════════════════════════════════════════════════════

class WallNut extends Plant {
    constructor(col, row) { super('wallnut', col, row); }

    // Không override update() — chỉ dùng logic cơ bản từ Plant (hitFlash + animTime)

    draw(ctx) {
        this.drawHitFlash(ctx);
        // Truyền hpPct để sprite vẽ vết nứt và thay đổi nét mặt theo máu
        drawWallNut(ctx, this.cx, this.cy, this.animTime, this.hpPct);
    }
}
