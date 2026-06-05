'use strict';
// ══════════════════════════════════════════════════════════════
//  main.js — Điểm khởi động game: gắn sự kiện + vòng lặp chính
//  File này load SAU CÙNG (sau Game.js) để mọi class đã sẵn sàng.
// ══════════════════════════════════════════════════════════════

// ── Gắn sự kiện chuột cho canvas ──────────────────────────────

// Di chuột → cập nhật ô hover để vẽ highlight và bóng ma cây
canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    const sx = canvas.width / r.width;
    const sy = canvas.height / r.height;
    game.handleMouseMove((e.clientX - r.left) * sx, (e.clientY - r.top) * sy);
});

// Click chuột trái → thu sun / đào cây (xẻng) / đặt cây
canvas.addEventListener('click', e => {
    const r = canvas.getBoundingClientRect();
    const sx = canvas.width / r.width;
    const sy = canvas.height / r.height;
    game.handleClick((e.clientX - r.left) * sx, (e.clientY - r.top) * sy);
});

// Click chuột phải → hủy lựa chọn (không hiện menu chuột phải)
canvas.addEventListener('contextmenu', e => {
    e.preventDefault(); // tắt menu mặc định của trình duyệt
    const r = canvas.getBoundingClientRect();
    const sx = canvas.width / r.width;
    const sy = canvas.height / r.height;
    game.handleRightClick((e.clientX - r.left) * sx, (e.clientY - r.top) * sy);
});

// ── Phím tắt ──────────────────────────────────────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (game.state === 'paused') {
            game.togglePause();               // ESC khi đang pause → tiếp tục
        } else if (game.state === 'playing') {
            if (game.selectedType || game.shovelMode) {
                game._deselect();             // ESC khi đang chọn cây/xẻng → hủy chọn
            } else {
                game.togglePause();           // ESC khi đang chơi bình thường → pause
            }
        }
    }
    if (e.key === 's' || e.key === 'S') game.selectShovel();
    if (e.key === 'm' || e.key === 'M') {
        const muted = audioManager.toggleMute();
        const btn   = document.getElementById('btn-mute');
        btn.textContent = muted ? '🔇' : '🔊';
        btn.classList.toggle('muted', muted);
    }
    if (e.key === 'p' || e.key === 'P') {
        if (game.state === 'playing' || game.state === 'paused') game.togglePause();
    }
});

// ── Gắn sự kiện cho thẻ cây trong HUD ─────────────────────────
['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine',
 'chomper', 'repeater', 'sunshooter', 'twinsun', 'peanut', 'puffshroom', 'snowpea'].forEach(type => {
    document.getElementById(`card-${type}`).addEventListener('click', () => game.selectCard(type));
});

// Nút xẻng
document.getElementById('shovel-btn').addEventListener('click', () => game.selectShovel());

// ── Gắn sự kiện cho các nút màn hình overlay ──────────────────
document.getElementById('btn-nextlevel').addEventListener('click', () => {
    game.startLevel(game.currentLevelId + 1);
});
document.getElementById('btn-retry').addEventListener('click',   () => game.restart());
document.getElementById('btn-menu').addEventListener('click',    () => game.showMenu());
document.getElementById('btn-winplay').addEventListener('click', () => game.showMenu());

// Màn chọn cây
document.getElementById('btn-startlevel').addEventListener('click',     () => game.confirmPlantPick());
document.getElementById('btn-plantpick-back').addEventListener('click', () => game.showMenu());

// Pause menu
document.getElementById('btn-resume').addEventListener('click',       () => game.togglePause());
document.getElementById('btn-retry-pause').addEventListener('click',  () => { game.togglePause(); game.restart(); });
document.getElementById('btn-menu-pause').addEventListener('click',   () => game.showMenu());

// HUD buttons
document.getElementById('btn-pause-hud').addEventListener('click', () => {
    if (game.state === 'playing' || game.state === 'paused') game.togglePause();
});
document.getElementById('btn-mute').addEventListener('click', () => {
    const muted = audioManager.toggleMute();
    document.getElementById('btn-mute').textContent = muted ? '🔇' : '🔊';
    document.getElementById('btn-mute').classList.toggle('muted', muted);
});

// ══════════════════════════════════════════════════════════════
//  Vòng lặp game chính — chạy ở 60 FPS với requestAnimationFrame
//
//  requestAnimationFrame gọi loop() trước mỗi lần trình duyệt
//  vẽ khung hình, đảm bảo game luôn mượt mà và tiết kiệm pin.
//
//  dt (delta time): thời gian ms từ frame trước — dùng để tính
//  chuyển động không phụ thuộc vào tốc độ khung hình (60/30/144 FPS).
//  dt bị giới hạn ở 50ms để tránh "nhảy" khi tab bị ẩn.
// ══════════════════════════════════════════════════════════════
let lastTimestamp = 0;

function loop(timestamp) {
    const dt = Math.min(timestamp - lastTimestamp, 50); // giới hạn dt tối đa 50ms
    lastTimestamp = timestamp;
    game.update(dt); // cập nhật logic
    game.draw();     // vẽ frame
    requestAnimationFrame(loop); // lên lịch frame tiếp
}

// ── Khởi tạo ──────────────────────────────────────────────────
const game = new Game();
drawCardThumbnails();

// Retry phát nhạc sau bất kỳ tương tác nào (giải quyết autoplay policy)
document.addEventListener('click', () => audioManager.retryPlay());

// Frame đầu tiên: ghi timestamp để dt không bị âm/sai ở frame 2
requestAnimationFrame(ts => {
    lastTimestamp = ts;
    requestAnimationFrame(loop); // bắt đầu vòng lặp thực sự
});
