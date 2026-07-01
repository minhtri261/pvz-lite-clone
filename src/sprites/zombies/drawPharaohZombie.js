'use strict';
// ══════════════════════════════════════════════════════════════
//  drawPharaohZombie.js — Pharaoh Zombie (PvZ2-style)
//
//  State 1 (Sarcophagus): quan tài vàng kim dựng đứng che kín từ
//  chân lên quá đỉnh đầu — chỉ 2 chân thò ra phía dưới. pct: 1 →
//  quan tài còn nguyên | 0 → gần vỡ (nứt nhiều hơn, mặt nạ mờ đi).
//
//  State 2 (Pharaoh Revealed): xác ướp quấn băng trắng, đầu đội
//  khăn Nemes vàng-xanh, mắt phát sáng nhẹ.
// ══════════════════════════════════════════════════════════════

// ── STATE 1: Quan tài (Sarcophagus) ─────────────────────────────
function _drawSarcophagus(ctx, animTime, state, pct) {
    const top = -60, bottom = 18;
    const wobble = state === 'eating' ? Math.sin(animTime * 6) * 1.4 : 0;

    ctx.save();
    ctx.translate(wobble, 0);

    // ── Silhouette quan tài: tròn ở đỉnh đầu, phình ở vai, thu nhỏ ở chân ──
    const pts = [
        [0,   top],            // đỉnh đầu (tròn)
        [13,  top + 8],
        [17,  top + 22],       // vai
        [17,  bottom - 26],
        [13,  bottom],         // thu hẹp về chân
        [-13, bottom],
        [-17, bottom - 26],
        [-17, top + 22],
        [-13, top + 8],
    ];
    const bg = ctx.createLinearGradient(-17, top, 17, bottom);
    bg.addColorStop(0,    '#FFE9A0');
    bg.addColorStop(0.35, '#FFC94A');
    bg.addColorStop(0.7,  '#D89A1C');
    bg.addColorStop(1,    '#8A5C0E');
    ctx.fillStyle = bg; ctx.strokeStyle = '#5C3A08'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    // Viền trang trí ngọc lam (turquoise) chạy quanh mép
    ctx.strokeStyle = '#1B7A8C'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1] + 4);
    for (let i = 1; i < pts.length; i++) {
        const [px, py] = pts[i];
        const inset = px === 0 ? 0 : (px > 0 ? -2.5 : 2.5);
        ctx.lineTo(px + inset, py - (py < 0 ? -3 : 3));
    }
    ctx.stroke();

    // ── Mặt nạ vàng vẽ trên nắp quan tài (Egyptian death mask) ──
    const maskY = top + 18;
    ctx.save();
    ctx.globalAlpha = 0.55 + pct * 0.45; // mờ dần khi quan tài gần vỡ
    ctx.fillStyle = '#3A2406'; ctx.strokeStyle = '#5C3A08'; ctx.lineWidth = 1;
    // Mắt vẽ (almond-shaped) viền đen kiểu kohl Ai Cập
    [-7, 7].forEach(ex => {
        ctx.beginPath();
        ctx.ellipse(ex, maskY, 4.6, 2.6, 0, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.strokeStyle = '#1B1206'; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-12, maskY); ctx.lineTo(-16, maskY - 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo( 12, maskY); ctx.lineTo( 16, maskY - 2); ctx.stroke();
    // Miệng nhỏ thẳng
    ctx.beginPath(); ctx.moveTo(-5, maskY + 11); ctx.lineTo(5, maskY + 11); ctx.stroke();
    ctx.restore();

    // Sọc khăn trùm (giống Nemes) trên đỉnh nắp
    ctx.strokeStyle = 'rgba(27,122,140,0.55)'; ctx.lineWidth = 2;
    [-9, -3, 3, 9].forEach(sx => {
        ctx.beginPath(); ctx.moveTo(sx, top + 2); ctx.lineTo(sx, maskY - 8); ctx.stroke();
    });

    // ── Dải cổ áo trang trí (collar) ngang vai ──
    const collarY = top + 30;
    ctx.fillStyle = '#1B7A8C';
    ctx.beginPath(); ctx.ellipse(0, collarY, 15, 4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#0F4A56'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#FFD24A';
    for (let i = -3; i <= 3; i++) {
        ctx.beginPath(); ctx.arc(i * 4, collarY, 1.6, 0, Math.PI * 2); ctx.fill();
    }

    // ── Dải hoa văn dọc giữa thân — hieroglyph đơn giản ──
    const stripX = 0, stripTop = collarY + 8, stripBottom = bottom - 6;
    ctx.fillStyle = 'rgba(27,122,140,0.30)';
    ctx.fillRect(stripX - 5, stripTop, 10, stripBottom - stripTop);
    ctx.strokeStyle = '#5C3A08'; ctx.lineWidth = 1.4;

    // Đĩa mặt trời (sun disc)
    const hY1 = stripTop + 10;
    ctx.fillStyle = '#D89A1C';
    ctx.beginPath(); ctx.arc(stripX, hY1, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Ankh (chữ thập sự sống)
    const hY2 = hY1 + 16;
    ctx.strokeStyle = '#5C3A08'; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.ellipse(stripX, hY2 - 6, 2.6, 3.4, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(stripX, hY2 - 2.6); ctx.lineTo(stripX, hY2 + 9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(stripX - 4, hY2 + 1.5); ctx.lineTo(stripX + 4, hY2 + 1.5); ctx.stroke();

    // Sóng nước (zigzag) phía dưới
    const hY3 = hY2 + 18;
    ctx.beginPath();
    ctx.moveTo(stripX - 4, hY3);
    ctx.lineTo(stripX - 1, hY3 + 3);
    ctx.lineTo(stripX + 2, hY3);
    ctx.lineTo(stripX + 5, hY3 + 3);
    ctx.stroke();

    // ── Nứt vỡ tăng dần theo sát thương đã nhận ──────────────────
    if (pct < 0.65) {
        ctx.strokeStyle = 'rgba(40,24,4,0.75)'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(-8, top + 6); ctx.lineTo(2, top + 22); ctx.lineTo(-5, top + 38); ctx.stroke();
    }
    if (pct < 0.35) {
        ctx.strokeStyle = 'rgba(20,12,2,0.85)'; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(10, top + 4); ctx.lineTo(5, top + 20); ctx.lineTo(13, top + 34); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(13, top + 34); ctx.lineTo(15, bottom - 14); ctx.stroke();
        ctx.fillStyle = 'rgba(90,55,8,0.5)';
        ctx.beginPath(); ctx.moveTo(12, top + 6); ctx.lineTo(17, top + 11); ctx.lineTo(9, top + 15); ctx.closePath(); ctx.fill();
    }

    ctx.restore();
}

// ── STATE 2: Pharaoh lộ diện (xác ướp) ──────────────────────────

// Băng quấn thân thay cho áo sơ mi mặc định, kèm vòng cổ vàng (Wesekh)
function _drawMummyOutfit(ctx, zombie) {
    const hy = -36;
    // Lớp băng nền
    const bg = ctx.createLinearGradient(-14, -5, 14, 25);
    bg.addColorStop(0,   '#EDE3C8');
    bg.addColorStop(0.5, '#D8C8A0');
    bg.addColorStop(1,   '#A8956E');
    ctx.fillStyle = bg; ctx.strokeStyle = '#7A6A48'; ctx.lineWidth = 2;
    rr(ctx, -14, -5, 28, 28, 5); ctx.fill(); ctx.stroke();

    // Dải băng quấn chéo
    ctx.strokeStyle = 'rgba(122,106,72,0.55)'; ctx.lineWidth = 2.5;
    [[-13, 2, 13, -2], [-13, 10, 13, 6], [-13, 18, 13, 14]].forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    });
    // Dải băng buông lơi
    ctx.fillStyle = '#D8C8A0'; ctx.strokeStyle = '#7A6A48'; ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(6, 18); ctx.quadraticCurveTo(10, 28, 5, 38);
    ctx.quadraticCurveTo(8, 29, 4, 19);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    // Vòng cổ vàng (Wesekh collar)
    ctx.fillStyle = '#FFD24A'; ctx.strokeStyle = '#A86E0E'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.ellipse(0, hy + 28, 14, 5, 0, 0, Math.PI); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1B7A8C';
    for (let i = -3; i <= 3; i++) {
        ctx.beginPath(); ctx.arc(i * 3.8, hy + 28, 1.4, 0, Math.PI * 2); ctx.fill();
    }
}

// Tay quấn băng (đổi màu da xanh sang băng trắng-vàng)
function _drawMummyArms(ctx, animTime) {
    ctx.save(); ctx.translate(-14, 5); ctx.rotate(-0.25 + Math.sin(animTime * 2.8) * 0.08);
    ctx.fillStyle = '#D8C8A0'; ctx.strokeStyle = '#7A6A48'; ctx.lineWidth = 1.5;
    rr(ctx, -28, -4, 30, 8, 4); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(122,106,72,0.6)'; ctx.lineWidth = 1.2;
    [-22, -14, -6].forEach(wx => { ctx.beginPath(); ctx.moveTo(wx, -4); ctx.lineTo(wx + 3, 4); ctx.stroke(); });
    ctx.fillStyle = '#D8C8A0'; ctx.strokeStyle = '#7A6A48'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(-30, 0, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();

    ctx.save(); ctx.translate(14, 5); ctx.rotate(0.55 + Math.sin(animTime * 2.8 + 1) * 0.06);
    ctx.fillStyle = '#D8C8A0'; ctx.strokeStyle = '#7A6A48'; ctx.lineWidth = 1.5;
    rr(ctx, 0, -4, 22, 8, 4); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(122,106,72,0.6)'; ctx.lineWidth = 1.2;
    [6, 13].forEach(wx => { ctx.beginPath(); ctx.moveTo(wx, -4); ctx.lineTo(wx + 3, 4); ctx.stroke(); });
    ctx.restore();
}

// Đầu quấn băng kín, chỉ lộ 2 mắt phát sáng nhẹ
function _drawMummyHead(ctx, hy, animTime, hpPct, rageEyes) {
    const hg = ctx.createRadialGradient(-7, hy - 12, 1, 0, hy, 21);
    hg.addColorStop(0,    '#F0E6CC');
    hg.addColorStop(0.4,  '#D8C8A0');
    hg.addColorStop(0.75, '#B8A476');
    hg.addColorStop(1,    '#8A7550');
    ctx.fillStyle = hg; ctx.strokeStyle = '#5C4E32'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, hy, 19, 21, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Nếp băng quấn vòng quanh đầu
    ctx.strokeStyle = 'rgba(92,78,50,0.55)'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(-18, hy - 6); ctx.quadraticCurveTo(0, hy - 12, 18, hy - 6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-17, hy + 6); ctx.quadraticCurveTo(0, hy + 1, 17, hy + 6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-14, hy + 15); ctx.quadraticCurveTo(0, hy + 10, 14, hy + 15); ctx.stroke();
    // Vết rách băng hé lộ vài chỗ
    ctx.strokeStyle = 'rgba(92,78,50,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-9, hy - 14); ctx.lineTo(-7, hy - 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, hy + 8); ctx.lineTo(8, hy + 16); ctx.stroke();

    // Khe mắt hẹp, phát sáng nhẹ kiểu huyền bí
    [-7, 7].forEach(ex => {
        ctx.save();
        ctx.shadowColor = rageEyes ? '#FF3300' : '#FFE9A0';
        ctx.shadowBlur = rageEyes ? 10 : 6;
        const eg = ctx.createRadialGradient(ex, hy - 4, 0, ex, hy - 4, 5.5);
        if (rageEyes) {
            eg.addColorStop(0, '#FF6644'); eg.addColorStop(0.6, '#CC1100'); eg.addColorStop(1, '#400000');
        } else {
            eg.addColorStop(0, '#FFF6D8'); eg.addColorStop(0.6, '#FFD24A'); eg.addColorStop(1, '#8A5C0E');
        }
        ctx.fillStyle = eg;
        ctx.beginPath(); ctx.ellipse(ex, hy - 4, 4.4, 2.6, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    });

    if (hpPct < 0.4) {
        ctx.strokeStyle = 'rgba(92,78,50,0.7)'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(-12, hy - 16); ctx.lineTo(-2, hy - 18); ctx.stroke();
    }
}

// Khăn Nemes (vàng-xanh sọc) — phủ từ đỉnh đầu, 2 vạt buông qua vai
function _drawNemesHat(ctx, hy, animTime, state) {
    const sway = state === 'walking' ? Math.sin(animTime * 5.5) * 0.04 : 0;

    // Vạt vải buông 2 bên qua vai (vẽ trước, nằm dưới phần đỉnh đầu)
    [-1, 1].forEach(s => {
        ctx.save();
        ctx.translate(s * 15, hy + 6);
        ctx.rotate(s * (0.12 + sway));
        const lg = ctx.createLinearGradient(0, -6, 0, 26);
        lg.addColorStop(0,   '#FFD24A');
        lg.addColorStop(0.5, '#1B7A8C');
        lg.addColorStop(1,   '#0F4A56');
        ctx.fillStyle = lg; ctx.strokeStyle = '#0F4A56'; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-5, -6); ctx.lineTo(5, -6);
        ctx.lineTo(7, 24); ctx.lineTo(-7, 24);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        // Sọc vàng-xanh
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.5;
        for (let i = -1; i <= 1; i++) {
            ctx.beginPath(); ctx.moveTo(i * 3, -5); ctx.lineTo(i * 3.5, 23); ctx.stroke();
        }
        ctx.restore();
    });

    // Đỉnh đầu — mũ trùm chính, sọc vàng-xanh
    const capG = ctx.createLinearGradient(-19, hy - 30, 19, hy + 4);
    capG.addColorStop(0,   '#FFE9A0');
    capG.addColorStop(0.5, '#FFC94A');
    capG.addColorStop(1,   '#D89A1C');
    ctx.fillStyle = capG; ctx.strokeStyle = '#8A5C0E'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-19, hy + 2);
    ctx.quadraticCurveTo(-19, hy - 26, 0, hy - 30);
    ctx.quadraticCurveTo(19, hy - 26, 19, hy + 2);
    ctx.lineTo(-19, hy + 2);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    // Sọc xanh ngọc dọc mũ
    ctx.strokeStyle = '#1B7A8C'; ctx.lineWidth = 2.4;
    [-11, -4, 4, 11].forEach(sx => {
        ctx.beginPath();
        ctx.moveTo(sx * 1.0, hy + 1);
        ctx.quadraticCurveTo(sx * 0.7, hy - 18, sx * 0.25, hy - 28);
        ctx.stroke();
    });

    // Dải trán vàng + rắn hổ mang (uraeus) phía trước
    ctx.fillStyle = '#FFD24A'; ctx.strokeStyle = '#8A5C0E'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(0, hy + 0, 19.5, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1B7A8C';
    ctx.beginPath();
    ctx.moveTo(0, hy - 3); ctx.quadraticCurveTo(3, hy - 9, 0, hy - 14);
    ctx.quadraticCurveTo(-1.5, hy - 9, 0, hy - 3);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#FFD24A';
    ctx.beginPath(); ctx.arc(0, hy - 14, 1.8, 0, Math.PI * 2); ctx.fill();
}

// Legacy wrapper — dùng cho thumbnail (Zombie Notes, danh sách màn hình chính)
function drawPharaohZombie(ctx, x, y, animTime, state, hpPct, hasSarcophagus, sarcophagusPct, deathT) {
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: hasSarcophagus ? {
            drawShieldFn: (ctx2, t, st) => _drawSarcophagus(ctx2, t, st, sarcophagusPct),
            drawHeadFn:   () => {},
            drawArmsFn:   () => {},
        } : {
            drawOutfitFn: _drawMummyOutfit,
            drawArmsFn:   _drawMummyArms,
            drawHeadFn:   _drawMummyHead,
            drawHatFn:    _drawNemesHat,
        },
        effects: [],
    });
}
