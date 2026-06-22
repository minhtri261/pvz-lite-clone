'use strict';
// ══════════════════════════════════════════════════════════════
//  TombRaiserZombie.js — Zombie Đào Mộ (PvZ2-style)
//  Mặc đồ khảo cổ giống Explorer Zombie nhưng mặt bị bịt kín bằng
//  khăn đen, chỉ lộ ra 2 con mắt.
//
//  Cơ chế tạo mộ:
//    - Cứ mỗi tombCreateInterval (20s) kể từ lúc spawn, tạo 1 lăng
//      mộ ở ô ngay trước mặt (cùng hàng) — bỏ qua nếu ô đó đã có
//      lăng mộ (chưa bị phá)
//    - Lăng mộ vừa tạo chỉ sinh ra Conehead Zombie, mỗi
//      tombSpawnRateMs (40s)
// ══════════════════════════════════════════════════════════════

class TombRaiserZombie extends Zombie {
    constructor(row) {
        super('tombraiser', row);
        this.tombTimer = 0; // đếm thời gian tới mốc tạo mộ tiếp theo
    }

    update(dt, plants, game) {
        super.update(dt, plants);
        if (this.dying) return;

        const def = ZOMBIE_DEFS.tombraiser;
        this.tombTimer += dt;
        if (this.tombTimer >= def.tombCreateInterval) {
            this.tombTimer -= def.tombCreateInterval;
            this._createTombAhead(game);
        }
    }

    // Tạo lăng mộ ở ô ngay trước mặt (cùng hàng); bỏ qua nếu ô đó đã có mộ
    _createTombAhead(game) {
        if (!game) return;
        const def = ZOMBIE_DEFS.tombraiser;
        const col = clamp(Math.floor((this.x - GX) / CELL_W), 0, COLS - 1);
        const occupied = game.tombs.some(t => !t.dead && t.col === col && t.row === this.row);
        if (occupied) return;
        game.tombs.push(new Tomb(col, this.row, def.tombHp, def.tombSpawnRateMs, def.tombZombieTypes));
    }

    get render() {
        return {
            drawOutfitFn: _drawArchaeologistOutfit,
            drawHeadFn:   _drawTombRaiserHead,
        };
    }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
