'use strict';
//  level9.js — Màn 9: Peanut Gallery
const LEVEL_DEF_9 = {
    id: 9,
    isNight:   true,
    title:    'Level 9 Complete!',
    subtitle: 'Almost there — the final level awaits!',
    newPlant:  null,
    newZombie: 'brickhead zombie',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine', 'puffshroom', 'fumeshroom', 'chomper'],
    startingSun: 150,
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
                { type: 'basic', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60200 },

                //4
                { type: 'conehead', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80200 },
                { type: 'basic', row: null, delay: 80400 },

                //5
                { type: 'basic', row: null, delay: 100000 },
                { type: 'basic', row: null, delay: 100200 },
                { type: 'conehead', row: null, delay: 100400 },
                { type: 'basic', row: null, delay: 100600 },
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
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                //Độ khó 6
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 200 },
                { type: 'basic', row: null, delay: 400 },
                { type: 'basic', row: null, delay: 600 },
                { type: 'polevaulting', row: null, delay: 800 },

                //7
                { type: 'basic', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10200 },
                { type: 'basic', row: null, delay: 10400 },
                { type: 'polevaulting', row: null, delay: 10600 },
                { type: 'polevaulting', row: null, delay: 10800 },

                //8
                { type: 'brickhead', row: null, delay: 20000 },  // Lần đầu xuất hiện brickhead zombie

                //9
                { type: 'brickhead', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30200 },

                //10
                { type: 'brickhead', row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40200 },

                //11
                { type: 'conehead', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50200 },
                { type: 'basic', row: null, delay: 50400 },
                { type: 'basic', row: null, delay: 50600 },
                { type: 'basic', row: null, delay: 50800 },
                { type: 'polevaulting', row: null, delay: 51000 },
                { type: 'polevaulting', row: null, delay: 51200 },

                //12
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60200 },
                { type: 'conehead', row: null, delay: 60400 },
                { type: 'conehead', row: null, delay: 60600 },
                { type: 'conehead', row: null, delay: 60800 },
                { type: 'conehead', row: null, delay: 61000 },

                //13
                { type: 'brickhead', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60200 },
                { type: 'conehead', row: null, delay: 60400 },
                { type: 'basic', row: null, delay: 60600 },
            ],
            surge: [
                //30 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'brickhead', row: null, delay: 1000 },
                { type: 'brickhead', row: null, delay: 1200 },
                { type: 'brickhead', row: null, delay: 1400 },
                { type: 'brickhead', row: null, delay: 1600 },
                { type: 'brickhead', row: null, delay: 1800 },
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
    ],
};
