'use strict';
// Tạo sẵn vị trí ngẫu nhiên cho từng cọng cỏ (8 cọng/ô)
const GRASS_BLADES = [];
for (let row = 0; row < ROWS; row++) {
    GRASS_BLADES[row] = [];
    for (let col = 0; col < COLS; col++) {
        const b = [];
        for (let i = 0; i < 8; i++)
            b.push({
                ox:    randFloat(4, CELL_W - 4),
                h:     randFloat(7, 16),
                lean:  randFloat(-0.45, 0.45),
                shade: randInt(0, 20), // biến thể màu sắc
            });
        GRASS_BLADES[row][col] = b;
    }
}

function drawBackground(ctx, activeRows, hoverCol, hoverRow) {
    // ── Bầu trời ──────────────────────────────────────────────
    const sky = ctx.createLinearGradient(0, 0, 0, GY + 10);
    sky.addColorStop(0, '#6BBEE0');   // xanh trời đẹp hơn
    sky.addColorStop(0.55, '#9DD9F0');
    sky.addColorStop(1, '#d0eecb');   // chuyển tiếp sang màu xanh cỏ
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, GY + 10);

    // ── Tường nhà — GẠCH thật sự ──────────────────────────────
    const hw = ctx.createLinearGradient(0, GY, GX, GY + GRID_H);
    hw.addColorStop(0, '#cc9e58');
    hw.addColorStop(1, '#a87838');
    ctx.fillStyle = hw;
    ctx.fillRect(0, GY, GX, GRID_H);

    // Hoa văn gạch (brick pattern)
    const bH = 17, bW = 25; // chiều cao và rộng một viên gạch
    ctx.strokeStyle = 'rgba(70, 35, 5, 0.42)'; ctx.lineWidth = 1;
    for (let row = 0; row * bH < GRID_H + bH; row++) {
        const by = GY + row * bH;
        // Đường vữa ngang
        ctx.beginPath(); ctx.moveTo(0, by); ctx.lineTo(GX, by); ctx.stroke();
        // Đường vữa dọc (so le hàng chẵn/lẻ)
        const offset = (row % 2) * (bW / 2);
        for (let bx = offset - bW; bx < GX + bW; bx += bW) {
            ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, Math.min(by + bH, GY + GRID_H)); ctx.stroke();
        }
        // Màu tô khác nhau từng hàng gạch
        if (row % 2 === 0) {
            ctx.fillStyle = 'rgba(200,140,60,0.07)';
            ctx.fillRect(0, by, GX, bH);
        }
    }

    // Cột gỗ sẫm sát lưới
    const postG = ctx.createLinearGradient(GX - 14, 0, GX, 0);
    postG.addColorStop(0, 'rgba(55,25,0,0.75)');
    postG.addColorStop(0.6, 'rgba(100,55,10,0.5)');
    postG.addColorStop(1, 'rgba(55,25,0,0.1)');
    ctx.fillStyle = postG;
    ctx.fillRect(GX - 14, GY, 14, GRID_H);

    // ── Cửa nhà ────────────────────────────────────────────────
    const doorY = GY + GRID_H - 118;
    ctx.fillStyle = '#6a2e0c';
    rr(ctx, 16, doorY, 58, 112, 8); ctx.fill();
    ctx.strokeStyle = '#3e1600'; ctx.lineWidth = 3; ctx.stroke();
    // Ô cửa trên/dưới
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    rr(ctx, 22, doorY + 8,  22, 44, 3); ctx.fill();
    rr(ctx, 48, doorY + 8,  22, 44, 3); ctx.fill();
    rr(ctx, 22, doorY + 58, 48, 44, 3); ctx.fill();
    // Tay nắm cửa
    ctx.fillStyle = '#e8c040';
    ctx.beginPath(); ctx.arc(69, doorY + 60, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a88000';
    ctx.beginPath(); ctx.arc(69, doorY + 60, 3, 0, Math.PI * 2); ctx.fill();

    // Cửa sổ nhỏ trên tường
    const winY = GY + 24;
    ctx.fillStyle = '#b0d8f0';
    rr(ctx, 22, winY, 50, 42, 4); ctx.fill();
    ctx.strokeStyle = '#5a2800'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.strokeStyle = 'rgba(90,40,0,0.55)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(47, winY); ctx.lineTo(47, winY + 42); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(22, winY + 21); ctx.lineTo(72, winY + 21); ctx.stroke();
    // Phản chiếu sáng cửa sổ
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    rr(ctx, 24, winY + 2, 21, 17, 2); ctx.fill();

    // ── Hàng cỏ (lawn rows) — gradient cho chiều sâu ──────────
    const LAWN_BRIGHT = ['#5cba58', '#52aa4e', '#5cba58', '#52aa4e', '#5cba58'];
    const LAWN_DARK   = ['#3a8038', '#348034', '#3a8038', '#348034', '#3a8038'];
    for (let row = 0; row < ROWS; row++) {
        const rowY = GY + row * CELL_H;
        const lg = ctx.createLinearGradient(GX, rowY, GX, rowY + CELL_H);
        lg.addColorStop(0,   LAWN_BRIGHT[row]);
        lg.addColorStop(0.6, LAWN_BRIGHT[row]);
        lg.addColorStop(1,   LAWN_DARK[row]);
        ctx.fillStyle = lg;
        ctx.fillRect(GX, rowY, GRID_W, CELL_H);

        // Bóng nhẹ ở đáy hàng (chiều sâu giữa các hàng)
        const rowShadow = ctx.createLinearGradient(GX, rowY + CELL_H - 16, GX, rowY + CELL_H);
        rowShadow.addColorStop(0, 'rgba(0,0,0,0)');
        rowShadow.addColorStop(1, 'rgba(0,0,0,0.14)');
        ctx.fillStyle = rowShadow;
        ctx.fillRect(GX, rowY + CELL_H - 16, GRID_W, 16);
    }

    // ── Hàng không hoạt động — đất khô ───────────────────────
    for (let row = 0; row < ROWS; row++) {
        if (activeRows.includes(row)) continue;
        const rowY = GY + row * CELL_H;
        // Lớp tối
        ctx.fillStyle = 'rgba(20,9,2,0.65)';
        ctx.fillRect(GX, rowY, GRID_W, CELL_H);
        // Hoa văn đất
        ctx.strokeStyle = 'rgba(95,50,8,0.22)'; ctx.lineWidth = 1;
        for (let x2 = GX; x2 < GRID_RIGHT; x2 += 20) {
            ctx.beginPath(); ctx.moveTo(x2, rowY); ctx.lineTo(x2 + 15, rowY + CELL_H); ctx.stroke();
        }
        // Đốm sáng đất
        ctx.fillStyle = 'rgba(120,70,20,0.10)';
        for (let dx = GX + 10; dx < GRID_RIGHT; dx += 40) {
            ctx.beginPath();
            ctx.ellipse(dx, rowY + CELL_H * 0.5, 12, 5, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Dải viền mỏng bên phải
    ctx.fillStyle = '#3a7a20';
    ctx.fillRect(GRID_RIGHT, GY, W - GRID_RIGHT, GRID_H);

    // Dải đáy
    const bottomG = ctx.createLinearGradient(0, GRID_BOT, 0, H);
    bottomG.addColorStop(0, '#2e5a18'); bottomG.addColorStop(1, '#1a3408');
    ctx.fillStyle = bottomG;
    ctx.fillRect(0, GRID_BOT, W, H - GRID_BOT);

    // ── Đường lưới ────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(0,45,0,0.28)'; ctx.lineWidth = 1;
    for (let c = 0; c <= COLS; c++) {
        ctx.beginPath();
        ctx.moveTo(GX + c * CELL_W, GY);
        ctx.lineTo(GX + c * CELL_W, GRID_BOT);
        ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
        ctx.beginPath();
        ctx.moveTo(GX, GY + r * CELL_H);
        ctx.lineTo(GRID_RIGHT, GY + r * CELL_H);
        ctx.stroke();
    }

    // Highlight hover (vàng khi đặt cây)
    if (hoverCol >= 0 && hoverRow >= 0 && activeRows.includes(hoverRow)) {
        ctx.fillStyle   = 'rgba(255,255,180,0.22)';
        ctx.strokeStyle = 'rgba(255,230,60,0.7)';
        ctx.lineWidth   = 2;
        rr(ctx, GX + hoverCol * CELL_W + 2, GY + hoverRow * CELL_H + 2, CELL_W - 4, CELL_H - 4, 6);
        ctx.fill(); ctx.stroke();
    }

    // ── Ngọn cỏ (màu biến thể theo shade) ─────────────────────
    for (let row = 0; row < ROWS; row++) {
        if (!activeRows.includes(row)) continue;
        for (let col = 0; col < COLS; col++) {
            const bx = GX + col * CELL_W;
            const by = GY + row * CELL_H + CELL_H;
            ctx.lineCap = 'round';
            for (const bl of GRASS_BLADES[row][col]) {
                const g = 110 + bl.shade + Math.floor(bl.h * 3.5);
                ctx.strokeStyle = `rgb(22, ${g}, 18)`;
                ctx.lineWidth   = 1.2 + (bl.h > 12 ? 0.4 : 0);
                ctx.beginPath();
                ctx.moveTo(bx + bl.ox, by);
                ctx.quadraticCurveTo(
                    bx + bl.ox + bl.lean * 10, by - bl.h * 0.55,
                    bx + bl.ox + bl.lean * 18, by - bl.h
                );
                ctx.stroke();
            }
        }
    }
}
