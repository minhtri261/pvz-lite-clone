'use strict';
// ══════════════════════════════════════════════════════════════
//  drawExplorerBucketZombie.js — Explorer Zombie + xô thép Buckethead
//  Tái dùng các hàm vẽ đã có (mũ khảo cổ, đuốc, xô) — không vẽ lại.
//  Legacy wrapper (dùng cho thumbnail trong Zombie Notes / danh sách màn hình chính)
// ══════════════════════════════════════════════════════════════
function drawExplorerBucketZombie(ctx, x, y, animTime, state, hpPct, lit, hasBucket, deathT) {
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: {
            drawOutfitFn: _drawArchaeologistOutfit,
            drawHatFn:    hasBucket ? _drawBucketHat : _drawExplorerHat,
            drawArmsFn:   _drawTorchArms,
            drawGearFn:   (ctx2, at, eb) => _drawTorchGear(ctx2, at, eb, lit),
        },
        effects: [],
    });
}
