'use strict';
// ══════════════════════════════════════════════════════════════
//  level8.js — Màn 8 (CUỐI): Final Assault
//  - Đầy đủ 7 cây, mọi loại zombie
//  - 5 đợt — dữ dội nhất trong toàn bộ game
//  - Pole Vaulter + Bucket là combo nguy hiểm nhất:
//    Vaulter nhảy qua hàng đầu, Bucket chịu đòn ở hàng sau
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_8 = {
    id: 8,
    title:    'PvZ Custom — Cleared!',
    subtitle: 'You defended the garden across all 8 levels! Legend!',
    newPlant:  'Chomper',
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine', 'sunshooter', 'repeater', 'chomper'],
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
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
            ],
        },
        {
            scouts: [
                { type: 'polevaulting', row: null, delay: 0 },
                { type: 'bucket',       row: null, delay: 8000 },
                { type: 'polevaulting', row: null, delay: 14000 },
                { type: 'conehead',     row: null, delay: 19000 },
                { type: 'bucket',       row: null, delay: 23000 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'bucket',       row: null, delay: 700 },
                { type: 'polevaulting', row: null, delay: 1400 },
                { type: 'conehead',     row: null, delay: 2100 },
                { type: 'bucket',       row: null, delay: 2800 },
                { type: 'polevaulting', row: null, delay: 3500 },
                { type: 'conehead',     row: null, delay: 4200 },
            ],
        },
        {
            scouts: [
                { type: 'bucket',       row: null, delay: 0 },
                { type: 'polevaulting', row: null, delay: 6000 },
                { type: 'bucket',       row: null, delay: 11000 },
                { type: 'polevaulting', row: null, delay: 15000 },
                { type: 'conehead',     row: null, delay: 19000 },
                { type: 'bucket',       row: null, delay: 22000 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'conehead',     row: null, delay: 700 },
                { type: 'polevaulting', row: null, delay: 1200 },
                { type: 'bucket',       row: null, delay: 1800 },
                { type: 'polevaulting', row: null, delay: 2400 },
                { type: 'conehead',     row: null, delay: 3000 },
                { type: 'bucket',       row: null, delay: 3600 },
                { type: 'polevaulting', row: null, delay: 4200 },
            ],
        },
    ],
};
