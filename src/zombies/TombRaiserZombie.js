'use strict';
// ══════════════════════════════════════════════════════════════
//  TombRaiserZombie.js — Zombie Đào Mộ (PvZ2-style)
//  Mặc đồ khảo cổ giống Explorer Zombie nhưng mặt bị bịt kín bằng
//  khăn đen, chỉ lộ ra 2 con mắt.
//
//  Cơ chế tạo mộ:
//    - Cứ mỗi tombCreateInterval (20s) kể từ lúc spawn (hoặc từ lần
//      tạo mộ trước), zombie ĐỨNG LẠI và giơ 2 tay lên trời trong
//      raiseDurationMs (2s) — báo hiệu cho người chơi biết hắn đang
//      làm nghi lễ. Trong lúc này không di chuyển, không ăn.
//    - Hết 2s, lăng mộ xuất hiện ở vị trí lệch ngẫu nhiên ±20px
//      quanh chỗ zombie đang đứng (cùng hàng) — bỏ qua nếu ô đó đã
//      có lăng mộ (chưa bị phá)
//    - Lăng mộ vừa tạo chỉ sinh ra Conehead Zombie, mỗi
//      tombSpawnRateMs (40s)
// ══════════════════════════════════════════════════════════════

class TombRaiserZombie extends Zombie {
    constructor(row) {
        super('tombraiser', row);
        this.tombTimer = 0;     // đếm thời gian tới mốc làm nghi lễ tạo mộ tiếp theo
        this.raising   = false; // đang đứng lại giơ tay làm nghi lễ
        this.raiseT    = 0;     // tiến trình nghi lễ (ms, 0 → raiseDurationMs)
    }

    // Override hoàn toàn — chèn phase "raising" trước mọi logic đi/ăn bình thường
    update(dt, plants, game) {
        this.animTime += dt / 1000;
        if (this.hitFlash > 0) this.hitFlash -= dt / 1000;

        if (this.frozenTimer > 0) {
            this.frozenTimer -= dt;
            if (this.frozenTimer < 0) this.frozenTimer = 0;
        }
        if (this.chillTimer > 0) {
            this.chillTimer -= dt;
            if (this.chillTimer < 0) this.chillTimer = 0;
        }

        if (this.dying) {
            this.deathT += dt / 1200;
            if (this.deathT >= 1) this.remove = true;
            return;
        }

        // Đóng băng hoàn toàn → không di chuyển, không tấn công, không làm nghi lễ
        if (this.frozen) return;

        const def = ZOMBIE_DEFS.tombraiser;

        // ── Phase: đang giơ tay làm nghi lễ — đứng yên, không ăn không đi ──
        if (this.raising) {
            this.state  = 'raising';
            this.raiseT += dt;
            if (this.raiseT >= def.raiseDurationMs) {
                this.raising = false;
                this.raiseT  = 0;
                this._createTombNearby(game);
            }
            return;
        }

        this.tombTimer += dt;
        if (this.tombTimer >= def.tombCreateInterval) {
            this.tombTimer -= def.tombCreateInterval;
            this.raising = true;
            this.raiseT  = 0;
            this.state   = 'raising';
            return; // bỏ qua di chuyển/ăn ngay frame bắt đầu nghi lễ
        }

        const target = this.findTarget(plants);
        if (target) {
            // Vừa chạm cây → phát tiếng cắn ngay, không chờ đủ attackRate
            if (this.state !== 'eating') audioManager.playSFX('bite');
            this.state = 'eating';
            this.eatTimer += this.chilled ? dt * 0.5 : dt;
            if (this.eatTimer >= this.attackRate) {
                this.eatTimer = 0;
                target.takeDamage(this.damage);
                audioManager.playSFX('bite');
            }
        } else {
            this.state    = 'walking';
            this.eatTimer = 0;
            const speedMul = this.chilled ? 0.5 : 1;
            this.x -= this.speed * speedMul * (dt / 16.67);
        }
    }

    // Tạo lăng mộ lệch ngẫu nhiên ±tombOffsetRange px quanh vị trí hiện tại (cùng hàng)
    // Bỏ qua nếu ô đó đã có lăng mộ khác hoặc đã có cây trồng
    _createTombNearby(game) {
        if (!game) return;
        const def      = ZOMBIE_DEFS.tombraiser;
        const offset   = (Math.random() * 2 - 1) * def.tombOffsetRange; // -20..+20
        const targetX  = this.x + offset;
        const col      = clamp(Math.floor((targetX - GX) / CELL_W), 0, COLS - 1);
        const occupied = game.tombs.some(t => !t.dead && t.col === col && t.row === this.row);
        const hasPlant = game.plants.some(p => !p.isDead && p.col === col && p.row === this.row);
        if (occupied || hasPlant) return;
        game.tombs.push(new Tomb(col, this.row, def.tombHp, def.tombSpawnRateMs, def.tombZombieTypes));
    }

    get render() {
        return {
            drawOutfitFn: _drawArchaeologistOutfit,
            drawHeadFn:   _drawTombRaiserHead,
            drawArmsFn:   this.raising
                ? (ctx, animTime) => _drawRaiseArms(ctx, animTime, this.raiseT / ZOMBIE_DEFS.tombraiser.raiseDurationMs)
                : null,
        };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
