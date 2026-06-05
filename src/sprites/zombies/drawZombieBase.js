'use strict';
// ══════════════════════════════════════════════════════════════
//  drawZombieBase.js — Shared renderer for all human-sized zombies
//
//  Usage:  drawZombieBase(ctx, zombie)
//
//  Fields read from zombie:
//    x, y, animTime, state, hpPct, deathT  — standard Zombie state
//    render   {object}  — visual config (see below)
//    effects  {string[]}— active status effects
//
//  zombie.render keys (all optional):
//    rageEyes     {bool}
//    drawHeadFn   (ctx, hy, animTime, hpPct, rageEyes) => void
//    drawHatFn    (ctx, hy, animTime, state)           => void
//    drawGearFn   (ctx, animTime, eatBob)              => void
//    drawOutfitFn (ctx, zombie)                        => void
//      └─ replaces default shirt+tie; receives zombie for hpPct access
//    drawArmsFn   (ctx, animTime)                      => void
//      └─ replaces default arm pose; use for raised-arm / special grips
//
//  zombie.effects strings:
//    'slow' | 'burn' | 'poison' | 'frozen'
//    Future: 'butter' | 'hypno' | 'electric' | 'curse' | 'stun' | 'shield'
//
//  Render order (layer 1, inside body-sway transform):
//    shadow → legs → torso → outfit → arms → neck → head → hat → effects
//  Render order (layer 2, dying rotation only, no body sway):
//    gear
//
//  Zombies with a different skeleton (boss, giant, mech, imp, rider…)
//  skip this function and write their own draw logic.
// ══════════════════════════════════════════════════════════════

// ── Body part helpers ──────────────────────────────────────────

function _drawShadow(ctx, state) {
    if (state === 'dying') return;
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 40, 17, 5, 0, 0, Math.PI * 2); ctx.fill();
}

function _drawLegs(ctx, walk) {
    ctx.save(); ctx.translate(-7, 22); ctx.rotate(walk * 0.35);
    ctx.fillStyle = '#4A5699'; ctx.strokeStyle = '#283070'; ctx.lineWidth = 1.5;
    rr(ctx, -5, 0, 11, 20, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.ellipse(-2, 21, 8, 4.5,  0.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();

    ctx.save(); ctx.translate(7, 22); ctx.rotate(-walk * 0.35);
    ctx.fillStyle = '#4A5699'; ctx.strokeStyle = '#283070'; ctx.lineWidth = 1.5;
    rr(ctx, -5, 0, 11, 20, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.ellipse( 2, 21, 8, 4.5, -0.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}

function _drawTorso(ctx) {
    const sg = ctx.createLinearGradient(-14, -5, 14, 25);
    sg.addColorStop(0,   '#7a8e9e');
    sg.addColorStop(0.4, '#6a7e8e');
    sg.addColorStop(1,   '#485e6e');
    ctx.fillStyle = sg; ctx.strokeStyle = '#2e4050'; ctx.lineWidth = 2;
    rr(ctx, -14, -5, 28, 28, 5); ctx.fill(); ctx.stroke();
}

// Default outfit: modern zombie shirt + tie. Replaced by drawOutfitFn for themed worlds.
function _drawDefaultOutfit(ctx) {
    ctx.strokeStyle = 'rgba(38,55,70,0.75)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-5,  6); ctx.lineTo(-3, 16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo( 4,  5); ctx.lineTo( 7, 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-12, 5); ctx.lineTo(-10, 15); ctx.stroke();
    ctx.strokeStyle = 'rgba(20,30,40,0.8)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo( 9,  8); ctx.lineTo(12, 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-11, 14); ctx.lineTo(-8, 18); ctx.stroke();
    const tg = ctx.createLinearGradient(-2, -4, 2, 22);
    tg.addColorStop(0, '#8B0000'); tg.addColorStop(1, '#5a0010');
    ctx.fillStyle = tg;
    ctx.beginPath(); ctx.moveTo(-2, -4); ctx.lineTo(2, -4); ctx.lineTo(4, 18); ctx.lineTo(0, 22); ctx.lineTo(-4, 18); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#3a0008'; ctx.lineWidth = 1; ctx.stroke();
}

function _drawArms(ctx, animTime) {
    ctx.save(); ctx.translate(-14, 5); ctx.rotate(-0.25 + Math.sin(animTime * 2.8) * 0.08);
    ctx.fillStyle = '#8A9E88'; ctx.strokeStyle = '#4a5a48'; ctx.lineWidth = 1.5;
    rr(ctx, -28, -4, 30, 8, 4); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-30, 0, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();

    ctx.save(); ctx.translate(14, 5); ctx.rotate(0.55 + Math.sin(animTime * 2.8 + 1) * 0.06);
    ctx.fillStyle = '#8A9E88'; ctx.strokeStyle = '#4a5a48'; ctx.lineWidth = 1.5;
    rr(ctx, 0, -4, 22, 8, 4); ctx.fill(); ctx.stroke(); ctx.restore();
}

function _drawNeck(ctx) {
    ctx.fillStyle = '#8A9E88'; ctx.fillRect(-5, -18, 10, 14);
}

// ── Default head ───────────────────────────────────────────────

function _drawZombieHead(ctx, hy, animTime, hpPct, rageEyes) {
    const hg = ctx.createRadialGradient(-7, hy - 12, 1, 0, hy, 21);
    hg.addColorStop(0,    '#beccba');
    hg.addColorStop(0.35, '#8ea48a');
    hg.addColorStop(0.72, '#607060');
    hg.addColorStop(1,    '#3e4e3c');
    ctx.fillStyle = hg; ctx.strokeStyle = '#2a3828'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(0, hy, 19, 21, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = 'rgba(60,45,10,0.40)';
    ctx.beginPath(); ctx.ellipse(-10, hy + 7,  4.5, 3.5, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(  9, hy + 1,  3,   2.5,  0.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(  4, hy + 12, 2.5, 2,    0,   0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#2a2820'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    [-8, -3, 3, 8].forEach((hx, i) => {
        ctx.beginPath(); ctx.moveTo(hx, hy - 19);
        ctx.quadraticCurveTo(hx + (i % 2 === 0 ? -4 : 4), hy - 28, hx + (i % 2 === 0 ? -2 : 3), hy - 33);
        ctx.stroke();
    });

    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.ellipse(-6.5, hy - 5, 5.5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( 6.5, hy - 5, 5.5, 6, 0, 0, Math.PI * 2); ctx.fill();

    if (rageEyes) {
        ctx.shadowColor = '#FF2222'; ctx.shadowBlur = 8;
        const rg = ctx.createRadialGradient(0, hy - 4, 0, 0, hy - 4, 10);
        rg.addColorStop(0,    '#FF4444');
        rg.addColorStop(0.55, '#B00000');
        rg.addColorStop(1,    '#300000');
        ctx.fillStyle = rg;
    } else {
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
    }
    ctx.beginPath(); ctx.arc(-5.5, hy - 4, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc( 7.5, hy - 4, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#7a8e78';
    ctx.beginPath(); ctx.ellipse(-6.5, hy - 7, 5.5, 3, 0, Math.PI, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( 6.5, hy - 7, 5.5, 3, 0, Math.PI, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#3a0808';
    ctx.beginPath(); ctx.ellipse(0, hy + 10, 7.5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#E8DCC8';
    ctx.fillRect(-5, hy + 5, 4, 5);
    ctx.fillRect( 1, hy + 6, 3, 4);
    ctx.strokeStyle = 'rgba(120,200,120,0.7)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(2, hy + 15); ctx.quadraticCurveTo(3, hy + 20, 2, hy + 25); ctx.stroke();

    if (hpPct < 0.4) {
        ctx.fillStyle = 'rgba(180,15,15,0.80)';
        ctx.beginPath(); ctx.arc(-4, hy - 16, 5.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc( 8, hy - 8,  3,   0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#8B0000'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-8, hy - 13); ctx.lineTo(2, hy - 19); ctx.stroke();
        ctx.fillStyle = 'rgba(160,0,0,0.55)';
        ctx.beginPath();
        ctx.moveTo(-5, hy - 11); ctx.lineTo(-3, hy - 5); ctx.lineTo(-1, hy - 3);
        ctx.closePath(); ctx.fill();
    }
    if (hpPct < 0.2) {
        ctx.strokeStyle = 'rgba(200,160,100,0.5)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(10, hy - 14); ctx.lineTo(14, hy - 6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(14, hy - 6);  ctx.lineTo(10, hy + 2); ctx.stroke();
    }
}

// ── Status effect overlays ─────────────────────────────────────

function _drawSlowedOverlay(ctx) {
    ctx.save();
    ctx.globalAlpha *= 0.28;
    ctx.fillStyle = '#00E5FF';
    ctx.beginPath(); ctx.ellipse(0, -20, 24, 35, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
}

function _drawBurningOverlay(ctx, animTime) {
    ctx.save();
    const f = 0.5 + Math.sin(animTime * 17) * 0.35;
    ctx.globalAlpha *= 0.45 * f;
    const g = ctx.createRadialGradient(0, -5, 3, 0, -10, 38);
    g.addColorStop(0,   '#FFCC00');
    g.addColorStop(0.4, '#FF5500');
    g.addColorStop(1,   'rgba(200,40,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(0, -5, 22, 42, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
}

function _drawPoisonedOverlay(ctx, animTime) {
    ctx.save();
    ctx.globalAlpha *= 0.3 + Math.sin(animTime * 5) * 0.15;
    ctx.fillStyle = '#76C442';
    ctx.beginPath(); ctx.ellipse(0, -10, 22, 40, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
}

function _drawFrozenOverlay(ctx) {
    ctx.save();
    ctx.globalAlpha *= 0.55;
    const g = ctx.createLinearGradient(0, -55, 0, 42);
    g.addColorStop(0,   '#B3E5FC');
    g.addColorStop(0.5, '#29B6F6');
    g.addColorStop(1,   '#0277BD');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(0, -10, 22, 40, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
}

// Dispatches each active effect. Add new cases here as mechanics grow.
function _drawStatusEffects(ctx, zombie) {
    const effects = zombie.effects;
    if (!effects || effects.length === 0) return;
    const t = zombie.animTime;
    for (const fx of effects) {
        switch (fx) {
            case 'slow':   _drawSlowedOverlay(ctx);       break;
            case 'burn':   _drawBurningOverlay(ctx, t);   break;
            case 'poison': _drawPoisonedOverlay(ctx, t);  break;
            case 'frozen': _drawFrozenOverlay(ctx);        break;
        }
    }
}

// ── Public entry point ─────────────────────────────────────────

function drawZombieBase(ctx, zombie) {
    const { x, y, animTime, state, hpPct, deathT } = zombie;
    const render = zombie.render || {};
    const rageEyes    = render.rageEyes    || false;
    const drawHeadFn  = render.drawHeadFn  || null;
    const drawHatFn   = render.drawHatFn   || null;
    const drawGearFn  = render.drawGearFn  || null;
    const drawOutfitFn = render.drawOutfitFn || null;
    const drawArmsFn   = render.drawArmsFn   || null;

    const walk   = state === 'walking' ? Math.sin(animTime * 5.5) : 0;
    const eatBob = state === 'eating'  ? Math.abs(Math.sin(animTime * 7)) * 10 : 0;

    // ── Layer 1: body (translate → dying rotation → body sway) ──
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    if (state === 'dying') {
        ctx.rotate(-deathT * 1.5);
        ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4);
    }
    ctx.rotate(walk * 0.06);

    _drawShadow(ctx, state);
    _drawLegs(ctx, walk);
    _drawTorso(ctx);
    if (drawOutfitFn) drawOutfitFn(ctx, zombie);
    else              _drawDefaultOutfit(ctx);
    if (drawArmsFn) drawArmsFn(ctx, animTime);
    else            _drawArms(ctx, animTime);
    _drawNeck(ctx);

    const hy = -36 + eatBob;
    if (drawHeadFn) drawHeadFn(ctx, hy, animTime, hpPct, rageEyes);
    else            _drawZombieHead(ctx, hy, animTime, hpPct, rageEyes);

    if (drawHatFn) drawHatFn(ctx, hy, animTime, state);

    if (state !== 'dying') _drawStatusEffects(ctx, zombie);

    ctx.restore();

    // ── Layer 2: gear (translate → dying rotation, no body sway) ─
    if (drawGearFn) {
        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        if (state === 'dying') {
            ctx.rotate(-deathT * 1.5);
            ctx.globalAlpha = Math.max(0, 1 - deathT * 1.4);
        }
        drawGearFn(ctx, animTime, eatBob);
        ctx.restore();
    }
}
