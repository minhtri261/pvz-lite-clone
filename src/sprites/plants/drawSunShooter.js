'use strict';
function drawSunShooter(ctx, x, y, animTime, shootT, producePulse) {
    const bob    = Math.sin(animTime * 2.2) * 2;
    const recoil = Math.sin(shootT * Math.PI) * -7;
    const scl    = producePulse > 0 ? 1 + Math.sin(animTime * 8) * 0.07 : 1;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 28, 20, 5, 0, 0, Math.PI * 2); ctx.fill();

    // Thân chính (giữa)
    ctx.strokeStyle = '#388E3C'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 26); ctx.quadraticCurveTo(0, 8, 0, -1 + bob); ctx.stroke();

    // Nhánh trái → đầu sunflower
    ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 2 + bob); ctx.lineTo(-18, -8 + bob); ctx.stroke();
    // Nhánh phải → đầu shooter
    ctx.beginPath(); ctx.moveTo(0, 2 + bob); ctx.lineTo(10, -8 + bob); ctx.stroke();

    // ── ĐẦU TRÁI: mini Sunflower ──────────────────────────────
    const sfx = -18, sfy = -14 + bob;
    ctx.save(); ctx.translate(sfx, sfy); ctx.scale(scl, scl);
    // Cánh hoa
    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + animTime * 0.3;
        ctx.save(); ctx.rotate(a);
        const pg = ctx.createLinearGradient(0, -16, 0, -10);
        pg.addColorStop(0, '#FFF176'); pg.addColorStop(1, '#FDD835');
        ctx.fillStyle = pg; ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(0, -13, 4, 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.restore();
    }
    // Đĩa trung tâm nâu
    const cg = ctx.createRadialGradient(-3, -4, 1, 0, 0, 10);
    cg.addColorStop(0, '#A1887F'); cg.addColorStop(0.6, '#6D4C41'); cg.addColorStop(1, '#8a6237');
    ctx.fillStyle = cg; ctx.strokeStyle = '#8a6237'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // Mắt sunflower
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-3, -2, 2.5, 3.2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(3, -2, 2.5, 3.2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1A237E';
    ctx.beginPath(); ctx.arc(-3, -1.5, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(3, -1.5, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // ── ĐẦU PHẢI: đầu tròn vàng (shooter) ────────────────────
    const phx = 10, phy = -14 + bob;
    const hg = ctx.createRadialGradient(phx - 6, phy - 6, 1, phx, phy, 16);
    hg.addColorStop(0, '#FFF9C4'); hg.addColorStop(0.35, '#FFD600');
    hg.addColorStop(0.75, '#e7ba6d'); hg.addColorStop(1, '#E65100');
    ctx.fillStyle = hg; ctx.strokeStyle = '#E65100'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(phx, phy, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Nòng vàng
    const bx = phx + Math.round(16 * 0.75) + recoil;
    const bg = ctx.createLinearGradient(bx, phy - 5, bx, phy + 5);
    bg.addColorStop(0, '#FFD54F'); bg.addColorStop(0.5, '#FFA000'); bg.addColorStop(1, '#E65100');
    ctx.fillStyle = bg; ctx.strokeStyle = '#E65100'; ctx.lineWidth = 2;
    rr(ctx, bx, phy - 5, 22, 10, 3); ctx.fill(); ctx.stroke();
    // Highlight nòng
    ctx.fillStyle = 'rgba(255,255,200,0.3)';
    rr(ctx, bx + 2, phy - 4, 18, 4, 2); ctx.fill();
    // Đầu nòng
    ctx.fillStyle = '#BF360C'; ctx.strokeStyle = '#E65100'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bx + 22, phy, 6.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#4a1000';
    ctx.beginPath(); ctx.arc(bx + 22, phy, 3.5, 0, Math.PI * 2); ctx.fill();

    // Mắt đầu phải
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(phx - 6, phy - 6, 5.5, 6.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#E65100'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(phx - 5.5, phy - 5.5, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(phx - 4, phy - 8, 1.4, 0, Math.PI * 2); ctx.fill();
    // Nụ cười
    ctx.strokeStyle = '#E65100'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(phx + 2, phy + 7, 5, 0.4, Math.PI - 0.4); ctx.stroke();

    ctx.restore();
}
