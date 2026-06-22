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
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic', row: null, delay: 0 },

                { type: 'basic', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },

                { type: 'conehead', row: null, delay: 60000 },

                { type: 'conehead', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80500 },

                { type: 'basic', row: null, delay: 100000 },
                { type: 'conehead', row: null, delay: 100500 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'conehead', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },

                { type: 'polevaulting', row: null, delay: 10000 },

                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20500 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 31000 },

                { type: 'polevaulting', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },

                { type: 'conehead', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50500 },

                { type: 'polevaulting', row: null, delay: 60000 },
                { type: 'conehead', row: null, delay: 60500 },
                { type: 'basic', row: null, delay: 61000 },

                { type: 'conehead', row: null, delay: 70000 },
                { type: 'conehead', row: null, delay: 70500 },
                { type: 'basic', row: null, delay: 71000 },
                { type: 'basic', row: null, delay: 71500 },
            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'basic',    row: null, delay: 1500 },
                { type: 'basic',    row: null, delay: 2000 },
                { type: 'polevaulting',    row: null, delay: 2500 },
                { type: 'conehead',    row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic',    row: null, delay: 4000 },
                { type: 'conehead',    row: null, delay: 4500 },
                { type: 'polevaulting', row: null, delay: 5000 },
                { type: 'basic',    row: null, delay: 5500 },
                { type: 'basic',    row: null, delay: 6000 },
                { type: 'basic',    row: null, delay: 6500 },
                { type: 'conehead', row: null, delay: 7000 },
                { type: 'basic',    row: null, delay: 7500 },
            ],
        },
    ],
};
