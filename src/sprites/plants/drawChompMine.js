'use strict';
// Chomp Mine — fusion Chomper + Potato Mine
//   Thân, lá, đầu và miệng cắn 2 hàm giống hệt Chomper,
//   nhưng tô lại bằng bảng màu vàng-nâu của Potato Mine
//   và có thêm ngòi nổ (copy từ Potato Mine) cắm trên đỉnh đầu.
//   Khi bị zombie cắn trúng → phát nổ (vẽ giống vụ nổ Potato Mine).
function drawChompMine(ctx, x, y, animTime, chomping, chompT, digesting, exploding, explodeT) {
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

    const bob = chomping ? 0 : Math.sin(animTime * 2.2) * 2;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng rộng
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.beginPath(); ctx.ellipse(0, 32, 22, 6.5, 0, 0, Math.PI * 2); ctx.fill();

    // Thân cây — vàng nâu Potato Mine (thay tím Chomper)
    ctx.strokeStyle = '#7a5010'; ctx.lineWidth = 11; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 30); ctx.quadraticCurveTo(2, 14, 1, 4 + bob); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,225,180,0.35)'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-1, 28); ctx.quadraticCurveTo(1, 14, 0, 4 + bob); ctx.stroke();

    // Lá lớn trái phải — vàng nâu
    [[-1, 0.72], [1, -0.72]].forEach(([s, ang]) => {
        ctx.save();
        ctx.translate(s * 7, 14 + bob * 0.4); ctx.rotate(ang);
        const lg = ctx.createRadialGradient(s * 12, -2, 2, s * 10, 0, 20);
        lg.addColorStop(0, '#F0D880'); lg.addColorStop(1, '#7a5010');
        ctx.fillStyle = lg; ctx.strokeStyle = '#4a2c06'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(s * 12, 0, 20, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(s * 24, 0); ctx.stroke();
        ctx.restore();
    });
    // Lá nhỏ giữa
    ctx.save(); ctx.translate(0, 6 + bob * 0.5);
    ctx.fillStyle = '#C89018'; ctx.strokeStyle = '#4a2c06'; ctx.lineWidth = 1.5;
    [-1, 1].forEach(s => {
        ctx.save(); ctx.rotate(s * 0.45);
        ctx.beginPath(); ctx.ellipse(s * 8, -4, 11, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.restore();
    });
    ctx.restore();

    // ── ĐẦU (giống Chomper, tô vàng nâu) ─────────────────────────
    const headY  = -10 + bob;
    const headRx = 30, headRy = 27;

    let openAmt;
    if (chomping)       openAmt = Math.sin(chompT * Math.PI);
    else if (digesting) openAmt = 0.03 + Math.sin(animTime * 4) * 0.02;
    else                openAmt = 0.05 + Math.sin(animTime * 2.2) * 0.03;

    const upperLift = openAmt * headRy * 0.9;
    const lowerDrop = openAmt * headRy * 0.38;
    const toothH    = Math.min(13, openAmt * 32);

    if (openAmt > 0.02) {
        ctx.fillStyle = '#D8881B';
        ctx.beginPath();
        ctx.ellipse(0, headY - upperLift * 0.3 + lowerDrop * 0.3,
                    headRx * 0.88, (upperLift + lowerDrop) * 0.5 + 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#8a4e0e';
        ctx.beginPath();
        ctx.ellipse(0, headY - upperLift * 0.12 + lowerDrop * 0.12,
                    headRx * 0.5, (upperLift + lowerDrop) * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#2c1700';
        ctx.beginPath();
        ctx.ellipse(0, headY, headRx * 0.2, (upperLift + lowerDrop) * 0.14 + 1, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Hàm dưới
    ctx.save();
    ctx.translate(0, headY + lowerDrop);
    const ljg = ctx.createRadialGradient(-headRx * 0.1, headRy * 0.35, 2, 0, 0, headRx + 2);
    ljg.addColorStop(0, '#F0D880'); ljg.addColorStop(0.45, '#C89018'); ljg.addColorStop(1, '#5a3608');
    ctx.fillStyle = ljg; ctx.strokeStyle = '#3E2200'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, 0, headRx, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (toothH > 1) {
        ctx.fillStyle = '#F8F8F8'; ctx.strokeStyle = '#CCC'; ctx.lineWidth = 1;
        [-19, -7, 5, 17].forEach(tx => {
            ctx.beginPath(); ctx.moveTo(tx-4,0); ctx.lineTo(tx+4,0); ctx.lineTo(tx,-toothH*0.85); ctx.closePath(); ctx.fill(); ctx.stroke();
        });
    }
    ctx.restore();

    // Hàm trên
    ctx.save();
    ctx.translate(0, headY - upperLift);
    const ujg = ctx.createRadialGradient(-headRx * 0.35, -headRy * 0.35, 2, 0, 0, headRx + 2);
    ujg.addColorStop(0, '#FFE9A8'); ujg.addColorStop(0.3, '#E0B040'); ujg.addColorStop(0.75, '#C89018'); ujg.addColorStop(1, '#5a3608');
    ctx.fillStyle = ujg; ctx.strokeStyle = '#3E2200'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, 0, headRx, Math.PI, 0, false); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (toothH > 1) {
        ctx.fillStyle = '#FFFFFF'; ctx.strokeStyle = '#CCC'; ctx.lineWidth = 1;
        [-22, -11, 0, 11, 22].forEach(tx => {
            ctx.beginPath(); ctx.moveTo(tx-4.5,0); ctx.lineTo(tx+4.5,0); ctx.lineTo(tx,toothH); ctx.closePath(); ctx.fill(); ctx.stroke();
        });
    }
    // Mắt
    const eyeScY = digesting ? 0.32 : 1.0;
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-14, -11, 8, 9 * eyeScY, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(10, -9, 6.5, 7.5 * eyeScY, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#5a3608'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#2c1700';
    ctx.beginPath(); ctx.arc(-13, -10, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(11, -8, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(-11, -14, 2.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(13, -11, 1.7, 0, Math.PI * 2); ctx.fill();
    if (digesting) {
        ctx.fillStyle = '#E0A030';
        ctx.beginPath(); ctx.ellipse(-14, -14, 9, 5.5, 0, Math.PI, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(10, -12, 7.5, 4.5, 0, Math.PI, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // ── Ngòi nổ Potato Mine cắm trên đỉnh đầu ────────────────────
    const fuseBaseX = 4, fuseBaseY = headY - headRy + 6;
    ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(fuseBaseX, fuseBaseY);
    ctx.quadraticCurveTo(fuseBaseX + 6, fuseBaseY - 9, fuseBaseX + 3, fuseBaseY - 18);
    ctx.stroke();
    const fuseBlink = Math.sin(animTime * 7);
    const ftx = fuseBaseX + 3, fty = fuseBaseY - 18;
    ctx.fillStyle = fuseBlink > 0 ? 'rgba(255,240,210,0.38)' : 'rgba(255,40,0,0.32)';
    ctx.beginPath(); ctx.arc(ftx, fty, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = fuseBlink > 0 ? 'rgba(255,200,150,0.55)' : 'rgba(255,80,0,0.5)';
    ctx.beginPath(); ctx.arc(ftx, fty, 5.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = fuseBlink > 0 ? '#FFFFFF' : '#FF2200';
    ctx.beginPath(); ctx.arc(ftx, fty, 3.5, 0, Math.PI * 2); ctx.fill();
    if (fuseBlink <= 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath(); ctx.arc(ftx, fty, 1.2, 0, Math.PI * 2); ctx.fill();
    }

    // Dots tiêu hoá
    if (digesting) {
        const p = animTime % 0.9;
        [0, 0.3, 0.6].forEach((off, i) => {
            const a = Math.max(0, Math.sin((p - off) * Math.PI / 0.3));
            ctx.globalAlpha = a * 0.85;
            ctx.fillStyle = '#F0D880';
            ctx.beginPath(); ctx.arc(-8 + i * 8, headY - upperLift - headRy - 12, 4, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    ctx.restore();
}
