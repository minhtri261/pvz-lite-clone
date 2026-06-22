'use strict';
// ══════════════════════════════════════════════════════════════
//  level1.js — Màn 1: Khởi đầu đơn giản
//  - Full 5 hàng (hỗ trợ Fusion ngay từ đầu)
//  - Peashooter + Sunflower
//  - Chỉ có Basic Zombie
//  - 1 đợt (wave)
//
//  row: null → hệ thống tự chọn hàng ít zombie nhất (_pickSpawnRow)
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_1 = {
    id: 1,
    title:    'Level 1 Complete!',
    subtitle: 'Great start — combine plants for more power!',
    newPlant:  'Peashooter, Sunflower', 
    newZombie: 'Basic Zombie, Flag Zombie',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['peashooter', 'sunflower'],
    startingSun: 150,
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic', row: null, delay: 0 },

                { type: 'basic', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },

                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },

                { type: 'basic', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80500 },
                { type: 'basic', row: null, delay: 81000 },

                { type: 'basic', row: null, delay: 100000 },
                { type: 'basic', row: null, delay: 100500 },
                { type: 'basic', row: null, delay: 101000 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3500 }
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },

                { type: 'basic', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10500 },
                { type: 'basic', row: null, delay: 11000 },

                { type: 'basic', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20500 },
                { type: 'basic', row: null, delay: 21000 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },
                { type: 'basic', row: null, delay: 41500 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'basic', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 51500 },
                { type: 'basic', row: null, delay: 52000 },

                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },
                { type: 'basic', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61500 },
                { type: 'basic', row: null, delay: 62000 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
                { type: 'basic', row: null, delay: 5000 },
                { type: 'basic', row: null, delay: 5500 },
                { type: 'basic', row: null, delay: 6000 },
                { type: 'basic', row: null, delay: 6500 },
            ],
        },
    ],
};
