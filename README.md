# Proyek Aplikasi Web Node.js

## Deskripsi Project
Proyek ini merupakan aplikasi web untuk SDN 3 Banteran yang dikembangkan menggunakan Node.js. Aplikasi ini terdiri dari sisi backend dan frontend, serta dilengkapi dengan fitur seperti upload file, routing halaman, dan tampilan antarmuka pengguna. Tujuan dari proyek ini adalah untuk melatih kemampuan tim dalam membangun aplikasi fullstack secara dasar dan terstruktur.

## Struktur Folder
- `admin/`, `assets/`: menyimpan file statis dan halaman admin
- `config/`: berisi konfigurasi environment
- `controllers/`: mengelola logika utama aplikasi (seperti proses upload dan validasi)
- `models/`: mendefinisikan struktur data untuk kebutuhan database
- `routes/`: mengatur jalur akses atau URL dalam aplikasi
- `views/`: menyimpan tampilan halaman frontend
- `uploads/`: menyimpan file hasil unggahan pengguna
- `.env`: menyimpan variabel konfigurasi yang bersifat rahasia
- `server.js`: file utama yang menjalankan server
- `package.json`: mendeskripsikan informasi proyek dan dependensi

## Peran Anggota Tim

- **Hadaya Imtiyaza Syarifa (24SA31A010)**  
  Bertanggung jawab dalam pengembangan fungsi utama pada folder `controllers/`, termasuk proses unggah file dan validasi data.

- **Qeisha Amalya Putri (24SA31A069)**  
  Bertugas membuat dan merancang tampilan antarmuka pengguna pada folder `views/` dan file `index.html`.

- **Vannianti Nabilla Putri (24SA31A014)**  
  Menyusun server utama dalam file `server.js`, serta melakukan konfigurasi awal pada `.env` dan `package.json`.

- **Livia Febriati (24SA31A007)**  
  Mengerjakan pembuatan struktur model data di folder `models/`, serta menghubungkannya dengan database.

- **Dwi Safitri (24SA31A011)**  
  Menyusun jalur routing aplikasi di folder `routes/` agar setiap fitur dapat diakses sesuai dengan URL yang telah ditentukan.
