'use strict';
// ══════════════════════════════════════════════════════════════
//  drawIceCabbage.js — Vẽ Ice Cabbage và bắp cải băng đang bay
//  Fusion: Cabbage + Ice Lettuce
//
//  Giống hệt Cabbage, chỉ đổi màu thân + đạn sang tông băng
//  (giống Ice Lettuce). Nhánh đỡ + rổ giữ nguyên như Cabbage.
//
//  drawIceCabbage(ctx, cx, cy, animTime, hpPct, lobAnim)
//  drawIceCabbageLob(ctx, x, y, angle) — đạn bắp cải băng đang bay
// ══════════════════════════════════════════════════════════════

// Vẽ bắp cải băng đang bay theo vòng cung
function drawIceCabbageLob(ctx, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Thân bắp cải — hình cầu màu băng
    const cg = ctx.createRadialGradient(-5, -5, 2, 0, 0, 14);
    cg.addColorStop(0,    '#F0FBFF');
    cg.addColorStop(0.5,  '#4FC3F7');
    cg.addColorStop(1,    '#0277BD');
    ctx.fillStyle = cg;
    ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fill();

    // Đường vân lá bắp cải
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-8, -4); ctx.quadraticCurveTo(0, 0, 8, -3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-7, 2);  ctx.quadraticCurveTo(0, 5, 7, 2);  ctx.stroke();

    // Highlight sáng góc trái trên
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath(); ctx.ellipse(-4, -5, 5, 3.5, -0.7, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
}

// Vẽ một viên đạn bắp cải băng nhỏ (dùng cho đạn nằm sẵn trong rổ)
function _drawIceCabbageAmmo(ctx, x, y, r, alpha = 1) {
    ctx.save();
    ctx.globalAlpha *= alpha;
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.15, x, y, r);
    g.addColorStop(0,    '#F0FBFF');
    g.addColorStop(0.55, '#4FC3F7');
    g.addColorStop(1,    '#0277BD');
    ctx.fillStyle = g; ctx.strokeStyle = '#01579B'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - r * 0.6, y - r * 0.2); ctx.quadraticCurveTo(x, y + r * 0.15, x + r * 0.6, y - r * 0.15); ctx.stroke();
    ctx.restore();
}

// Cây Ice Cabbage chính — giống Cabbage, thân + đạn đổi màu băng
function drawIceCabbage(ctx, cx, cy, animTime, hpPct, lobAnim = 0) {
    ctx.save();
    ctx.translate(cx, cy);

    const bob = Math.sin(animTime * 2.2) * 1.5;
    const by0 = 8 + bob; // tâm thân chính

    // Bóng đổ
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 24, 20, 5.5, 0, 0, Math.PI * 2); ctx.fill();

    // ── Nhánh cong + rổ đạn (vẽ trước để thân đè lên gốc nhánh) ──
    const ax = -9, ay = -8 + bob;   // điểm gắn ~10h trên thân
    const bx = -12, by = -31 + bob; // tâm rổ
    const flick = lobAnim > 0
        ? -Math.sin(lobAnim * Math.PI) * 0.45  // vung lên khi ném
        : Math.sin(animTime * 2) * 0.05;       // lắc nhẹ khi idle

    ctx.save();
    ctx.translate(ax, ay);
    ctx.rotate(flick);

    const ex = bx - ax, ey = by - ay;       // tâm rổ (toạ độ cục bộ)
    const ctrlx = -18, ctrly = ey * 0.7;

    // Nhánh cong — viền đậm + lõi sáng, chắc chắn không mảnh
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#3f7a16'; ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(ctrlx, ctrly, ex, ey); ctx.stroke();
    ctx.strokeStyle = '#79c93a'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(ctrlx, ctrly, ex, ey); ctx.stroke();

    // Rổ — nửa hình cầu (half-bowl) gắn liền ở đầu nhánh, miệng hướng lên
    ctx.translate(ex, ey);
    const basketR = 11;
    const bg = ctx.createLinearGradient(0, 0, 0, basketR);
    bg.addColorStop(0, '#a9783a');
    bg.addColorStop(1, '#6b4413');
    ctx.fillStyle = bg; ctx.strokeStyle = '#3a1a00'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(0, 0, basketR, 0, Math.PI, false); ctx.closePath(); ctx.fill(); ctx.stroke();

    // Đạn bắp cải băng nằm sẵn trong rổ — viên trên cùng mờ dần khi vừa ném
    const topAlpha = lobAnim > 0.5 ? Math.max(0, 1 - (lobAnim - 0.5) * 2) : 1;
    _drawIceCabbageAmmo(ctx, -5, -1, 6);
    _drawIceCabbageAmmo(ctx, 4, -3, 6.5);
    _drawIceCabbageAmmo(ctx, -1, -7, 6, topAlpha);

    // Viền miệng rổ — vẽ sau cùng để rổ trông ôm lấy đạn
    ctx.strokeStyle = '#5a3208'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, 0, basketR, 3, 0, 0, Math.PI * 2); ctx.stroke();

    ctx.restore(); // end nhánh + rổ

    // ── Thân chính — khối cầu hơi dẹt, nằm sát đất, tông màu băng ──
    const tg = ctx.createRadialGradient(-8, by0 - 8, 4, 0, by0, 24);
    tg.addColorStop(0,    '#F0FBFF');
    tg.addColorStop(0.55, '#4FC3F7');
    tg.addColorStop(1,    '#0277BD');
    ctx.fillStyle = tg; ctx.strokeStyle = '#01579B'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, by0, 21, 15, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Đường vân lá bắp cải (vân băng)
    ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-14, by0 - 2); ctx.quadraticCurveTo(0, by0 + 4, 14, by0 - 1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-12, by0 + 6); ctx.quadraticCurveTo(0, by0 + 10, 12, by0 + 5); ctx.stroke();

    // Highlight góc trái trên cho cảm giác tròn, mềm
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath(); ctx.ellipse(-8, by0 - 7, 8, 5, -0.6, 0, Math.PI * 2); ctx.fill();

    // ── Mắt — kích thước tương đương IceLettuce, nhìn về phía trước ──
    ctx.fillStyle = '#10181F';
    ctx.beginPath(); ctx.ellipse(4, by0 + 1, 4, 5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(15, by0 + 1, 4, 5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(5.3, by0 - 0.3, 1.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(16.3, by0 - 0.3, 1.3, 0, Math.PI * 2); ctx.fill();

    // Damage tint khi HP thấp
    if (hpPct < 0.5) {
        ctx.fillStyle = `rgba(200,50,0,${(0.5 - hpPct) * 0.5})`;
        ctx.beginPath(); ctx.ellipse(0, by0 - 5, 24, 30, 0, 0, Math.PI * 2); ctx.fill();
    }

    ctx.restore();
}
