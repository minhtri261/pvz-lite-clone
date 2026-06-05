'use strict';
// PeaShroom = PuffShroom + PeaShooter: nấm xanh lá, bắn xa toàn hàng
function _drawPeaShroomBody(ctx, animTime, shootT) {
    const bob    = Math.sin(animTime * 2.5) * 2;
    const recoil = Math.sin(shootT * Math.PI) * -6;

    // Bóng
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath(); ctx.ellipse(0, 28, 11, 3.5, 0, 0, Math.PI * 2); ctx.fill();

    // Thân nấm (stem) xanh lá nhạt
    const stG = ctx.createLinearGradient(-5, 6, 5, 25);
    stG.addColorStop(0, '#b5d870'); stG.addColorStop(1, '#6aaa20');
    ctx.fillStyle = stG; ctx.strokeStyle = '#2a6010'; ctx.lineWidth = 1.5;
    rr(ctx, -6, 9 + bob * 0.3, 12, 19, 4); ctx.fill(); ctx.stroke();

    // Mũ nấm — ellipse xanh lá đặc trưng
    const hy = -1 + bob;
    const cG = ctx.createRadialGradient(-8, hy - 12, 2, 0, hy, 22);
    cG.addColorStop(0,    '#A5D660'); // xanh lá sáng highlight
    cG.addColorStop(0.35, '#66BB6A'); // xanh lá chính
    cG.addColorStop(0.8,  '#388E3C'); // xanh lá tối
    cG.addColorStop(1,    '#1B5E20'); // viền rất tối
    ctx.fillStyle = cG; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, hy, 22, 19, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Chấm trắng (đặc trưng nấm PvZ)
    ctx.fillStyle = 'rgba(255,255,255,0.72)';
    ctx.beginPath(); ctx.arc(-9, hy - 7, 4,    0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 7, hy - 12, 3.2,  0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(12, hy - 1,  2.5,  0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-2, hy + 9,  2,    0, Math.PI * 2); ctx.fill();

    // Mắt tròn
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-6, hy + 3, 5, 5.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( 6, hy + 3, 5, 5.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-5.5, hy + 3.5, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 6.5, hy + 3.5, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(-4, hy + 1.5, 1.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 8, hy + 1.5, 1.2, 0, Math.PI * 2); ctx.fill();

    // Ống bào tử xanh — nhô ra phải (recoil khi bắn)
    const bx = 18 + recoil;
    const tG = ctx.createLinearGradient(bx, hy + 2, bx, hy + 10);
    tG.addColorStop(0, '#8BC34A'); tG.addColorStop(1, '#33691E');
    ctx.fillStyle = tG; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5;
    rr(ctx, bx, hy + 2, 18, 8, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#2E7D32'; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bx + 18, hy + 6, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0a2000';
    ctx.beginPath(); ctx.arc(bx + 18, hy + 6, 2.5, 0, Math.PI * 2); ctx.fill();

    // Miệng cười
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, hy + 12, 6, 0.4, Math.PI - 0.4); ctx.stroke();
}

function drawPeaShroom(ctx, x, y, animTime, shootT, stackCount = 1) {
    if (stackCount === 2) {
        // Con trái (còn sống) — vẽ trước = phía sau
        ctx.save();
        ctx.translate(Math.round(x) - 9, Math.round(y));
        ctx.scale(0.76, 0.76);
        _drawPeaShroomBody(ctx, animTime, shootT);
        ctx.restore();
        // Con phải (bị ăn trước) — vẽ sau = phía trước
        ctx.save();
        ctx.translate(Math.round(x) + 8, Math.round(y) + 2);
        ctx.scale(0.76, 0.76);
        _drawPeaShroomBody(ctx, animTime * 1.08 + 0.5, shootT);
        ctx.restore();
    } else {
        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        _drawPeaShroomBody(ctx, animTime, shootT);
        ctx.restore();
    }
}
