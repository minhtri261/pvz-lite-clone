'use strict';
// ══════════════════════════════════════════════════════════════
//  level13.js — Màn 13: ANCIENT EGYPT — Lăng Mộ Thức Giấc
//  Thời Kỳ Ai Cập Cổ Đại — màn 3
//
//  Newspaper Zombie xuất hiện lần đầu ở Egypt!
//  Chiến thuật:
//    - Newspaper điên loạn khi mất báo → tốc độ tăng gấp đôi
//    - Snow Pea mở khóa — làm chậm zombie điên loạn hiệu quả
//    - Cabbage-pult + Snow Pea = combo mạnh cho Egypt
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_13 = {
    id: 13,
    isEgypt:  true,
    isNight:  false,
    title:    'Level 13 Complete!',
    subtitle: 'The mummy awakens... the real challenge begins!',
    newPlant:  'snowpea',
    newZombie: 'Newspaper Zombie',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'Chomper', 'puffshroom'],
    startingSun: 150,
    // 2 lăng mộ — mộ bắt đầu gây áp lực từ 2 hàng khác nhau
    tombs: [
        { col: 6, row: 1, hp: 230, spawnRateMs: 20000, zombieTypes: ['basic'] },
        { col: 8, row: 3, hp: 230, spawnRateMs: 22000, zombieTypes: ['basic'] },
    ],
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic',     row: null, delay: 0 },

                { type: 'newspaper', row: null, delay: 20000 },

                { type: 'conehead',  row: null, delay: 40000 },
                { type: 'basic',     row: null, delay: 40500 },

                { type: 'bucket',    row: null, delay: 60000 },
                { type: 'newspaper', row: null, delay: 60500 },

                { type: 'conehead',  row: null, delay: 80000 },
                { type: 'bucket',    row: null, delay: 80500 },
                { type: 'basic',     row: null, delay: 81000 },

                { type: 'newspaper', row: null, delay: 100000 },
                { type: 'conehead',  row: null, delay: 100500 },
                { type: 'bucket',    row: null, delay: 101000 },
            ],
            surge: [
                { type: 'flag',      row: null, delay: 0 },
                { type: 'newspaper', row: null, delay: 700 },
                { type: 'conehead',  row: null, delay: 1400 },
                { type: 'bucket',    row: null, delay: 2100 },
                { type: 'newspaper', row: null, delay: 2800 },
                { type: 'basic',     row: null, delay: 3500 },
                { type: 'conehead',  row: null, delay: 4200 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'polevaulting', row: null, delay: 0 },

                { type: 'newspaper',    row: null, delay: 10000 },
                { type: 'bucket',       row: null, delay: 10500 },

                { type: 'conehead',     row: null, delay: 20000 },
                { type: 'polevaulting', row: null, delay: 20500 },

                { type: 'newspaper',    row: null, delay: 30000 },
                { type: 'bucket',       row: null, delay: 30500 },
                { type: 'conehead',     row: null, delay: 31000 },

                { type: 'polevaulting', row: null, delay: 40000 },
                { type: 'newspaper',    row: null, delay: 40500 },
                { type: 'bucket',       row: null, delay: 41000 },

                { type: 'conehead',     row: null, delay: 50000 },
                { type: 'polevaulting', row: null, delay: 50500 },
                { type: 'newspaper',    row: null, delay: 51000 },

                { type: 'bucket',       row: null, delay: 60000 },
                { type: 'conehead',     row: null, delay: 60500 },
                { type: 'polevaulting', row: null, delay: 61000 },
                { type: 'newspaper',    row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'newspaper',    row: null, delay: 600 },
                { type: 'bucket',       row: null, delay: 1200 },
                { type: 'polevaulting', row: null, delay: 1800 },
                { type: 'newspaper',    row: null, delay: 2400 },
                { type: 'conehead',     row: null, delay: 3000 },
                { type: 'bucket',       row: null, delay: 3600 },
                { type: 'newspaper',    row: null, delay: 4200 },
            ],
        },
        {
            // Wave 3 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều (nặng nhất màn)
            scouts: [
                { type: 'bucket',       row: null, delay: 0 },
                { type: 'newspaper',    row: null, delay: 500 },

                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'bucket',       row: null, delay: 10500 },

                { type: 'conehead',     row: null, delay: 20000 },
                { type: 'newspaper',    row: null, delay: 20500 },
                { type: 'polevaulting', row: null, delay: 21000 },

                { type: 'bucket',       row: null, delay: 30000 },
                { type: 'conehead',     row: null, delay: 30500 },
                { type: 'newspaper',    row: null, delay: 31000 },

                { type: 'polevaulting', row: null, delay: 40000 },
                { type: 'bucket',       row: null, delay: 40500 },
                { type: 'conehead',     row: null, delay: 41000 },

                { type: 'newspaper',    row: null, delay: 50000 },
                { type: 'polevaulting', row: null, delay: 50500 },
                { type: 'bucket',       row: null, delay: 51000 },
                { type: 'conehead',     row: null, delay: 51500 },

                { type: 'bucket',       row: null, delay: 60000 },
                { type: 'newspaper',    row: null, delay: 60500 },
                { type: 'polevaulting', row: null, delay: 61000 },
                { type: 'bucket',       row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'bucket',       row: null, delay: 600 },
                { type: 'newspaper',    row: null, delay: 1200 },
                { type: 'polevaulting', row: null, delay: 1800 },
                { type: 'bucket',       row: null, delay: 2400 },
                { type: 'newspaper',    row: null, delay: 3000 },
                { type: 'conehead',     row: null, delay: 3600 },
                { type: 'bucket',       row: null, delay: 4200 },
                { type: 'newspaper',    row: null, delay: 4800 },
            ],
        },
    ],
};
