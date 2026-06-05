'use strict';
function drawPuffShroom(ctx, x, y, animTime, shootT) {
    const bob    = Math.sin(animTime * 2.5) * 2;
    const recoil = Math.sin(shootT * Math.PI) * -6;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath(); ctx.ellipse(0, 28, 11, 3.5, 0, 0, Math.PI * 2); ctx.fill();

    // Thân nấm (stem) nâu ngắn
    const stG = ctx.createLinearGradient(-5, 6, 5, 25);
    stG.addColorStop(0, '#d4a878'); stG.addColorStop(1, '#8a5a28');
    ctx.fillStyle = stG; ctx.strokeStyle = '#5a3510'; ctx.lineWidth = 1.5;
    rr(ctx, -6, 9 + bob * 0.3, 12, 19, 4); ctx.fill(); ctx.stroke();

    // Mũ nấm — ellipse tím đặc trưng
    const hy = -1 + bob;
    const cG = ctx.createRadialGradient(-8, hy - 12, 2, 0, hy, 22);
    cG.addColorStop(0,    '#EA80FC'); // tím sáng highlight
    cG.addColorStop(0.35, '#9C27B0'); // tím chính
    cG.addColorStop(0.8,  '#6A1B9A'); // tím tối
    cG.addColorStop(1,    '#4A148C'); // viền
    ctx.fillStyle = cG; ctx.strokeStyle = '#38006b'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, hy, 22, 19, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Chấm trắng (đặc trưng của nấm PvZ)
    ctx.fillStyle = 'rgba(255,255,255,0.72)';
    ctx.beginPath(); ctx.arc(-9, hy - 7, 4,    0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 7, hy - 12, 3.2,  0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(12, hy - 1,  2.5,  0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-2, hy + 9,  2,    0, Math.PI * 2); ctx.fill();

    // Mắt tròn
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-6, hy + 3, 5, 5.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( 6, hy + 3, 5, 5.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#4A148C'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-5.5, hy + 3.5, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 6.5, hy + 3.5, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(-4, hy + 1.5, 1.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 8, hy + 1.5, 1.2, 0, Math.PI * 2); ctx.fill();

    // Ống bào tử — nhô ra phải (recoil khi bắn)
    const bx = 18 + recoil;
    const tG = ctx.createLinearGradient(bx, hy + 2, bx, hy + 10);
    tG.addColorStop(0, '#CE93D8'); tG.addColorStop(1, '#7B1FA2');
    ctx.fillStyle = tG; ctx.strokeStyle = '#38006b'; ctx.lineWidth = 1.5;
    rr(ctx, bx, hy + 2, 18, 8, 3); ctx.fill(); ctx.stroke();
    // Miệng ống
    ctx.fillStyle = '#4A148C'; ctx.strokeStyle = '#38006b'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bx + 18, hy + 6, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1a0020';
    ctx.beginPath(); ctx.arc(bx + 18, hy + 6, 2.5, 0, Math.PI * 2); ctx.fill();

    // Miệng cười
    ctx.strokeStyle = '#38006b'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, hy + 12, 6, 0.4, Math.PI - 0.4); ctx.stroke();

    ctx.restore();
}
