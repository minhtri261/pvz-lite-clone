'use strict';
// ══════════════════════════════════════════════════════════════
//  level6.js — Màn 6 (CUỐI): Đội Xô Thép + Snow Pea
//  - 5 hàng, đầy đủ 6 loại cây
//  - Mở khóa Snow Pea (làm chậm zombie 50% trong 3 giây)
//  - Bucket Zombie (1100 HP tổng): khó nhất game
//  - 4 đợt ngày càng dữ dội
//
//  Chiến thuật:
//    Snow Pea làm chậm Bucket → Peashooter có thêm 2× thời gian bắn
//    Potato Mine ở hàng đầu để đón Bucket đang bị Snow Pea làm chậm
//    Cherry Bomb xử lý nhóm Bucket trong surge
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_6 = {
    id: 6,
    title:    'Victory!',
    subtitle: 'You saved the garden — all 6 levels cleared!',
    newPlant:  'Snow Pea',
    newZombie: 'Bucket Zombie',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine', 'snowpea'],
    startingSun: 150,
    waves: [
        // Màn 6 sẽ lần đầu có 3 Wave
        // Wave 1 - Lần đầu xuất hiện ngày conhead.
        {
            scouts: [
                { type: 'basic',    row: null, delay: 0 },
                { type: 'basic',    row: null, delay: 10000 },
                { type: 'basic',    row: null, delay: 20000 },
                { type: 'conehead',    row: null, delay: 30000 },
                { type: 'basic',    row: null, delay: 40000 },
                { type: 'basic',    row: null, delay: 40500 },
            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'basic',    row: null, delay: 1000 },
                { type: 'basic',    row: null, delay: 1500 },
                { type: 'basic',    row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 3000 },
                { type: 'basic',    row: null, delay: 3500 },
            ],
        },
        {
            // Wave 2 — conehead chiếm đa số scout
            scouts: [
                { type: 'basic',    row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 500 },
                { type: 'basic',   row: null, delay: 10000 }, 
                { type: 'basic',   row: null, delay: 10500 }, 
                { type: 'basic',   row: null, delay: 11000 }, 

                { type: 'basic',    row: null, delay: 20000 },
                { type: 'conehead', row: null, delay: 20500 },
                { type: 'basic',    row: null, delay: 21000 },
                { type: 'basic',   row: null, delay: 30000 }, 
                { type: 'basic',   row: null, delay: 30500 }, 
                { type: 'basic',   row: null, delay: 31000 }, 
                { type: 'basic',   row: null, delay: 31500 }, 
                { type: 'basic',   row: null, delay: 32000 }, 
            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'basic',   row: null, delay: 1000 }, 
                { type: 'basic',   row: null, delay: 1500 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'basic',    row: null, delay: 2500 },
                { type: 'conehead',   row: null, delay: 3000 },
                { type: 'conehead',   row: null, delay: 3500 },
                { type: 'basic',   row: null, delay: 4000 },
                { type: 'basic',   row: null, delay: 4500 },
            ],
        },
        {
            // Wave 3 — 2 Flag + Bucket dày đặc
            scouts: [
                { type: 'bucket',   row: null, delay: 0 }, // lần đầu gặp Bucket
                { type: 'conehead', row: null, delay: 10000 },
                { type: 'basic',   row: null, delay: 10500 }, 
                { type: 'basic',    row: null, delay: 11000 },
                { type: 'basic',   row: null, delay: 11500 },
                { type: 'conehead', row: null, delay: 20000 },
                { type: 'conehead', row: null, delay: 20500 },

                { type: 'bucket',   row: null, delay: 30000 },
                { type: 'basic',    row: null, delay: 30500 },
                { type: 'basic',   row: null, delay: 40000 }, 
                { type: 'conehead', row: null, delay: 40500 }, 
                { type: 'basic',   row: null, delay: 41000 }, 
                { type: 'conehead', row: null, delay: 41500 }, 
                { type: 'basic',   row: null, delay: 42000 },                
            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'basic',     row: null, delay: 1000 },
                { type: 'bucket',   row: null, delay: 1500 },
                { type: 'conehead',   row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2500 },
                { type: 'conehead',   row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic',     row: null, delay: 4000 },
                { type: 'basic',     row: null, delay: 4500 },
                { type: 'basic',     row: null, delay: 5000 },
                { type: 'basic',     row: null, delay: 5500 },
            ],
        },
    ],
};
