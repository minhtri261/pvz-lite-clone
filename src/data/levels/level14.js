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
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'chomper', 'puffshroom', 'icelettuce', 'gravebuster'],
    startingSun: 150,
    // 3 lăng mộ — áp lực từ 3 hàng, triệu hồi zombie mạnh hơn
    tombs: [
        { col: 8, row: 0, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 8, row: 1, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 7, row: 2, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 9, row: 2, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 8, row: 3, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 8, row: 4, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 6, row: 0, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 6, row: 1, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 6, row: 3, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 6, row: 4, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
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
                { type: 'explorer',    row: null, delay: 0 },

                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'conehead',     row: null, delay: 10500 },

                { type: 'basic',       row: null, delay: 20000 },
                { type: 'explorer',    row: null, delay: 20500 },

                { type: 'newspaper',    row: null, delay: 30000 },
                { type: 'basic',       row: null, delay: 30500 },
                { type: 'polevaulting', row: null, delay: 31000 },
                { type: 'explorer',     row: null, delay: 31500 },

                { type: 'basic',    row: null, delay: 40000 },
                { type: 'conehead',     row: null, delay: 40500 },
                { type: 'basic',       row: null, delay: 41000 },

                { type: 'polevaulting', row: null, delay: 50000 },
                { type: 'basic',    row: null, delay: 50500 },
                { type: 'newspaper',    row: null, delay: 51000 },
                { type: 'explorer',     row: null, delay: 51500 },

                { type: 'explorer',    row: null, delay: 60000 },
                { type: 'basic',       row: null, delay: 60500 },
                { type: 'conehead',     row: null, delay: 61000 },
                { type: 'polevaulting', row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'explorer',    row: null, delay: 1000 },
                { type: 'basic',       row: null, delay: 1500 },
                { type: 'polevaulting', row: null, delay: 2000 },
                { type: 'explorer',    row: null, delay: 2500 },
                { type: 'newspaper',    row: null, delay: 3000 },
                { type: 'conehead',     row: null, delay: 3500 },
                { type: 'basic',    row: null, delay: 4000 },
                { type: 'basic',       row: null, delay: 4500 },
                { type: 'explorer',     row: null, delay: 5000 },
                { type: 'polevaulting', row: null, delay: 5500 },
                { type: 'explorer',    row: null, delay: 6000 },
                { type: 'conehead',     row: null, delay: 6500 },
                { type: 'basic',       row: null, delay: 7000 },
                { type: 'basic',       row: null, delay: 7500 },
                { type: 'basic',       row: null, delay: 8000 },
                { type: 'explorer',    row: null, delay: 8500 },
            ],
        },
        {
            // Wave 3 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều (nặng nhất màn)
            scouts: [
                { type: 'explorer',    row: null, delay: 0 },
                { type: 'explorer',    row: null, delay: 500 },

                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'conehead',     row: null, delay: 10500 },

                { type: 'explorer',    row: null, delay: 20000 },
                { type: 'newspaper',    row: null, delay: 20500 },
                { type: 'bucket',       row: null, delay: 21000 },
                { type: 'explorer',     row: null, delay: 21500 },

                { type: 'polevaulting', row: null, delay: 30000 },
                { type: 'explorer',    row: null, delay: 30500 },
                { type: 'conehead',     row: null, delay: 31000 },

                { type: 'newspaper',    row: null, delay: 40000 },
                { type: 'bucket',       row: null, delay: 40500 },
                { type: 'explorer',    row: null, delay: 41000 },
                { type: 'explorer',     row: null, delay: 41500 },

                { type: 'explorer',    row: null, delay: 50000 },
                { type: 'polevaulting', row: null, delay: 50500 },
                { type: 'bucket',       row: null, delay: 51000 },
                { type: 'conehead',     row: null, delay: 51500 },

                { type: 'newspaper',    row: null, delay: 60000 },
                { type: 'basic',    row: null, delay: 60500 },
                { type: 'polevaulting', row: null, delay: 61000 },
                { type: 'basic',    row: null, delay: 61500 },
                { type: 'explorer',     row: null, delay: 62000 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'explorer',    row: null, delay: 500 },
                { type: 'explorer',    row: null, delay: 1000 },
                { type: 'polevaulting', row: null, delay: 1500 },
                { type: 'newspaper',    row: null, delay: 2000 },
                { type: 'explorer',    row: null, delay: 2500 },
                { type: 'bucket',       row: null, delay: 3000 },
                { type: 'conehead',     row: null, delay: 3500 },
                { type: 'basic',    row: null, delay: 4000 },
                { type: 'newspaper',    row: null, delay: 4500 },
                { type: 'bucket',       row: null, delay: 5000 },
                { type: 'polevaulting',     row: null, delay: 5500 },
                { type: 'explorer',    row: null, delay: 6000 },
                { type: 'conehead',     row: null, delay: 6500 },
                { type: 'basic',       row: null, delay: 7000 },
                { type: 'basic',       row: null, delay: 7500 },
                { type: 'conehead',    row: null, delay: 8000 },
                { type: 'polevaulting',    row: null, delay: 8500 },
                { type: 'basic',    row: null, delay: 9000 },
                { type: 'conehead',    row: null, delay: 9500 },
                { type: 'basic',    row: null, delay: 10000 },
                { type: 'polevaulting',    row: null, delay: 10500 },
                { type: 'basic',    row: null, delay: 11000 },
                { type: 'conehead',    row: null, delay: 11500 },
            ],
        },
    ],
};
