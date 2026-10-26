# Story Bible & Design System: Robit & Naiqo
**Konsep: Alkimia Pemurnian Diri (*Chromatic Distillation*) & Mutasi Desain UI**

Dokumen ini adalah panduan terpadu (*master blueprint*) yang menggabungkan **Alur Cerita Utama**, **Inversi Teori Warna (*La La Land*)**, dan **Teori Psikologi Desain UI** untuk proyek web interaktif **Robit & Naiqo**.

---

## 1. Filosofi Dasar: Warna & Psikologi Antarmuka (UI)

### A. Inversi Teori Warna (Pigmen vs. Cahaya)
Berbeda dengan *La La Land* asli yang bergerak dari warna primer naif menuju monokrom redup, cerita **Robit & Naiqo** bergerak dari **warna dingin yang terisolasi dan penuh kompromi menuju warna primer yang murni dan jujur**.

1. **Karakter Awal:**
   * **Robit — Biru Indigo (`#1B2A4A`):** Melambangkan dedikasi seni yang sunyi, isolasi diri, perfeksionisme dingin, dan luka masa lalu.
   * **Naiqo — Hijau Zamrud (`#2E4A3E`):** Melambangkan pertumbuhan yang tertahan oleh keraguan diri (*insecurity*), kompromi terhadap ekspektasi sekitar, dan sikap selalu mengalah demi menjaga ketenangan.
2. **Hukum Pigmen (Kostum & Properti — RYB):**
   Secara pigmen, **Hijau = Biru + Kuning**. Sejak awal, Naiqo (Hijau) menyimpan potensi cahaya **Kuning** (optimisme dan bakat murni), namun tertutup oleh lapisan **Biru** (kesedihan dan ketakutan). Saat mereka berpisah di akhir cerita, Robit "mengambil alih" seluruh unsur Biru tersebut sehingga Naiqo terbebas menjadi **Kuning Murni (`#FFD700`)**.
3. **Hukum Cahaya (Pencahayaan Layar — RGB):**
   Pada spektrum cahaya layar (RGB), tabrakan cahaya **Hijau (`#00FF00`)** dan **Merah (`#FF0000`)** menghasilkan **Kuning Terang (`#FFFF00`)**. Ketika Naiqo (Hijau) berani menghadapi katalis **Merah** (keberanian, konfrontasi, dan risiko), warnanya meledak menjadi Kuning.

### B. Teori Psikologi Desain UI (*UI Mutation*)
Antarmuka web tidak bersifat statis, melainkan ikut bermutasi mengikuti kondisi mental Robit dan Naiqo di setiap babak:
* **Efek *Bouba vs. Kiki* (`border-radius`):** Sudut membulat (*rounded*) menciptakan rasa aman, ramah, namun pasif (zona nyaman). Sudut siku-siku tajam (`0px`) memicu kesan konfrontasi, kejujuran mentah, dan ketegasan.
* **Kaca Buram (*Blur*) vs. Bidang Padat (*Solid*):** Efek `backdrop-filter: blur` menggambarkan jarak psikologis dan ilusi pelarian (melihat dunia nyata dari balik kabut). Bidang padat 100% *solid* dengan bayangan tegas (*hard shadow*) melambangkan kepastian dan keberanian berpijak di dunia nyata.
* **Kerangka Ruang (*Grid* vs. *Fluid*):** Petak *Bento Grid* yang kaku melambangkan keterkungkungan rutinitas; *Organic Anti-Grid* melambangkan peleburan batas emosional; dan *Editorial Grid* melambangkan kedewasaan.

---

## 2. Tabel Master: Timeline Cerita, Warna, & Mutasi UI

| Babak & Musim | Fase Cerita (Robit & Naiqo) | Palet Warna Dominan | Gaya Desain UI | Properti Visual Utama (CSS) |
| :--- | :--- | :--- | :--- | :--- |
| **Babak 1**<br>*(Musim Dingin)* | **Isolasi & Kompromi:** Robit mengurung diri dalam karyanya; Naiqo lelah terus mengalah pada keadaan. | **Biru Indigo** (`#1B2A4A`), **Hijau Zamrud** (`#2E4A3E`), Arang (`#0F141C`) | **Linear Dark Mode + Rigid Bento Grid** | `border-radius: 8px`, *border* tipis `1px solid rgba(255,255,255,0.08)`, terpisah dalam kotak kaku. |
| **Babak 2**<br>*(Musim Semi)* | **Harmoni Analog:** Pertemuan tanpa drama; langsung nyambung karena sama-sama lelah dan terluka. | **Cyan Laut** (`#1A5F7A`), **Teal Teduh** (`#2EC4B6`), Mint Redup (`#A8DADC`) | **Frosted Touch (Glassmorphism) + Fluid UI** | `border-radius: 24px`, `backdrop-filter: blur(20px)`, *animated mesh gradient* yang melebur. |
| **Babak 3**<br>*(Musim Panas)* | **Ilusi & Titik Beku:** Terlalu nyaman bersembunyi berdua hingga ambisi dan gairah karya mati perlahan. | **Lembayung Redup** (`#6C5B7B`), **Perak Pucat** (`#D1D5DB`), Kabut (`#E5E7EB`) | **Resonant Stark + Soft Neumorphism** | `border-radius: 32px`, permukaan *matte* rata, *inset shadow* samar, kontras teks rendah. |
| **Babak 4**<br>*(Musim Gugur)* | **Katalis Kejujuran:** Realitas & ambisi asli meledak; menghancurkan zona nyaman demi menyelamatkan mimpi. | **Merah Katalis** (`#E63946`) menabrak Hijau $ightarrow$ **Kuning** (`#FFD700`) | **Tactile Brutalism + Kinetic Typography** | `border-radius: 0px` (pecah & tajam), `2px solid #E63946`, `mix-blend-mode: screen`, tekstur *noise* kasar. |
| **Babak 5**<br>*(5 Tahun Kemudian)* | **Distilasi Murni:** Sukses di jalan masing-masing; bertemu kembali dengan tatapan syukur tanpa penyesalan. | **Kuning Matahari** (`#FFD700`), **Biru Elektrik** (`#1D4ED8`), Putih Gading (`#FAF9F6`) | **Editorial Neo-Brutalism + Human Scribble** | `border-radius: 4px`, 100% *solid* tanpa *blur*, *hard shadow* `6px 6px 0px #111827`, aksen coretan tangan. |
| **Mode *"What If"***<br>*(Interaksi Ending)* | **Khayalan Semu:** *"Andai dulu kita tidak pernah berpisah dan tetap bersembunyi..."* | **Lumut Gelap** (`#1E352F`), **Biru Kelabu** (`#16222F`), Hitam Pekat | **Degenerasi ke Dark Frosted UI** | Layar menyempit (*vignette*), meleleh kembali ke `blur(30px)` yang buram, gelap, dan menyesakkan. |

---

## 3. Rincian Alur Per Babak (Narasi, Warna, & Panduan UI)

### Babak 1: Prolog dalam Bayang-Bayang (Musim Dingin)
* **Alur Cerita Utama:**
  Robit dan Naiqo menjalani hidup di jalur yang terpisah namun sama-sama membeku. Robit tenggelam dalam perfeksionisme dan kesendiriannya—menciptakan karya di balik pintu tertutup namun kehilangan sentuhan hangat dengan dunia luar. Di sisi lain, Naiqo terus-menerus memendam keinginannya sendiri demi memenuhi ekspektasi orang lain, membuatnya tampak tenang di permukaan namun penuh keraguan di dalam.
* **Alur Warna:**
  Dimulai dengan saturasi rendah (*desaturated cool tones*). Latar dunia mereka berwarna abu-abu arang (`#0F141C`). Robit diselimuti pendar **Biru Indigo (`#1B2A4A`)**, sedangkan Naiqo berada dalam bayang-bayang **Hijau Zamrud (`#2E4A3E`)**.
* **Perilaku Desain UI (*Linear Dark Mode + Rigid Bento Grid*):**
  * Layar dibagi ke dalam petak-petak *Bento Grid* yang mengurung ruang gerak teks Robit di sisi kiri dan Naiqo di sisi kanan.
  * Garis pembatas tegas namun dingin (`1px solid rgba(255,255,255,0.08)`).
  * Gunakan font *Monospace* untuk bagian Robit (kesan teknis, kaku, terisolasi) dan *Sans-Serif* geometris untuk Naiqo (kesan patuh dan rapi).

---

### Babak 2: Harmoni Analog yang Meninabobokan (Musim Semi)
* **Alur Cerita Utama:**
  Pertemuan pertama Robit dan Naiqo tidak diwarnai pertengkaran, melainkan kelegaan instan. Karena warna dasar Naiqo (Hijau) sudah mengandung unsur Biru milik Robit, Naiqo langsung memahami kesepian Robit tanpa perlu banyak kata. Sebaliknya, unsur Kuning yang terpendam di dalam diri Naiqo memberikan secercah kehangatan yang selama ini hilang dari hidup Robit. Mereka membangun dunia kecil berdua yang sangat teduh.
* **Alur Warna:**
  Biru Indigo dan Hijau Zamrud merupakan warna analog (bersebelahan di roda warna). Saat menyatu, keduanya melahirkan gradasi **Cyan (`#1A5F7A`)**, **Teal (`#2EC4B6`)**, dan **Aquamarine**. Warna ini menenangkan mata layaknya air laut yang dalam, namun menyimpan bahaya tersembunyi: dasar laut itu dingin dan menjauhkan mereka dari udara bebas di permukaan.
* **Perilaku Desain UI (*Frosted Touch Glassmorphism + Fluid Anti-Grid*):**
  * Kotak *Bento Grid* dari Babak 1 meleleh. Garis batas antar kolom hilang.
  * Kartu cerita menggunakan efek kaca buram (`backdrop-filter: blur(20px)`) dengan sudut sangat membulat (`border-radius: 24px`).
  * Di belakang kartu, terdapat *animated mesh gradient* berwarna Biru-Hijau yang bergerak lambat mengikuti kursor pengguna, menciptakan sensasi terbuai di dalam zona nyaman.

---

### Babak 3: Ilusi Lembayung & Titik Beku (Musim Panas)
* **Alur Cerita Utama:**
  Hubungan mereka mencapai titik paling harmonis namun sekaligus paling stagnan. Mereka mengira ketiadaan konflik adalah tanda kedewasaan, padahal mereka sedang saling memaklumi ketakutan masing-masing. Robit berhenti menantang batas karyanya, dan Naiqo berhenti mengejar mimpi besarnya karena merasa "cukup" bersembunyi di balik kenyamanan hubungan mereka.
* **Alur Warna:**
  Saturasi warna menurun drastis menuju **Lembayung Redup / Lavender Kelabu (`#6C5B7B`)** di malam hari dan **Monokrom Perak (`#D1D5DB`)** di siang hari. Tidak ada satupun unsur warna hangat (Merah/Oranye/Kuning) di layar—sinyal visual bahwa api gairah hidup mereka sedang padam perlahan.
* **Perilaku Desain UI (*Resonant Stark + Soft Neumorphism*):**
  * Efek pendaran cahaya hilang, berganti menjadi permukaan *matte* yang rata dan hening.
  * Komponen UI menggunakan gaya *Soft Neumorphism*—tombol dan kartu seolah tenggelam menyatu dengan latar belakang (`box-shadow: inset 4px 4px 8px rgba(0,0,0,0.08)`).
  * Ruang kosong (*whitespace*) menjadi sangat lebar dan renggang, menggunakan tipografi *Light Serif* yang tipis dan pucat.

---

### Babak 4: Katalis Merah & Klimaks Distilasi Warna (Musim Gugur)
* **Alur Cerita Utama:**
  Sebuah tawaran besar dan tenggat waktu nyata datang menghantam kehidupan mereka, memaksa keduanya melihat kenyataan yang selama ini mereka hindari. Alih-alih bertengkar karena saling benci, terjadi konfrontasi jujur yang emosional: mereka sadar bahwa jika terus bersembunyi dalam perpaduan Biru-Hijau yang nyaman, mereka akan saling menenggelamkan potensi terbaik satu sama lain.
* **Alur Warna:**
  * Warna **Merah Menyala (`#E63946`)** masuk merobek layar yang pucat sebagai simbol urgensi, keberanian, dan kenyataan.
  * **Momen Alkimia Cahaya:** Saat elemen Hijau milik Naiqo bertabrakan dengan cahaya Merah, terjadi reaksi optik (`mix-blend-mode: screen`) yang memunculkan pijar **Kuning Terang (`#FFD700`)**.
  * **Momen Pemisahan Pigmen:** Robit memilih melepaskan Naiqo dan menarik seluruh unsur **Biru** (beban kesedihan dan perpisahan) kembali ke dalam dirinya sendiri, membebaskan Naiqo sepenuhnya dari rasa ragu.
* **Perilaku Desain UI (*Tactile Brutalism + Kinetic Typography*):**
  * **Efek Kejut Visual:** Seluruh efek kaca buram (*blur*) dan sudut tumpul **pecah seketika** menjadi sudut siku-siku tajam (`border-radius: 0px`).
  * Garis tepi berubah menjadi merah tegas (`2px solid #E63946`) dengan lapisan tekstur *SVG Film Grain / Noise* yang kasar.
  * Dialog kunci ditampilkan dengan *Kinetic Typography* berukuran raksasa yang memenuhi layar, memaksa pembaca merasakan benturan emosi dan runtuhnya ilusi zona nyaman.

---

### Babak 5: Ending Warna Primer & *Twist* Sekuens *"What If"* (5 Tahun Kemudian)
* **Alur Cerita Utama:**
  Lima tahun berlalu. Naiqo telah bertransformasi menjadi sosok yang bersinar, berani, dan memegang kendali penuh atas mimpinya. Robit pun telah mencapai puncak kematangan karyanya—bukan lagi dari ruang isolasi yang muram, melainkan dengan ketenangan yang jernih. Ketika mereka tak sengaja bertemu kembali di ruang milik Robit, keduanya saling bertatapan dan bertukar senyum hangat.
* **Alur Warna (Dunia Nyata vs. Khayalan):**
  * **Dunia Nyata (Terang & Murni):** Latar web berubah menjadi **Putih Gading Hangat (`#FAF9F6`)**. Naiqo tampil dengan aksen **Kuning Matahari (`#FFD700`)** dan sedikit sentuhan **Merah (`#E63946`)**, sementara Robit berdiri dalam warna **Biru Langit Elektrik (`#1D4ED8`)** yang jernih dan tegas.
  * **Twist Sekuens *"What If"* (Dibalik dari film asli):** Saat mereka beradu pandang dan membayangkan *"Bagaimana jika dulu kita tidak pernah berpisah?"*, warna khayalan itu justru **tidak berwarna-warni indah**, melainkan **memudar kembali menjadi Biru-Hijau Lumut (`#1E352F`) yang gelap, sempit, dan dingin**. Begitu khayalan selesai, layar kembali meledak menjadi terang benderang—membuktikan bahwa perpisahan itulah yang menyelamatkan warna mereka.
* **Perilaku Desain UI (*Editorial Neo-Brutalism + Human Scribble*):**
  * Tata letak berubah menjadi *Editorial Magazine* yang bersih, dewasa, dan lega.
  * Seluruh kartu menggunakan blok warna *solid* tanpa *blur* sedikitpun, dipertegas dengan garis tepi hitam (`2px solid #111827`) dan bayangan padat (*hard offset shadow*: `6px 6px 0px #111827`)—simbol bahwa keduanya kini berpijak kokoh di dunia nyata.
  * Terdapat aksen **Human Scribble** (coretan garis bawah atau catatan tangan SVG) pada dialog penutup sebagai simbol ketulusan dan rasa syukur.
  * **Interaksi Tombol *"What If"*:** Terdapat sebuah tombol *toggle* di akhir halaman. Saat ditekan dan ditahan (*hold/toggle*), seluruh tampilan *Editorial Neo-Brutalism* yang cerah akan **meleleh mundur menjadi *Frosted Glassmorphism* gelap kehijauan** dengan efek *vignette* yang menyempitkan layar. Saat dilepas, UI kembali tegas dan terang.

---

## 4. Spesifikasi Teknis: CSS Variables (*Design Tokens*) per Babak

Kode di bawah ini siap dipasang pada *root container* atau dikontrol menggunakan *state* (`data-act="1"` s/d `data-act="5"`) di Next.js / Tailwind CSS untuk mengubah warna sekaligus gaya UI secara otomatis saat pengguna melakukan *scroll*:

```css
/* Transisi Global Antar Babak */
.story-container {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: 
    background-color 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.6s ease;
}

.story-card {
  background: var(--card-bg);
  border-radius: var(--card-radius);
  border: var(--card-border);
  box-shadow: var(--card-shadow);
  backdrop-filter: var(--card-blur);
  -webkit-backdrop-filter: var(--card-blur);
  transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

/* BABAK 1: Linear Dark Mode + Rigid Bento Grid (Biru Indigo & Hijau Zamrud) */
[data-act="1"] {
  --bg-primary: #0F141C;
  --text-primary: #E2E8F0;
  --robit-accent: #1B2A4A;
  --naiqo-accent: #2E4A3E;
  --card-bg: rgba(27, 42, 74, 0.35);
  --card-radius: 8px;
  --card-border: 1px solid rgba(255, 255, 255, 0.08);
  --card-shadow: none;
  --card-blur: blur(4px);
}

/* BABAK 2: Frosted Touch Glassmorphism (Cyan & Teal Zona Nyaman) */
[data-act="2"] {
  --bg-primary: #112A36;
  --text-primary: #F0FDFA;
  --robit-accent: #1A5F7A;
  --naiqo-accent: #2EC4B6;
  --card-bg: rgba(46, 196, 182, 0.12);
  --card-radius: 24px;
  --card-border: 1px solid rgba(168, 218, 220, 0.25);
  --card-shadow: 0 20px 50px rgba(26, 95, 122, 0.25);
  --card-blur: blur(20px);
}

/* BABAK 3: Resonant Stark + Soft Neumorphism (Lembayung Redup & Perak Beku) */
[data-act="3"] {
  --bg-primary: #D1D5DB;
  --text-primary: #4B5563;
  --robit-accent: #6C5B7B;
  --naiqo-accent: #9CA3AF;
  --card-bg: #D1D5DB;
  --card-radius: 32px;
  --card-border: 1px solid rgba(255, 255, 255, 0.4);
  --card-shadow: inset 6px 6px 12px #B8BCC2, inset -6px -6px 12px #EAEEF4;
  --card-blur: none;
}

/* BABAK 4: Tactile Brutalism + Katalis Merah -> Kuning */
[data-act="4"] {
  --bg-primary: #18181B;
  --text-primary: #FAFAFA;
  --robit-accent: #1D4ED8;
  --naiqo-accent: #FFD700;
  --catalyst-red: #E63946;
  --card-bg: #09090B;
  --card-radius: 0px;
  --card-border: 2px solid #E63946;
  --card-shadow: 8px 8px 0px #E63946;
  --card-blur: none;
}

/* BABAK 5: Editorial Neo-Brutalism (Ending Warna Primer Murni) */
[data-act="5"] {
  --bg-primary: #FAF9F6;
  --text-primary: #111827;
  --robit-accent: #1D4ED8;
  --naiqo-accent: #FFD700;
  --card-bg: #FFFFFF;
  --card-radius: 4px;
  --card-border: 2px solid #111827;
  --card-shadow: 6px 6px 0px #111827;
  --card-blur: none;
}

/* MODE INTERAKTIF "WHAT IF": Degenerasi Kembali ke Dark Frosted Teal */
[data-act="what-if"] {
  --bg-primary: #0B1616;
  --text-primary: #64748B;
  --robit-accent: #16222F;
  --naiqo-accent: #1E352F;
  --card-bg: rgba(30, 53, 47, 0.25);
  --card-radius: 28px;
  --card-border: 1px solid rgba(255, 255, 255, 0.04);
  --card-shadow: inset 0 0 80px rgba(0, 0, 0, 0.85);
  --card-blur: blur(30px);
}
```
