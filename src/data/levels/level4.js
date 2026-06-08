'use strict';
// ══════════════════════════════════════════════════════════════
//  level4.js — Màn 4: Potato Mine xuất hiện
//  - Mở khóa Potato Mine (đặt bẫy, kích hoạt sau 14s, diệt 1 zombie tức thì)
//  - Zombie: Basic, Conehead, Pole Vaulting
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_4 = {
    id: 4,
    title:    'Level 4 Complete!',
    subtitle: 'Potato Mine is here to help! More zombies are coming!',
    newPlant:  'Potato Mine',
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine'],
    startingSun: 150,
    waves: [
        {
            // Màn 4 vẫn có 2 wave
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic', row: null, delay: 0 },

                { type: 'basic', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },

                { type: 'basic', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60500 },

                { type: 'conehead', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80500 },
                { type: 'basic', row: null, delay: 81000 },

                { type: 'basic', row: null, delay: 100000 },
                { type: 'conehead', row: null, delay: 100500 },
                { type: 'conehead', row: null, delay: 101000 },
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
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'polevaulting', row: null, delay: 0 },

                { type: 'basic', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10500 },

                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'conehead', row: null, delay: 20500 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },

                { type: 'conehead', row: null, delay: 40000 },
                { type: 'polevaulting', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50500 },
                { type: 'polevaulting', row: null, delay: 51000 },

                { type: 'conehead', row: null, delay: 60000 },
                { type: 'polevaulting', row: null, delay: 60500 },
                { type: 'basic', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'basic',    row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'polevaulting',    row: null, delay: 2500 },
                { type: 'basic',    row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'polevaulting', row: null, delay: 4000 },
                { type: 'basic',    row: null, delay: 4500 },
                { type: 'conehead', row: null, delay: 5000 },
            ],
        },
    ],
};
