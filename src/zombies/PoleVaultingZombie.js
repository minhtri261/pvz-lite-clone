'use strict';
// ══════════════════════════════════════════════════════════════
//  PoleVaultingZombie.js — Zombie cầm sào nhảy qua cây đầu tiên
//  HP: 500 | Tốc độ: 0.35 (nhanh hơn basic)
//
//  Cơ chế vault (nhảy):
//    1. Đang đi bộ, cầm sào (hasVault = true)
//    2. Khi cây đầu tiên vào vùng 0–90px phía trước → bắt đầu vault
//    3. Animation 700ms: zombie bay theo cung, sào xoay, hạ cánh sau cây
//    4. Sau vault: hasVault = false → hành xử như Basic Zombie
//
//  Lưu ý quan trọng:
//    - Chomper CÓ THỂ bắt được Pole Vaulter khi nó đang bay (vì vẫn
//      cùng row và x của zombie vẫn di chuyển qua phạm vi Chomper)
//    - Cherry Bomb diệt được dù đang vault (kiểm tra x theo row)
// ══════════════════════════════════════════════════════════════

class PoleVaultingZombie extends Zombie {
    constructor(row) {
        super('polevaulting', row);
        this.hasVault    = true;   // còn sào
        this.vaulting    = false;  // đang trong animation nhảy
        this.vaultT      = 0;      // tiến trình vault (0→1)
        this.vaultStartX = 0;
        this.vaultEndX   = 0;
        this.vaultBaseY  = cy(row); // y mặt đất của hàng này
    }

    // Override hoàn toàn — xử lý vault trước mọi logic bình thường
    update(dt, plants) {
        this.animTime += dt / 1000;
        if (this.hitFlash  > 0) this.hitFlash  -= dt / 1000;
        if (this.slowTimer > 0) {
            this.slowTimer -= dt;
            if (this.slowTimer <= 0) { this.slowTimer = 0; this.slowed = false; }
        }

        if (this.dying) {
            this.deathT += dt / 1200;
            if (this.deathT >= 1) this.remove = true;
            return;
        }

        // ── Phase: đang bay (vault animation) ─────────────────
        if (this.vaulting) {
            this.vaultT += dt / 700; // 700ms hoàn thành vault
            if (this.vaultT >= 1) {
                this.vaultT  = 1;
                this.x       = this.vaultEndX;
                this.y       = this.vaultBaseY; // hạ cánh về y bình thường
                this.vaulting = false;
                this.hasVault = false;
                this.state   = 'walking';
            } else {
                // Cung parabol: x tuyến tính, y theo sin arc
                this.x = lerp(this.vaultStartX, this.vaultEndX, this.vaultT);
                this.y = this.vaultBaseY - Math.sin(this.vaultT * Math.PI) * 55;
            }
            return;
        }

        // ── Phase: kiểm tra vault trigger ─────────────────────
        // Phạm vi 0–90px: rộng hơn eating range (0–58px) để vault TRƯỚC khi ăn
        if (this.hasVault) {
            for (const p of plants) {
                if (p.row === this.row && !p.isDead) {
                    const dist = this.x - p.cx;
                    if (dist > 0 && dist < 90) {
                        this.vaulting    = true;
                        this.vaultT      = 0;
                        this.vaultStartX = this.x;
                        // Hạ cánh 70% chiều rộng ô sau tâm cây
                        this.vaultEndX   = p.cx - CELL_W * 0.7;
                        this.vaultBaseY  = cy(this.row);
                        this.state       = 'walking';
                        return;
                    }
                }
            }
        }

        // ── Phase: đi bộ / ăn bình thường ─────────────────────
        // Khi hasVault=true, cố tình không ăn (chỉ đi về phía cây để vault)
        const target = this.hasVault ? null : this.findTarget(plants);
        if (target) {
            this.state = 'eating';
            this.eatTimer += dt;
            if (this.eatTimer >= this.attackRate) {
                this.eatTimer = 0;
                target.takeDamage(this.damage);
            }
        } else {
            this.state    = 'walking';
            this.eatTimer = 0;
            this.x -= (this.slowed ? this.speed * 0.45 : this.speed) * (dt / 16.67);
        }
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawPoleVaultingZombie(ctx,
            this.x, this.y, this.animTime,
            this.state, this.hpPct,
            this.hasVault, this.vaulting, this.vaultT,
            this.deathT);
        this.drawSlowOverlay(ctx);
    }
}
