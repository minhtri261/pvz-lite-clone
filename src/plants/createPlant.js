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
        case 'chomper':    return new Chomper(col, row);
        case 'repeater':   return new Repeater(col, row);
        case 'sunshooter': return new SunShooter(col, row);
        case 'twinsun':    return new TwinSun(col, row);
        case 'peanut':     return new Peanut(col, row);
        case 'puffshroom':    return new PuffShroom(col, row);
        case 'sunnut':        return new SunNut(col, row);
        case 'sunmine':       return new SunMine(col, row);
        case 'potatoshooter': return new PotatoShooter(col, row);
        case 'minenut':       return new MineNut(col, row);
        case 'sunshroom':     return new SunShroom(col, row);
        case 'peashroom':     return new PeaShroom(col, row);
        case 'nutshroom':     return new NutShroom(col, row);
        case 'snowpea':       return new SnowPea(col, row);
    }
}
