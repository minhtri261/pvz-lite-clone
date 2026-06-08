'use strict';
// ══════════════════════════════════════════════════════════════
//  drawCabbage.js — Vẽ Cabbage-pult và bắp cải đang bay
//
//  drawCabbage(ctx, cx, cy, animTime, hpPct, lobAnim)
//    cx, cy    — tâm cây
//    animTime  — thời gian animation (giây)
//    hpPct     — phần trăm máu (0–1) để thể hiện damage tint
//    lobAnim   — 0–1, > 0 khi đang animation vung tay
//
//  drawCabbageLob(ctx, x, y, angle)
//    Vẽ bắp cải đang bay (gọi từ CabbageProjectile.draw)
// ══════════════════════════════════════════════════════════════

// Vẽ bắp cải đang bay theo vòng cung
function drawCabbageLob(ctx, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Thân bắp cải — hình cầu màu xanh
    const cg = ctx.createRadialGradient(-5, -5, 2, 0, 0, 14);
    cg.addColorStop(0,   '#a8e860');
    cg.addColorStop(0.5, '#5cb830');
    cg.addColorStop(1,   '#2a6808');
    ctx.fillStyle = cg;
    ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fill();

    // Đường vân lá bắp cải
    ctx.strokeStyle = 'rgba(30,90,10,0.55)'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-8, -4); ctx.quadraticCurveTo(0, 0, 8, -3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-7, 2);  ctx.quadraticCurveTo(0, 5, 7, 2);  ctx.stroke();

    // Highlight sáng góc trái trên
    ctx.fillStyle = 'rgba(200,255,140,0.35)';
    ctx.beginPath(); ctx.ellipse(-4, -5, 5, 3.5, -0.7, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
}

// Cây Cabbage-pult chính
function drawCabbage(ctx, cx, cy, animTime, hpPct, lobAnim = 0) {
    ctx.save();
    ctx.translate(cx, cy);

    const sway = Math.sin(animTime * 3.5) * 2;

    // ── Thân cây (catapult arm) ────────────────────────────────
    // Cột thân gỗ
    const stg = ctx.createLinearGradient(-7, -20, 7, 10);
    stg.addColorStop(0, '#8B5E1A');
    stg.addColorStop(1, '#5a3208');
    ctx.fillStyle = stg; ctx.strokeStyle = '#3a1a00'; ctx.lineWidth = 1.5;
    rr(ctx, -6, -18, 12, 30, 4); ctx.fill(); ctx.stroke();

    // ── Cánh tay ném (vung lên khi lobAnim > 0) ───────────────
    const armAngle = lobAnim > 0
        ? -Math.PI * 0.6 * lobAnim         // vung ngược chiều kim đồng hồ (lên trên) khi ném
        : -0.18 + Math.sin(animTime * 2) * 0.06; // lắc nhẹ khi idle

    ctx.save();
    ctx.translate(0, -18);
    ctx.rotate(armAngle);

    // Thanh ném
    ctx.strokeStyle = '#7a4e10'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(30, -5); ctx.stroke();
    ctx.strokeStyle = '#c8903a'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(28, -5); ctx.stroke();

    // Giỏ đựng bắp cải (ở đầu thanh)
    ctx.save();
    ctx.translate(30, -5);
    ctx.fillStyle = '#8B5E1A'; ctx.strokeStyle = '#3a1a00'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Bắp cải ngồi trong giỏ (chỉ khi không đang ném)
    if (lobAnim < 0.4) {
        const alpha = 1 - lobAnim / 0.4;
        ctx.globalAlpha *= alpha;
        const cg = ctx.createRadialGradient(-2, -2, 1, 0, 0, 8);
        cg.addColorStop(0,   '#a0e060');
        cg.addColorStop(0.6, '#50a820');
        cg.addColorStop(1,   '#2a6000');
        ctx.fillStyle = cg;
        ctx.beginPath(); ctx.arc(0, -3, 8, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(30,80,10,0.5)'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(-5, -4); ctx.quadraticCurveTo(0, -1, 5, -4); ctx.stroke();
        ctx.globalAlpha = (ctx.globalAlpha / alpha); // restore
    }
    ctx.restore(); // end giỏ

    ctx.restore(); // end arm

    // ── Đế / bánh xe ──────────────────────────────────────────
    ctx.fillStyle = '#6a4010'; ctx.strokeStyle = '#3a1a00'; ctx.lineWidth = 1.5;
    rr(ctx, -16, 8, 32, 10, 3); ctx.fill(); ctx.stroke();

    // Bánh xe trái
    ctx.fillStyle = '#3a2008'; ctx.strokeStyle = '#5a3810'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(-10, 18 + sway * 0.3, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#7a5828'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
        const a = (animTime * 2 + i * Math.PI * 0.5) % (Math.PI * 2);
        ctx.beginPath();
        ctx.moveTo(-10 + Math.cos(a) * 3, 18 + sway * 0.3 + Math.sin(a) * 3);
        ctx.lineTo(-10 + Math.cos(a) * 8, 18 + sway * 0.3 + Math.sin(a) * 8);
        ctx.stroke();
    }

    // Bánh xe phải
    ctx.fillStyle = '#3a2008'; ctx.strokeStyle = '#5a3810'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(10, 18 + sway * 0.3, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#7a5828'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
        const a = (animTime * 2 + i * Math.PI * 0.5 + 0.5) % (Math.PI * 2);
        ctx.beginPath();
        ctx.moveTo(10 + Math.cos(a) * 3, 18 + sway * 0.3 + Math.sin(a) * 3);
        ctx.lineTo(10 + Math.cos(a) * 8, 18 + sway * 0.3 + Math.sin(a) * 8);
        ctx.stroke();
    }

    // Damage tint khi HP thấp
    if (hpPct < 0.5) {
        ctx.fillStyle = `rgba(200,50,0,${(0.5 - hpPct) * 0.5})`;
        ctx.beginPath(); ctx.ellipse(0, -5, 20, 28, 0, 0, Math.PI * 2); ctx.fill();
    }

    ctx.restore();
}
