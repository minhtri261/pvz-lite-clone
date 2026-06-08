'use strict';
// ══════════════════════════════════════════════════════════════
//  CabbageProjectile.js — Bắp cải ném theo vòng cung parabol
//
//  Cabbage-pult nhắm vào zombie gần nhất và ném theo arc.
//  Khi hạ cánh (t ≥ 1) → landed = true → Game xử lý sát thương.
//  Sát thương áp dụng lên tất cả zombie trong vòng 32px ở vị trí đáp.
// ══════════════════════════════════════════════════════════════

class CabbageProjectile {
    constructor(fromX, fromY, toX, row, damage) {
        this.x       = fromX;
        this.y       = fromY;
        this.startX  = fromX;
        this.startY  = fromY;
        this.targetX = toX;
        this.row     = row;
        this.damage  = damage;
        this.isCabbage = true;
        this.dead    = false;
        this.landed  = false;
        this.t       = 0;
        this.spinAngle = Math.random() * Math.PI * 2;

        // Thời gian bay tỉ lệ với khoảng cách, tối thiểu 350ms
        const dist = Math.abs(toX - fromX);
        this.travelMs = Math.max(350, dist * 1.2); // ~0.36 ô/ms
        this.elapsed  = 0;
    }

    update(dt) {
        this.elapsed += dt;
        this.t = Math.min(1, this.elapsed / this.travelMs);

        // Nội suy x tuyến tính, y theo cung sin
        this.x = this.startX + (this.targetX - this.startX) * this.t;
        this.y = this.startY - Math.sin(this.t * Math.PI) * PLANT_DEFS.cabbage.arcHeight;

        // Xoay bắp cải khi bay
        this.spinAngle += dt * 0.006;

        if (this.t >= 1) this.landed = true;
    }

    draw(ctx) {
        drawCabbageLob(ctx, this.x, this.y, this.spinAngle);
    }
}
