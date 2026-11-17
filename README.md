# ChainGuard, Perangkat Lunak

Dashboard dan server penerima data untuk ChainGuard: sistem telusur
cabai dan bawang merah berbasis context graph dan logger IoT.

Status: prototipe perangkat lunak yang berjalan penuh dengan data contoh.
Belum terhubung ke alat fisik dan belum berisi data lapangan. Semua
halaman menampilkan label "Data contoh".

## Menjalankan

```
npm install
npm run dev     # pengembangan, http://localhost:3000
npm run build   # build produksi
npm start       # jalankan build produksi
```

## Context graph dengan Neo4j

Graph Telusur memakai `neo4j-driver` resmi. Salin `.env.example` ke
`.env.local`, lalu isi `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`, dan
`NEO4J_DATABASE` sesuai instance Neo4j. Jangan commit berkas `.env.local`.

```
npm run graph:seed
```

Perintah ini membuat constraint ID unik dan menyinkronkan enam batch contoh
sebagai node batch, pelaku, dan kejadian; relasinya adalah menangani,
serah terima, terjadi saat, dan tercatat pada. `GET /api/graph/[id]`
mengembalikan graph beserta sumbernya (`neo4j` atau `local`). Halaman Telusur
membaca Neo4j jika tersedia, lalu menggunakan graph lokal saat koneksi atau
data Neo4j belum ada. Kiriman API sensor, serah terima, dan catatan lapangan
menyinkronkan graph setelah data diterima; respons menyertakan
`graph_synced` agar kegagalan sinkronisasi terlihat.

**Batasan:** Neo4j saat ini adalah penyimpanan graph, sementara data utama
batch dan kiriman API masih di memori server. Untuk produksi, pindahkan data
utama ke database persisten dan gunakan outbox/retry agar pembaruan graph
tetap konsisten saat Neo4j tidak tersedia.

## Isi

- **Dashboard web (`/dashboard`)** memiliki menu Ringkasan, Batch, Scan QR,
  Prioritas Jual, Telusur, Serah Terima, dan Paspor.
  Scan QR di area ini membuka detail batch untuk pemantauan.
- **PWA lapangan (`/app`)** memiliki Beranda, Batch Saya, Scan QR, Aktivitas,
  dan Akun. Setelah scan, pengguna dapat mencatat kondisi, timbang ulang,
  serah terima, atau membuka paspor. PWA memakai navbar kaca ringan dan
  manifest dengan halaman awal `/app`.
- Catatan lapangan yang gagal dikirim disimpan di perangkat dan dicoba lagi
  saat koneksi kembali. Halaman Aktivitas juga menampilkan antrean lokal.
- **Penting:** akun pengguna, database, dan otorisasi belum tersedia. Data
  contoh serta catatan yang sudah terkirim masih berada di memori server.
  Daftar "Batch Saya" belum dapat difilter menurut pengguna.

- **Beranda (`/`)** menjawab satu pertanyaan: batch mana yang harus
  ditindak sekarang. Urutannya: yang mendesak, yang perlu dipantau,
  urutan jual duluan, lalu semua batch. Detail teknis tidak ditampilkan
  di sini.
- **Urutan Jual (`/prioritas`)** daftar semua batch terurut prioritas
  jual, dengan alasan dalam kalimat biasa: lama paparan di luar batas
  aman, umur sejak panen, dan susut berat.
- **Rincian batch (`/batch/[id]`)** paspor penanganan satu batch: grafik
  suhu dan kelembapan terhadap batas aman, ringkasan kondisi tiap
  perjalanan antar pelaku, dan riwayat serah terima dengan beratnya.
- **API integrasi** (`/api/readings`, `/api/handover`, `/api/batches`)
  menerima kiriman logger dan aplikasi pelaku. Format lengkapnya di
  `INTEGRASI_IOT.md`.

## Prinsip tampilan

- Bahasa pasar, bukan istilah teknis: "kepanasan", "berat turun",
  "di tangan siapa". Tidak ada angka yang ditampilkan kalau tidak bisa
  ditindaklanjuti pembacanya.
- Setiap angka selalu ditemani kesegarannya: "data terakhir jam
  berapa", karena data bisa datang telat dari alat yang offline.
- Status hanya tiga: Aman, Perlu dipantau, Perlu ditindak sekarang.
- Batas aman dan ambang adalah parameter contoh di
  `src/lib/thresholds.ts`, dikunci ulang dari literatur dan kesepakatan
  pelaku sebelum uji lapangan.

## Checklist verifikasi (dijalankan 11 Nov 2026)

- [x] `npx tsc --noEmit` bersih, tanpa error
- [x] `npm run build` berhasil, semua rute terbangun
- [x] Halaman `/`, `/prioritas`, `/batch/CAB-014` merespons 200,
      batch yang tidak ada merespons 404
- [x] `GET /api/batches` mengembalikan ringkasan sesuai cerita data
      contoh (CAB-014 mendesak karena kepanasan 3 jam, BM-007 dipantau
      karena kelembapan, BM-009 dipantau karena susut 5,3%)
- [x] `POST /api/readings` menerima bacaan baru dan membalas `ack_seq`
- [x] Kiriman ulang bacaan yang sama tersaring sebagai duplikat,
      tidak menggandakan data
- [x] Kiriman dari alat yang tidak terdaftar untuk batch itu ditolak
      dengan pesan yang jelas
- [x] `POST /api/handover` tercatat, dan ringkasan batch langsung
      berpindah tangan, berat, dan lokasi mengikuti catatan baru
- [x] Label "Data contoh" tampil di semua halaman
- [x] Tidak ada karakter em dash di kode maupun halaman hasil render

## Langkah berikutnya menuju uji lapangan

1. Ganti store in-memory (`src/lib/store.ts`) dengan database.
2. Tambah autentikasi alat dan pengguna.
3. Kunci parameter di `src/lib/thresholds.ts` dari literatur dan
   kesepakatan pelaku.
4. Hubungkan pengirim notifikasi WhatsApp ke `GET /api/batches`.
