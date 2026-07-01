'use strict';
// RepeaterShroom = PeaShroom + Repeater: nấm xanh lá, 2 ống bào tử bắn burst
function _drawRepeaterShroomBody(ctx, animTime, shootAnim1, shootAnim2) {
    const bob = Math.sin(animTime * 2.5) * 2;
    const rc1 = Math.sin(shootAnim1 * Math.PI) * -6; // recoil ống trên
    const rc2 = Math.sin(shootAnim2 * Math.PI) * -6; // recoil ống dưới

    // Bóng
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath(); ctx.ellipse(0, 28, 11, 3.5, 0, 0, Math.PI * 2); ctx.fill();

    // Thân nấm (stem) xanh lá nhạt
    const stG = ctx.createLinearGradient(-5, 6, 5, 25);
    stG.addColorStop(0, '#b5d870'); stG.addColorStop(1, '#6aaa20');
    ctx.fillStyle = stG; ctx.strokeStyle = '#2a6010'; ctx.lineWidth = 1.5;
    rr(ctx, -6, 9 + bob * 0.3, 12, 19, 4); ctx.fill(); ctx.stroke();

    // Mũ nấm — ellipse xanh lá đậm hơn PeaShroom (nấm "liên đạn")
    const hy = -1 + bob;
    const cG = ctx.createRadialGradient(-8, hy - 12, 2, 0, hy, 22);
    cG.addColorStop(0,    '#AED581');
    cG.addColorStop(0.35, '#7CB342');
    cG.addColorStop(0.8,  '#4CAF50');
    cG.addColorStop(1,    '#1B5E20');
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
    ctx.beginPath(); ctx.ellipse(-7, hy + 1, 5, 5.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( 5, hy + 1, 5, 5.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-6.5, hy + 1.5, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 5.5, hy + 1.5, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(-5, hy - 0.5, 1.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 7, hy - 0.5, 1.2, 0, Math.PI * 2); ctx.fill();

    // ── Ống bào tử KÉP — trên + dưới, mỗi ống giật riêng theo burst ──
    const bx = 16;
    // Ống trên
    const tG1 = ctx.createLinearGradient(bx, hy - 9, bx, hy - 1);
    tG1.addColorStop(0, '#8BC34A'); tG1.addColorStop(1, '#33691E');
    ctx.fillStyle = tG1; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5;
    rr(ctx, bx + rc1, hy - 9, 17, 8, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#2E7D32'; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bx + rc1 + 17, hy - 5, 4.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0a2000';
    ctx.beginPath(); ctx.arc(bx + rc1 + 17, hy - 5, 2.3, 0, Math.PI * 2); ctx.fill();
    // Ống dưới
    const tG2 = ctx.createLinearGradient(bx, hy + 2, bx, hy + 10);
    tG2.addColorStop(0, '#689F38'); tG2.addColorStop(1, '#2E7D32');
    ctx.fillStyle = tG2; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5;
    rr(ctx, bx + rc2, hy + 2, 17, 8, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#33691E'; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bx + rc2 + 17, hy + 6, 4.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0a2000';
    ctx.beginPath(); ctx.arc(bx + rc2 + 17, hy + 6, 2.3, 0, Math.PI * 2); ctx.fill();

    // Miệng cười
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(-1, hy + 13, 6, 0.4, Math.PI - 0.4); ctx.stroke();
}

function drawRepeaterShroom(ctx, x, y, animTime, shootAnim1, shootAnim2, stackCount = 1) {
    if (stackCount === 2) {
        // Con trái (còn sống) — vẽ trước = phía sau
        ctx.save();
        ctx.translate(Math.round(x) - 9, Math.round(y));
        ctx.scale(0.76, 0.76);
        _drawRepeaterShroomBody(ctx, animTime, shootAnim1, shootAnim2);
        ctx.restore();
        // Con phải (bị ăn trước) — vẽ sau = phía trước
        ctx.save();
        ctx.translate(Math.round(x) + 8, Math.round(y) + 2);
        ctx.scale(0.76, 0.76);
        _drawRepeaterShroomBody(ctx, animTime * 1.08 + 0.5, shootAnim1, shootAnim2);
        ctx.restore();
    } else {
        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        _drawRepeaterShroomBody(ctx, animTime, shootAnim1, shootAnim2);
        ctx.restore();
    }
}
