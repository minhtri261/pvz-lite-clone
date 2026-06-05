'use strict';
// ══════════════════════════════════════════════════════════════
//  createZombie.js — Factory function tạo đối tượng zombie
//  Được gọi bởi _updateWaves() trong Game.js mỗi khi spawn zombie.
//  row: chỉ số hàng (0–4) đã được xác định trước khi gọi hàm này.
// ══════════════════════════════════════════════════════════════

function createZombie(type, row) {
    switch (type) {
        case 'basic':    return new BasicZombie(row);
        case 'flag':     return new FlagZombie(row);
        case 'conehead': return new ConeheadZombie(row);
        case 'bucket':       return new BucketZombie(row);
        case 'polevaulting': return new PoleVaultingZombie(row);
        case 'brickhead':    return new BrickheadZombie(row);
        case 'newspaper':    return new NewspaperZombie(row);
    }
}
