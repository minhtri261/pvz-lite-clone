'use strict';
// ══════════════════════════════════════════════════════════════
//  level12.js — Màn 12: ANCIENT EGYPT — Đêm Nơi Sa Mạc
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
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'chomper', 'puffshroom', 'fumeshroom'],
    startingSun: 150,
    tombs: [
        { col: 9, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 9, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 8, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 9, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 9, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
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

                //4
                { type: 'basic', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80200 },
                { type: 'basic', row: null, delay: 80400 },
                { type: 'basic', row: null, delay: 80600 },

                //5
                { type: 'conehead', row: null, delay: 100000 },
                { type: 'conehead', row: null, delay: 100200 },
                { type: 'basic', row: null, delay: 100400 },
            ],
            surge: [
                //15 zombies xuất hiện
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
                { type: 'basic', row: null, delay: 3600 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.2s
            scouts: [
                //Độ khó 6
                { type: 'polevaulting', row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 200 },
                { type: 'basic', row: null, delay: 400 },
                { type: 'basic', row: null, delay: 600 },

                //7
                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'conehead', row: null, delay: 10200 },
                { type: 'conehead', row: null, delay: 10400 },
                { type: 'basic', row: null, delay: 10600 },

                //8
                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'polevaulting', row: null, delay: 20200 },
                { type: 'polevaulting', row: null, delay: 20400 },
                { type: 'basic', row: null, delay: 20600 },
                { type: 'basic', row: null, delay: 20800 },

                //9
                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30200 },
                { type: 'basic', row: null, delay: 30400 },
                { type: 'basic', row: null, delay: 30600 },
                { type: 'basic', row: null, delay: 30800 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31200 },
                { type: 'basic', row: null, delay: 31400 },
                { type: 'basic', row: null, delay: 31600 },

                //10
                { type: 'door', row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40200 },
                { type: 'conehead', row: null, delay: 40400 },
                { type: 'basic', row: null, delay: 40600 },
                { type: 'basic', row: null, delay: 40800 },
                { type: 'basic', row: null, delay: 41000 },

                //11
                { type: 'door', row: null, delay: 50000 },
                { type: 'polevaulting', row: null, delay: 50200 },
                { type: 'polevaulting', row: null, delay: 50400 },
                { type: 'basic', row: null, delay: 50600 },
                { type: 'basic', row: null, delay: 50800 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 51200 },

                //12
                { type: 'door', row: null, delay: 60000 },
                { type: 'door', row: null, delay: 60200 },
                { type: 'conehead', row: null, delay: 60400 },
                { type: 'conehead', row: null, delay: 60600 },
                { type: 'basic', row: null, delay: 60800 },
                { type: 'basic', row: null, delay: 61000 },

                //13
                { type: 'door', row: null, delay: 70000 },
                { type: 'polevaulting', row: null, delay: 70200 },
                { type: 'polevaulting', row: null, delay: 70400 },
                { type: 'polevaulting', row: null, delay: 70600 },
                { type: 'basic', row: null, delay: 70800 },
                { type: 'basic', row: null, delay: 71000 },
                { type: 'basic', row: null, delay: 71200 },
                { type: 'basic', row: null, delay: 71400 },

                //14
                { type: 'conehead', row: null, delay: 80000 },
                { type: 'conehead', row: null, delay: 80200 },
                { type: 'conehead', row: null, delay: 80400 },
                { type: 'conehead', row: null, delay: 80600 },
                { type: 'conehead', row: null, delay: 80800 },
                { type: 'conehead', row: null, delay: 81000 },
                { type: 'conehead', row: null, delay: 81200 },
                { type: 'conehead', row: null, delay: 81400 },
            ],
            surge: [
                //30 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'door', row: null, delay: 1000 },
                { type: 'door', row: null, delay: 1200 },
                { type: 'door', row: null, delay: 1400 },
                { type: 'door', row: null, delay: 1600 },
                { type: 'door', row: null, delay: 1800 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2200 },
                { type: 'conehead', row: null, delay: 2400 },
                { type: 'conehead', row: null, delay: 2600 },
                { type: 'conehead', row: null, delay: 2800 },
                { type: 'conehead', row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3200 },
                { type: 'conehead', row: null, delay: 3400 },
                { type: 'conehead', row: null, delay: 3600 },
                { type: 'conehead', row: null, delay: 3800 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4200 },
                { type: 'basic', row: null, delay: 4400 },
                { type: 'basic', row: null, delay: 4600 },
                { type: 'polevaulting', row: null, delay: 4800 },
                { type: 'polevaulting', row: null, delay: 5000 },
                { type: 'polevaulting', row: null, delay: 5200 },
                { type: 'polevaulting', row: null, delay: 5400 },
                { type: 'polevaulting', row: null, delay: 5600 },
                { type: 'polevaulting', row: null, delay: 5800 },
                { type: 'polevaulting', row: null, delay: 6000 },
                { type: 'polevaulting', row: null, delay: 6200 },
                { type: 'polevaulting', row: null, delay: 6400 },
                { type: 'polevaulting', row: null, delay: 6600 },
            ],
        },
        {
            // Wave 3 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.2s
            scouts: [
                //Độ khó 15
                { type: 'bucket', row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 200 },
                { type: 'conehead', row: null, delay: 400 },
                { type: 'basic', row: null, delay: 600 },
                { type: 'basic', row: null, delay: 800 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1200 },
                { type: 'basic', row: null, delay: 1400 },
                { type: 'basic', row: null, delay: 1600 },
                { type: 'basic', row: null, delay: 1800 },

                //16
                { type: 'bucket', row: null, delay: 10000 },
                { type: 'conehead', row: null, delay: 10200 },
                { type: 'conehead', row: null, delay: 10400 },
                { type: 'conehead', row: null, delay: 10600 },
                { type: 'conehead', row: null, delay: 10800 },
                { type: 'basic', row: null, delay: 11000 },
                { type: 'basic', row: null, delay: 11200 },
                { type: 'basic', row: null, delay: 11400 },
                { type: 'basic', row: null, delay: 11600 },

                //17
                { type: 'bucket', row: null, delay: 20000 },
                { type: 'bucket', row: null, delay: 20200 },
                { type: 'basic', row: null, delay: 20400 },
                { type: 'basic', row: null, delay: 20600 },
                { type: 'basic', row: null, delay: 20800 },
                { type: 'basic', row: null, delay: 21000 },
                { type: 'basic', row: null, delay: 21200 },
                { type: 'basic', row: null, delay: 21400 },
                { type: 'basic', row: null, delay: 21600 },
                { type: 'basic', row: null, delay: 21800 },
                { type: 'basic', row: null, delay: 22000 },

                //18
                { type: 'door', row: null, delay: 30000 },
                { type: 'bucket', row: null, delay: 30200 },
                { type: 'conehead', row: null, delay: 30400 },
                { type: 'conehead', row: null, delay: 30600 },
                { type: 'conehead', row: null, delay: 30800 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31200 },
                { type: 'basic', row: null, delay: 31400 },
                { type: 'basic', row: null, delay: 31600 },
                { type: 'basic', row: null, delay: 31800 },

                //19
                { type: 'door', row: null, delay: 40000 },
                { type: 'door', row: null, delay: 40200 },
                { type: 'bucket', row: null, delay: 40400 },
                { type: 'bucket', row: null, delay: 40600 },
                { type: 'basic', row: null, delay: 40800 },
                { type: 'basic', row: null, delay: 41000 },
                { type: 'basic', row: null, delay: 41200 },
                { type: 'basic', row: null, delay: 41400 },
                { type: 'basic', row: null, delay: 41600 },

                //20
                { type: 'door', row: null, delay: 50000 },
                { type: 'door', row: null, delay: 50200 },
                { type: 'bucket', row: null, delay: 50400 },
                { type: 'bucket', row: null, delay: 50600 },
                { type: 'basic', row: null, delay: 50800 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 51200 },
                { type: 'polevaulting', row: null, delay: 51400 },
                { type: 'polevaulting', row: null, delay: 51600 },

                //21
                { type: 'door', row: null, delay: 60000 },
                { type: 'door', row: null, delay: 60200 },
                { type: 'bucket', row: null, delay: 60400 },
                { type: 'bucket', row: null, delay: 60600 },
                { type: 'basic', row: null, delay: 60800 },
                { type: 'conehead', row: null, delay: 61000 },
                { type: 'conehead', row: null, delay: 61200 },
                { type: 'polevaulting', row: null, delay: 61400 },

                //22
                { type: 'door', row: null, delay: 70000 },
                { type: 'door', row: null, delay: 70200 },
                { type: 'bucket', row: null, delay: 70400 },
                { type: 'bucket', row: null, delay: 70600 },
                { type: 'conehead', row: null, delay: 70800 },
                { type: 'conehead', row: null, delay: 71000 },
                { type: 'polevaulting', row: null, delay: 71200 },
                { type: 'polevaulting', row: null, delay: 71400 },
            ],
            surge: [
                //50 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'door', row: null, delay: 1000 },
                { type: 'door', row: null, delay: 1200 },
                { type: 'door', row: null, delay: 1400 },
                { type: 'door', row: null, delay: 1600 },
                { type: 'door', row: null, delay: 1800 },
                { type: 'door', row: null, delay: 2000 },
                { type: 'door', row: null, delay: 2200 },
                { type: 'door', row: null, delay: 2400 },
                { type: 'door', row: null, delay: 2600 },
                { type: 'door', row: null, delay: 2800 },
                { type: 'bucket', row: null, delay: 3000 },
                { type: 'bucket', row: null, delay: 3200 },
                { type: 'bucket', row: null, delay: 3400 },
                { type: 'bucket', row: null, delay: 3600 },
                { type: 'bucket', row: null, delay: 3800 },
                { type: 'bucket', row: null, delay: 4000 },
                { type: 'bucket', row: null, delay: 4200 },
                { type: 'bucket', row: null, delay: 4400 },
                { type: 'bucket', row: null, delay: 4600 },
                { type: 'bucket', row: null, delay: 4800 },
                { type: 'conehead', row: null, delay: 5000 },
                { type: 'conehead', row: null, delay: 5200 },
                { type: 'conehead', row: null, delay: 5400 },
                { type: 'conehead', row: null, delay: 5600 },
                { type: 'conehead', row: null, delay: 5800 },
                { type: 'conehead', row: null, delay: 6000 },
                { type: 'conehead', row: null, delay: 6200 },
                { type: 'conehead', row: null, delay: 6400 },
                { type: 'conehead', row: null, delay: 6600 },
                { type: 'conehead', row: null, delay: 6800 },
                { type: 'conehead', row: null, delay: 7000 },
                { type: 'conehead', row: null, delay: 7200 },
                { type: 'conehead', row: null, delay: 7400 },
                { type: 'conehead', row: null, delay: 7600 },
                { type: 'conehead', row: null, delay: 7800 },
                { type: 'basic', row: null, delay: 8000 },
                { type: 'basic', row: null, delay: 8200 },
                { type: 'basic', row: null, delay: 8400 },
                { type: 'basic', row: null, delay: 8600 },
                { type: 'polevaulting', row: null, delay: 8800 },
                { type: 'polevaulting', row: null, delay: 9000 },
                { type: 'polevaulting', row: null, delay: 9200 },
                { type: 'polevaulting', row: null, delay: 9400 },
                { type: 'polevaulting', row: null, delay: 9600 },
                { type: 'polevaulting', row: null, delay: 9800 },
                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'polevaulting', row: null, delay: 10200 },
                { type: 'polevaulting', row: null, delay: 10400 },
                { type: 'polevaulting', row: null, delay: 10600 },
            ],
        },
    ],
};
