'use strict';
// ══════════════════════════════════════════════════════════════
//  level18.js — Màn 18: ANCIENT EGYPT — ĐÊM
//  Thời Kỳ Ai Cập Cổ Đại — chương đêm (màn 16-20)
//
//  TEMPLATE — chưa có nội dung gameplay. Tự điền:
//    - availablePlants: danh sách cây được dùng ở màn này
//    - tombs:           lăng mộ (nếu có) — { col, row, hp, spawnRateMs, zombieTypes }
//    - waves[].scouts / waves[].surge: zombie xuất hiện — { type, row, delay }
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_18 = {
    id: 18,
    isEgypt:  true,
    isNight:  true,
    title:    'Level 18 Complete!',
    subtitle: 'The moon hides its light over the pyramids.',
    newPlant:  'Squash',
    newZombie: 'Explorer Bucket Zombie',
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'chomper','puffshroom', 'fumeshroom', 'icelettuce', 'gravebuster', 'bonkchoy', 'squash'],
    startingSun: 150,
    tombs: [
        { col: 9, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 9, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 9, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 9, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 9, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 8, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 8, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 8, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 8, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 8, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 7, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 7, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 7, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 7, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 7, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 6, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 5, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 5, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 5, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 5, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 5, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
    ],
    waves: [
        {
            // Wave 1 — mỗi nhóm cách nhau 20s, trong nhóm cách nhau 0.2s
            scouts: [
                //Độ khó 1
                { type: 'basic', row: null, delay: 0 },

                //1
                { type: 'basic', row: null, delay: 20000 },

                //2
                { type: 'basic', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40200 },

                //3
                { type: 'conehead', row: null, delay: 60000 },
                { type: 'basic', row: null, delay: 60200 },

                //4
                { type: 'basic', row: null, delay: 80000 },
                { type: 'basic', row: null, delay: 80200 },
                { type: 'basic', row: null, delay: 80400 },
                { type: 'basic', row: null, delay: 80600 },

                //5
                { type: 'basic', row: null, delay: 100000 },
                { type: 'conehead', row: null, delay: 100200 },
                { type: 'conehead', row: null, delay: 100400 },
            ],
            surge: [
                //15 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1200 },
                { type: 'conehead', row: null, delay: 1400 },
                { type: 'conehead', row: null, delay: 1600 },
                { type: 'conehead', row: null, delay: 1800 },
                { type: 'basic', row: null, delay: 2000 },
                { type: 'basic', row: null, delay: 2200 },
                { type: 'basic', row: null, delay: 2400 },
                { type: 'basic', row: null, delay: 2600 },
                { type: 'basic', row: null, delay: 2800 },
                { type: 'basic', row: null, delay: 3000 },
                { type: 'basic', row: null, delay: 3200 },
                { type: 'basic', row: null, delay: 3400 },
                { type: 'basic', row: null, delay: 3600 },
            ],
        },
        {
            // Wave 2 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.2s
            scouts: [
                //Độ khó 6
                { type: 'explorerbucket',    row: null, delay: 0 },

                //7
                { type: 'explorerbucket', row: null, delay: 10000 },
                { type: 'basic', row: null, delay: 10200 },

                //8
                { type: 'conehead',    row: null, delay: 20000 },
                { type: 'conehead',     row: null, delay: 20200 },
                { type: 'conehead',     row: null, delay: 20400 },
                { type: 'conehead',     row: null, delay: 20600 },

                //9
                { type: 'conehead',    row: null, delay: 30000 },
                { type: 'conehead',       row: null, delay: 30200 },
                { type: 'basic',    row: null, delay: 30400 },
                { type: 'basic',    row: null, delay: 30600 },
                { type: 'basic',    row: null, delay: 30800 },
                { type: 'basic',    row: null, delay: 31000 },
                { type: 'basic',    row: null, delay: 31200 },

                //10
                { type: 'explorerbucket', row: null, delay: 40000 },
                { type: 'basic', row: null, delay: 40200 },
                { type: 'basic', row: null, delay: 40400 },
                { type: 'basic', row: null, delay: 40600 },
                { type: 'basic', row: null, delay: 40800 },

                //11
                { type: 'explorerbucket',    row: null, delay: 50000 },
                { type: 'conehead',    row: null, delay: 50200 },
                { type: 'conehead',    row: null, delay: 50400 },
                { type: 'basic',    row: null, delay: 50600 },

                //12
                { type: 'explorerbucket',    row: null, delay: 60000 },
                { type: 'explorerbucket',    row: null, delay: 60200 },
                
                //13
                { type: 'basic',    row: null, delay: 70000 },
                { type: 'basic',    row: null, delay: 70200 },
                { type: 'basic',    row: null, delay: 70400 },
                { type: 'basic',    row: null, delay: 70600 },
                { type: 'basic',    row: null, delay: 70800 },
                { type: 'basic',    row: null, delay: 71000 },
                { type: 'basic',    row: null, delay: 71200 },
                { type: 'basic',    row: null, delay: 71400 },
                { type: 'basic',    row: null, delay: 71600 },
                { type: 'basic',    row: null, delay: 71800 },
                { type: 'basic',    row: null, delay: 72000 },
                { type: 'basic',    row: null, delay: 72200 },
            ],
            surge: [
                //30 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'explorerbucket', row: null, delay: 1000 },
                { type: 'explorerbucket', row: null, delay: 1200 },
                { type: 'explorerbucket', row: null, delay: 1400 },
                { type: 'explorerbucket', row: null, delay: 1600 },
                { type: 'explorerbucket', row: null, delay: 1800 },
                { type: 'conehead', row: null, delay: 2000 },
                { type: 'conehead', row: null, delay: 2200 },
                { type: 'conehead', row: null, delay: 2400 },
                { type: 'conehead', row: null, delay: 2600 },
                { type: 'conehead', row: null, delay: 2800 },
                { type: 'conehead', row: null, delay: 3000 },
                { type: 'conehead', row: null, delay: 3200 },
                { type: 'conehead', row: null, delay: 3400 },
                { type: 'conehead', row: null, delay: 3600 },
                { type: 'conehead', row: null, delay: 3800 },
                { type: 'conehead', row: null, delay: 4000 },
                { type: 'conehead', row: null, delay: 4200 },
                { type: 'conehead', row: null, delay: 4400 },
                { type: 'conehead', row: null, delay: 4600 },
                { type: 'conehead', row: null, delay: 4800 },
                { type: 'basic', row: null, delay: 5000 },
                { type: 'basic', row: null, delay: 5200 },
                { type: 'basic', row: null, delay: 5400 },
                { type: 'basic', row: null, delay: 5600 },
                { type: 'basic', row: null, delay: 5800 },
                { type: 'basic', row: null, delay: 6000 },
                { type: 'basic', row: null, delay: 6200 },
                { type: 'basic', row: null, delay: 6400 },
                { type: 'basic', row: null, delay: 6600 },
            ],
        },
    ],
};
