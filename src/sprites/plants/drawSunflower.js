'use strict';
function drawSunflower(ctx, x, y, animTime, producing) {
    const sway = Math.sin(animTime * 1.3) * 5;
    const bob  = Math.sin(animTime * 2.6) * 2;
    const sc   = producing ? 1 + Math.sin(animTime * 8) * 0.06 : 1;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(sway * 0.4, 30, 19, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#388E3C'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 29); ctx.quadraticCurveTo(sway * 0.5, 8, sway, -8 + bob); ctx.stroke();

    ctx.save(); ctx.translate(sway, -8 + bob); ctx.scale(sc, sc);
    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + animTime * 0.25;
        ctx.save(); ctx.rotate(a);
        const pg = ctx.createLinearGradient(0, -30, 0, -18);
        pg.addColorStop(0, '#FFF176'); pg.addColorStop(1, '#FDD835');
        ctx.fillStyle = pg; ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(0, -22, 6.5, 13, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    }
    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + Math.PI / 8 + animTime * 0.25;
        ctx.save(); ctx.rotate(a);
        ctx.fillStyle = '#FFCA28'; ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(0, -18, 5, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    }
    const cg = ctx.createRadialGradient(-4, -5, 2, 0, 0, 16);
    cg.addColorStop(0, '#A1887F'); cg.addColorStop(0.6, '#935743'); cg.addColorStop(1, '#8a6237');
    ctx.fillStyle = cg; ctx.strokeStyle = '#966330'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#8a6237';
    for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; ctx.beginPath(); ctx.arc(Math.cos(a) * 8, Math.sin(a) * 8, 2.2, 0, Math.PI * 2); ctx.fill(); }
    for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2 + 0.3; ctx.beginPath(); ctx.arc(Math.cos(a) * 4.5, Math.sin(a) * 4.5, 1.8, 0, Math.PI * 2); ctx.fill(); }

    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-5, -3, 3.8, 4.8, 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(5, -3, 3.8, 4.8, -0.1, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1A237E';
    ctx.beginPath(); ctx.arc(-4, -2, 2.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(6, -2, 2.3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(-3.2, -3.8, 1.1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(6.8, -3.8, 1.1, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#3E2723'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 2, 8, 0.25, Math.PI - 0.25); ctx.stroke();

    ctx.restore(); ctx.restore();
}
