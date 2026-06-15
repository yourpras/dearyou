# Product Requirements Document (PRD): Interactive Apology Web App (Love Letter)

## 1. Latar Belakang & Tujuan
Proyek ini dibuat untuk menyampaikan permintaan maaf yang tulus dan kreatif kepada pasangan (pacar) melalui pengalaman digital yang interaktif. Alih-alih hanya mengirimkan pesan teks biasa, aplikasi ini akan menyajikan surat digital di dalam amplop interaktif yang dapat dibuka secara visual dengan animasi yang elegan dan menyentuh hati.

## 2. Target Pengguna
*   **Utama**: Pasangan (Pacar) dari pembuat proyek.
*   **Karakteristik**: Mengakses situs melalui perangkat mobile (smartphone) atau desktop, menyukai hal-hal romantis, estetik, dan interaktif.

## 3. Fitur Utama & Alur Pengguna (User Journey)

### A. Tampilan Awal (The Envelope Scene)
*   **Visual**: Sebuah amplop surat klasik bergaya premium (desain minimalis/klasik dengan segel lilin merah berbentuk hati atau pita) diletakkan di tengah layar.
*   **Interaksi**: Terdapat petunjuk halus (micro-animation berdenyut atau teks melayang seperti "Buka aku" / "Click to Open").
*   **Aksi**: Ketika pengguna menyentuh/mengklik amplop atau segel:
    1.  Segel lilin pecah/menghilang atau pita terbuka.
    2.  Penutup amplop (lid) melipat ke atas secara realistis menggunakan animasi 3D/CSS transition.
    3.  Surat di dalam amplop perlahan naik (slide up) dan memperbesar ukuran (zoom in) agar nyaman dibaca.

### B. Isi Surat (The Letter Content)
*   **Desain**: Kertas surat bertekstur lembut (efek kertas serat halus) dengan bayangan lembut (glassmorphism/soft shadow) agar kontras dari latar belakang.
*   **Tipografi**: Menggunakan font romantis/kursif (seperti *Playfair Display* atau *Great Vibes*) dipadukan dengan font sans-serif bersih (seperti *Inter* atau *Outfit*) untuk keterbacaan teks utama.
*   **Isi Pesan**:
    *   Salam pembuka yang manis.
    *   Teks permintaan maaf yang tulus (bisa dicustomize sesuai keinginan pengguna).
    *   Animasi teks bergaya mengetik perlahan (typing effect) atau memudar masuk (fade-in) per paragraf agar dibaca dengan seksama.

### C. Fitur Interaktif Tambahan (Cute Interactivity)
*   **Tombol Keputusan**: Di bagian bawah surat terdapat dua tombol respon:
    1.  **Tombol Positif** (misal: "Aku Maafin! ❤️"): Jika diklik, akan memicu efek konfeti/hati berjatuhan yang meriah dan memunculkan pesan penutup yang bahagia (misal: "Yay! Makasih ya, sayang! Janji gak nakal lagi 🥺").
    2.  **Tombol Negatif** (misal: "Nggak Mau/Pikir-pikir dulu 😜"):
        *   *Efek Menghindar (Runaway Button)*: Tombol ini akan otomatis berpindah tempat secara acak ketika kursor mendekat atau layar disentuh, sehingga pasangan tidak bisa menekan tombol penolakan tersebut dan akhirnya memilih dimaafkan.
*   **Efek Latar Belakang (Atmosphere)**:
    *   Partikel berbentuk hati (floating hearts) yang melayang lembut ke atas dari bagian bawah layar.
    *   Musik latar romantis (background music) yang lembut dengan kontrol tombol Volume/Mute di pojok layar (agar tidak mengejutkan jika dibuka di tempat umum).

## 4. Desain & Estetika (Rich Aesthetics)
*   **Tema Warna (Color Palette)**:
    *   Utama: Soft Pink, Rose Gold, Cream, dan Cherry Blossom Red.
    *   Kontras: Putih bersih untuk kertas surat, abu-abu hangat untuk bayangan halus.
*   **Tipografi**: Google Fonts (*Playfair Display*, *Inter*, *Sacramento*).
*   **Responsivitas**: Menggunakan unit responsif (`vw`, `vh`, `rem`, flexbox/grid) agar tampilan amplop dan surat presisi di layar HP (iPhone/Android) maupun Laptop.

## 5. Kebutuhan Teknis (Tech Stack)
*   **Teknologi Utama**: HTML5, Vanilla CSS3 (Custom Properties, Keyframes, 3D Transforms), dan Vanilla JavaScript (ES6+).
*   **Aset**:
    *   Ikon hati dan musik menggunakan SVG (ringan dan tajam di segala resolusi).
    *   Efek suara/musik menggunakan file `.mp3` berkualitas tinggi dengan ukuran terkompresi.
    *   Latar belakang gradasi CSS yang lembut untuk meminimalkan loading time.

## 6. Rencana Validasi (Testing & Verification)
*   Verifikasi fungsionalitas animasi amplop terbuka di berbagai browser (Chrome, Safari, Firefox).
*   Pengujian performa animasi di perangkat mobile (iOS & Android) agar tetap mulus (60 FPS).
*   Uji coba tombol menghindar agar bekerja secara intuitif baik menggunakan mouse hover maupun touch event di HP.
