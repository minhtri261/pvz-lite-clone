'use strict';
// ══════════════════════════════════════════════════════════════
//  level8.js — Màn 8 (CUỐI): Final Assault
//  - 8 cây, nhiều loại zombie
//  - 3 đợt — dữ dội nhất trong toàn bộ game
//  - Pole Vaulter + Bucket là combo nguy hiểm nhất:
//    Vaulter nhảy qua hàng đầu, Bucket chịu đòn ở hàng sau
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_8 = {
    id: 8,
    title:    'PvZ Custom — Cleared!',
    subtitle: 'You defended the garden across all 8 levels! Legend!',
    newPlant:  'Repeater',
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine', 'sunshooter', 'repeater', 'peanut'],
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
                { type: 'basic', row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },

                { type: 'bucket', row: null, delay: 10000 },

                { type: 'bucket', row: null, delay: 20000 },

                { type: 'conehead', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },
                { type: 'basic', row: null, delay: 32000 },

                { type: 'bucket', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'bucket', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
            ],
        },
        {
           scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },

                { type: 'bucket', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10500 },
                { type: 'basic', row: null, delay: 11000 },
                { type: 'basic', row: null, delay: 11500 },

                { type: 'bucket', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20500 },
                { type: 'basic', row: null, delay: 21000 },
                { type: 'basic', row: null, delay: 21500 },
                { type: 'basic', row: null, delay: 22000 },
                { type: 'basic', row: null, delay: 22500 },

                { type: 'conehead', row: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 30500 },
                { type: 'conehead', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },
                { type: 'conehead', row: null, delay: 32000 },

                { type: 'bucket', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'conehead', row: null, delay: 41000 },
                { type: 'basic', row: null, delay: 41500 },
                { type: 'conehead', row: null, delay: 42000 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60500 },
                { type: 'basic', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61500 },
                { type: 'basic', row: null, delay: 62000 },
                { type: 'basic', row: null, delay: 62500 },

            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'basic',     row: null, delay: 1000 },
                { type: 'bucket',   row: null, delay: 1500 },
                { type: 'conehead',   row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2500 },
                { type: 'conehead',   row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic',     row: null, delay: 4000 },
                { type: 'basic',     row: null, delay: 4500 },
                { type: 'bucket',     row: null, delay: 5000 },
                { type: 'basic',     row: null, delay: 5500 },
                { type: 'basic',     row: null, delay: 6000 },
                { type: 'conehead',     row: null, delay: 6500 },
                { type: 'basic',     row: null, delay: 7000 },
                { type: 'basic',     row: null, delay: 7500 },
                { type: 'basic',     row: null, delay: 8000 },
            ],
        },
    ],
};
