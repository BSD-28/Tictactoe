# 🎮 TicTacToe

Proyek ini merupakan implementasi game **Tic-Tac-Toe (X-O)** berbasis web.  
Fokus utama pengembangan adalah **clean code**, **tampilan UI yang rapi**, serta **pembagian kerja yang jelas** antar anggota tim.  
Game ini dapat dimainkan secara **local**, **melawan AI**, **online** dengan teman.

---

## 🎯 Tujuan Proyek
- Menerapkan logika permainan (menang, seri, dan pergantian giliran).
- Melatih kolaborasi tim dengan Git (branching, pull request, dan review).
- Mengembangkan aplikasi interaktif menggunakan React dan Socket.io.
- Menerapkan praktik dokumentasi dan testing dasar.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|------------|
| 🧑‍🤝‍🧑 **Player vs Player (Local)** | Dua pemain bermain di satu perangkat secara bergantian. |
| 🌐 **Online Multiplayer** | Main melawan teman lewat koneksi server. |
| 🧠 **Mode vs AI** | Melawan komputer dengan tingkat kesulitan dasar. |
| 🏆 **Validasi Pemenang** | Mengecek otomatis baris, kolom, dan diagonal kemenangan. |
| 😎 **Deteksi Seri** | Game menampilkan hasil seri bila semua kotak terisi tanpa pemenang. |
| 🔄 **Restart Game** | Reset papan untuk mulai ulang permainan. |
| 🌙 **Tema Gelap & Terang** | Ubah tampilan sesuai preferensi pemain. |

---

## 🧠 Alur Permainan
1. Pemain memilih mode permainan (Local atau Online atau Vs AI).  
2. Pemain **X** selalu memulai permainan terlebih dahulu.  
3. Setelah setiap giliran, sistem memeriksa apakah ada pemenang atau hasil seri.  
4. Jika permainan selesai, hasil akan ditampilkan beserta highlight pemenang.  
5. Pemain dapat menekan tombol **Restart** untuk bermain kembali.  

---

## 📚 Catatan
Proyek ini dibuat sebagai latihan kolaborasi tim dalam mengembangkan aplikasi berbasis web interaktif.  
Fitur online multiplayer masih dapat dikembangkan lebih lanjut agar mendukung matchmaking otomatis dan penyimpanan skor global.
