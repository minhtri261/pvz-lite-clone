'use strict';
// ══════════════════════════════════════════════════════════════
//  zombieDefs.js — Thông số tĩnh của từng loại zombie
// ══════════════════════════════════════════════════════════════
const ZOMBIE_DEFS = {
    basic: {
        maxHp: 270,       // máu cơ bản
        speed: 0.28,      // tốc độ di chuyển (pixel/frame ở 60fps)
        damage: 100,      // sát thương mỗi đòn cắn
        attackRate: 1000, // cắn 1 lần mỗi giây (ms)
    },
    flag: {
        maxHp: 270,
        speed: 0.5,       // nhanh hơn basic — dẫn đầu làn sóng
        damage: 100,
        attackRate: 1000,
    },
    conehead: {
        maxHp: 640,       // 370   (nón) + 270 (cơ thể) = 640 tổng
        speed: 0.28,
        damage: 100,
        attackRate: 1000,
        coneHp: 370  ,      // nón hấp thụ 370  điểm sát thương trước khi rơi
    },
    bucket: {
        maxHp: 1370,      // 1100  (xô) + 270 (cơ thể) = 1370 tổng
        speed: 0.24,
        damage: 100,
        attackRate: 1000,
        bucketHp: 1100 ,    // xô hấp thụ 1100  điểm sát thương trước khi rơi
    },
    polevaulting: {
        maxHp: 340,
        speed: 0.5,
        damage: 100,
        attackRate: 1000,
    },
    newspaper: {
        maxHp: 1070 ,          // bằng basic zombie
        speed: 0.28,         // tốc độ ban đầu (bằng basic)
        damage: 100,
        attackRate: 1000,    // nhịp tấn công ban đầu (bằng basic)
        paperHp: 800 ,        // HP báo — hết thì báo rách → zombie điên
        ragespeed: 0.5,      // tốc độ sau khi mất báo (nhanh gấp đôi!)
        rageAttackRate: 1000,// nhịp tấn công sau khi mất báo (chậm hơn — 1 cắn / 1s)
        rageDamage: 250,     // sát thương mỗi cắn khi điên loạn — bù lại nhịp cắn chậm
                             // (250/2s = 125 dps > 100 dps của basic, đúng nghĩa "điên loạn mạnh hơn")
    },
    brickhead: {
        maxHp: 2470,      // 2200 (gạch) + 270 (cơ thể) = 2470 tổng
        speed: 0.2,
        damage: 100,
        attackRate: 1000,
        brickHp: 2200,    // cục gạch hấp thụ 2200 sát thương trước khi vỡ
    },
    explorer: {
        maxHp: 270,        // bằng basic — nhà khảo cổ dày dạn
        speed: 0.4,       // cao hơn basic
        damage: 100,       // sát thương cắn khi đuốc đã tắt (hành xử như Basic)
        attackRate: 1000, // nhịp cắn khi đuốc đã tắt (hành xử như Basic)
        burnDamage: 10000000,    //  sát thương đốt mỗi tick (cây nào trong tầm sẽ bị đốt cháy ngay lập tức)
        burnRate: 500,     // tick đốt mỗi 0.5s → 140 dps (mạnh hơn Basic 100 dps)
    },
    tombraiser: {
        maxHp: 270,       // bằng basic
        speed: 0.26,      // hơi chậm hơn basic — bận đào mộ
        damage: 100,
        attackRate: 1000,
        tombCreateInterval: 20000, // cứ 20s kể từ lúc spawn, tạo 1 lăng mộ phía trước
        tombHp: 280,               // máu của lăng mộ vừa tạo
        tombSpawnRateMs: 40000,    // lăng mộ vừa tạo sinh zombie mỗi 40s
        tombZombieTypes: ['conehead'], // lăng mộ vừa tạo chỉ sinh Conehead Zombie
    },
};
