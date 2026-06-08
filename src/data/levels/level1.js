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
            ],
        },
    ],
};
