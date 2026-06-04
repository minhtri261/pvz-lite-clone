'use strict';
// ══════════════════════════════════════════════════════════════
//  plantSprites.js — Hàm vẽ sprite cho 7 loại cây
//
//  Tất cả hàm vẽ đều nhận (ctx, x, y, animTime, ...)
//    x, y: tâm ô trên canvas (tính bằng cx/cy)
//    animTime: giây tích lũy — dùng Math.sin(animTime*k) để tạo hoạt ảnh lắc/nhún
//
//  Kỹ thuật vẽ dùng chung:
//    - ctx.save() / ctx.restore() để cô lập transform
//    - createRadialGradient/createLinearGradient để tạo hiệu ứng 3D
//    - Math.round(x) để tránh sub-pixel blur
// ══════════════════════════════════════════════════════════════

// Hàm hỗ trợ vẽ hình chữ nhật bo góc (giữ nguyên từ code cũ nếu cần)
function rr(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function drawPeashooter(ctx, x, y, animTime, shootT) {
    const bob    = Math.sin(animTime * 2.5) * 2;
    const recoil = Math.sin(shootT * Math.PI) * -7;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng đất nhỏ
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath(); ctx.ellipse(0, 27, 13, 4, 0, 0, Math.PI * 2); ctx.fill();

    // Thân cây — mảnh, nhẹ cong
    ctx.strokeStyle = '#388E3C'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 25); ctx.quadraticCurveTo(2, 10, 1, -1 + bob); ctx.stroke();
    // Highlight thân
    ctx.strokeStyle = 'rgba(185,228,120,0.5)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-1, 22); ctx.quadraticCurveTo(1, 10, 0, -1 + bob); ctx.stroke();

    // Lá trái — nhỏ gọn
    ctx.save(); ctx.translate(-2, 10 + bob * 0.3); ctx.rotate(-0.5);
    ctx.fillStyle = '#558B2F'; ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(-5, 0, 10, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();

    // Lá phải — nhỏ hơn một chút
    ctx.save(); ctx.translate(2, 13 + bob * 0.3); ctx.rotate(0.55);
    ctx.fillStyle = '#558B2F'; ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(5, 0, 8, 3.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();

    // Đầu tròn — nhỏ vừa phải, dễ thương
    const hy = -12 + bob;
    const R  = 19;
    const hg = ctx.createRadialGradient(-R * 0.35, hy - R * 0.35, R * 0.06, 0, hy, R);
    hg.addColorStop(0,    '#C8E69A'); // highlight xanh sáng
    hg.addColorStop(0.32, '#8BC34A'); // xanh lá nhạt
    hg.addColorStop(0.72, '#4CAF50'); // xanh lá vừa
    hg.addColorStop(1,    '#1B5E20'); // viền tối
    ctx.fillStyle = hg; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, hy, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Nòng súng — hình chữ nhật bo góc, đơn giản và sạch
    const bx = Math.round(R * 0.76) + recoil; // ~14px từ tâm đầu
    const bw = 26, bh = 10;
    const bg = ctx.createLinearGradient(bx, hy - bh / 2, bx, hy + bh / 2);
    bg.addColorStop(0,   '#76C442');
    bg.addColorStop(0.5, '#43A047');
    bg.addColorStop(1,   '#2E7D32');
    ctx.fillStyle = bg; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    rr(ctx, bx, hy - bh / 2, bw, bh, 4); ctx.fill(); ctx.stroke();
    // Highlight nhỏ trên nòng
    ctx.fillStyle = 'rgba(200,240,160,0.28)';
    rr(ctx, bx + 2, hy - bh / 2 + 1.5, bw - 6, 3.5, 2); ctx.fill();
    // Đầu nòng — cap tròn với lỗ tối
    ctx.fillStyle = '#33691E'; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bx + bw, hy, bh / 2 + 1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0d2600';
    ctx.beginPath(); ctx.arc(bx + bw, hy, 3.5, 0, Math.PI * 2); ctx.fill();

    // Mắt trái — lớn hơn một chút
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-6, hy - 7, 6.5, 7.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-5.5, hy - 6.5, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white'; // điểm sáng
    ctx.beginPath(); ctx.arc(-4, hy - 9, 1.8, 0, Math.PI * 2); ctx.fill();

    // Mắt phải — nhỏ hơn
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(6, hy - 5, 5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(6.5, hy - 4.5, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(7.5, hy - 7, 1.4, 0, Math.PI * 2); ctx.fill();

    // Miệng cười nhỏ
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(1, hy + 8, 6, 0.4, Math.PI - 0.4); ctx.stroke();

    ctx.restore();
}

function drawSunflower(ctx, x, y, animTime, producing) {
    const sway = Math.sin(animTime * 1.3) * 5;
    const bob  = Math.sin(animTime * 2.6) * 2;
    const sc   = producing ? 1 + Math.sin(animTime * 8) * 0.06 : 1;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(sway * 0.4, 30, 19, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#388E3C'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 29); ctx.quadraticCurveTo(sway * 0.5, 8, sway, -8 + bob); ctx.stroke();

    ctx.save(); ctx.translate(sway, -8 + bob); ctx.scale(sc, sc);
    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + animTime * 0.25;
        ctx.save(); ctx.rotate(a);
        const pg = ctx.createLinearGradient(0, -30, 0, -18);
        pg.addColorStop(0, '#FFF176'); pg.addColorStop(1, '#FDD835');
        ctx.fillStyle = pg; ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(0, -22, 6.5, 13, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    }
    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + Math.PI / 8 + animTime * 0.25;
        ctx.save(); ctx.rotate(a);
        ctx.fillStyle = '#FFCA28'; ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(0, -18, 5, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    }
    const cg = ctx.createRadialGradient(-4, -5, 2, 0, 0, 16);
    cg.addColorStop(0, '#A1887F'); cg.addColorStop(0.6, '#935743'); cg.addColorStop(1, '#8a6237');
    ctx.fillStyle = cg; ctx.strokeStyle = '#966330'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#8a6237';
    for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; ctx.beginPath(); ctx.arc(Math.cos(a) * 8, Math.sin(a) * 8, 2.2, 0, Math.PI * 2); ctx.fill(); }
    for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2 + 0.3; ctx.beginPath(); ctx.arc(Math.cos(a) * 4.5, Math.sin(a) * 4.5, 1.8, 0, Math.PI * 2); ctx.fill(); }

    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-5, -3, 3.8, 4.8, 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(5, -3, 3.8, 4.8, -0.1, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1A237E';
    ctx.beginPath(); ctx.arc(-4, -2, 2.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(6, -2, 2.3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(-3.2, -3.8, 1.1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(6.8, -3.8, 1.1, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#3E2723'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 2, 8, 0.25, Math.PI - 0.25); ctx.stroke();

    ctx.restore(); ctx.restore();
}

function drawWallNut(ctx, x, y, animTime, hpPct) {
    const hitShake = hpPct < 0.5 ? Math.sin(animTime * 18) * 1.5 : 0;
    ctx.save(); ctx.translate(Math.round(x + hitShake), Math.round(y));

    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(0, 30, 22, 7, 0, 0, Math.PI * 2); ctx.fill();

    const wg = ctx.createRadialGradient(-9, -10, 3, 0, 0, 30);
    wg.addColorStop(0, '#D2A060'); wg.addColorStop(0.55, '#A0522D'); wg.addColorStop(1, '#5C2A08');
    ctx.fillStyle = wg; ctx.strokeStyle = '#3E1A00'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(0, 0, 27, 29, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.strokeStyle = 'rgba(62,26,0,0.65)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, -27); ctx.bezierCurveTo(4, -14, 4, 14, 0, 27); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-14, -24); ctx.bezierCurveTo(-12, -10, -11, 10, -14, 23); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, -24); ctx.bezierCurveTo(12, -10, 11, 10, 14, 23); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-23, 2); ctx.bezierCurveTo(-10, 5, 10, 5, 23, 2); ctx.stroke();

    if (hpPct < 0.66) {
        ctx.strokeStyle = 'rgba(60,20,0,0.9)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-6, -22); ctx.lineTo(-2, -14); ctx.lineTo(-9, -6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-20, 4); ctx.lineTo(-10, 8); ctx.lineTo(-15, 15); ctx.stroke();
    }
    if (hpPct < 0.33) {
        ctx.strokeStyle = 'rgba(60,20,0,0.95)'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(8, -20); ctx.lineTo(4, -10); ctx.lineTo(11, -2); ctx.lineTo(6, 6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(16, 10); ctx.lineTo(8, 16); ctx.stroke();
    }

    const browTilt = hpPct > 0.5 ? 0 : -0.45 * (1 - hpPct * 2);
    ctx.strokeStyle = '#5C2A08'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.save(); ctx.translate(-8, -12); ctx.rotate(browTilt + 0.2);
    ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(5, 0); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(8, -12); ctx.rotate(-browTilt - 0.2);
    ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(5, 0); ctx.stroke(); ctx.restore();

    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-8, -5, 5, 6.5, browTilt, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(8, -5, 5, 6.5, -browTilt, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1A237E';
    ctx.beginPath(); ctx.arc(-7, -4, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(9, -4, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(-6, -6, 1.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(10, -6, 1.4, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#3E1A00'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    if (hpPct > 0.66)      { ctx.beginPath(); ctx.arc(0, 4, 8, 0.25, Math.PI - 0.25); ctx.stroke(); }
    else if (hpPct > 0.33) { ctx.beginPath(); ctx.moveTo(-7, 10); ctx.lineTo(7, 10); ctx.stroke(); }
    else {
        ctx.beginPath(); ctx.arc(0, 16, 8, Math.PI + 0.3, -0.3); ctx.stroke();
        ctx.fillStyle = 'rgba(100,180,255,0.8)';
        ctx.beginPath(); ctx.ellipse(18, -2, 4, 7, -0.3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
}

function drawCherryBomb(ctx, x, y, animTime, fuseT, exploding, explodeT) {
    if (exploding) {
        ctx.save(); ctx.translate(Math.round(x), Math.round(y) - 10);
        ctx.globalAlpha = Math.max(0, 1 - explodeT * 1.5);
        ctx.strokeStyle = '#FFF9C4'; ctx.lineWidth = 10 * (1 - explodeT);
        ctx.beginPath(); ctx.arc(0, 0, explodeT * 130, 0, Math.PI * 2); ctx.stroke();
        const fg = ctx.createRadialGradient(0, 0, 0, 0, 0, explodeT * 100);
        fg.addColorStop(0, 'rgba(255,255,200,0.95)');
        fg.addColorStop(0.3, 'rgba(255,140,0,0.85)');
        fg.addColorStop(1, 'rgba(180,0,0,0)');
        ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(0, 0, explodeT * 100, 0, Math.PI * 2); ctx.fill();
        ctx.restore(); return;
    }
    const shake = fuseT > 0.6 ? Math.sin(animTime * 30) * (fuseT - 0.6) * 6 : 0;
    const sc = 1 + Math.sin(animTime * (3 + fuseT * 8)) * 0.04;
    ctx.save(); ctx.translate(Math.round(x + shake), Math.round(y)); ctx.scale(sc, sc);

    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(0, 20, 18, 5, 0, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(5, -28); ctx.quadraticCurveTo(18, -40, 12, -52); ctx.stroke();

    const spX = lerp(5, 12, fuseT), spY = lerp(-28, -52, fuseT);
    ctx.fillStyle = `rgba(255,${Math.floor(200 * (1 - fuseT))},0,0.4)`;
    ctx.beginPath(); ctx.arc(spX, spY, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.arc(spX, spY, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white';   ctx.beginPath(); ctx.arc(spX, spY, 2, 0, Math.PI * 2); ctx.fill();

    const lcg = ctx.createRadialGradient(-10, -16, 2, -8, -12, 14);
    lcg.addColorStop(0, '#FF8A80'); lcg.addColorStop(0.5, '#D32F2F'); lcg.addColorStop(1, '#7F0000');
    ctx.fillStyle = lcg; ctx.strokeStyle = '#5a0000'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(-10, -10, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    const rcg = ctx.createRadialGradient(10, -14, 2, 10, -10, 14);
    rcg.addColorStop(0, '#FF8A80'); rcg.addColorStop(0.5, '#D32F2F'); rcg.addColorStop(1, '#7F0000');
    ctx.fillStyle = rcg; ctx.strokeStyle = '#5a0000'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(10, -7, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.strokeStyle = '#4CAF50'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-10, -24); ctx.quadraticCurveTo(-5, -32, 5, -28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, -21); ctx.quadraticCurveTo(8, -30, 5, -28); ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.beginPath(); ctx.ellipse(-13, -15, 4.5, 3, 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(7, -12, 4.5, 3, 0.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#5C0000';
    ctx.beginPath(); ctx.arc(-13, -10, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-6, -10, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#5C0000'; ctx.lineWidth = 2;
    if (fuseT < 0.5) { ctx.beginPath(); ctx.arc(-9, -5, 4, 0.2, Math.PI - 0.2); ctx.stroke(); }
    else             { ctx.beginPath(); ctx.arc(-9, -3, 4, Math.PI + 0.3, -0.3); ctx.stroke(); }

    ctx.restore();
}

function drawSnowPea(ctx, x, y, animTime, shootT) {
    const bob = Math.sin(animTime * 2.8) * 2.5;
    const recoil = Math.sin(shootT * Math.PI) * -10;
    const leafSway = Math.sin(animTime * 1.6) * 0.08;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.beginPath(); ctx.ellipse(2, 30, 20, 6, 0, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#0097A7'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 29); ctx.quadraticCurveTo(3, 14, 0, 2 + bob); ctx.stroke();

    ctx.save(); ctx.translate(-4, 8 + bob * 0.4); ctx.rotate(-0.45 + leafSway);
    ctx.fillStyle = '#00BCD4'; ctx.strokeStyle = '#006064'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(-7, 0, 13, 5.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(4, 12 + bob * 0.4); ctx.rotate(0.55 - leafSway);
    ctx.fillStyle = '#00BCD4'; ctx.strokeStyle = '#006064'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(7, 0, 11, 4.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();

    const hy = -8 + bob;
    const hg = ctx.createRadialGradient(-7, hy - 10, 3, 0, hy, 25);
    hg.addColorStop(0, '#E0F7FA'); hg.addColorStop(0.45, '#00BCD4'); hg.addColorStop(1, '#006064');
    ctx.fillStyle = hg; ctx.strokeStyle = '#004D40'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, hy, 23, 26, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,0.65)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + animTime * 0.6;
        ctx.save(); ctx.translate(Math.cos(a) * 10, hy + Math.sin(a) * 10); ctx.rotate(a);
        ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(4, 0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(0, 4); ctx.stroke();
        ctx.restore();
    }

    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.ellipse(-7, hy - 6, 7, 8.5, 0.15, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#006064'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#1A237E'; ctx.beginPath(); ctx.ellipse(-5, hy - 5, 4.5, 5.5, 0.15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.beginPath(); ctx.arc(-4, hy - 8, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#006064'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(3, hy + 8, 9, 0.3, Math.PI - 0.3); ctx.stroke();

    const bx = 16 + recoil;
    const bbg = ctx.createLinearGradient(bx, hy - 6, bx, hy + 6);
    bbg.addColorStop(0, '#80DEEA'); bbg.addColorStop(1, '#006064');
    ctx.fillStyle = bbg; ctx.strokeStyle = '#006064'; ctx.lineWidth = 2;
    rr(ctx, bx, hy - 6, 30, 12, 5); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#00838F'; ctx.strokeStyle = '#006064'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bx + 30, hy, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#006064'; ctx.beginPath(); ctx.arc(bx + 31, hy, 3.5, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
}

// ── Potato Mine ────────────────────────────────────────────────
// armed=false → lúc mới đặt, đang kích hoạt (zombie có thể ăn)
// armed=true  → đã sẵn sàng, zombie bước lên → nổ tức thì
// exploding   → hiệu ứng nổ nhỏ (sau khi nổ cây biến mất)
function drawPotatoMine(ctx, x, y, animTime, armed, exploding, explodeT) {
    if (exploding) {
        ctx.save(); ctx.translate(Math.round(x), Math.round(y) - 5);
        ctx.globalAlpha = Math.max(0, 1 - explodeT * 1.6);
        ctx.strokeStyle = '#FFF9C4'; ctx.lineWidth = 6 * (1 - explodeT);
        ctx.beginPath(); ctx.arc(0, 0, explodeT * 80, 0, Math.PI * 2); ctx.stroke();
        const fg = ctx.createRadialGradient(0, 0, 0, 0, 0, explodeT * 60);
        fg.addColorStop(0, 'rgba(255,240,160,0.95)');
        fg.addColorStop(0.3, 'rgba(255,100,0,0.8)');
        fg.addColorStop(1, 'rgba(180,0,0,0)');
        ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(0, 0, explodeT * 60, 0, Math.PI * 2); ctx.fill();
        ctx.restore(); return;
    }

    const bob = armed ? Math.sin(animTime * 4.5) * 2 : 0;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng + ụ đất
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(1, 24, 20, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#6B4818';
    ctx.beginPath(); ctx.ellipse(0, 20, 18, 7, 0, 0, Math.PI * 2); ctx.fill();

    // Thân khoai — nổi cao hơn khi đã kích hoạt
    const bodyY = armed ? 6 + bob : 14;
    const bodyR = armed ? 17 : 12;
    const bg = ctx.createRadialGradient(-bodyR * 0.35, bodyY - bodyR * 0.4, bodyR * 0.08, 0, bodyY, bodyR + 4);
    bg.addColorStop(0, armed ? '#F0D888' : '#C8A858');
    bg.addColorStop(0.55, armed ? '#C09020' : '#9A7010');
    bg.addColorStop(1, '#5A3808');
    ctx.fillStyle = bg; ctx.strokeStyle = '#3E2200'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, bodyY, bodyR, bodyR + 2, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    if (armed) {
        // 3 gai nhọn trên đầu khi đã kích hoạt
        ctx.fillStyle = '#7a5010'; ctx.strokeStyle = '#3E2200'; ctx.lineWidth = 1.5;
        [-7, 0, 7].forEach(sx => {
            ctx.beginPath();
            ctx.moveTo(sx, bodyY - bodyR);
            ctx.lineTo(sx - 4, bodyY - bodyR - 13);
            ctx.lineTo(sx + 4, bodyY - bodyR - 13);
            ctx.closePath(); ctx.fill(); ctx.stroke();
        });
        // Mặt tức giận
        ctx.fillStyle = 'white';
        ctx.beginPath(); ctx.ellipse(-6, bodyY - 3, 4.5, 5, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(6, bodyY - 3, 4.5, 5, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#1a0000';
        ctx.beginPath(); ctx.arc(-5, bodyY - 2, 2.8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(7, bodyY - 2, 2.8, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#3E2200'; ctx.lineWidth = 2; ctx.lineCap = 'round';
        // Lông mày cau lại (nghiêng vào trong)
        ctx.beginPath(); ctx.moveTo(-10, bodyY - 10); ctx.lineTo(-2, bodyY - 8); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(10, bodyY - 10); ctx.lineTo(2,  bodyY - 8); ctx.stroke();
        // Miệng cau có
        ctx.beginPath(); ctx.arc(0, bodyY + 6, 5, Math.PI + 0.3, -0.3); ctx.stroke();
    } else {
        // Mặt buồn ngủ khi chưa kích hoạt
        ctx.strokeStyle = '#3E2200'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(-5, bodyY); ctx.lineTo(-1, bodyY - 1); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(3,  bodyY); ctx.lineTo(7,  bodyY - 1); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, bodyY + 5, 4, 0.2, Math.PI - 0.2); ctx.stroke();
        // Chớp sáng cam báo đang kích hoạt
        if (Math.sin(animTime * 5) > 0.2) {
            ctx.fillStyle = '#FF8800';
            ctx.beginPath(); ctx.arc(12, bodyY - 12, 3.5, 0, Math.PI * 2); ctx.fill();
        }
    }

    ctx.restore();
}

// ── Chomper ────────────────────────────────────────────────────
// Thiết kế lại theo PvZ gốc: hai hàm (jaw) mở ra như bẫy ruồi
// chomping=true  → animation há miệng (chompT 0→1)
// recharging=true→ đang tiêu hoá — mắt lim dim, miệng hé nhẹ
function drawChomper(ctx, x, y, animTime, chomping, chompT, recharging) {
    const bob = chomping ? 0 : Math.sin(animTime * 2.2) * 2;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng rộng
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.beginPath(); ctx.ellipse(0, 32, 22, 6.5, 0, 0, Math.PI * 2); ctx.fill();

    // Thân cây — tím dày
    ctx.strokeStyle = '#7B1FA2'; ctx.lineWidth = 11; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 30); ctx.quadraticCurveTo(2, 14, 1, 4 + bob); ctx.stroke();
    ctx.strokeStyle = 'rgba(225,190,235,0.35)'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-1, 28); ctx.quadraticCurveTo(1, 14, 0, 4 + bob); ctx.stroke();

    // Lá lớn trái phải (phong cách PvZ gốc — lá oval rộng)
    [[-1, 0.72], [1, -0.72]].forEach(([s, ang]) => {
        ctx.save();
        ctx.translate(s * 7, 14 + bob * 0.4); ctx.rotate(ang);
        const lg = ctx.createRadialGradient(s * 12, -2, 2, s * 10, 0, 20);
        lg.addColorStop(0, '#81C784'); lg.addColorStop(1, '#2E7D32');
        ctx.fillStyle = lg; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(s * 12, 0, 20, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(s * 24, 0); ctx.stroke();
        ctx.restore();
    });
    // Lá nhỏ giữa
    ctx.save(); ctx.translate(0, 6 + bob * 0.5);
    ctx.fillStyle = '#4CAF50'; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5;
    [-1, 1].forEach(s => {
        ctx.save(); ctx.rotate(s * 0.45);
        ctx.beginPath(); ctx.ellipse(s * 8, -4, 11, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.restore();
    });
    ctx.restore();

    // ── ĐẦU (hai hàm trên/dưới tách rời — giống PvZ gốc) ────────
    const headY  = -10 + bob;
    const headRx = 30, headRy = 27; // kích thước đầu lớn hơn

    // Tính độ há miệng (0=khép, 1=há tối đa)
    let openAmt;
    if (chomping)       openAmt = Math.sin(chompT * Math.PI);
    else if (recharging) openAmt = 0.03 + Math.sin(animTime * 4) * 0.02;
    else                openAmt = 0.05 + Math.sin(animTime * 2.2) * 0.03;

    const upperLift = openAmt * headRy * 0.9; // hàm trên nhấc lên
    const lowerDrop = openAmt * headRy * 0.38; // hàm dưới hạ xuống
    const toothH    = Math.min(13, openAmt * 32); // chiều dài răng

    // Interior (lợi + họng, hiện khi há)
    if (openAmt > 0.02) {
        ctx.fillStyle = '#D81B60'; // lợi hồng đỏ
        ctx.beginPath();
        ctx.ellipse(0, headY - upperLift * 0.3 + lowerDrop * 0.3,
                    headRx * 0.88, (upperLift + lowerDrop) * 0.5 + 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#880E4F'; // họng sâu hơn
        ctx.beginPath();
        ctx.ellipse(0, headY - upperLift * 0.12 + lowerDrop * 0.12,
                    headRx * 0.5, (upperLift + lowerDrop) * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1a0010'; // tối nhất ở đáy họng
        ctx.beginPath();
        ctx.ellipse(0, headY, headRx * 0.2, (upperLift + lowerDrop) * 0.14 + 1, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // ── HÀM DƯỚI (vẽ trước để hàm trên đè lên) ──────────────────
    ctx.save();
    ctx.translate(0, headY + lowerDrop);
    const ljg = ctx.createRadialGradient(-headRx * 0.1, headRy * 0.35, 2, 0, 0, headRx + 2);
    ljg.addColorStop(0, '#CE93D8'); ljg.addColorStop(0.45, '#9C27B0'); ljg.addColorStop(1, '#4A148C');
    ctx.fillStyle = ljg; ctx.strokeStyle = '#38006b'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, 0, headRx, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
    // Răng dưới (4 chiếc, chỉa lên)
    if (toothH > 1) {
        ctx.fillStyle = '#F8F8F8'; ctx.strokeStyle = '#CCC'; ctx.lineWidth = 1;
        [-19, -7, 5, 17].forEach(tx => {
            ctx.beginPath(); ctx.moveTo(tx-4,0); ctx.lineTo(tx+4,0); ctx.lineTo(tx,-toothH*0.85); ctx.closePath(); ctx.fill(); ctx.stroke();
        });
    }
    ctx.restore();

    // ── HÀM TRÊN ─────────────────────────────────────────────────
    ctx.save();
    ctx.translate(0, headY - upperLift);
    const ujg = ctx.createRadialGradient(-headRx * 0.35, -headRy * 0.35, 2, 0, 0, headRx + 2);
    ujg.addColorStop(0, '#EA80FC'); ujg.addColorStop(0.3, '#BA68C8'); ujg.addColorStop(0.75, '#7B1FA2'); ujg.addColorStop(1, '#4A148C');
    ctx.fillStyle = ujg; ctx.strokeStyle = '#38006b'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, 0, headRx, Math.PI, 0, false); ctx.closePath(); ctx.fill(); ctx.stroke();
    // Răng trên (5 chiếc, chỉa xuống — lớn hơn răng dưới)
    if (toothH > 1) {
        ctx.fillStyle = '#FFFFFF'; ctx.strokeStyle = '#CCC'; ctx.lineWidth = 1;
        [-22, -11, 0, 11, 22].forEach(tx => {
            ctx.beginPath(); ctx.moveTo(tx-4.5,0); ctx.lineTo(tx+4.5,0); ctx.lineTo(tx,toothH); ctx.closePath(); ctx.fill(); ctx.stroke();
        });
    }
    // Mắt trên hàm trên
    const eyeScY = recharging ? 0.32 : 1.0;
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-14, -11, 8, 9 * eyeScY, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(10, -9, 6.5, 7.5 * eyeScY, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#4A148C'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-13, -10, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(11, -8, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(-11, -14, 2.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(13, -11, 1.7, 0, Math.PI * 2); ctx.fill();
    if (recharging) {
        ctx.fillStyle = '#8E24AA';
        ctx.beginPath(); ctx.ellipse(-14, -14, 9, 5.5, 0, Math.PI, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(10, -12, 7.5, 4.5, 0, Math.PI, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // Dots tiêu hoá (nhấp nháy trên đầu)
    if (recharging) {
        const p = animTime % 0.9;
        [0, 0.3, 0.6].forEach((off, i) => {
            const a = Math.max(0, Math.sin((p - off) * Math.PI / 0.3));
            ctx.globalAlpha = a * 0.85;
            ctx.fillStyle = '#CE93D8';
            ctx.beginPath(); ctx.arc(-8 + i * 8, headY - upperLift - headRy - 12, 4, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    ctx.restore();
}

// ── Repeater ───────────────────────────────────────────────────
// Bắn 2 viên đạn liên tiếp (burst), mỗi burst cách nhau 150ms
// shootAnim1: giật nòng trên | shootAnim2: giật nòng dưới
function drawRepeater(ctx, x, y, animTime, shootAnim1, shootAnim2) {
    const bob    = Math.sin(animTime * 2.5) * 2;
    const rc1    = Math.sin(shootAnim1 * Math.PI) * -8; // recoil nòng trên
    const rc2    = Math.sin(shootAnim2 * Math.PI) * -8; // recoil nòng dưới
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 28, 14, 4.5, 0, 0, Math.PI * 2); ctx.fill();

    // Thân cây
    ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 26); ctx.quadraticCurveTo(2, 10, 1, -2 + bob); ctx.stroke();
    ctx.strokeStyle = 'rgba(185,228,120,0.45)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-1, 23); ctx.quadraticCurveTo(1, 10, 0, -2 + bob); ctx.stroke();

    // Lá trái
    ctx.save(); ctx.translate(-2, 10 + bob * 0.3); ctx.rotate(-0.5);
    ctx.fillStyle = '#558B2F'; ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(-5, 0, 10, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
    // Lá phải
    ctx.save(); ctx.translate(2, 13 + bob * 0.3); ctx.rotate(0.55);
    ctx.fillStyle = '#558B2F'; ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(5, 0, 8, 3.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();

    // Đầu tròn — xanh đậm hơn Peashooter (nòng kép)
    const hy = -12 + bob;
    const R  = 20;
    const hg = ctx.createRadialGradient(-R * 0.32, hy - R * 0.32, R * 0.05, 0, hy, R);
    hg.addColorStop(0, '#AED581'); hg.addColorStop(0.3, '#7CB342');
    hg.addColorStop(0.75, '#4CAF50'); hg.addColorStop(1, '#1B5E20');
    ctx.fillStyle = hg; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, hy, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Nòng trên
    const bxBase = Math.round(R * 0.76);
    const barGrad = ctx.createLinearGradient(bxBase, hy - 11, bxBase, hy);
    barGrad.addColorStop(0, '#66BB6A'); barGrad.addColorStop(0.5, '#43A047'); barGrad.addColorStop(1, '#2E7D32');
    ctx.fillStyle = barGrad; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    rr(ctx, bxBase + rc1, hy - 11, 24, 9, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#33691E'; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bxBase + rc1 + 24, hy - 6.5, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0d2600'; ctx.beginPath(); ctx.arc(bxBase + rc1 + 24, hy - 6.5, 3.5, 0, Math.PI * 2); ctx.fill();

    // Nòng dưới
    const barGrad2 = ctx.createLinearGradient(bxBase, hy + 1, bxBase, hy + 10);
    barGrad2.addColorStop(0, '#558B2F'); barGrad2.addColorStop(0.5, '#388E3C'); barGrad2.addColorStop(1, '#2E7D32');
    ctx.fillStyle = barGrad2; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    rr(ctx, bxBase + rc2, hy + 1, 24, 9, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#2E7D32'; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bxBase + rc2 + 24, hy + 5.5, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0d2600'; ctx.beginPath(); ctx.arc(bxBase + rc2 + 24, hy + 5.5, 3.5, 0, Math.PI * 2); ctx.fill();

    // Mắt trái
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-7, hy - 8, 6.5, 7.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(-6.5, hy - 7, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(-5, hy - 9.5, 1.8, 0, Math.PI * 2); ctx.fill();
    // Miệng
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(2, hy + 9, 6, 0.4, Math.PI - 0.4); ctx.stroke();

    ctx.restore();
}

// ── Sun-Shooter ────────────────────────────────────────────────
// Cây lai: đầu trái = sunflower nhỏ (tạo sun), đầu phải = đầu vàng bắn đạn vàng
// producePulse: > 0 khi vừa tạo sun → animation phồng
// shootT: giật nòng khi bắn
function drawSunShooter(ctx, x, y, animTime, shootT, producePulse) {
    const bob    = Math.sin(animTime * 2.2) * 2;
    const recoil = Math.sin(shootT * Math.PI) * -7;
    const scl    = producePulse > 0 ? 1 + Math.sin(animTime * 8) * 0.07 : 1;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 28, 20, 5, 0, 0, Math.PI * 2); ctx.fill();

    // Thân chính (giữa)
    ctx.strokeStyle = '#388E3C'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 26); ctx.quadraticCurveTo(0, 8, 0, -1 + bob); ctx.stroke();

    // Nhánh trái → đầu sunflower
    ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 2 + bob); ctx.lineTo(-18, -8 + bob); ctx.stroke();
    // Nhánh phải → đầu shooter
    ctx.beginPath(); ctx.moveTo(0, 2 + bob); ctx.lineTo(10, -8 + bob); ctx.stroke();

    // ── ĐẦU TRÁI: mini Sunflower ──────────────────────────────
    const sfx = -18, sfy = -14 + bob;
    ctx.save(); ctx.translate(sfx, sfy); ctx.scale(scl, scl);
    // Cánh hoa
    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + animTime * 0.3;
        ctx.save(); ctx.rotate(a);
        const pg = ctx.createLinearGradient(0, -16, 0, -10);
        pg.addColorStop(0, '#FFF176'); pg.addColorStop(1, '#FDD835');
        ctx.fillStyle = pg; ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(0, -13, 4, 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.restore();
    }
    // Đĩa trung tâm nâu
    const cg = ctx.createRadialGradient(-3, -4, 1, 0, 0, 10);
    cg.addColorStop(0, '#A1887F'); cg.addColorStop(0.6, '#6D4C41'); cg.addColorStop(1, '#8a6237');
    ctx.fillStyle = cg; ctx.strokeStyle = '#8a6237'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // Mắt sunflower
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-3, -2, 2.5, 3.2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(3, -2, 2.5, 3.2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1A237E';
    ctx.beginPath(); ctx.arc(-3, -1.5, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(3, -1.5, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // ── ĐẦU PHẢI: đầu tròn vàng (shooter) ────────────────────
    const phx = 10, phy = -14 + bob;
    const hg = ctx.createRadialGradient(phx - 6, phy - 6, 1, phx, phy, 16);
    hg.addColorStop(0, '#FFF9C4'); hg.addColorStop(0.35, '#FFD600');
    hg.addColorStop(0.75, '#FFA000'); hg.addColorStop(1, '#E65100');
    ctx.fillStyle = hg; ctx.strokeStyle = '#E65100'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(phx, phy, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Nòng vàng
    const bx = phx + Math.round(16 * 0.75) + recoil;
    const bg = ctx.createLinearGradient(bx, phy - 5, bx, phy + 5);
    bg.addColorStop(0, '#FFD54F'); bg.addColorStop(0.5, '#FFA000'); bg.addColorStop(1, '#E65100');
    ctx.fillStyle = bg; ctx.strokeStyle = '#E65100'; ctx.lineWidth = 2;
    rr(ctx, bx, phy - 5, 22, 10, 3); ctx.fill(); ctx.stroke();
    // Highlight nòng
    ctx.fillStyle = 'rgba(255,255,200,0.3)';
    rr(ctx, bx + 2, phy - 4, 18, 4, 2); ctx.fill();
    // Đầu nòng
    ctx.fillStyle = '#BF360C'; ctx.strokeStyle = '#E65100'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bx + 22, phy, 6.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#4a1000';
    ctx.beginPath(); ctx.arc(bx + 22, phy, 3.5, 0, Math.PI * 2); ctx.fill();

    // Mắt đầu phải
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(phx - 6, phy - 6, 5.5, 6.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#E65100'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(phx - 5.5, phy - 5.5, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(phx - 4, phy - 8, 1.4, 0, Math.PI * 2); ctx.fill();
    // Nụ cười
    ctx.strokeStyle = '#E65100'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(phx + 2, phy + 7, 5, 0.4, Math.PI - 0.4); ctx.stroke();

    ctx.restore();
}

// ── Twin Sunflower ─────────────────────────────────────────────
// Hai đầu hoa hướng dương nhỏ trên một thân cây chung
// Mỗi đầu sản xuất sun độc lập → 2 sun/chu kỳ
function drawTwinSun(ctx, x, y, animTime, producing) {
    const bob  = Math.sin(animTime * 2.6) * 2;
    const sway = Math.sin(animTime * 1.3) * 3;
    const sc   = producing ? 1 + Math.sin(animTime * 8) * 0.07 : 1;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng rộng hơn (hai đầu)
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(sway * 0.3, 30, 22, 6, 0, 0, Math.PI * 2); ctx.fill();

    // Thân chính
    ctx.strokeStyle = '#388E3C'; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 28); ctx.quadraticCurveTo(sway * 0.5, 12, sway, 2 + bob); ctx.stroke();
    // Hai nhánh rẽ trái phải
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(sway, 2 + bob); ctx.lineTo(sway - 14, -9 + bob); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sway, 2 + bob); ctx.lineTo(sway + 14, -9 + bob); ctx.stroke();

    // Helper vẽ một đầu hoa nhỏ tại (hx, hy) với offset animation aOff
    function head(hx, hy, aOff) {
        ctx.save(); ctx.translate(hx, hy); ctx.scale(sc, sc);
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2 + (animTime + aOff) * 0.25;
            ctx.save(); ctx.rotate(a);
            const pg = ctx.createLinearGradient(0, -19, 0, -12);
            pg.addColorStop(0, '#FFF176'); pg.addColorStop(1, '#FDD835');
            ctx.fillStyle = pg; ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.ellipse(0, -15, 5, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.restore();
        }
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2 + Math.PI / 8 + (animTime + aOff) * 0.25;
            ctx.save(); ctx.rotate(a);
            ctx.fillStyle = '#FFCA28'; ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.ellipse(0, -11, 3.5, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.restore();
        }
        // Đĩa trung tâm
        const cg = ctx.createRadialGradient(-3, -4, 1, 0, 0, 10);
        cg.addColorStop(0, '#A1887F'); cg.addColorStop(0.6, '#6D4C41'); cg.addColorStop(1, '#3E2723');
        ctx.fillStyle = cg; ctx.strokeStyle = '#3E2723'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(62,39,35,0.55)';
        for (let i = 0; i < 6; i++) { const a = (i/6)*Math.PI*2; ctx.beginPath(); ctx.arc(Math.cos(a)*5.5,Math.sin(a)*5.5,1.4,0,Math.PI*2); ctx.fill(); }
        // Mắt nhỏ
        ctx.fillStyle = 'white';
        ctx.beginPath(); ctx.ellipse(-3.5, -2, 2.8, 3.8, 0.1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(3.5, -2, 2.8, 3.8, -0.1, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#1A237E';
        ctx.beginPath(); ctx.arc(-3, -1.5, 1.6, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(4, -1.5, 1.6, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }

    head(sway - 14, -15 + bob, 0);
    head(sway + 14, -15 + bob, 0.4); // lệch phase để hai đầu quay không đồng pha

    ctx.restore();
}

// ── Peanut ─────────────────────────────────────────────────────
// Wall-nut + Peashooter: máu cao như Wall-nut, bắn đạn nâu
// Nòng súng nâu nhô ra từ bên phải thân hạt
// shootT: giật nòng khi bắn | hpPct: điều khiển nứt và biểu cảm
function drawPeanut(ctx, x, y, animTime, hpPct, shootT) {
    const hitShake = hpPct < 0.5 ? Math.sin(animTime * 18) * 1.5 : 0;
    const recoil   = Math.sin(shootT * Math.PI) * -8;
    ctx.save(); ctx.translate(Math.round(x + hitShake), Math.round(y));

    // Bóng
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath(); ctx.ellipse(0, 30, 22, 7, 0, 0, Math.PI * 2); ctx.fill();

    // ── Nòng súng (vẽ trước, nằm sau thân hạt) ────────────────
    const bx = 16 + recoil;
    const barG = ctx.createLinearGradient(bx, -6, bx, 6);
    barG.addColorStop(0, '#C8A050'); barG.addColorStop(0.5, '#8B5E20'); barG.addColorStop(1, '#5C3010');
    ctx.fillStyle = barG; ctx.strokeStyle = '#3E1A00'; ctx.lineWidth = 2;
    rr(ctx, bx, -6, 32, 12, 4); ctx.fill(); ctx.stroke();
    // Highlight nhỏ
    ctx.fillStyle = 'rgba(255,220,150,0.22)';
    rr(ctx, bx + 2, -5, 28, 5, 2); ctx.fill();
    // Cap nòng
    ctx.fillStyle = '#7a4010'; ctx.strokeStyle = '#3E1A00'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bx + 32, 0, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1a0800';
    ctx.beginPath(); ctx.arc(bx + 32, 0, 4, 0, Math.PI * 2); ctx.fill();
    // ──

    // ── Thân hạt (vẽ sau, che phần gốc nòng) ─────────────────
    const wg = ctx.createRadialGradient(-9, -10, 3, 0, 0, 30);
    wg.addColorStop(0, '#D2A060'); wg.addColorStop(0.55, '#A0522D'); wg.addColorStop(1, '#5C2A08');
    ctx.fillStyle = wg; ctx.strokeStyle = '#3E1A00'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(0, 0, 27, 29, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Gân hạt
    ctx.strokeStyle = 'rgba(62,26,0,0.65)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, -27); ctx.bezierCurveTo(4, -14, 4, 14, 0, 27); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-14, -24); ctx.bezierCurveTo(-12, -10, -11, 10, -14, 23); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-23, 2); ctx.bezierCurveTo(-10, 5, 10, 5, 23, 2); ctx.stroke();

    // Vết nứt theo máu
    if (hpPct < 0.66) {
        ctx.strokeStyle = 'rgba(60,20,0,0.9)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-6, -22); ctx.lineTo(-2, -14); ctx.lineTo(-9, -6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-20, 4); ctx.lineTo(-10, 8); ctx.lineTo(-15, 15); ctx.stroke();
    }
    if (hpPct < 0.33) {
        ctx.strokeStyle = 'rgba(60,20,0,0.95)'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(8, -20); ctx.lineTo(4, -10); ctx.lineTo(11, -2); ctx.lineTo(6, 6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(16, 10); ctx.lineTo(8, 16); ctx.stroke();
    }

    // Lông mày + mắt + miệng (tái dùng logic WallNut)
    const browTilt = hpPct > 0.5 ? 0 : -0.45 * (1 - hpPct * 2);
    ctx.strokeStyle = '#5C2A08'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.save(); ctx.translate(-8, -12); ctx.rotate(browTilt + 0.2);
    ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(5, 0); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(8, -12); ctx.rotate(-browTilt - 0.2);
    ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(5, 0); ctx.stroke(); ctx.restore();
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-8, -5, 5, 6.5, browTilt, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(8, -5, 5, 6.5, -browTilt, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1A237E';
    ctx.beginPath(); ctx.arc(-7, -4, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(9, -4, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(-6, -6, 1.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(10, -6, 1.4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#3E1A00'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    if (hpPct > 0.66)      { ctx.beginPath(); ctx.arc(0, 4, 8, 0.25, Math.PI - 0.25); ctx.stroke(); }
    else if (hpPct > 0.33) { ctx.beginPath(); ctx.moveTo(-7, 10); ctx.lineTo(7, 10); ctx.stroke(); }
    else {
        ctx.beginPath(); ctx.arc(0, 16, 8, Math.PI + 0.3, -0.3); ctx.stroke();
        ctx.fillStyle = 'rgba(100,180,255,0.8)';
        ctx.beginPath(); ctx.ellipse(18, -2, 4, 7, -0.3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
}

// ── Puff-Shroom ────────────────────────────────────────────────
// Nấm bào tử tím: 0☀ ban đêm / 75☀ ban ngày, bắn đạn bào tử 3 ô
// Nhận dạng: mũ nấm tím dome, chấm trắng, ống bào tử bên phải
function drawPuffShroom(ctx, x, y, animTime, shootT) {
    const bob    = Math.sin(animTime * 2.5) * 2;
    const recoil = Math.sin(shootT * Math.PI) * -6;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath(); ctx.ellipse(0, 28, 11, 3.5, 0, 0, Math.PI * 2); ctx.fill();

    // Thân nấm (stem) nâu ngắn
    const stG = ctx.createLinearGradient(-5, 6, 5, 25);
    stG.addColorStop(0, '#d4a878'); stG.addColorStop(1, '#8a5a28');
    ctx.fillStyle = stG; ctx.strokeStyle = '#5a3510'; ctx.lineWidth = 1.5;
    rr(ctx, -6, 9 + bob * 0.3, 12, 19, 4); ctx.fill(); ctx.stroke();

    // Mũ nấm — ellipse tím đặc trưng
    const hy = -1 + bob;
    const cG = ctx.createRadialGradient(-8, hy - 12, 2, 0, hy, 22);
    cG.addColorStop(0,    '#EA80FC'); // tím sáng highlight
    cG.addColorStop(0.35, '#9C27B0'); // tím chính
    cG.addColorStop(0.8,  '#6A1B9A'); // tím tối
    cG.addColorStop(1,    '#4A148C'); // viền
    ctx.fillStyle = cG; ctx.strokeStyle = '#38006b'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, hy, 22, 19, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Chấm trắng (đặc trưng của nấm PvZ)
    ctx.fillStyle = 'rgba(255,255,255,0.72)';
    ctx.beginPath(); ctx.arc(-9, hy - 7, 4,    0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 7, hy - 12, 3.2,  0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(12, hy - 1,  2.5,  0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-2, hy + 9,  2,    0, Math.PI * 2); ctx.fill();

    // Mắt tròn
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-6, hy + 3, 5, 5.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( 6, hy + 3, 5, 5.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#4A148C'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-5.5, hy + 3.5, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 6.5, hy + 3.5, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(-4, hy + 1.5, 1.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 8, hy + 1.5, 1.2, 0, Math.PI * 2); ctx.fill();

    // Ống bào tử — nhô ra phải (recoil khi bắn)
    const bx = 18 + recoil;
    const tG = ctx.createLinearGradient(bx, hy + 2, bx, hy + 10);
    tG.addColorStop(0, '#CE93D8'); tG.addColorStop(1, '#7B1FA2');
    ctx.fillStyle = tG; ctx.strokeStyle = '#38006b'; ctx.lineWidth = 1.5;
    rr(ctx, bx, hy + 2, 18, 8, 3); ctx.fill(); ctx.stroke();
    // Miệng ống
    ctx.fillStyle = '#4A148C'; ctx.strokeStyle = '#38006b'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bx + 18, hy + 6, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1a0020';
    ctx.beginPath(); ctx.arc(bx + 18, hy + 6, 2.5, 0, Math.PI * 2); ctx.fill();

    // Miệng cười
    ctx.strokeStyle = '#38006b'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, hy + 12, 6, 0.4, Math.PI - 0.4); ctx.stroke();

    ctx.restore();
}
