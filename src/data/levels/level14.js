'use strict';
// ══════════════════════════════════════════════════════════════
//  level14.js — Màn 14: ANCIENT EGYPT — Sảnh Đường Pharaoh
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_14 = {
    id: 14,
    isEgypt:  true,
    isNight:  false,
    title:    'Level 14 Complete!',
    subtitle: 'The Pharaoh guards his treasure... only one remains!',
    newPlant:  'grave buster',
    newZombie: 'tomb raiser',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'chomper', 'puffshroom', 'fumeshroom', 'icelettuce', 'gravebuster'],
    startingSun: 150,
    // 3 lăng mộ — áp lực từ 3 hàng, triệu hồi zombie mạnh hơn
    tombs: [
        { col: 8, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 8, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 7, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 9, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 8, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 8, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 6, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
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
                { type: 'basic', row: null, delay: 40500 },

                //3
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60200 },

                //4
                { type: 'basic', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80200 },
                { type: 'basic', row: null, delay: 80400 },
                { type: 'basic', row: null, delay: 80600 },

                //5
                { type: 'basic', row: null, delay: 100000 },
                { type: 'conehead', row: null, delay: 100200 },
                { type: 'basic', row: null, delay: 100400 },
                { type: 'basic', row: null, delay: 100600 },
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
                //Độ khó 6
                { type: 'tombraiser',    row: null, delay: 0 },
                { type: 'basic',    row: null, delay: 200 },
                { type: 'basic',    row: null, delay: 400 },
                { type: 'basic',    row: null, delay: 600 },

                //7
                { type: 'tombraiser', row: null, delay: 10000 },
                { type: 'conehead',   row: null, delay: 10200 },
                { type: 'conehead',   row: null, delay: 10400 },

                //8
                { type: 'tombraiser',  row: null, delay: 20000 },
                { type: 'conehead',    row: null, delay: 20200 },
                { type: 'conehead',    row: null, delay: 20400 },
                { type: 'basic',    row: null, delay: 20600 },

                //9
                { type: 'bucket',    row: null, delay: 30000 },
                { type: 'conehead',  row: null, delay: 30200 },
                { type: 'conehead',  row: null, delay: 30400 },
                { type: 'basic',     row: null, delay: 30600 },

                //10
                { type: 'bucket',    row: null, delay: 40000 },
                { type: 'bucket',     row: null, delay: 40200 },
                { type: 'conehead',       row: null, delay: 40400 },

                //11
                { type: 'tombraiser', row: null, delay: 50000 },
                { type: 'bucket',    row: null, delay: 50200 },
                { type: 'basic',    row: null, delay: 50400 },
                { type: 'basic',     row: null, delay: 50600 },
                { type: 'basic',     row: null, delay: 50800 },
                { type: 'basic',     row: null, delay: 51000 },

                //12
                { type: 'bucket',    row: null, delay: 60000 },
                { type: 'tombraiser',   row: null, delay: 60200 },
                { type: 'conehead',     row: null, delay: 60400 },
                { type: 'conehead', row: null, delay: 60600 },
                { type: 'basic', row: null, delay: 60800 },
                
                //13
                { type: 'bucket',    row: null, delay: 70000 },
                { type: 'tombraiser',   row: null, delay: 70200 },
                { type: 'conehead',     row: null, delay: 70400 },
                { type: 'conehead', row: null, delay: 70600 },
                { type: 'conehead', row: null, delay: 70800 },
            ],
            surge: [
                //28 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'bucket', row: null, delay: 1000 },
                { type: 'bucket', row: null, delay: 1200 },
                { type: 'bucket', row: null, delay: 1400 },
                { type: 'bucket', row: null, delay: 1600 },
                { type: 'bucket', row: null, delay: 1800 },
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
                { type: 'conehead', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4200 },
                { type: 'basic', row: null, delay: 4400 },
                { type: 'basic', row: null, delay: 4600 },
                { type: 'basic', row: null, delay: 4800 },
                { type: 'basic', row: null, delay: 5000 },
                { type: 'basic', row: null, delay: 5200 },
                { type: 'tombraiser', row: null, delay: 5400 },
                { type: 'tombraiser', row: null, delay: 5600 },
                { type: 'tombraiser', row: null, delay: 5800 },
                { type: 'tombraiser', row: null, delay: 6000 },
                { type: 'tombraiser', row: null, delay: 6200 },
            ],
        },
    ],
};
