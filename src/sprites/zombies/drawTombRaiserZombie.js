'use strict';
// ══════════════════════════════════════════════════════════════
//  drawTombRaiserZombie.js — Zombie Đào Mộ: áo khảo cổ giống
//  Explorer (_drawArchaeologistOutfit), nhưng mặt bị bịt kín bằng
//  khăn đen, chỉ lộ ra 2 con mắt
// ══════════════════════════════════════════════════════════════

// Đầu Tomb Raiser: vẽ đầu zombie mặc định làm nền, sau đó phủ khăn
// đen trùm kín mặt, chừa 2 lỗ tròn để lộ mắt
function _drawTombRaiserHead(ctx, hy, animTime, hpPct, rageEyes) {
    _drawZombieHead(ctx, hy, animTime, hpPct, rageEyes);

    // Khăn đen trùm kín đầu, chừa 2 lỗ mắt hình tròn (cắt bằng evenodd)
    ctx.save();
    ctx.fillStyle = '#1c1c1c';
    ctx.beginPath();
    ctx.ellipse(0, hy + 1, 20, 20, 0, 0, Math.PI * 2);
    ctx.ellipse(-6.5, hy - 5, 4.5, 5, 0, 0, Math.PI * 2, true);
    ctx.ellipse( 6.5, hy - 5, 4.5, 5, 0, 0, Math.PI * 2, true);
    ctx.fill('evenodd');

    // Nếp gấp khăn
    ctx.strokeStyle = '#0a0a0a'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(-16, hy + 5); ctx.quadraticCurveTo(0, hy + 13, 16, hy + 5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-14, hy - 12); ctx.quadraticCurveTo(0, hy - 18, 14, hy - 12); ctx.stroke();
    ctx.restore();

    // Vẽ lại 2 mắt để lộ ra qua lỗ khăn
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-6.5, hy - 5, 4, 4.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( 6.5, hy - 5, 4, 4.5, 0, 0, Math.PI * 2); ctx.fill();

    if (rageEyes) {
        ctx.shadowColor = '#FF2222'; ctx.shadowBlur = 8;
        const rg = ctx.createRadialGradient(0, hy - 4, 0, 0, hy - 4, 10);
        rg.addColorStop(0,    '#FF4444');
        rg.addColorStop(0.55, '#B00000');
        rg.addColorStop(1,    '#300000');
        ctx.fillStyle = rg;
    } else {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
    }
    ctx.beginPath(); ctx.arc(-5.5, hy - 4, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 7.5, hy - 4, 3, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
}

// Giơ 2 tay lên trời khi làm nghi lễ tạo mộ — t: tiến trình nghi lễ (0→1, 2s)
// Tay vươn thẳng lên trong 20% đầu rồi giữ nguyên, kèm rung nhẹ cho sống động
function _drawRaiseArms(ctx, animTime, t) {
    const raiseUp = Math.min(1, t / 0.2);
    const tremor  = Math.sin(animTime * 10) * 0.04 * raiseUp;

    ctx.save(); ctx.translate(-14, 5); ctx.rotate(lerp(-0.25, 1.85, raiseUp) + tremor);
    ctx.fillStyle = '#8A9E88'; ctx.strokeStyle = '#4a5a48'; ctx.lineWidth = 1.5;
    rr(ctx, -28, -4, 30, 8, 4); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-30, 0, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();

    ctx.save(); ctx.translate(14, 5); ctx.rotate(lerp(0.55, -1.85, raiseUp) - tremor);
    ctx.fillStyle = '#8A9E88'; ctx.strokeStyle = '#4a5a48'; ctx.lineWidth = 1.5;
    rr(ctx, 0, -4, 22, 8, 4); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(22, 0, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
}

// Legacy wrapper (dùng cho thumbnail trong Zombie Notes)
function drawTombRaiserZombie(ctx, x, y, animTime, state, hpPct, deathT) {
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: {
            drawOutfitFn: _drawArchaeologistOutfit,
            drawHeadFn:   _drawTombRaiserHead,
        },
        effects: [],
    });
}
