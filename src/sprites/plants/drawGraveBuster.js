'use strict';
// ══════════════════════════════════════════════════════════════
//  drawGraveBuster.js — Củ cây tròn dẹt với bộ rễ khoan xoắn
//  3 màu chủ đạo: olive green (thân), earth brown (rễ/đáy),
//  gold sand (đốm điểm xuyết). Mắt nhỏ nằm gần nhau, nhìn xuống đất.
//
//  progress: 0→1 — tiến độ khoan phá mộ. Rễ quay nhanh dần khi
//  progress tăng (animation đơn giản: rễ quay nhanh hơn).
// ══════════════════════════════════════════════════════════════
function drawGraveBuster(ctx, x, y, animTime, progress = 0) {
    const bob  = Math.sin(animTime * 2) * 1.5;
    const spin = animTime * (1.5 + progress * 9); // rễ quay nhanh hơn khi gần phá xong

    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    // Bóng đổ
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.beginPath(); ctx.ellipse(0, 25, 20, 6, 0, 0, Math.PI * 2); ctx.fill();

    // ── Bộ rễ khoan xoắn — nhiều nhánh spiral hội tụ ở tâm dưới thân ──
    ctx.save();
    ctx.translate(0, 12 + bob);
    const rootCount = 4;
    for (let i = 0; i < rootCount; i++) {
        const angle = (i / rootCount) * Math.PI * 2 + spin;
        ctx.save();
        ctx.rotate(angle);
        ctx.strokeStyle = i % 2 === 0 ? '#7A5A30' : '#9C7440'; // earth brown, 2 sắc độ
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        // Nhánh rễ chính — cong xoắn về tâm
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.bezierCurveTo(9, 10, 5, 18, 0, 24);
        ctx.stroke();
        // Nhánh rễ phụ nhỏ — tăng cảm giác "rễ cây" tự nhiên
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(4, 11);
        ctx.quadraticCurveTo(9, 14, 8, 20);
        ctx.stroke();
        ctx.restore();
    }
    // Điểm hội tụ trung tâm — mũi khoan
    ctx.fillStyle = '#5C421F';
    ctx.beginPath(); ctx.arc(0, 24, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // ── Thân — củ tròn dẹt, olive green ──
    const bw = 26, bh = 17;
    const bodyGrad = ctx.createRadialGradient(-7, -7 + bob, 4, 0, 1 + bob, bw);
    bodyGrad.addColorStop(0,    '#A8C46A');
    bodyGrad.addColorStop(0.55, '#7E9A45');
    bodyGrad.addColorStop(1,    '#5C7530');
    ctx.fillStyle = bodyGrad;
    ctx.strokeStyle = '#46591F'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, bob, bw, bh, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Phần đáy thân — earth brown, hoà vào bộ rễ
    ctx.fillStyle = '#8A6A3C';
    ctx.beginPath();
    ctx.ellipse(0, 5 + bob, bw * 0.82, bh * 0.55, 0, 0, Math.PI, false);
    ctx.fill();

    // Vệt sáng (highlight) phía trên-trái
    ctx.strokeStyle = 'rgba(255,255,255,0.32)'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(-6, -5 + bob, 13, Math.PI * 1.05, Math.PI * 1.6); ctx.stroke();

    // Đốm gold sand điểm xuyết
    ctx.fillStyle = 'rgba(222,196,120,0.85)';
    ctx.beginPath(); ctx.arc(-9, -3 + bob, 2.6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(9,  -8 + bob, 2,   0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(3,   3 + bob, 2.3, 0, Math.PI * 2); ctx.fill();

    // ── Mắt nhỏ nằm gần nhau, nhìn xuống đất ──
    ctx.fillStyle = '#241A0C';
    ctx.beginPath(); ctx.ellipse(-3, 7 + bob, 2.4, 3, -0.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( 3, 7 + bob, 2.4, 3, -0.2, 0, Math.PI * 2); ctx.fill();
    // Chấm sáng nhỏ phía trên mắt (mắt cụp nhìn xuống)
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath(); ctx.arc(-3.6, 5.8 + bob, 0.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 2.4, 5.8 + bob, 0.8, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
}
