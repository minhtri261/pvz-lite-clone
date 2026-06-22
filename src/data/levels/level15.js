'use strict';
// ══════════════════════════════════════════════════════════════
//  level15.js — Màn 15: ANCIENT EGYPT — MÀN CUỐI CÙNG
//              Tháp Giza — Trận Chiến Của Mọi Thế Kỷ
//
//  Đây là màn khó nhất trong game:
//    - Tất cả zombie types xuất hiện
//    - Brickhead + Bucket song song → tiêu hao tài nguyên nhanh
//    - Newspaper điên loạn + Pole Vaulter nhảy qua tường
//    - Cần bố phòng đa tầng và kinh tế mạnh
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_15 = {
    id: 15,
    isEgypt:  true,
    isNight:  false,
    title:    'PvZ Custom — All 15 Levels Cleared!',
    subtitle: 'You are the ultimate Plant Master of the Ancient World! All eras conquered!',
    newPlant:  null,
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'chomper', 'puffshroom', 'icelettuce', 'gravebuster'],
    startingSun: 150,
    // 4 lăng mộ — áp lực tối đa, triệu hồi zombie nặng từ nhiều phía
    tombs: [
        { col: 9, row: 0, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 9, row: 1, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 9, row: 2, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 9, row: 3, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 9, row: 4, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 8, row: 0, hp: 300, spawnRateMs: 50000, zombieTypes: ['conehead'] },
        { col: 8, row: 1, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 8, row: 2, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 8, row: 3, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 8, row: 4, hp: 300, spawnRateMs: 50000, zombieTypes: ['basic'] },
        { col: 6, row: 0, hp: 300, spawnRateMs: 30000, zombieTypes: ['basic'] },
        { col: 6, row: 1, hp: 300, spawnRateMs: 30000, zombieTypes: ['basic'] },
        { col: 6, row: 2, hp: 300, spawnRateMs: 30000, zombieTypes: ['basic'] },
        { col: 6, row: 3, hp: 300, spawnRateMs: 30000, zombieTypes: ['basic'] },
        { col: 6, row: 4, hp: 300, spawnRateMs: 30000, zombieTypes: ['basic'] },
    ],
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'basic', row: null, delay: 0 },

                { type: 'basic', row: null, delay: 20000 },

                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40500 },

                { type: 'conehead', row: null, delay: 60000 },

                { type: 'basic', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80500 },
                { type: 'basic', row: null, delay: 81000 },

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
                { type: 'conehead', row: null, delay: 5000 },
                { type: 'basic', row: null, delay: 5500 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'polevaulting',    row: null, delay: 0 },

                { type: 'conehead',       row: null, delay: 10000 },
                { type: 'polevaulting', row: null, delay: 10500 },

                { type: 'brickhead',    row: null, delay: 20000 },
                { type: 'conehead',     row: null, delay: 20500 },

                { type: 'newspaper',    row: null, delay: 30000 },
                { type: 'basic',       row: null, delay: 30500 },
                { type: 'brickhead',    row: null, delay: 31000 },

                { type: 'polevaulting', row: null, delay: 40000 },
                { type: 'brickhead',    row: null, delay: 40500 },
                { type: 'basic',       row: null, delay: 41000 },

                { type: 'newspaper',    row: null, delay: 50000 },
                { type: 'brickhead',    row: null, delay: 50500 },
                { type: 'polevaulting', row: null, delay: 51000 },

                { type: 'brickhead',    row: null, delay: 60000 },
                { type: 'conehead',       row: null, delay: 60500 },
                { type: 'newspaper',    row: null, delay: 61000 },
                { type: 'brickhead',    row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'brickhead',    row: null, delay: 500 },
                { type: 'basic',       row: null, delay: 1000 },
                { type: 'polevaulting', row: null, delay: 1500 },
                { type: 'brickhead',    row: null, delay: 2000 },
                { type: 'newspaper',    row: null, delay: 2500 },
                { type: 'basic',       row: null, delay: 3000 },
                { type: 'brickhead',    row: null, delay: 3500 },
                { type: 'polevaulting', row: null, delay: 4000 },
                { type: 'newspaper',    row: null, delay: 4500 },
                { type: 'brickhead',    row: null, delay: 5000 },
            ],
        },
        {
            // Wave 3 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều
            scouts: [
                { type: 'brickhead',    row: null, delay: 0 },
                { type: 'brickhead',    row: null, delay: 500 },

                { type: 'basic',       row: null, delay: 10000 },
                { type: 'polevaulting', row: null, delay: 10500 },

                { type: 'brickhead',    row: null, delay: 20000 },
                { type: 'newspaper',    row: null, delay: 20500 },
                { type: 'basic',       row: null, delay: 21000 },

                { type: 'polevaulting', row: null, delay: 30000 },
                { type: 'brickhead',    row: null, delay: 30500 },
                { type: 'conehead',     row: null, delay: 31000 },

                { type: 'basic',       row: null, delay: 40000 },
                { type: 'brickhead',    row: null, delay: 40500 },
                { type: 'newspaper',    row: null, delay: 41000 },

                { type: 'brickhead',    row: null, delay: 50000 },
                { type: 'polevaulting', row: null, delay: 50500 },
                { type: 'basic',       row: null, delay: 51000 },
                { type: 'brickhead',    row: null, delay: 51500 },

                { type: 'newspaper',    row: null, delay: 60000 },
                { type: 'brickhead',    row: null, delay: 60500 },
                { type: 'basic',       row: null, delay: 61000 },
                { type: 'polevaulting', row: null, delay: 61500 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'brickhead',    row: null, delay: 400 },
                { type: 'brickhead',    row: null, delay: 800 },
                { type: 'basic',       row: null, delay: 1200 },
                { type: 'polevaulting', row: null, delay: 1600 },
                { type: 'brickhead',    row: null, delay: 2000 },
                { type: 'newspaper',    row: null, delay: 2400 },
                { type: 'basic',       row: null, delay: 2800 },
                { type: 'brickhead',    row: null, delay: 3200 },
                { type: 'polevaulting', row: null, delay: 3600 },
                { type: 'newspaper',    row: null, delay: 4000 },
                { type: 'brickhead',    row: null, delay: 4400 },
                { type: 'basic',       row: null, delay: 4800 },
                { type: 'brickhead',    row: null, delay: 5200 },
            ],
        },
        {
            // Wave cuối — mọi thứ xảy ra cùng lúc — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.5s, tăng dần đều tới đỉnh điểm
            scouts: [
                { type: 'brickhead',    row: null, delay: 0 },
                { type: 'brickhead',    row: null, delay: 500 },

                { type: 'basic',       row: null, delay: 10000 },
                { type: 'polevaulting', row: null, delay: 10500 },
                { type: 'brickhead',    row: null, delay: 11000 },

                { type: 'newspaper',    row: null, delay: 20000 },
                { type: 'brickhead',    row: null, delay: 20500 },
                { type: 'basic',       row: null, delay: 21000 },

                { type: 'polevaulting', row: null, delay: 30000 },
                { type: 'brickhead',    row: null, delay: 30500 },
                { type: 'newspaper',    row: null, delay: 31000 },
                { type: 'basic',       row: null, delay: 31500 },

                { type: 'brickhead',    row: null, delay: 40000 },
                { type: 'polevaulting', row: null, delay: 40500 },
                { type: 'brickhead',    row: null, delay: 41000 },
                { type: 'newspaper',    row: null, delay: 41500 },

                { type: 'basic',       row: null, delay: 50000 },
                { type: 'brickhead',    row: null, delay: 50500 },
                { type: 'polevaulting', row: null, delay: 51000 },
                { type: 'brickhead',    row: null, delay: 51500 },
                { type: 'basic',       row: null, delay: 52000 },

                { type: 'brickhead',    row: null, delay: 60000 },
                { type: 'newspaper',    row: null, delay: 60500 },
                { type: 'brickhead',    row: null, delay: 61000 },
                { type: 'basic',       row: null, delay: 61500 },
                { type: 'brickhead',    row: null, delay: 62000 },

                { type: 'tombraiser',   row: null, delay: 70000 },
                { type: 'tombraiser',   row: null, delay: 80000 },
            ],
            surge: [
                { type: 'flag',         row: null, delay: 0 },
                { type: 'brickhead',    row: null, delay: 300 },
                { type: 'brickhead',    row: null, delay: 600 },
                { type: 'basic',       row: null, delay: 900 },
                { type: 'polevaulting', row: null, delay: 1200 },
                { type: 'brickhead',    row: null, delay: 1500 },
                { type: 'newspaper',    row: null, delay: 1800 },
                { type: 'brickhead',    row: null, delay: 2100 },
                { type: 'basic',       row: null, delay: 2400 },
                { type: 'polevaulting', row: null, delay: 2700 },
                { type: 'brickhead',    row: null, delay: 3000 },
                { type: 'newspaper',    row: null, delay: 3300 },
                { type: 'brickhead',    row: null, delay: 3600 },
                { type: 'basic',       row: null, delay: 3900 },
                { type: 'brickhead',    row: null, delay: 4200 },
            ],
        },
    ],
};
