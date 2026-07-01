'use strict';
// ══════════════════════════════════════════════════════════════
//  level2.js — Màn 2: 
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_2 = {
    id: 2,
    title:    'Level 2 Complete!',
    subtitle: 'Conehead Zombies are coming!',
    newPlant:  'wallnut',
    newZombie: 'Conehead Zombie',
    activeRows:      [0, 1, 2, 3, 4], // full 5 hàng
    availablePlants: ['sunflower', 'peashooter', 'wallnut'],
    startingSun: 150,
    waves: [
        {
            // Màn 2 lần đầu có 2 wave
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.2s, tăng dần đều
            scouts: [
                // Độ khó 1
                { type: 'basic', row: null, delay: 0 },

                //1
                { type: 'basic', row: null, delay: 20000 },

                //2
                { type: 'conehead', row: null, delay: 40000 }, //Lần đầu xuất hiện conehead

                //2
                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60200 },

                //3
                { type: 'conehead', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80200 },

                //4
                { type: 'basic', row: null, delay: 100000 },
                { type: 'basic', row: null, delay: 100200 },
                { type: 'basic', row: null, delay: 100400 },
                { type: 'basic', row: null, delay: 100600 },
            ],
            surge: [
                //12 Zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },   
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1200 },
                { type: 'conehead', row: null, delay: 1400 },
                { type: 'basic', row: null, delay: 1600 },
                { type: 'basic', row: null, delay: 1800 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2200 },
                { type: 'basic', row: null, delay: 2400 },
                { type: 'basic', row: null, delay: 2600 },
                { type: 'basic', row: null, delay: 2800 },
                { type: 'basic', row: null, delay: 3000 },
            ],
        },
        {
            scouts: [
                //Độ khó 5
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 200 },
                { type: 'basic', row: null, delay: 400 },
                { type: 'basic', row: null, delay: 600 },
                { type: 'basic', row: null, delay: 800 },

                //6
                { type: 'conehead', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10200 },
                { type: 'basic', row: null, delay: 10400 },
                { type: 'basic', row: null, delay: 10600 },
                { type: 'basic', row: null, delay: 10800 },

                //7
                { type: 'conehead', row: null, delay: 20000 },
                { type: 'conehead', row: null, delay: 20200 },
                { type: 'basic', row: null, delay: 20400 },
                { type: 'basic', row: null, delay: 20600 },
                { type: 'basic', row: null, delay: 20800 },

                //8
                { type: 'conehead', row: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 30200 },
                { type: 'basic', row: null, delay: 30400 },
                { type: 'basic', row: null, delay: 30600 },
                { type: 'basic', row: null, delay: 30800 },
                { type: 'basic', row: null, delay: 31000 },

                //9
                { type: 'conehead', row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40200 },
                { type: 'conehead', row: null, delay: 40400 },
                { type: 'basic', row: null, delay: 40600 },
                { type: 'basic', row: null, delay: 40800 },
                { type: 'basic', row: null, delay: 41000 },

                //10
                { type: 'conehead', row: null, delay: 50000 },
                { type: 'basic', row: null, delay: 50200 },
                { type: 'basic', row: null, delay: 50400 },
                { type: 'basic', row: null, delay: 50600 },
                { type: 'basic', row: null, delay: 50800 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 51200 },
                { type: 'basic', row: null, delay: 51400 },
                { type: 'basic', row: null, delay: 51600 },

                //11
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60200 },
                { type: 'conehead', row: null, delay: 60400 },
                { type: 'conehead', row: null, delay: 60600 },
                { type: 'conehead', row: null, delay: 60800 },
                { type: 'basic', row: null, delay: 61000 },

                //12
                { type: 'conehead', row: null, delay: 70000 },
                { type: 'conehead', row: null, delay: 70200 },
                { type: 'conehead', row: null, delay: 70400 },
                { type: 'basic', row: null, delay: 70600 },
                { type: 'basic', row: null, delay: 70800 },
                { type: 'basic', row: null, delay: 71000 },
                { type: 'basic', row: null, delay: 71200 },
                { type: 'basic', row: null, delay: 71400 },
                { type: 'basic', row: null, delay: 71600 },
            ],
            surge: [
                //24 zombies xuất hiện
                { type: 'flag', row: null, delay: 0 },
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
                { type: 'basic', row: null, delay: 4800 },
                { type: 'basic', row: null, delay: 5000 },
                { type: 'basic', row: null, delay: 5200 },
                { type: 'basic', row: null, delay: 5400 },
            ],
        },
    ],
};
