'use strict';
// ══════════════════════════════════════════════════════════════
//  level14.js — Màn 14: ANCIENT EGYPT — Sảnh Đường Pharaoh
//  Thời Kỳ Ai Cập Cổ Đại — màn 4
//
//  Brickhead Zombie trở lại giữa lòng sa mạc!
//  Chiến thuật:
//    - Brickhead rất cứng (1700 HP) → Cabbage-pult + Cherry Bomb
//    - Peanut chặn và bắn cùng lúc → hiệu quả với Brickhead chậm
//    - Pole Vaulter + Brickhead kết hợp → nguy hiểm
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_14 = {
    id: 14,
    isEgypt:  true,
    isNight:  false,
    title:    'Level 14 Complete!',
    subtitle: 'The Pharaoh guards his treasure... only one remains!',
    newPlant:  null,
    newZombie: 'Brickhead Zombie (Egypt)',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'Chomper', 'puffshroom'],
    startingSun: 150,
    // 3 lăng mộ — áp lực từ 3 hàng, triệu hồi zombie mạnh hơn
    tombs: [
        { col: 5, row: 0, hp: 280, spawnRateMs: 18000, zombieTypes: ['conehead'] },
        { col: 7, row: 2, hp: 280, spawnRateMs: 16000, zombieTypes: ['basic'] },
        { col: 8, row: 4, hp: 280, spawnRateMs: 19000, zombieTypes: ['basic', 'conehead'] },
    ],
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'conehead',     row: null, delay: 0 },

                { type: 'conehead',     row: null, delay: 20000 },

                { type: 'bucket',       row: null, delay: 40000 },
                { type: 'conehead',     row: null, delay: 40500 },

                { type: 'polevaulting', row: null, delay: 60000 },
                { type: 'bucket',       row: null, delay: 60500 },

                { type: 'newspaper',    row: null, delay: 80000 },
                { type: 'conehead',     row: null, delay: 80500 },
                { type: 'bucket',       row: null, delay: 81000 },

                { type: 'brickhead',    row: null, delay: 100000 },
                { type: 'polevaulting', row: null, delay: 100500 },
                { type: 'conehead',     row: null, delay: 101000 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'brickhead',    row: null, delay: 700 },
                { type: 'conehead',     row: null, delay: 1400 },
                { type: 'polevaulting', row: null, delay: 2100 },
                { type: 'bucket',       row: null, delay: 2800 },
                { type: 'newspaper',    row: null, delay: 3500 },
                { type: 'brickhead',    row: null, delay: 4200 },
                { type: 'conehead',     row: null, delay: 4900 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'brickhead',    row: null, delay: 0 },

                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'conehead',     row: null, delay: 10500 },

                { type: 'bucket',       row: null, delay: 20000 },
                { type: 'brickhead',    row: null, delay: 20500 },

                { type: 'newspaper',    row: null, delay: 30000 },
                { type: 'bucket',       row: null, delay: 30500 },
                { type: 'polevaulting', row: null, delay: 31000 },

                { type: 'brickhead',    row: null, delay: 40000 },
                { type: 'conehead',     row: null, delay: 40500 },
                { type: 'bucket',       row: null, delay: 41000 },

                { type: 'polevaulting', row: null, delay: 50000 },
                { type: 'brickhead',    row: null, delay: 50500 },
                { type: 'newspaper',    row: null, delay: 51000 },

                { type: 'brickhead',    row: null, delay: 60000 },
                { type: 'bucket',       row: null, delay: 60500 },
                { type: 'conehead',     row: null, delay: 61000 },
                { type: 'polevaulting', row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'brickhead',    row: null, delay: 600 },
                { type: 'bucket',       row: null, delay: 1200 },
                { type: 'polevaulting', row: null, delay: 1800 },
                { type: 'brickhead',    row: null, delay: 2400 },
                { type: 'newspaper',    row: null, delay: 3000 },
                { type: 'conehead',     row: null, delay: 3600 },
                { type: 'brickhead',    row: null, delay: 4200 },
                { type: 'bucket',       row: null, delay: 4800 },
            ],
        },
        {
            // Wave 3 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều (nặng nhất màn)
            scouts: [
                { type: 'brickhead',    row: null, delay: 0 },
                { type: 'brickhead',    row: null, delay: 500 },

                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'conehead',     row: null, delay: 10500 },

                { type: 'brickhead',    row: null, delay: 20000 },
                { type: 'newspaper',    row: null, delay: 20500 },
                { type: 'bucket',       row: null, delay: 21000 },

                { type: 'polevaulting', row: null, delay: 30000 },
                { type: 'brickhead',    row: null, delay: 30500 },
                { type: 'conehead',     row: null, delay: 31000 },

                { type: 'newspaper',    row: null, delay: 40000 },
                { type: 'bucket',       row: null, delay: 40500 },
                { type: 'brickhead',    row: null, delay: 41000 },

                { type: 'brickhead',    row: null, delay: 50000 },
                { type: 'polevaulting', row: null, delay: 50500 },
                { type: 'bucket',       row: null, delay: 51000 },
                { type: 'conehead',     row: null, delay: 51500 },

                { type: 'newspaper',    row: null, delay: 60000 },
                { type: 'brickhead',    row: null, delay: 60500 },
                { type: 'polevaulting', row: null, delay: 61000 },
                { type: 'brickhead',    row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'brickhead',    row: null, delay: 500 },
                { type: 'brickhead',    row: null, delay: 1000 },
                { type: 'polevaulting', row: null, delay: 1500 },
                { type: 'newspaper',    row: null, delay: 2000 },
                { type: 'brickhead',    row: null, delay: 2500 },
                { type: 'bucket',       row: null, delay: 3000 },
                { type: 'conehead',     row: null, delay: 3500 },
                { type: 'brickhead',    row: null, delay: 4000 },
                { type: 'newspaper',    row: null, delay: 4500 },
                { type: 'bucket',       row: null, delay: 5000 },
            ],
        },
    ],
};
