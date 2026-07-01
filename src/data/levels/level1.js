'use strict';
// ══════════════════════════════════════════════════════════════
//  level1.js — Màn 1: Khởi đầu đơn giản
//  - Full 5 hàng (hỗ trợ Fusion ngay từ đầu)
//  - Peashooter + Sunflower
//  - Chỉ có Basic Zombie
//  - 1 đợt (wave)
//
//  row: null → hệ thống tự chọn hàng ít zombie nhất (_pickSpawnRow)
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_1 = {
    id: 1,
    title:    'Level 1 Complete!',
    subtitle: 'Great start — combine plants for more power!',
    newPlant:  'Peashooter, Sunflower', 
    newZombie: 'Basic Zombie, Flag Zombie',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['peashooter', 'sunflower'],
    startingSun: 150,
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.2s
            scouts: [
                // Độ khó 1
                { type: 'basic', row: null, delay: 0 }, // Lần đầu xuất hiện basic zombie

                //1
                { type: 'basic', row: null, delay: 20000 },

                //2
                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40200 },

                //2
                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60200 },

                //3
                { type: 'basic', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80200 },
                { type: 'basic', row: null, delay: 80400 },

                //4
                { type: 'basic', row: null, delay: 100200 },
                { type: 'basic', row: null, delay: 100400 },
                { type: 'basic', row: null, delay: 100600 },
                { type: 'basic', row: null, delay: 100800 },
            ],
            surge: [
                //12 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },    // lần đầu xuất hiện flag zombie
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1200 },
                { type: 'basic', row: null, delay: 1400 },
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
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.2s
            scouts: [
                //Độ khó 5
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 200 },
                { type: 'basic', row: null, delay: 400 },
                { type: 'basic', row: null, delay: 600 },
                { type: 'basic', row: null, delay: 800 },

                //6
                { type: 'basic', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10200 },
                { type: 'basic', row: null, delay: 10400 },
                { type: 'basic', row: null, delay: 10600 },
                { type: 'basic', row: null, delay: 10800 },
                { type: 'basic', row: null, delay: 11000 },

                //7
                { type: 'basic', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20200 },
                { type: 'basic', row: null, delay: 20400 },
                { type: 'basic', row: null, delay: 20600 },
                { type: 'basic', row: null, delay: 20800 },
                { type: 'basic', row: null, delay: 21000 },
                { type: 'basic', row: null, delay: 21200 },

                //8
                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30200 },
                { type: 'basic', row: null, delay: 30400 },
                { type: 'basic', row: null, delay: 30600 },
                { type: 'basic', row: null, delay: 30800 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31200 },
                { type: 'basic', row: null, delay: 31400 },

                //9
                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40200 },
                { type: 'basic', row: null, delay: 40400 },
                { type: 'basic', row: null, delay: 40600 },
                { type: 'basic', row: null, delay: 40800 },
                { type: 'basic', row: null, delay: 41000 },
                { type: 'basic', row: null, delay: 41200 },
                { type: 'basic', row: null, delay: 41400 },
                { type: 'basic', row: null, delay: 41600 },

                //10
                { type: 'basic', row: null, delay: 50000 },
                { type: 'basic', row: null, delay: 50200 },
                { type: 'basic', row: null, delay: 50400 },
                { type: 'basic', row: null, delay: 50600 },
                { type: 'basic', row: null, delay: 50800 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 51200 },
                { type: 'basic', row: null, delay: 51400 },
                { type: 'basic', row: null, delay: 51600 },
                { type: 'basic', row: null, delay: 51800 },

                //11
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

                //12
                { type: 'basic', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80200 },
                { type: 'basic', row: null, delay: 80400 },
                { type: 'basic', row: null, delay: 80600 },
                { type: 'basic', row: null, delay: 80800 },
                { type: 'basic', row: null, delay: 81000 },
                { type: 'basic', row: null, delay: 81200 },
                { type: 'basic', row: null, delay: 81400 },
                { type: 'basic', row: null, delay: 81600 },
                { type: 'basic', row: null, delay: 81800 },
                { type: 'basic', row: null, delay: 82000 },
                { type: 'basic', row: null, delay: 82200 },
            ],
            surge: [
                //24 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1200 },
                { type: 'basic', row: null, delay: 1400 },
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
