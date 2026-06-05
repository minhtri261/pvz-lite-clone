'use strict';
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
