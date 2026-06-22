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
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine', 'puffshroom', 'chomper'],
    startingSun: 150,
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic', row: null, delay: 0 },

                { type: 'basic', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },

                { type: 'conehead', row: null, delay: 60000 },

                { type: 'conehead', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80500 },

                { type: 'newspaper', row: null, delay: 100000 },
                { type: 'basic', row: null, delay: 100500 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'newspaper', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'conehead', row: null, delay: 4500 },
                { type: 'basic', row: null, delay: 5000 },
                { type: 'newspaper', row: null, delay: 5500 },
                { type: 'basic', row: null, delay: 6000 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'conehead',    row: null, delay: 0 },

                { type: 'basic',       row: null, delay: 10000 },
                { type: 'basic',       row: null, delay: 10500 },

                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'basic',    row: null, delay: 20500 },

                { type: 'basic',       row: null, delay: 30000 },
                { type: 'polevaulting',    row: null, delay: 30500 },

                { type: 'newspaper',    row: null, delay: 40000 },
                { type: 'polevaulting', row: null, delay: 40500 },

                { type: 'newspaper',    row: null, delay: 50000 },
                { type: 'conehead',    row: null, delay: 50500 },

                { type: 'polevaulting', row: null, delay: 60000 },
                { type: 'conehead',    row: null, delay: 60500 },
                { type: 'basic',    row: null, delay: 61000 },

                { type: 'basic',       row: null, delay: 70000 },
                { type: 'conehead',    row: null, delay: 70500 },
                { type: 'polevaulting', row: null, delay: 71000 },
                { type: 'basic',       row: null, delay: 71500 },

                { type: 'newspaper',    row: null, delay: 80000 },
                { type: 'conehead',    row: null, delay: 80500 },
                { type: 'polevaulting', row: null, delay: 81000 },
                { type: 'basic',       row: null, delay: 81500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'polevaulting',    row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'basic',       row: null, delay: 2000 },
                { type: 'polevaulting',    row: null, delay: 2500 },
                { type: 'conehead',     row: null, delay: 3000 },
                { type: 'newspaper', row: null, delay: 3500 },
                { type: 'basic',       row: null, delay: 4000 },
                { type: 'polevaulting',    row: null, delay: 4500 },
                { type: 'conehead',     row: null, delay: 5000 },
                { type: 'newspaper', row: null, delay: 5500 },
                { type: 'basic',       row: null, delay: 6000 },
            ],
        },
        {
            // Wave 3 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'brickhead', row: null, delay: 0 },

                { type: 'conehead',     row: null, delay: 10000 },
                { type: 'polevaulting', row: null, delay: 10500 },

                { type: 'bucket',       row: null, delay: 20000 },
                { type: 'basic',     row: null, delay: 20500 },
                { type: 'basic', row: null, delay: 21000 },

                { type: 'bucket',       row: null, delay: 30000 },
                { type: 'polevaulting', row: null, delay: 30500 },
                { type: 'conehead',     row: null, delay: 31000 },

                { type: 'conehead',     row: null, delay: 40000 },
                { type: 'bucket',       row: null, delay: 40500 },
                { type: 'polevaulting', row: null, delay: 41000 },

                { type: 'brickhead',       row: null, delay: 50000 },
                { type: 'conehead',     row: null, delay: 50500 },
                { type: 'polevaulting', row: null, delay: 51000 },

                { type: 'polevaulting', row: null, delay: 60000 },
                { type: 'bucket',       row: null, delay: 60500 },
                { type: 'conehead',     row: null, delay: 61000 },
                { type: 'bucket',       row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'conehead',         row: null, delay: 1000 },
                { type: 'basic',    row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'bucket',       row: null, delay: 2500 },
                { type: 'conehead',    row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3500 },
                { type: 'bucket',       row: null, delay: 4000 },
                { type: 'conehead',    row: null, delay: 4500 },
                { type: 'polevaulting', row: null, delay: 5000 },
                { type: 'bucket',       row: null, delay: 5500 },
                { type: 'basic',    row: null, delay: 6000 },
                { type: 'polevaulting', row: null, delay: 6500 },
                { type: 'bucket',       row: null, delay: 7000 },
                { type: 'conehead',    row: null, delay: 7500 },
                { type: 'brickhead', row: null, delay: 8000 },
                { type: 'basic',       row: null, delay: 8500 },
                { type: 'conehead',    row: null, delay: 9000 },
                { type: 'polevaulting', row: null, delay: 9500 },
                { type: 'basic',       row: null, delay: 10000 },
                { type: 'brickhead',       row: null, delay: 10500 },
                { type: 'basic',    row: null, delay: 11000 },
                { type: 'polevaulting', row: null, delay: 11500 },
                { type: 'basic',       row: null, delay: 12000 },
            ],
        },
    ],
};
