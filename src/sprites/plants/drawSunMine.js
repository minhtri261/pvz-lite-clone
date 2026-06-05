'use strict';
// Sun Mine: SunFlower + PotatoMine fusion
// Giống hệt PotatoMine, chỉ đổi màu dome sang VÀNG chủ đạo
// producePulse: > 0 khi vừa tạo sun → glow vàng nhẹ
function drawSunMine(ctx, x, y, animTime, armed, exploding, explodeT, producePulse) {
    if (exploding) {
        ctx.save(); ctx.translate(Math.round(x), Math.round(y) - 5);
        ctx.globalAlpha = Math.max(0, 1 - explodeT * 1.6);
        ctx.strokeStyle = '#FFF9C4'; ctx.lineWidth = 6 * (1 - explodeT);
        ctx.beginPath(); ctx.arc(0, 0, explodeT * 80, 0, Math.PI * 2); ctx.stroke();
        const fg = ctx.createRadialGradient(0, 0, 0, 0, 0, explodeT * 60);
        fg.addColorStop(0, 'rgba(255,240,160,0.95)');
        fg.addColorStop(0.3, 'rgba(255,100,0,0.8)');
        fg.addColorStop(1, 'rgba(180,0,0,0)');
        ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(0, 0, explodeT * 60, 0, Math.PI * 2); ctx.fill();
        ctx.restore(); return;
    }

    ctx.save(); ctx.translate(Math.round(x), Math.round(y));

    if (!armed) {
        // ── CHƯA KÍCH HOẠT: ngòi nổ nhô từ đất (giống PotatoMine) ──

        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath(); ctx.ellipse(2, 28, 14, 4, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#6B4818';
        ctx.beginPath(); ctx.ellipse(0, 24, 13, 5, 0, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 2.8; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 20);
        ctx.quadraticCurveTo(5, 12, 3, 3);
        ctx.stroke();

        const blink = Math.sin(animTime * 7);
        ctx.fillStyle = blink > 0 ? 'rgba(255,240,210,0.38)' : 'rgba(255,40,0,0.32)';
        ctx.beginPath(); ctx.arc(3, 3, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = blink > 0 ? 'rgba(255,200,150,0.55)' : 'rgba(255,80,0,0.5)';
        ctx.beginPath(); ctx.arc(3, 3, 5.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = blink > 0 ? '#FFFFFF' : '#FF2200';
        ctx.beginPath(); ctx.arc(3, 3, 3.5, 0, Math.PI * 2); ctx.fill();
        if (blink <= 0) {
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.beginPath(); ctx.arc(3, 3, 1.2, 0, Math.PI * 2); ctx.fill();
        }

    } else {
        // ── ĐÃ KÍCH HOẠT: hình bán nguyệt VÀNG ──────────────────

        const bob   = Math.sin(animTime * 4.5) * 2;
        const bodyY = 20 + bob;
        const bodyR = 17;

        // Glow vàng khi đang sản xuất sun
        if (producePulse > 0) {
            const g = ctx.createRadialGradient(0, bodyY, 0, 0, bodyY, bodyR + 14);
            g.addColorStop(0, `rgba(255,215,0,${0.5 * producePulse})`);
            g.addColorStop(1, 'rgba(255,215,0,0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(0, bodyY, bodyR + 14, Math.PI, 0, false); ctx.closePath(); ctx.fill();
        }

        ctx.fillStyle = 'rgba(0,0,0,0.22)';
        ctx.beginPath(); ctx.ellipse(1, 27, 20, 6, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#6B4818';
        ctx.beginPath(); ctx.ellipse(0, 22, 18, 7, 0, 0, Math.PI * 2); ctx.fill();

        // ── Dome MÀU VÀNG (thay cho nâu-vàng của PotatoMine) ─────
        const bg = ctx.createRadialGradient(-bodyR * 0.3, bodyY - bodyR * 0.55, bodyR * 0.06,
                                             0, bodyY, bodyR + 3);
        bg.addColorStop(0,    '#FFF9C4'); // vàng rất sáng (highlight)
        bg.addColorStop(0.42, '#FFD600'); // vàng chính
        bg.addColorStop(0.82, '#F9A825'); // cam-vàng đậm
        bg.addColorStop(1,    '#E65100'); // viền cam tối
        ctx.fillStyle = bg; ctx.strokeStyle = '#BF360C'; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, bodyY, bodyR, Math.PI, 0, false);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        // ── Hai chấm nhìn sang PHẢI (giống PotatoMine) ───────────
        ctx.fillStyle = '#6B4818';
        ctx.beginPath(); ctx.arc(-3, bodyY - 9, 3.0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc( 8, bodyY - 9, 3.0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath(); ctx.arc(-2, bodyY - 11, 1.1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc( 9, bodyY - 11, 1.1, 0, Math.PI * 2); ctx.fill();

        // ── Miệng mỉm cười (giống PotatoMine) ───────────────────
        ctx.strokeStyle = '#BF360C'; ctx.lineWidth = 2; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-6, bodyY - 2);
        ctx.quadraticCurveTo(0, bodyY - 8, 6, bodyY - 2);
        ctx.stroke();

        // ── Ngòi nổ + tia nhấp nháy (giống PotatoMine) ───────────
        const fuseBaseX = 2;
        const fuseBaseY = bodyY - bodyR + 4;

        ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 2.8; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(fuseBaseX, fuseBaseY);
        ctx.quadraticCurveTo(fuseBaseX + 5, fuseBaseY - 8, fuseBaseX + 3, fuseBaseY - 17);
        ctx.stroke();

        const fuseBlink = Math.sin(animTime * 7);
        ctx.fillStyle = fuseBlink > 0 ? 'rgba(255,240,210,0.38)' : 'rgba(255,40,0,0.32)';
        ctx.beginPath(); ctx.arc(fuseBaseX + 3, fuseBaseY - 17, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = fuseBlink > 0 ? 'rgba(255,200,150,0.55)' : 'rgba(255,80,0,0.5)';
        ctx.beginPath(); ctx.arc(fuseBaseX + 3, fuseBaseY - 17, 5.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = fuseBlink > 0 ? '#FFFFFF' : '#FF2200';
        ctx.beginPath(); ctx.arc(fuseBaseX + 3, fuseBaseY - 17, 3.5, 0, Math.PI * 2); ctx.fill();
        if (fuseBlink <= 0) {
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.beginPath(); ctx.arc(fuseBaseX + 3, fuseBaseY - 17, 1.2, 0, Math.PI * 2); ctx.fill();
        }
    }

    ctx.restore();
}
