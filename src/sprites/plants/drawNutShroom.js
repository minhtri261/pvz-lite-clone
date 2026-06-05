'use strict';
// NutShroom = PuffShroom + WallNut: hình WallNut thu nhỏ, nửa trên tím, nửa dưới trắng
function _drawNutShroomBody(ctx, animTime, hpPct) {
    const hitShake = hpPct < 0.5 ? Math.sin(animTime * 18) * 1.5 : 0;
    ctx.save(); ctx.translate(hitShake, 0);

    const eW = 22, eH = 25;

    // Bóng mờ dưới đất
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.beginPath(); ctx.ellipse(0, 24, 18, 5.5, 0, 0, Math.PI * 2); ctx.fill();

    // ── Nửa trên: tím (purple) ──────────────────────────────────
    ctx.beginPath();
    ctx.ellipse(0, 0, eW, eH, 0, 0, Math.PI, true); // right → top → left
    ctx.closePath();
    const topG = ctx.createLinearGradient(-8, -eH, 0, 0);
    topG.addColorStop(0,   '#CE93D8'); // tím sáng highlight
    topG.addColorStop(0.4, '#9C27B0'); // tím chính
    topG.addColorStop(1,   '#6A1B9A'); // tím tối ở đường chia
    ctx.fillStyle = topG; ctx.fill();

    // ── Nửa dưới: trắng/kem ─────────────────────────────────────
    ctx.beginPath();
    ctx.ellipse(0, 0, eW, eH, 0, 0, Math.PI, false); // right → bottom → left
    ctx.closePath();
    const botG = ctx.createLinearGradient(0, 0, 0, eH);
    botG.addColorStop(0,   '#F5F5F5'); // trắng ở đường chia
    botG.addColorStop(0.6, '#E0E0E0'); // xám nhạt
    botG.addColorStop(1,   '#C8C8C8'); // xám hơi tối ở đáy
    ctx.fillStyle = botG; ctx.fill();

    // Viền toàn bộ
    ctx.strokeStyle = '#38006b'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, 0, eW, eH, 0, 0, Math.PI * 2); ctx.stroke();

    // Đường chia giữa 2 màu
    ctx.strokeStyle = 'rgba(80,0,120,0.30)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-eW, 0); ctx.lineTo(eW, 0); ctx.stroke();

    // ── Mắt (nhìn sang phải như WallNut) ────────────────────────
    const eyeY = -6;
    ctx.strokeStyle = '#38006b'; ctx.lineWidth = 1.5;
    [[-7, eyeY], [7, eyeY]].forEach(([ex, ey]) => {
        ctx.fillStyle = 'white';
        ctx.beginPath(); ctx.ellipse(ex, ey, 5.5, 6, 0, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
    });
    ctx.fillStyle = '#0d0d0d';
    ctx.beginPath(); ctx.arc(-5,  eyeY - 0.5, 3.2, 0, Math.PI * 2); ctx.fill(); // pupil lệch phải
    ctx.beginPath(); ctx.arc( 9,  eyeY - 0.5, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(-4,  eyeY - 2,   1.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(10,  eyeY - 2,   1.2, 0, Math.PI * 2); ctx.fill();

    // ── Miệng thay đổi theo HP ────────────────────────────────────
    ctx.strokeStyle = '#38006b'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    if (hpPct > 0.66) {
        ctx.beginPath(); ctx.moveTo(-6, 9); ctx.quadraticCurveTo(0, 14, 6, 9); ctx.stroke();
    } else {
        ctx.beginPath(); ctx.moveTo(-6, 7); ctx.quadraticCurveTo(0, 3, 6, 7); ctx.stroke();
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-11, -15); ctx.lineTo(-4, -12); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( 11, -15); ctx.lineTo( 4, -12); ctx.stroke();
    }

    // ── Băng cứu thương (HP ≤ 0.66) ─────────────────────────────
    if (hpPct <= 0.66) {
        const bx = -10, by = -24, bw = 11, bh = 7;
        ctx.fillStyle = '#F8F8F0'; ctx.strokeStyle = '#ccb090'; ctx.lineWidth = 0.8;
        rr(ctx, bx, by, bw, bh, 1.5); ctx.fill(); ctx.stroke();
        const mx = bx + bw / 2, my = by + bh / 2;
        ctx.fillStyle = '#E01010';
        ctx.fillRect(mx - 1.2, by + 1.2, 2.4, bh - 2.4);
        ctx.fillRect(bx + 1.5, my - 1, bw - 3, 2);
    }

    // ── Khóc (HP < 0.33) ─────────────────────────────────────────
    if (hpPct < 0.33) {
        ctx.fillStyle = 'rgba(70,145,255,0.80)';
        ctx.beginPath();
        ctx.moveTo(-9, 1); ctx.quadraticCurveTo(-12, 7, -9.5, 12);
        ctx.quadraticCurveTo(-6, 7, -9, 1); ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(6, 1); ctx.quadraticCurveTo(3, 7, 5.5, 12);
        ctx.quadraticCurveTo(9, 7, 6, 1); ctx.closePath(); ctx.fill();
    }

    ctx.restore();
}

function drawNutShroom(ctx, x, y, animTime, hpPct, stackCount = 1, rightHpPct = 1) {
    if (stackCount === 2) {
        // Con trái (còn sống) — vẽ trước = phía sau
        ctx.save();
        ctx.translate(Math.round(x) - 9, Math.round(y));
        ctx.scale(0.80, 0.80);
        _drawNutShroomBody(ctx, animTime, hpPct);
        ctx.restore();
        // Con phải (bị ăn trước) — vẽ sau = phía trước
        ctx.save();
        ctx.translate(Math.round(x) + 9, Math.round(y) + 2);
        ctx.scale(0.80, 0.80);
        _drawNutShroomBody(ctx, animTime * 1.05 + 0.3, rightHpPct);
        ctx.restore();
    } else {
        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        _drawNutShroomBody(ctx, animTime, hpPct);
        ctx.restore();
    }
}
