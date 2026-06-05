'use strict';
function drawFlagZombie(ctx, x, y, animTime, state, hpPct, deathT) {
    drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT);
    if (state === 'dying' && deathT > 0.6) return;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    if (state === 'dying') { ctx.rotate(-deathT * 1.5); ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4); }
    const eatBob = state === 'eating' ? Math.abs(Math.sin(animTime * 7)) * 10 : 0;
    ctx.strokeStyle = '#8B7355'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-38, -36 + eatBob); ctx.lineTo(-38, 5 + eatBob); ctx.stroke();
    const fw = Math.sin(animTime * 5) * 5;
    ctx.fillStyle = '#CC0000'; ctx.strokeStyle = '#880000'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-38, -36 + eatBob);
    ctx.quadraticCurveTo(-20 + fw, -30 + eatBob, -16 + fw, -28 + eatBob);
    ctx.quadraticCurveTo(-20 + fw, -20 + eatBob, -38, -20 + eatBob);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = 'bold 10px Arial'; ctx.textAlign = 'center';
    ctx.fillText('Z', -28 + fw * 0.3, -27 + eatBob);
    ctx.restore();
}
