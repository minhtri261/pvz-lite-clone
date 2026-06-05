'use strict';
// Sun-nut: WallNut + SunFlower fusion
// Giống hệt WallNut nhưng màu VÀNG (sunflower yellow thay cho caramel nâu)
// Cùng cơ chế HP: buồn + băng ở 1/3, khóc ở 2/3
function drawSunNut(ctx, x, y, animTime, hpPct, producePulse) {
    const hitShake = hpPct < 0.5 ? Math.sin(animTime * 18) * 1.5 : 0;
    ctx.save(); ctx.translate(Math.round(x + hitShake), Math.round(y));

    // Bóng mờ
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath(); ctx.ellipse(0, 30, 22, 7, 0, 0, Math.PI * 2); ctx.fill();

    // ── Thân oval đứng — VÀNG ─────────────────────────────────
    // Thay bảng màu nâu caramel → vàng sunflower
    const bg = ctx.createRadialGradient(-10, -12, 2, 0, 0, 31);
    bg.addColorStop(0,    '#FFF9C4'); // vàng rất sáng (highlight)
    bg.addColorStop(0.38, '#FFD600'); // vàng chính
    bg.addColorStop(0.75, '#F9A825'); // cam-vàng đậm
    bg.addColorStop(1,    '#E65100'); // viền cam tối
    ctx.fillStyle = bg; ctx.strokeStyle = '#BF360C'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(0, 0, 27, 30, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Glow nhỏ khi đang sản xuất sun
    if (producePulse > 0) {
        const sc = 1 + Math.sin(animTime * 8) * 0.04;
        ctx.save(); ctx.scale(sc, sc);
        ctx.strokeStyle = 'rgba(255,220,0,0.5)';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(0, 0, 28, 31, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
    }

    // ── Mắt tròn — nhìn sang PHẢI (giống WallNut) ────────────
    ctx.strokeStyle = '#BF360C'; ctx.lineWidth = 1.5;
    [[-8, -6], [8, -6]].forEach(([ex, ey]) => {
        ctx.fillStyle = 'white';
        ctx.beginPath(); ctx.ellipse(ex, ey, 6.5, 7.5, 0, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
    });
    ctx.fillStyle = '#0d0d0d';
    ctx.beginPath(); ctx.arc(-6, -5.5, 3.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(10, -5.5, 3.8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(-5, -7.5, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(11, -7.5, 1.5, 0, Math.PI * 2); ctx.fill();

    // ── Miệng thay đổi theo HP (giống WallNut) ────────────────
    ctx.strokeStyle = '#BF360C'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    if (hpPct > 0.66) {
        ctx.beginPath();
        ctx.moveTo(-8, 11); ctx.quadraticCurveTo(0, 16, 8, 11); ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(-8, 9); ctx.quadraticCurveTo(0, 5, 8, 9); ctx.stroke();
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-13, -17); ctx.lineTo(-5, -14); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( 13, -17); ctx.lineTo( 5, -14); ctx.stroke();
    }

    // ── Băng cứu thương (HP ≤ 0.66) ──────────────────────────
    if (hpPct <= 0.66) {
        const bx = -12, by = -26, bw = 13, bh = 9;
        ctx.fillStyle = '#F8F8F0'; ctx.strokeStyle = '#ccb090'; ctx.lineWidth = 1;
        rr(ctx, bx, by, bw, bh, 2); ctx.fill(); ctx.stroke();
        const mx = bx + bw / 2, my = by + bh / 2;
        ctx.fillStyle = '#E01010';
        ctx.fillRect(mx - 1.5, by + 1.5, 3, bh - 3);
        ctx.fillRect(bx + 2, my - 1.3, bw - 4, 2.6);
    }

    // ── Khóc (HP < 0.33) ─────────────────────────────────────
    if (hpPct < 0.33) {
        ctx.fillStyle = 'rgba(70,145,255,0.80)';
        ctx.beginPath();
        ctx.moveTo(-10, 2);
        ctx.quadraticCurveTo(-14, 8, -10.5, 14);
        ctx.quadraticCurveTo(-6.5, 8, -10, 2);
        ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(7, 2);
        ctx.quadraticCurveTo(3, 8, 6.5, 14);
        ctx.quadraticCurveTo(11, 8, 7, 2);
        ctx.closePath(); ctx.fill();
    }

    ctx.restore();
}
