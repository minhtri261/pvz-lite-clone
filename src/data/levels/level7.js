'use strict';
// ══════════════════════════════════════════════════════════════
//  level7.js — Màn 7: Bucket Zombie và Repeater
//  - 5 hàng đầy đủ
//  - Mở khóa Repeater (bắn 2 đậu mỗi lần, giá 200☀)
//  - Bucket Zombie (1100 HP tổng): khó nhất game
//  - 4 đợt (wave)
//  Chiến thuật:
//    - Repeater giúp tăng gấp đôi sát thương, rất hiệu quả để xử lý Bucket Zombie.
//    - Cần ưu tiên tiêu diệt Pole Vaulter và Conehead trước, sau đó mới đến Bucket.
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_7 = {
    id: 7,
    title:    'Level 7 Complete!',
    subtitle: 'Watch out for Bucket Zombies! The final level awaits!',
    newPlant:  'Repeater',
    newZombie: 'Bucket Zombie',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine', 'sunshooter', 'repeater'],
    startingSun: 150,
    waves: [
        {
            // Wave 1 — giới thiệu Pole Vaulter lần đầu
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
            // Wave 2 — nhiều zombie hơn, giới thiệu Bucket Zombie
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },

                { type: 'bucket', row: null, delay: 10000 },

                { type: 'bucket', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },
                { type: 'basic', row: null, delay: 31500 },

                { type: 'bucket', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 41000 },

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
                { type: 'bucket', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2500 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'bucket', row: null, delay: 3500 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4500 },
            ],
        },
    ],
};
