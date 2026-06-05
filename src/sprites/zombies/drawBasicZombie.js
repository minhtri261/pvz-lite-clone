'use strict';
function drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT) {
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    if (state === 'dying') { ctx.rotate(-deathT * 1.5); ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4); }

    const walk   = state === 'walking' ? Math.sin(animTime * 5.5) : 0;
    const eatBob = state === 'eating'  ? Math.abs(Math.sin(animTime * 7)) * 10 : 0;
    ctx.rotate(walk * 0.06);

    if (state !== 'dying') { ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(0, 40, 17, 5, 0, 0, Math.PI * 2); ctx.fill(); }

    // Left leg
    ctx.save(); ctx.translate(-7, 22); ctx.rotate(walk * 0.35);
    ctx.fillStyle = '#4A5699'; ctx.strokeStyle = '#283070'; ctx.lineWidth = 1.5;
    rr(ctx, -5, 0, 11, 20, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.ellipse(-2, 21, 8, 4.5, 0.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();

    // Right leg
    ctx.save(); ctx.translate(7, 22); ctx.rotate(-walk * 0.35);
    ctx.fillStyle = '#4A5699'; ctx.strokeStyle = '#283070'; ctx.lineWidth = 1.5;
    rr(ctx, -5, 0, 11, 20, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.ellipse(2, 21, 8, 4.5, -0.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();

    // Body — gradient tốt hơn, áo cũ rách
    const sg = ctx.createLinearGradient(-14, -5, 14, 25);
    sg.addColorStop(0,   '#7a8e9e');
    sg.addColorStop(0.4, '#6a7e8e');
    sg.addColorStop(1,   '#485e6e');
    ctx.fillStyle = sg; ctx.strokeStyle = '#2e4050'; ctx.lineWidth = 2;
    rr(ctx, -14, -5, 28, 28, 5); ctx.fill(); ctx.stroke();
    // Nếp nhăn áo
    ctx.strokeStyle = 'rgba(38,55,70,0.75)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-5, 6); ctx.lineTo(-3, 16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(4, 5); ctx.lineTo(7, 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-12, 5); ctx.lineTo(-10, 15); ctx.stroke();
    // Vết rách nhỏ trên áo
    ctx.strokeStyle = 'rgba(20,30,40,0.8)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(9, 8); ctx.lineTo(12, 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-11, 14); ctx.lineTo(-8, 18); ctx.stroke();
    // Cà vạt màu đỏ nâu
    const tieGrad = ctx.createLinearGradient(-2, -4, 2, 22);
    tieGrad.addColorStop(0, '#8B0000'); tieGrad.addColorStop(1, '#5a0010');
    ctx.fillStyle = tieGrad;
    ctx.beginPath(); ctx.moveTo(-2, -4); ctx.lineTo(2, -4); ctx.lineTo(4, 18); ctx.lineTo(0, 22); ctx.lineTo(-4, 18); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#3a0008'; ctx.lineWidth = 1; ctx.stroke();

    // Left arm
    ctx.save(); ctx.translate(-14, 5); ctx.rotate(-0.25 + Math.sin(animTime * 2.8) * 0.08);
    ctx.fillStyle = '#8A9E88'; ctx.strokeStyle = '#4a5a48'; ctx.lineWidth = 1.5;
    rr(ctx, -28, -4, 30, 8, 4); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-30, 0, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();

    // Right arm
    ctx.save(); ctx.translate(14, 5); ctx.rotate(0.55 + Math.sin(animTime * 2.8 + 1) * 0.06);
    ctx.fillStyle = '#8A9E88'; ctx.strokeStyle = '#4a5a48'; ctx.lineWidth = 1.5;
    rr(ctx, 0, -4, 22, 8, 4); ctx.fill(); ctx.stroke(); ctx.restore();

    ctx.fillStyle = '#8A9E88'; ctx.fillRect(-5, -18, 10, 14);

    // Head — màu da zombie tốt hơn (xanh-xám chết chóc)
    const hy = -36 + eatBob;
    const hg = ctx.createRadialGradient(-7, hy - 12, 1, 0, hy, 21);
    hg.addColorStop(0,   '#beccba'); // highlight nhạt xanh-xám
    hg.addColorStop(0.35,'#8ea48a'); // tông giữa
    hg.addColorStop(0.72,'#607060'); // tối hơn
    hg.addColorStop(1,   '#3e4e3c'); // viền đậm
    ctx.fillStyle = hg; ctx.strokeStyle = '#2a3828'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, hy, 19, 21, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // Đốm thối rữa nhỏ trên mặt
    ctx.fillStyle = 'rgba(60,45,10,0.40)';
    ctx.beginPath(); ctx.ellipse(-10, hy + 7, 4.5, 3.5, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(9, hy + 1, 3, 2.5, 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(4, hy + 12, 2.5, 2, 0, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#2a2820'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    [-8, -3, 3, 8].forEach((hx, i) => {
        ctx.beginPath(); ctx.moveTo(hx, hy - 19);
        ctx.quadraticCurveTo(hx + (i % 2 === 0 ? -4 : 4), hy - 28, hx + (i % 2 === 0 ? -2 : 3), hy - 33);
        ctx.stroke();
    });

    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-6.5, hy - 5, 5.5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(6.5, hy - 5, 5.5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.beginPath(); ctx.arc(-5.5, hy - 4, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(7.5, hy - 4, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#7a8e78';
    ctx.beginPath(); ctx.ellipse(-6.5, hy - 7, 5.5, 3, 0, Math.PI, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(6.5, hy - 7, 5.5, 3, 0, Math.PI, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#3a0808'; ctx.beginPath(); ctx.ellipse(0, hy + 10, 7.5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#E8DCC8'; ctx.fillRect(-5, hy + 5, 4, 5); ctx.fillRect(1, hy + 6, 3, 4);
    ctx.strokeStyle = 'rgba(120,200,120,0.7)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(2, hy + 15); ctx.quadraticCurveTo(3, hy + 20, 2, hy + 25); ctx.stroke();

    if (hpPct < 0.4) {
        // Vết thương nặng hơn khi máu thấp
        ctx.fillStyle = 'rgba(180,15,15,0.80)';
        ctx.beginPath(); ctx.arc(-4, hy - 16, 5.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(8, hy - 8, 3, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#8B0000'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-8, hy - 13); ctx.lineTo(2, hy - 19); ctx.stroke();
        // Máu chảy xuống
        ctx.fillStyle = 'rgba(160,0,0,0.55)';
        ctx.beginPath();
        ctx.moveTo(-5, hy - 11); ctx.lineTo(-3, hy - 5); ctx.lineTo(-1, hy - 3);
        ctx.closePath(); ctx.fill();
    }
    if (hpPct < 0.2) {
        // Rất nguy kịch — thêm vết nứt xương
        ctx.strokeStyle = 'rgba(200,160,100,0.5)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(10, hy - 14); ctx.lineTo(14, hy - 6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(14, hy - 6); ctx.lineTo(10, hy + 2); ctx.stroke();
    }
    ctx.restore();
}
