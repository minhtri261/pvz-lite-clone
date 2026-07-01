'use strict';
// Peanut (Đậu Phộng) — Wall-nut + Peashooter fusion
//   Ngoại hình copy từ Wall-nut (oval đứng, mắt tròn nhìn phải, lông mày,
//   băng cứu thương, nước mắt theo HP) nhưng đổi bảng màu sang XANH LÁ
//   của Peashooter, và nòng súng Peashooter được đặt ngay tại vị trí
//   miệng (thay cho miệng bình thường của Wall-nut)
function drawPeanut(ctx, x, y, animTime, hpPct, shootT) {
    const hitShake = hpPct < 0.5 ? Math.sin(animTime * 18) * 1.5 : 0;
    const recoil   = Math.sin(shootT * Math.PI) * -8;
    ctx.save(); ctx.translate(Math.round(x + hitShake), Math.round(y));

    // Bóng mờ dưới đất
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath(); ctx.ellipse(0, 30, 22, 7, 0, 0, Math.PI * 2); ctx.fill();

    // ── Nòng súng Peashooter — đặt ở VỊ TRÍ MIỆNG, vẽ trước (gốc nòng bị thân che) ──
    const bx = -6 + recoil, by = 11, bw = 34, bh = 12;
    const barG = ctx.createLinearGradient(bx, by - bh / 2, bx, by + bh / 2);
    barG.addColorStop(0,   '#76C442');
    barG.addColorStop(0.5, '#43A047');
    barG.addColorStop(1,   '#2E7D32');
    ctx.fillStyle = barG; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    rr(ctx, bx, by - bh / 2, bw, bh, 4); ctx.fill(); ctx.stroke();
    // Highlight nhỏ trên nòng
    ctx.fillStyle = 'rgba(200,240,160,0.28)';
    rr(ctx, bx + 2, by - bh / 2 + 1.5, bw - 6, 3.5, 2); ctx.fill();
    // Đầu nòng — cap tròn với lỗ tối
    ctx.fillStyle = '#33691E'; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bx + bw, by, bh / 2 + 1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0d2600';
    ctx.beginPath(); ctx.arc(bx + bw, by, 3.5, 0, Math.PI * 2); ctx.fill();

    // ── Thân oval đứng — copy Wall-nut, đổi sang bảng màu XANH LÁ Peashooter ──
    const bg = ctx.createRadialGradient(-10, -12, 2, 0, 0, 31);
    bg.addColorStop(0,    '#C8E69A'); // highlight xanh sáng
    bg.addColorStop(0.38, '#8BC34A'); // xanh lá nhạt
    bg.addColorStop(0.75, '#4CAF50'); // xanh lá vừa
    bg.addColorStop(1,    '#1B5E20'); // viền tối
    ctx.fillStyle = bg; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(0, 0, 27, 30, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // ── Mắt tròn — nhìn sang PHẢI (giống Wall-nut) ────────────
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5;
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

    // ── Lông mày cau lại khi máu thấp (giống Wall-nut, không có miệng vì đã là nòng súng) ──
    if (hpPct <= 0.66) {
        ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-13, -17); ctx.lineTo(-5, -14); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( 13, -17); ctx.lineTo( 5, -14); ctx.stroke();
    }

    // ── Vết nứt theo máu ───────────────────────────────────────
    if (hpPct < 0.66) {
        ctx.strokeStyle = 'rgba(27,94,32,0.9)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-6, -22); ctx.lineTo(-2, -14); ctx.lineTo(-9, -6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-20, -14); ctx.lineTo(-14, -8); ctx.lineTo(-20, -2); ctx.stroke();
    }
    if (hpPct < 0.33) {
        ctx.strokeStyle = 'rgba(27,94,32,0.95)'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(8, -22); ctx.lineTo(4, -16); ctx.lineTo(11, -10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(18, -18); ctx.lineTo(13, -12); ctx.stroke();
    }

    // ── Băng cứu thương (HP ≤ 0.66) ──────────────────────────
    if (hpPct <= 0.66) {
        const bdx = -12, bdy = -26, bdw = 13, bdh = 9;
        ctx.fillStyle = '#F8F8F0'; ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 1;
        rr(ctx, bdx, bdy, bdw, bdh, 2); ctx.fill(); ctx.stroke();
        const mx = bdx + bdw / 2, my = bdy + bdh / 2;
        ctx.fillStyle = '#E01010';
        ctx.fillRect(mx - 1.5, bdy + 1.5, 3, bdh - 3);
        ctx.fillRect(bdx + 2, my - 1.3, bdw - 4, 2.6);
    }

    // ── Đang khóc (HP < 0.33) ─────────────────────────────────
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
