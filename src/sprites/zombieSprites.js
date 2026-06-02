'use strict';
// ══════════════════════════════════════════════════════════════
//  zombieSprites.js — Hàm vẽ sprite cho 5 loại zombie
//
//  drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT):
//    state: 'walking' | 'eating' | 'dying' — ảnh hưởng hoạt ảnh chân, đầu
//    hpPct: tỉ lệ máu (0–1) — khi < 0.4 xuất hiện vết thương trên đầu
//    deathT: tiến trình chết (0→1) — xoay và mờ dần
//
//  Các zombie đặc biệt gọi drawBasicZombie() trước, rồi vẽ thêm phụ kiện:
//    drawConeheadZombie → + nón giao thông cam
//    drawFlagZombie     → + cờ đỏ có chữ Z
//    drawBucketZombie   → + xô kim loại bạc
// ══════════════════════════════════════════════════════════════

function drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT) {
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    if (state === 'dying') { ctx.rotate(-deathT * 1.5); ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4); }

    const walk   = state === 'walking' ? Math.sin(animTime * 5.5) : 0;
    const eatBob = state === 'eating'  ? Math.abs(Math.sin(animTime * 7)) * 10 : 0;
    ctx.rotate(walk * 0.06);

    if (state !== 'dying') { ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(0, 40, 17, 5, 0, 0, Math.PI * 2); ctx.fill(); }

    // Left leg
    ctx.save(); ctx.translate(-7, 22); ctx.rotate(walk * 0.35);
    ctx.fillStyle = '#4A5699'; ctx.strokeStyle = '#283070'; ctx.lineWidth = 1.5;
    rr(ctx, -5, 0, 11, 20, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.ellipse(-2, 21, 8, 4.5, 0.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();

    // Right leg
    ctx.save(); ctx.translate(7, 22); ctx.rotate(-walk * 0.35);
    ctx.fillStyle = '#4A5699'; ctx.strokeStyle = '#283070'; ctx.lineWidth = 1.5;
    rr(ctx, -5, 0, 11, 20, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.ellipse(2, 21, 8, 4.5, -0.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();

    // Body
    const sg = ctx.createLinearGradient(-14, -5, 14, 25);
    sg.addColorStop(0, '#8090A0'); sg.addColorStop(1, '#506070');
    ctx.fillStyle = sg; ctx.strokeStyle = '#354555'; ctx.lineWidth = 2;
    rr(ctx, -14, -5, 28, 28, 5); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(53,69,85,0.7)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-4, 8); ctx.lineTo(-2, 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(4, 6); ctx.lineTo(7, 16); ctx.stroke();
    ctx.fillStyle = '#8B0000';
    ctx.beginPath(); ctx.moveTo(-2, -4); ctx.lineTo(2, -4); ctx.lineTo(4, 18); ctx.lineTo(0, 22); ctx.lineTo(-4, 18); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#5a0000'; ctx.lineWidth = 1; ctx.stroke();

    // Left arm
    ctx.save(); ctx.translate(-14, 5); ctx.rotate(-0.25 + Math.sin(animTime * 2.8) * 0.08);
    ctx.fillStyle = '#8A9E88'; ctx.strokeStyle = '#4a5a48'; ctx.lineWidth = 1.5;
    rr(ctx, -28, -4, 30, 8, 4); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-30, 0, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();

    // Right arm
    ctx.save(); ctx.translate(14, 5); ctx.rotate(0.55 + Math.sin(animTime * 2.8 + 1) * 0.06);
    ctx.fillStyle = '#8A9E88'; ctx.strokeStyle = '#4a5a48'; ctx.lineWidth = 1.5;
    rr(ctx, 0, -4, 22, 8, 4); ctx.fill(); ctx.stroke(); ctx.restore();

    ctx.fillStyle = '#8A9E88'; ctx.fillRect(-5, -18, 10, 14);

    // Head
    const hy = -36 + eatBob;
    const hg = ctx.createRadialGradient(-6, hy - 10, 2, 0, hy, 20);
    hg.addColorStop(0, '#B0C0AC'); hg.addColorStop(0.6, '#7a8e78'); hg.addColorStop(1, '#506050');
    ctx.fillStyle = hg; ctx.strokeStyle = '#354535'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, hy, 19, 21, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.strokeStyle = '#2a2820'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    [-8, -3, 3, 8].forEach((hx, i) => {
        ctx.beginPath(); ctx.moveTo(hx, hy - 19);
        ctx.quadraticCurveTo(hx + (i % 2 === 0 ? -4 : 4), hy - 28, hx + (i % 2 === 0 ? -2 : 3), hy - 33);
        ctx.stroke();
    });

    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-6.5, hy - 5, 5.5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(6.5, hy - 5, 5.5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.beginPath(); ctx.arc(-5.5, hy - 4, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(7.5, hy - 4, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#7a8e78';
    ctx.beginPath(); ctx.ellipse(-6.5, hy - 7, 5.5, 3, 0, Math.PI, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(6.5, hy - 7, 5.5, 3, 0, Math.PI, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#3a0808'; ctx.beginPath(); ctx.ellipse(0, hy + 10, 7.5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#E8DCC8'; ctx.fillRect(-5, hy + 5, 4, 5); ctx.fillRect(1, hy + 6, 3, 4);
    ctx.strokeStyle = 'rgba(120,200,120,0.7)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(2, hy + 15); ctx.quadraticCurveTo(3, hy + 20, 2, hy + 25); ctx.stroke();

    if (hpPct < 0.4) {
        ctx.fillStyle = 'rgba(180,20,20,0.75)'; ctx.beginPath(); ctx.arc(-3, hy - 16, 5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#8B0000'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-8, hy - 13); ctx.lineTo(2, hy - 18); ctx.stroke();
    }
    ctx.restore();
}

function drawConeheadZombie(ctx, x, y, animTime, state, hpPct, hasCone, deathT) {
    drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT);
    if (!hasCone) return;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    if (state === 'dying') { ctx.rotate(-deathT * 1.5); ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4); }
    const eatBob = state === 'eating' ? Math.abs(Math.sin(animTime * 7)) * 10 : 0;
    const hy = -36 + eatBob;
    const cg = ctx.createLinearGradient(-14, hy - 62, 14, hy - 16);
    cg.addColorStop(0, '#FF8C00'); cg.addColorStop(0.6, '#FF5500'); cg.addColorStop(1, '#CC2200');
    ctx.fillStyle = cg; ctx.strokeStyle = '#8B2200'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(0, hy - 62); ctx.lineTo(16, hy - 16); ctx.lineTo(-16, hy - 16); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.75)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-9, hy - 28); ctx.lineTo(9, hy - 28); ctx.stroke();
    ctx.fillStyle = '#CC3300'; ctx.strokeStyle = '#8B2200'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, hy - 16, 17, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
}

function drawFlagZombie(ctx, x, y, animTime, state, hpPct, deathT) {
    drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT);
    if (state === 'dying' && deathT > 0.6) return;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    if (state === 'dying') { ctx.rotate(-deathT * 1.5); ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4); }
    const eatBob = state === 'eating' ? Math.abs(Math.sin(animTime * 7)) * 10 : 0;
    ctx.strokeStyle = '#8B7355'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-38, -36 + eatBob); ctx.lineTo(-38, 5 + eatBob); ctx.stroke();
    const fw = Math.sin(animTime * 5) * 5;
    ctx.fillStyle = '#CC0000'; ctx.strokeStyle = '#880000'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-38, -36 + eatBob);
    ctx.quadraticCurveTo(-20 + fw, -30 + eatBob, -16 + fw, -28 + eatBob);
    ctx.quadraticCurveTo(-20 + fw, -20 + eatBob, -38, -20 + eatBob);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = 'bold 10px Arial'; ctx.textAlign = 'center';
    ctx.fillText('Z', -28 + fw * 0.3, -27 + eatBob);
    ctx.restore();
}

function drawBucketZombie(ctx, x, y, animTime, state, hpPct, hasBucket, deathT) {
    drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT);
    if (!hasBucket) return;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    if (state === 'dying') { ctx.rotate(-deathT * 1.5); ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4); }
    const eatBob = state === 'eating' ? Math.abs(Math.sin(animTime * 7)) * 10 : 0;
    const hy = -36 + eatBob;
    const bTop = hy - 46, bBase = hy - 14;

    const bucketG = ctx.createLinearGradient(-18, bTop, 18, bBase);
    bucketG.addColorStop(0, '#BDBDBD'); bucketG.addColorStop(0.3, '#E0E0E0');
    bucketG.addColorStop(0.6, '#9E9E9E'); bucketG.addColorStop(1, '#757575');
    ctx.fillStyle = bucketG; ctx.strokeStyle = '#424242'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-15, bBase); ctx.lineTo(-19, bTop); ctx.lineTo(19, bTop); ctx.lineTo(15, bBase);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#9E9E9E'; ctx.strokeStyle = '#424242'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, bTop, 19, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.strokeStyle = 'rgba(66,66,66,0.55)'; ctx.lineWidth = 1.5;
    [0.35, 0.65].forEach(t => {
        const by = lerp(bTop, bBase, t), bw = lerp(19, 15, t);
        ctx.beginPath(); ctx.moveTo(-bw, by); ctx.lineTo(bw, by); ctx.stroke();
    });

    ctx.strokeStyle = '#9E9E9E'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, bTop, 12, Math.PI + 0.3, -0.3); ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-13, bTop + 5); ctx.lineTo(-11, bBase - 2); ctx.stroke();
    ctx.restore();
}

// ── Pole Vaulting Zombie ───────────────────────────────────────
// hasVault=true  → đang cầm sào (chưa nhảy)
// vaulting=true  → đang trong animation nhảy, vaultT=0→1
// vaultT         → 0 = bắt đầu nhảy, 0.5 = đỉnh cung, 1 = hạ cánh
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
