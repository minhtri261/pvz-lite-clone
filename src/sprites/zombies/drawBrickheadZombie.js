'use strict';
function drawBrickheadZombie(ctx, x, y, animTime, state, hpPct, hasBrick, brickPct, deathT) {
    drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT);
    if (!hasBrick) return;

    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    if (state === 'dying') { ctx.rotate(-deathT * 1.5); ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4); }

    const eatBob = state === 'eating' ? Math.abs(Math.sin(animTime * 7)) * 10 : 0;
    const hy = -36 + eatBob;

    // Cục gạch lớn trên đầu
    const bL = -22, bT = hy - 46, bW = 44, bH = 38;

    // Thân gạch — ĐỎ GẠCH (brick red, giống gạch thật)
    const bg = ctx.createLinearGradient(bL, bT, bL, bT + bH);
    bg.addColorStop(0,    '#CC3822'); // đỏ gạch sáng (highlight trên)
    bg.addColorStop(0.35, '#A82C18'); // đỏ gạch trung
    bg.addColorStop(0.72, '#8A1E0E'); // đỏ gạch tối
    bg.addColorStop(1,    '#6a1408'); // rất tối (cạnh dưới)
    ctx.fillStyle = bg; ctx.strokeStyle = '#4a0e06'; ctx.lineWidth = 2.5;
    rr(ctx, bL, bT, bW, bH, 3); ctx.fill(); ctx.stroke();

    // Đường vữa ngang (mortar màu xám nhạt — tương phản với gạch đỏ)
    ctx.strokeStyle = 'rgba(200,150,120,0.45)'; ctx.lineWidth = 1.5;
    const m1y = bT + bH * 0.33, m2y = bT + bH * 0.66;
    ctx.beginPath(); ctx.moveTo(bL, m1y); ctx.lineTo(bL + bW, m1y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bL, m2y); ctx.lineTo(bL + bW, m2y); ctx.stroke();
    // Đường vữa dọc (so le từng hàng)
    ctx.beginPath(); ctx.moveTo(bL + bW * 0.5, bT);  ctx.lineTo(bL + bW * 0.5, m1y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bL + bW * 0.25, m1y); ctx.lineTo(bL + bW * 0.25, m2y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bL + bW * 0.75, m1y); ctx.lineTo(bL + bW * 0.75, m2y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bL + bW * 0.5, m2y);  ctx.lineTo(bL + bW * 0.5, bT + bH); ctx.stroke();

    // Highlight ấm trên gạch đỏ
    ctx.fillStyle = 'rgba(255,180,130,0.14)';
    ctx.fillRect(bL + 2, bT + 2, bW - 4, bH * 0.28);

    // Vết nứt khi HP gạch thấp (màu tối hơn để nổi bật trên nền đỏ)
    if (brickPct < 0.65) {
        ctx.strokeStyle = 'rgba(30,5,0,0.75)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(bL + 8, bT + 4); ctx.lineTo(bL + 14, bT + 16); ctx.lineTo(bL + 10, bT + 28); ctx.stroke();
    }
    if (brickPct < 0.3) {
        ctx.strokeStyle = 'rgba(20,2,0,0.82)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(bL + 26, bT + 3); ctx.lineTo(bL + 22, bT + 15); ctx.lineTo(bL + 32, bT + 24); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bL + 34, bT + 30); ctx.lineTo(bL + 40, bT + 36); ctx.stroke();
        // Bụi gạch vỡ màu đỏ nhạt
        ctx.fillStyle = 'rgba(180,60,30,0.25)';
        ctx.beginPath(); ctx.arc(bL + 28, bT + 35, 5, 0, Math.PI * 2); ctx.fill();
    }

    ctx.restore();
}
