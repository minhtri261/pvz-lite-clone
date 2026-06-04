'use strict';
// ══════════════════════════════════════════════════════════════
//  miscSprites.js — Sprite cho đạn, mặt trời, máy cắt cỏ, xẻng
//
//  drawPea(ctx, x, y, animTime, isIce, isYellow):
//    isIce=false, isYellow=false → đạn xanh lá (Peashooter, Repeater)
//    isIce=true   → đạn xanh băng với tia tinh thể (SnowPea)
//    isYellow=true → đạn vàng cam (Sun-Shooter)
//
//  drawSun(ctx, x, y, animTime, alpha):
//    alpha: 0–1, dùng để mờ dần khi timeout hoặc hiện dần khi rơi
//
//  drawLawnMower(ctx, x, y, active, animTime):
//    active=false → đứng yên (bánh không quay, không có khói)
//    active=true  → bánh quay, tia tốc độ, khói xả
//
//  drawShovel(ctx, x, y):
//    Xẻng góc nghiêng -22° với nắm tay, thân gỗ, lưỡi kim loại bóng
// ══════════════════════════════════════════════════════════════

function drawPea(ctx, x, y, animTime, isIce, isYellow = false, isBrown = false, isSpore = false) {
    const c1 = isIce ? '#B2EBF2' : isYellow ? '#FFF9C4' : isBrown ? '#D2A060' : isSpore ? '#F3E5F5' : '#CCFF80';
    const c2 = isIce ? '#00BCD4' : isYellow ? '#FFD600' : isBrown ? '#A0522D' : isSpore ? '#9C27B0' : '#66CC00';
    const c3 = isIce ? '#006064' : isYellow ? '#E65100' : isBrown ? '#5C2A08' : isSpore ? '#4A148C' : '#336600';
    const gl = isIce ? 'rgba(0,188,212,0.28)' : isYellow ? 'rgba(255,200,0,0.25)' : isBrown ? 'rgba(160,82,45,0.22)' : isSpore ? 'rgba(156,39,176,0.25)' : 'rgba(120,255,80,0.25)';
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2); ctx.fill();
    const pg = ctx.createRadialGradient(-3, -3, 1, 0, 0, 9);
    pg.addColorStop(0, c1); pg.addColorStop(0.5, c2); pg.addColorStop(1, c3);
    ctx.fillStyle = pg; ctx.strokeStyle = c3; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.beginPath(); ctx.arc(-3, -3, 3, 0, Math.PI * 2); ctx.fill();
    if (isIce) {
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1.5;
        for (let i = 0; i < 4; i++) {
            const a = (i / 4) * Math.PI * 2;
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 8, Math.sin(a) * 8); ctx.stroke();
        }
    }
    ctx.restore();
}

function drawSun(ctx, x, y, animTime, alpha) {
    const pulse = 1 + Math.sin(animTime * 4) * 0.07;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.scale(pulse, pulse); ctx.globalAlpha = alpha;
    ctx.fillStyle = 'rgba(255,220,0,0.2)'; ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#FFD000'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 + animTime * 1.2;
        ctx.beginPath(); ctx.moveTo(Math.cos(a) * 22, Math.sin(a) * 22);
        ctx.lineTo(Math.cos(a) * 30, Math.sin(a) * 30); ctx.stroke();
    }
    const sg = ctx.createRadialGradient(-6, -6, 3, 0, 0, 18);
    sg.addColorStop(0, '#FFF9A0'); sg.addColorStop(0.4, '#FFD700'); sg.addColorStop(1, '#FFA000');
    ctx.fillStyle = sg; ctx.strokeStyle = '#CC8800'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#884400';
    ctx.beginPath(); ctx.arc(-5.5, -3, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(5.5, -3, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#884400'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, 3, 7, 0.2, Math.PI - 0.2); ctx.stroke();
    ctx.restore();
}

function drawLawnMower(ctx, x, y, active, animTime) {
    ctx.save(); ctx.translate(Math.round(x), Math.round(y) + 22);
    if (active) { ctx.translate(0, Math.sin(animTime * 30) * 1.5); }

    if (active) {
        ctx.strokeStyle = 'rgba(255,255,80,0.35)'; ctx.lineWidth = 2;
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath(); ctx.moveTo(-22 * i, -14); ctx.lineTo(-22 * i, 4); ctx.stroke();
        }
    }

    ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.beginPath(); ctx.ellipse(0, 2, 24, 7, 0, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#1a1a1a'; ctx.strokeStyle = '#555'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(-16, -3, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(13, -3, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.strokeStyle = '#444'; ctx.lineWidth = 1.5;
    [-16, 13].forEach(wx => {
        const r = wx === -16 ? 9 : 8;
        for (let i = 0; i < 4; i++) {
            const a = (i / 4) * Math.PI * 2 + (active ? animTime * 18 : 0);
            ctx.beginPath(); ctx.moveTo(wx, -3); ctx.lineTo(wx + Math.cos(a) * r, -3 + Math.sin(a) * r); ctx.stroke();
        }
    });

    const dg = ctx.createLinearGradient(-20, -20, 20, -8);
    dg.addColorStop(0, '#EF5350'); dg.addColorStop(1, '#B71C1C');
    ctx.fillStyle = dg; ctx.strokeStyle = '#7f0000'; ctx.lineWidth = 2.5;
    rr(ctx, -20, -22, 40, 14, 5); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#558B2F'; ctx.strokeStyle = '#33691E'; ctx.lineWidth = 1.5;
    rr(ctx, -29, -20, 12, 13, 3); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#D32F2F';
    rr(ctx, -10, -30, 20, 10, 4); ctx.fill(); ctx.strokeStyle = '#7f0000'; ctx.lineWidth = 2; ctx.stroke();

    ctx.strokeStyle = '#666'; ctx.lineWidth = 3.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-6, -30); ctx.lineTo(-6, -38); ctx.stroke();

    if (active) {
        ctx.fillStyle = 'rgba(210,210,210,0.5)';
        for (let i = 0; i < 3; i++) {
            const sy = -38 - i * 9 - ((animTime * 25) % 9);
            ctx.beginPath(); ctx.arc(-6 + i * 2, sy, 3 + i, 0, Math.PI * 2); ctx.fill();
        }
    }

    ctx.strokeStyle = '#999'; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(20, -18); ctx.lineTo(40, -32); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, -32); ctx.lineTo(40, -26); ctx.stroke();

    ctx.restore();
}

function drawShovel(ctx, x, y) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.rotate(-0.22);

    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath(); ctx.ellipse(2, 20, 10, 3, 0, 0, Math.PI * 2); ctx.fill();

    // Handle
    const hg = ctx.createLinearGradient(-3, -26, 4, 10);
    hg.addColorStop(0, '#D49A42'); hg.addColorStop(0.5, '#8B5E2E'); hg.addColorStop(1, '#5C3010');
    ctx.fillStyle = hg; ctx.strokeStyle = '#3E1A00'; ctx.lineWidth = 1.5;
    rr(ctx, -3.5, -27, 7, 38, 3); ctx.fill(); ctx.stroke();

    // T-grip
    ctx.fillStyle = '#7a4a18'; ctx.strokeStyle = '#3E1A00'; ctx.lineWidth = 1.5;
    rr(ctx, -11, -29, 22, 5, 2); ctx.fill(); ctx.stroke();

    // Blade
    const bg = ctx.createLinearGradient(-12, 10, 12, 28);
    bg.addColorStop(0, '#B0B0B0'); bg.addColorStop(0.4, '#E0E0E0'); bg.addColorStop(1, '#7a7a7a');
    ctx.fillStyle = bg; ctx.strokeStyle = '#444'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-13, 10); ctx.lineTo(13, 10); ctx.lineTo(9, 28); ctx.lineTo(-9, 28);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath(); ctx.moveTo(-11, 12); ctx.lineTo(0, 12); ctx.lineTo(-3, 26); ctx.lineTo(-9, 26); ctx.closePath(); ctx.fill();

    // Foot peg
    ctx.fillStyle = '#888'; ctx.strokeStyle = '#444'; ctx.lineWidth = 1.5;
    rr(ctx, 9, 12, 7, 5, 2); ctx.fill(); ctx.stroke();

    ctx.restore();
}
