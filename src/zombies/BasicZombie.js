'use strict';
class BasicZombie extends Zombie {
    constructor(row) { super('basic', row); }

    draw(ctx) {
        this.drawHitFlash(ctx);
        drawZombieBase(ctx, this);
    }
}
