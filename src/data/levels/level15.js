'use strict';
// ══════════════════════════════════════════════════════════════
//  level15.js — Màn 15: ANCIENT EGYPT — Tháp Giza
//              Màn cuối của chương ban ngày — đêm Ai Cập (16-20) còn ở phía trước
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_15 = {
    id: 15,
    isEgypt:  true,
    isNight:  false,
    title:    'Level 15 Complete!',
    subtitle: 'The sun sets over the pyramids... the desert grows restless in the dark.',
    newPlant:  null,
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'cabbage', 'wallnut', 'potatomine', 'chomper','puffshroom', 'fumeshroom', 'icelettuce', 'gravebuster'],
    startingSun: 150,
    // 4 lăng mộ — áp lực tối đa, triệu hồi zombie nặng từ nhiều phía
    tombs: [
        { col: 9, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 9, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 9, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 9, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 9, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 8, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['conehead'] },
        { col: 8, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 8, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 8, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 8, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 0, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 1, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 2, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 3, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
        { col: 6, row: 4, hp: 400, spawnRateMs: 150000, zombieTypes: ['basic'] },
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
                { type: 'explorer',    row: null, delay: 0 },
                { type: 'basic',    row: null, delay: 200 },
                { type: 'basic',    row: null, delay: 400 },
                { type: 'basic',    row: null, delay: 600 },

                //7
                { type: 'explorer', row: null, delay: 10000 },
                { type: 'conehead', row: null, delay: 10200 },
                { type: 'basic', row: null, delay: 10400 },
                { type: 'basic', row: null, delay: 10600 },

                //8
                { type: 'explorer',    row: null, delay: 20000 },
                { type: 'conehead',     row: null, delay: 20200 },
                { type: 'conehead',     row: null, delay: 20400 },
                { type: 'basic',     row: null, delay: 20600 },

                //9
                { type: 'tombraiser',    row: null, delay: 30000 },
                { type: 'basic',       row: null, delay: 30200 },
                { type: 'basic',    row: null, delay: 30400 },
                { type: 'basic',    row: null, delay: 30600 },
                { type: 'basic',    row: null, delay: 30800 },
                { type: 'basic',    row: null, delay: 31000 },
                { type: 'basic',    row: null, delay: 31200 },

                //10
                { type: 'tombraiser', row: null, delay: 40000 },
                { type: 'conehead',    row: null, delay: 40200 },
                { type: 'conehead',    row: null, delay: 40400 },
                { type: 'conehead',    row: null, delay: 40600 },
                { type: 'basic',       row: null, delay: 40800 },

                //11
                { type: 'tombraiser',    row: null, delay: 50000 },
                { type: 'explorer',    row: null, delay: 50500 },
                { type: 'explorer', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 51000 },
                { type: 'basic', row: null, delay: 51000 },

                //12
                { type: 'conehead',    row: null, delay: 60000 },
                { type: 'conehead',       row: null, delay: 60200 },
                { type: 'conehead',    row: null, delay: 60400 },
                { type: 'conehead',    row: null, delay: 60600 },
                { type: 'conehead',    row: null, delay: 60800 },
                { type: 'conehead',    row: null, delay: 61000 },
                
                //13
                { type: 'tombraiser',    row: null, delay: 70000 },
                { type: 'tombraiser',       row: null, delay: 70200 },
                { type: 'tombraiser',    row: null, delay: 70400 },
                { type: 'tombraiser',    row: null, delay: 70600 },
                { type: 'basic',    row: null, delay: 70800 },
            ],
            surge: [
                //30 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1200 },
                { type: 'conehead', row: null, delay: 1400 },
                { type: 'conehead', row: null, delay: 1600 },
                { type: 'conehead', row: null, delay: 1800 },
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
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4200 },
                { type: 'basic', row: null, delay: 4400 },
                { type: 'basic', row: null, delay: 4600 },
                { type: 'explorer', row: null, delay: 4800 },
                { type: 'explorer', row: null, delay: 5000 },
                { type: 'explorer', row: null, delay: 5200 },
                { type: 'explorer', row: null, delay: 5400 },
                { type: 'explorer', row: null, delay: 5600 },
                { type: 'tombraiser', row: null, delay: 5800 },
                { type: 'tombraiser', row: null, delay: 6000 },
                { type: 'tombraiser', row: null, delay: 6200 },
                { type: 'tombraiser', row: null, delay: 6400 },
                { type: 'tombraiser', row: null, delay: 6600 },
            ],
        },
        {
            // Wave 3 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.2s
            scouts: [
                //Độ khó 14
                { type: 'brickhead',    row: null, delay: 0 },
                { type: 'conehead',    row: null, delay: 200 },
                { type: 'conehead',    row: null, delay: 400 },
                { type: 'conehead',    row: null, delay: 600 },

                //15
                { type: 'brickhead',       row: null, delay: 10000 },
                { type: 'conehead', row: null, delay: 10200 },
                { type: 'conehead', row: null, delay: 10400 },
                { type: 'conehead', row: null, delay: 10600 },
                { type: 'basic', row: null, delay: 10800 },

                //16
                { type: 'brickhead',    row: null, delay: 20000 },
                { type: 'tombraiser',    row: null, delay: 20200 },
                { type: 'tombraiser',       row: null, delay: 20400 },
                { type: 'tombraiser',       row: null, delay: 20600 },
                { type: 'conehead',       row: null, delay: 20800 },

                //17
                { type: 'brickhead', row: null, delay: 30000 },
                { type: 'brickhead',    row: null, delay: 30200 },
                { type: 'basic',     row: null, delay: 30400 },

                //18
                { type: 'explorer',       row: null, delay: 40000 },
                { type: 'explorer',    row: null, delay: 40200 },
                { type: 'explorer',    row: null, delay: 40400 },
                { type: 'explorer',       row: null, delay: 40600 },
                { type: 'explorer',    row: null, delay: 40800 },
                { type: 'explorer',    row: null, delay: 41000 },

                //19
                { type: 'tombraiser',    row: null, delay: 50000 },
                { type: 'tombraiser', row: null, delay: 50200 },
                { type: 'tombraiser',       row: null, delay: 50400 },
                { type: 'tombraiser',    row: null, delay: 50600 },
                { type: 'tombraiser',    row: null, delay: 50800 },
                { type: 'tombraiser',    row: null, delay: 51000 },
                { type: 'basic',    row: null, delay: 51200 },

                //20
                { type: 'brickhead',    row: null, delay: 60000 },
                { type: 'brickhead',    row: null, delay: 60200 },
                { type: 'basic',       row: null, delay: 60400 },
                { type: 'basic', row: null, delay: 60800 },

                //21
                { type: 'brickhead',    row: null, delay: 70000 },
                { type: 'conehead',    row: null, delay: 70200 },
                { type: 'conehead',       row: null, delay: 70400 },
                { type: 'conehead', row: null, delay: 70800 },
                { type: 'conehead', row: null, delay: 71000 },
                { type: 'conehead', row: null, delay: 71200 },
                { type: 'conehead', row: null, delay: 71400 },
                { type: 'basic', row: null, delay: 71600 },

                //22
                { type: 'brickhead',    row: null, delay: 80000 },
                { type: 'conehead',    row: null, delay: 80200 },
                { type: 'conehead',       row: null, delay: 80400 },
                { type: 'conehead', row: null, delay: 80800 },
                { type: 'conehead', row: null, delay: 81000 },
                { type: 'conehead', row: null, delay: 81200 },
                { type: 'conehead', row: null, delay: 81400 },
                { type: 'conehead', row: null, delay: 81600 },
            ],
            surge: [
                //50 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'brickhead', row: null, delay: 1000 },
                { type: 'brickhead', row: null, delay: 1200 },
                { type: 'brickhead', row: null, delay: 1400 },
                { type: 'brickhead', row: null, delay: 1600 },
                { type: 'brickhead', row: null, delay: 1800 },
                { type: 'brickhead', row: null, delay: 2000 },
                { type: 'brickhead', row: null, delay: 2200 },
                { type: 'brickhead', row: null, delay: 2400 },
                { type: 'brickhead', row: null, delay: 2600 },
                { type: 'brickhead', row: null, delay: 2800 },
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
                { type: 'tombraiser', row: null, delay: 6800 },
                { type: 'tombraiser', row: null, delay: 7000 },
                { type: 'tombraiser', row: null, delay: 7200 },
                { type: 'tombraiser', row: null, delay: 7400 },
                { type: 'tombraiser', row: null, delay: 7600 },
                { type: 'tombraiser', row: null, delay: 7800 },
                { type: 'tombraiser', row: null, delay: 8000 },
                { type: 'tombraiser', row: null, delay: 8200 },
                { type: 'tombraiser', row: null, delay: 8400 },
                { type: 'tombraiser', row: null, delay: 8600 },
                { type: 'explorer', row: null, delay: 8800 },
                { type: 'explorer', row: null, delay: 9000 },
                { type: 'explorer', row: null, delay: 9200 },
                { type: 'explorer', row: null, delay: 9400 },
                { type: 'explorer', row: null, delay: 9600 },
                { type: 'explorer', row: null, delay: 9800 },
                { type: 'explorer', row: null, delay: 10000 },
                { type: 'explorer', row: null, delay: 10200 },
                { type: 'explorer', row: null, delay: 10400 },
                { type: 'explorer', row: null, delay: 10600 },
            ],
        },
    ],
};
