'use strict';
// ══════════════════════════════════════════════════════════════
//  SunShooter.js — Cây lai PvZ Fusion: tạo sun VÀ bắn đạn vàng
//  Cost: 175 ☀ | HP: 300 | Cooldown: 7.5s
//
//  Đầu trái (Sunflower style):
//    → Sản xuất 25 sun mỗi 30 giây (chậm hơn Sunflower 23s)
//  Đầu phải (Peashooter style, màu vàng):
//    → Bắn đạn vàng mỗi 1.8s (hơi chậm hơn Peashooter)
//    → Đạn vàng không có hiệu ứng đặc biệt (chỉ gây dmg bình thường)
//
//  Chiến thuật: tiết kiệm ô — 1 cây làm việc của 2. Nhưng mỗi chức
//  năng đều yếu hơn cây chuyên biệt → đặt ở giữa hàng làm điểm lai.
// ══════════════════════════════════════════════════════════════

class SunShooter extends Plant {
    constructor(col, row) {
        super('sunshooter', col, row);
        this.sunTimer    = 0;
        this.producePulse = 0;
        this.shootTimer  = 0;
        this.shootAnim   = 0;
    }

    update(dt, game) {
        super.update(dt);

        // ── Sản xuất sun (đầu trái) ─────────────────────────
        this.sunTimer    += dt;
        this.producePulse = Math.max(0, this.producePulse - dt / 1000);
        const sunInterval = PLANT_DEFS.sunshooter.sunInterval * (game.levelDef?.isNight ? 2 : 1);
        if (this.sunTimer >= sunInterval) {
            this.sunTimer    = 0;
            this.producePulse = 0.5;
            game.suns.push(new Sun(this.cx + randFloat(-30, 30), this.cy - 50, false, PLANT_DEFS.sunshooter.sunAmount));
        }

        // ── Bắn đạn vàng (đầu phải) ─────────────────────────
        this.shootAnim = Math.max(0, this.shootAnim - dt / 300);
        this.shootTimer += dt;
        if (this.shootTimer >= PLANT_DEFS.sunshooter.fireRate) {
            if (game.zombies.some(z => z.row === this.row && !z.dying && z.x > this.cx)
             || game.tombs.some(t => !t.dead && t.row === this.row && t.cellX > this.cx)) {
                this.shootTimer = 0;
                this.shootAnim  = 1;
                // isIce=false, isYellow=true → vẽ màu vàng cam
                game.projectiles.push(new Projectile(this.cx + 46, this.cy - 12, this.row, false, true));
            }
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawSunShooter(ctx, this.cx, this.cy, this.animTime, this.shootAnim, this.producePulse > 0);
    }
}
