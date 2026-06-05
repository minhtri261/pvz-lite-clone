'use strict';
function drawPoleVaultingZombie(ctx, x, y, animTime, state, hpPct, hasVault, vaulting, vaultT, deathT) {
    // Body base — dùng walking animation dù đang vault (y thay đổi tạo cảm giác bay)
    drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT);
    if (!hasVault) return;

    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    if (state === 'dying') { ctx.rotate(-deathT * 1.5); ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4); }

    if (!vaulting) {
        // Cầm sào nghiêng về phía trước khi đi bộ
        const poleAngle = -0.28 + Math.sin(animTime * 2) * 0.04;
        ctx.save(); ctx.rotate(poleAngle);

        // Thân sào (gỗ nâu)
        ctx.strokeStyle = '#7a5012'; ctx.lineWidth = 5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(-14, 44); ctx.lineTo(-11, -72); ctx.stroke();
        // Highlight sào
        ctx.strokeStyle = 'rgba(220,180,80,0.35)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-15, 35); ctx.lineTo(-12, -60); ctx.stroke();
        // Băng quấn tay cầm
        ctx.strokeStyle = '#5a3208'; ctx.lineWidth = 2.5;
        for (let gy = -10; gy < 20; gy += 9) {
            ctx.beginPath(); ctx.moveTo(-14, gy - 2); ctx.lineTo(-12, gy + 3); ctx.stroke();
        }
        ctx.restore();
    } else {
        // Đang vault: sào xoay từ dọc → nằm ngang rồi qua tay
        const angle = lerp(-0.28, 1.4, vaultT);
        ctx.save(); ctx.translate(-10, 18); ctx.rotate(angle);
        ctx.strokeStyle = '#7a5012'; ctx.lineWidth = 5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(0, 32); ctx.lineTo(0, -68); ctx.stroke();
        // Highlight sào khi vault
        ctx.strokeStyle = 'rgba(220,180,80,0.3)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-1, 28); ctx.lineTo(-1, -60); ctx.stroke();
        ctx.restore();
    }
    ctx.restore();
}
