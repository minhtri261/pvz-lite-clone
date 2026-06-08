'use strict';
// ══════════════════════════════════════════════════════════════
//  level10.js — Màn 10: CUỐI — Brick by Brick
//  - Đầy đủ 11 loại cây
//  - Brickhead Zombie (1700 HP) xuất hiện từ wave 2
//  - 5 đợt — khó nhất trong game
//
//  Chiến thuật cuối:
//    Brickhead rất chậm → Snow Pea + Peanut xử lý hiệu quả
//    Pole Vaulter nhảy qua hàng đầu → đặt Peanut ở hàng 2
//    Cherry Bomb xử lý nhóm Brickhead đang tụ lại
//    Twin Sunflower + Sunflower đảm bảo kinh tế ổn định sớm
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_10 = {
    id: 10,
    isNight:   true,
    title:    'PvZ Custom — All Levels Cleared!',
    subtitle: 'You are the ultimate Plant Master! All 10 levels defeated!',
    newPlant:  'twinsun',
    newZombie: 'Brickhead Zombie',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine', 'puffshroom', 'Chomper'],
    startingSun: 150,
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic', row: null, delay: 0 },

                { type: 'basic', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },

                { type: 'basic', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60500 },

                { type: 'newspaper', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80500 },
                { type: 'basic', row: null, delay: 81000 },

                { type: 'conehead', row: null, delay: 100000 },
                { type: 'newspaper', row: null, delay: 100500 },
                { type: 'basic', row: null, delay: 101000 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'newspaper', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3500 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'conehead',    row: null, delay: 0 },

                { type: 'basic',       row: null, delay: 10000 },
                { type: 'basic',       row: null, delay: 10500 },

                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'conehead',    row: null, delay: 20500 },

                { type: 'basic',       row: null, delay: 30000 },
                { type: 'newspaper',    row: null, delay: 30500 },
                { type: 'basic',       row: null, delay: 31000 },

                { type: 'conehead',    row: null, delay: 40000 },
                { type: 'polevaulting', row: null, delay: 40500 },
                { type: 'basic',       row: null, delay: 41000 },

                { type: 'newspaper',    row: null, delay: 50000 },
                { type: 'conehead',    row: null, delay: 50500 },
                { type: 'polevaulting', row: null, delay: 51000 },

                { type: 'polevaulting', row: null, delay: 60000 },
                { type: 'conehead',    row: null, delay: 60500 },
                { type: 'newspaper',    row: null, delay: 61000 },
                { type: 'basic',       row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'polevaulting',    row: null, delay: 700 },
                { type: 'basic', row: null, delay: 1400 },
                { type: 'basic',       row: null, delay: 2100 },
                { type: 'polevaulting',    row: null, delay: 2800 },
                { type: 'conehead',     row: null, delay: 3500 },
                { type: 'newspaper', row: null, delay: 4200 },
            ],
        },
        {
            // Wave 3 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'polevaulting', row: null, delay: 0 },
                { type: 'bucket',       row: null, delay: 500 },

                { type: 'conehead',     row: null, delay: 10000 },
                { type: 'polevaulting', row: null, delay: 10500 },

                { type: 'bucket',       row: null, delay: 20000 },
                { type: 'conehead',     row: null, delay: 20500 },
                { type: 'polevaulting', row: null, delay: 21000 },

                { type: 'bucket',       row: null, delay: 30000 },
                { type: 'polevaulting', row: null, delay: 30500 },
                { type: 'conehead',     row: null, delay: 31000 },

                { type: 'conehead',     row: null, delay: 40000 },
                { type: 'bucket',       row: null, delay: 40500 },
                { type: 'polevaulting', row: null, delay: 41000 },

                { type: 'bucket',       row: null, delay: 50000 },
                { type: 'conehead',     row: null, delay: 50500 },
                { type: 'polevaulting', row: null, delay: 51000 },
                { type: 'bucket',       row: null, delay: 51500 },

                { type: 'polevaulting', row: null, delay: 60000 },
                { type: 'bucket',       row: null, delay: 60500 },
                { type: 'conehead',     row: null, delay: 61000 },
                { type: 'bucket',       row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'conehead',         row: null, delay: 700 },
                { type: 'basic',    row: null, delay: 1200 },
                { type: 'polevaulting', row: null, delay: 1800 },
                { type: 'bucket',       row: null, delay: 2400 },
                { type: 'conehead',    row: null, delay: 3000 },
                { type: 'polevaulting', row: null, delay: 3600 },
                { type: 'bucket',       row: null, delay: 4200 },
            ],
        },
        {
            // Wave 4 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều (nặng nhất màn)
            scouts: [
                { type: 'brickhead',    row: null, delay: 0 },   // lần đầu gặp!
                { type: 'conehead',    row: null, delay: 500 },

                { type: 'polevaulting', row: null, delay: 10000 },
                { type: 'bucket',       row: null, delay: 10500 },

                { type: 'brickhead',    row: null, delay: 20000 },
                { type: 'conehead',    row: null, delay: 20500 },
                { type: 'polevaulting', row: null, delay: 21000 },

                { type: 'bucket',       row: null, delay: 30000 },
                { type: 'brickhead',    row: null, delay: 30500 },
                { type: 'conehead',    row: null, delay: 31000 },

                { type: 'newspaper',    row: null, delay: 40000 },
                { type: 'polevaulting', row: null, delay: 40500 },
                { type: 'brickhead',    row: null, delay: 41000 },
                { type: 'bucket',       row: null, delay: 41500 },

                { type: 'conehead',    row: null, delay: 50000 },
                { type: 'brickhead',    row: null, delay: 50500 },
                { type: 'polevaulting', row: null, delay: 51000 },
                { type: 'bucket',       row: null, delay: 51500 },

                { type: 'brickhead',    row: null, delay: 60000 },
                { type: 'newspaper',    row: null, delay: 60500 },
                { type: 'conehead',    row: null, delay: 61000 },
                { type: 'polevaulting', row: null, delay: 61500 },

                { type: 'bucket',       row: null, delay: 70000 },
                { type: 'brickhead',    row: null, delay: 70500 },
                { type: 'newspaper',    row: null, delay: 71000 },
                { type: 'brickhead',    row: null, delay: 71500 },
                { type: 'conehead',    row: null, delay: 72000 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'conehead',         row: null, delay: 600 },
                { type: 'conehead',         row: null, delay: 1200 },
                { type: 'brickhead',    row: null, delay: 1700 },
                { type: 'polevaulting', row: null, delay: 2200 },
                { type: 'bucket',       row: null, delay: 2700 },
                { type: 'conehead',    row: null, delay: 3200 },
                { type: 'polevaulting', row: null, delay: 3700 },
                { type: 'bucket',       row: null, delay: 4200 },
                { type: 'brickhead',    row: null, delay: 4700 },
                { type: 'newspaper',    row: null, delay: 5200 },
                { type: 'newspaper',    row: null, delay: 5700 },
            ],
        },
    ],
};
