'use strict';
function drawTwinSun(ctx, x, y, animTime, producing) {
    const bob  = Math.sin(animTime * 2.6) * 2;
    const sway = Math.sin(animTime * 1.3) * 3;
    const sc   = producing ? 1 + Math.sin(animTime * 8) * 0.07 : 1;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    // Bóng rộng hơn (hai đầu)
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(sway * 0.3, 30, 22, 6, 0, 0, Math.PI * 2); ctx.fill();

    // Thân chính
    ctx.strokeStyle = '#388E3C'; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 28); ctx.quadraticCurveTo(sway * 0.5, 12, sway, 2 + bob); ctx.stroke();
    // Hai nhánh rẽ trái phải
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(sway, 2 + bob); ctx.lineTo(sway - 14, -9 + bob); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sway, 2 + bob); ctx.lineTo(sway + 14, -9 + bob); ctx.stroke();

    // Helper vẽ một đầu hoa nhỏ tại (hx, hy) với offset animation aOff
    function head(hx, hy, aOff) {
        ctx.save(); ctx.translate(hx, hy); ctx.scale(sc, sc);
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2 + (animTime + aOff) * 0.25;
            ctx.save(); ctx.rotate(a);
            const pg = ctx.createLinearGradient(0, -19, 0, -12);
            pg.addColorStop(0, '#FFF176'); pg.addColorStop(1, '#FDD835');
            ctx.fillStyle = pg; ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.ellipse(0, -15, 5, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.restore();
        }
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2 + Math.PI / 8 + (animTime + aOff) * 0.25;
            ctx.save(); ctx.rotate(a);
            ctx.fillStyle = '#FFCA28'; ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.ellipse(0, -11, 3.5, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.restore();
        }
        // Đĩa trung tâm
        const cg = ctx.createRadialGradient(-3, -4, 1, 0, 0, 10);
        cg.addColorStop(0, '#A1887F'); cg.addColorStop(0.6, '#6D4C41'); cg.addColorStop(1, '#3E2723');
        ctx.fillStyle = cg; ctx.strokeStyle = '#3E2723'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(62,39,35,0.55)';
        for (let i = 0; i < 6; i++) { const a = (i/6)*Math.PI*2; ctx.beginPath(); ctx.arc(Math.cos(a)*5.5,Math.sin(a)*5.5,1.4,0,Math.PI*2); ctx.fill(); }
        // Mắt nhỏ
        ctx.fillStyle = 'white';
        ctx.beginPath(); ctx.ellipse(-3.5, -2, 2.8, 3.8, 0.1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(3.5, -2, 2.8, 3.8, -0.1, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#1A237E';
        ctx.beginPath(); ctx.arc(-3, -1.5, 1.6, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(4, -1.5, 1.6, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }

    head(sway - 14, -15 + bob, 0);
    head(sway + 14, -15 + bob, 0.4); // lệch phase để hai đầu quay không đồng pha

    ctx.restore();
}
