'use strict';
// ══════════════════════════════════════════════════════════════
//  level9.js — Màn 9: Peanut Gallery
//  - Mở khóa Twin Sunflower (125☀, 2 sun/25s) + Peanut (150☀, Wall-nut bắn)
//  - Zombies: basic, flag, conehead, bucket, polevaulting
//  - 4 đợt ngày càng khó
//
//  Chiến thuật:
//    Twin Sunflower giúp ổn định kinh tế nhanh hơn.
//    Peanut ở hàng đầu vừa chặn vừa bắn — ít cần Wall-nut riêng.
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_9 = {
    id: 9,
    isNight:   true,
    title:    'Level 9 Complete!',
    subtitle: 'Almost there — the final level awaits!',
    newPlant:  null,
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine', 'puffshroom'],
    startingSun: 150,
    waves: [
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

                { type: 'conehead', row: null, delay: 90000 },
                { type: 'basic', row: null, delay: 90500 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3500 },
            ],
        },
        {
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },

                { type: 'polevaulting', row: null, delay: 10000 },

                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20500 },

                { type: 'conehead', row: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },
                { type: 'basic', row: null, delay: 32000 },

                { type: 'polevaulting', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },
                { type: 'basic', row: null, delay: 41500 },
                { type: 'basic', row: null, delay: 42000 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },
                { type: 'basic', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61500 },
                
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
                { type: 'conehead', row: null, delay: 5000 },
                { type: 'conehead', row: null, delay: 5500 },
            ],
        },
        {
           scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },

                { type: 'brickhead', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10500 },

                { type: 'brickhead', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20500 },
                { type: 'basic', row: null, delay: 21000 },
                { type: 'basic', row: null, delay: 21500 },

                { type: 'brickhead', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'conehead', row: null, delay: 31000 },

                { type: 'brickhead', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'conehead', row: null, delay: 41000 },
                { type: 'basic', row: null, delay: 41500 },
                { type: 'conehead', row: null, delay: 42000 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60500 },
                { type: 'polevaulting', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61500 },
                { type: 'basic', row: null, delay: 62000 },
                { type: 'polevaulting', row: null, delay: 62500 },

            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'basic',     row: null, delay: 1000 },
                { type: 'brickhead',   row: null, delay: 1500 },
                { type: 'conehead',   row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2500 },
                { type: 'conehead',   row: null, delay: 3000 },
                { type: 'polevaulting', row: null, delay: 3500 },
                { type: 'basic',     row: null, delay: 4000 },
                { type: 'basic',     row: null, delay: 4500 },
                { type: 'brickhead',     row: null, delay: 5000 },
                { type: 'polevaulting',     row: null, delay: 5500 },
                { type: 'basic',     row: null, delay: 6000 },
                { type: 'conehead',     row: null, delay: 6500 },
                { type: 'basic',     row: null, delay: 7000 },
                { type: 'basic',     row: null, delay: 7500 },
                { type: 'basic',     row: null, delay: 8000 },
                { type: 'conehead',     row: null, delay: 8500 },
                { type: 'conehead',     row: null, delay: 9000 },
                { type: 'conehead',     row: null, delay: 9500 },
                { type: 'basic',     row: null, delay: 10000 },
            ],
        },
    ],
};
