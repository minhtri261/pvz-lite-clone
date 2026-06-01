'use strict';
// ══════════════════════════════════════════════════════════════
//  Grid.js — Lưới quản lý vị trí cây trồng
//
//  Lưu trữ tham chiếu đến đối tượng Plant tại mỗi ô (row, col).
//  Dùng để:
//    - Kiểm tra ô đã có cây chưa khi người chơi muốn đặt
//    - Zombie tìm mục tiêu theo hàng
//    - Xẻng tra vị trí cây để xóa
// ══════════════════════════════════════════════════════════════

class Grid {
    constructor() {
        // Tạo mảng 2D [ROWS][COLS] ban đầu toàn null
        this.cells = Array.from({ length: ROWS }, () => new Array(COLS).fill(null));
    }

    // Lấy cây tại ô (col, row) — trả về null nếu trống
    getPlant(col, row)     { return this.cells[row]?.[col] ?? null; }

    // Kiểm tra ô đã bị chiếm chưa
    isOccupied(col, row)   { return this.cells[row]?.[col] !== null; }

    // Đặt cây vào ô
    place(plant, col, row) { this.cells[row][col] = plant; }

    // Xóa ô (dùng khi xẻng đào cây hoặc cây bị phá hủy)
    remove(col, row)       { this.cells[row][col] = null; }

    // Gọi mỗi frame: dọn dẹp các ô có cây đã chết (isDead = true)
    // Đảm bảo grid luôn đồng bộ với mảng this.plants của Game
    cleanup() {
        for (let r = 0; r < ROWS; r++)
            for (let c = 0; c < COLS; c++)
                if (this.cells[r][c]?.isDead) this.cells[r][c] = null;
    }
}
