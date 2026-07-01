'use strict';
// ══════════════════════════════════════════════════════════════
//  level10.js — Màn 10: CUỐI — Brick by Brick
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_10 = {
    id: 10,
    isNight:   true,
    title:    'Level 10 Complete!',
    subtitle: 'The garden is safe... for now. A new desert calls in the distance.',
    newPlant:  null,
    newZombie: null,
    activeRows:      [0, 1, 2, 3, 4],
    availablePlants: ['sunflower', 'peashooter', 'wallnut', 'potatomine', 'puffshroom', 'fumeshroom', 'chomper'],
    startingSun: 150,
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
                { type: 'conehead', row: null, delay: 100000 },
                { type: 'basic', row: null, delay: 100200 },
                { type: 'basic', row: null, delay: 100400 },
                { type: 'basic', row: null, delay: 100600 },
            ],
            surge: [
                //15 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 1000 },
                { type: 'conehead', row: null, delay: 1200 },
                { type: 'conehead', row: null, delay: 1400 },
                { type: 'conehead', row: null, delay: 1600 },
                { type: 'conehead', row: null, delay: 1800 },
                { type: 'conehead', row: null, delay: 2000 },
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
                { type: 'newspaper',    row: null, delay: 0 },
                { type: 'basic',    row: null, delay: 200 },
                { type: 'basic',    row: null, delay: 400 },
                { type: 'basic',    row: null, delay: 600 },

                //7
                { type: 'newspaper',  row: null, delay: 10000 },
                { type: 'conehead',   row: null, delay: 10200 },
                { type: 'basic',    row: null, delay: 10400 },
                { type: 'basic',    row: null, delay: 10600 },

                //8
                { type: 'conehead', row: null, delay: 20000 },
                { type: 'conehead', row: null, delay: 20200 },
                { type: 'conehead', row: null, delay: 20400 },
                { type: 'conehead', row: null, delay: 20600 },

                //9
                { type: 'door',     row: null, delay: 30000 },
                { type: 'conehead', row: null, delay: 30200 },
                { type: 'basic',    row: null, delay: 30400 },
                { type: 'basic',    row: null, delay: 30600 },
                { type: 'basic',    row: null, delay: 30800 },
                { type: 'basic',    row: null, delay: 31000 },

                //10
                { type: 'door',    row: null, delay: 40000 },
                { type: 'conehead', row: null, delay: 40200 },
                { type: 'conehead', row: null, delay: 40400 },
                { type: 'conehead', row: null, delay: 40600 },
                { type: 'basic', row: null, delay: 40800 },

                //11
                { type: 'door',    row: null, delay: 50000 },
                { type: 'newspaper',    row: null, delay: 50200 },
                { type: 'basic',    row: null, delay: 50400 },
                { type: 'basic',    row: null, delay: 50600 },
                { type: 'basic',    row: null, delay: 50800 },
                { type: 'basic',    row: null, delay: 51000 },
                { type: 'basic',    row: null, delay: 51200 },

                //12
                { type: 'newspaper', row: null, delay: 60000 },
                { type: 'newspaper',    row: null, delay: 60200 },
                { type: 'newspaper',    row: null, delay: 60400 },
                { type: 'basic',    row: null, delay: 60600 },
                { type: 'basic',    row: null, delay: 60800 },
                { type: 'basic',    row: null, delay: 61000 },

                //13
                { type: 'door',       row: null, delay: 70000 },
                { type: 'door',    row: null, delay: 70200 },
                { type: 'door', row: null, delay: 70400 },
                { type: 'basic',       row: null, delay: 70600 },
                { type: 'basic',       row: null, delay: 70800 },
                { type: 'basic',       row: null, delay: 71000 },
                { type: 'basic',       row: null, delay: 71200 },

                //14
                { type: 'door',    row: null, delay: 80000 },
                { type: 'door',    row: null, delay: 80200 },
                { type: 'newspaper', row: null, delay: 80400 },
                { type: 'newspaper',       row: null, delay: 80600 },
                { type: 'basic',       row: null, delay: 80800 },
            ],
            surge: [
                //30 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'door', row: null, delay: 1000 },
                { type: 'door', row: null, delay: 1200 },
                { type: 'door', row: null, delay: 1400 },
                { type: 'door', row: null, delay: 1600 },
                { type: 'door', row: null, delay: 1800 },
                { type: 'newspaper', row: null, delay: 2000 },
                { type: 'newspaper', row: null, delay: 2200 },
                { type: 'newspaper', row: null, delay: 2400 },
                { type: 'newspaper', row: null, delay: 2600 },
                { type: 'newspaper', row: null, delay: 2800 },
                { type: 'newspaper', row: null, delay: 3000 },
                { type: 'newspaper', row: null, delay: 3200 },
                { type: 'newspaper', row: null, delay: 3400 },
                { type: 'newspaper', row: null, delay: 3600 },
                { type: 'newspaper', row: null, delay: 3800 },
                { type: 'basic', row: null, delay: 4000 },
                { type: 'basic', row: null, delay: 4200 },
                { type: 'basic', row: null, delay: 4400 },
                { type: 'basic', row: null, delay: 4600 },
                { type: 'conehead', row: null, delay: 4800 },
                { type: 'conehead', row: null, delay: 5000 },
                { type: 'conehead', row: null, delay: 5200 },
                { type: 'conehead', row: null, delay: 5400 },
                { type: 'conehead', row: null, delay: 5600 },
                { type: 'conehead', row: null, delay: 5800 },
                { type: 'conehead', row: null, delay: 6000 },
                { type: 'conehead', row: null, delay: 6200 },
                { type: 'conehead', row: null, delay: 6400 },
                { type: 'conehead', row: null, delay: 6600 },
            ],
        },
        {
            // Wave 3 — mỗi nhóm cách nhau 10s, trong nhóm cách nhau 0.2s
            scouts: [
                //Độ khó 15
                { type: 'brickhead', row: null, delay: 0 },
                { type: 'conehead', row: null, delay: 200 },
                { type: 'conehead', row: null, delay: 400 },
                { type: 'conehead', row: null, delay: 600 },
                { type: 'basic', row: null, delay: 800 },

                //16
                { type: 'brickhead',row: null, delay: 10000 },
                { type: 'conehead', row: null, delay: 10200 },
                { type: 'conehead', row: null, delay: 10400 },
                { type: 'conehead', row: null, delay: 10600 },
                { type: 'conehead', row: null, delay: 10800 },

                //17
                { type: 'brickhead',       row: null, delay: 20000 },
                { type: 'newspaper',     row: null, delay: 20200 },
                { type: 'newspaper', row: null, delay: 20400 },
                { type: 'basic', row: null, delay: 20600 },
                { type: 'basic', row: null, delay: 20800 },
                { type: 'basic', row: null, delay: 21000 },

                //18
                { type: 'brickhead',       row: null, delay: 30000 },
                { type: 'door', row: null, delay: 30200 },
                { type: 'door',     row: null, delay: 30400 },
                { type: 'conehead',     row: null, delay: 30600 },
                { type: 'conehead',     row: null, delay: 30800 },

                //19
                { type: 'brickhead',     row: null, delay: 40000 },
                { type: 'brickhead',       row: null, delay: 40200 },
                { type: 'basic', row: null, delay: 40400 },
                { type: 'basic', row: null, delay: 40600 },
                { type: 'basic', row: null, delay: 40800 },

                //20
                { type: 'conehead', row: null, delay: 50000 },
                { type: 'conehead', row: null, delay: 50200 },
                { type: 'conehead', row: null, delay: 50400 },
                { type: 'conehead', row: null, delay: 50600 },
                { type: 'conehead', row: null, delay: 50800 },
                { type: 'conehead', row: null, delay: 51000 },
                { type: 'conehead', row: null, delay: 51200 },
                { type: 'conehead', row: null, delay: 51400 },
                { type: 'conehead', row: null, delay: 51600 },
                { type: 'conehead', row: null, delay: 51800 },

                //21
                { type: 'newspaper', row: null, delay: 60000 },
                { type: 'newspaper', row: null, delay: 60200 },
                { type: 'newspaper', row: null, delay: 60400 },
                { type: 'newspaper', row: null, delay: 60600 },
                { type: 'newspaper', row: null, delay: 60800 },
                { type: 'newspaper', row: null, delay: 61000 },
                { type: 'newspaper', row: null, delay: 61200 },

                //22
                { type: 'door', row: null, delay: 70000 },
                { type: 'door', row: null, delay: 70200 },
                { type: 'door', row: null, delay: 70400 },
                { type: 'door', row: null, delay: 70600 },
                { type: 'door', row: null, delay: 70800 },
                { type: 'door', row: null, delay: 71000 },
                { type: 'door', row: null, delay: 71200 },
                { type: 'basic', row: null, delay: 71400 },
            ],
            surge: [
                //50 zombies xuất hiện
                { type: 'flag',  row: null, delay: 0 },
                { type: 'door', row: null, delay: 1000 },
                { type: 'door', row: null, delay: 1200 },
                { type: 'door', row: null, delay: 1400 },
                { type: 'door', row: null, delay: 1600 },
                { type: 'door', row: null, delay: 1800 },
                { type: 'door', row: null, delay: 2000 },
                { type: 'door', row: null, delay: 2200 },
                { type: 'door', row: null, delay: 2400 },
                { type: 'door', row: null, delay: 2600 },
                { type: 'door', row: null, delay: 2800 },
                { type: 'newspaper', row: null, delay: 3000 },
                { type: 'newspaper', row: null, delay: 3200 },
                { type: 'newspaper', row: null, delay: 3400 },
                { type: 'newspaper', row: null, delay: 3600 },
                { type: 'newspaper', row: null, delay: 3800 },
                { type: 'newspaper', row: null, delay: 4000 },
                { type: 'newspaper', row: null, delay: 4200 },
                { type: 'newspaper', row: null, delay: 4400 },
                { type: 'newspaper', row: null, delay: 4600 },
                { type: 'newspaper', row: null, delay: 4800 },
                { type: 'conehead', row: null, delay: 5000 },
                { type: 'conehead', row: null, delay: 5200 },
                { type: 'conehead', row: null, delay: 5400 },
                { type: 'conehead', row: null, delay: 5600 },
                { type: 'conehead', row: null, delay: 5800 },
                { type: 'conehead', row: null, delay: 6000 },
                { type: 'conehead', row: null, delay: 6200 },
                { type: 'conehead', row: null, delay: 6400 },
                { type: 'conehead', row: null, delay: 6600 },
                { type: 'conehead', row: null, delay: 6800 },
                { type: 'conehead', row: null, delay: 7000 },
                { type: 'conehead', row: null, delay: 7200 },
                { type: 'conehead', row: null, delay: 7400 },
                { type: 'conehead', row: null, delay: 7600 },
                { type: 'conehead', row: null, delay: 7800 },
                { type: 'basic', row: null, delay: 8000 },
                { type: 'basic', row: null, delay: 8200 },
                { type: 'basic', row: null, delay: 8400 },
                { type: 'basic', row: null, delay: 8600 },
                { type: 'basic', row: null, delay: 8800 },
                { type: 'basic', row: null, delay: 9000 },
                { type: 'basic', row: null, delay: 9200 },
                { type: 'basic', row: null, delay: 9400 },
                { type: 'basic', row: null, delay: 9600 },
                { type: 'brickhead', row: null, delay: 9800 },
                { type: 'brickhead', row: null, delay: 10000 },
                { type: 'brickhead', row: null, delay: 10200 },
                { type: 'brickhead', row: null, delay: 10400 },
                { type: 'brickhead', row: null, delay: 10600 },
            ],
        },
    ],
};
