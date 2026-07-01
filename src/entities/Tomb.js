'use strict';
// ══════════════════════════════════════════════════════════════
//  Tomb.js — Lăng Mộ Ai Cập
//
//  - Xuất hiện ở các ô cố định (col, row) được cấu hình per-level
//  - Có HP, bị phá bởi đạn thường và Cabbage-pult
//  - Định kỳ triệu hồi zombie từ bên trong
//  - Chặn đạn tuyến tính (không chặn lob/AoE)
//  - Ô đất có lăng mộ không thể đặt plant cho đến khi bị phá
//
//  Cấu hình per-level (trong level*.js):
//    tombs: [
//      { col, row, hp, spawnRateMs, zombieTypes: ['basic', 'conehead'] }
//    ]
// ══════════════════════════════════════════════════════════════

class Tomb {
    constructor(col, row, hp, spawnRateMs, zombieTypes) {
        this.col          = col;
        this.row          = row;
        this.hp           = hp;
        this.maxHp        = hp;
        this.spawnRateMs  = spawnRateMs;
        this.zombieTypes  = zombieTypes && zombieTypes.length ? zombieTypes : ['basic'];
        // First spawn never happens before spawnRateMs; jitter only delays it further (up to 2x)
        this.spawnTimer   = spawnRateMs * (1.0 + Math.random() * 1.0);
        this.dead         = false;
        this.hitFlash     = 0; // ms remaining for white flash on hit
        this.shakeIntensity = 0; // > 0 → đang bị Grave Buster khoan, rung lắc
    }

    get cellX() { return cx(this.col); }
    get cellY() { return cy(this.row); }

    update(dt, game) {
        if (this.hitFlash > 0) this.hitFlash = Math.max(0, this.hitFlash - dt);

        this.spawnTimer -= dt;
        if (this.spawnTimer <= 0) {
            // Reset timer with ±20% jitter so waves feel organic
            this.spawnTimer = this.spawnRateMs * (0.8 + Math.random() * 0.4);
            this._spawnZombie(game);
        }
    }

    _spawnZombie(game) {
        const type = this.zombieTypes[Math.floor(Math.random() * this.zombieTypes.length)];
        const z = createZombie(type, this.row);
        if (!z) return;
        // Zombie emerges from the tomb position and walks left toward plants
        z.x = this.cellX;
        game.zombies.push(z);
    }

    takeDamage(amount, particles) {
        this.hp = Math.max(0, this.hp - amount);
        this.hitFlash = 140;
        if (particles) spawnHitParticles(this.cellX, this.cellY - 10, particles);
        if (this.hp <= 0) this.dead = true;
    }

    draw(ctx) {
        if (this.dead) return;
        const flash = this.hitFlash > 0 ? Math.min(1, this.hitFlash / 80) : 0;
        // Rung lắc nhẹ khi Grave Buster đang khoan rễ vào lăng mộ
        const jx = this.shakeIntensity > 0 ? (Math.random() - 0.5) * this.shakeIntensity * 2 : 0;
        const jy = this.shakeIntensity > 0 ? (Math.random() - 0.5) * this.shakeIntensity * 2 : 0;
        drawTomb(ctx, this.cellX + jx, this.cellY + jy, this.hp / this.maxHp, flash);
    }
}
