'use strict';
// ══════════════════════════════════════════════════════════════
//  level12.js — Màn 12: ĐÊM CUỐI CÙNG (Final Night) — MÀN CUỐI
//  isNight: true → không sun trời, sun plants chậm 50%
//
//  Đây là màn khó nhất trong game:
//    - Brickhead + Bucket đêm = combo kinh hoàng (sun khan hiếm)
//    - Polevaulting bay qua hàng đầu + Brickhead cứng sau → khóc
//    - Dùng Cherry Bomb + Chomper để giải quyết đám đông
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_12 = {
    id: 12,
    title:    'PvZ Custom — All 12 Levels Cleared!',
    subtitle: 'You are a true Plant Master! The night has been conquered!',
    isNight:   true,
    newPlant:  null,
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine',
                      'sunshooter', 'repeater', 'chomper', 'twinsun', 'peanut', 'snowpea'],
    startingSun: 200,
    waves: [
        {
            // Wave 1 — cảnh báo: Brickhead đêm đầu tiên
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
            // Wave 2 — Bucket + Brickhead
            scouts: [
                { type: 'conehead',    row: null, delay: 0 },
                { type: 'conehead',       row: null, delay: 10000 },
                { type: 'basic',    row: null, delay: 18000 },
                { type: 'polevaulting', row: null, delay: 24000 },
                { type: 'basic',       row: null, delay: 29000 },
                { type: 'basic',    row: null, delay: 34000 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'conehead',    row: null, delay: 700 },
                { type: 'polevaulting', row: null, delay: 1400 },
                { type: 'basic',       row: null, delay: 2100 },
                { type: 'conehead',    row: null, delay: 2800 },
                { type: 'polevaulting', row: null, delay: 3500 },
                { type: 'basic',       row: null, delay: 4200 },
            ],
        },
        {
            // Wave 3 — Combo nguy hiểm: Polevaulter + Brickhead song song
            scouts: [
                { type: 'polevaulting', row: null, delay: 0 },
                { type: 'conehead',    row: null, delay: 8000 },
                { type: 'bucket', row: null, delay: 14000 },
                { type: 'conehead',    row: null, delay: 20000 },
                { type: 'basic',       row: null, delay: 25000 },
                { type: 'conehead',    row: null, delay: 30000 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'basic',         row: null, delay: 700 },
                { type: 'conehead',    row: null, delay: 1200 },
                { type: 'polevaulting', row: null, delay: 1800 },
                { type: 'conehead',    row: null, delay: 2400 },
                { type: 'basic',       row: null, delay: 3000 },
                { type: 'bucket', row: null, delay: 3600 },
                { type: 'conehead',    row: null, delay: 4200 },
            ],
        },
    ],
};
