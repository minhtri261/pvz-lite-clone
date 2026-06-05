'use strict';
function drawSnowPea(ctx, x, y, animTime, shootT) {
    const bob = Math.sin(animTime * 2.8) * 2.5;
    const recoil = Math.sin(shootT * Math.PI) * -10;
    const leafSway = Math.sin(animTime * 1.6) * 0.08;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.beginPath(); ctx.ellipse(2, 30, 20, 6, 0, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#0097A7'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 29); ctx.quadraticCurveTo(3, 14, 0, 2 + bob); ctx.stroke();

    ctx.save(); ctx.translate(-4, 8 + bob * 0.4); ctx.rotate(-0.45 + leafSway);
    ctx.fillStyle = '#00BCD4'; ctx.strokeStyle = '#006064'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(-7, 0, 13, 5.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(4, 12 + bob * 0.4); ctx.rotate(0.55 - leafSway);
    ctx.fillStyle = '#00BCD4'; ctx.strokeStyle = '#006064'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(7, 0, 11, 4.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();

    const hy = -8 + bob;
    const hg = ctx.createRadialGradient(-7, hy - 10, 3, 0, hy, 25);
    hg.addColorStop(0, '#E0F7FA'); hg.addColorStop(0.45, '#00BCD4'); hg.addColorStop(1, '#006064');
    ctx.fillStyle = hg; ctx.strokeStyle = '#004D40'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, hy, 23, 26, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,0.65)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + animTime * 0.6;
        ctx.save(); ctx.translate(Math.cos(a) * 10, hy + Math.sin(a) * 10); ctx.rotate(a);
        ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(4, 0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(0, 4); ctx.stroke();
        ctx.restore();
    }

    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.ellipse(-7, hy - 6, 7, 8.5, 0.15, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#006064'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#1A237E'; ctx.beginPath(); ctx.ellipse(-5, hy - 5, 4.5, 5.5, 0.15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.beginPath(); ctx.arc(-4, hy - 8, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#006064'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(3, hy + 8, 9, 0.3, Math.PI - 0.3); ctx.stroke();

    const bx = 16 + recoil;
    const bbg = ctx.createLinearGradient(bx, hy - 6, bx, hy + 6);
    bbg.addColorStop(0, '#80DEEA'); bbg.addColorStop(1, '#006064');
    ctx.fillStyle = bbg; ctx.strokeStyle = '#006064'; ctx.lineWidth = 2;
    rr(ctx, bx, hy - 6, 30, 12, 5); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#00838F'; ctx.strokeStyle = '#006064'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bx + 30, hy, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#006064'; ctx.beginPath(); ctx.arc(bx + 31, hy, 3.5, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
}
