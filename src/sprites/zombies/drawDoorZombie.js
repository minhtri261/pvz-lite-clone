'use strict';
// ══════════════════════════════════════════════════════════════
//  drawDoorZombie.js — Cánh cửa gỗ cũ dùng làm khiên
//  Che kín ngực/bụng/tay/chân, chỉ để lộ đầu phía trên mép cửa.
//  doorPct: 1 → cửa còn nguyên | 0 → cửa gần vỡ (nứt/mục nhiều hơn)
// ══════════════════════════════════════════════════════════════

function _drawDoorShield(ctx, animTime, state, doorPct) {
    const top = -12, bottom = 44, halfW = 23;
    const wobble = state === 'eating' ? Math.sin(animTime * 7) * 1.2 : 0;

    ctx.save();
    ctx.translate(wobble, 0);

    // Khung gỗ chính — gradient nâu đậm
    const grad = ctx.createLinearGradient(-halfW, top, halfW, bottom);
    grad.addColorStop(0,   '#5a3a20');
    grad.addColorStop(0.5, '#46280f');
    grad.addColorStop(1,   '#2e1808');
    ctx.fillStyle = grad; ctx.strokeStyle = '#1c0f04'; ctx.lineWidth = 3;
    rr(ctx, -halfW, top, halfW * 2, bottom - top, 4); ctx.fill(); ctx.stroke();

    // Rãnh phân chia 3 mảnh ván dọc
    ctx.strokeStyle = 'rgba(20,10,2,0.5)'; ctx.lineWidth = 1.5;
    [-halfW / 3, halfW / 3].forEach(gx => {
        ctx.beginPath(); ctx.moveTo(gx, top + 3); ctx.lineTo(gx, bottom - 3); ctx.stroke();
    });

    // Vân gỗ ngang mờ — vẻ cũ kỹ
    ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 1;
    for (let i = 0; i < 9; i++) {
        const gy = top + 5 + i * ((bottom - top - 10) / 8) + Math.sin(i * 1.7) * 1.5;
        ctx.beginPath(); ctx.moveTo(-halfW + 3, gy); ctx.lineTo(halfW - 3, gy); ctx.stroke();
    }

    // Thanh gỗ ngang gia cố
    ctx.fillStyle = '#2a1606'; ctx.strokeStyle = '#160c02'; ctx.lineWidth = 1.5;
    [top + 8, (top + bottom) / 2 - 2, bottom - 16].forEach(by => {
        rr(ctx, -halfW + 1, by, halfW * 2 - 2, 7, 2); ctx.fill(); ctx.stroke();
    });

    // Bản lề chéo (X-brace) — đặc trưng cửa gỗ kiểu cũ
    ctx.strokeStyle = '#1c0f04'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-halfW + 4, top + 6); ctx.lineTo(halfW - 4, bottom - 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(halfW - 4, top + 6); ctx.lineTo(-halfW + 4, bottom - 10); ctx.stroke();

    // Tay nắm cửa
    ctx.fillStyle = '#7a7060'; ctx.strokeStyle = '#352c20'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(halfW - 8, (top + bottom) / 2 + 6, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Vết mục/lỗ mọt gỗ
    ctx.fillStyle = 'rgba(10,5,0,0.55)';
    ctx.beginPath(); ctx.ellipse(-halfW + 7, bottom - 18, 4, 3, 0.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(halfW - 10, top + 20, 3, 2.5, -0.3, 0, Math.PI * 2); ctx.fill();

    // Nứt vỡ tăng dần theo sát thương đã nhận
    if (doorPct < 0.6) {
        ctx.strokeStyle = 'rgba(10,5,0,0.7)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-6, top + 8); ctx.lineTo(2, top + 26); ctx.lineTo(-4, top + 40); ctx.stroke();
    }
    if (doorPct < 0.3) {
        ctx.strokeStyle = 'rgba(5,2,0,0.85)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(8, top + 4); ctx.lineTo(4, top + 18); ctx.lineTo(12, top + 30); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(12, top + 30); ctx.lineTo(16, bottom - 12); ctx.stroke();
        ctx.fillStyle = 'rgba(80,55,30,0.5)';
        ctx.beginPath(); ctx.moveTo(10, top + 6); ctx.lineTo(16, top + 10); ctx.lineTo(9, top + 14); ctx.closePath(); ctx.fill();
    }

    ctx.restore();
}

function drawDoorZombie(ctx, x, y, animTime, state, hpPct, hasDoor, doorPct, deathT) {
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: {
            drawShieldFn: hasDoor ? (ctx2, t, st) => _drawDoorShield(ctx2, t, st, doorPct) : null,
            drawArmsFn:   hasDoor ? () => {} : null,
        },
        effects: [],
    });
}
