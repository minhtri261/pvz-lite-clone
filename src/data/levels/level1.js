'use strict';
// ══════════════════════════════════════════════════════════════
//  level1.js — Màn 1: Khởi đầu đơn giản
//  - Chỉ 1 hàng hoạt động (hàng giữa, index 2)
//  - Chỉ có Peashooter
//  - Chỉ có Basic Zombie
//  - 2 đợt (wave)
//
//  Cấu trúc mỗi wave:
//    scouts: zombie lẻ tẻ xuất hiện trước để người chơi làm quen
//    surge:  làn sóng lớn ập vào ngay sau cảnh báo "Huge Wave"
// ══════════════════════════════════════════════════════════════
const LEVEL_DEF_1 = {
    id: 1,
    title:    'Level 1 Complete!',
    subtitle: 'Great start — more rows await!',
    newPlant:  'Peashooter',
    newZombie: null,
    activeRows:      [2],           // chỉ hàng giữa có thể đặt cây và zombie vào
    availablePlants: ['peashooter'],
    startingSun: 150,               // ánh nắng ban đầu
    waves: [
        {
            // Màn 1 chỉ có 1 wave, nhẹ nhàng để người chơi làm quen
            scouts: [
                { type: 'basic', row: 2, delay: 0 },      // zombie đầu tiên ngay lúc bắt đầu
                { type: 'basic', row: 2, delay: 10000 },  // zombie thứ hai sau 10 giây
                { type: 'basic', row: 2, delay: 20000 }, // zombie thứ ba sau 20 giây
                { type: 'basic', row: 2, delay: 30000 }, // zombie thứ tư sau 30 giây
            ],
            surge: [
                // 3 zombie cùng lúc (cách nhau 0.5 giây) sau khi cảnh báo "Huge Wave"
                { type: 'basic', row: 2, delay: 0 },
                { type: 'basic', row: 2, delay: 500 },
                { type: 'basic', row: 2, delay: 1000 },
            ],
        },
    ],
};
