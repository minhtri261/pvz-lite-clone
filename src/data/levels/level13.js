'use strict';
// ══════════════════════════════════════════════════════════════
//  level13.js — Màn 13: ANCIENT EGYPT — Lăng Mộ Thức Giấc
//  Thời Kỳ Ai Cập Cổ Đại — màn 3

//  Chiến thuật:
//    - Ice Lettuce mở khóa — đóng băng zombie khi chúng đến gần
//    - Cabbage-pult + Ice Lettuce = combo mạnh cho Egypt
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_13 = {
    id: 13,
    isEgypt:  true,
    isNight:  false,
    title:    'Level 13 Complete!',
    subtitle: 'The mummy awakens... the real challenge begins!',
    newPlant:  'icelettuce',
    newZombie: 'explorer',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'chomper', 'puffshroom', 'icelettuce', 'gravebuster'],
    startingSun: 150,
    tombs: [
        { col: 8, row: 0, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 8, row: 1, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 7, row: 2, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 9, row: 2, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 8, row: 3, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 8, row: 4, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
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
                { type: 'explorer', row: null, delay: 0 },

                { type: 'basic',    row: null, delay: 10000 },
                { type: 'explorer',       row: null, delay: 10500 },

                { type: 'conehead',     row: null, delay: 20000 },
                { type: 'explorer', row: null, delay: 20500 },

                { type: 'basic',    row: null, delay: 30000 },
                { type: 'conehead',      row: null, delay: 30500 },
                { type: 'conehead',     row: null, delay: 31000 },

                { type: 'explorer', row: null, delay: 40000 },
                { type: 'conehead',    row: null, delay: 40500 },
                { type: 'conehead',       row: null, delay: 41000 },

                { type: 'conehead',     row: null, delay: 50000 },
                { type: 'explorer', row: null, delay: 50500 },
                { type: 'basic',    row: null, delay: 51000 },
                { type: 'basic',       row: null, delay: 51500 },
                { type: 'basic', row: null, delay: 52000 },

                { type: 'conehead',       row: null, delay: 60000 },
                { type: 'conehead',     row: null, delay: 60500 },
                { type: 'conehead', row: null, delay: 61000 },
                { type: 'conehead',    row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'conehead',    row: null, delay: 1000 },
                { type: 'explorer',       row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'conehead',    row: null, delay: 2500 },
                { type: 'basic',     row: null, delay: 3000 },
                { type: 'explorer',       row: null, delay: 3500 },
                { type: 'conehead',    row: null, delay: 4000 },
                { type: 'basic',       row: null, delay: 4500 },
                { type: 'conehead', row: null, delay: 5000 },
                { type: 'basic',    row: null, delay: 5500 },
                { type: 'basic',     row: null, delay: 6000 },
                { type: 'basic', row: null, delay: 6500 },
                { type: 'conehead',    row: null, delay: 7000 },
                { type: 'explorer',       row: null, delay: 7500 },
                { type: 'basic', row: null, delay: 8000 },
                { type: 'basic',    row: null, delay: 8500 },
            ],
        },
    ],
};
