'use strict';
// Potato Mine — redesigned
//
//  Chưa kích hoạt (armed=false):
//    Chỉ vẽ ngòi nổ nhô lên từ mặt đất, nhấp nháy TRẮNG/ĐỎ xen kẽ
//    (mine đang nằm ẩn dưới đất)
//
//  Đã kích hoạt (armed=true):
//    Hình BÁN NGUYỆT (dome) nổi lên, đáy bằng
//    Hai chấm đen nhìn sang PHẢI
//    Miệng mỉm cười nhỏ

function drawPotatoMine(ctx, x, y, animTime, armed, exploding, explodeT) {
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
        // ── CHƯA KÍCH HOẠT: chỉ ngòi nổ nhô từ đất ──────────────

        // Bóng mờ nhỏ
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath(); ctx.ellipse(2, 28, 14, 4, 0, 0, Math.PI * 2); ctx.fill();

        // Ụ đất nhỏ (mine đang nằm ẩn bên dưới)
        ctx.fillStyle = '#6B4818';
        ctx.beginPath(); ctx.ellipse(0, 24, 13, 5, 0, 0, Math.PI * 2); ctx.fill();

        // Ngòi nổ (dây dẫn hơi cong tự nhiên)
        ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 2.8; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 20);
        ctx.quadraticCurveTo(5, 12, 3, 3);
        ctx.stroke();

        // Tia nhấp nháy TRẮNG/ĐỎ xen kẽ nhanh
        const blink = Math.sin(animTime * 7);
        // Hào quang ngoài mờ
        ctx.fillStyle = blink > 0 ? 'rgba(255,240,210,0.38)' : 'rgba(255,40,0,0.32)';
        ctx.beginPath(); ctx.arc(3, 3, 9, 0, Math.PI * 2); ctx.fill();
        // Vòng trung
        ctx.fillStyle = blink > 0 ? 'rgba(255,200,150,0.55)' : 'rgba(255,80,0,0.5)';
        ctx.beginPath(); ctx.arc(3, 3, 5.5, 0, Math.PI * 2); ctx.fill();
        // Chấm trung tâm sáng nhất
        ctx.fillStyle = blink > 0 ? '#FFFFFF' : '#FF2200';
        ctx.beginPath(); ctx.arc(3, 3, 3.5, 0, Math.PI * 2); ctx.fill();
        // Điểm trắng nhỏ ở tâm khi đỏ
        if (blink <= 0) {
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.beginPath(); ctx.arc(3, 3, 1.2, 0, Math.PI * 2); ctx.fill();
        }

    } else {
        // ── ĐÃ KÍCH HOẠT: hình bán nguyệt nổi lên ───────────────

        const bob   = Math.sin(animTime * 4.5) * 2;
        const bodyY = 20 + bob; // y tâm đáy bán nguyệt
        const bodyR = 17;       // bán kính

        // Bóng dưới đất
        ctx.fillStyle = 'rgba(0,0,0,0.22)';
        ctx.beginPath(); ctx.ellipse(1, 27, 20, 6, 0, 0, Math.PI * 2); ctx.fill();

        // Ụ đất (phần đất xung quanh mine)
        ctx.fillStyle = '#6B4818';
        ctx.beginPath(); ctx.ellipse(0, 22, 18, 7, 0, 0, Math.PI * 2); ctx.fill();

        // ── Thân HÌNH BÁN NGUYỆT ─────────────────────────────────
        // arc(Math.PI → 0) = nửa trên của hình tròn (dome)
        // closePath → đường thẳng đáy bằng
        const bg = ctx.createRadialGradient(-bodyR * 0.3, bodyY - bodyR * 0.55, bodyR * 0.06,
                                             0, bodyY, bodyR + 3);
        bg.addColorStop(0,    '#F0D880'); // vàng sáng highlight
        bg.addColorStop(0.42, '#C89018'); // nâu vàng chính
        bg.addColorStop(0.82, '#7a5010'); // nâu tối
        bg.addColorStop(1,    '#4a2c06'); // viền
        ctx.fillStyle = bg; ctx.strokeStyle = '#3E2200'; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, bodyY, bodyR, Math.PI, 0, false); // bán nguyệt trên
        ctx.closePath();  // đóng bằng đường thẳng ngang ở đáy
        ctx.fill(); ctx.stroke();

        // ── Hai chấm đen — nhìn sang PHẢI ───────────────────────
        // Cả hai chấm lệch phải để "nhìn sang phải":
        //   Mắt trái: từ vị trí -6 lệch phải → -3
        //   Mắt phải: từ vị trí +6 lệch phải → +8
        ctx.fillStyle = '#6B4818';
        ctx.beginPath(); ctx.arc(-3, bodyY - 9, 3.0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc( 8, bodyY - 9, 3.0, 0, Math.PI * 2); ctx.fill();
        // Điểm bắt sáng rất nhỏ
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath(); ctx.arc(-2, bodyY - 11, 1.1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc( 9, bodyY - 11, 1.1, 0, Math.PI * 2); ctx.fill();

        // ── Miệng mỉm cười ───────────────────────────────────────
        // Đường cong lên (control point phía trên endpoints) = nụ cười
        ctx.strokeStyle = '#3E2200'; ctx.lineWidth = 2; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-6, bodyY - 2);
        ctx.quadraticCurveTo(0, bodyY - 8, 6, bodyY - 2); // control above = smile ✓
        ctx.stroke();
        // gốc ngòi nằm trên đỉnh dome
        const fuseBaseX = 2;
        const fuseBaseY = bodyY - bodyR + 4;

        // dây ngòi cong
        ctx.strokeStyle = '#5D4037';
        ctx.lineWidth = 2.8;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(fuseBaseX, fuseBaseY);
        ctx.quadraticCurveTo(
            fuseBaseX + 5,
            fuseBaseY - 8,
            fuseBaseX + 3,
            fuseBaseY - 17
        );
        ctx.stroke();

        // tia nhấp nháy trắng/đỏ
        const fuseBlink = Math.sin(animTime * 7);

        // hào quang ngoài
        ctx.fillStyle =
            fuseBlink > 0
            ? 'rgba(255,240,210,0.38)'
            : 'rgba(255,40,0,0.32)';

        ctx.beginPath();
        ctx.arc(fuseBaseX + 3, fuseBaseY - 17, 9, 0, Math.PI * 2);
        ctx.fill();

        // vòng trung
        ctx.fillStyle =
            fuseBlink > 0
            ? 'rgba(255,200,150,0.55)'
            : 'rgba(255,80,0,0.5)';

        ctx.beginPath();
        ctx.arc(fuseBaseX + 3, fuseBaseY - 17, 5.5, 0, Math.PI * 2);
        ctx.fill();

        // lõi sáng
        ctx.fillStyle =
            fuseBlink > 0
            ? '#FFFFFF'
            : '#FF2200';

        ctx.beginPath();
        ctx.arc(fuseBaseX + 3, fuseBaseY - 17, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // điểm trắng nhỏ
        if (fuseBlink <= 0) {
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.beginPath();
            ctx.arc(fuseBaseX + 3, fuseBaseY - 17, 1.2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}
