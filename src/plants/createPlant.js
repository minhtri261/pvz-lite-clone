'use strict';
// ══════════════════════════════════════════════════════════════
//  createPlant.js — Factory function tạo đối tượng cây
//  Nhận vào chuỗi type và trả về instance của class tương ứng.
//  Dùng bởi Game._tryPlace() và CherryBomb._explode() (gián tiếp).
// ══════════════════════════════════════════════════════════════

function createPlant(type, col, row) {
    switch (type) {
        case 'sunflower':  return new Sunflower(col, row);
        case 'peashooter': return new Peashooter(col, row);
        case 'wallnut':    return new WallNut(col, row);
        case 'cherrybomb': return new CherryBomb(col, row);
        case 'potatomine': return new PotatoMine(col, row);
        case 'snowpea':    return new SnowPea(col, row);
    }
}
