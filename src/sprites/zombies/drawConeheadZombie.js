'use strict';
function _drawConeHat(ctx, hy) {
    const cg = ctx.createLinearGradient(-14, hy - 62, 14, hy - 16);
    cg.addColorStop(0,   '#FF8C00');
    cg.addColorStop(0.6, '#FF5500');
    cg.addColorStop(1,   '#CC2200');
    ctx.fillStyle = cg; ctx.strokeStyle = '#8B2200'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(0, hy - 62); ctx.lineTo(16, hy - 16); ctx.lineTo(-16, hy - 16); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.75)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-9, hy - 28); ctx.lineTo(9, hy - 28); ctx.stroke();
    ctx.fillStyle = '#CC3300'; ctx.strokeStyle = '#8B2200'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, hy - 16, 17, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
}

// External/legacy wrapper — ConeheadZombie.draw() uses drawZombieBase(ctx, this) directly.
function drawConeheadZombie(ctx, x, y, animTime, state, hpPct, hasCone, deathT) {
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: { drawHatFn: hasCone ? _drawConeHat : null },
        effects: [],
    });
}
