'use strict';
// ══════════════════════════════════════════════════════════════
//  level7.js — Màn 7: 
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_7 = {
    id: 7,
    isNight:   true,
    title:    'Level 7 Complete!',
    subtitle: 'The night gets darker, but you\'re getting stronger! Prepare for the toughest zombies yet!',
    newPlant:  null,
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine', 'puffshroom'],
    startingSun: 150,  
    waves: [
        {
            // Wave 1 — giới thiệu Pole Vaulter lần đầu
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 15000 },
                { type: 'basic', row: null, delay: 30000 },

                { type: 'basic', row: null, delay: 45000 },
                { type: 'basic', row: null, delay: 45500 },

                { type: 'basic', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60500 },

                { type: 'basic', row: null, delay: 75000 },
                { type: 'basic', row: null, delay: 75500 },
                { type: 'conehead', row: null, delay: 76000 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2500 },
            ],
        },
        {
            // Wave 2 — nhiều zombie hơn, giới thiệu Bucket Zombie
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },

                { type: 'newspaper', row: null, delay: 10000 },

                { type: 'newspaper', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20500 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },

                { type: 'newspaper', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'basic', row: null, delay: 50500 },
                { type: 'conehead', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 51500 },
                { type: 'basic', row: null, delay: 52000 },

                { type: 'newspaper', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60500 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'newspaper', row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'newspaper', row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
            ],
        },
        // Wave 3 — nhiều zombie hơn nữa
        {
           scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'newspaper', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },

                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10500 },
                { type: 'basic', row: null, delay: 11000 },
                { type: 'basic', row: null, delay: 11500 },

                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20500 },
                { type: 'basic', row: null, delay: 21000 },
                { type: 'basic', row: null, delay: 21500 },
                { type: 'newspaper', row: null, delay: 22000 },
                { type: 'basic', row: null, delay: 22500 },

                { type: 'conehead', row: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 30500 },
                { type: 'conehead', row: null, delay: 31000 },
                { type: 'newspaper', row: null, delay: 31500 },
                { type: 'conehead', row: null, delay: 32000 },

                { type: 'polevaulting', row: null, delay: 40000 },
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
                { type: 'polevaulting',   row: null, delay: 1500 },
                { type: 'conehead',   row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2500 },
                { type: 'conehead',   row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'newspaper',     row: null, delay: 4000 },
                { type: 'newspaper',     row: null, delay: 4500 },
                { type: 'polevaulting',     row: null, delay: 5000 },
                { type: 'basic',     row: null, delay: 5500 },
                { type: 'basic',     row: null, delay: 6000 },
                { type: 'conehead',     row: null, delay: 6500 },
                { type: 'basic',     row: null, delay: 7000 },
                { type: 'polevaulting',     row: null, delay: 7500 },
                { type: 'basic',     row: null, delay: 8000 },
            ],
        },
    ],
};
