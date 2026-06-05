'use strict';
// Wall-nut — redesigned
//   Hình oval đứng màu caramel nâu
//   Mắt tròn lòng trắng, con ngươi đen nhìn sang PHẢI
//   HP > 2/3 : miệng hơi cười
//   HP 1/3–2/3: mặt buồn (lông mày cau) + băng cứu thương góc trên trái
//   HP < 1/3 : mặt buồn + băng + đang khóc (giọt nước mắt)
function drawWallNut(ctx, x, y, animTime, hpPct) {
    const hitShake = hpPct < 0.5 ? Math.sin(animTime * 18) * 1.5 : 0;
    ctx.save(); ctx.translate(Math.round(x + hitShake), Math.round(y));

    // Bóng mờ dưới đất
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath(); ctx.ellipse(0, 30, 22, 7, 0, 0, Math.PI * 2); ctx.fill();

    // ── Thân oval đứng — caramel nâu ──────────────────────────
    const bg = ctx.createRadialGradient(-10, -12, 2, 0, 0, 31);
    bg.addColorStop(0,    '#EAB870'); // caramel sáng (highlight)
    bg.addColorStop(0.38, '#C88840'); // caramel trung
    bg.addColorStop(0.75, '#9A5E18'); // nâu đậm
    bg.addColorStop(1,    '#6a3806'); // viền rất tối
    ctx.fillStyle = bg; ctx.strokeStyle = '#5a2e06'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(0, 0, 27, 30, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // ── Mắt tròn — nhìn sang PHẢI ────────────────────────────
    // Lòng trắng mắt (sclera)
    ctx.strokeStyle = '#6a3806'; ctx.lineWidth = 1.5;
    [[-8, -6], [8, -6]].forEach(([ex, ey]) => {
        ctx.fillStyle = 'white';
        ctx.beginPath(); ctx.ellipse(ex, ey, 6.5, 7.5, 0, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
    });

    // Con ngươi đen — lệch PHẢI trong mắt để nhìn sang phải
    // (mắt trái: tâm -8, pupil tại -6 = lệch +2)
    // (mắt phải: tâm +8, pupil tại +10 = lệch +2)
    ctx.fillStyle = '#0d0d0d';
    ctx.beginPath(); ctx.arc(-6,  -5.5, 3.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(10,  -5.5, 3.8, 0, Math.PI * 2); ctx.fill();

    // Điểm bắt sáng nhỏ
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(-5,  -7.5, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(11, -7.5, 1.5, 0, Math.PI * 2); ctx.fill();

    // ── Miệng thay đổi theo HP ────────────────────────────────
    ctx.strokeStyle = '#5a2e06'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';

    if (hpPct > 0.66) {
        // Hơi cười nhẹ: đường cong lên (control point phía trên)
        ctx.beginPath();
        ctx.moveTo(-8, 11);
        ctx.quadraticCurveTo(0, 16, 8, 11);
        ctx.stroke();
    } else {
        // Mặt buồn: đường cong xuống (control point phía dưới)
        ctx.beginPath();
        ctx.moveTo(-8, 9);
        ctx.quadraticCurveTo(0, 5, 8, 9);
        ctx.stroke();

        // Lông mày cau lại (chụm về giữa → biểu hiện lo lắng/buồn)
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-13, -17); ctx.lineTo(-5, -14); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( 13, -17); ctx.lineTo( 5, -14); ctx.stroke();
    }

    // ── Băng cứu thương (HP ≤ 0.66 = đã bị ăn 1/3) ──────────
    // Đặt ở góc trên bên trái của mặt
    if (hpPct <= 0.66) {
        const bx = -12, by = -26, bw = 13, bh = 9;

        // Nền băng màu trắng-kem
        ctx.fillStyle = '#F8F8F0';
        ctx.strokeStyle = '#ccb090'; ctx.lineWidth = 1;
        rr(ctx, bx, by, bw, bh, 2); ctx.fill(); ctx.stroke();

        // Chữ thập đỏ
        const mx = bx + bw / 2, my = by + bh / 2;
        ctx.fillStyle = '#E01010';
        ctx.fillRect(mx - 1.5, by + 1.5,  3,       bh - 3); // thanh dọc
        ctx.fillRect(bx + 2,   my - 1.3,  bw - 4,  2.6);    // thanh ngang
    }

    // ── Đang khóc (HP < 0.33 = đã bị ăn 2/3) ────────────────
    // Hai giọt nước mắt xanh chảy từ dưới mắt xuống
    if (hpPct < 0.33) {
        ctx.fillStyle = 'rgba(70,145,255,0.80)';

        // Giọt nước mắt trái (dưới mắt trái, chảy xuống)
        ctx.beginPath();
        ctx.moveTo(-10, 2);
        ctx.quadraticCurveTo(-14, 8,  -10.5, 14); // mép trái cong ra
        ctx.quadraticCurveTo(-6.5, 8, -10,   2);  // mép phải cong vào
        ctx.closePath(); ctx.fill();

        // Giọt nước mắt phải (dưới mắt phải)
        ctx.beginPath();
        ctx.moveTo(7,  2);
        ctx.quadraticCurveTo(3,  8,  6.5, 14); // mép trái
        ctx.quadraticCurveTo(11, 8,  7,   2);  // mép phải
        ctx.closePath(); ctx.fill();
    }

    ctx.restore();
}
