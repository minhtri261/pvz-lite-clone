'use strict';
function drawBucketZombie(ctx, x, y, animTime, state, hpPct, hasBucket, deathT) {
    drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT);
    if (!hasBucket) return;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    if (state === 'dying') { ctx.rotate(-deathT * 1.5); ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4); }
    const eatBob = state === 'eating' ? Math.abs(Math.sin(animTime * 7)) * 10 : 0;
    const hy = -36 + eatBob;
    const bTop = hy - 46, bBase = hy - 14;

    // Xô úp ngược (đang đội trên đầu):
    //   bBase (y = hy-14, gần đầu)  = miệng xô → RỘNG hơn
    //   bTop  (y = hy-46, trên cao) = đáy xô   → HẸP hơn
    const bucketG = ctx.createLinearGradient(0, bTop, 0, bBase);
    bucketG.addColorStop(0,   '#6a6a6a'); // đáy xô (trên) tối
    bucketG.addColorStop(0.35,'#9a9a9a');
    bucketG.addColorStop(0.7, '#CECECE'); // miệng xô (dưới) sáng
    bucketG.addColorStop(1,   '#E8E8E8');
    ctx.fillStyle = bucketG; ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-19, bBase); // miệng xô (dưới), rộng
    ctx.lineTo(-12, bTop);  // đáy xô (trên), hẹp
    ctx.lineTo(12, bTop);   // đáy xô (trên), hẹp
    ctx.lineTo(19, bBase);  // miệng xô (dưới), rộng
    ctx.closePath(); ctx.fill(); ctx.stroke();

    // Đáy xô (phẳng, ở TRÊN cao) — hẹp
    ctx.fillStyle = '#7a7a7a'; ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, bTop, 12, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Vành miệng xô (ở DƯỚI, gần đầu zombie) — rộng
    ctx.fillStyle = '#BEBEBE'; ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, bBase, 19, 6.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Đai ngang — hẹp dần từ dưới lên trên
    ctx.strokeStyle = 'rgba(50,50,50,0.55)'; ctx.lineWidth = 1.5;
    [0.32, 0.66].forEach(t => {
        const by = lerp(bBase, bTop, t); // từ miệng lên đáy
        const bw = lerp(19, 12, t);      // hẹp dần
        ctx.beginPath(); ctx.moveTo(-bw, by); ctx.lineTo(bw, by); ctx.stroke();
    });

    // Quai xô — ở đáy (phía trên)
    ctx.strokeStyle = '#8a8a8a'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, bTop, 10, Math.PI + 0.3, -0.3); ctx.stroke();

    // Highlight phản sáng
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(-16, bBase - 3); ctx.lineTo(-11, bTop + 5); ctx.stroke();

    ctx.restore();
}
