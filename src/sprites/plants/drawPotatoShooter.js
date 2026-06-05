'use strict';
// Potato Shooter: PeaShooter + PotatoMine fusion
// PotatoMine body có thêm nòng súng nâu bên phải — bắn đạn + nổ khi dẫm
// shootT: giật nòng khi bắn
function drawPotatoShooter(ctx, x, y, animTime, armed, exploding, explodeT, shootT) {
    const recoil = Math.sin(shootT * Math.PI) * -7;
    const bob    = armed ? Math.sin(animTime * 4.5) * 2 : 0;
    // Vị trí thân khoai (giống drawPotatoMine)
    const bodyY  = armed ? 8 + bob : 16;
    const bodyR  = armed ? 17 : 12;

    // ── Nòng súng nâu (vẽ trước để body khoai che phần gốc) ─────
    if (!exploding) {
        const bx = bodyR - 3 + recoil; // bắt đầu từ cạnh phải thân khoai
        ctx.save(); ctx.translate(Math.round(x), Math.round(y));

        const barG = ctx.createLinearGradient(bx, bodyY - 5, bx, bodyY + 5);
        barG.addColorStop(0, '#C8A050'); barG.addColorStop(0.5, '#8B5E20'); barG.addColorStop(1, '#5C3010');
        ctx.fillStyle = barG; ctx.strokeStyle = '#3E1A00'; ctx.lineWidth = 1.5;
        rr(ctx, bx, bodyY - 5, 22, 10, 3); ctx.fill(); ctx.stroke();

        // Highlight nòng
        ctx.fillStyle = 'rgba(220,180,100,0.22)';
        rr(ctx, bx + 2, bodyY - 4, 18, 4, 2); ctx.fill();

        // Cap nòng
        ctx.fillStyle = '#7a4010'; ctx.strokeStyle = '#3E1A00'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(bx + 22, bodyY, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#1a0800';
        ctx.beginPath(); ctx.arc(bx + 22, bodyY, 3, 0, Math.PI * 2); ctx.fill();

        ctx.restore();
    }

    // ── Thân khoai (đè lên gốc nòng) ────────────────────────────
    drawPotatoMine(ctx, x, y, animTime, armed, exploding, explodeT);
}
