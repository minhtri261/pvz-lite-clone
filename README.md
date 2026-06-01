# 🌻 Plants vs. Zombies — Fan Clone

Một tựa game thủ thành lấy cảm hứng từ **Plants vs. Zombies** gốc, được xây dựng hoàn toàn bằng **HTML · CSS · JavaScript thuần** — không dùng framework, không backend, không build tool.

Mở file `index.html` là chơi được ngay.

---

## 🎮 Tính năng

- **nhiều màn chơi** với độ khó tăng dần, mở khóa tuần tự
- **nhiều loại cây** với cơ chế riêng biệt
- **nhiều loại zombie** với hệ thống giáp 2 lớp
- **Hệ thống wave kiểu PvZ gốc**: zombie lẻ tẻ (scouts) → cảnh báo đỏ → làn sóng lớn (surge)
- **Máy cắt cỏ** bảo vệ mỗi hàng, chỉ dùng được 1 lần
- **Thanh tiến trình wave** hiển thị cờ và giai đoạn hiện tại
- **Xẻng** để đào cây lên (hotkey `S`)
- **Thu ánh nắng** ngay trong lúc đang rơi, vùng click rộng
- Đồ họa Canvas 2D toàn bộ vẽ tay, 60 FPS với `requestAnimationFrame`
- Hệ thống hạt (particles) cho hiệu ứng trúng đạn, chết, nổ, thu sun

--

## 🕹️ Điều khiển

| Thao tác | Hành động |
|----------|-----------|
| Click thẻ cây → Click ô | Đặt cây |
| Click mặt trời | Thu 25 ☀ (nhặt được cả lúc đang rơi) |
| Click nút Shovel hoặc phím `S` | Bật/tắt chế độ xẻng |
| Click ô có cây (khi xẻng bật) | Đào cây lên |
| Chuột phải / `Esc` | Hủy lựa chọn |

## ⚙️ Kỹ thuật

- **Rendering**: HTML5 Canvas 2D API — toàn bộ sprite vẽ bằng gradient và path, không dùng ảnh
- **Architecture**: OOP kế thừa (`Plant` → subclass, `Zombie` → subclass)
- **Game loop**: `requestAnimationFrame` với delta-time (dt) giới hạn 50ms để tránh giật khi tab bị ẩn
- **Wave system**: máy trạng thái 4 pha — `idle → scouts → waitForSurge → surge`
- **Overflow damage**: sát thương thừa sau khi phá giáp zombie xuyên thẳng vào HP cơ thể
- **Potato Mine trigger**: override `takeDamage()` khi armed để chặn zombie ăn mìn, nổ ngay lập tức

---

## 🚀 Cách chạy

1. Clone hoặc tải repo về
2. Mở file `index.html` bằng trình duyệt bất kỳ (Chrome / Firefox / Edge)
3. Không cần server, không cần cài đặt gì thêm

---

## 📝 Ghi chú

Đây là dự án **fan-made** thuần mục đích học tập và giải trí.  
Plants vs. Zombies là thương hiệu thuộc sở hữu của **Electronic Arts / PopCap Games**.
