'use strict';
// ══════════════════════════════════════════════════════════════
//  level4.js — Màn 4: Potato Mine xuất hiện
//  - Mở khóa Potato Mine (đặt bẫy, kích hoạt sau 14s, diệt 1 zombie tức thì)
//  - Zombie: Basic, Conehead, Pole Vaulting
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_4 = {
    id: 4,
    title:    'Level 4 Complete!',
    subtitle: 'Potato Mine is here to help! More zombies are coming!',
    newPlant:  'Chomper',
    newZombie: 'Buckethead Zombie',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine', 'chomper'],
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
                { type: 'conehead', row: null, delay: 40000 },

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
                { type: 'basic', row: null, delay: 100200 },
                { type: 'basic', row: null, delay: 100400 },
                { type: 'basic', row: null, delay: 100600 },
            ],
            surge: [
                //13 Zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 }, 
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
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.2s
            scouts: [
                //Độ khó 6
                { type: 'conehead', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 200 },
                { type: 'basic', row: null, delay: 400 },
                { type: 'basic', row: null, delay: 600 },
                { type: 'basic', row: null, delay: 800 },

                //7
                { type: 'bucket', row: null, delay: 10000 },  // Lần đầu xuất hiện buckethead zombie
                { type: 'basic', row: null, delay: 10200 },
                { type: 'basic', row: null, delay: 10400 },
                { type: 'basic', row: null, delay: 10600 },

                //8
                { type: 'bucket', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20200 },
                { type: 'basic', row: null, delay: 20400 },
                { type: 'basic', row: null, delay: 20600 },
                { type: 'basic', row: null, delay: 20800 },

                //9
                { type: 'conehead', row: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 30200 },
                { type: 'conehead', row: null, delay: 30400 },
                { type: 'basic', row: null, delay: 30600 },
                { type: 'basic', row: null, delay: 30800 },
                { type: 'basic', row: null, delay: 31000 },

                //10
                { type: 'bucket', row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40200 },
                { type: 'conehead', row: null, delay: 40400 },
                { type: 'basic', row: null, delay: 40600 },
                { type: 'basic', row: null, delay: 40800 },

                //11
                { type: 'bucket', row: null, delay: 50000 },
                { type: 'bucket', row: null, delay: 50200 },
                { type: 'basic', row: null, delay: 50400 },
                { type: 'basic', row: null, delay: 50600 },
                { type: 'basic', row: null, delay: 50800 },

                //12
                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60200 },
                { type: 'basic', row: null, delay: 60400 },
                { type: 'basic', row: null, delay: 60600 },
                { type: 'basic', row: null, delay: 60800 },
                { type: 'basic', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61200 },
                { type: 'basic', row: null, delay: 61400 },
                { type: 'basic', row: null, delay: 61600 },
                { type: 'basic', row: null, delay: 61800 },
                { type: 'basic', row: null, delay: 62000 },
                { type: 'basic', row: null, delay: 62200 },

                //13
                { type: 'conehead', row: null, delay: 70000 },
                { type: 'conehead', row: null, delay: 70200 },
                { type: 'conehead', row: null, delay: 70400 },
                { type: 'conehead', row: null, delay: 70600 },
                { type: 'conehead', row: null, delay: 70800 },
                { type: 'basic', row: null, delay: 71000 },
                { type: 'basic', row: null, delay: 71200 },
                { type: 'basic', row: null, delay: 71400 },
            ],
            surge: [
                //26 Zombies xuất hiện
                { type: 'flag',   row: null, delay: 0 },
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
                { type: 'conehead', row: null, delay: 4200 },
                { type: 'conehead', row: null, delay: 4400 },
                { type: 'conehead', row: null, delay: 4600 },
                { type: 'conehead', row: null, delay: 4800 },
                { type: 'basic', row: null, delay: 5000 },
                { type: 'basic', row: null, delay: 5200 },
                { type: 'basic', row: null, delay: 5400 },
                { type: 'basic', row: null, delay: 5600 },
                { type: 'basic', row: null, delay: 5800 },
            ],
        },
    ],
};
