# Kustomisasi Musik Latar (Background Music)

Secara default, aplikasi ini akan memutar lagu instrumental piano romantis dari tautan online (CDN). 

Jika Anda ingin menggantinya dengan lagu favorit pacar Anda secara lokal:
1. Siapkan file musik dalam format `.mp3`.
2. Ganti nama file tersebut menjadi `music.mp3`.
3. Letakkan file `music.mp3` di dalam folder `assets/` ini (menggantikan file musik lainnya jika ada).
4. Pastikan baris kode berikut di `index.html` mengarah ke file yang benar:
   ```html
   <audio id="bg-music" loop>
       <source src="assets/music.mp3" type="audio/mpeg">
   </audio>
   ```

Selamat berkreasi! Semoga dimaafkan ya! ❤️
