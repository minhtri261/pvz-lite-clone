'use strict';
// ══════════════════════════════════════════════════════════════
//  level6.js — Màn 6 : Màn tối với Newspaper Zombie
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_6 = {
    id: 6,
    isNight:   true,     // Màn tối — không có sun trời, sun plants chậm hơn
    title:    'Level 6 Complete!',
    subtitle: 'Night falls, but the fight continues! Get ready for tougher zombies!',
    newPlant:  'puffshroom, sunshroom',
    newZombie: 'newspaper',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine', 'puffshroom'],
    startingSun: 150,  
    waves: [
        // Màn 6 
        // Wave 1 
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

                { type: 'newspaper', row: null, delay: 10000 },

                { type: 'newspaper', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },

                { type: 'newspaper', row: null, delay: 40000 },
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
                { type: 'newspaper', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
            ],
        },
    ],
};
