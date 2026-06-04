'use strict';
// ══════════════════════════════════════════════════════════════
//  level11.js — Màn 11: ĐÊMBẮT ĐẦU (First Night)
//  isNight: true → không có mặt trời rơi, sun plants chậm hơn 50%
//
//  Chiến thuật đêm:
//    - KHÔNG có sun trời rơi → phụ thuộc hoàn toàn vào cây
//    - Ưu tiên Twin Sunflower + Sun-Shooter để tối ưu sun
//    - Potato Mine rất giá trị vì chỉ tốn 25 sun
//    - Vẫn có mọi zombie từ màn trước (trừ Brickhead)
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_11 = {
    id: 11,
    title:    'Level 11 Complete!',
    subtitle: 'Darkness grows... one last night awaits!',
    isNight:   true,           // BAN ĐÊM: không sun trời, sun plants chậm 50%
    newPlant:  null,
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine',
                      'sunshooter', 'repeater', 'chomper', 'twinsun', 'peanut', 'puffshroom'],
    startingSun: 200, // bắt đầu với nhiều sun hơn vì không có sun trời
    waves: [
        {
            // Wave 1 — nhẹ nhàng để người chơi xây dựng kinh tế đêm
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
            // Wave 2 — Polevaulting + Conehead dày hơn
            scouts: [
                { type: 'conehead',     row: null, delay: 0 },
                { type: 'basic', row: null, delay: 10000 },
                { type: 'conehead',     row: null, delay: 18000 },
                { type: 'basic', row: null, delay: 25000 },
                { type: 'conehead',     row: null, delay: 31000 },
                { type: 'basic',        row: null, delay: 36000 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'conehead',     row: null, delay: 800 },
                { type: 'basic',     row: null, delay: 1600 },
                { type: 'basic',     row: null, delay: 2400 },
                { type: 'conehead',     row: null, delay: 3200 },
                { type: 'basic',        row: null, delay: 4000 },
            ],
        },
    ],
};
