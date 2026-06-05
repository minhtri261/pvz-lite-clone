'use strict';
// Newspaper Zombie — đọc báo khi đi, khi mất báo thì chạy nhanh gấp đôi
// hasPaper: true = còn báo | false = mất báo (zombie điên loạn)
function drawNewspaperZombie(ctx, x, y, animTime, state, hpPct, hasPaper, deathT) {
    // Body base
    drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT);

    // Khi mất báo: vẽ vệt tốc độ để thấy zombie đang chạy rất nhanh
    if (!hasPaper) {
        if (state === 'walking') {
            ctx.save(); ctx.translate(Math.round(x), Math.round(y));
            if (state === 'dying') { ctx.rotate(-deathT * 1.5); ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4); }
            ctx.strokeStyle = 'rgba(255,80,40,0.45)'; ctx.lineWidth = 2;
            for (let i = 1; i <= 3; i++) {
                ctx.beginPath(); ctx.moveTo(-20 * i, -18); ctx.lineTo(-20 * i, 4); ctx.stroke();
            }
            ctx.restore();
        }
        return;
    }

    if (state === 'dying' && deathT > 0.6) return;

    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    if (state === 'dying') { ctx.rotate(-deathT * 1.5); ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4); }

    const walk   = state === 'walking' ? Math.sin(animTime * 5.5) : 0;
    const eatBob = state === 'eating'  ? Math.abs(Math.sin(animTime * 7)) * 10 : 0;

    // Tờ báo — đặt trên cánh tay phải (bent arm area)
    ctx.save();
    ctx.translate(12, 2 + eatBob * 0.4);
    ctx.rotate(0.4 + Math.sin(animTime * 2.8 + 1) * 0.05);

    // Trang báo (newsprint)
    ctx.fillStyle = '#F0ECD0';
    ctx.strokeStyle = '#999'; ctx.lineWidth = 1;
    rr(ctx, 2, -16, 24, 20, 2); ctx.fill(); ctx.stroke();

    // Nếp gấp giữa
    ctx.beginPath(); ctx.moveTo(14, -16); ctx.lineTo(14, 4);
    ctx.strokeStyle = 'rgba(100,90,60,0.5)'; ctx.stroke();

    // Dòng chữ in
    ctx.strokeStyle = 'rgba(40,30,15,0.35)'; ctx.lineWidth = 0.8;
    for (let ly = -13; ly < 3; ly += 2.8) {
        ctx.beginPath(); ctx.moveTo(3, ly); ctx.lineTo(13, ly); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(15, ly); ctx.lineTo(25, ly); ctx.stroke();
    }

    // Tiêu đề báo
    ctx.fillStyle = 'rgba(20,15,5,0.7)'; ctx.font = 'bold 4px Arial'; ctx.textAlign = 'left';
    ctx.fillText('DAILY', 3, -9); ctx.fillText('DEAD', 3, -5); ctx.textAlign = 'left';

    ctx.restore();
    ctx.restore();
}
