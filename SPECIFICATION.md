# SPESIFIKASI: Polaris (Robit & Naiqo)
## Perjalanan Sinematik 365 Hari: Dari Keraguan Menuju Bintang Penunjuk Arah

---

## 1. Ringkasan Proyek & Inti Emosional

* **Penerima:** Naiqo (Pengalaman Pribadi Perayaan 1 Tahun).
* **Momen:** 1 Tahun Kedekatan (13 Oktober 2025 – 13 Oktober 2026, 365 Hari Mengorbit Bersama).
* **Premis Naratif Utama:**
  Naiqo selama ini menahan perasaannya dan memendam kekhawatiran karena melihat kondisi Robit yang saat ini masih memiliki banyak kekurangan, baik dari segi fisik maupun kemapanan materi. Ada kecemasan di hati Naiqo bahwa kisah indah yang mereka bangun pada akhirnya harus mengalah pada keadaan dan berakhir dengan saling melepaskan—seperti pola perpisahan yang lazim terjadi di film-film romantis.
  
  Karya web ini dibangun oleh Robit sebagai jawaban tulus, berani, dan penuh tekad:
  > *"Hubungan yang indah tidak harus selalu berakhir dengan perpisahan seperti di film-film. Kekurangan fisik dan materiku hari ini bukan vonis akhir, melainkan lecutan untuk berjuang lebih keras. Aku memilihmu sebagai Polaris—bintang tujuanku untuk melangkah, menjadi pria yang mapan, dan membuktikan janjiku di masa depan."*

* **Prinsip Storytelling & Interaktivitas:**
  - **Murni Kisah Nyata Robit & Naiqo:** Menghilangkan seluruh unsur cerita fiktif/referensi luar, nama samaran, maupun format novel teks panjang.
  - **Metafora Sinematik Halus:** Tidak menyebut judul film secara gamblang. Menggunakan bahasa puitis dan reflektif tentang cerita-cerita di layar perak yang kerap mengagungkan perpisahan.
  - **Sensori & Interaktif Nyata:** Setiap babak memiliki interaksi taktil dengan efek suara sintetis (Web Audio API) yang menghubungkan Naiqo langsung dengan memori mereka:
    - *Babak 1:* Percakapan subuh 02:14 AM interaktif (sentuh untuk membalas).
    - *Babak 2:* Racikan memasak Aglio Olio berdua (efek tumis & sizzling sound).
    - *Babak 3:* Sakelar perspektif ganda (rasa cemas Naiqo vs tekad perjuangan Robit).
    - *Babak 4:* Cap tiket bus malam Probolinggo → Jogja (23 Juni 2026) & harapan salju di katedral Moscow.
    - *Babak 5:* Bintang Polaris interaktif bercahaya, interaksi kilas semu "What If" (tahan untuk merasakan dinginnya perpisahan, lepas untuk ledakan ikrar bersama), serta Surat Rahasia & Kotak Janji Robit.

---

## 2. Struktur Babak & Transformasi Warna

Visual web bermutasi secara dinamis mengikuti scroll dan emosi cerita:

| Babak & Musim | Nuansa Emosional | Palet Warna Kunci | Gaya Visual UI |
| :--- | :--- | :--- | :--- |
| **Babak 1: Musim Dingin** | Hening, lelah, terisolasi, pertemuan awal yang tak terduga | Biru Malam `#0B1324`, Midnight Indigo `#1E293B`, Matcha Halus `#4ADE80` | **Linear Bento Box** kaku & teratur, frame ponsel 02:14 AM |
| **Babak 2: Musim Semi** | Zona nyaman, kehangatan tanpa tuntutan, saling menerima | Cyan Air Terjun `#1A5F7A`, Mint `#2EC4B6`, Hangat Mentega `#FDE047` | **Frosted Glassmorphism**, panci interaktif Aglio Olio |
| **Babak 3: Musim Panas** | Titik beku realitas, rasa cemas & menahan perasaan | Abu-abu Matte `#D1D5DB`, Lavender Redup `#6C5B7B`, Ungu Tekad `#581C87` | **Resonant Neumorphism**, kartu perspektif batin |
| **Babak 4: Musim Gugur** | Keberanian menempuh jarak, aksi nyata membuktikan rasa | Merah Katalis `#E63946`, Abu Arang `#18181B`, Kuning Lentera `#F59E0B` | **Tactile Neo-Brutalism**, tiket bus rute Probolinggo → Jogja & foto impian Moscow |
| **Babak 5: Polaris** | Puncak 365 hari mengorbit, ikrar masa depan & kompas hidup | Kuning Emas Polaris `#FFD700`, Biru Elektrik `#1D4ED8`, Hijau Matcha `#4B7F52` | **Starlight Aurora**, Bintang Utuh bersinar, tombol kilas semu "What If", modal surat rahasia |

---

## 3. Komponen Inti & Interaksi Pengguna

1. **Hero Cinematic (`HeroCinematic.tsx`):**
   - Judul monumental: *"Kamu Adalah Polaris Hidupku."*
   - Subjudul puitis tanpa menyebut judul film.
   - Pintu gerbang eksplorasi cerita dengan pendar kosmik aurora.

2. **Babak 1 (`Act1Winter.tsx`):**
   - Menghidupkan kembali chat subuh 02:14 AM yang autentik dengan pengetikan realistis dan efek pop SFX.

3. **Babak 2 (`Act2Spring.tsx`):**
   - Mini interaksi memasak pasta Aglio Olio (sentuh bahan, tekan tombol tumis, efek suara mendesis dan chime).

4. **Babak 3 (`Act3Summer.tsx`):**
   - Menghadapi ironi rasa cinta: kejujuran tentang rasa takut akan kekurangan fisik dan materi, dijawab dengan tekad bulat Robit untuk berjuang.

5. **Babak 4 (`Act4Autumn.tsx`):**
   - Perjalanan nyata bus Probolinggo → Jogja tanggal 23 Juni 2026. Cap tiket interaktif dengan klakson bus dan stamp SFX.
   - Panel impian Naiqo: pemandangan katedral Moscow di bawah langit salju malam hari.

6. **Babak 5 (`Act5Polaris.tsx`):**
   - Live timer 365 hari mengorbit sejak 13 Oktober 2025 (hari, jam, menit, detik).
   - Polaris Star Centerpiece interaktif.
   - Interaksi kilas semu "What If" (`WhatIfToggle.tsx`): menahan tombol untuk melihat dunia jika menuruti ketakutan, lalu melepaskannya untuk menyaksikan ikrar bersama.
   - Modal Surat Rahasia (`PromiseModal.tsx`): janji tulus Robit, rencana kebun binatang melihat burung Heartopia, chill di villa, dan form pengiriman pesan balasan dari Naiqo.

7. **Audio Sanctuary (`AudioAtmosphere.tsx`):**
   - Pemutar musik bertema elegan tanpa label film eksternal atau referensi fiksi lama.
   - Track diberi judul bermakna personal: Melodi Bintang Malam, Tema Yang Tertinggal, Hening 02:14 AM, Aroma Hangat Dapur, Rute Bus 23 Juni, Kubah Salju Moscow, dan Polaris (365 Hari).
   - SFX Synthesizer Web Audio API: Pop, Chime, Sizzling, Stamp, Bus Horn, Portal Hum, dan Portal Warp Hyperspace.

---

## 4. Mekanisme 3D Portal Jumping & Variasi Animasi Per Babak

Diadaptasi dari arsitektur *Planet Jumping*, setiap babak kini memiliki entitas dunia 3D tersendiri serta jendela gerbang dimensi:

1. **Jendela Portal 3D (`CosmicPortalGateway.tsx`):**
   - Jendela rounded-rectangle dengan proyeksi perspektif 3D palsu (focal 850) yang merespons kemiringan kursor (*tilt rotX & rotY*).
   - Menampilkan *screen-locked preview* dinamis dari babak tujuan berikutnya.
   - Saat disentuh/diklik (*travel trigger*):
     - Memutar audio `playPortalWarpSFX()` sintetis Web Audio API.
     - Jendela portal membesar secara kurva `easeInOutCubic` (0 → 1 dalam 1050ms) menelan seluruh layar.
     - Kamera Three.js melesat maju ke dalam lorong *hyperspace warp* (bintang memanjang menjadi garis kecepatan).
     - Berpindah mulus ke babak berikutnya, lalu mask portal dibuka kembali (0 → 1) menyajikan babak baru.

2. **Dunia Animasi 3D Unik Tiap Babak (`ThreeScrollWorld.tsx`):**
   - **Babak 1 (Musim Dingin 02:14 AM):** Kristal es 3D (*crystalline ice octahedrons*) yang berputar dan melayang pelan, dipadu dengan kisi fosfor layar ponsel (*digital phosphor grid*) di lantai perspektif biru malam.
   - **Babak 2 (Musim Semi Aglio Olio):** Kelopak bunga matcha & cyan yang melayang ke atas dalam pusaran termal, disertai letupan partikel bara keemasan (*sizzling embers*) seperti minyak zaitun dan bawang putih di wajan.
   - **Babak 3 (Musim Panas Titik Hadap):** Torus kawat geometris beresonansi dan bernapas di pusat semesta, disertai tabrakan dua aliran energi batin: partikel lavender keraguan vs berkas biru tekad Robit yang membentuk cincin gelombang kejut.
   - **Babak 4 (Musim Gugur Rute 23 Juni & Moscow):** Dedaunan musim gugur merah-kuning berjatuhan, kilatan garis kecepatan lampu bus malam (*highway speed streaks*) rute Probolinggo → Jogja, dan serpihan salju lembut Katedral Moscow.
   - **Babak 5 (Polaris Abadi):** Inti Bintang Polaris emas icosahedron dengan korona berdenyut, 3 cincin gimbal giroskop kosmik, dan garis rasi bintang (*constellation compass*) yang menunjuk langsung ke Polaris.

3. **Kursor Orbit Interaktif (`CustomOrbitCursor.tsx`):**
   - Titik starlight pusat dan cincin orbit 36px dengan *easing lerp* halus.
   - Saat melintasi Portal atau tombol aksi, cincin membesar 1.25x dan memunculkan label magnetis *"Lompat Portal"*.

4. **Sinematik Intro Preloader (`PreloaderSequence.tsx`):**
   - Hitungan presisi 0–100% dengan pendar aurora kosmik dan lambang kompas Polaris yang melayang di tengah sebelum membuka pintu semesta.

5. **Arsitektur Real 3D Model WebGL & GLTFLoader (`ModelViewerGLB.tsx`):**
   - **Standalone Real 3D Engine:** Menggunakan Three.js `GLTFLoader` resmi dengan *studio directional & ambient lighting*, *soft shadow maps*, serta *mouse orbit / drag control 360°*.
   - **Procedural 3D WebGL Built-in (Zero-Broken State):**
     - **Babak 1:** [ThreeSmartphone3D.tsx](file:///f:/Projectan/Polaris/app/components/ThreeSmartphone3D.tsx) (Smartphone 3D dengan layar OLED 02:14 AM, chassis Space Blue metalik, pulau kamera triple lens, dan rotasi mouse orbit).
     - **Babak 2:** [ThreeCookingSkillet3D.tsx](file:///f:/Projectan/Polaris/app/components/ThreeCookingSkillet3D.tsx) (Wajan cast iron 3D dengan simulasi minyak zaitun berpendar, irisan bawang & cabai flakes).
     - **Babak 3:** [ThreeHeartConflict3D.tsx](file:///f:/Projectan/Polaris/app/components/ThreeHeartConflict3D.tsx) (Patung kinetik dual-resonansi 3D: kristal amethis keraguan batin vs cincin emas tekad Robit yang bertransformasi real-time saat tab diganti).
     - **Babak 4:** [ThreeMoscowDome3D.tsx](file:///f:/Projectan/Polaris/app/components/ThreeMoscowDome3D.tsx) (Kubah katedral St. Basil Moscow berulir dengan salju 3D mengambang).
     - **Babak 5:** [ThreePolarisStar3D.tsx](file:///f:/Projectan/Polaris/app/components/ThreePolarisStar3D.tsx) (Bintang faset emas dengan 3 cincin giroskop kompas penunjuk masa depan).
   - **Kustomisasi Model 3D Sendiri (`public/models/*.glb`):** Mendukung model kustom dari Tripo 3D, Blender, atau Sketchfab (`act1-phone.glb`, `act2-skillet.glb`, `act3-sculpture.glb`, `act4-moscow.glb`, `act5-polaris.glb`).

6. **Mesin Latar Foto Sinematik Emosional (`CinematicPhotoBackground.tsx`):**
   - **Bebas Partikel Confetti Murah:** Menggunakan foto nyata beresolusi tinggi dengan efek *Ken Burns pan/zoom*, pergeseran paralaks mouse interaktif, dan gradasi *vignette* sinematik.
   - **Distribusi Visual per Babak:**
     - Babak 1: `MALAM DI DALAM KAMAR.jpg` (Nuansa hening malam biru elektrik).
     - Babak 2: `public/images/act2-spring.jpg` (Dapur hangat rustic, wajan aglio olio & lentera malam).
     - Babak 3: `public/images/act3-summer.jpg` (Sudut jalan malam bernuansa hujan Wong Kar-wai & lampu temaram ungu).
     - Babak 4: `moscow.jpg` (Kubah katedral bersalju & atmosfer merah menyala).
     - Babak 5: `public/images/act5-polaris.jpg` (Langit malam angkasa berbintang dengan pendar Bintang Polaris emas).
