'use strict';
// ══════════════════════════════════════════════════════════════
//  drawFumeShroom.js — Fume-shroom: nấm tím đậm, thân béo
//  Khác PuffShroom: mũ lớn & tối hơn, 1 ống xịt rộng bắn chuỗi bong bóng
//
//  theme: bảng màu cho mũ nấm + ống xịt — dùng lại hình dạng này cho
//  các fusion PeaFume ('green'), IceFume ('blue'), IceFumeShooter ('cyan')
// ══════════════════════════════════════════════════════════════

const FUME_SHROOM_THEMES = {
    purple: { capA: '#7B1FA2', capB: '#4A148C', capC: '#2d0060', capD: '#1a0030', capStroke: '#130020',
               nozzleA: '#AB47BC', nozzleB: '#38006b', mouthFill: '#4A148C', mouthDark: '#0a0018' },
    green:  { capA: '#8BC34A', capB: '#4CAF50', capC: '#1B5E20', capD: '#0d330d', capStroke: '#0d330d',
               nozzleA: '#66BB6A', nozzleB: '#1B5E20', mouthFill: '#2E7D32', mouthDark: '#06200a' },
    blue:   { capA: '#64B5F6', capB: '#1E88E5', capC: '#0D47A1', capD: '#072b63', capStroke: '#072b63',
               nozzleA: '#42A5F5', nozzleB: '#0D47A1', mouthFill: '#1565C0', mouthDark: '#03142e' },
    cyan:   { capA: '#80DEEA', capB: '#00ACC1', capC: '#006064', capD: '#00263a', capStroke: '#00263a',
               nozzleA: '#26C6DA', nozzleB: '#006064', mouthFill: '#00838F', mouthDark: '#001f24' },
};

function _drawFumeShroomBody(ctx, animTime, shootT, theme = 'purple') {
    const t      = FUME_SHROOM_THEMES[theme] || FUME_SHROOM_THEMES.purple;
    const bob    = Math.sin(animTime * 2.5) * 2;
    const recoil = Math.sin(shootT * Math.PI) * -6;

    // Bóng — rộng hơn PuffShroom do thân béo
    ctx.fillStyle = 'rgba(0,0,0,0.20)';
    ctx.beginPath(); ctx.ellipse(0, 28, 15, 4.5, 0, 0, Math.PI * 2); ctx.fill();

    // Thân nấm (stem) nâu — rộng hơn PuffShroom (16px vs 12px)
    const stG = ctx.createLinearGradient(-6, 6, 6, 25);
    stG.addColorStop(0, '#d4a878'); stG.addColorStop(1, '#7a4a20');
    ctx.fillStyle = stG; ctx.strokeStyle = '#5a3510'; ctx.lineWidth = 1.5;
    rr(ctx, -8, 9 + bob * 0.3, 16, 19, 4); ctx.fill(); ctx.stroke();

    // Mũ nấm — ellipse ĐẬM, béo hơn PuffShroom (28×23 vs 22×19)
    const hy = -1 + bob;
    const cG = ctx.createRadialGradient(-9, hy - 14, 2, 0, hy, 30);
    cG.addColorStop(0,    t.capA);
    cG.addColorStop(0.35, t.capB);
    cG.addColorStop(0.75, t.capC);
    cG.addColorStop(1,    t.capD);
    ctx.fillStyle = cG; ctx.strokeStyle = t.capStroke; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, hy, 28, 23, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Chấm trắng lớn hơn trên mũ nấm
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath(); ctx.arc(-12, hy - 9,  5.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 10, hy - 15, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 17, hy - 2,  3.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( -2, hy + 12, 2.5, 0, Math.PI * 2); ctx.fill();

    // Mắt tròn — to hơn PuffShroom một chút
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-7, hy + 4, 6, 6.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( 7, hy + 4, 6, 6.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = t.capStroke; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-6.5, hy + 4.5, 3.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 7.5, hy + 4.5, 3.8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(-4.5, hy + 2.5, 1.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 9.5, hy + 2.5, 1.4, 0, Math.PI * 2); ctx.fill();

    // Ống xịt đơn rộng — nhô ra phải (recoil khi bắn)
    const bx = 18 + recoil;
    const tG = ctx.createLinearGradient(bx, hy + 1, bx, hy + 13);
    tG.addColorStop(0, t.nozzleA); tG.addColorStop(1, t.nozzleB);
    ctx.fillStyle = tG; ctx.strokeStyle = t.capStroke; ctx.lineWidth = 1.5;
    rr(ctx, bx, hy + 1, 22, 12, 3); ctx.fill(); ctx.stroke();
    // Highlight dọc nhỏ trên ống
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    rr(ctx, bx + 2, hy + 2, 18, 4, 2); ctx.fill();
    // Miệng ống — hình tròn rộng 1 miệng
    ctx.fillStyle = t.mouthFill; ctx.strokeStyle = t.capStroke; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bx + 22, hy + 7, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = t.mouthDark;
    ctx.beginPath(); ctx.arc(bx + 22, hy + 7, 3.5, 0, Math.PI * 2); ctx.fill();

    // Miệng cười nhẹ
    ctx.strokeStyle = t.capStroke; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, hy + 14, 7, 0.5, Math.PI - 0.5); ctx.stroke();

    // IceFumeShooter (cyan): vài gai băng nhỏ quanh viền mũ nấm cho khác biệt rõ
    if (theme === 'cyan') {
        ctx.fillStyle = '#E0F7FA'; ctx.strokeStyle = '#006064'; ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
            const a  = (i / 6) * Math.PI * 2 + 0.3;
            const ex = Math.cos(a) * 27, ey = hy + Math.sin(a) * 22;
            const nx = Math.cos(a), ny = Math.sin(a);
            ctx.beginPath();
            ctx.moveTo(ex - ny * 3, ey + nx * 3);
            ctx.lineTo(ex + nx * 7, ey + ny * 7);
            ctx.lineTo(ex + ny * 3, ey - nx * 3);
            ctx.closePath(); ctx.fill(); ctx.stroke();
        }
    }
}

function drawFumeShroom(ctx, x, y, animTime, shootT, stackCount = 1, theme = 'purple') {
    if (stackCount === 2) {
        ctx.save();
        ctx.translate(Math.round(x) - 9, Math.round(y));
        ctx.scale(0.76, 0.76);
        _drawFumeShroomBody(ctx, animTime, shootT, theme);
        ctx.restore();
        ctx.save();
        ctx.translate(Math.round(x) + 8, Math.round(y) + 2);
        ctx.scale(0.76, 0.76);
        _drawFumeShroomBody(ctx, animTime * 1.08 + 0.5, shootT, theme);
        ctx.restore();
    } else {
        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        _drawFumeShroomBody(ctx, animTime, shootT, theme);
        ctx.restore();
    }
}
