'use strict';
// ══════════════════════════════════════════════════════════════
//  level8.js — Màn 8: Brickhead Zombie xuất hiện
//  - Mở khóa Brickhead Zombie (mũ gạch, HP rất cao)
//  - Zombie: Basic, Conehead, Brickhead
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_8 = {
    id: 8,
    isNight:   true,
    title:    'Level 8 Complete!',
    subtitle: 'You defended the garden across all 8 levels! Legend!',
    newPlant:  null,
    newZombie: 'Brickhead Zombie',
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

                { type: 'brickhead', row: null, delay: 10000 },

                { type: 'brickhead', row: null, delay: 20000 },

                { type: 'conehead', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },
                { type: 'basic', row: null, delay: 32000 },

                { type: 'brickhead', row: null, delay: 40000 },
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
                { type: 'brickhead', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
            ],
        },
    ],
};
