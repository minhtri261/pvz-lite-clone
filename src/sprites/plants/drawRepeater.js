'use strict';
function drawRepeater(ctx, x, y, animTime, shootAnim1, shootAnim2) {
    const bob    = Math.sin(animTime * 2.5) * 2;
    const rc1    = Math.sin(shootAnim1 * Math.PI) * -8; // recoil nòng trên
    const rc2    = Math.sin(shootAnim2 * Math.PI) * -8; // recoil nòng dưới
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 28, 14, 4.5, 0, 0, Math.PI * 2); ctx.fill();

    // Thân cây
    ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 26); ctx.quadraticCurveTo(2, 10, 1, -2 + bob); ctx.stroke();
    ctx.strokeStyle = 'rgba(185,228,120,0.45)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-1, 23); ctx.quadraticCurveTo(1, 10, 0, -2 + bob); ctx.stroke();

    // Lá trái
    ctx.save(); ctx.translate(-2, 10 + bob * 0.3); ctx.rotate(-0.5);
    ctx.fillStyle = '#558B2F'; ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(-5, 0, 10, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
    // Lá phải
    ctx.save(); ctx.translate(2, 13 + bob * 0.3); ctx.rotate(0.55);
    ctx.fillStyle = '#558B2F'; ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(5, 0, 8, 3.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();

    // Đầu tròn — xanh đậm hơn Peashooter (nòng kép)
    const hy = -12 + bob;
    const R  = 20;
    const hg = ctx.createRadialGradient(-R * 0.32, hy - R * 0.32, R * 0.05, 0, hy, R);
    hg.addColorStop(0, '#AED581'); hg.addColorStop(0.3, '#7CB342');
    hg.addColorStop(0.75, '#4CAF50'); hg.addColorStop(1, '#1B5E20');
    ctx.fillStyle = hg; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, hy, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Nòng trên
    const bxBase = Math.round(R * 0.76);
    const barGrad = ctx.createLinearGradient(bxBase, hy - 11, bxBase, hy);
    barGrad.addColorStop(0, '#66BB6A'); barGrad.addColorStop(0.5, '#43A047'); barGrad.addColorStop(1, '#2E7D32');
    ctx.fillStyle = barGrad; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    rr(ctx, bxBase + rc1, hy - 11, 24, 9, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#33691E'; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bxBase + rc1 + 24, hy - 6.5, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0d2600'; ctx.beginPath(); ctx.arc(bxBase + rc1 + 24, hy - 6.5, 3.5, 0, Math.PI * 2); ctx.fill();

    // Nòng dưới
    const barGrad2 = ctx.createLinearGradient(bxBase, hy + 1, bxBase, hy + 10);
    barGrad2.addColorStop(0, '#558B2F'); barGrad2.addColorStop(0.5, '#388E3C'); barGrad2.addColorStop(1, '#2E7D32');
    ctx.fillStyle = barGrad2; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    rr(ctx, bxBase + rc2, hy + 1, 24, 9, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#2E7D32'; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bxBase + rc2 + 24, hy + 5.5, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0d2600'; ctx.beginPath(); ctx.arc(bxBase + rc2 + 24, hy + 5.5, 3.5, 0, Math.PI * 2); ctx.fill();

    // Mắt trái
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-7, hy - 8, 6.5, 7.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(-6.5, hy - 7, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(-5, hy - 9.5, 1.8, 0, Math.PI * 2); ctx.fill();
    // Miệng
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(2, hy + 9, 6, 0.4, Math.PI - 0.4); ctx.stroke();

    ctx.restore();
}
