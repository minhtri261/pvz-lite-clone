'use strict';
// ══════════════════════════════════════════════════════════════
//  level5.js — Màn 5: Buckethead Zombie xuất hiện
//  - Mở khóa Buckethead Zombie (mũ thùng, HP gấp đôi Conehead)
//  - Zombie: Basic, Conehead, Buckethead
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_5 = {
    id: 5,
    title:    'Level 5 Complete!',
    subtitle: 'Buckethead Zombies are here! Can you handle them?',
    newPlant:  null,
    newZombie: 'Buckethead Zombie',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine'],
    startingSun: 150,
    waves: [
        // Màn 5 sẽ có 2 wave 
        // Wave 1
        {
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 15000 },
                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 45000 },

                { type: 'conehead', row: null, delay: 60000 },

                { type: 'conehead', row: null, delay: 75000 },

                { type: 'basic', row: null, delay: 90000 },
                { type: 'basic', row: null, delay: 90500 },
                { type: 'basic', row: null, delay: 91000 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
            ],
        },
        {
            // Wave 2
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },

                { type: 'bucket', row: null, delay: 10000 },

                { type: 'bucket', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },

                { type: 'bucket', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },

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
                { type: 'bucket', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'bucket', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
            ],
        },
    ],
};
