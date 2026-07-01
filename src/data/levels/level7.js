'use strict';
// ══════════════════════════════════════════════════════════════
//  level7.js — Màn 7: 
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_7 = {
    id: 7,
    isNight:   true,
    title:    'Level 7 Complete!',
    subtitle: 'The night gets darker, but you\'re getting stronger! Prepare for the toughest zombies yet!',
    newPlant:  null,
    newZombie: 'newspaper',
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
                //14 Zombies xuất hiện
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
                { type: 'basic', row: null, delay: 3400 },
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
                { type: 'newspaper', row: null, delay: 10000 },  // Lần đầu xuất hiện newspaper zombie
                { type: 'basic', row: null, delay: 10200 },
                { type: 'basic', row: null, delay: 10400 },
                { type: 'basic', row: null, delay: 10600 },

                //7
                { type: 'newspaper', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20200 },
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
                { type: 'newspaper', row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40200 },
                { type: 'basic', row: null, delay: 40400 },
                { type: 'basic', row: null, delay: 40600 },
                { type: 'basic', row: null, delay: 40800 },
                { type: 'basic', row: null, delay: 41000 },

                //10
                { type: 'newspaper', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50200 },
                { type: 'conehead', row: null, delay: 50400 },
                { type: 'conehead', row: null, delay: 50600 },
                { type: 'basic', row: null, delay: 50800 },

                //11
                { type: 'newspaper', row: null, delay: 60000 },
                { type: 'newspaper', row: null, delay: 60200 },
                { type: 'basic', row: null, delay: 60400 },
                { type: 'basic', row: null, delay: 60600 },
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
                { type: 'newspaper', row: null, delay: 1000 },
                { type: 'newspaper', row: null, delay: 1200 },
                { type: 'newspaper', row: null, delay: 1400 },
                { type: 'newspaper', row: null, delay: 1600 },
                { type: 'newspaper', row: null, delay: 1800 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2200 },
                { type: 'basic', row: null, delay: 2400 },
                { type: 'basic', row: null, delay: 2600 },
                { type: 'basic', row: null, delay: 2800 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3200 },
                { type: 'basic', row: null, delay: 3400 },
                { type: 'basic', row: null, delay: 3600 },
                { type: 'basic', row: null, delay: 3800 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'conehead', row: null, delay: 4200 },
                { type: 'conehead', row: null, delay: 4400 },
                { type: 'conehead', row: null, delay: 4600 },
                { type: 'conehead', row: null, delay: 4800 },
                { type: 'conehead', row: null, delay: 5000 },
                { type: 'conehead', row: null, delay: 5200 },
                { type: 'conehead', row: null, delay: 5400 },
                { type: 'conehead', row: null, delay: 5600 },
                { type: 'conehead', row: null, delay: 5800 },
                { type: 'conehead', row: null, delay: 6000 },
            ],
        },
    ],
};
