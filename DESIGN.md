# DESIGN.md, Arah Visual ChainGuard

Dokumen arah untuk dashboard ChainGuard. antislop adalah filternya,
dokumen ini arahnya. Keduanya dipakai bersamaan.

## Identitas

ChainGuard adalah ruang kerja pemantauan batch dan pencatatan lapangan.
Dashboard memakai kartu yang mudah dipindai; PWA memakai permukaan ringan
dan navigasi kaca yang tetap jelas di bawah cahaya matahari.

Penggunanya pelaku pasar yang membuka ini di HP murah, di bawah
cahaya matahari, sambil berdiri di samping tumpukan barang. Semua
keputusan desain tunduk ke situasi itu.

## Palet

- Latar: #EFF8FF (biru sangat muda)
- Permukaan: #FFFFFF (kartu)
- Tinta: #3D4858 (teks utama)
- Tinta pudar: #5C697B (teks pendamping)
- Garis: #E1E4E9
- Hijau aksen: #1FC65F (permukaan utama; teks di atasnya #0A3B25)
- Hijau tautan: #0B7138 (teks pada permukaan terang)
- Biru pendukung: #DFF0FB; mint pendukung: #D2F6E4
- Merah mendesak: #B92D35 di atas #FFE9EA
- Kuning pantau: #8A5A10 di atas #FFF3DF
- Penanda komoditas: titik merah cabai untuk batch cabai, titik
  ungu bawang #7A4A63 untuk batch bawang merah. Kecil, selalu di
  tempat yang sama, tidak pernah jadi dekorasi besar.

Warna merah tetap khusus untuk status mendesak. Warna referensi Ocean
Breeze diperkirakan dari gambar; token CSS adalah sumber nilai yang dipakai.

## Tipografi

- Judul dan isi memakai font sistem agar halaman lokal tidak bergantung
  pada unduhan font eksternal.
- Angka selalu tabular (font-variant-numeric: tabular-nums) supaya
  berat dan suhu sejajar rapi seperti di buku catatan.
- Label kecil: huruf kapital 12-13px, spasi huruf longgar, tinta
  pudar. Hanya untuk label, tidak pernah untuk kalimat.

## Bentuk dan ruang

- Sudut dasar 12px; kartu bento dan navigasi PWA memakai radius lebih
  besar sesuai perannya.
- Ritme vertikal longgar: bagian dipisah 34px, isi kartu bernapas.
- Tanda merek: tiga titik yang dihubungkan garis, seperti rute
  batch di context graph, putih di atas blok hijau dalam.
- Grafik: daerah aman digambar sebagai pita hijau muda dengan tepi
  garis putus-putus, garis data tegas, titik terakhir ditandai dan
  diberi nilai. Sumbu waktu selalu tertulis, tidak ditebak.

## Yang dilarang

- Efek kaca atau gradien yang mengurangi keterbacaan teks.
- Statistik karangan, lencana "AI", ikon emoji, teks promosi.
- Warna status dipakai di luar arti statusnya.
- Informasi teknis di beranda. Beranda hanya menjawab: batch mana
  yang harus ditindak, kenapa, dan ngapain.

## Logo dan ikon (dari ekosistem 21st.dev)

- Logo adalah komponen React bertipe `Logo` (mark + wordmark, prop
  ukuran dan varian), mengikuti pola komponen brand di paket UI
  21st.dev (components/ui/logo.tsx). Mark tetap tiga titik terhubung
  garis di atas ubin hijau tua membulat.
- Ikon dari Lucide lewat paket lucide-react: pustaka ikon open-source
  yang diagregasi 21st.dev/icons dan dipakai komponen-komponen
  21st.dev sebagai sistem ikonnya. Salin-tempel per ikon dari situs
  21st.dev butuh paket berbayar Builder; pustakanya sendiri
  berlisensi ISC dan diambil lewat npm, jadi path SVG-nya asli,
  bukan gambar ulang.
- Ikon selalu membawa arti dan berdampingan label teks: status
  (segitiga peringatan, mata, centang), jenis masalah (api, tetesan,
  angin, timbangan, jam), label data (orang, pin, kalender, sinkron,
  wadah, alat). Tidak ada ikon hiasan.
- Kategori "logo" di 21st.dev isinya logo cloud untuk dinding logo
  klien; tidak dipakai karena ChainGuard tidak punya daftar logo
  klien dan menampilkannya akan jadi hiasan tanpa arti.
