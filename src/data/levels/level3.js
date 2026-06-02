'use strict';
// ══════════════════════════════════════════════════════════════
//  level3.js — Màn 3: Sân đầy đủ, Conehead xuất hiện
//  - Vẫn chỉ 3 hàng hoạt động
//  - Mở khóa Wall-nut (chặn zombie chậm lại)
//  - Conehead Zombie (đội nón giao thông, máu cao hơn gấp đôi)
//  - 2 đợt (wave), càng về sau càng nhiều Conehead
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_3 = {
    id: 3,
    title:    'Level 3 Complete!',
    subtitle: 'Coneheads defeated! Cherry Bomb next!',
    newPlant:  'Wall-nut',
    newZombie: 'Conehead Zombie',
    activeRows:      [1, 2, 3],
    availablePlants: ['sunflower', 'peashooter', 'wallnut'],
    startingSun: 150,
    waves: [
        {
            // Màn 3 vẫn có 2 wave, nhưng sẽ lần đầu tiên có Conehead
            // Wave 1 — Chưa có Conehead nào. Dễ dàng để người chơi làm quen với Wall-nut.
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
            // Wave 2 — Conehead bắt đầu xuất hiện trong scout
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'basic', row: null, delay: 1000 },

                { type: 'conehead', row: null, delay: 10000 },

                { type: 'conehead', row: null, delay: 20000 },

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
                { type: 'conehead', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },

            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'basic',    row: null, delay: 1500 },
                { type: 'basic',    row: null, delay: 2000 },
                { type: 'basic',    row: null, delay: 2500 },
                { type: 'basic',    row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3500 },
                { type: 'basic',    row: null, delay: 4000 },
                { type: 'basic',    row: null, delay: 4500 },
                { type: 'conehead', row: null, delay: 5000 },
            ],
        },
    ],
};
