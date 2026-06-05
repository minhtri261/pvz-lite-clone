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
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine', 'puffshroom'],
    startingSun: 150,
    waves: [
        {
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 15000 },
                { type: 'basic', row: null, delay: 30000 },

                { type: 'basic', row: null, delay: 45000 },
                { type: 'basic', row: null, delay: 45500 },

                { type: 'conehead', row: null, delay: 60000 },

                { type: 'basic', row: null, delay: 75000 },
                { type: 'basic', row: null, delay: 75500 },
                { type: 'basic', row: null, delay: 76000 },

                { type: 'conehead', row: null, delay: 90000 },
                { type: 'basic', row: null, delay: 90500 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3500 },
            ],
        },
        {
            // Wave 2 — BRICKHEAD xuất hiện lần đầu!
            scouts: [
                { type: 'conehead',    row: null, delay: 0 },    
                { type: 'polevaulting', row: null, delay: 12000 },
                { type: 'basic',       row: null, delay: 20000 },
                { type: 'basic',    row: null, delay: 28000 },
                { type: 'polevaulting',     row: null, delay: 33000 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'polevaulting',    row: null, delay: 700 },
                { type: 'basic', row: null, delay: 1400 },
                { type: 'basic',       row: null, delay: 2100 },
                { type: 'polevaulting',    row: null, delay: 2800 },
                { type: 'conehead',     row: null, delay: 3500 },
                { type: 'conehead', row: null, delay: 4200 },
            ],
        },
        {
            // Wave 3 — Brickhead + Bucket combo nguy hiểm
            scouts: [
                { type: 'polevaulting',    row: null, delay: 0 },  
                { type: 'bucket',       row: null, delay: 8000 },
                { type: 'bucket',    row: null, delay: 14000 },
                { type: 'conehead', row: null, delay: 19000 },
                { type: 'conehead',    row: null, delay: 24000 },
                { type: 'bucket',       row: null, delay: 28000 },
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
            // Wave 4 — Rất nặng
            scouts: [
                { type: 'brickhead',    row: null, delay: 0 },  // lần đầu gặp!
                { type: 'conehead',    row: null, delay: 7000 },
                { type: 'polevaulting', row: null, delay: 12000 },
                { type: 'bucket',       row: null, delay: 16000 },
                { type: 'conehead',    row: null, delay: 20000 },
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
            ],
        },
    ],
};
