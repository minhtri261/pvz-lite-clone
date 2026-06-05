'use strict';
// ══════════════════════════════════════════════════════════════
//  level2.js — Màn 2: 
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_2 = {
    id: 2,
    title:    'Level 2 Complete!',
    subtitle: 'Conehead Zombies are coming!',
    newPlant:  null,
    newZombie: 'Conehead Zombie',
    activeRows:      [0, 1, 2, 3, 4], // full 5 hàng
    availablePlants: ['sunflower', 'peashooter'],
    startingSun: 150,
    waves: [
        {
            // Màn 2 lần đầu có 2 wave
            // Wave 1 — nhẹ nhàng, có flag zombie dẫn đầu
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 40000 },

                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },

                { type: 'basic', row: null, delay: 75000 },
                { type: 'basic', row: null, delay: 75500 },

                { type: 'basic', row: null, delay: 90000 },
                { type: 'basic', row: null, delay: 90500 },
                { type: 'basic', row: null, delay: 91000 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
            ],
        },
        {
            // Wave 2 — nhiều zombie hơn, vẫn có flag zombie dẫn đầu
            scouts: [
                { type: 'conehead', row: null, delay: 0 },

                { type: 'basic', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10500 },
                { type: 'basic', row: null, delay: 11000 },

                { type: 'conehead', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },
                { type: 'basic', row: null, delay: 41500 },
                { type: 'basic', row: null, delay: 42000 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'basic', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
            ],
        },
    ],
};
