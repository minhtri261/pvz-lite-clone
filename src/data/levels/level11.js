'use strict';
// ══════════════════════════════════════════════════════════════
//  level11.js — Màn 11: ANCIENT EGYPT — Bình Minh Sa Mạc
//  Thời Kỳ Ai Cập Cổ Đại — màn đầu tiên
//
//  Plant mới: Cabbage-pult — ném bắp cải theo vòng cung, 40 dmg
//  Chiến thuật:
//    - Cabbage-pult mạnh hơn Peashooter (40 dmg vs 20 dmg)
//    - Cần Sunflower để duy trì sun (không có PuffShroom đêm)
//    - Zombie Conehead xuất hiện từ wave 1
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_11 = {
    id: 11,
    isEgypt:  true,
    isNight:  false,
    title:    'Level 11 Complete!',
    subtitle: 'The sands stir... deeper dangers await in the desert!',
    newPlant:  'cabbage',
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'chomper', 'puffshroom', 'fumeshroom'],
    startingSun: 150,
    tombs: [
        { col: 9, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 8, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 9, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
    ],
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.2s
            scouts: [
                //Độ khó 1
                { type: 'basic', row: null, delay: 0 },

                //1
                { type: 'basic', row: null, delay: 20000 },

                //2
                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40200 },

                //3
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60200 },

                //3
                { type: 'basic', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80200 },
                { type: 'basic', row: null, delay: 80400 },

                //4
                { type: 'basic', row: null, delay: 100000 },
                { type: 'conehead', row: null, delay: 100500 },
            ],
            surge: [
                //14 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 }, 
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1200 },
                { type: 'conehead', row: null, delay: 1400 },
                { type: 'conehead', row: null, delay: 1600 },
                { type: 'conehead', row: null, delay: 1800 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2200 },
                { type: 'basic', row: null, delay: 2400 },
                { type: 'basic', row: null, delay: 2600 },
                { type: 'basic', row: null, delay: 2800 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3200 },
                { type: 'basic', row: null, delay: 3400 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.2s
            scouts: [
                //Độ khó 5
                { type: 'newspaper',   row: null, delay: 0 },
                { type: 'conehead',    row: null, delay: 200 },

                //6
                { type: 'newspaper',    row: null, delay: 10000 },
                { type: 'basic',        row: null, delay: 10200 },
                { type: 'conehead',     row: null, delay: 10400 },

                //7
                { type: 'newspaper', row: null, delay: 20000 },
                { type: 'newspaper', row: null, delay: 20200 },
                { type: 'basic',     row: null, delay: 20400 },

                //8
                { type: 'bucket',       row: null, delay: 30000 },
                { type: 'conehead',     row: null, delay: 30520 },
                { type: 'conehead',     row: null, delay: 30400 },

                //9
                { type: 'bucket',       row: null, delay: 40000 },
                { type: 'basic',        row: null, delay: 40200 },
                { type: 'basic',        row: null, delay: 40400 },
                { type: 'basic',        row: null, delay: 40600 },
                { type: 'basic',        row: null, delay: 40800 },
                { type: 'basic',        row: null, delay: 41000 },

                //10
                { type: 'bucket',       row: null, delay: 50000 },
                { type: 'newspaper',    row: null, delay: 50500 },
                { type: 'newspaper',    row: null, delay: 51000 },

                //11
                { type: 'bucket',       row: null, delay: 60000 },
                { type: 'bucket',       row: null, delay: 60200 },
                { type: 'basic',        row: null, delay: 60400 },
                { type: 'basic',        row: null, delay: 60600 },
                { type: 'basic',        row: null, delay: 60800 },

                //12
                { type: 'conehead',       row: null, delay: 70000 },
                { type: 'conehead',       row: null, delay: 70200 },
                { type: 'conehead',       row: null, delay: 70400 },
                { type: 'conehead',       row: null, delay: 70600 },
                { type: 'conehead',       row: null, delay: 70800 },
                { type: 'conehead',       row: null, delay: 71000 },
            ],
            surge: [
                //28 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'newspaper', row: null, delay: 1000 },
                { type: 'newspaper', row: null, delay: 1200 },
                { type: 'newspaper', row: null, delay: 1400 },
                { type: 'newspaper', row: null, delay: 1600 },
                { type: 'newspaper', row: null, delay: 1800 },
                { type: 'newspaper', row: null, delay: 2000 },
                { type: 'newspaper', row: null, delay: 2200 },
                { type: 'newspaper', row: null, delay: 2400 },
                { type: 'newspaper', row: null, delay: 2600 },
                { type: 'newspaper', row: null, delay: 2800 },
                { type: 'bucket', row: null, delay: 3000 },
                { type: 'bucket', row: null, delay: 3200 },
                { type: 'bucket', row: null, delay: 3400 },
                { type: 'bucket', row: null, delay: 3600 },
                { type: 'bucket', row: null, delay: 3800 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4200 },
                { type: 'basic', row: null, delay: 4400 },
                { type: 'basic', row: null, delay: 4600 },
                { type: 'conehead', row: null, delay: 4800 },
                { type: 'conehead', row: null, delay: 5000 },
                { type: 'conehead', row: null, delay: 5200 },
                { type: 'conehead', row: null, delay: 5400 },
                { type: 'conehead', row: null, delay: 5600 },
                { type: 'conehead', row: null, delay: 5800 },
                { type: 'conehead', row: null, delay: 6000 },
                { type: 'conehead', row: null, delay: 6200 },
            ],
        },
    ],
};
