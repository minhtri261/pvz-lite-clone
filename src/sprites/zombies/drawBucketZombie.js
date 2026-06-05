'use strict';
function _drawBucketHat(ctx, hy) {
    const bTop = hy - 46, bBase = hy - 14;
    const bg = ctx.createLinearGradient(0, bTop, 0, bBase);
    bg.addColorStop(0,    '#6a6a6a');
    bg.addColorStop(0.35, '#9a9a9a');
    bg.addColorStop(0.7,  '#CECECE');
    bg.addColorStop(1,    '#E8E8E8');
    ctx.fillStyle = bg; ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-19, bBase); ctx.lineTo(-12, bTop);
    ctx.lineTo( 12, bTop); ctx.lineTo( 19, bBase);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#7a7a7a'; ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, bTop, 12, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#BEBEBE'; ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, bBase, 19, 6.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.strokeStyle = 'rgba(50,50,50,0.55)'; ctx.lineWidth = 1.5;
    [0.32, 0.66].forEach(t => {
        const by = lerp(bBase, bTop, t), bw = lerp(19, 12, t);
        ctx.beginPath(); ctx.moveTo(-bw, by); ctx.lineTo(bw, by); ctx.stroke();
    });

    ctx.strokeStyle = '#8a8a8a'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, bTop, 10, Math.PI + 0.3, -0.3); ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(-16, bBase - 3); ctx.lineTo(-11, bTop + 5); ctx.stroke();
}

function drawBucketZombie(ctx, x, y, animTime, state, hpPct, hasBucket, deathT) {
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: { drawHatFn: hasBucket ? _drawBucketHat : null },
        effects: [],
    });
}
