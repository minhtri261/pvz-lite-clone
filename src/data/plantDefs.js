'use strict';
// ══════════════════════════════════════════════════════════════
//  plantDefs.js — Thông số tĩnh của từng loại cây
//  Đây là "bản thông số kỹ thuật" — không chứa logic game,
//  chỉ lưu số liệu để các class cây đọc khi khởi tạo.
// ══════════════════════════════════════════════════════════════
const PLANT_DEFS = {
    sunflower: {
        name: 'Sunflower',
        cost: 50,          // giá đặt (ánh nắng)
        hp: 300,           // máu
        cooldownMs: 7000,  // thời gian chờ sau khi dùng (ms)
        sunInterval: 23000,// cứ 23s sản xuất 1 ánh nắng
        sunAmount: 25,     // mỗi lần sản xuất được 25 ánh nắng
    },
    peashooter: {
        name: 'Peashooter',
        cost: 100,
        hp: 300,
        cooldownMs: 7000,
        fireRate: 1500,    // bắn 1 viên mỗi 1.5 giây
        peaDamage: 20,     // sát thương mỗi viên đạn
    },
    wallnut: {
        name: 'Wall-nut',
        cost: 50,
        hp: 4000,          // máu rất cao — dùng để chặn zombie
        cooldownMs: 30000, // phải chờ 30 giây mới đặt được lại
    },
    cherrybomb: {
        name: 'Cherry Bomb',
        cost: 150,
        hp: 100000,             // gần như không có máu (nổ ngay)
        cooldownMs: 50000, // cooldown lâu nhất — 50 giây
        fuseMs: 1500,      // ngòi nổ cháy trong 1.5 giây rồi phát nổ
        blastDmg: 2000,    // sát thương đủ tiêu diệt mọi zombie trong vùng 3×3
    },
    potatomine: {
        name: 'Potato Mine',
        cost: 25,          // rẻ nhất — nhưng cần thời gian kích hoạt
        hp: 300,           // zombie có thể ăn trong lúc chưa kích hoạt
        cooldownMs: 20000,
        armMs: 14000,      // 14 giây để kích hoạt (từ trạng thái ngủ → sẵn sàng nổ)
        blastDmg: 1800,   // tiêu diệt tức thời zombie bước lên
    },
    chomper: {
        name: 'Chomper',
        cost: 150,
        hp: 400,
        cooldownMs: 7000,
        rechargeMs: 35000,  // 35s tiêu hoá sau khi zombie chết
        chompRange: 120,    // tầm cắn 120px — gấp đôi, vươn xa để bắt zombie trước
        chompDmg:   900,    
        biteInterval: 1500, // ms giữa 2 nhát cắn khi zombie chưa chết
    },
    // ── Fusion-only plants (không đặt trực tiếp) ────────────────
    minenut: {
        name: 'Mine Nut',
        cost: 0,           // fusion-only: wallnut + potatomine
        hp: 4000,          // WallNut HP — nhưng khi chết sẽ phát nổ!
        cooldownMs: 30000,
        blastDmg: 1800,    // nổ bằng PotatoMine khi hết máu
        blastRange: 160,   // 2 ô = 2 × CELL_W
    },
    sunshroom: {
        name: 'Sun-shroom',
        cost: 0,             // fusion-only: puffshroom + sunflower
        hp: 200,             // yếu — giống PuffShroom
        cooldownMs: 7500,
        sunAmount: 25,
        sunIntervalDay:   25000, // ban ngày: 25s/sun
        sunIntervalNight: 20000, // ban đêm: 20s/sun (nấm thích bóng tối!)
    },
    peashroom: {
        name: 'Pea-shroom',
        cost: 0,           // fusion-only: puffshroom + peashooter
        hp: 200,           // yếu như PuffShroom — nấm mỏng manh
        cooldownMs: 7500,
        fireRate: 1500,    // bắn 1 viên mỗi 1.5s
        peaDamage: 20,     // sát thương bằng Peashooter, đạn xanh lá
    },
    nutshroom: {
        name: 'Nut-shroom',
        cost: 0,           // fusion-only: puffshroom + wallnut
        hp: 2200,          // trung bình — ít hơn WallNut (4000) nhưng hơn WallNut thu nhỏ
        cooldownMs: 30000, // cooldown dài như WallNut
    },
    sunnut: {
        name: 'Sun-nut',
        cost: 0,           // fusion-only: wallnut(50) + sunflower(50)
        hp: 4000,          // WallNut HP — vẫn chặn được zombie
        cooldownMs: 30000, // WallNut cooldown
        sunInterval: 28000,// hơi chậm hơn Sunflower (23s)
        sunAmount: 25,
    },
    sunmine: {
        name: 'Sun Mine',
        cost: 0,           // fusion-only: sunflower(50) + potatomine(25)
        hp: 300,
        cooldownMs: 20000,
        armMs: 14000,
        blastDmg: 1800,
        sunInterval: 23000, // sản xuất sun như Sunflower
        sunAmount: 25,
    },
    potatoshooter: {
        name: 'Potato Shooter',
        cost: 0,           // fusion-only: peashooter(100) + potatomine(25)
        hp: 400,
        cooldownMs: 20000,
        armMs: 14000,
        blastDmg: 1800,
        fireRate: 1500,    // bắn mỗi 1.5s
        peaDamage: 20,     // đạn nâu, sát thương 20
    },
    repeater: {
        name: 'Repeater',
        cost: 175,      
        hp: 300,
        cooldownMs: 7000,
        fireRate: 1500,    // bắn burst 2 viên mỗi 1.5s
        peaDamage: 20,     // mỗi viên 20 dmg → burst 40 dmg/lần
        burstDelay: 150,   // khoảng cách giữa 2 viên trong cùng 1 burst (ms)
    },
    sunshooter: {
        name: 'Sun-Shooter',
        cost: 125,         // kết hợp Sunflower + Peashooter
        hp: 300,
        cooldownMs: 7000,
        sunInterval: 23000,
        sunAmount: 25,
        fireRate: 1500,  
        peaDamage: 15,     // bắn đạn yếu hơn Peashooter, nhưng có thể sản xuất sun
    },
    twinsun: {
        name: 'Twin Sunflower',
        cost: 125,          // PvZ2: 125 sun
        hp: 300,
        cooldownMs: 15000,  // cooldown dài hơn Sunflower vì hiệu quả hơn
        sunInterval: 23000, // sản xuất 2 sun mỗi 25s (= 50 sun) vs Sunflower 25sun/23s
        sunAmount: 25,      // mỗi lần drop 25, nhưng drop 2 cùng lúc → 50 sun/chu kỳ
    },
    peanut: {
        name: 'Peanut',
        cost: 150,          // PvZ Fusion: kết hợp Wall-nut + Peashooter
        hp: 4000,           // máu bằng Wall-nut — vừa bắn vừa chặn
        cooldownMs: 30000,  // cooldown bằng Wall-nut
        fireRate: 2000,     // chậm hơn Peashooter (nó là cây chặn mà)
        peaDamage: 20,      // sát thương bằng Peashooter, đạn màu nâu
    },
    puffshroom: {
        name: 'Puff-shroom',
        cost:      75,   // ban ngày: 75 sun
        nightCost: 0,    // ban đêm: MIỄN PHÍ (0 sun)
        hp:        200,  // yếu hơn Peashooter — nấm dễ bị phá
        cooldownMs: 7500,
        fireRate:  1500, // tốc độ bắn bằng Peashooter
        peaDamage: 20,   // sát thương bằng Peashooter
        range:     240,  // chỉ bắn trong 3 ô (3 × 80px = 240px) — giới hạn tầm
    },
    snowpea: {
        name: 'Snow Pea',
        cost: 150,
        hp: 300,
        cooldownMs: 7000,
        fireRate: 1500,
        peaDamage: 20,
        slowMs: 3000,      // zombie trúng đạn bị chậm 50% trong 3 giây
    },
};
