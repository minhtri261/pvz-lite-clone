'use strict';
// ══════════════════════════════════════════════════════════════
//  level6.js — Màn 6 (CUỐI): Đội Xô Thép + Snow Pea
//  - 5 hàng, đầy đủ 6 loại cây
//  - Mở khóa Sun Shooter.
//  - Nhiều Pole Vaulter và Conehead hơn.
//  - 3 đợt ngày càng dữ dội
//
//  Chiến thuật:
//    Snow Pea làm chậm Bucket → Peashooter có thêm 2× thời gian bắn
//    Potato Mine ở hàng đầu để đón Bucket đang bị Snow Pea làm chậm
//    Cherry Bomb xử lý nhóm Bucket trong surge
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_6 = {
    id: 6,
    title:    'Level 6 Complete!',
    subtitle: 'Good job! Repeater is next!',
    newPlant:  'Sun Shooter',
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine', 'sunshooter'],
    startingSun: 150,
    waves: [
        // Màn 6 sẽ lần đầu có 3 Wave
        // Wave 1 - Lần đầu xuất hiện ngày conhead.
        {
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 15000 },
                { type: 'basic', row: null, delay: 30000 },

                { type: 'basic', row: null, delay: 45000 },
                { type: 'basic', row: null, delay: 45500 },

                { type: 'conehead', row: null, delay: 60000 },

                { type: 'basic', row: null, delay: 75000 },
                { type: 'basic', row: null, delay: 75500 },
                { type: 'basic', row: null, delay: 76000 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
            ],
        },
        {
            // Wave 2 — nhiều zombie hơn
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },

                { type: 'polevaulting', row: null, delay: 10000 },

                { type: 'polevaulting', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },

                { type: 'polevaulting', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'polevaulting', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
            ],
        },
        {
            // Wave 3 — nhiều conehead và polevaulting hơn.
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },

                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10500 },

                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20500 },
                { type: 'basic', row: null, delay: 21000 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },
                { type: 'conehead', row: null, delay: 32000 },

                { type: 'polevaulting', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },
                { type: 'basic', row: null, delay: 41500 },
                { type: 'basic', row: null, delay: 42000 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60500 },
                { type: 'basic', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61500 },

            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'basic',     row: null, delay: 1000 },
                { type: 'polevaulting',   row: null, delay: 1500 },
                { type: 'conehead',   row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2500 },
                { type: 'conehead',   row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic',     row: null, delay: 4000 },
                { type: 'basic',     row: null, delay: 4500 },
                { type: 'polevaulting',     row: null, delay: 5000 },
                { type: 'basic',     row: null, delay: 5500 },
                { type: 'basic',     row: null, delay: 6000 },
                { type: 'conehead',     row: null, delay: 6500 },
            ],
        },
    ],
};
