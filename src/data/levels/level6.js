'use strict';
// ══════════════════════════════════════════════════════════════
//  level6.js — Màn 6 : Màn tối với Newspaper Zombie
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_6 = {
    id: 6,
    isNight:   true,     // Màn tối — không có sun trời, sun plants chậm hơn
    title:    'Level 6 Complete!',
    subtitle: 'Night falls, but the fight continues! Get ready for tougher zombies!',
    newPlant:  'puffshroom',
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine', 'puffshroom', 'chomper'],
    startingSun: 150,  
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.2s, tăng dần đều
            scouts: [
                //Độ khó 1
                { type: 'basic', row: null, delay: 0 },

                //1
                { type: 'basic', row: null, delay: 20000 },

                //2
                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40200 },

                //2
                { type: 'conehead', row: null, delay: 60000 },

                //3
                { type: 'basic', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80200 },
                { type: 'basic', row: null, delay: 80400 },

                //4
                { type: 'conehead', row: null, delay: 100000 },
                { type: 'basic', row: null, delay: 100200 },
                { type: 'basic', row: null, delay: 100400 },
            ],
            surge: [
                //13 Zombies xuất hiện
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
                { type: 'basic', row: null, delay: 3200 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.2s
            scouts: [
                //Độ khó 5
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 200 },
                { type: 'basic', row: null, delay: 400 },
                { type: 'basic', row: null, delay: 600 },
                { type: 'basic', row: null, delay: 800 },

                //6
                { type: 'conehead', row: null, delay: 10000 },
                { type: 'conehead', row: null, delay: 10200 },
                { type: 'basic', row: null, delay: 10400 },
                { type: 'basic', row: null, delay: 10600 },

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
                { type: 'conehead', row: null, delay: 50200 },
                { type: 'conehead', row: null, delay: 50400 },
                { type: 'conehead', row: null, delay: 50600 },
                { type: 'conehead', row: null, delay: 50800 },

                //11
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60200 },
                { type: 'conehead', row: null, delay: 60400 },
                { type: 'conehead', row: null, delay: 60600 },
                { type: 'basic', row: null, delay: 60800 },
                { type: 'basic', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61200 },

                //12
                { type: 'conehead', row: null, delay: 70000 },
                { type: 'conehead', row: null, delay: 70200 },
                { type: 'conehead', row: null, delay: 70400 },
                { type: 'conehead', row: null, delay: 70600 },
                { type: 'conehead', row: null, delay: 70800 },
                { type: 'conehead', row: null, delay: 71000 },
            ],
            surge: [
                //26 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1200 },
                { type: 'conehead', row: null, delay: 1400 },
                { type: 'conehead', row: null, delay: 1600 },
                { type: 'conehead', row: null, delay: 1800 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2200 },
                { type: 'conehead', row: null, delay: 2400 },
                { type: 'basic', row: null, delay: 2600 },
                { type: 'basic', row: null, delay: 2800 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3200 },
                { type: 'basic', row: null, delay: 3400 },
                { type: 'basic', row: null, delay: 3600 },
                { type: 'basic', row: null, delay: 3800 },
                { type: 'conehead', row: null, delay: 4000 },
                { type: 'conehead', row: null, delay: 4200 },
                { type: 'conehead', row: null, delay: 4400 },
                { type: 'conehead', row: null, delay: 4600 },
                { type: 'conehead', row: null, delay: 4800 },
                { type: 'conehead', row: null, delay: 5000 },
                { type: 'conehead', row: null, delay: 5200 },
                { type: 'conehead', row: null, delay: 5400 },
                { type: 'conehead', row: null, delay: 5600 },
                { type: 'conehead', row: null, delay: 5800 },
            ],
        },
    ],
};
