'use strict';
// ══════════════════════════════════════════════════════════════
//  drawBonkChoy.js — Cây cải thìa (bok choy) thấp, chắc khỏe, tư thế
//  võ sĩ quyền anh: 2 nắm đấm lá khổng lồ ở hai bên, thân tròn dẹt
//  sát đất, mắt quyết tâm + lông mày cau xuống.
//
//  punching:  đang có mục tiêu trong tầm → giữ tư thế thủ căng
//  punchT:    0→1 tiến trình cú đấm hiện tại (đỉnh = 0.5, lúc gây dmg)
//  punchSide: -1 = tay trái đang ra đòn, 1 = tay phải đang ra đòn
//  facing:    -1/1 hướng mục tiêu (cả 2 tay đều đấm về hướng này)
// ══════════════════════════════════════════════════════════════
function drawBonkChoy(ctx, x, y, animTime, punching, punchT, punchSide, facing) {
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng đổ rộng — thân thấp sát đất
    ctx.fillStyle = 'rgba(0,0,0,0.26)';
    ctx.beginPath(); ctx.ellipse(0, 30, 31, 7.5, 0, 0, Math.PI * 2); ctx.fill();

    const idleSway = punching ? 0 : Math.sin(animTime * 2.4) * 1;
    const bob      = punching ? 0 : Math.sin(animTime * 2.4) * 1.2;
    const extend   = punching ? Math.sin(Math.min(Math.max(punchT, 0), 1) * Math.PI) : 0;
    // Thân xoay nhẹ theo lực đấm — vai bên ra đòn hơi đẩy về trước
    const twist    = punching ? -punchSide * extend * 0.10 : 0;

    // ── THÂN + LÁ + MẶT (nhóm xoay nhẹ khi đấm) ─────────────────
    ctx.save();
    ctx.translate(0, 9 + bob);
    ctx.rotate(twist);

    // Lá trên đầu — 4 lá, rung nhẹ trong gió khi idle
    const leaves = [
        { dx: -17, dy: -8,  ang: -0.62, len: 17 },
        { dx: -6,  dy: -15, ang: -0.16, len: 19 },
        { dx: 6,   dy: -15, ang:  0.16, len: 19 },
        { dx: 17,  dy: -8,  ang:  0.62, len: 17 },
    ];
    for (const lf of leaves) {
        ctx.save();
        ctx.translate(lf.dx, lf.dy);
        ctx.rotate(lf.ang + idleSway * 0.025 * (lf.dx === 0 ? 1 : Math.sign(lf.dx)));
        const lg = ctx.createLinearGradient(0, -lf.len, 0, 2);
        lg.addColorStop(0, '#3E7A1C');
        lg.addColorStop(1, '#74B23A');
        ctx.fillStyle = lg; ctx.strokeStyle = '#234C0E'; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 2);
        ctx.quadraticCurveTo(-8, -lf.len * 0.55, 0, -lf.len);
        ctx.quadraticCurveTo(8, -lf.len * 0.55, 0, 2);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -lf.len * 0.82); ctx.stroke();
        ctx.restore();
    }

    // Thân — bok choy tròn dẹt, rộng hơn cao, sát đất
    const bg = ctx.createRadialGradient(-9, -9, 4, 0, 3, 40);
    bg.addColorStop(0,    '#DCF3A8');
    bg.addColorStop(0.42, '#A2D35E');
    bg.addColorStop(0.78, '#5C9A2C');
    bg.addColorStop(1,    '#2E5C12');
    ctx.fillStyle = bg; ctx.strokeStyle = '#234C0E'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(0, 5, 30, 19, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Highlight mềm trên thân (gradient PvZ-style)
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath(); ctx.ellipse(-9, -3, 13, 7, -0.3, 0, Math.PI * 2); ctx.fill();

    // ── Mắt quyết tâm + lông mày cau xuống ──────────────────────
    [-9, 9].forEach((ex) => {
        ctx.fillStyle = 'white'; ctx.strokeStyle = '#234C0E'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.ellipse(ex, -1, 6.2, 6.8, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    });
    ctx.fillStyle = '#10180a';
    ctx.beginPath(); ctx.arc(-7.5, -0.5, 3.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(10.5, -0.5, 3.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath(); ctx.arc(-6.3, -2.3, 1.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(11.7, -2.3, 1.2, 0, Math.PI * 2); ctx.fill();

    // Lông mày — chữ V cau xuống giữa (biểu cảm quyết tâm)
    ctx.strokeStyle = '#1B3A0A'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-16, -10); ctx.lineTo(-4, -5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(16, -10); ctx.lineTo(4, -5); ctx.stroke();

    ctx.restore(); // end thân/lá/mặt

    // ── HAI NẮM ĐẤM LÁ (vẽ trong không gian thế giới — không xoay theo thân) ──
    const shoulderY = 13 + bob * 0.5;
    [-1, 1].forEach((s) => {
        const isActive = punching && punchSide === s;
        const e         = isActive ? extend : 0;
        const shoulderX = s * 15;
        const guardX    = shoulderX + facing * 7;
        const guardY    = shoulderY - 7;
        const fistX      = shoulderX + facing * (7 + e * 33);
        const fistY      = guardY + e * 1.5;

        // Cánh tay (cuống lá) nối vai → nắm đấm
        ctx.strokeStyle = '#3E7A1C'; ctx.lineWidth = 9; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(shoulderX, shoulderY); ctx.lineTo(fistX, fistY); ctx.stroke();
        ctx.strokeStyle = 'rgba(220,243,168,0.30)'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(shoulderX, shoulderY); ctx.lineTo(fistX, fistY); ctx.stroke();

        // Nắm đấm — lá cuộn tròn, viền rõ, đậm hơn thân
        const fg = ctx.createRadialGradient(fistX - s * 3, fistY - 3, 2, fistX, fistY, 13);
        fg.addColorStop(0,    '#7EBF44');
        fg.addColorStop(0.55, '#4C8A22');
        fg.addColorStop(1,    '#234C0E');
        ctx.fillStyle = fg; ctx.strokeStyle = '#152E08'; ctx.lineWidth = 2.6;
        ctx.beginPath(); ctx.ellipse(fistX, fistY, 12, 11, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

        // Đường cuộn lá (vân khớp ngón) trên nắm đấm
        ctx.strokeStyle = '#152E08'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(fistX, fistY, 6.5, 0.2, Math.PI * 1.3); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(fistX - facing * 8, fistY - 5);
        ctx.lineTo(fistX - facing * 8, fistY + 5);
        ctx.stroke();

        // Hiệu ứng "bụp" — bung sáng khi nắm đấm vươn hết tầm
        if (isActive && e > 0.82) {
            const burst = (e - 0.82) / 0.18;
            ctx.save();
            ctx.globalAlpha = burst * 0.8;
            ctx.strokeStyle = '#F4FFD8'; ctx.lineWidth = 2; ctx.lineCap = 'round';
            for (const a of [-0.5, -0.18, 0.18, 0.5]) {
                ctx.beginPath();
                ctx.moveTo(fistX + facing * 12 * Math.cos(a), fistY + 12 * Math.sin(a));
                ctx.lineTo(fistX + facing * (12 + burst * 9) * Math.cos(a), fistY + (12 + burst * 9) * Math.sin(a));
                ctx.stroke();
            }
            ctx.restore();
        }
    });

    ctx.restore();
}
