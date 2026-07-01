'use strict';
// ══════════════════════════════════════════════════════════════
//  drawSquash.js — Quả bí dẹt, xanh sáng phía trên ngả xanh đậm phía
//  dưới, vài gân dọc nhẹ kiểu bí ngô, cuống xanh đậm trên đầu, mặt
//  hầm hố với miệng kiểu "_--_". Squash & stretch theo từng phase:
//    idle   → thở nhẹ
//    crouch → nén xuống như lò xo (chuẩn bị nhảy)
//    air    → vươn dài khi bật lên, hơi co lại trước khi rơi
//    impact → đè bẹp dí xuống đất
//
//  elevation: độ cao hiện tại so với mặt đất (px) — dùng để nâng thân
//  lên khỏi bóng trong lúc bay (phase 'air').
// ══════════════════════════════════════════════════════════════
function drawSquash(ctx, x, groundY, animTime, phase, phaseT, elevation) {
    ctx.save(); ctx.translate(Math.round(x), Math.round(groundY));

    // ── Bóng đổ — co lại & mờ đi khi bay cao, giãn ra khi đè bẹp ──
    const shadowShrink = Math.max(0.35, 1 - elevation / 90);
    const impactSpread  = phase === 'impact' ? 1 + phaseT * 0.45 : 1;
    ctx.fillStyle = 'rgba(0,0,0,0.26)';
    ctx.beginPath();
    ctx.ellipse(0, 28, 28 * shadowShrink * impactSpread, 7 * shadowShrink, 0, 0, Math.PI * 2);
    ctx.fill();

    // ── Vòng sốc va đập khi vừa đè bẹp ───────────────────────────
    if (phase === 'impact') {
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - phaseT * 1.3) * 0.6;
        ctx.strokeStyle = '#DFFFB0'; ctx.lineWidth = 3 * (1 - phaseT);
        ctx.beginPath(); ctx.ellipse(0, 24, 18 + phaseT * 50, 6 + phaseT * 14, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
    }

    // ── Squash & stretch theo phase ──────────────────────────────
    let scaleX = 1, scaleY = 1;
    if (phase === 'idle') {
        scaleY = 1 + Math.sin(animTime * 2) * 0.02;
    } else if (phase === 'crouch') {
        const e = phaseT * phaseT; // ease-in — dồn lực về cuối
        scaleY = 1 - e * 0.45;
        scaleX = 1 + e * 0.22;
    } else if (phase === 'air') {
        const stretch = Math.sin(Math.min(phaseT, 1) * Math.PI); // 0 → 1 → 0
        scaleY = 1 + stretch * 0.38;
        scaleX = 1 - stretch * 0.24;
    } else if (phase === 'impact') {
        scaleY = 0.30 + phaseT * 0.12;
        scaleX = 1.55 - phaseT * 0.15;
    }

    ctx.save();
    ctx.translate(0, 14 - elevation);
    ctx.scale(scaleX, scaleY);

    // ── Cuống bí — xanh đậm, hơi nghiêng, gắn trên đầu ───────────
    ctx.save();
    ctx.rotate(-0.18);
    ctx.fillStyle = '#1B4D0E'; ctx.strokeStyle = '#0E3006'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-3, -10);
    ctx.quadraticCurveTo(-5, -20, -1, -25);
    ctx.quadraticCurveTo(2, -27, 4, -24);
    ctx.quadraticCurveTo(3, -16, 4, -9);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();

    // ── Thân bí — dẹt, xanh sáng trên → xanh đậm dưới ────────────
    const bodyRx = 30, bodyRy = 18;
    const bg = ctx.createLinearGradient(0, -bodyRy, 0, bodyRy);
    bg.addColorStop(0,    '#AEEB5C');
    bg.addColorStop(0.45, '#6FBF2E');
    bg.addColorStop(0.8,  '#3D8A16');
    bg.addColorStop(1,    '#1F5C08');
    ctx.fillStyle = bg; ctx.strokeStyle = '#15400A'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(0, 0, bodyRx, bodyRy, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Highlight mềm phía trên-trái
    ctx.fillStyle = 'rgba(255,255,255,0.20)';
    ctx.beginPath(); ctx.ellipse(-10, -7, 12, 6, -0.3, 0, Math.PI * 2); ctx.fill();

    // Gân dọc nhẹ kiểu bí ngô — vài đường cong từ trên xuống dưới
    ctx.strokeStyle = 'rgba(21,64,10,0.55)'; ctx.lineWidth = 1.6;
    [-16, -7, 7, 16].forEach((rx) => {
        ctx.beginPath();
        ctx.moveTo(rx * 0.55, -bodyRy + 2);
        ctx.quadraticCurveTo(rx, 0, rx * 0.55, bodyRy - 2);
        ctx.stroke();
    });

    // ── Mặt hầm hố — mắt híp sắc, lông mày dày cau xuống ─────────
    [-10, 10].forEach((ex) => {
        ctx.save();
        ctx.translate(ex, -2);
        ctx.rotate(ex < 0 ? 0.18 : -0.18);
        ctx.fillStyle = '#10240A';
        ctx.beginPath(); ctx.ellipse(0, 0, 4.6, 2.6, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath(); ctx.ellipse(1, -0.6, 1, 0.6, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    });
    ctx.strokeStyle = '#143508'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-18, -9); ctx.lineTo(-5, -4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(18, -9); ctx.lineTo(5, -4); ctx.stroke();

    // Miệng kiểu "_--_" — phẳng, hơi lõm giữa, dáng cứng cỏi
    ctx.strokeStyle = '#143508'; ctx.lineWidth = 2.6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(-11, 8);
    ctx.lineTo(-4, 8);
    ctx.lineTo(-2, 10.5);
    ctx.lineTo(2, 10.5);
    ctx.lineTo(4, 8);
    ctx.lineTo(11, 8);
    ctx.stroke();

    ctx.restore(); // end body group
    ctx.restore(); // end translate
}
