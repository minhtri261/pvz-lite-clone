'use strict';
// ══════════════════════════════════════════════════════════════
//  level11.js — Màn 11: ANCIENT EGYPT — Bình Minh Sa Mạc
//  Thời Kỳ Ai Cập Cổ Đại — màn đầu tiên
//
//  Plant mới: Cabbage-pult — ném bắp cải theo vòng cung, 40 dmg
//  Chiến thuật:
//    - Cabbage-pult mạnh hơn Peashooter (40 dmg vs 20 dmg)
//    - Cần Sunflower để duy trì sun (không có PuffShroom đêm)
//    - Zombie Conehead xuất hiện từ wave 1
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_11 = {
    id: 11,
    isEgypt:  true,
    isNight:  false,
    title:    'Level 11 Complete!',
    subtitle: 'The sands stir... deeper dangers await in the desert!',
    newPlant:  'cabbage',
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'Chomper', 'puffshroom'],
    startingSun: 150,
    tombs: [], // màn giới thiệu Egypt — chưa có lăng mộ
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic',    row: null, delay: 0 },

                { type: 'basic',    row: null, delay: 20000 },

                { type: 'basic',    row: null, delay: 40000 },
                { type: 'basic',    row: null, delay: 40500 },

                { type: 'conehead', row: null, delay: 60000 },
                { type: 'basic',    row: null, delay: 60500 },

                { type: 'basic',    row: null, delay: 80000 },
                { type: 'conehead', row: null, delay: 80500 },
                { type: 'basic',    row: null, delay: 81000 },

                { type: 'conehead', row: null, delay: 100000 },
                { type: 'basic',    row: null, delay: 100500 },
                { type: 'conehead', row: null, delay: 101000 },
            ],
            surge: [
                { type: 'flag',     row: null, delay: 0 },
                { type: 'basic',    row: null, delay: 800 },
                { type: 'conehead', row: null, delay: 1600 },
                { type: 'basic',    row: null, delay: 2400 },
                { type: 'basic',    row: null, delay: 3200 },
                { type: 'conehead', row: null, delay: 4000 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'conehead',     row: null, delay: 0 },

                { type: 'basic',        row: null, delay: 10000 },
                { type: 'basic',        row: null, delay: 10500 },

                { type: 'polevaulting', row: null, delay: 20000 },
                { type: 'conehead',     row: null, delay: 20500 },

                { type: 'basic',        row: null, delay: 30000 },
                { type: 'polevaulting', row: null, delay: 30500 },
                { type: 'conehead',     row: null, delay: 31000 },

                { type: 'conehead',     row: null, delay: 40000 },
                { type: 'polevaulting', row: null, delay: 40500 },
                { type: 'basic',        row: null, delay: 41000 },

                { type: 'polevaulting', row: null, delay: 50000 },
                { type: 'conehead',     row: null, delay: 50500 },
                { type: 'basic',        row: null, delay: 51000 },
                { type: 'conehead',     row: null, delay: 51500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'conehead',     row: null, delay: 700 },
                { type: 'basic',        row: null, delay: 1400 },
                { type: 'polevaulting', row: null, delay: 2100 },
                { type: 'conehead',     row: null, delay: 2800 },
                { type: 'basic',        row: null, delay: 3500 },
                { type: 'conehead',     row: null, delay: 4200 },
            ],
        },
    ],
};
