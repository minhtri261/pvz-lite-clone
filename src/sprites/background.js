'use strict';
// ══════════════════════════════════════════════════════════════
//  background.js — Vẽ nền sân cỏ, nhà, lưới và cỏ lắc lư
//
//  drawBackground(ctx, activeRows, hoverCol, hoverRow):
//    activeRows: mảng hàng đang hoạt động — hàng còn lại bị tối + hatch
//    hoverCol/Row: ô đang hover → highlight vàng (đặt cây); -1 = không highlight
// ══════════════════════════════════════════════════════════════

// Tạo sẵn vị trí ngẫu nhiên cho từng cọng cỏ (6 cọng/ô)
// Tính một lần lúc load — không tính lại mỗi frame để tiết kiệm CPU
const GRASS_BLADES = [];
for (let row = 0; row < ROWS; row++) {
    GRASS_BLADES[row] = [];
    for (let col = 0; col < COLS; col++) {
        const b = [];
        for (let i = 0; i < 6; i++)
            b.push({ ox: randFloat(0, CELL_W), h: randFloat(6, 14), lean: randFloat(-0.4, 0.4) });
        GRASS_BLADES[row][col] = b;
    }
}

function drawBackground(ctx, activeRows, hoverCol, hoverRow) {
    // Sky strip
    const sky = ctx.createLinearGradient(0, 0, 0, GY);
    sky.addColorStop(0, '#b0d8f8'); sky.addColorStop(1, '#d4f0c0');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, GY);

    // House wall
    const hw = ctx.createLinearGradient(0, 0, GX, 0);
    hw.addColorStop(0, '#d4a860'); hw.addColorStop(1, '#b88040');
    ctx.fillStyle = hw; ctx.fillRect(0, GY, GX, GRID_H);

    // Wood planks
    ctx.strokeStyle = 'rgba(100,50,0,0.35)'; ctx.lineWidth = 1.5;
    for (let py = GY + 20; py < GRID_BOT; py += 32) {
        ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(GX, py); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(100,60,10,0.5)'; ctx.fillRect(GX - 14, GY, 14, GRID_H);

    // Door
    ctx.fillStyle = '#8B4513'; rr(ctx, 18, GY + GRID_H - 120, 55, 110, 8); ctx.fill();
    ctx.strokeStyle = '#5a2a00'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(68, GY + GRID_H - 64, 5, 0, Math.PI * 2); ctx.fill();

    // Lawn rows
    const LAWN = ['#4caf50', '#45a049', '#4caf50', '#45a049', '#4caf50'];
    for (let row = 0; row < ROWS; row++) {
        ctx.fillStyle = LAWN[row];
        ctx.fillRect(GX, GY + row * CELL_H, GRID_W, CELL_H);
        ctx.fillStyle = 'rgba(0,0,0,0.04)';
        ctx.fillRect(GX, GY + row * CELL_H + CELL_H - 12, GRID_W, 12);
    }

    // Inactive row overlay with hatch marks
    for (let row = 0; row < ROWS; row++) {
        if (!activeRows.includes(row)) {
            ctx.fillStyle = 'rgba(30,15,0,0.55)';
            ctx.fillRect(GX, GY + row * CELL_H, GRID_W, CELL_H);
            ctx.strokeStyle = 'rgba(80,40,0,0.2)'; ctx.lineWidth = 1;
            for (let x2 = GX; x2 < GRID_RIGHT; x2 += 18) {
                ctx.beginPath();
                ctx.moveTo(x2, GY + row * CELL_H);
                ctx.lineTo(x2 + 14, GY + row * CELL_H + CELL_H);
                ctx.stroke();
            }
        }
    }

    // Right strip — nền cỏ tối
    ctx.fillStyle = '#3a7a20';
    ctx.fillRect(GRID_RIGHT, GY, W - GRID_RIGHT, GRID_H);

    // Bụi cây trang trí bên phải — thay cho dải trống xấu
    const BUSH_X = GRID_RIGHT + 51; // tâm dải bên phải
    for (let row = 0; row < ROWS; row++) {
        const baseY = GY + row * CELL_H + CELL_H * 0.52;
        const shift = (row % 2 === 0) ? -6 : 8; // so le hàng chẵn/lẻ

        // Bóng mờ dưới bụi
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.beginPath();
        ctx.ellipse(BUSH_X + 2, baseY + shift + 22, 38, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // 3 khối bụi chồng nhau
        const blobs = [
            { dx: -20, dy: shift + 8,  r: 19, c0: '#3a8a30', c1: '#1d4d14' },
            { dx:   4, dy: shift - 4,  r: 24, c0: '#4aaa3a', c1: '#246018' },
            { dx:  24, dy: shift + 10, r: 17, c0: '#3a8a30', c1: '#1d4d14' },
        ];
        for (const b of blobs) {
            const g = ctx.createRadialGradient(
                BUSH_X + b.dx - b.r * 0.3, baseY + b.dy - b.r * 0.3, b.r * 0.1,
                BUSH_X + b.dx, baseY + b.dy, b.r
            );
            g.addColorStop(0, b.c0);
            g.addColorStop(1, b.c1);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(BUSH_X + b.dx, baseY + b.dy, b.r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Điểm sáng highlight trên bụi
        ctx.fillStyle = 'rgba(130,240,100,0.22)';
        ctx.beginPath();
        ctx.ellipse(BUSH_X - 6, baseY + shift - 10, 9, 5, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(BUSH_X + 18, baseY + shift - 7, 7, 4, 0.4, 0, Math.PI * 2);
        ctx.fill();
    }

    // Bottom strip
    ctx.fillStyle = '#3a7020'; ctx.fillRect(0, GRID_BOT, W, H - GRID_BOT);

    // Grid lines
    ctx.strokeStyle = 'rgba(0,60,0,0.25)'; ctx.lineWidth = 1;
    for (let c = 0; c <= COLS; c++) {
        ctx.beginPath(); ctx.moveTo(GX + c * CELL_W, GY); ctx.lineTo(GX + c * CELL_W, GRID_BOT); ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
        ctx.beginPath(); ctx.moveTo(GX, GY + r * CELL_H); ctx.lineTo(GRID_RIGHT, GY + r * CELL_H); ctx.stroke();
    }

    // Hover highlight
    if (hoverCol >= 0 && hoverRow >= 0 && activeRows.includes(hoverRow)) {
        ctx.fillStyle = 'rgba(255,255,180,0.22)';
        ctx.strokeStyle = 'rgba(255,230,60,0.7)'; ctx.lineWidth = 2;
        rr(ctx, GX + hoverCol * CELL_W + 2, GY + hoverRow * CELL_H + 2, CELL_W - 4, CELL_H - 4, 6);
        ctx.fill(); ctx.stroke();
    }

    // Grass blades (active rows only)
    for (let row = 0; row < ROWS; row++) {
        if (!activeRows.includes(row)) continue;
        for (let col = 0; col < COLS; col++) {
            const bx = GX + col * CELL_W, by = GY + row * CELL_H + CELL_H;
            ctx.strokeStyle = '#2d7a20'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
            for (const bl of GRASS_BLADES[row][col]) {
                ctx.beginPath();
                ctx.moveTo(bx + bl.ox, by);
                ctx.quadraticCurveTo(bx + bl.ox + bl.lean * 8, by - bl.h * 0.6,
                                     bx + bl.ox + bl.lean * 14, by - bl.h);
                ctx.stroke();
            }
        }
    }
}
