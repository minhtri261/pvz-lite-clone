'use strict';
function drawPeashooter(ctx, x, y, animTime, shootT) {
    const bob    = Math.sin(animTime * 2.5) * 2;
    const recoil = Math.sin(shootT * Math.PI) * -7;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng đất nhỏ
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath(); ctx.ellipse(0, 27, 13, 4, 0, 0, Math.PI * 2); ctx.fill();

    // Thân cây — mảnh, nhẹ cong
    ctx.strokeStyle = '#388E3C'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 25); ctx.quadraticCurveTo(2, 10, 1, -1 + bob); ctx.stroke();
    // Highlight thân
    ctx.strokeStyle = 'rgba(185,228,120,0.5)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-1, 22); ctx.quadraticCurveTo(1, 10, 0, -1 + bob); ctx.stroke();

    // Lá trái — nhỏ gọn
    ctx.save(); ctx.translate(-2, 10 + bob * 0.3); ctx.rotate(-0.5);
    ctx.fillStyle = '#558B2F'; ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(-5, 0, 10, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();

    // Lá phải — nhỏ hơn một chút
    ctx.save(); ctx.translate(2, 13 + bob * 0.3); ctx.rotate(0.55);
    ctx.fillStyle = '#558B2F'; ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(5, 0, 8, 3.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();

    // Đầu tròn — nhỏ vừa phải, dễ thương
    const hy = -12 + bob;
    const R  = 19;
    const hg = ctx.createRadialGradient(-R * 0.35, hy - R * 0.35, R * 0.06, 0, hy, R);
    hg.addColorStop(0,    '#C8E69A'); // highlight xanh sáng
    hg.addColorStop(0.32, '#8BC34A'); // xanh lá nhạt
    hg.addColorStop(0.72, '#4CAF50'); // xanh lá vừa
    hg.addColorStop(1,    '#1B5E20'); // viền tối
    ctx.fillStyle = hg; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, hy, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Nòng súng — hình chữ nhật bo góc, đơn giản và sạch
    const bx = Math.round(R * 0.55) + recoil;
    const bw = 16, bh = 10;
    const bg = ctx.createLinearGradient(bx, hy - bh / 2, bx, hy + bh / 2);
    bg.addColorStop(0,   '#76C442');
    bg.addColorStop(0.5, '#43A047');
    bg.addColorStop(1,   '#2E7D32');
    ctx.fillStyle = bg; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    rr(ctx, bx, hy - bh / 2, bw, bh, 4); ctx.fill(); ctx.stroke();
    // Highlight nhỏ trên nòng
    ctx.fillStyle = 'rgba(200,240,160,0.28)';
    rr(ctx, bx + 2, hy - bh / 2 + 1.5, bw - 6, 3.5, 2); ctx.fill();
    // Đầu nòng — cap tròn với lỗ tối
    ctx.fillStyle = '#33691E'; ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bx + bw, hy, bh / 2 + 1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0d2600';
    ctx.beginPath(); ctx.arc(bx + bw, hy, 3.5, 0, Math.PI * 2); ctx.fill();

    // Mắt trái — lớn hơn một chút
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-6, hy - 7, 6.5, 7.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-5.5, hy - 6.5, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white'; // điểm sáng
    ctx.beginPath(); ctx.arc(-4, hy - 9, 1.8, 0, Math.PI * 2); ctx.fill();

    // Mắt phải — nhỏ hơn
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(6, hy - 5, 5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(6.5, hy - 4.5, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(7.5, hy - 7, 1.4, 0, Math.PI * 2); ctx.fill();

    // Miệng cười nhỏ
    ctx.strokeStyle = '#1B5E20'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(1, hy + 8, 6, 0.4, Math.PI - 0.4); ctx.stroke();

    ctx.restore();
}
