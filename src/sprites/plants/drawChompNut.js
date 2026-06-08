'use strict';
// Chomp-nut — fusion Chomper + Wall-nut
//   Thân oval đứng giống Wall-nut nhưng KHÔNG có mắt
//   Miệng cắn 2 hàm (copy từ Chomper) ghép vào giữa mặt, tô màu tím Chomper
//   Máu trâu (4000 HP) → vẫn hiện băng cứu thương + nước mắt theo HP như Wall-nut
function drawChompNut(ctx, x, y, animTime, hpPct, chomping, chompT, digesting) {
    const hitShake = hpPct < 0.5 ? Math.sin(animTime * 18) * 1.5 : 0;
    ctx.save(); ctx.translate(Math.round(x + hitShake), Math.round(y));

    // Bóng mờ dưới đất
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath(); ctx.ellipse(0, 30, 22, 7, 0, 0, Math.PI * 2); ctx.fill();

    // ── Thân oval đứng — tím Chomper (thay caramel của Wall-nut) ──
    const bg = ctx.createRadialGradient(-10, -12, 2, 0, 0, 31);
    bg.addColorStop(0,    '#CE93D8');
    bg.addColorStop(0.38, '#9C27B0');
    bg.addColorStop(0.75, '#6A1B9A');
    bg.addColorStop(1,    '#38006b');
    ctx.fillStyle = bg; ctx.strokeStyle = '#2d004d'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(0, 0, 27, 30, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // ── Miệng Chomper ghép vào giữa mặt (thay cho mắt) ────────────
    const headRx = 21, headRy = 19;
    let openAmt;
    if (chomping)        openAmt = Math.sin(chompT * Math.PI);
    else if (digesting)  openAmt = 0.03 + Math.sin(animTime * 4) * 0.02;
    else                 openAmt = 0.05 + Math.sin(animTime * 2.2) * 0.03;
    const upperLift = openAmt * headRy * 0.9;
    const lowerDrop = openAmt * headRy * 0.38;
    const toothH    = Math.min(9, openAmt * 22);

    if (openAmt > 0.02) {
        ctx.fillStyle = '#D81B60';
        ctx.beginPath();
        ctx.ellipse(0, -upperLift * 0.3 + lowerDrop * 0.3,
                    headRx * 0.88, (upperLift + lowerDrop) * 0.5 + 1, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#880E4F';
        ctx.beginPath();
        ctx.ellipse(0, -upperLift * 0.12 + lowerDrop * 0.12,
                    headRx * 0.5, (upperLift + lowerDrop) * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1a0010';
        ctx.beginPath();
        ctx.ellipse(0, 0, headRx * 0.2, (upperLift + lowerDrop) * 0.14 + 1, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Hàm dưới (vẽ trước để hàm trên đè lên)
    ctx.save();
    ctx.translate(0, lowerDrop);
    const ljg = ctx.createRadialGradient(-headRx * 0.1, headRy * 0.35, 1, 0, 0, headRx + 2);
    ljg.addColorStop(0, '#CE93D8'); ljg.addColorStop(0.45, '#9C27B0'); ljg.addColorStop(1, '#4A148C');
    ctx.fillStyle = ljg; ctx.strokeStyle = '#38006b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, headRx, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (toothH > 1) {
        ctx.fillStyle = '#F8F8F8'; ctx.strokeStyle = '#CCC'; ctx.lineWidth = 1;
        [-13, -4, 5, 14].forEach(tx => {
            ctx.beginPath(); ctx.moveTo(tx-3,0); ctx.lineTo(tx+3,0); ctx.lineTo(tx,-toothH*0.85); ctx.closePath(); ctx.fill(); ctx.stroke();
        });
    }
    ctx.restore();

    // Hàm trên
    ctx.save();
    ctx.translate(0, -upperLift);
    const ujg = ctx.createRadialGradient(-headRx * 0.35, -headRy * 0.35, 1, 0, 0, headRx + 2);
    ujg.addColorStop(0, '#EA80FC'); ujg.addColorStop(0.3, '#BA68C8'); ujg.addColorStop(0.75, '#7B1FA2'); ujg.addColorStop(1, '#4A148C');
    ctx.fillStyle = ujg; ctx.strokeStyle = '#38006b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, headRx, Math.PI, 0, false); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (toothH > 1) {
        ctx.fillStyle = '#FFFFFF'; ctx.strokeStyle = '#CCC'; ctx.lineWidth = 1;
        [-15, -7, 0, 7, 15].forEach(tx => {
            ctx.beginPath(); ctx.moveTo(tx-3,0); ctx.lineTo(tx+3,0); ctx.lineTo(tx,toothH); ctx.closePath(); ctx.fill(); ctx.stroke();
        });
    }
    ctx.restore();

    // ── Băng cứu thương + nước mắt theo % HP (giống Wall-nut) ────
    if (hpPct <= 0.66) {
        const bx = -12, by = -26, bw = 13, bh = 9;
        ctx.fillStyle = '#F8F8F0';
        ctx.strokeStyle = '#5b2a73'; ctx.lineWidth = 1;
        rr(ctx, bx, by, bw, bh, 2); ctx.fill(); ctx.stroke();
        const mx = bx + bw / 2, my = by + bh / 2;
        ctx.fillStyle = '#E01010';
        ctx.fillRect(mx - 1.5, by + 1.5,  3,       bh - 3);
        ctx.fillRect(bx + 2,   my - 1.3,  bw - 4,  2.6);
    }
    if (hpPct < 0.33) {
        ctx.fillStyle = 'rgba(70,145,255,0.80)';
        ctx.beginPath();
        ctx.moveTo(-19, 6);
        ctx.quadraticCurveTo(-23, 12,  -19.5, 18);
        ctx.quadraticCurveTo(-15.5, 12, -19,   6);
        ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(17,  6);
        ctx.quadraticCurveTo(13,  12,  16.5, 18);
        ctx.quadraticCurveTo(21, 12,  17,   6);
        ctx.closePath(); ctx.fill();
    }

    // Dots tiêu hoá (nhấp nháy phía trên đầu khi đang tiêu hoá)
    if (digesting) {
        const p = animTime % 0.9;
        [0, 0.3, 0.6].forEach((off, i) => {
            const a = Math.max(0, Math.sin((p - off) * Math.PI / 0.3));
            ctx.globalAlpha = a * 0.85;
            ctx.fillStyle = '#CE93D8';
            ctx.beginPath(); ctx.arc(-8 + i * 8, -upperLift - headRy - 16, 4, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    ctx.restore();
}
