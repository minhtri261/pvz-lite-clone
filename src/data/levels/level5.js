'use strict';
// ══════════════════════════════════════════════════════════════
//  level5.js — Màn 5: Mìn Khoai Tây
//  - 5 hàng đầy đủ
//  - Mở khóa Potato Mine (đặt bẫy, kích hoạt sau 14s, diệt 1 zombie tức thì)
//  - Zombie: Basic, Flag, Conehead — chưa có Bucket
//  - 3 đợt
//
//  Chiến thuật: Potato Mine rất rẻ (25☀), đặt ở cột đầu để chặn
//  zombie sau khi Wall-nut bị phá. Cần bảo vệ mine đang kích hoạt!
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_5 = {
    id: 5,
    title:    'Level 5 Complete!',
    subtitle: 'Boom! Bucket zombies are coming next!',
    newPlant:  'Potato Mine',
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine'],
    startingSun: 150,
    waves: [
        // Màn 5 sẽ có 5 wave nhưng tăng độ khó đầu game
        // Wave 1 — nhẹ nhàng, chủ yếu để người chơi làm quen với Potato Mine
        {
            scouts: [
                { type: 'basic',    row: null, delay: 0 },
                { type: 'basic',    row: null, delay: 10000 },
                { type: 'basic',    row: null, delay: 20000 },
                { type: 'basic',    row: null, delay: 30000 },
                { type: 'basic',    row: null, delay: 30500 },
                { type: 'basic',    row: null, delay: 40000 },
                { type: 'basic',    row: null, delay: 40500 },
            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'basic',    row: null, delay: 1000 },
                { type: 'basic',    row: null, delay: 1500 },
                { type: 'basic',    row: null, delay: 2000 },
                { type: 'basic',    row: null, delay: 3000 },
                { type: 'basic',    row: null, delay: 3500 },
            ],
        },
        {
            // Wave 2 — nhiều zombie hơn
            scouts: [
                { type: 'basic', row: null, delay: 0 },
                { type: 'basic', row: null, delay: 500 },
                { type: 'conehead', row: null, delay: 10000 },
                { type: 'conehead', row: null, delay: 20000 },
                { type: 'basic', row: null, delay: 30000 },
                { type: 'basic', row: null, delay: 30500 },
                { type: 'basic', row: null, delay: 31000 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40500 },
                { type: 'basic', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50500 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60500 },
                { type: 'basic', row: null, delay: 61000 },
                { type: 'basic', row: null, delay: 61500 },
                { type: 'basic', row: null, delay: 62000 },
            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1500 },
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
