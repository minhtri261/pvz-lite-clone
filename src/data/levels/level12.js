'use strict';
// ══════════════════════════════════════════════════════════════
//  level12.js — Màn 12: ANCIENT EGYPT — Đêm Nơi Sa Mạc
//  Thời Kỳ Ai Cập Cổ Đại — màn 2
//
//  Zombie Bucket xuất hiện lần đầu ở Egypt!
//  Chiến thuật:
//    - Bucket cần nhiều đạn Cabbage-pult hoặc Cherry Bomb để phá
//    - Pole Vaulter nhảy qua hàng đầu → cần phòng thủ tầng 2
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_12 = {
    id: 12,
    isEgypt:  true,
    isNight:  false,
    title:    'Level 12 Complete!',
    subtitle: 'The pyramid is near... brace yourself for what lies within!',
    newPlant:  null,
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'chomper', 'puffshroom', 'gravebuster'],
    startingSun: 150,
    // 1 lăng mộ — giới thiệu cơ chế mộ lần đầu
    tombs: [
        { col: 9, row: 0, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 9, row: 1, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 8, row: 2, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 9, row: 3, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 9, row: 4, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
    ],
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic', row: null, delay: 0 },

                { type: 'basic', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },

                { type: 'conehead', row: null, delay: 60000 },

                { type: 'basic', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80500 },
                { type: 'basic', row: null, delay: 81000 },

                { type: 'basic', row: null, delay: 100000 },
                { type: 'conehead', row: null, delay: 100500 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'conehead', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
                { type: 'conehead', row: null, delay: 5000 },
                { type: 'basic', row: null, delay: 5500 },
            ],
        },
{
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },

                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10500 },

                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20500 },
                { type: 'basic', row: null, delay: 21000 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },

                { type: 'conehead', row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'polevaulting', row: null, delay: 51500 },

                { type: 'polevaulting', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },
                { type: 'polevaulting', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61500 },

                { type: 'basic', row: null, delay: 70000 },
                { type: 'conehead', row: null, delay: 70500 },
                { type: 'basic', row: null, delay: 71000 },
                { type: 'basic', row: null, delay: 71500 },
                { type: 'basic', row: null, delay: 72000 },
                { type: 'basic', row: null, delay: 72500 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'polevaulting', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
                { type: 'basic', row: null, delay: 5000 },
                { type: 'basic', row: null, delay: 5500 },
                { type: 'basic', row: null, delay: 6000 },
                { type: 'basic', row: null, delay: 6500 },
                { type: 'conehead', row: null, delay: 7000 },
                { type: 'basic', row: null, delay: 7500 },
                { type: 'basic', row: null, delay: 8000 },
                { type: 'basic', row: null, delay: 8500 },
            ],
        },
        {
            // Wave 3 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'bucket', row: null, delay: 0 },

                { type: 'bucket', row: null, delay: 10000 },

                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20500 },
                { type: 'basic', row: null, delay: 21000 },
                { type: 'basic', row: null, delay: 21500 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },
                { type: 'basic', row: null, delay: 32000 },

                { type: 'bucket', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },
                { type: 'basic', row: null, delay: 41500 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'polevaulting', row: null, delay: 50500 },
                { type: 'conehead', row: null, delay: 51000 },
                { type: 'conehead', row: null, delay: 51500 },
                { type: 'basic', row: null, delay: 52000 },

                { type: 'polevaulting', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },
                { type: 'bucket', row: null, delay: 61000 },
                { type: 'conehead', row: null, delay: 61500 },

            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'polevaulting', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
                { type: 'basic', row: null, delay: 5000 },
                { type: 'bucket', row: null, delay: 5500 },
                { type: 'basic', row: null, delay: 6000 },
                { type: 'basic', row: null, delay: 6500 },
                { type: 'conehead', row: null, delay: 7000 },
                { type: 'basic', row: null, delay: 7500 },
                { type: 'basic', row: null, delay: 8000 },
                { type: 'basic', row: null, delay: 8500 },
                { type: 'bucket', row: null, delay: 9000 },
                { type: 'basic', row: null, delay: 9500 },
                { type: 'bucket', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10500 },
                { type: 'basic', row: null, delay: 11000 },
                { type: 'basic', row: null, delay: 11500 },
             ],
        },
    ],
};
