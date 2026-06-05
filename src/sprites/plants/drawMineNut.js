'use strict';
// Mine Nut: WallNut + PotatoMine fusion
// WallNut body với dải cảnh báo đỏ + ngòi nổ → khi hết máu sẽ phát nổ!
// exploding: đang trong animation nổ | explodeT: tiến trình 0→1
function drawMineNut(ctx, x, y, animTime, hpPct, exploding, explodeT) {
    if (exploding) {
        ctx.save(); ctx.translate(Math.round(x), Math.round(y) - 5);
        ctx.globalAlpha = Math.max(0, 1 - explodeT * 1.6);
        ctx.strokeStyle = '#FFF9C4'; ctx.lineWidth = 6 * (1 - explodeT);
        ctx.beginPath(); ctx.arc(0, 0, explodeT * 80, 0, Math.PI * 2); ctx.stroke();
        const fg = ctx.createRadialGradient(0, 0, 0, 0, 0, explodeT * 62);
        fg.addColorStop(0, 'rgba(255,240,160,0.95)');
        fg.addColorStop(0.3, 'rgba(255,100,0,0.85)');
        fg.addColorStop(1, 'rgba(180,0,0,0)');
        ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(0, 0, explodeT * 62, 0, Math.PI * 2); ctx.fill();
        ctx.restore(); return;
    }

    // WallNut base
    drawWallNut(ctx, x, y, animTime, hpPct);

    const hitShake = hpPct < 0.5 ? Math.sin(animTime * 18) * 1.5 : 0;
    ctx.save(); ctx.translate(Math.round(x + hitShake), Math.round(y));

    // Dải nguy hiểm đỏ-vàng ở giữa thân hạt (clip vào ellipse)
    ctx.save();
    ctx.beginPath(); ctx.ellipse(0, 0, 28, 30, 0, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = 'rgba(210,30,10,0.68)';
    ctx.fillRect(-28, -6, 56, 12);
    // Kẻ vàng xen kẽ
    ctx.fillStyle = 'rgba(255,200,0,0.50)';
    for (let i = -28; i < 30; i += 10) {
        ctx.fillRect(i, -6, 5, 12);
    }
    ctx.restore();

    // Ngòi nổ nhỏ ở đỉnh
    ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(4, -29); ctx.quadraticCurveTo(14, -38, 11, -46); ctx.stroke();
    // Tia lửa nhấp nháy
    if (Math.sin(animTime * 9) > 0.1) {
        ctx.fillStyle = '#FF8800';
        ctx.beginPath(); ctx.arc(11, -46, 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath(); ctx.arc(11, -46, 1.5, 0, Math.PI * 2); ctx.fill();
    }

    ctx.restore();
}
