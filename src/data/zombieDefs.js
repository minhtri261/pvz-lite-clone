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
        maxHp: 1070 ,          // tổng tham khảo (800 báo + 270 thân) — constructor tự đặt
                               // lại hp/maxHp = basic.maxHp (270), xem NewspaperZombie.js
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
        speed: 0.5,       // cao hơn basic
        damage: 100,       // sát thương cắn khi đuốc đã tắt (hành xử như Basic)
        attackRate: 1000, // nhịp cắn khi đuốc đã tắt (hành xử như Basic)
        burnDamage: 10000000,    //  sát thương đốt mỗi tick (cây nào trong tầm sẽ bị đốt cháy ngay lập tức)
        burnRate: 500,     // tick đốt mỗi 0.5s → 140 dps (mạnh hơn Basic 100 dps)
    },
    door: {
        maxHp: 1670,      // tổng tham khảo (1400 cửa + 270 thân) — constructor tự đặt
                          // lại hp/maxHp = basic.maxHp (270), xem DoorZombie.js
        speed: 0.28,      // bằng basic — hành xử như Basic ngoài lớp giáp cửa
        damage: 100,
        attackRate: 1000,
        doorHp: 1400,     // cánh cửa hấp thụ 1400 điểm sát thương trước khi vỡ
    },
    tombraiser: {
        maxHp: 270,       // bằng basic
        speed: 0.26,      // hơi chậm hơn basic — bận đào mộ
        damage: 100,
        attackRate: 1000,
        tombCreateInterval: 20000, // cứ 20s kể từ lúc spawn (hoặc từ lần tạo mộ trước), làm nghi lễ tạo mộ
        raiseDurationMs: 2000,     // đứng lại + giơ 2 tay lên trời trong 2s khi làm nghi lễ
        tombOffsetRange: 20,       // mộ xuất hiện lệch ngẫu nhiên ±20px quanh vị trí đang đứng (tổng 40px)
        tombHp: 280,               // máu của lăng mộ vừa tạo
        tombSpawnRateMs: 40000,    // lăng mộ vừa tạo sinh zombie mỗi 40s
        tombZombieTypes: ['conehead'], // lăng mộ vừa tạo chỉ sinh Conehead Zombie
    },
    pharaoh: {
        maxHp: 1500,       // tổng tham khảo (1200 quan tài + 300 thân) — constructor tự
                            // đặt lại hp/maxHp = bodyHp (300), xem PharaohZombie.js
        speed: 0.2,        // tốc độ khi còn quan tài — chậm, lê quan tài đi
        damage: 100,       // sát thương khi còn quan tài — đập cây bằng chính quan tài
        attackRate: 1000,
        sarcophagusHp:  1200, // quan tài hấp thụ TOÀN BỘ sát thương trước khi vỡ (không ngoại lệ)
        bodyHp:         300,  // HP thân xác ướp sau khi quan tài vỡ
        revealSpeed:    0.5,  // tốc độ sau khi lộ xác ướp — nhanh hơn hẳn
        revealDamage:   200,  // sát thương sau khi lộ xác ướp
    },
    explorerbucket: {
        maxHp: 1370,       // tổng tham khảo (1100 xô + 270 thân, giống cách BucketZombie
                           // tính) — constructor giữ nguyên, xem ExplorerBucketZombie.js
        speed: 0.5,        // bằng Explorer Zombie
        damage: 100,       // sát thương khi đuốc đã tắt (hành xử như Basic)
        attackRate: 1000,  // nhịp cắn khi đuốc đã tắt (hành xử như Basic)
        burnDamage: 10000000, // bằng Explorer — đốt cháy cây ngay lập tức
        burnRate: 500,         // bằng Explorer — tick đốt mỗi 0.5s
        bucketHp: 1100,        // lấy y nguyên từ Buckethead Zombie
    },
};
