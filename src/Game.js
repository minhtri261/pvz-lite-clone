'use strict';
// ══════════════════════════════════════════════════════════════
//  Game.js — Lớp điều khiển trung tâm của trò chơi
//
//  Chịu trách nhiệm:
//    - Vòng lặp cập nhật (update): cây, zombie, đạn, sun, mower
//    - Hệ thống wave (scouts → cảnh báo → surge)
//    - Xử lý input chuột (click, hover, chuột phải)
//    - Cập nhật giao diện DOM (sun count, thẻ card, màn hình overlay)
//    - Vẽ toàn bộ khung hình (draw)
// ══════════════════════════════════════════════════════════════

// Biến session: màn cao nhất đã mở khóa (mất khi tải lại trang)
let highestUnlocked = 1;

class Game {
    constructor() {
        this.state = 'start';        // 'start' | 'playing' | 'gameover' | 'win' | 'levelcomplete'
        this.currentLevelId = 1;
        this._initEntities();
        this._initWaveSystem();
        this.selectedType    = null;
        this.shovelMode      = false;
        this._overridePlants = null;      // danh sách cây người chơi chọn (màn 7+)
        this._pickSelected   = new Set(); // Set của plant types đang được chọn trên pick screen
        this.cooldowns = { sunflower: 0, peashooter: 0, wallnut: 0, cherrybomb: 0, potatomine: 0,
                           chomper: 0, repeater: 0, sunshooter: 0, twinsun: 0, peanut: 0, puffshroom: 0, snowpea: 0 };
        this.hoverCol = -1; this.hoverRow = -1;
        this.mouseX = 0;    this.mouseY = 0;
        this.skySunTimer = 4000;    // ms cho đến khi sun tiếp theo rơi từ trời
        this._updateLevelSelectUI();
    }

    // Truy cập nhanh định nghĩa màn hiện tại và các hàng đang hoạt động
    get levelDef()        { return LEVEL_DEFS[this.currentLevelId - 1]; }
    get activeRows()      { return this.levelDef.activeRows; }
    // isNight: true cho màn 11-12 → không có sun trời, sun plants chậm hơn 50%
    get isNight()         { return this.levelDef?.isNight === true; }
    // availablePlants: bị ghi đè bởi lựa chọn của người chơi ở màn 7+
    get availablePlants() { return this._overridePlants || this.levelDef.availablePlants; }

    // ── Khởi tạo ──────────────────────────────────────────────
    // Reset tất cả đối tượng game (gọi khi bắt đầu màn mới hoặc thử lại)
    _initEntities() {
        this.sun = 150;
        this.plants      = []; // danh sách cây đang sống
        this.zombies     = []; // danh sách zombie (kể cả đang chết)
        this.projectiles = []; // viên đạn đang bay
        this.suns        = []; // ánh nắng chưa thu
        this.particles   = []; // hạt hiệu ứng
        this.grid        = new Grid(); // lưới 5×9 quản lý vị trí cây
        this.lawnMowers      = [];
        this.zombiesKilled   = 0;
        this._mowerCooldowns = {}; // { row: remainingMs } — hàng vừa có mower chạy
    }

    // Reset hệ thống wave về trạng thái ban đầu
    _initWaveSystem() {
        this.currentWave  = -1;
        // Máy trạng thái wave: idle → scouts → waitForSurge → surge → idle → ...
        this.wavePhase    = 'idle';
        this.waveTimer    = 0;      // đồng hồ spawn scout (ms)
        this.surgeTimer   = 0;      // đồng hồ spawn surge (ms)
        this.surgeWaitTimer = 0;    // đếm ngược trước surge
        this.scoutQueue   = [];     // hàng đợi zombie scout chưa spawn
        this.surgeQueue   = [];     // hàng đợi zombie surge chưa spawn
        this.betweenWaveTimer = 10000; // thời gian nghỉ giữa các wave (ms)
        this.allWavesSpawned  = false;
        this._winPending      = false;  // đang chờ timeout chiến thắng
        this._surgeWarnShown  = false;  // đã hiện banner cảnh báo chưa
    }

    // Tạo máy cắt cỏ cho mỗi hàng đang hoạt động
    _rebuildMowers() {
        this.lawnMowers = this.activeRows.map(r => new LawnMower(r));
    }

    // ── Vòng đời màn chơi ─────────────────────────────────────
    startLevel(id) {
        if (id > highestUnlocked) return;
        this.currentLevelId = id;
        // Màn 7+ có hơn 6 cây → hiện màn chọn cây
        if (id >= 7 && this.levelDef.availablePlants.length > 6) {
            this._showPlantPick();
            return;
        }
        this._overridePlants = null;
        this._doStartLevel();
    }

    // Tách riêng để có thể gọi từ cả startLevel lẫn confirmPlantPick
    _doStartLevel() {
        this._initEntities();
        this._initWaveSystem();
        this._rebuildMowers();
        this.selectedType = null;
        this.shovelMode   = false;
        document.getElementById('shovel-btn').classList.remove('selected');
        this.cooldowns = { sunflower: 0, peashooter: 0, wallnut: 0, cherrybomb: 0, potatomine: 0,
                           chomper: 0, repeater: 0, sunshooter: 0, twinsun: 0, peanut: 0, puffshroom: 0, snowpea: 0 };
        this.skySunTimer = 4000;
        this.sun = this.levelDef.startingSun;
        this.state = 'playing';
        this._hideAllScreens();
        this._lastNight = null; // buộc refresh card puffshroom
        this._updateUI();
        audioManager.play(!this.isNight);
    }

    // ── Pause / Resume ────────────────────────────────────────
    togglePause() {
        if (this.state === 'playing') {
            this.state = 'paused';
            const names = ['First Steps','More Lawn','Conehead','Cherry Season','Potato Field',
                           'Vaulting Grounds','Bucket Brigade','Final Assault','Peanut Gallery','Brick by Brick',
                           '🌙 First Night','🌙 Final Night'];
            document.getElementById('pause-level-info').textContent =
                `Level ${this.currentLevelId} — ${names[this.currentLevelId - 1] || ''}`;
            document.getElementById('screen-pause').classList.remove('hidden');
            audioManager.pause();
        } else if (this.state === 'paused') {
            this.state = 'playing';
            document.getElementById('screen-pause').classList.add('hidden');
            audioManager.resume();
        }
    }

    restart() {
        // Màn 7+ → hiện lại màn chọn cây
        if (this.currentLevelId >= 7 && this.levelDef.availablePlants.length > 6) {
            this._showPlantPick();
        } else {
            this._overridePlants = null;
            this._doStartLevel();
        }
    }

    // ── Hệ thống chọn cây (màn 7+) ───────────────────────────
    _showPlantPick() {
        const pool = this.levelDef.availablePlants;
        // Chọn sẵn 6 cây đầu tiên, hoặc tất cả nếu ít hơn 6
        this._pickSelected = new Set(pool.slice(0, Math.min(6, pool.length)));

        document.getElementById('plantpick-sub').textContent =
            `Màn ${this.currentLevelId} — Chọn tối đa 6 cây (${pool.length} cây có thể dùng)`;

        this._buildPlantPickCards(pool);
        this._updatePickCounter();
        this._hideAllScreens();
        document.getElementById('screen-plantpick').classList.remove('hidden');
    }

    _buildPlantPickCards(pool) {
        const grid = document.getElementById('plantpick-grid');
        grid.innerHTML = '';
        const maxed = this._pickSelected.size >= 6;

        for (const type of pool) {
            const div = document.createElement('div');
            div.className = 'ppcard';
            if (this._pickSelected.has(type)) div.classList.add('pp-selected');
            else if (maxed)                   div.classList.add('disabled');
            div.dataset.plant = type;

            // Copy thumbnail từ art canvas đã vẽ sẵn
            const thumb = document.createElement('canvas');
            thumb.width = thumb.height = 58;
            thumb.className = 'card-art';
            const src = document.getElementById(`art-${type}`);
            if (src) thumb.getContext('2d').drawImage(src, 0, 0);

            const name = document.createElement('div');
            name.className = 'card-name';
            name.textContent = PLANT_DEFS[type]?.name || type;

            div.appendChild(thumb);
            div.appendChild(name);
            div.addEventListener('click', () => this._togglePlantPick(type, div));
            grid.appendChild(div);
        }
    }

    _togglePlantPick(type, cardEl) {
        if (this._pickSelected.has(type)) {
            // Bỏ chọn
            this._pickSelected.delete(type);
            cardEl.classList.remove('pp-selected');
        } else if (this._pickSelected.size < 6) {
            // Thêm chọn (còn chỗ)
            this._pickSelected.add(type);
            cardEl.classList.add('pp-selected');
        }
        // Cập nhật trạng thái disabled cho các card chưa chọn
        const maxed = this._pickSelected.size >= 6;
        document.querySelectorAll('.ppcard').forEach(c => {
            const selected = this._pickSelected.has(c.dataset.plant);
            c.classList.toggle('disabled', maxed && !selected);
        });
        this._updatePickCounter();
    }

    _updatePickCounter() {
        const n = this._pickSelected.size;
        document.getElementById('plantpick-counter').textContent = `${n} / 6 cây đã chọn`;
        document.getElementById('btn-startlevel').disabled = (n === 0);
    }

    // Gọi khi người chơi bấm "Bắt Đầu!" trên màn pick
    confirmPlantPick() {
        if (this._pickSelected.size === 0) return;
        this._overridePlants = [...this._pickSelected]; // lưu lựa chọn
        this._doStartLevel();
    }

    showMenu() {
        this._hideAllScreens();
        document.getElementById('screen-start').classList.remove('hidden');
        this.state = 'start';
        this._updateLevelSelectUI();
        audioManager.pause(); // dừng nhạc khi về menu
    }

    // ── Cập nhật mỗi frame ─────────────────────────────────────
    update(dt) {
        if (this.state !== 'playing') return;

        // Giảm cooldown tất cả thẻ cây theo thời gian
        for (const t in this.cooldowns)
            if (this.cooldowns[t] > 0) this.cooldowns[t] = Math.max(0, this.cooldowns[t] - dt);

        // Rơi sun từ trời — CHỈ ở màn Ngày (ban đêm không có sun trời)
        if (!this.isNight) {
            this.skySunTimer -= dt;
            if (this.skySunTimer <= 0) {
                this.skySunTimer = randFloat(8000, 12000);
                this.suns.push(new Sun(randFloat(GX + 40, GRID_RIGHT - 40), 0, true));
            }
        }

        // Cập nhật tất cả cây, sau đó dọn cây đã chết
        for (const p of this.plants) p.update(dt, this);
        this.plants = this.plants.filter(p => !p.isDead);
        this.grid.cleanup(); // đồng bộ grid với mảng plants

        this._updateWaves(dt);

        // Giảm cooldown hàng sau khi mower chạy
        for (const row in this._mowerCooldowns) {
            this._mowerCooldowns[row] -= dt;
            if (this._mowerCooldowns[row] <= 0) delete this._mowerCooldowns[row];
        }

        // Kiểm tra kích hoạt máy cắt cỏ
        for (const mower of this.lawnMowers) {
            if (mower.state !== 'ready') continue;
            for (const z of this.zombies) {
                // Zombie đến gần đủ → kích hoạt mower hàng đó
                if (!z.dying && z.row === mower.row && z.x <= MOWER_TRIGGER) {
                    mower.activate();
                    // Đặt cooldown 10s — hàng này tạm thời không spawn zombie
                    this._mowerCooldowns[mower.row] = 10000;
                    break;
                }
            }
        }
        for (const mower of this.lawnMowers) mower.update(dt, this.zombies, this.particles);

        for (const z of this.zombies) z.update(dt, this.plants);

        // Va chạm đạn ↔ zombie (O(n×m) — chấp nhận được ở quy mô nhỏ)
        for (const proj of this.projectiles) {
            if (proj.dead) continue;
            for (const z of this.zombies) {
                // Cùng hàng và khoảng cách < 24px → trúng
                if (!z.dying && z.row === proj.row && Math.abs(proj.x - z.x) < 24) {
                    const was = z.dying;
                    z.takeDamage(proj.damage, this.particles);
                    // Đạn băng → áp hiệu ứng chậm
                    if (proj.isIce) { z.slowed = true; z.slowTimer = PLANT_DEFS.snowpea.slowMs; }
                    proj.dead = true;
                    spawnHitParticles(proj.x, proj.y, this.particles);
                    if (!was && z.dying) this.zombiesKilled++; // tính số zombie đã diệt
                    break; // 1 viên đạn chỉ trúng 1 zombie
                }
            }
            proj.update(dt); // di chuyển đạn dù có trúng hay không (sẽ bị xóa qua .dead)
        }

        // Dọn dẹp các đối tượng đã hết vòng đời
        this.projectiles = this.projectiles.filter(p => !p.dead);
        this.zombies     = this.zombies.filter(z => !z.isDead);
        for (const s of this.suns)      s.update(dt);
        this.suns = this.suns.filter(s => !s.dead);
        for (const p of this.particles) p.update(dt);
        this.particles = this.particles.filter(p => !p.isDead);

        // Kiểm tra thua: zombie vượt qua nhà VÀ hàng đó không còn mower
        for (const z of this.zombies) {
            if (!z.dying && z.x <= HOUSE_X) {
                const m = this.lawnMowers.find(m => m.row === z.row);
                if (!m || m.state === 'gone') { this._gameOver(); return; }
            }
        }

        this._checkWin();
        this._updateUI();
    }

    // ══════════════════════════════════════════════════════════
    //  Hệ thống Wave — máy trạng thái 4 pha
    //
    //  idle → scouts → waitForSurge → surge → idle → ...
    //
    //  idle:          chờ betweenWaveTimer ms rồi bắt đầu wave mới
    //  scouts:        spawn zombie lẻ theo delay trong scoutQueue
    //  waitForSurge:  chờ 8s; khi còn 2.5s → hiện banner cảnh báo đỏ
    //  surge:         spawn nhiều zombie nhanh theo delay trong surgeQueue
    // ══════════════════════════════════════════════════════════
    _updateWaves(dt) {
        if (this.allWavesSpawned) return;
        const waves = this.levelDef.waves;

        if (this.wavePhase === 'idle') {
            this.betweenWaveTimer -= dt;
            if (this.betweenWaveTimer <= 0) {
                this.currentWave++;
                if (this.currentWave >= waves.length) { this.allWavesSpawned = true; return; }
                this._startScouts(this.currentWave);
            }
            return;
        }

        if (this.wavePhase === 'scouts') {
            this.waveTimer += dt;
            // Spawn các scout theo đúng thời điểm delay
            while (this.scoutQueue.length > 0 && this.scoutQueue[0].delay <= this.waveTimer) {
                const e   = this.scoutQueue.shift();
                // row: null → ưu tiên hàng ít zombie + tránh hàng vừa có mower chạy
                const row = e.row ?? this._pickSpawnRow(this.activeRows);
                this.zombies.push(createZombie(e.type, row));
            }
            if (this.scoutQueue.length === 0) {
                // Tất cả scout đã spawn → bắt đầu đếm ngược trước surge
                this.wavePhase      = 'waitForSurge';
                this.surgeWaitTimer = 8000; // 8 giây chờ
                this._surgeWarnShown = false;
            }
            return;
        }

        if (this.wavePhase === 'waitForSurge') {
            this.surgeWaitTimer -= dt;
            // Khi còn 2.5 giây → hiện banner cảnh báo màu đỏ
            if (!this._surgeWarnShown && this.surgeWaitTimer <= 2500) {
                this._surgeWarnShown = true;
                this._showWaveBanner('A Huge Wave of Zombies is Approaching!', true);
            }
            if (this.surgeWaitTimer <= 0) this._startSurge(this.currentWave);
            return;
        }

        if (this.wavePhase === 'surge') {
            this.surgeTimer += dt;
            while (this.surgeQueue.length > 0 && this.surgeQueue[0].delay <= this.surgeTimer) {
                const e   = this.surgeQueue.shift();
                const row = e.row ?? this._pickSpawnRow(this.activeRows);
                this.zombies.push(createZombie(e.type, row));
            }
            if (this.surgeQueue.length === 0) {
                const isLast = this.currentWave >= waves.length - 1;
                if (isLast) {
                    this.allWavesSpawned = true; // wave cuối → báo hiệu thắng
                } else {
                    this.wavePhase = 'idle';
                    this.betweenWaveTimer = 14000; // nghỉ 14 giây trước wave tiếp
                }
            }
            return;
        }
    }

    // Bắt đầu pha scout của wave index
    _startScouts(index) {
        const wave = this.levelDef.waves[index];
        this.scoutQueue  = (wave.scouts || []).map(e => ({ ...e })); // sao chép tránh sửa gốc
        this.waveTimer   = 0;
        this.wavePhase   = 'scouts';
        this._showWaveBanner(`Wave ${index + 1}`); // banner vàng "Wave 1"
        document.getElementById('wave-num').textContent = index + 1;
        // Nếu không có scout → nhảy thẳng đến waitForSurge
        if (this.scoutQueue.length === 0) {
            this.wavePhase      = 'waitForSurge';
            this.surgeWaitTimer = 2000;
            this._surgeWarnShown = false;
        }
    }

    // Bắt đầu pha surge của wave index
    _startSurge(index) {
        const wave = this.levelDef.waves[index];
        this.surgeQueue = (wave.surge || []).map(e => ({ ...e }));
        this.surgeTimer = 0;
        this.wavePhase  = 'surge';
    }

    // Chọn hàng spawn tối ưu khi row = null:
    //   1. Loại trừ hàng đang trong mower cooldown (10s sau khi mower chạy)
    //   2. Trong các hàng còn lại, ưu tiên hàng ít zombie hơn (weighted random)
    //      → tránh pile-up 5 zombie cùng 1 hàng
    _pickSpawnRow(activeRows) {
        if (activeRows.length === 1) return activeRows[0];

        // Loại trừ hàng có mower cooldown (nếu còn hàng khả dụng)
        const eligible = activeRows.filter(r => !this._mowerCooldowns[r]);
        const pool     = eligible.length > 0 ? eligible : activeRows;

        if (pool.length === 1) return pool[0];

        // Đếm zombie sống (không dying) trên mỗi hàng
        const counts = {};
        for (const r of pool) counts[r] = 0;
        for (const z of this.zombies) {
            if (!z.isDead && !z.dying && counts[z.row] !== undefined) counts[z.row]++;
        }

        // Trọng số nghịch đảo: hàng ít zombie → trọng số cao hơn
        const maxCount = Math.max(...Object.values(counts), 0);
        const weights  = pool.map(r => maxCount - counts[r] + 1); // min weight = 1
        const total    = weights.reduce((s, w) => s + w, 0);

        let roll = Math.random() * total;
        for (let i = 0; i < pool.length; i++) {
            roll -= weights[i];
            if (roll <= 0) return pool[i];
        }
        return pool[pool.length - 1];
    }

    // Hiện banner wave ở giữa màn hình
    // isHuge = true → chữ đỏ lớn "A Huge Wave..." | false → chữ vàng "Wave 1"
    _showWaveBanner(text, isHuge = false) {
        const el = document.getElementById('wave-banner');
        const tx = document.getElementById('wave-banner-text');
        tx.textContent = text;
        if (isHuge) {
            // Banner cảnh báo — chữ đỏ, nhỏ hơn để chứa nội dung dài
            tx.style.color         = '#FF4422';
            tx.style.fontSize      = '28px';
            tx.style.textShadow    = '3px 3px 0 #7a0000, -1px -1px 0 #7a0000, 1px -1px 0 #7a0000, -1px 1px 0 #7a0000';
            tx.style.letterSpacing = '1px';
        } else {
            // Banner bình thường — dùng style từ CSS, xóa inline override
            tx.style.color = tx.style.fontSize = tx.style.textShadow = tx.style.letterSpacing = '';
        }
        el.classList.remove('hidden');
        // Trick reset animation CSS: đặt 'none', force reflow, rồi xóa → animation chạy lại
        tx.style.animation = 'none';
        void tx.offsetHeight;
        tx.style.animation = '';
        setTimeout(() => el.classList.add('hidden'), isHuge ? 3000 : 2000);
    }

    // ── Thắng / Thua ───────────────────────────────────────────
    _checkWin() {
        if (!this.allWavesSpawned) return;                          // chưa spawn hết zombie
        if (!this.zombies.every(z => z.isDead || z.dying)) return;  // còn zombie sống
        if (this._winPending) return;                               // đã đặt timeout rồi
        this._winPending = true;

        // Chờ 2 giây rồi mới hiện màn hình thắng (cho zombie chết hết animation)
        setTimeout(() => {
            if (this.state !== 'playing') return;
            if (this.currentLevelId === 12) {
                // Màn cuối → màn hình chiến thắng tổng
                this.state = 'win';
                highestUnlocked = 12;
                document.getElementById('screen-win').classList.remove('hidden');
            } else {
                // Còn màn tiếp → màn hình hoàn thành màn + mở khóa màn kế
                this.state = 'levelcomplete';
                highestUnlocked = Math.max(highestUnlocked, this.currentLevelId + 1);
                const ld = this.levelDef;
                document.getElementById('levelcomplete-title').textContent = ld.title;
                document.getElementById('levelcomplete-sub').textContent   = ld.subtitle;
                document.getElementById('screen-levelcomplete').classList.remove('hidden');
                this._updateLevelSelectUI();
            }
        }, 2000);
    }

    _gameOver() {
        this.state = 'gameover';
        document.getElementById('screen-gameover').classList.remove('hidden');
    }

    // Ẩn tất cả màn hình overlay
    _hideAllScreens() {
        ['screen-start', 'screen-gameover', 'screen-win', 'screen-levelcomplete', 'screen-plantpick', 'screen-pause']
            .forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById('wave-banner').classList.add('hidden');
        this._winPending = false;
    }

    // ── Xử lý input chuột ─────────────────────────────────────
    handleMouseMove(mx, my) {
        this.mouseX = mx; this.mouseY = my;
        // Chuyển tọa độ chuột → chỉ số ô trong lưới
        const col = Math.floor((mx - GX) / CELL_W);
        const row = Math.floor((my - GY) / CELL_H);
        this.hoverCol = (col >= 0 && col < COLS && row >= 0 && row < ROWS) ? col : -1;
        this.hoverRow = this.hoverCol >= 0 ? row : -1;
    }

    handleClick(mx, my) {
        if (this.state !== 'playing') return;

        // Ưu tiên 1: thu ánh nắng — vùng 50px (rộng hơn để dễ bấm)
        // Sun cũng nhặt được trong khi đang rơi (không cần chờ chạm đất)
        for (const s of this.suns) {
            if (s.isClickable()) {
                const dx = mx - s.x, dy = my - s.y;
                if (dx * dx + dy * dy < 50 * 50) {
                    s.collect();
                    this.sun += 25;
                    spawnSunCollectParticles(s.x, s.y, this.particles);
                    this._updateUI(); return;
                }
            }
        }

        // Ưu tiên 2: xẻng — xóa cây tại ô được click
        if (this.shovelMode) {
            const col = Math.floor((mx - GX) / CELL_W);
            const row = Math.floor((my - GY) / CELL_H);
            if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
                const p = this.grid.getPlant(col, row);
                if (p) { p.dead = true; this.grid.remove(col, row); }
            }
            return; // giữ chế độ xẻng (không tắt sau khi đào)
        }

        // Ưu tiên 3: đặt cây nếu đang chọn loại cây
        if (this.selectedType) {
            const col = Math.floor((mx - GX) / CELL_W);
            const row = Math.floor((my - GY) / CELL_H);
            if (col >= 0 && col < COLS && row >= 0 && row < ROWS && this.activeRows.includes(row))
                this._tryPlace(this.selectedType, col, row);
        }
    }

    // Chuột phải → hủy lựa chọn hiện tại (cây hoặc xẻng)
    handleRightClick(mx, my) {
        if (this.state !== 'playing') return;
        this._deselect();
    }

    // Chọn thẻ cây từ HUD — kiểm tra đủ sun và không cooldown
    // Trả về giá sun thực tế — puffshroom miễn phí ban đêm
    _getEffectiveCost(type) {
        const def = PLANT_DEFS[type];
        if (def.nightCost !== undefined && this.isNight) return def.nightCost;
        return def.cost;
    }

    selectCard(type) {
        if (this.state !== 'playing') return;
        if (!this.availablePlants.includes(type)) return;
        const cost = this._getEffectiveCost(type);
        if (this.sun < cost || this.cooldowns[type] > 0) return;
        // Nếu đang dùng xẻng → tắt xẻng trước
        if (this.shovelMode) {
            this.shovelMode = false;
            document.getElementById('shovel-btn').classList.remove('selected');
        }
        // Click lại cùng loại → bỏ chọn; click khác → chọn mới
        this.selectedType = this.selectedType === type ? null : type;
        canvas.classList.toggle('placing', !!this.selectedType); // đổi con trỏ chuột
        this._updateCardSelection();
    }

    // Bật/tắt chế độ xẻng (hotkey S hoặc click nút Shovel)
    selectShovel() {
        if (this.state !== 'playing') return;
        // Nếu đang chọn cây → hủy trước
        if (this.selectedType) {
            this.selectedType = null;
            canvas.classList.remove('placing');
            this._updateCardSelection();
        }
        this.shovelMode = !this.shovelMode;
        canvas.classList.toggle('placing', this.shovelMode);
        document.getElementById('shovel-btn').classList.toggle('selected', this.shovelMode);
    }

    // Hủy mọi lựa chọn (ESC hoặc chuột phải)
    _deselect() {
        this.selectedType = null;
        this.shovelMode   = false;
        canvas.classList.remove('placing');
        this._updateCardSelection();
        document.getElementById('shovel-btn').classList.remove('selected');
    }

    // Thử đặt cây — kiểm tra sun, cooldown, ô trống
    _tryPlace(type, col, row) {
        const cost = this._getEffectiveCost(type);
        const d    = PLANT_DEFS[type];
        if (this.sun < cost || this.cooldowns[type] > 0 || this.grid.isOccupied(col, row)) return;
        const p = createPlant(type, col, row);
        this.plants.push(p);
        this.grid.place(p, col, row);
        this.sun -= cost;                    // trừ sun theo giá thực tế
        this.cooldowns[type] = d.cooldownMs;
        this._deselect();
        this._updateUI();
    }

    // ── Cập nhật giao diện DOM ─────────────────────────────────
    _updateUI() {
        document.getElementById('sun-count').textContent = this.sun;
        const available = this.availablePlants;
        const all = ['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine',
                     'chomper', 'repeater', 'sunshooter', 'twinsun', 'peanut', 'puffshroom', 'snowpea'];
        for (const type of all) {
            const card    = document.getElementById(`card-${type}`);
            const cdFill  = document.getElementById(`cd-${type}`);
            const isAvail = available.includes(type);
            card.classList.toggle('card-hidden', !isAvail);
            if (!isAvail) continue;
            const d    = PLANT_DEFS[type];
            const cd   = this.cooldowns[type];
            const cost = this._getEffectiveCost(type); // giá thực tế (puffshroom = 0 đêm)
            card.classList.toggle('disabled', this.sun < cost || cd > 0);
            cdFill.style.width = cd > 0 ? `${(1 - cd / d.cooldownMs) * 100}%` : '100%';
        }
        // Cập nhật hiển thị giá Puff-shroom (FREE ban đêm / 75 ban ngày)
        if (available.includes('puffshroom') && this._lastNight !== this.isNight) {
            this._lastNight = this.isNight;
            this._refreshPuffShroomCard();
        }
    }

    // Cập nhật hiển thị giá Puff-shroom trên card art canvas
    _refreshPuffShroomCard() {
        const el = document.getElementById('art-puffshroom');
        if (!el) return;
        const c = el.getContext('2d');
        // Xóa phần dải giá cũ rồi vẽ lại
        c.fillStyle = 'rgba(0,0,0,0.60)';
        c.fillRect(0, 45, 58, 13);
        if (this.isNight) {
            // Ban đêm: "FREE" màu xanh lá
            c.fillStyle = '#40FF60';
            c.font = 'bold 10px Arial';
            c.textAlign = 'left';
            c.fillText('🌙 FREE', 6, 56);
        } else {
            // Ban ngày: sun icon + "75"
            const sg = c.createRadialGradient(11, 51.5, 0.5, 11, 51.5, 5);
            sg.addColorStop(0, '#FFFDE7'); sg.addColorStop(0.45, '#FFD700'); sg.addColorStop(1, '#FFA000');
            c.fillStyle = sg; c.beginPath(); c.arc(11, 51.5, 5, 0, Math.PI * 2); c.fill();
            c.fillStyle = '#FFE040'; c.font = 'bold 11px Arial'; c.textAlign = 'left';
            c.fillText(PLANT_DEFS.puffshroom.cost, 20, 56);
        }
        c.textAlign = 'left';
    }

    // Cập nhật viền vàng "selected" trên các thẻ cây
    _updateCardSelection() {
        ['sunflower', 'peashooter', 'wallnut', 'cherrybomb', 'potatomine',
         'chomper', 'repeater', 'sunshooter', 'twinsun', 'peanut', 'puffshroom', 'snowpea'].forEach(t => {
            document.getElementById(`card-${t}`).classList.toggle('selected', this.selectedType === t);
        });
    }

    // Cập nhật giao diện chọn màn: nút unlocked = xanh, locked = xám
    _updateLevelSelectUI() {
        for (let i = 1; i <= 12; i++) {
            const btn = document.getElementById(`lvl-btn-${i}`);
            if (i <= highestUnlocked) { btn.classList.add('unlocked'); btn.classList.remove('locked'); }
            else                      { btn.classList.add('locked');   btn.classList.remove('unlocked'); }
        }
    }

    // ── Vẽ frame ───────────────────────────────────────────────
    draw() {
        ctx.clearRect(0, 0, W, H); // xóa canvas

        // Vẽ nền — highlight vàng chỉ hiện khi đặt cây (không phải xẻng)
        drawBackground(ctx, this.activeRows,
            (this.selectedType && !this.shovelMode) ? this.hoverCol : -1,
            (this.selectedType && !this.shovelMode) ? this.hoverRow : -1,
            this.isNight); // truyền trạng thái ngày/đêm

        // Highlight đỏ khi xẻng hover trên ô
        if (this.shovelMode && this.hoverCol >= 0 && this.hoverRow >= 0 && this.activeRows.includes(this.hoverRow)) {
            ctx.fillStyle   = 'rgba(255,60,60,0.25)';
            ctx.strokeStyle = 'rgba(255,60,60,0.7)';
            ctx.lineWidth   = 2;
            rr(ctx, GX + this.hoverCol * CELL_W + 2, GY + this.hoverRow * CELL_H + 2, CELL_W - 4, CELL_H - 4, 6);
            ctx.fill(); ctx.stroke();
        }

        // Vẽ theo thứ tự depth (hàng thấp hơn index → vẽ trước, bị che bởi hàng cao hơn)
        for (const m of this.lawnMowers) m.draw(ctx);
        [...this.plants].sort((a, b) => a.row - b.row).forEach(p => p.draw(ctx));
        [...this.zombies].sort((a, b) => a.row - b.row).forEach(z => z.draw(ctx));
        for (const p of this.projectiles) p.draw(ctx);
        for (const s of this.suns)        s.draw(ctx);
        for (const p of this.particles)   p.draw(ctx);

        this._drawHouseWarning(); // hiệu ứng đỏ bên trái khi zombie sắp vào nhà

        // Bóng ma cây khi đang đặt: vẽ sprite mờ tại ô hover
        if (this.selectedType && !this.shovelMode && this.hoverCol >= 0 && this.activeRows.includes(this.hoverRow)) {
            ctx.save(); ctx.globalAlpha = 0.65;
            const px = cx(this.hoverCol), py = cy(this.hoverRow);
            switch (this.selectedType) {
                case 'sunflower':  drawSunflower(ctx, px, py, 0, false);        break;
                case 'peashooter': drawPeashooter(ctx, px, py, 0, 0);           break;
                case 'wallnut':    drawWallNut(ctx, px, py, 0, 1);              break;
                case 'cherrybomb': drawCherryBomb(ctx, px, py, 0, 0, false, 0);       break;
                case 'potatomine': drawPotatoMine(ctx, px, py, 0, false, false, 0);  break;
                case 'chomper':    drawChomper(ctx, px, py, 0, false, 0, false);       break;
                case 'repeater':   drawRepeater(ctx, px, py, 0, 0, 0);                break;
                case 'sunshooter': drawSunShooter(ctx, px, py, 0, 0, false); break;
                case 'twinsun':    drawTwinSun(ctx, px, py, 0, false);     break;
                case 'peanut':     drawPeanut(ctx, px, py, 0, 1, 0);       break;
                case 'puffshroom': drawPuffShroom(ctx, px, py, 0, 0);      break;
                case 'snowpea':    drawSnowPea(ctx, px, py, 0, 0);         break;
            }
            ctx.restore();
        }

        // Hiện icon xẻng nổi trên cây khi hover (chỉ khi ô có cây)
        if (this.shovelMode && this.hoverCol >= 0 && this.hoverRow >= 0 && this.activeRows.includes(this.hoverRow)) {
            const p = this.grid.getPlant(this.hoverCol, this.hoverRow);
            if (p) {
                ctx.save(); ctx.globalAlpha = 0.85;
                drawShovel(ctx, cx(this.hoverCol) + 16, cy(this.hoverRow) - 10);
                ctx.restore();
            }
        }

        this._drawLevelBadge(); // nhãn "Level 1 — First Steps" góc trên phải
        this._drawWaveBar();    // thanh tiến trình wave ở đáy canvas
    }

    // ── Thanh tiến trình wave (giống PvZ gốc) ─────────────────
    // Tính tiến trình 0.0–1.0 dựa vào wavePhase và bộ đếm thời gian hiện tại
    _getWaveProgress() {
        const total = this.levelDef.waves.length;
        if (this.allWavesSpawned) return 1.0;

        if (this.wavePhase === 'idle') {
            if (this.currentWave < 0) {
                // Trước wave đầu: trượt từ 0 đến vị trí cờ wave 1
                return Math.max(0, 1 - this.betweenWaveTimer / 8000) / (total + 1);
            }
            // Giữa wave: trượt từ cờ hiện tại đến cờ kế tiếp
            const curF  = (this.currentWave + 1) / (total + 1);
            const nextF = (this.currentWave + 2) / (total + 1);
            const t     = Math.max(0, 1 - this.betweenWaveTimer / 14000);
            return curF + t * (nextF - curF);
        }

        // scouts / waitForSurge / surge → đứng tại cờ wave hiện tại
        return (this.currentWave + 1) / (total + 1);
    }

    // Vẽ thanh tiến trình ở đáy canvas
    _drawWaveBar() {
        if (this.state !== 'playing') return;
        const waves = this.levelDef.waves;
        const total = waves.length;
        const progress = this._getWaveProgress();

        // Toạ độ thanh bar
        const bx = 46, by = H - 21, bw = W - 96, bh = 16;

        // Viền ngoài tối
        ctx.fillStyle = 'rgba(0,0,0,0.65)';
        rr(ctx, bx - 2, by - 2, bw + 4, bh + 4, 7); ctx.fill();

        // Nền bar (nâu đậm)
        const bbg = ctx.createLinearGradient(bx, by, bx, by + bh);
        bbg.addColorStop(0, '#1e0e04'); bbg.addColorStop(1, '#0c0602');
        ctx.fillStyle = bbg; rr(ctx, bx, by, bw, bh, 5); ctx.fill();

        // Phần đã đi qua (nâu sáng hơn)
        if (progress > 0.005) {
            ctx.save();
            ctx.beginPath(); rr(ctx, bx, by, bw, bh, 5); ctx.clip();
            const pg = ctx.createLinearGradient(bx, by, bx, by + bh);
            pg.addColorStop(0, '#7a5218'); pg.addColorStop(1, '#402a0a');
            ctx.fillStyle = pg;
            ctx.fillRect(bx, by, bw * Math.min(1, progress), bh);
            // Shine
            ctx.fillStyle = 'rgba(255,210,100,0.1)';
            ctx.fillRect(bx, by, bw * Math.min(1, progress), bh * 0.45);
            ctx.restore();
        }

        // Viền bar
        ctx.strokeStyle = 'rgba(190,140,40,0.55)'; ctx.lineWidth = 1.5;
        rr(ctx, bx, by, bw, bh, 5); ctx.stroke();

        // ── Cờ wave (1 cờ mỗi wave, chia đều) ────────────────
        for (let i = 0; i < total; i++) {
            const flagPos = (i + 1) / (total + 1);
            const fx = bx + bw * flagPos;
            const reached = progress >= flagPos - 0.005;
            const isCur   = this.currentWave === i &&
                (this.wavePhase === 'scouts' || this.wavePhase === 'waitForSurge' || this.wavePhase === 'surge');

            // Cột cờ
            ctx.strokeStyle = reached ? '#C8A050' : 'rgba(200,160,80,0.45)';
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(fx, by + bh + 1); ctx.lineTo(fx, by - 9); ctx.stroke();

            // Vải cờ
            ctx.fillStyle = isCur ? '#FFD700'      // cờ vàng = wave đang xảy ra
                          : reached ? '#7a7060'     // cờ xám = đã qua
                          : '#CC1100';              // cờ đỏ = chưa tới
            ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(fx,      by - 9);
            ctx.lineTo(fx + 11, by - 4);
            ctx.lineTo(fx,      by + 1);
            ctx.closePath(); ctx.fill(); ctx.stroke();

            // Số wave trên cờ
            ctx.fillStyle = isCur ? '#5C3000' : 'rgba(255,255,255,0.85)';
            ctx.font = 'bold 7px Arial'; ctx.textAlign = 'center';
            ctx.fillText(i + 1, fx + 4.5, by);
        }

        // ── Cờ lớn ở cuối (finish flag) ─────────────────────
        const endX = bx + bw + 18;
        const endY = by + bh * 0.5;
        ctx.strokeStyle = this.allWavesSpawned ? '#FFD700' : 'rgba(200,160,80,0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(endX, endY + 9); ctx.lineTo(endX, endY - 12); ctx.stroke();
        ctx.fillStyle   = this.allWavesSpawned ? '#FFD700' : '#CC1100';
        ctx.strokeStyle = this.allWavesSpawned ? '#7a5000' : '#880000';
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.moveTo(endX,      endY - 12);
        ctx.lineTo(endX + 15, endY - 5);
        ctx.lineTo(endX,      endY + 2);
        ctx.closePath(); ctx.fill(); ctx.stroke();

        // ── Nhà ở đầu trái ───────────────────────────────────
        const hx = bx - 22, hy2 = by + bh * 0.5;
        ctx.fillStyle = '#C48030'; ctx.strokeStyle = '#7a5000'; ctx.lineWidth = 1.5;
        // Mái
        ctx.beginPath();
        ctx.moveTo(hx - 9, hy2 + 2);
        ctx.lineTo(hx,     hy2 - 7);
        ctx.lineTo(hx + 9, hy2 + 2);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        // Tường
        rr(ctx, hx - 8, hy2 + 2, 16, 11, 2); ctx.fill(); ctx.stroke();

        // ── Mũi tên chỉ tiến trình (tam giác vàng trên thanh) ─
        const indicX = bx + bw * Math.min(1, progress);
        ctx.fillStyle = '#FFE040'; ctx.strokeStyle = '#7a5000'; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(indicX - 6, by - 10);
        ctx.lineTo(indicX + 6, by - 10);
        ctx.lineTo(indicX,     by - 2);
        ctx.closePath(); ctx.fill(); ctx.stroke();

        ctx.textAlign = 'left'; // reset textAlign
    }

    // Ánh sáng đỏ từ nhà khi zombie gần — cảnh báo trực quan
    _drawHouseWarning() {
        const closest = this.zombies.reduce((m, z) => (!z.dying && (m === null || z.x < m.x) ? z : m), null);
        if (!closest || closest.x >= GX + 100) return;
        // intensity = 1 khi zombie sát nhà, 0 khi còn xa
        const intensity = clamp(1 - (closest.x - HOUSE_X) / (GX + 100 - HOUSE_X), 0, 1);
        const wg = ctx.createLinearGradient(0, 0, 110, 0);
        wg.addColorStop(0, `rgba(255,0,0,${0.45 * intensity})`);
        wg.addColorStop(1, 'rgba(255,0,0,0)');
        ctx.fillStyle = wg; ctx.fillRect(0, GY, 120, GRID_H);
    }

    // Nhãn màn chơi góc trên phải canvas
    _drawLevelBadge() {
        if (this.state !== 'playing') return;
        const names = ['First Steps', 'More Lawn', 'Conehead', 'Cherry Season', 'Potato Field',
                       'Vaulting Grounds', 'Bucket Brigade', 'Final Assault', 'Peanut Gallery', 'Brick by Brick',
                       '🌙 First Night', '🌙 Final Night'];
        ctx.save();
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        rr(ctx, W - 110, 2, 108, 26, 8); ctx.fill();
        ctx.fillStyle = '#a0e860'; ctx.font = 'bold 13px Arial'; ctx.textAlign = 'right';
        ctx.fillText(`Level ${this.currentLevelId} — ${names[this.currentLevelId - 1]}`, W - 6, 20);
        ctx.restore();
    }
}
