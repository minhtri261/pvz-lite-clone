'use strict';

// Athletic singlet with white side stripes (replaces default shirt+tie)
function _drawAthleticOutfit(ctx) {
    const sg = ctx.createLinearGradient(-12, -4, 12, 24);
    sg.addColorStop(0, '#CC1A1A');
    sg.addColorStop(1, '#8a0e0e');
    ctx.fillStyle = sg;
    ctx.strokeStyle = '#5a0808';
    ctx.lineWidth = 1.5;
    rr(ctx, -12, -4, 24, 28, 3);
    ctx.fill();
    ctx.stroke();

    // Side stripes
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(-12, -2, 4, 26);
    ctx.fillRect(8, -2, 4, 26);
}

// Both arms raised to carry pole overhead.
// Right arm (translate 14,2) grips the rear end; left arm (translate -14,2) grips mid-pole.
function _drawVaultArms(ctx, animTime, vaulting, vaultT) {
    const sway = Math.sin(animTime * 5.5);

    // Left arm — raised, grips pole mid-length
    ctx.save();
    ctx.translate(-14, 2);
    ctx.rotate(-1.35 + sway * 0.04);
    ctx.fillStyle = '#8A9E88';
    ctx.strokeStyle = '#4a5a48';
    ctx.lineWidth = 1.5;
    rr(ctx, 0, -4, 24, 8, 4);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(26, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Right arm — raised high, grips the trailing end of the pole
    let rAngle;
    if (!vaulting) {
        rAngle = -1.2 + sway * 0.03;
    } else {
        // Arm sweeps down/forward during vault swing
        rAngle = lerp(-1.2, 0.55, clamp(vaultT / 0.5, 0, 1));
    }
    ctx.save();
    ctx.translate(14, 2);
    ctx.rotate(rAngle);
    ctx.fillStyle = '#8A9E88';
    ctx.strokeStyle = '#4a5a48';
    ctx.lineWidth = 1.5;
    rr(ctx, 0, -4, 22, 8, 4);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

// Pole: horizontal carry → plant into ground → swing-over arc → fade out
// Pivot is the right hand grip point at (20, -20).
// The pole extends leftward (toward plants) from that pivot.
function _drawPoleGear(ctx, animTime, vaulting, vaultT) {
    const bob = vaulting ? 0 : Math.sin(animTime * 3.5) * 1.5;
    let angle, fade = 1;

    if (!vaulting) {
        // Nearly horizontal, barely descending toward the left (forward) end
        angle = Math.PI - 0.06 + Math.sin(animTime * 1.8) * 0.02;
    } else if (vaultT < 0.35) {
        // Plant phase: pole rotates from near-horizontal to planted
        angle = lerp(Math.PI - 0.06, Math.PI - 0.82, vaultT / 0.35);
    } else {
        // Swing phase: pole continues rotating as zombie vaults over; fades out
        const t = (vaultT - 0.35) / 0.65;
        angle = lerp(Math.PI - 0.82, Math.PI - 1.65, t);
        if (t > 0.5) fade = Math.max(0, 1 - (t - 0.5) / 0.5);
    }

    ctx.save();
    ctx.globalAlpha *= fade;
    ctx.translate(20, -20 + bob);
    ctx.rotate(angle);

    // Pole shaft
    ctx.strokeStyle = '#7a5012';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(95, 0);
    ctx.stroke();

    // Shine highlight along top edge
    ctx.strokeStyle = 'rgba(230,165,55,0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(2, -2);
    ctx.lineTo(93, -2);
    ctx.stroke();

    // Grip tape wraps at the holding end
    ctx.strokeStyle = '#3a1500';
    ctx.lineWidth = 3;
    for (let g = 5; g <= 28; g += 7) {
        ctx.beginPath();
        ctx.moveTo(g, -4);
        ctx.lineTo(g + 3, 4);
        ctx.stroke();
    }

    ctx.restore();
}

// Legacy wrapper (kept for any direct callers; zombie class uses get render() instead)
function drawPoleVaultingZombie(ctx, x, y, animTime, state, hpPct, hasVault, vaulting, vaultT, deathT) {
    drawZombieBase(ctx, {
        x, y, animTime, state, hpPct, deathT,
        render: {
            drawOutfitFn: _drawAthleticOutfit,
            drawArmsFn: hasVault
                ? (c, at) => _drawVaultArms(c, at, vaulting, vaultT)
                : null,
            drawGearFn: hasVault
                ? (c, at) => _drawPoleGear(c, at, vaulting, vaultT)
                : null,
        },
        effects: [],
    });
}
