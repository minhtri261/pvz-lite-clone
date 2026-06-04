'use strict';
// Cọng cỏ ngẫu nhiên (8 cọng/ô)
const GRASS_BLADES = [];
for (let row = 0; row < ROWS; row++) {
    GRASS_BLADES[row] = [];
    for (let col = 0; col < COLS; col++) {
        const b = [];
        for (let i = 0; i < 8; i++)
            b.push({ ox: randFloat(4, CELL_W - 4), h: randFloat(7, 16), lean: randFloat(-0.45, 0.45), shade: randInt(0, 20) });
        GRASS_BLADES[row][col] = b;
    }
}

// Sao trên bầu trời đêm (tính sẵn để không random lại mỗi frame)
const NIGHT_STARS = [];
for (let i = 0; i < 32; i++) {
    NIGHT_STARS.push({
        x: randFloat(5, W - 5),
        y: randFloat(1, GY + 7),
        r: randFloat(0.5, 1.6),
    });
}

function drawBackground(ctx, activeRows, hoverCol, hoverRow, isNight = false) {
    // ── Màu sắc theo ngày/đêm ─────────────────────────────────
    const LAWN_BRIGHT = isNight
        ? ['#2c4e32', '#264828', '#2c4e32', '#264828', '#2c4e32']
        : ['#5cba58', '#52aa4e', '#5cba58', '#52aa4e', '#5cba58'];
    const LAWN_DARK = isNight
        ? ['#1c3420', '#183018', '#1c3420', '#183018', '#1c3420']
        : ['#3a8038', '#348034', '#3a8038', '#348034', '#3a8038'];

    // ── Bầu trời ──────────────────────────────────────────────
    const skyH = GY + 12;
    if (isNight) {
        // Bầu trời đêm: xanh tím đậm
        const sky = ctx.createLinearGradient(0, 0, 0, skyH);
        sky.addColorStop(0, '#04051a');
        sky.addColorStop(1, '#0e0e30');
        ctx.fillStyle = sky; ctx.fillRect(0, 0, W, skyH);
        // Ngôi sao
        for (const s of NIGHT_STARS) {
            ctx.fillStyle = `rgba(240,240,210,${0.5 + s.r * 0.3})`;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
        }
        // Mặt trăng (góc trên phải)
        ctx.fillStyle = '#f0eecc';
        ctx.beginPath(); ctx.arc(W - 52, 5, 12, 0, Math.PI * 2); ctx.fill();
        // Bề mặt trăng
        ctx.fillStyle = 'rgba(180,175,110,0.35)';
        ctx.beginPath(); ctx.arc(W - 46, 2, 4.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(W - 58, 8, 2.5, 0, Math.PI * 2); ctx.fill();
    } else {
        // Bầu trời ngày: xanh dương nhạt
        const sky = ctx.createLinearGradient(0, 0, 0, skyH);
        sky.addColorStop(0,   '#6BBEE0');
        sky.addColorStop(0.55,'#9DD9F0');
        sky.addColorStop(1,   '#d0eecb');
        ctx.fillStyle = sky; ctx.fillRect(0, 0, W, skyH);
    }

    // ── Tường nhà — gạch ──────────────────────────────────────
    const wallTop = isNight ? '#7a5a20' : '#cc9e58';
    const wallBot = isNight ? '#5a3e10' : '#a87838';
    const hw = ctx.createLinearGradient(0, GY, GX, GY + GRID_H);
    hw.addColorStop(0, wallTop); hw.addColorStop(1, wallBot);
    ctx.fillStyle = hw; ctx.fillRect(0, GY, GX, GRID_H);

    // Hoa văn gạch
    const brickLine = isNight ? 'rgba(40,20,0,0.45)' : 'rgba(70,35,5,0.42)';
    const brickFill = isNight ? 'rgba(100,65,15,0.07)' : 'rgba(200,140,60,0.07)';
    const bH = 17, bW = 25;
    ctx.strokeStyle = brickLine; ctx.lineWidth = 1;
    for (let row = 0; row * bH < GRID_H + bH; row++) {
        const by = GY + row * bH;
        if (row % 2 === 0) { ctx.fillStyle = brickFill; ctx.fillRect(0, by, GX, bH); }
        ctx.beginPath(); ctx.moveTo(0, by); ctx.lineTo(GX, by); ctx.stroke();
        const offset = (row % 2) * (bW / 2);
        for (let bx = offset - bW; bx < GX + bW; bx += bW) {
            ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, Math.min(by + bH, GY + GRID_H)); ctx.stroke();
        }
    }

    // Cột gỗ
    const postG = ctx.createLinearGradient(GX - 14, 0, GX, 0);
    postG.addColorStop(0, isNight ? 'rgba(20,10,0,0.8)' : 'rgba(55,25,0,0.75)');
    postG.addColorStop(0.6, isNight ? 'rgba(50,28,0,0.55)' : 'rgba(100,55,10,0.5)');
    postG.addColorStop(1, 'rgba(0,0,0,0.05)');
    ctx.fillStyle = postG; ctx.fillRect(GX - 14, GY, 14, GRID_H);

    // Cửa nhà
    const doorY = GY + GRID_H - 118;
    ctx.fillStyle = isNight ? '#4a1e08' : '#6a2e0c';
    rr(ctx, 16, doorY, 58, 112, 8); ctx.fill();
    ctx.strokeStyle = isNight ? '#28100000' : '#3e1600'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = isNight ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.18)';
    rr(ctx, 22, doorY + 8,  22, 44, 3); ctx.fill();
    rr(ctx, 48, doorY + 8,  22, 44, 3); ctx.fill();
    rr(ctx, 22, doorY + 58, 48, 44, 3); ctx.fill();
    ctx.fillStyle = '#e8c040'; ctx.beginPath(); ctx.arc(69, doorY + 60, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a88000'; ctx.beginPath(); ctx.arc(69, doorY + 60, 3, 0, Math.PI * 2); ctx.fill();

    // Cửa sổ (ngày: sáng, đêm: vàng ấm — đèn bật)
    const winY = GY + 24;
    ctx.fillStyle = isNight ? '#f0d060' : '#b0d8f0';
    rr(ctx, 22, winY, 50, 42, 4); ctx.fill();
    ctx.strokeStyle = isNight ? '#4a2800' : '#5a2800'; ctx.lineWidth = 2.5; ctx.stroke();
    // Ánh sáng hắt ra từ cửa sổ đêm
    if (isNight) {
        const glow = ctx.createRadialGradient(47, winY + 21, 2, 47, winY + 21, 50);
        glow.addColorStop(0, 'rgba(240,200,60,0.18)');
        glow.addColorStop(1, 'rgba(240,200,60,0)');
        ctx.fillStyle = glow; ctx.fillRect(0, GY, GX + 60, GRID_H * 0.4);
    }
    ctx.strokeStyle = isNight ? 'rgba(120,80,0,0.55)' : 'rgba(90,40,0,0.55)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(47, winY); ctx.lineTo(47, winY + 42); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(22, winY + 21); ctx.lineTo(72, winY + 21); ctx.stroke();
    if (!isNight) {
        ctx.fillStyle = 'rgba(255,255,255,0.22)';
        rr(ctx, 24, winY + 2, 21, 17, 2); ctx.fill();
    }

    // ── Hàng cỏ ───────────────────────────────────────────────
    for (let row = 0; row < ROWS; row++) {
        const rowY = GY + row * CELL_H;
        const lg = ctx.createLinearGradient(GX, rowY, GX, rowY + CELL_H);
        lg.addColorStop(0,   LAWN_BRIGHT[row]);
        lg.addColorStop(0.65, LAWN_BRIGHT[row]);
        lg.addColorStop(1,   LAWN_DARK[row]);
        ctx.fillStyle = lg; ctx.fillRect(GX, rowY, GRID_W, CELL_H);
        // Bóng đổ đáy hàng
        const shadow = ctx.createLinearGradient(GX, rowY + CELL_H - 16, GX, rowY + CELL_H);
        shadow.addColorStop(0, 'rgba(0,0,0,0)');
        shadow.addColorStop(1, isNight ? 'rgba(0,0,0,0.22)' : 'rgba(0,0,0,0.14)');
        ctx.fillStyle = shadow; ctx.fillRect(GX, rowY + CELL_H - 16, GRID_W, 16);
    }

    // Hàng không hoạt động
    for (let row = 0; row < ROWS; row++) {
        if (activeRows.includes(row)) continue;
        const rowY = GY + row * CELL_H;
        ctx.fillStyle = isNight ? 'rgba(0,0,0,0.72)' : 'rgba(20,9,2,0.65)';
        ctx.fillRect(GX, rowY, GRID_W, CELL_H);
        ctx.strokeStyle = isNight ? 'rgba(60,30,0,0.22)' : 'rgba(95,50,8,0.22)'; ctx.lineWidth = 1;
        for (let x2 = GX; x2 < GRID_RIGHT; x2 += 20) {
            ctx.beginPath(); ctx.moveTo(x2, rowY); ctx.lineTo(x2 + 15, rowY + CELL_H); ctx.stroke();
        }
    }

    // Dải phải và đáy
    ctx.fillStyle = isNight ? '#1a3020' : '#3a7a20';
    ctx.fillRect(GRID_RIGHT, GY, W - GRID_RIGHT, GRID_H);
    const bottomG = ctx.createLinearGradient(0, GRID_BOT, 0, H);
    bottomG.addColorStop(0, isNight ? '#162a12' : '#2e5a18');
    bottomG.addColorStop(1, isNight ? '#0a1808' : '#1a3408');
    ctx.fillStyle = bottomG; ctx.fillRect(0, GRID_BOT, W, H - GRID_BOT);

    // ── Đường lưới ────────────────────────────────────────────
    ctx.strokeStyle = isNight ? 'rgba(0,60,20,0.30)' : 'rgba(0,45,0,0.28)'; ctx.lineWidth = 1;
    for (let c = 0; c <= COLS; c++) {
        ctx.beginPath(); ctx.moveTo(GX + c * CELL_W, GY); ctx.lineTo(GX + c * CELL_W, GRID_BOT); ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
        ctx.beginPath(); ctx.moveTo(GX, GY + r * CELL_H); ctx.lineTo(GRID_RIGHT, GY + r * CELL_H); ctx.stroke();
    }

    // Hover highlight
    if (hoverCol >= 0 && hoverRow >= 0 && activeRows.includes(hoverRow)) {
        ctx.fillStyle   = 'rgba(255,255,180,0.22)';
        ctx.strokeStyle = 'rgba(255,230,60,0.7)'; ctx.lineWidth = 2;
        rr(ctx, GX + hoverCol * CELL_W + 2, GY + hoverRow * CELL_H + 2, CELL_W - 4, CELL_H - 4, 6);
        ctx.fill(); ctx.stroke();
    }

    // ── Ngọn cỏ ───────────────────────────────────────────────
    for (let row = 0; row < ROWS; row++) {
        if (!activeRows.includes(row)) continue;
        for (let col = 0; col < COLS; col++) {
            const bx = GX + col * CELL_W, by = GY + row * CELL_H + CELL_H;
            ctx.lineCap = 'round';
            for (const bl of GRASS_BLADES[row][col]) {
                const g = isNight
                    ? (40 + bl.shade * 1.5)
                    : (110 + bl.shade + Math.floor(bl.h * 3.5));
                ctx.strokeStyle = isNight
                    ? `rgb(16, ${g}, 18)`
                    : `rgb(22, ${g}, 18)`;
                ctx.lineWidth = 1.2 + (bl.h > 12 ? 0.4 : 0);
                ctx.beginPath();
                ctx.moveTo(bx + bl.ox, by);
                ctx.quadraticCurveTo(bx + bl.ox + bl.lean * 10, by - bl.h * 0.55,
                                     bx + bl.ox + bl.lean * 18, by - bl.h);
                ctx.stroke();
            }
        }
    }
}
