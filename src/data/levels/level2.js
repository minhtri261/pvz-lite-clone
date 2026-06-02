'use strict';
// ══════════════════════════════════════════════════════════════
//  level2.js — Màn 2: Mở rộng 3 hàng
//  - 3 hàng hoạt động (1, 2, 3 — hàng 0 và 4 vẫn tối)
//  - Mở khóa Sunflower (cần để tạo ánh nắng)
//  - Xuất hiện Flag Zombie dẫn đầu mỗi làn sóng lớn
//  - 2 đợt (wave)
//
//  row: null → hệ thống tự chọn ngẫu nhiên trong activeRows
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_2 = {
    id: 2,
    title:    'Level 2 Complete!',
    subtitle: 'They brought a flag… and Wall-nut is coming!',
    newPlant:  'Sunflower',
    newZombie: 'Flag Zombie',
    activeRows:      [1, 2, 3],
    availablePlants: ['sunflower', 'peashooter'],
    startingSun: 150,
    waves: [
        {
            // Màn 2 lần đầu có 2 wave
            // Wave 1 — nhẹ nhàng, có flag zombie dẫn đầu
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 15000 },
                { type: 'basic', row: null, delay: 30000 },

                { type: 'basic', row: null, delay: 45000 },
                { type: 'basic', row: null, delay: 45500 },

                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },

                { type: 'basic', row: null, delay: 75000 },
                { type: 'basic', row: null, delay: 75500 },
                { type: 'basic', row: null, delay: 76000 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },    // flag zombie đi trước
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
            ],
        },
        {
            // Wave 2 — nhiều zombie hơn, vẫn có flag zombie dẫn đầu
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },

                { type: 'basic', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10500 },
                { type: 'basic', row: null, delay: 11000 },

                { type: 'basic', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },
                { type: 'basic', row: null, delay: 41500 },
                { type: 'basic', row: null, delay: 42000 },

                { type: 'basic', row: null, delay: 50000 },
                { type: 'basic', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },
            ],
            surge: [
                { type: 'flag',  row: null, delay: 0 },
                { type: 'basic', row: null, delay: 1000 },
                { type: 'basic', row: null, delay: 1500 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
            ],
        },
    ],
};
