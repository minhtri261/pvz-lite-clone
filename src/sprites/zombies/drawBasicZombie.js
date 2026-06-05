'use strict';
// Thin wrapper — kept for external callers. Zombie classes use drawZombieBase(ctx, this) directly.
function drawBasicZombie(ctx, x, y, animTime, state, hpPct, deathT, rageEyes) {
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: { rageEyes: !!rageEyes },
        effects: [],
    });
}
