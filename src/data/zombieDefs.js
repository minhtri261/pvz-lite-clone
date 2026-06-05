'use strict';
// ══════════════════════════════════════════════════════════════
//  zombieDefs.js — Thông số tĩnh của từng loại zombie
// ══════════════════════════════════════════════════════════════
const ZOMBIE_DEFS = {
    basic: {
        maxHp: 200,       // máu cơ bản
        speed: 0.28,      // tốc độ di chuyển (pixel/frame ở 60fps)
        damage: 100,      // sát thương mỗi đòn cắn
        attackRate: 1000, // cắn 1 lần mỗi giây (ms)
    },
    flag: {
        maxHp: 200,
        speed: 0.5,       // nhanh hơn basic — dẫn đầu làn sóng
        damage: 100,
        attackRate: 1000,
    },
    conehead: {
        maxHp: 560,       // 360 (nón) + 200 (cơ thể) = 560 tổng
        speed: 0.28,
        damage: 100,
        attackRate: 1000,
        coneHp: 360,      // nón hấp thụ 360 điểm sát thương trước khi rơi
    },
    bucket: {
        maxHp: 1100,      // 900 (xô) + 200 (cơ thể) = 1100 tổng
        speed: 0.24,
        damage: 100,
        attackRate: 1000,
        bucketHp: 900,    // xô hấp thụ 900 điểm sát thương trước khi rơi
    },
    polevaulting: {
        maxHp: 300,
        speed: 0.5,
        damage: 100,
        attackRate: 1000,
    },
    newspaper: {
        maxHp: 200,          // bằng basic zombie
        speed: 0.28,         // tốc độ ban đầu (bằng basic)
        damage: 100,
        attackRate: 1000,    // nhịp tấn công ban đầu (bằng basic)
        paperHp: 100,        // HP báo — hết thì báo rách → zombie điên
        ragespeed: 0.5,      // tốc độ sau khi mất báo (nhanh gấp đôi!)
        rageAttackRate: 2000,// nhịp tấn công sau khi mất báo
    },
    brickhead: {
        maxHp: 1800,      
        speed: 0.2,     
        damage: 100,
        attackRate: 1000,
        brickHp: 1600,    // cục gạch hấp thụ 1600 sát thương trước khi vỡ
    },
};
