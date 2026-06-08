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
    newZombie: 'Bucket Zombie',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'Chomper', 'puffshroom'],
    startingSun: 150,
    // 1 lăng mộ — giới thiệu cơ chế mộ lần đầu
    tombs: [
        { col: 7, row: 2, hp: 200, spawnRateMs: 24000, zombieTypes: ['basic'] },
    ],
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic',    row: null, delay: 0 },

                { type: 'basic',    row: null, delay: 20000 },

                { type: 'basic',    row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40500 },

                { type: 'conehead', row: null, delay: 60000 },
                { type: 'basic',    row: null, delay: 60500 },

                { type: 'bucket',   row: null, delay: 80000 },
                { type: 'basic',    row: null, delay: 80500 },
                { type: 'conehead', row: null, delay: 81000 },

                { type: 'conehead', row: null, delay: 100000 },
                { type: 'bucket',   row: null, delay: 100500 },
                { type: 'basic',    row: null, delay: 101000 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'conehead',     row: null, delay: 700 },
                { type: 'basic',        row: null, delay: 1400 },
                { type: 'bucket',       row: null, delay: 2100 },
                { type: 'conehead',     row: null, delay: 2800 },
                { type: 'basic',        row: null, delay: 3500 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'polevaulting', row: null, delay: 0 },

                { type: 'bucket',       row: null, delay: 10000 },
                { type: 'conehead',     row: null, delay: 10500 },

                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'bucket',       row: null, delay: 20500 },

                { type: 'conehead',     row: null, delay: 30000 },
                { type: 'polevaulting', row: null, delay: 30500 },
                { type: 'bucket',       row: null, delay: 31000 },

                { type: 'bucket',       row: null, delay: 40000 },
                { type: 'conehead',     row: null, delay: 40500 },
                { type: 'polevaulting', row: null, delay: 41000 },

                { type: 'polevaulting', row: null, delay: 50000 },
                { type: 'bucket',       row: null, delay: 50500 },
                { type: 'conehead',     row: null, delay: 51000 },

                { type: 'bucket',       row: null, delay: 60000 },
                { type: 'conehead',     row: null, delay: 60500 },
                { type: 'polevaulting', row: null, delay: 61000 },
                { type: 'bucket',       row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'bucket',       row: null, delay: 700 },
                { type: 'polevaulting', row: null, delay: 1400 },
                { type: 'conehead',     row: null, delay: 2100 },
                { type: 'bucket',       row: null, delay: 2800 },
                { type: 'basic',        row: null, delay: 3500 },
                { type: 'conehead',     row: null, delay: 4200 },
            ],
        },
        {
            // Wave 3 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều (nặng nhất màn)
            scouts: [
                { type: 'bucket',       row: null, delay: 0 },
                { type: 'bucket',       row: null, delay: 500 },

                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'conehead',     row: null, delay: 10500 },

                { type: 'bucket',       row: null, delay: 20000 },
                { type: 'polevaulting', row: null, delay: 20500 },
                { type: 'conehead',     row: null, delay: 21000 },

                { type: 'conehead',     row: null, delay: 30000 },
                { type: 'bucket',       row: null, delay: 30500 },
                { type: 'polevaulting', row: null, delay: 31000 },

                { type: 'bucket',       row: null, delay: 40000 },
                { type: 'conehead',     row: null, delay: 40500 },
                { type: 'polevaulting', row: null, delay: 41000 },

                { type: 'polevaulting', row: null, delay: 50000 },
                { type: 'bucket',       row: null, delay: 50500 },
                { type: 'conehead',     row: null, delay: 51000 },
                { type: 'bucket',       row: null, delay: 51500 },

                { type: 'conehead',     row: null, delay: 60000 },
                { type: 'polevaulting', row: null, delay: 60500 },
                { type: 'bucket',       row: null, delay: 61000 },
                { type: 'polevaulting', row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'polevaulting', row: null, delay: 600 },
                { type: 'bucket',       row: null, delay: 1200 },
                { type: 'conehead',     row: null, delay: 1800 },
                { type: 'bucket',       row: null, delay: 2400 },
                { type: 'polevaulting', row: null, delay: 3000 },
                { type: 'conehead',     row: null, delay: 3600 },
                { type: 'bucket',       row: null, delay: 4200 },
            ],
        },
    ],
};
