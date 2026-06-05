'use strict';
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
