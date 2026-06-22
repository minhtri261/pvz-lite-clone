'use strict';
// ══════════════════════════════════════════════════════════════
//  IceCabbage.js — Ice Cabbage: ném bắp cải băng theo vòng cung
//  Fusion: Cabbage + Ice Lettuce | HP: 300 | Ném mỗi 2.5s | Damage: 40/quả
//
//  Giống hệt Cabbage nhưng:
//    - Đạn là bắp cải băng (isIce = true)
//    - Khi hạ cánh, ngoài sát thương AoE còn áp dụng hiệu ứng làm
//      lạnh (chillTimer) lên các zombie trúng đòn — dùng chung cơ
//      chế chill/freeze với Ice Lettuce
// ══════════════════════════════════════════════════════════════

class IceCabbage extends Plant {
    constructor(col, row) {
        super('icecabbage', col, row);
        this.lobTimer  = 0; // đếm thời gian từ lần ném trước
        this.lobAnim   = 0; // > 0 khi đang animation vung tay (0→1→0)
    }

    update(dt, game) {
        super.update(dt);
        this.lobAnim  = Math.max(0, this.lobAnim - dt / 350);
        this.lobTimer += dt;

        if (this.lobTimer >= PLANT_DEFS.icecabbage.fireRate) {
            // Ưu tiên zombie gần nhất trong hàng, nếu không có thì ném vào lăng mộ gần nhất
            const targetX = this.findLobTargetX(game);
            if (targetX !== null) {
                this.lobTimer = 0;
                this.lobAnim  = 1;
                game.projectiles.push(new CabbageProjectile(
                    this.cx + 15, this.cy - 30,
                    targetX, this.row,
                    PLANT_DEFS.icecabbage.damage,
                    true // isIce
                ));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawIceCabbage(ctx, this.cx, this.cy, this.animTime, this.hp / PLANT_DEFS.icecabbage.hp, this.lobAnim);
    }
}
