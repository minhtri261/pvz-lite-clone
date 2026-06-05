'use strict';
function _drawFlagGear(ctx, animTime, eatBob) {
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
}

function drawFlagZombie(ctx, x, y, animTime, state, hpPct, deathT) {
    const showFlag = !(state === 'dying' && deathT > 0.6);
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: { drawGearFn: showFlag ? _drawFlagGear : null },
        effects: [],
    });
}
