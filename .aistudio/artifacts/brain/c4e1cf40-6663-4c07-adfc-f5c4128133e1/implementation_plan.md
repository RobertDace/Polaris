# Polaris (Robit & Naiqo) — Integrasi Penuh Scrollytelling 5 Babak & Dunia 3D

Perbaikan menyeluruh untuk menyatukan kembali pengalaman **Scrollytelling 5 Babak Lengkap** dengan **Dunia 3D WebGL Kosmik**, mengaktifkan kembali seluruh interaksi memori di tiap babak, menampilkan model 3D interaktif pendamping di setiap fase cerita, serta menyinkronkan mutasi warna, latar foto sinematik paralaks, dan efek suara sintetis Web Audio API.

### User Review & Critical Decisions

> [!IMPORTANT]
> Seluruh preferensi yang kamu konfirmasi telah dijadikan fondasi utama rencana perbaikan ini:

- **Konsep Tampilan Utama (Dikonfirmasi)**: **Gabungan Scroll 5 Babak Lengkap & Dunia 3D** — Halaman utama tidak lagi terkunci pada satu layar statis, melainkan membuka alur *scrollytelling* penuh dari Hero hingga Babak 1–5 yang tersinkronisasi langsung dengan pergerakan kamera 3D di sepanjang kurva orbit menuju Bintang Polaris, dilengkapi sakelar opsional apabila ingin beralih ke tampilan *Space Voyage Portal HUD* layar penuh.
- **Aktivasi Fitur & Interaksi Penuh (Dikonfirmasi)**: Mengembalikan dan menyempurnakan kelima interaksi utama (Chat Subuh 02:14 AM, Memasak Aglio Olio 3 Bahan, Sakelar Perspektif Rasa Cemas vs Tekad, Validasi Tiket Bus 23 Juni Probolinggo–Jogja & Impian Katedral Moscow, serta Live Timer 365 Hari), lengkap dengan model 3D interaktif di tiap babak, portal lompat 3D, latar foto Ken Burns paralaks, dan pemutar musik *Audio Sanctuary*.
- **Narasi Akhir Babak 5 & "What If" (Dikonfirmasi)**: **Bersatu Selamanya — Naiqo Sebagai Bintang Polaris Tujuan Hidup**, di mana menahan tombol *"What If"* memperlihatkan dinginnya dunia semu seandainya menyerah pada keadaan, dan melepaskannya mengembalikan cahaya keemasan ikrar Robit untuk berjuang menjadi pria mapan bersama Naiqo.

---

### 1. Overview & Core Concept

- **What It Does**: Karya web interaktif perayaan 1 tahun (365 hari mengorbit bersama, 13 Oktober 2025 – 13 Oktober 2026) yang membawa Naiqo melintasi lima musim perjalanan emosional dan nyata bersama Robit melalui perpaduan narasi puitis, interaksi taktil bersuara, fotografi atmosferik, dan dunia 3D WebGL real-time.
- **Target Audience / Persona**: Naiqo — sebagai ruang apresiasi personal yang menjawab keraguan dan rasa cemasnya dengan ketulusan, bukti perjalanan nyata, dan komitmen masa depan Robit.
- **Key Value**: Menghadirkan pengalaman bercerita yang hidup dan menyentuh seluruh indra (visual, gerakan 3D, tipografi yang bermutasi mengikuti suasana hati, serta audio interaktif) tanpa kehilangan kehangatan memori asli mereka.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Cinematic Preloader & Hero Pembuka**: Hitungan pemuatan kompas kosmik membuka gerbang menuju Hero *"Kamu Adalah Polaris Hidupku"*, dilengkapi tombol jelajah yang menggerakkan kamera 3D masuk ke Babak 1.
  2. **Babak 01 — Musim Dingin (02:14 AM)**: Pengguna membaca prolog pertemuan dua frekuensi yang lelah, memutar model 3D Smartphone yang menampilkan layar chat subuh, dan menekan tombol balas pesan secara interaktif dengan efek suara ketukan dan *pop*.
  3. **Babak 02 — Musim Semi (Aglio Olio)**: Memilih 3 bahan masakan (*Spaghetti*, *Bawang & Minyak Zaitun*, *Cabai Flakes*) yang langsung memunculkan bahan di atas model 3D Wajan Besi (*Cast Iron Skillet*) maupun model `.glb`, lalu menekan tombol tumis untuk memicu animasi api, uap, dan suara mendesis (*sizzling*).
  4. **Babak 03 — Musim Panas (Titik Hadap)**: Beralih antara tab *"Rasa Cemas Naiqo"* dan *"Jawaban & Tekad Robit"*, yang secara real-time mengubah geometri dan pendaran warna pada Patung Kristal Resonansi 3D dari ungu keraguan menjadi emas-biru keteguhan hati.
  5. **Babak 04 — Musim Gugur (Rute 23 Juni & Impian Moscow)**: Mencap tiket bus malam Probolinggo → Yogyakarta (23 Juni 2026) dengan efek suara stempel & klakson bus serta akselerasi cahaya jalan raya di dunia 3D, diikuti jendela impian salju Katedral St. Basil Moscow 3D yang dapat diputar 360°.
  6. **Babak 05 — Bintang Polaris & Epilog "What If"**: Menyaksikan penghitung waktu aktif 365+ hari sejak 13 Oktober 2025, berinteraksi dengan Bintang Polaris 3D emas ber-giroskop untuk membuka **Modal Surat Rahasia & Kotak Janji** (lengkap dengan fitur simpan balasan pesan Naiqo), serta menekan-tahan tombol **"What If"** untuk merasakan kontras antara dinginnya perpisahan semu dan hangatnya ikrar masa depan bersama.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: **Chromatic Distillation & Mutasi Desain UI** — Antarmuka bermutasi secara bertahap dari ruang dingin yang kaku menuju kemurnian warna primer dan cahaya bintang keemasan.
  - *Color Palette & Mood*:
    - **Babak 1 (Musim Dingin)**: Latar `#0F141C`, aksen Biru Robit `#0047FF` & Hijau Matcha Naiqo `#00C853` (*Linear Dark Bento*).
    - **Babak 2 (Musim Semi)**: Latar `#102632`, peleburan analog Cyan `#00F5D4` & Mint `#2EC4B6` (*Frosted Glassmorphism*).
    - **Babak 3 (Musim Panas)**: Latar `#D1D5DB`, teks `#1F2937`, aksen Lembayung `#6C5B7B` & Perak (*Soft Neumorphism*).
    - **Babak 4 (Musim Gugur)**: Latar `#141416`, aksen Merah Katalis `#FF1E40` & Emas Lentera `#F59E0B` (*Tactile Neo-Brutalism* dengan sudut tegas `0px` dan bayangan offset tajam).
    - **Babak 5 (Polaris)**: Latar Gading Terang `#FAF9F6`, teks `#111827`, aksen Kuning Emas Polaris `#FFD700`, Biru Elektrik `#1D4ED8`, dan Hijau Matcha `#00C853` (*Editorial Neo-Brutalism*).
    - **Mode "What If"**: Degenerasi instan ke `#070F0F` (Teal kelabu gelap dengan *vignette* menyempit dan kabut tebal).
  - *Typography & Hierarchy*: Kombinasi `DM Serif Display` untuk judul naratif dan kutipan emosional, `Plus Jakarta Sans` untuk narasi utama yang jernih, serta `JetBrains Mono` (`tabular-nums`) untuk penanda waktu (02:14 AM, 23 Juni 2026, penghitung detik 365 hari).
  - *Component Styling & Layout*: Tata letak responsif berlebar penuh dengan kanvas 3D dan latar foto sinematik tersemat di belakang (`fixed inset-0`), sementara setiap babak memiliki ruang bernapas lega, kartu cerita bermutasi (`story-card-surface`), panggung khusus untuk objek 3D interaktif per babak, dan gerbang portal 3D di penghujung tiap babak.

- **Interactive Feedback & Motion**:
  - Scroll halus (*Lenis Smooth Scroll*) yang menggerakkan posisi kamera di sepanjang jalur *Catmull-Rom Spline* 3D secara proporsional.
  - Transisi *Hyperspace Warp* saat pengguna menekan Portal 3D atau berpindah babak melalui navigasi atas.
  - Efek suara sintetis mandiri berbasis Web Audio API (tanpa ketergantungan file eksternal untuk SFX) dipadukan dengan pemutar lagu latar *Audio Sanctuary* di sudut kanan bawah.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Arsitektur Hybrid Scrollytelling + Mode Portal HUD**
  - *Chosen Approach*: Menjadikan alur *Scrollytelling 5 Babak Lengkap* sebagai pengalaman utama yang mengalir di atas dunia 3D dan latar foto paralaks, sambil menyediakan tombol pengalih tampilan (*View Mode Switcher*) di bilah navigasi agar pengguna juga dapat menikmati *Mode Jelajah Portal 3D* layar penuh kapan saja.
  - *Why*: Memastikan tidak ada satu pun cerita, interaksi memori, ataupun kanvas 3D yang hilang atau tersembunyi, sekaligus memberikan keleluasaan eksplorasi visual.
  - *Alternatives Considered*: Memisahkan keduanya ke rute URL berbeda ditolak karena memutus kesinambungan musik dan konteks dunia 3D.

- **Decision 2: Panggung Model 3D Ganda (Procedural WebGL + Dukungan GLB)**
  - *Chosen Approach*: Menyematkan komponen 3D interaktif khusus di setiap babak (Smartphone 3D di Babak 1, Wajan Aglio Olio 3D di Babak 2, Kristal Dual-Resonansi 3D di Babak 3, Kubah Katedral Moscow 3D di Babak 4, dan Bintang Kompas Polaris 3D di Babak 5) dengan opsi beralih ke pemuat model `.glb` asli yang tersedia di repositori.
  - *Why*: Menjamin tampilan 3D selalu tampil utuh, interaktif (dapat diputar dengan *drag* kursor/sentuhan), dan bebas dari kondisi *broken state*, sekaligus memanfaatkan aset `.glb` yang sudah ada.

- **Decision 3: Deteksi Babak Otomatis Berbasis Scroll & Sinkronisasi Jembatan Dunia 3D**
  - *Chosen Approach*: Menggunakan pengamat posisi gulir (*Intersection & Scroll Progress Observer*) untuk memperbarui atribut `data-act` pada dokumen dan mengirimkan progres `0.0 → 1.0` ke mesin 3D secara kontinu.
  - *Why*: Menghasilkan transisi warna latar, kabut 3D, partikel musim, dan posisi terbang kamera yang mulus saat pengguna membaca dari atas ke bawah.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ROOT EXPERIENCE ORCHESTRATOR                         │
│   State: currentAct (1..5 | "what-if"), viewMode ("scroll" | "voyage"),     │
│          scrollProgress (0..1), showPromiseModal, isPreloaderDone           │
└───────┬──────────────────────────────┬──────────────────────────────┬───────┘
        │                              │                              │
        ▼                              ▼                              ▼
┌───────────────────────┐  ┌──────────────────────────┐  ┌────────────────────┐
│  AMBIENT LAYER (Z-0)  │  │  SCROLLYTELLING (Z-10)   │  │ GLOBAL HUD & AUDIO │
│                       │  │                          │  │                    │
│ ┌───────────────────┐ │  │ ┌──────────────────────┐ │  │ ┌────────────────┐ │
│ │ Cinematic Photo   │ │  │ │ HeroCinematic        │ │  │ │ HeaderNav +    │ │
│ │ Background        │ │  │ │ (Polaris Intro)      │ │  │ │ Mode Switcher  │ │
│ │ (Ken Burns +      │ │  │ └──────────┬───────────┘ │  │ └────────────────┘ │
│ │  Mouse Parallax)  │ │  │            ▼             │  │ ┌────────────────┐ │
│ └─────────┬─────────┘ │  │ ┌──────────────────────┐ │  │ │ Audio          │ │
│           │           │  │ │ Act 1: Winter 02:14  │ │  │ │ Atmosphere     │ │
│           ▼           │  │ │ Chat + 3D Smartphone │ │  │ │ (7-Track + SFX)│ │
│ ┌───────────────────┐ │  │ └──────────┬───────────┘ │  │ └────────────────┘ │
│ │ ThreeWorldCanvas  │ │  │            ▼             │  │ ┌────────────────┐ │
│ │ & WorldEngine     │ │  │ ┌──────────────────────┐ │  │ │ PromiseModal   │ │
│ │ - Spline Camera   │◄┼──┼─┤ Act 2: Spring Kitchen│ │  │ │ (Secret Letter │ │
│ │ - Morph Particles │ │  │ │ Recipe + 3D Skillet  │ │  │ │  & Reply Box)  │ │
│ │ - Stations 1..4   │ │  │ └──────────┬───────────┘ │  │ └────────────────┘ │
│ │ - Polaris Beacon  │ │  │            ▼             │  │ ┌────────────────┐ │
│ └───────────────────┘ │  │ ┌──────────────────────┐ │  │ │ SpaceVoyageHUD │ │
│                       │  │ │ Act 3: Summer Heart  │ │  │ │ (Optional Full │ │
│                       │  │ │ Tabs + 3D Resonance  │ │  │ │  3D Portal UI) │ │
│                       │  │ └──────────┬───────────┘ │  │ └────────────────┘ │
│                       │  │            ▼             │  └────────────────────┘
│                       │  │ ┌──────────────────────┐ │
│                       │  │ │ Act 4: Autumn 23 Jun │ │
│                       │  │ │ Ticket + 3D Moscow   │ │
│                       │  │ └──────────┬───────────┘ │
│                       │  │            ▼             │
│                       │  │ ┌──────────────────────┐ │
│                       │  │ │ Act 5: Polaris Star  │ │
│                       │  │ │ 365 Timer + What-If  │ │
│                       │  │ └──────────────────────┘ │
└───────────────────────┘  └──────────────────────────┘
```

- **Data Model & State**:
  - `WorldBridge` (Event Bus): Menjembatani state antara komponen UI React dan loop WebGL (`act:change`, `warp:state`, `whatif:state`, `cooking:state`, `conflict:perspective`).
  - `Act Theme Tokens`: Variabel CSS pada `[data-act="1".."5" | "what-if"]` yang mengatur `--bg-primary`, `--text-primary`, `--card-bg`, `--card-radius`, `--card-border`, dan `--card-shadow`.
  - `Persistent Reply Storage`: Menyimpan balasan surat Naiqo di `localStorage` (`polaris_naiqo_reply`) agar tetap tersimpan saat halaman dibuka kembali.

- **Interactive Component & State Mapping**:
  - **Scroll & Chapter Navigation**: Menggulir halaman atau menekan nomor babak `01`–`05` pada `HeaderNav` / `CosmicPortalGateway` memicu fungsi `scrollToAct(act)`, memperbarui `currentAct`, memutar `playPortalWarpSFX()`, dan menggerakkan kamera 3D sepanjang kurva menuju koordinat Z stasiun terkait.
  - **Babak 1 (`Act1Winter`)**: Mengklik tombol *"Balas Pesan"* menambah `chatIndex` dengan jeda indikator mengetik (`isTyping`), memutar `playPopSFX()`, dan memperbarui pratinjau teks langsung pada layar kanvas `ThreeSmartphone3D`.
  - **Babak 2 (`Act2Spring`)**: Memilih ketiga kartu bahan mengaktifkan tombol *"Mulai Tumis Aglio Olio Berdua"*, yang memicu `worldBridge.setCooking(true, ingredients)`, menggetarkan model `ThreeCookingSkillet3D` dengan partikel uap dan nyala api, serta menampilkan kartu penyelesaian hidangan setelah selesai.
  - **Babak 3 (`Act3Summer`)**: Mengklik tab *"Rasa Cemas Naiqo"* atau *"Jawaban & Tekad Robit"* mengubah state `activeTab`, memancarkan `worldBridge.setConflictPerspective(...)`, dan melakukan interpolasi warna/rotasi real-time pada kristal `ThreeHeartConflict3D`.
  - **Babak 4 (`Act4Autumn`)**: Mengklik *"Cap Tiket Perjalanan Jogja Ini"* mengubah `ticketStamped = true`, memutar `playStampSFX()` + `playBusHornSFX()`, memicu akselerasi garis cahaya di dunia 3D, serta menyediakan tampilan interaktif `ThreeMoscowDome3D` dan model `.glb` Katedral St. Basil.
  - **Babak 5 (`Act5Polaris`)**: Menghitung selisih waktu real-time per detik dari `2025-10-13T00:00:00`, merender `ThreePolarisStar3D` yang membuka `PromiseModal` beserta ledakan konfeti saat disentuh, serta menghubungkan penahanan tombol `WhatIfToggle` ke state `"what-if"` untuk memicu penyempitan *vignette* dan peredupan dunia 3D sebelum kembali bersinar saat dilepas.
