'use strict';
// ══════════════════════════════════════════════════════════════
//  Cabbage.js — Cabbage-pult: ném bắp cải theo vòng cung
//  Cost: 100 ☀ | HP: 300 | Ném mỗi 2.5s | Damage: 40/quả
//
//  Cơ chế:
//    - Nhắm vào zombie gần nhất trong cùng hàng
//    - Bắp cải bay theo parabol arc (CabbageProjectile)
//    - Khi hạ cánh: sát thương tất cả zombie trong vòng 32px
// ══════════════════════════════════════════════════════════════

class Cabbage extends Plant {
    constructor(col, row) {
        super('cabbage', col, row);
        this.lobTimer  = 0; // đếm thời gian từ lần ném trước
        this.lobAnim   = 0; // > 0 khi đang animation vung tay (0→1→0)
    }

    update(dt, game) {
        super.update(dt);
        this.lobAnim  = Math.max(0, this.lobAnim - dt / 350);
        this.lobTimer += dt;

        if (this.lobTimer >= PLANT_DEFS.cabbage.fireRate) {
            // Ưu tiên zombie gần nhất trong hàng
            let nearest = null, bestDist = Infinity;
            for (const z of game.zombies) {
                if (!z.dying && z.row === this.row && z.x > this.cx) {
                    const d = z.x - this.cx;
                    if (d < bestDist) { bestDist = d; nearest = z; }
                }
            }
            // Nếu không có zombie, ném vào lăng mộ gần nhất
            let targetX = nearest ? nearest.x : null;
            if (!nearest) {
                let bestTombDist = Infinity;
                for (const t of game.tombs) {
                    if (!t.dead && t.row === this.row && t.cellX > this.cx) {
                        const d = t.cellX - this.cx;
                        if (d < bestTombDist) { bestTombDist = d; targetX = t.cellX; }
                    }
                }
            }
            if (targetX !== null) {
                this.lobTimer = 0;
                this.lobAnim  = 1;
                game.projectiles.push(new CabbageProjectile(
                    this.cx + 15, this.cy - 30,
                    targetX, this.row,
                    PLANT_DEFS.cabbage.damage
                ));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawCabbage(ctx, this.cx, this.cy, this.animTime, this.hp / PLANT_DEFS.cabbage.hp, this.lobAnim);
    }
}
