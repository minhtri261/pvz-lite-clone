'use strict';
// ══════════════════════════════════════════════════════════════
//  level4.js — Màn 4: Mùa Cherry Bomb
//  - 5 hàng, mở khóa Cherry Bomb (nổ 3×3, instakill)
//  - Không có zombie mới — tập trung vào việc dùng Cherry Bomb
//  - Conehead chiếm đa số, cần quản lý ưu tiên mục tiêu
//  - 3 đợt (wave), wave cuối có 2 Flag Zombie dẫn đầu
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_4 = {
    id: 4,
    title:    'Level 4 Complete!',
    subtitle: 'Explosive victory! Snow Pea is next!',
    newPlant:  'Cherry Bomb',
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'cherrybomb'],
    startingSun: 150,
    waves: [
        {
            // Màn 4 vẫn có 2 wave
            // Wave 1 — dễ dàng, chủ yếu để người chơi làm quen với việc đặt cây trên 5 hàng
            scouts: [
                { type: 'basic',    row: null, delay: 0 },
                { type: 'basic',    row: null, delay: 10000 },
                { type: 'basic',    row: null, delay: 20000 },
                { type: 'basic',    row: null, delay: 30000 },
                { type: 'basic',    row: null, delay: 40000 },
                { type: 'basic',    row: null, delay: 50000 },
            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'basic',    row: null, delay: 1000 },
                { type: 'basic',    row: null, delay: 1500 },
                { type: 'basic',    row: null, delay: 2000 },
                { type: 'basic',    row: null, delay: 2500 },
            ],
        },
        {
            // Wave 2 — Conehead làm scout luôn
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 10000 },
                { type: 'conehead', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 50000 },
                { type: 'basic', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },
                { type: 'basic', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1500 },
                { type: 'basic',    row: null, delay: 2000 },
                { type: 'basic',    row: null, delay: 2500 },
                { type: 'basic',    row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic',    row: null, delay: 4000 },
                { type: 'basic',    row: null, delay: 4500 },
            ],
        },
    ],
};
