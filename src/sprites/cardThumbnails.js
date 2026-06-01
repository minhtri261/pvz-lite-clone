'use strict';
// ══════════════════════════════════════════════════════════════
//  cardThumbnails.js — Vẽ hình thu nhỏ (thumbnail) lên thẻ cây
//
//  Mỗi thẻ card trong thanh HUD có một canvas nhỏ 58×58px.
//  Hàm này vẽ sprite cây/xẻng thu nhỏ vào canvas đó khi khởi động.
//  Gọi một lần duy nhất sau khi tất cả hàm draw đã được load.
// ══════════════════════════════════════════════════════════════

function drawCardThumbnails() {
    // Danh sách [id canvas, hàm vẽ thu nhỏ]
    const arts = [
        // Dịch tâm về (29, 38) rồi thu nhỏ 62% để vừa canvas 58×58
        ['art-sunflower',  c => { c.save(); c.translate(29, 38); c.scale(0.62, 0.62); drawSunflower(c, 0, 0, 0.4, false); c.restore(); }],
        ['art-peashooter', c => { c.save(); c.translate(20, 38); c.scale(0.56, 0.56); drawPeashooter(c, 0, 0, 0.5, 0); c.restore(); }],
        ['art-wallnut',    c => { c.save(); c.translate(29, 32); c.scale(0.7, 0.7);   drawWallNut(c, 0, 0, 0, 1); c.restore(); }],
        ['art-cherrybomb', c => { c.save(); c.translate(29, 36); c.scale(0.6, 0.6);   drawCherryBomb(c, 0, 0, 0.3, 0, false, 0); c.restore(); }],
        ['art-potatomine', c => { c.save(); c.translate(29, 38); c.scale(0.75, 0.75); drawPotatoMine(c, 0, 0, 0, true, false, 0); c.restore(); }],
        ['art-snowpea',    c => { c.save(); c.translate(20, 38); c.scale(0.56, 0.56); drawSnowPea(c, 0, 0, 0.5, 0); c.restore(); }],
    ];

    for (const [id, fn] of arts) {
        const el = document.getElementById(id);
        if (!el) continue;
        const c  = el.getContext('2d');
        c.clearRect(0, 0, 58, 58);
        // Màu nền riêng cho từng thẻ để phân biệt trực quan
        c.fillStyle = id === 'art-cherrybomb' ? '#4a1010'   // đỏ tối
                    : id === 'art-snowpea'    ? '#0a2a3a'   // xanh băng tối
                    : id === 'art-potatomine' ? '#3a2808'   // nâu đất tối
                    :                           '#2a6a14';  // xanh lá tối
        rr(c, 0, 0, 58, 58, 5); c.fill();
        fn(c);
    }

    // Thumbnail xẻng — nền nâu đất
    const shovelEl = document.getElementById('art-shovel');
    if (shovelEl) {
        const c = shovelEl.getContext('2d');
        c.clearRect(0, 0, 58, 58);
        c.fillStyle = '#3a2a0e'; // nâu đất tối
        rr(c, 0, 0, 58, 58, 5); c.fill();
        c.save(); c.translate(32, 36); c.scale(0.95, 0.95);
        drawShovel(c, 0, 0);
        c.restore();
    }
}
