'use strict';
// ══════════════════════════════════════════════════════════════
//  cardThumbnails.js — Vẽ hình thu nhỏ (thumbnail) lên thẻ cây
//
//  Mỗi thẻ card có một canvas 58×58px.
//  Phần dưới cùng 13px vẽ giá ánh nắng (sun cost) theo kiểu PvZ gốc.
// ══════════════════════════════════════════════════════════════

function drawCardThumbnails() {
    const arts = [
        ['art-sunflower',  c => { c.save(); c.translate(29, 36); c.scale(0.62, 0.62); drawSunflower(c, 0, 0, 0.4, false); c.restore(); }],
        ['art-peashooter', c => { c.save(); c.translate(20, 36); c.scale(0.56, 0.56); drawPeashooter(c, 0, 0, 0.5, 0); c.restore(); }],
        ['art-wallnut',    c => { c.save(); c.translate(29, 30); c.scale(0.7, 0.7);   drawWallNut(c, 0, 0, 0, 1); c.restore(); }],
        ['art-cherrybomb', c => { c.save(); c.translate(29, 34); c.scale(0.6, 0.6);   drawCherryBomb(c, 0, 0, 0.3, 0, false, 0); c.restore(); }],
        ['art-potatomine', c => { c.save(); c.translate(29, 36); c.scale(0.75, 0.75); drawPotatoMine(c, 0, 0, 0, true, false, 0); c.restore(); }],
        ['art-chomper',    c => { c.save(); c.translate(29, 36); c.scale(0.72, 0.72); drawChomper(c, 0, 0, 0.5, false, 0, false); c.restore(); }],
        ['art-repeater',   c => { c.save(); c.translate(18, 36); c.scale(0.55, 0.55); drawRepeater(c, 0, 0, 0.5, 0, 0); c.restore(); }],
        ['art-sunshooter', c => { c.save(); c.translate(29, 36); c.scale(0.58, 0.58); drawSunShooter(c, 0, 0, 0.5, 0, false); c.restore(); }],
        ['art-twinsun',    c => { c.save(); c.translate(29, 38); c.scale(0.62, 0.62); drawTwinSun(c, 0, 0, 0.5, false); c.restore(); }],
        ['art-peanut',     c => { c.save(); c.translate(20, 32); c.scale(0.65, 0.65); drawPeanut(c, 0, 0, 0.5, 1, 0); c.restore(); }],
        ['art-puffshroom', c => { c.save(); c.translate(22, 38); c.scale(0.65, 0.65); drawPuffShroom(c, 0, 0, 0.5, 0); c.restore(); }],
        ['art-snowpea',    c => { c.save(); c.translate(20, 36); c.scale(0.56, 0.56); drawSnowPea(c, 0, 0, 0.5, 0); c.restore(); }],
    ];

    for (const [id, fn] of arts) {
        const el = document.getElementById(id);
        if (!el) continue;
        const c = el.getContext('2d');
        c.clearRect(0, 0, 58, 58);

        // Màu nền theo từng loại cây
        c.fillStyle = id === 'art-cherrybomb' ? '#4a1010'
                    : id === 'art-snowpea'    ? '#0a2a3a'
                    : id === 'art-potatomine' ? '#3a2808'
                    : id === 'art-chomper'    ? '#2a0a3a'
                    : id === 'art-repeater'  ? '#1a4a0a'
                    : id === 'art-sunshooter'? '#3a2a00'
                    : id === 'art-twinsun'   ? '#3a3000'
                    : id === 'art-peanut'    ? '#4a2a00'
                    : id === 'art-puffshroom'? '#2a0a3a'
                    :                           '#2a6a14';
        rr(c, 0, 0, 58, 58, 5); c.fill();

        fn(c); // vẽ sprite

        // ── Dải giá ánh nắng ở đáy card (giống PvZ gốc) ────────
        const plantType = id.replace('art-', '');
        const cost = PLANT_DEFS[plantType]?.cost;
        if (cost !== undefined) {
            // Nền tối mờ
            c.fillStyle = 'rgba(0,0,0,0.60)';
            c.fillRect(0, 45, 58, 13);

            // Mặt trời nhỏ vàng
            const sg = c.createRadialGradient(11, 51.5, 0.5, 11, 51.5, 5);
            sg.addColorStop(0, '#FFFDE7'); sg.addColorStop(0.45, '#FFD700'); sg.addColorStop(1, '#FFA000');
            c.fillStyle = sg;
            c.beginPath(); c.arc(11, 51.5, 5, 0, Math.PI * 2); c.fill();
            c.strokeStyle = '#B8860B'; c.lineWidth = 1; c.stroke();

            // Số tiền
            c.fillStyle = '#FFE040';
            c.font = 'bold 11px Arial';
            c.textAlign = 'left';
            c.fillText(cost, 20, 56);
            c.textAlign = 'left'; // reset
        }
    }

    // Thumbnail xẻng — không có cost
    const shovelEl = document.getElementById('art-shovel');
    if (shovelEl) {
        const c = shovelEl.getContext('2d');
        c.clearRect(0, 0, 58, 58);
        c.fillStyle = '#3a2a0e';
        rr(c, 0, 0, 58, 58, 5); c.fill();
        c.save(); c.translate(32, 34); c.scale(0.95, 0.95);
        drawShovel(c, 0, 0);
        c.restore();
    }
}
