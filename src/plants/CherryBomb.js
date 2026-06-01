'use strict';
// ══════════════════════════════════════════════════════════════
//  CherryBomb.js — Quả Anh Đào Bom: nổ khu vực 3×3
//  Cost: 150 ☀ | Cooldown: 50s
//
//  Vòng đời:
//    1. Đặt xuống → ngòi cháy 1.5 giây (fuseTimer tăng dần)
//    2. fuseTimer đạt fuseMs → gọi _explode()
//    3. _explode(): sát thương 9999 mọi zombie trong vùng 3×3
//       và kích hoạt animation nổ (exploding = true)
//    4. explodeT đạt 1.0 → cây chết (dead = true) → bị xóa
// ══════════════════════════════════════════════════════════════

class CherryBomb extends Plant {
    constructor(col, row) {
        super('cherrybomb', col, row);
        this.fuseTimer = 0;      // thời gian ngòi đã cháy (ms)
        this.exploding = false;  // true sau khi nổ
        this.explodeT  = 0;      // tiến trình animation nổ (0→1)
    }

    update(dt, game) {
        super.update(dt);

        if (this.exploding) {
            // Animation vụ nổ tiến dần đến 1.0 rồi cây tự xóa
            this.explodeT += dt / 800;
            if (this.explodeT >= 1) this.dead = true;
            return;
        }

        this.fuseTimer += dt;
        if (this.fuseTimer >= PLANT_DEFS.cherrybomb.fuseMs) {
            this._explode(game);
        }
    }

    _explode(game) {
        this.exploding = true;

        for (const z of game.zombies) {
            if (z.dying) continue;
            // Kiểm tra vùng nổ 3×3:
            //   - Cùng hàng hoặc hàng kề (±1 hàng)
            //   - Trong khoảng ±2 ô theo chiều ngang
            if (Math.abs(z.row - this.row) > 1) continue;
            if (Math.abs(z.x - this.cx) > CELL_W * 2 + 20) continue;

            const wasDying = z.dying;
            z.takeDamage(PLANT_DEFS.cherrybomb.blastDmg, game.particles); // 9999 → instakill
            if (!wasDying && z.dying) game.zombiesKilled++;
        }

        // Phun hạt nổ lớn tại tâm cây
        spawnBigExplosionParticles(this.cx, this.cy - 10, game.particles);
    }

    draw(ctx) {
        // ft = tỉ lệ ngòi đã cháy (0.0 → 1.0) — ảnh hưởng đến vị trí tia lửa
        const ft = this.fuseTimer / PLANT_DEFS.cherrybomb.fuseMs;
        drawCherryBomb(ctx, this.cx, this.cy, this.animTime, ft, this.exploding, this.explodeT);
    }
}
