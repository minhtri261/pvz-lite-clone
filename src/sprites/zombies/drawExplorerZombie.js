'use strict';
// ══════════════════════════════════════════════════════════════
//  drawExplorerZombie.js — Zombie Nhà Khảo Cổ: mũ khảo cổ, áo
//  khoác kaki nhiều túi, tay trái cầm đuốc cháy (tắt khi bị làm lạnh)
// ══════════════════════════════════════════════════════════════

// Áo khoác kaki nhà khảo cổ — thay cho áo sơ mi mặc định
function _drawArchaeologistOutfit(ctx) {
    const sg = ctx.createLinearGradient(-14, -5, 14, 25);
    sg.addColorStop(0, '#CBB789');
    sg.addColorStop(1, '#A6905F');
    ctx.fillStyle = sg; ctx.strokeStyle = '#7a6840'; ctx.lineWidth = 2;
    rr(ctx, -14, -5, 28, 28, 5); ctx.fill(); ctx.stroke();

    // Túi ngực hai bên
    ctx.fillStyle = '#8a7550'; ctx.strokeStyle = '#5a4a2c'; ctx.lineWidth = 1;
    rr(ctx, -11, 2, 9, 9, 1.5); ctx.fill(); ctx.stroke();
    rr(ctx,  3, 2, 9, 9, 1.5); ctx.fill(); ctx.stroke();

    // Dây đeo chéo + túi đựng dụng cụ
    ctx.strokeStyle = '#6b4423'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-12, -5); ctx.lineTo(10, 22); ctx.stroke();
    ctx.fillStyle = '#5a3a1c'; ctx.strokeStyle = '#3a2410'; ctx.lineWidth = 1;
    rr(ctx, 4, 14, 10, 8, 2); ctx.fill(); ctx.stroke();
}

// Mũ khảo cổ (pith helmet) — vành rộng, đỉnh vòm, dải băng nâu
function _drawExplorerHat(ctx, hy) {
    // Vành nón
    ctx.fillStyle = '#D8C7A1'; ctx.strokeStyle = '#9c8a60'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, hy - 17, 24, 6.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Đỉnh nón hình vòm
    const g = ctx.createLinearGradient(-14, hy - 40, 14, hy - 17);
    g.addColorStop(0, '#EDE0C4');
    g.addColorStop(1, '#C9B488');
    ctx.fillStyle = g; ctx.strokeStyle = '#9c8a60'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, hy - 17, 16, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Dải băng quanh nón
    ctx.fillStyle = '#8B5E34';
    ctx.fillRect(-15, hy - 21, 30, 4);

    // Chóp nhỏ trên đỉnh
    ctx.fillStyle = '#8B5E34';
    ctx.beginPath(); ctx.arc(0, hy - 33, 3, 0, Math.PI * 2); ctx.fill();
}

// Tay phải bình thường, tay trái giơ cao cầm đuốc
function _drawTorchArms(ctx, animTime) {
    // Tay phải
    ctx.save(); ctx.translate(14, 5); ctx.rotate(0.55 + Math.sin(animTime * 2.8 + 1) * 0.06);
    ctx.fillStyle = '#C9B896'; ctx.strokeStyle = '#7a6a4a'; ctx.lineWidth = 1.5;
    rr(ctx, 0, -4, 22, 8, 4); ctx.fill(); ctx.stroke(); ctx.restore();

    // Tay trái — giơ cao cầm cán đuốc
    ctx.save(); ctx.translate(-14, 5); ctx.rotate(-1.25 + Math.sin(animTime * 2.8) * 0.05);
    ctx.fillStyle = '#C9B896'; ctx.strokeStyle = '#7a6a4a'; ctx.lineWidth = 1.5;
    rr(ctx, -26, -4, 28, 8, 4); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-28, 0, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
}

// Đuốc: tay trái giơ cao cầm cán đuốc, đầu đuốc hình quả trứng, có hiệu ứng lửa khi còn cháy
function _drawTorchGear(ctx, animTime, eatBob, lit) {
    ctx.save();

    // SAME pivot as left arm
    ctx.translate(-14, 5);

    const armRot =
        -1.25 +
        Math.sin(animTime * 2.8) * 0.05;

    ctx.rotate(armRot);

    // Move to hand position
    ctx.translate(-28, 0);

    // Slight offset so hand grips handle
    ctx.rotate(-0.1);

    // Torch handle
    ctx.fillStyle = '#6b4423';
    ctx.strokeStyle = '#3a2210';
    ctx.lineWidth = 1.5;

    rr(ctx, -3, -28, 6, 30, 2);
    ctx.fill();
    ctx.stroke();

    // Torch head
    ctx.fillStyle =
        lit ? '#5a4530' : '#3a2e22';

    ctx.beginPath();
    ctx.ellipse(
        0,
        -28,
        7,
        9,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();

    if (lit) {
        const flick =
            Math.sin(animTime * 16) * 0.15 +
            Math.sin(animTime * 9) * 0.1;

        ctx.save();
        ctx.translate(0, -32);
        ctx.rotate(flick);

        const g =
            ctx.createRadialGradient(
                0, 4, 1,
                0, 0, 16
            );

        g.addColorStop(0, '#FFF59D');
        g.addColorStop(0.45, '#FFA000');
        g.addColorStop(
            1,
            'rgba(255,80,0,0)'
        );

        ctx.fillStyle = g;

        ctx.beginPath();
        ctx.moveTo(0, 8);
        ctx.quadraticCurveTo(
            8,
            -2,
            0,
            -16
        );
        ctx.quadraticCurveTo(
            -8,
            -2,
            0,
            8
        );
        ctx.fill();

        ctx.restore();
    } else {
        ctx.strokeStyle =
            'rgba(120,120,120,0.4)';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(0, -34);

        ctx.quadraticCurveTo(
            3 +
            Math.sin(animTime * 1.5) * 2,
            -42,
            -1,
            -50
        );

        ctx.stroke();
    }

    ctx.restore();
}

// Legacy wrapper (dùng cho thumbnail trong Zombie Notes)
function drawExplorerZombie(ctx, x, y, animTime, state, hpPct, lit, deathT) {
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: {
            drawOutfitFn: _drawArchaeologistOutfit,
            drawHatFn:    _drawExplorerHat,
            drawArmsFn:   _drawTorchArms,
            drawGearFn:   (ctx2, at, eb) => _drawTorchGear(ctx2, at, eb, lit),
        },
        effects: [],
    });
}
