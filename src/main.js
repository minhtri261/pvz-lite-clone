'use strict';
// ══════════════════════════════════════════════════════════════
//  main.js — Điểm khởi động game: gắn sự kiện + vòng lặp chính
//  File này load SAU CÙNG (sau Game.js) để mọi class đã sẵn sàng.
// ══════════════════════════════════════════════════════════════

// ── Gắn sự kiện chuột cho canvas ──────────────────────────────

// Di chuột → cập nhật ô hover để vẽ highlight và bóng ma cây
canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect(); // vị trí canvas trong trang
    game.handleMouseMove(e.clientX - r.left, e.clientY - r.top);
});

// Click chuột trái → thu sun / đào cây (xẻng) / đặt cây
canvas.addEventListener('click', e => {
    const r = canvas.getBoundingClientRect();
    game.handleClick(e.clientX - r.left, e.clientY - r.top);
});

// Click chuột phải → hủy lựa chọn (không hiện menu chuột phải)
canvas.addEventListener('contextmenu', e => {
    e.preventDefault(); // tắt menu mặc định của trình duyệt
    const r = canvas.getBoundingClientRect();
    game.handleRightClick(e.clientX - r.left, e.clientY - r.top);
});

// ── Phím tắt ──────────────────────────────────────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'Escape')             game._deselect();     // ESC: hủy chọn
    if (e.key === 's' || e.key === 'S') game.selectShovel();  // S: bật/tắt xẻng
});

// ── Gắn sự kiện cho thẻ cây trong HUD ─────────────────────────
['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine', 'snowpea'].forEach(type => {
    document.getElementById(`card-${type}`).addEventListener('click', () => game.selectCard(type));
});

// Nút xẻng
document.getElementById('shovel-btn').addEventListener('click', () => game.selectShovel());

// ── Gắn sự kiện cho các nút màn hình overlay ──────────────────
document.getElementById('btn-nextlevel').addEventListener('click', () => {
    game.startLevel(game.currentLevelId + 1); // vào màn tiếp theo
});
document.getElementById('btn-retry').addEventListener('click',   () => game.restart());
document.getElementById('btn-menu').addEventListener('click',    () => game.showMenu());
document.getElementById('btn-winplay').addEventListener('click', () => game.showMenu()); // chơi lại từ đầu

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
const game = new Game();       // tạo đối tượng game (hiện màn chọn màn)
drawCardThumbnails();           // vẽ hình cây/xẻng vào các thẻ card

// Frame đầu tiên: ghi timestamp để dt không bị âm/sai ở frame 2
requestAnimationFrame(ts => {
    lastTimestamp = ts;
    requestAnimationFrame(loop); // bắt đầu vòng lặp thực sự
});
