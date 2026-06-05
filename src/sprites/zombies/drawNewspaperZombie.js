'use strict';
function _drawNewspaperGear(ctx, animTime, eatBob) {
    ctx.save();
    ctx.translate(-12, 2 + eatBob * 0.4);
    ctx.scale(-1, 1);
    ctx.rotate(-0.4 + Math.sin(animTime * 2.8 + 1) * 0.05);

    ctx.fillStyle = '#F0ECD0'; ctx.strokeStyle = '#999'; ctx.lineWidth = 1;
    rr(ctx, 2, -16, 24, 20, 2); ctx.fill(); ctx.stroke();

    ctx.beginPath(); ctx.moveTo(14, -16); ctx.lineTo(14, 4);
    ctx.strokeStyle = 'rgba(100,90,60,0.5)'; ctx.stroke();

    ctx.strokeStyle = 'rgba(40,30,15,0.35)'; ctx.lineWidth = 0.8;
    for (let ly = -13; ly < 3; ly += 2.8) {
        ctx.beginPath(); ctx.moveTo(3, ly); ctx.lineTo(13, ly); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(15, ly); ctx.lineTo(25, ly); ctx.stroke();
    }

    ctx.fillStyle = 'rgba(20,15,5,0.7)'; ctx.font = 'bold 4px Arial'; ctx.textAlign = 'left';
    ctx.fillText('DAILY', 3, -9);
    ctx.fillText('DEAD',  3, -5);
    ctx.restore();
}

function drawNewspaperZombie(ctx, x, y, animTime, state, hpPct, hasPaper, deathT) {
    const showPaper = hasPaper && !(state === 'dying' && deathT > 0.6);
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: {
            rageEyes:   !hasPaper,
            drawGearFn: showPaper ? _drawNewspaperGear : null,
        },
        effects: [],
    });
}
