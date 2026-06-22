'use strict';
// ══════════════════════════════════════════════════════════════
//  drawIceLettuce.js — Quả cầu băng nhỏ với 2 mắt đen nhìn sang phải
//  pulse: 0→1, hiện hiệu ứng vòng băng lan tỏa khi vừa đóng băng zombie
// ══════════════════════════════════════════════════════════════
function drawIceLettuce(ctx, x, y, animTime, pulse = 0) {
    const bob = Math.sin(animTime * 2) * 1.5;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng đổ
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 26, 18, 5.5, 0, 0, Math.PI * 2); ctx.fill();

    // Vòng băng lan tỏa khi vừa đóng băng zombie
    if (pulse > 0) {
        ctx.save();
        ctx.globalAlpha = pulse * 0.55;
        ctx.strokeStyle = '#B3E5FC';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 4 + bob, 18 + (1 - pulse) * 22, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }

    // Thân — quả cầu băng
    const g = ctx.createRadialGradient(-8, -6 + bob, 3, 0, 4 + bob, 24);
    g.addColorStop(0,    '#F0FBFF');
    g.addColorStop(0.45, '#4FC3F7');
    g.addColorStop(1,    '#0277BD');
    ctx.fillStyle = g;
    ctx.strokeStyle = '#01579B'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, 4 + bob, 22, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Vệt sáng băng (highlight)
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(-8, -2 + bob, 12, Math.PI * 1.1, Math.PI * 1.7); ctx.stroke();

    // Tinh thể băng nhỏ điểm xuyết
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath(); ctx.arc(-10, 10 + bob, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(8, 14 + bob, 1.6, 0, Math.PI * 2); ctx.fill();

    // 2 mắt đen cùng hàng ngang, nhìn sang phải
    ctx.fillStyle = '#10181F';
    ctx.beginPath(); ctx.ellipse(2, 5 + bob, 4, 5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(13, 5 + bob, 4, 5, 0, 0, Math.PI * 2); ctx.fill();

    // Chấm sáng nhỏ trong mắt
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(3.3, 3.7 + bob, 1.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(14.3, 3.7 + bob, 1.3, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
}
