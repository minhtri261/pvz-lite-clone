'use strict';
// ══════════════════════════════════════════════════════════════
//  constants.js — Hằng số bố cục, canvas, và hàm tiện ích
//  Phải được load ĐẦU TIÊN vì mọi file khác đều phụ thuộc vào đây
// ══════════════════════════════════════════════════════════════

// ── Canvas chính ───────────────────────────────────────────────
const canvas = document.getElementById('gameCanvas');  // phần tử <canvas> trong HTML
const ctx    = canvas.getContext('2d');                // bối cảnh vẽ 2D

// Kích thước canvas (đơn vị pixel)
const W = canvas.width  = 980;
const H = canvas.height = 522;

// ── Kích thước lưới (grid) ────────────────────────────────────
const COLS   = 10;   // số cột (mở rộng từ 9 lên 10)
const ROWS   = 5;    // số hàng
const CELL_W = 80;   // chiều rộng một ô (px)
const CELL_H = 100;  // chiều cao một ô (px)

// Tọa độ góc trên-trái của lưới trong canvas
const GX = 158;  // khoảng cách từ trái (chừa chỗ cho nhà + cột tường)
const GY = 10;   // khoảng cách từ trên

// Kích thước & biên lưới tính sẵn để không tính lại nhiều lần
const GRID_W     = COLS * CELL_W;   // 800 — tổng chiều rộng lưới (10 cột)
const GRID_H     = ROWS * CELL_H;   // 500 — tổng chiều cao lưới
const GRID_RIGHT = GX + GRID_W;     // 958 — cạnh phải lưới
const GRID_BOT   = GY + GRID_H;     // 510 — cạnh dưới lưới

// ── Vị trí quan trọng theo chiều ngang ───────────────────────
// Ba mốc từ phải sang trái khi zombie đi vào nhà:
//   ZOMBIE_SPAWN_X → ... → MOWER_TRIGGER → MOWER_X_INIT → HOUSE_X
const ZOMBIE_SPAWN_X = W + 80;    // 1060 — zombie xuất hiện ngoài màn hình bên phải
const MOWER_X_INIT   = GX - 52;   // 106  — máy cắt cỏ đứng yên ở đây lúc đầu
const MOWER_TRIGGER  = GX - 20;   // 138  — zombie vượt qua đây → kích hoạt máy cắt cỏ
const HOUSE_X        = GX - 82;   // 76   — zombie vượt qua đây → game over

// ── Hàm tính tọa độ tâm ô ─────────────────────────────────────
// cx(col) → tọa độ X tâm cột thứ col (0..9)
function cx(col) { return GX + col * CELL_W + CELL_W / 2; }
// cy(row) → tọa độ Y tâm hàng thứ row (0..4)
function cy(row) { return GY + row * CELL_H + CELL_H / 2; }

// ══════════════════════════════════════════════════════════════
//  Hàm toán học tiện ích
// ══════════════════════════════════════════════════════════════

// Nội suy tuyến tính: trả về giá trị nằm t% giữa a và b (0=a, 1=b)
function lerp(a, b, t)    { return a + (b - a) * t; }

// Giới hạn v trong khoảng [lo, hi]
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// Số nguyên ngẫu nhiên trong đoạn [a, b] (bao gồm cả hai đầu)
function randInt(a, b)    { return Math.floor(Math.random() * (b - a + 1)) + a; }

// Số thực ngẫu nhiên trong đoạn [a, b)
function randFloat(a, b)  { return Math.random() * (b - a) + a; }

// Vẽ hình chữ nhật bo góc — dùng để vẽ thân cây, thẻ card, nút bấm...
// r = bán kính bo góc (px)
function rr(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2); // không bo quá nửa cạnh ngắn nhất
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y,     x + w, y + h, r);  // góc trên-phải
    ctx.arcTo(x + w, y + h, x,     y + h, r);  // góc dưới-phải
    ctx.arcTo(x,     y + h, x,     y,     r);  // góc dưới-trái
    ctx.arcTo(x,     y,     x + w, y,     r);  // góc trên-trái
    ctx.closePath();
}
