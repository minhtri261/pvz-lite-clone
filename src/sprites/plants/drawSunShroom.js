'use strict';
// Sun-shroom: PuffShroom + SunFlower fusion
// Nấm nhỏ màu nâu-vàng kiểu PvZ1, sản xuất sun nhanh hơn ban đêm
function _drawSunShroomBody(ctx, animTime, producePulse) {
    const bob = Math.sin(animTime * 2.5) * 2;
    const sc  = producePulse > 0 ? 1 + Math.sin(animTime * 8) * 0.06 : 1;

    // Bóng
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath(); ctx.ellipse(0, 29, 12, 4, 0, 0, Math.PI * 2); ctx.fill();

    // Thân nấm (stem) nâu-vàng ngắn
    const stG = ctx.createLinearGradient(-5, 7, 5, 26);
    stG.addColorStop(0, '#dbb460'); stG.addColorStop(1, '#8a6020');
    ctx.fillStyle = stG; ctx.strokeStyle = '#5a3a08'; ctx.lineWidth = 1.5;
    rr(ctx, -6, 10 + bob * 0.3, 12, 18, 4); ctx.fill(); ctx.stroke();

    // Hào quang vàng khi sản xuất sun
    if (producePulse > 0) {
        const glow = ctx.createRadialGradient(0, 2 + bob, 0, 0, 2 + bob, 26);
        glow.addColorStop(0, `rgba(255,215,0,${0.55 * producePulse})`);
        glow.addColorStop(1, 'rgba(255,215,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(0, 2 + bob, 26, 0, Math.PI * 2); ctx.fill();
    }

    // Mũ nấm (cap) — dome nâu-vàng ấm áp
    const hy = -3 + bob;
    ctx.save(); ctx.scale(sc, sc);
    const cG = ctx.createRadialGradient(-8, hy - 10, 2, 0, hy, 20);
    cG.addColorStop(0,    '#F0C050');
    cG.addColorStop(0.38, '#C88520');
    cG.addColorStop(0.78, '#8B5010');
    cG.addColorStop(1,    '#5a2e06');
    ctx.fillStyle = cG; ctx.strokeStyle = '#4a2604'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, hy, 20, 17, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Chấm trắng (toadstool spots)
    ctx.fillStyle = 'rgba(255,255,255,0.60)';
    ctx.beginPath(); ctx.arc(-8, hy - 5, 3.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 6, hy - 10, 3,   0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(11, hy,  2.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-2, hy + 8, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Mắt nhỏ
    const eyeY = hy + 4;
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-5.5, eyeY, 3.5, 4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( 5.5, eyeY, 3.5, 4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#4a2604'; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.fillStyle = '#1a0a00';
    ctx.beginPath(); ctx.arc(-5, eyeY + 0.5, 2.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 6, eyeY + 0.5, 2.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath(); ctx.arc(-3.8, eyeY - 1, 0.9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 7.2, eyeY - 1, 0.9, 0, Math.PI * 2); ctx.fill();

    // Nụ cười
    ctx.strokeStyle = '#4a2604'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, eyeY + 6, 5, 0.35, Math.PI - 0.35); ctx.stroke();
}

function drawSunShroom(ctx, x, y, animTime, producePulse, stackCount = 1) {
    if (stackCount === 2) {
        // Con trái (còn sống) — vẽ trước để nằm phía sau
        ctx.save();
        ctx.translate(Math.round(x) - 9, Math.round(y));
        ctx.scale(0.76, 0.76);
        _drawSunShroomBody(ctx, animTime, producePulse);
        ctx.restore();
        // Con phải (bị ăn trước) — vẽ sau để nằm phía trước
        ctx.save();
        ctx.translate(Math.round(x) + 8, Math.round(y) + 2);
        ctx.scale(0.76, 0.76);
        _drawSunShroomBody(ctx, animTime * 1.08 + 0.5, producePulse);
        ctx.restore();
    } else {
        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        _drawSunShroomBody(ctx, animTime, producePulse);
        ctx.restore();
    }
}
