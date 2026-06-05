'use strict';
function drawCherryBomb(ctx, x, y, animTime, fuseT, exploding, explodeT) {
    if (exploding) {
        ctx.save(); ctx.translate(Math.round(x), Math.round(y) - 10);
        ctx.globalAlpha = Math.max(0, 1 - explodeT * 1.5);
        ctx.strokeStyle = '#FFF9C4'; ctx.lineWidth = 10 * (1 - explodeT);
        ctx.beginPath(); ctx.arc(0, 0, explodeT * 130, 0, Math.PI * 2); ctx.stroke();
        const fg = ctx.createRadialGradient(0, 0, 0, 0, 0, explodeT * 100);
        fg.addColorStop(0, 'rgba(255,255,200,0.95)');
        fg.addColorStop(0.3, 'rgba(255,140,0,0.85)');
        fg.addColorStop(1, 'rgba(180,0,0,0)');
        ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(0, 0, explodeT * 100, 0, Math.PI * 2); ctx.fill();
        ctx.restore(); return;
    }
    const shake = fuseT > 0.6 ? Math.sin(animTime * 30) * (fuseT - 0.6) * 6 : 0;
    const sc = 1 + Math.sin(animTime * (3 + fuseT * 8)) * 0.04;
    ctx.save(); ctx.translate(Math.round(x + shake), Math.round(y)); ctx.scale(sc, sc);

    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(0, 20, 18, 5, 0, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(5, -28); ctx.quadraticCurveTo(18, -40, 12, -52); ctx.stroke();

    const spX = lerp(5, 12, fuseT), spY = lerp(-28, -52, fuseT);
    ctx.fillStyle = `rgba(255,${Math.floor(200 * (1 - fuseT))},0,0.4)`;
    ctx.beginPath(); ctx.arc(spX, spY, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.arc(spX, spY, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white';   ctx.beginPath(); ctx.arc(spX, spY, 2, 0, Math.PI * 2); ctx.fill();

    const lcg = ctx.createRadialGradient(-10, -16, 2, -8, -12, 14);
    lcg.addColorStop(0, '#FF8A80'); lcg.addColorStop(0.5, '#D32F2F'); lcg.addColorStop(1, '#7F0000');
    ctx.fillStyle = lcg; ctx.strokeStyle = '#5a0000'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(-10, -10, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    const rcg = ctx.createRadialGradient(10, -14, 2, 10, -10, 14);
    rcg.addColorStop(0, '#FF8A80'); rcg.addColorStop(0.5, '#D32F2F'); rcg.addColorStop(1, '#7F0000');
    ctx.fillStyle = rcg; ctx.strokeStyle = '#5a0000'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(10, -7, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.strokeStyle = '#4CAF50'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-10, -24); ctx.quadraticCurveTo(-5, -32, 5, -28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, -21); ctx.quadraticCurveTo(8, -30, 5, -28); ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.beginPath(); ctx.ellipse(-13, -15, 4.5, 3, 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(7, -12, 4.5, 3, 0.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#5C0000';
    ctx.beginPath(); ctx.arc(-13, -10, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-6, -10, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#5C0000'; ctx.lineWidth = 2;
    if (fuseT < 0.5) { ctx.beginPath(); ctx.arc(-9, -5, 4, 0.2, Math.PI - 0.2); ctx.stroke(); }
    else             { ctx.beginPath(); ctx.arc(-9, -3, 4, Math.PI + 0.3, -0.3); ctx.stroke(); }

    ctx.restore();
}
