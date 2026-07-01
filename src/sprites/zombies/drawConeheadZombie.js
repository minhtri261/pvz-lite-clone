'use strict';
// ══════════════════════════════════════════════════════════════
//  drawConeheadZombie.js — Nón giao thông biến dạng theo 3 mốc máu:
//    pct > 0.6   → STAGE 1: nón còn nguyên, thẳng
//    0.3 < pct ≤ 0.6 → STAGE 2: méo nhẹ, nứt, sọc trắng lệch
//    pct ≤ 0.3   → STAGE 3: bị bẹp/gãy gập mạnh, nứt nhiều, sọc đứt đoạn
//  Khi nón vỡ (coneHp ≤ 0): chơi animation vỡ thành nhiều mảnh bay ra
//  (breakT: 0→1, ~500ms) trước khi biến mất hoàn toàn.
// ══════════════════════════════════════════════════════════════

// Hình dạng cone theo từng stage — apex/2 góc đáy lệch dần khi méo
const _CONE_STAGE_GEO = [
    { apex: [0,  -62], baseL: [-16, -16], baseR: [16, -16] }, // stage 1 — nguyên
    { apex: [4,  -57], baseL: [-17, -15], baseR: [14, -17] }, // stage 2 — méo nhẹ
    { apex: [11, -42], baseL: [-18, -14], baseR: [11, -18] }, // stage 3 — bẹp/gãy gập
];

function _coneStage(pct) {
    if (pct <= 0.3) return 2;
    if (pct <= 0.6) return 1;
    return 0;
}

function _drawConeHat(ctx, hy, animTime, state, pct = 1) {
    const stage = _coneStage(pct);
    const geo   = _CONE_STAGE_GEO[stage];
    const [ax, ay] = geo.apex, [lx, ly] = geo.baseL, [rx, ry] = geo.baseR;

    // ── Thân nón — méo dần theo stage ───────────────────────────
    const cg = ctx.createLinearGradient(-14, hy - 62, 14, hy - 16);
    cg.addColorStop(0,   stage >= 2 ? '#C96A00' : '#FF8C00');
    cg.addColorStop(0.6, stage >= 2 ? '#A84400' : '#FF5500');
    cg.addColorStop(1,   stage >= 1 ? '#9A1C00' : '#CC2200');
    ctx.fillStyle = cg; ctx.strokeStyle = '#8B2200'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(ax, hy + ay);
    ctx.lineTo(rx, hy + ry);
    ctx.lineTo(lx, hy + ly);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    // ── Sọc phản quang trắng — nguyên ở stage 1, lệch ở stage 2, đứt đoạn ở stage 3 ──
    ctx.strokeStyle = 'rgba(255,255,255,0.75)'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    if (stage === 0) {
        ctx.beginPath(); ctx.moveTo(-9, hy - 28); ctx.lineTo(9, hy - 28); ctx.stroke();
    } else if (stage === 1) {
        ctx.beginPath(); ctx.moveTo(-9, hy - 26); ctx.lineTo(1, hy - 30); ctx.lineTo(8, hy - 25); ctx.stroke();
    } else {
        ctx.beginPath(); ctx.moveTo(-10, hy - 22); ctx.lineTo(-3, hy - 25); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(2, hy - 19); ctx.lineTo(7, hy - 16); ctx.stroke();
    }

    // ── Đế nón ───────────────────────────────────────────────────
    ctx.fillStyle = '#CC3300'; ctx.strokeStyle = '#8B2200'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, hy - 16, 17, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // ── Vết nứt + mảnh vỡ tăng dần theo stage ───────────────────
    if (stage >= 1) {
        ctx.strokeStyle = 'rgba(60,15,0,0.85)'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(ax - 2, hy + ay + 6); ctx.lineTo(ax + 3, hy + ay + 20); ctx.lineTo(ax - 4, hy + ay + 32); ctx.stroke();
        // Mẩu sứt nhỏ ở cạnh phải
        ctx.fillStyle = 'rgba(40,10,0,0.55)';
        ctx.beginPath(); ctx.moveTo(rx - 1, hy + ry); ctx.lineTo(rx - 6, hy + ry - 5); ctx.lineTo(rx - 8, hy + ry + 2); ctx.closePath(); ctx.fill();
    }
    if (stage >= 2) {
        ctx.strokeStyle = 'rgba(40,8,0,0.9)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(2, hy - 50); ctx.lineTo(-4, hy - 36); ctx.lineTo(3, hy - 24); ctx.stroke();
        // Mẩu sứt lớn ở cạnh trái + lỗ thủng nhỏ
        ctx.fillStyle = 'rgba(30,6,0,0.6)';
        ctx.beginPath(); ctx.moveTo(lx + 2, hy + ly); ctx.lineTo(lx + 10, hy + ly - 7); ctx.lineTo(lx + 11, hy + ly + 3); ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(20,4,0,0.7)';
        ctx.beginPath(); ctx.ellipse(-2, hy - 34, 3, 4, 0.3, 0, Math.PI * 2); ctx.fill();
    }
}

// ── Animation vỡ nón — vài mảnh nón bay ra, xoay, mờ dần ────────
// breakT: 0 → 1 (~500ms). Vị trí/hướng mảnh cố định (không random theo
// frame) để không bị giật hình giữa các lần vẽ.
const _CONE_SHARDS = [
    { dx: -1.0, dy: -1.3, rot: -3.2, size: 9, ang: 0.3 },
    { dx:  0.2, dy: -1.6, rot:  2.8, size: 7, ang: 1.6 },
    { dx:  1.1, dy: -1.0, rot: -2.1, size: 8, ang: -0.6 },
    { dx: -0.7, dy: -0.3, rot:  4.0, size: 6, ang: 2.4 },
    { dx:  0.8, dy:  0.1, rot: -3.6, size: 7, ang: -1.8 },
];

function _drawConeBreaking(ctx, hy, breakT) {
    const t      = Math.min(Math.max(breakT, 0), 1);
    const originY = hy - 40;

    // Nón giai đoạn 3 mờ dần đi trong nửa đầu animation, làm nền cho mảnh vỡ bay ra
    if (t < 0.5) {
        ctx.save();
        ctx.globalAlpha = 1 - t * 2;
        _drawConeHat(ctx, hy, 0, 'walking', 0.3);
        ctx.restore();
    }

    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - t * 1.15);
    for (const s of _CONE_SHARDS) {
        const px = s.dx * t * 46;
        const py = s.dy * t * 46 + t * t * 38; // rơi xuống dần theo "trọng lực"
        ctx.save();
        ctx.translate(px, originY + py);
        ctx.rotate(s.rot * t);
        const sg = ctx.createLinearGradient(-s.size, -s.size, s.size, s.size);
        sg.addColorStop(0, '#FF8C00'); sg.addColorStop(1, '#9A1C00');
        ctx.fillStyle = sg; ctx.strokeStyle = '#6B1800'; ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(0, -s.size);
        ctx.lineTo(s.size * 0.8, s.size * 0.5);
        ctx.lineTo(-s.size * 0.8, s.size * 0.5);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
    }
    ctx.restore();
}

// Legacy wrapper (dùng cho thumbnail trong Zombie Notes / danh sách màn hình chính)
// conePct: % máu nón còn lại — mặc định 1 (nguyên vẹn) cho thumbnail tĩnh
function drawConeheadZombie(ctx, x, y, animTime, state, hpPct, hasCone, deathT, conePct = 1) {
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: { drawHatFn: hasCone ? (ctx2, hy, at, st) => _drawConeHat(ctx2, hy, at, st, conePct) : null },
        effects: [],
    });
}
