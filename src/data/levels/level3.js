'use strict';
// ══════════════════════════════════════════════════════════════
//  level3.js — Màn 3: Ppole Vaulting Zombie xuất hiện
//  - Mở khóa Wall-nut (hỗ trợ phòng thủ tốt hơn trước)
//  - Xuất hiện Pole Vaulting Zombie (nhảy qua hàng đầu tiên) → cần quản lý ưu tiên mục tiêu

// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_3 = {
    id: 3,
    title:    'Level 3 Complete!',
    subtitle: 'Wall-nut is here to help! Pole Vaulting Zombie is coming!',
    newPlant:  'Wall-nut',
    newZombie: 'Pole Vaulting Zombie',
    activeRows:      [0, 1, 2, 3, 4], // full 5 hàng
    availablePlants: ['sunflower', 'peashooter', 'wallnut'],
    startingSun: 150,
    waves: [
        {
            // Màn 3 vẫn có 2 wave, nhưng sẽ lần đầu tiên có Conehead
            // Wave 1 
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 40000 },

                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },

                { type: 'conehead', row: null, delay: 75000 },

                { type: 'basic', row: null, delay: 90000 },
                { type: 'basic', row: null, delay: 90500 },
                { type: 'basic', row: null, delay: 91000 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
            ],
        },
        {
            // Wave 2
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },

                { type: 'polevaulting', row: null, delay: 10000 },

                { type: 'polevaulting', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },

                { type: 'conehead', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },
                { type: 'basic', row: null, delay: 41500 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50500 },
                { type: 'conehead', row: null, delay: 51000 },

            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'basic',    row: null, delay: 1500 },
                { type: 'basic',    row: null, delay: 2000 },
                { type: 'polevaulting',    row: null, delay: 2500 },
                { type: 'basic',    row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic',    row: null, delay: 4000 },
                { type: 'basic',    row: null, delay: 4500 },
                { type: 'polevaulting', row: null, delay: 5000 },
            ],
        },
    ],
};
