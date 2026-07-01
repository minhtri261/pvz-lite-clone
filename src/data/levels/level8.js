'use strict';
// ══════════════════════════════════════════════════════════════
//  level8.js — Màn 8: Brickhead Zombie xuất hiện
//  - Mở khóa Brickhead Zombie (mũ gạch, HP rất cao)
//  - Zombie: Basic, Conehead, Brickhead
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_8 = {
    id: 8,
    isNight:   true,
    title:    'Level 8 Complete!',
    subtitle: 'You defended the garden across all 8 levels! Legend!',
    newPlant:  'Fume Shroom',
    newZombie: 'Door Zombie',
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
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60200 },

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
                //14 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
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
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 200 },
                { type: 'basic', row: null, delay: 400 },
                { type: 'basic', row: null, delay: 600 },
                { type: 'basic', row: null, delay: 800 },

                //6
                { type: 'door', row: null, delay: 10000 },  // Lần đầu xuất hiện door zombie
                { type: 'basic', row: null, delay: 10200 },
                { type: 'basic', row: null, delay: 10400 },
                { type: 'basic', row: null, delay: 10600 },

                //7
                { type: 'door', row: null, delay: 20000 },
                { type: 'conehead', row: null, delay: 20200 },
                { type: 'conehead', row: null, delay: 20400 },

                //8
                { type: 'door', row: null, delay: 30000 },
                { type: 'door', row: null, delay: 30200 },
                { type: 'basic', row: null, delay: 30400 },
                { type: 'basic', row: null, delay: 30600 },

                //9
                { type: 'conehead', row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40200 },
                { type: 'conehead', row: null, delay: 40400 },
                { type: 'basic', row: null, delay: 40600 },
                { type: 'conehead', row: null, delay: 40800 },
                { type: 'conehead', row: null, delay: 41000 },

                //10
                { type: 'door', row: null, delay: 50000 },
                { type: 'door', row: null, delay: 50200 },
                { type: 'conehead', row: null, delay: 50400 },
                { type: 'conehead', row: null, delay: 50600 },

                //11
                { type: 'door', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60200 },
                { type: 'basic', row: null, delay: 60400 },
                { type: 'basic', row: null, delay: 60600 },
                { type: 'basic', row: null, delay: 60800 },
                { type: 'basic', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61200 },
                { type: 'basic', row: null, delay: 61400 },
                { type: 'basic', row: null, delay: 61600 },

                //12
                { type: 'door', row: null, delay: 70000 },
                { type: 'door', row: null, delay: 70200 },
                { type: 'door', row: null, delay: 70400 },
                { type: 'basic', row: null, delay: 70600 },
                { type: 'basic', row: null, delay: 70800 },
                { type: 'basic', row: null, delay: 71000 },
            ],
            surge: [
                //28 zombies xuất hiện
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
                { type: 'basic', row: null, delay: 4800 },
                { type: 'basic', row: null, delay: 5000 },
                { type: 'basic', row: null, delay: 5200 },
                { type: 'basic', row: null, delay: 5400 },
                { type: 'basic', row: null, delay: 5600 },
                { type: 'basic', row: null, delay: 5800 },
                { type: 'basic', row: null, delay: 6000 },
            ],
        },
    ],
};
