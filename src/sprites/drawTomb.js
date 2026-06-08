'use strict';
// ══════════════════════════════════════════════════════════════
//  drawTomb.js — Vẽ Lăng Mộ Ai Cập (Egypt Tombstone)
//
//  drawTomb(ctx, x, y, hpPct, flash)
//    x, y    — tâm ô chứa lăng mộ
//    hpPct   — tỉ lệ máu (0–1), vẽ vết nứt khi < 0.67 và < 0.34
//    flash   — 0–1, hiệu ứng trắng khi bị trúng đạn
// ══════════════════════════════════════════════════════════════

// Dùng lại trong cả body chính lẫn hit flash
function _tombOutlinePath(ctx, TW, TH, archY) {
    ctx.beginPath();
    ctx.moveTo(-TW, TH);
    ctx.lineTo(-TW, archY);
    ctx.quadraticCurveTo(-TW, -TH, 0, -TH);
    ctx.quadraticCurveTo(TW, -TH, TW, archY);
    ctx.lineTo(TW, TH);
    ctx.closePath();
}

function drawTomb(ctx, x, y, hpPct, flash) {
    ctx.save();
    ctx.translate(x, y + 6); // shift down 6px so base aligns with ground

    const TW    = 24;   // half-width
    const TH    = 36;   // half-height
    const archY = -16;  // Y where arch curve meets straight sides

    // ── Drop shadow ──────────────────────────────────────
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.beginPath();
    ctx.ellipse(3, TH + 6, TW + 4, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // ── Outer stone body ─────────────────────────────────
    const stoneGrad = ctx.createLinearGradient(-TW, -TH, TW, TH);
    stoneGrad.addColorStop(0,    '#f0e2a8');
    stoneGrad.addColorStop(0.22, '#d4b860');
    stoneGrad.addColorStop(0.62, '#b89030');
    stoneGrad.addColorStop(1,    '#8a6018');
    _tombOutlinePath(ctx, TW, TH, archY);
    ctx.fillStyle = stoneGrad; ctx.fill();
    ctx.strokeStyle = '#5a3000'; ctx.lineWidth = 2.5; ctx.stroke();

    // ── Inner dark recess ─────────────────────────────────
    const rW    = TW * 0.68;
    const rT    = -TH + 8;
    const rArch = rT + 14;
    const rBot  = TH - 4;
    ctx.beginPath();
    ctx.moveTo(-rW, rBot); ctx.lineTo(-rW, rArch);
    ctx.quadraticCurveTo(-rW, rT, 0, rT);
    ctx.quadraticCurveTo(rW, rT, rW, rArch);
    ctx.lineTo(rW, rBot);
    ctx.closePath();
    const innerGrad = ctx.createLinearGradient(0, rT, 0, rBot);
    innerGrad.addColorStop(0, '#251204');
    innerGrad.addColorStop(1, '#180a02');
    ctx.fillStyle = innerGrad; ctx.fill();
    ctx.strokeStyle = 'rgba(255,200,80,0.22)'; ctx.lineWidth = 1; ctx.stroke();

    // ── Eye of Horus ──────────────────────────────────────
    const eyeY = rT + 11;
    ctx.lineCap = 'round';

    // Almond eye outline
    ctx.beginPath();
    ctx.moveTo(-9, eyeY);
    ctx.bezierCurveTo(-5, eyeY - 7,  5, eyeY - 7,  9, eyeY);
    ctx.bezierCurveTo( 5, eyeY + 5, -5, eyeY + 5, -9, eyeY);
    ctx.closePath();
    ctx.strokeStyle = '#f0c840'; ctx.lineWidth = 1.4; ctx.stroke();

    // Gold iris
    ctx.fillStyle = '#f0c840';
    ctx.beginPath(); ctx.arc(0, eyeY, 2.6, 0, Math.PI * 2); ctx.fill();
    // Dark pupil
    ctx.fillStyle = '#0a0400';
    ctx.beginPath(); ctx.arc(0, eyeY, 1.3, 0, Math.PI * 2); ctx.fill();

    // Lower teardrop details (Eye of Horus symbol)
    ctx.strokeStyle = '#f0c840'; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.moveTo(5, eyeY + 3);
    ctx.quadraticCurveTo(7, eyeY + 8, 4, eyeY + 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-5, eyeY + 3);
    ctx.lineTo(-9, eyeY + 12); ctx.stroke();

    // ── Crossed arms ──────────────────────────────────────
    const armY = eyeY + 18;
    ctx.strokeStyle = 'rgba(240,198,78,0.62)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-rW + 2, armY); ctx.lineTo(rW - 2, armY + 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rW - 2, armY); ctx.lineTo(-rW + 2, armY + 7); ctx.stroke();

    // ── Bandage stripes ────────────────────────────────────
    for (let i = 0; i < 2; i++) {
        const ly = armY + 13 + i * 7;
        ctx.strokeStyle = `rgba(208,162,50,${0.58 - i * 0.16})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-rW + 2, ly); ctx.lineTo(rW - 2, ly); ctx.stroke();
    }

    // ── Left highlight (3D stone effect) ─────────────────
    ctx.fillStyle = 'rgba(255,255,180,0.18)';
    ctx.beginPath();
    ctx.moveTo(-TW + 2, archY);
    ctx.quadraticCurveTo(-TW + 2, -TH + 2, 0, -TH + 2);
    ctx.lineTo(-TW + 9, archY);
    ctx.quadraticCurveTo(-TW + 7, -TH + 8, 0, -TH + 8);
    ctx.closePath(); ctx.fill();

    // ── Damage cracks ─────────────────────────────────────
    if (hpPct < 0.67) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0,0,0,0.72)'; ctx.lineWidth = 1.5; ctx.lineCap = 'butt';
        // Crack on upper-left
        ctx.beginPath();
        ctx.moveTo(-11, -TH + 7);
        ctx.lineTo(-7, -TH + 17);
        ctx.lineTo(-12, -TH + 26); ctx.stroke();
        // Crack on right
        ctx.beginPath();
        ctx.moveTo(8, -TH + 11);
        ctx.lineTo(11, -TH + 22); ctx.stroke();
        ctx.restore();
    }
    if (hpPct < 0.34) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0,0,0,0.82)'; ctx.lineWidth = 2; ctx.lineCap = 'butt';
        // Big vertical fracture
        ctx.beginPath();
        ctx.moveTo(-2, archY + 2);
        ctx.lineTo(3,  archY + 16);
        ctx.lineTo(-1, TH - 10); ctx.stroke();
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(10, archY + 5);
        ctx.lineTo(15, archY + 17);
        ctx.lineTo(11, archY + 25); ctx.stroke();
        // Rubble at base
        ctx.fillStyle = '#c8a038';
        ctx.beginPath(); ctx.ellipse(-16, TH + 3, 5, 2.5, 0.2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(17, TH + 2, 4, 2,   -0.2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(4,  TH + 4, 3, 1.8,  0,   0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }

    // ── Hit flash overlay ────────────────────────────────
    if (flash > 0) {
        _tombOutlinePath(ctx, TW, TH, archY);
        ctx.fillStyle = `rgba(255,255,255,${flash * 0.72})`;
        ctx.fill();
    }

    // ── HP bar (only when damaged) ────────────────────────
    if (hpPct < 1) {
        const bW = TW * 2, bH = 4;
        const bx = -TW, by = TH + 8;
        ctx.fillStyle = 'rgba(0,0,0,0.5)'; rr(ctx, bx, by, bW, bH, 2); ctx.fill();
        const hpColor = hpPct > 0.5 ? '#60e820' : hpPct > 0.25 ? '#ffa800' : '#ff3010';
        ctx.fillStyle = hpColor; rr(ctx, bx, by, bW * hpPct, bH, 2); ctx.fill();
    }

    ctx.restore();
}
