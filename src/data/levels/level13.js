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
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'chomper', 'puffshroom', 'fumeshroom', 'icelettuce'],
    startingSun: 150,
    tombs: [
        { col: 8, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 8, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 7, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 9, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 8, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 8, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
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
                { type: 'explorer', row: null, delay: 0 },  // Lần đầu xuất hiện explorer zombie
                { type: 'basic', row: null, delay: 200 },
                { type: 'basic', row: null, delay: 400 },

                //6
                { type: 'explorer', row: null, delay: 10000 },
                { type: 'conehead', row: null, delay: 10200 },
                { type: 'basic', row: null, delay: 10400 },

                //7
                { type: 'explorer', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20200 },
                { type: 'basic', row: null, delay: 20400 },
                { type: 'basic', row: null, delay: 20600 },
                { type: 'basic', row: null, delay: 20800 },

                //8
                { type: 'explorer', ow: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 30200 },
                { type: 'conehead', row: null, delay: 30400 },
                { type: 'basic', row: null, delay: 30600 },

                //9
                { type: 'explorer', row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40200 },
                { type: 'conehead', row: null, delay: 40400 },
                { type: 'conehead', row: null, delay: 40600 },

                //10
                { type: 'explorer',     row: null, delay: 50000 },
                { type: 'explorer', row: null, delay: 50200 },
                { type: 'basic',    row: null, delay: 50400 },
                { type: 'basic',       row: null, delay: 50600 },
                { type: 'basic', row: null, delay: 50800 },
                { type: 'basic', row: null, delay: 51000 },

                //11
                { type: 'explorer', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60200 },
                { type: 'conehead', row: null, delay: 60400 },
                { type: 'conehead', row: null, delay: 60600 },
                { type: 'conehead', row: null, delay: 60800 },

                //12
                { type: 'conehead', row: null, delay: 70000 },
                { type: 'conehead', row: null, delay: 70200 },
                { type: 'conehead', row: null, delay: 70400 },
                { type: 'conehead', row: null, delay: 70600 },
                { type: 'conehead', row: null, delay: 70800 },
                { type: 'conehead', row: null, delay: 71000 },
            ],
            surge: [
                //28 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1200 },
                { type: 'conehead', row: null, delay: 1400 },
                { type: 'conehead', row: null, delay: 1600 },
                { type: 'conehead', row: null, delay: 1800 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2200 },
                { type: 'conehead', row: null, delay: 2400 },
                { type: 'conehead', row: null, delay: 2600 },
                { type: 'conehead', row: null, delay: 2800 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3200 },
                { type: 'basic', row: null, delay: 3400 },
                { type: 'basic', row: null, delay: 3600 },
                { type: 'basic', row: null, delay: 3800 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4200 },
                { type: 'basic', row: null, delay: 4400 },
                { type: 'basic', row: null, delay: 4600 },
                { type: 'explorer', row: null, delay: 4800 },
                { type: 'explorer', row: null, delay: 5000 },
                { type: 'explorer', row: null, delay: 5200 },
                { type: 'explorer', row: null, delay: 5400 },
                { type: 'explorer', row: null, delay: 5600 },
                { type: 'explorer', row: null, delay: 5800 },
                { type: 'explorer', row: null, delay: 6000 },
                { type: 'explorer', row: null, delay: 6200 },
            ],
        },
    ],
};
