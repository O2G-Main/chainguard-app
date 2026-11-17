import type { Bacaan, Batch, Pelaku, SerahTerima, WarehouseResource } from "./types";

// DATA CONTOH. Semua batch, pelaku, dan bacaan di file ini adalah contoh
// yang disusun agar dashboard bisa dilihat dan diuji sebelum uji lapangan.
// Bukan data lapangan. UI wajib selalu menampilkan label "Data contoh".

export const PELAKU: Pelaku[] = [
  { id: "P1", nama: "Slamet Riyadi", peran: "petani", lokasi: "Ajung, Jember" },
  { id: "P2", nama: "Budi Santoso", peran: "pengepul", lokasi: "Pasar Tanjung, Jember" },
  { id: "P3", nama: "Rina Wijaya", peran: "pedagang", lokasi: "Pasar Induk, Jember" },
  { id: "P4", nama: "Gudang Segar Abadi", peran: "distributor", lokasi: "Kaliwates, Jember" },
  { id: "P5", nama: "Darto Wibowo", peran: "petani", lokasi: "Kalisat, Jember" },
];

export const BATCHES: Batch[] = [
  { id: "CAB-014", komoditas: "cabai", petaniId: "P1", waktuPanen: "2026-11-09T23:00:00Z", beratPanenKg: 120, units: [
    { id: "CAB-014-W01", jenis: "wadah", tipe: "Keranjang kayu", beratAwalKg: 40, deviceId: "LG-01" },
    { id: "CAB-014-W02", jenis: "wadah", tipe: "Keranjang kayu", beratAwalKg: 40, deviceId: "LG-07" },
    { id: "CAB-014-W03", jenis: "wadah", tipe: "Keranjang kayu", beratAwalKg: 40, deviceId: "LG-08" },
  ] },
  { id: "BM-007", komoditas: "bawang_merah", petaniId: "P5", waktuPanen: "2026-11-08T01:00:00Z", beratPanenKg: 200, units: [
    { id: "BM-007-K01", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 50, deviceId: "LG-02" },
    { id: "BM-007-K02", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 50, deviceId: "LG-09" },
    { id: "BM-007-K03", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 50, deviceId: "LG-10" },
    { id: "BM-007-K04", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 50, deviceId: "LG-11" },
  ] },
  { id: "CAB-015", komoditas: "cabai", petaniId: "P1", waktuPanen: "2026-11-11T00:00:00Z", beratPanenKg: 80, units: [
    { id: "CAB-015-W01", jenis: "wadah", tipe: "Keranjang kayu", beratAwalKg: 40, deviceId: "LG-03" },
    { id: "CAB-015-W02", jenis: "wadah", tipe: "Keranjang kayu", beratAwalKg: 40, deviceId: "LG-12" },
  ] },
  { id: "BM-008", komoditas: "bawang_merah", petaniId: "P5", waktuPanen: "2026-11-10T01:00:00Z", beratPanenKg: 150, units: [
    { id: "BM-008-K01", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 50, deviceId: "LG-04" },
    { id: "BM-008-K02", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 50, deviceId: "LG-13" },
    { id: "BM-008-K03", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 50, deviceId: "LG-14" },
  ] },
  { id: "CAB-016", komoditas: "cabai", petaniId: "P1", waktuPanen: "2026-11-07T02:00:00Z", beratPanenKg: 100, units: [
    { id: "CAB-016-W01", jenis: "wadah", tipe: "Keranjang bambu", beratAwalKg: 50, deviceId: "LG-05" },
    { id: "CAB-016-W02", jenis: "wadah", tipe: "Keranjang bambu", beratAwalKg: 50, deviceId: "LG-15" },
  ] },
  { id: "BM-009", komoditas: "bawang_merah", petaniId: "P5", waktuPanen: "2026-11-08T00:30:00Z", beratPanenKg: 300, units: [
    { id: "BM-009-K01", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 60, deviceId: "LG-06" },
    { id: "BM-009-K02", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 60, deviceId: "LG-16" },
    { id: "BM-009-K03", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 60, deviceId: "LG-17" },
    { id: "BM-009-K04", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 60, deviceId: "LG-18" },
    { id: "BM-009-K05", jenis: "karung", tipe: "Karung jala merah", beratAwalKg: 60, deviceId: "LG-19" },
  ] },
];

export const STOK_PERLENGKAPAN: WarehouseResource[] = [
  { id: "SUP-01", nama: "Karung jala merah kosong", kategori: "kemasan", jumlah: 24, satuan: "karung", lokasi: "Rak A2" },
  { id: "SUP-02", nama: "Keranjang kayu kosong", kategori: "kemasan", jumlah: 12, satuan: "wadah", lokasi: "Rak B1" },
  { id: "SUP-03", nama: "Keranjang bambu kosong", kategori: "kemasan", jumlah: 8, satuan: "wadah", lokasi: "Rak B2" },
  { id: "SUP-04", nama: "Logger cadangan", kategori: "perangkat", jumlah: 4, satuan: "alat", lokasi: "Lemari alat" },
];

export const SERAH_TERIMA: SerahTerima[] = [
  { id: "ST-01", batchId: "CAB-014", dariId: "P1", keId: "P2", waktu: "2026-11-10T02:00:00Z", beratKg: 118, lokasi: "Ajung, Jember" },
  { id: "ST-02", batchId: "CAB-014", dariId: "P2", keId: "P3", waktu: "2026-11-11T01:30:00Z", beratKg: 115, lokasi: "Pasar Induk, Jember" },
  { id: "ST-03", batchId: "BM-007", dariId: "P5", keId: "P2", waktu: "2026-11-09T03:00:00Z", beratKg: 196, lokasi: "Pasar Tanjung, Jember" },
  { id: "ST-04", batchId: "BM-008", dariId: "P5", keId: "P4", waktu: "2026-11-10T09:00:00Z", beratKg: 148, lokasi: "Kaliwates, Jember" },
  { id: "ST-05", batchId: "CAB-016", dariId: "P1", keId: "P2", waktu: "2026-11-08T02:00:00Z", beratKg: 97, lokasi: "Pasar Tanjung, Jember" },
  { id: "ST-06", batchId: "CAB-016", dariId: "P2", keId: "P3", waktu: "2026-11-10T03:00:00Z", beratKg: 95, lokasi: "Pasar Induk, Jember" },
  { id: "ST-07", batchId: "BM-009", dariId: "P5", keId: "P4", waktu: "2026-11-09T00:30:00Z", beratKg: 291, lokasi: "Kaliwates, Jember" },
  { id: "ST-08", batchId: "BM-009", dariId: "P4", keId: "P3", waktu: "2026-11-10T12:00:00Z", beratKg: 284, lokasi: "Pasar Induk, Jember" },
];

interface Segmen {
  dari: string;
  sampai: string;
  suhu: [number, number];
  rh: [number, number];
}

const SEGMEN: Record<string, Segmen[]> = {
  "CAB-014": [
    { dari: "2026-11-09T23:00:00Z", sampai: "2026-11-10T02:00:00Z", suhu: [27, 29], rh: [78, 82] },
    { dari: "2026-11-10T02:00:00Z", sampai: "2026-11-10T22:00:00Z", suhu: [28, 30], rh: [80, 85] },
    { dari: "2026-11-10T22:00:00Z", sampai: "2026-11-11T00:15:00Z", suhu: [31, 38], rh: [76, 66] },
    { dari: "2026-11-11T00:15:00Z", sampai: "2026-11-11T01:30:00Z", suhu: [38, 33], rh: [66, 72] },
    { dari: "2026-11-11T01:30:00Z", sampai: "2026-11-11T05:30:00Z", suhu: [30, 29], rh: [80, 84] },
  ],
  "BM-007": [
    { dari: "2026-11-08T01:00:00Z", sampai: "2026-11-09T03:00:00Z", suhu: [28, 30], rh: [66, 69] },
    { dari: "2026-11-09T03:00:00Z", sampai: "2026-11-10T15:00:00Z", suhu: [29, 30], rh: [68, 69] },
    { dari: "2026-11-10T15:00:00Z", sampai: "2026-11-10T16:00:00Z", suhu: [30, 31], rh: [69, 80] },
    { dari: "2026-11-10T16:00:00Z", sampai: "2026-11-10T17:00:00Z", suhu: [31, 30], rh: [80, 68] },
    { dari: "2026-11-10T17:00:00Z", sampai: "2026-11-11T05:30:00Z", suhu: [29, 28], rh: [67, 69] },
  ],
  "CAB-015": [
    { dari: "2026-11-11T00:00:00Z", sampai: "2026-11-11T05:30:00Z", suhu: [26, 29], rh: [78, 84] },
  ],
  "BM-008": [
    { dari: "2026-11-10T01:00:00Z", sampai: "2026-11-10T09:00:00Z", suhu: [27, 29], rh: [66, 68] },
    { dari: "2026-11-10T09:00:00Z", sampai: "2026-11-11T05:30:00Z", suhu: [28, 30], rh: [67, 69] },
  ],
  "CAB-016": [
    { dari: "2026-11-07T02:00:00Z", sampai: "2026-11-08T02:00:00Z", suhu: [27, 30], rh: [78, 84] },
    { dari: "2026-11-08T02:00:00Z", sampai: "2026-11-09T05:00:00Z", suhu: [28, 30], rh: [80, 84] },
    { dari: "2026-11-09T05:00:00Z", sampai: "2026-11-09T05:30:00Z", suhu: [30, 33.5], rh: [84, 83] },
    { dari: "2026-11-09T05:30:00Z", sampai: "2026-11-09T06:30:00Z", suhu: [33.5, 30], rh: [83, 84] },
    { dari: "2026-11-09T06:30:00Z", sampai: "2026-11-10T03:00:00Z", suhu: [30, 29], rh: [84, 86] },
    { dari: "2026-11-10T03:00:00Z", sampai: "2026-11-11T05:30:00Z", suhu: [29, 28], rh: [84, 88] },
  ],
  "BM-009": [
    { dari: "2026-11-08T00:30:00Z", sampai: "2026-11-09T00:30:00Z", suhu: [27, 29], rh: [66, 68] },
    { dari: "2026-11-09T00:30:00Z", sampai: "2026-11-10T12:00:00Z", suhu: [28, 30], rh: [67, 69] },
    { dari: "2026-11-10T12:00:00Z", sampai: "2026-11-11T05:30:00Z", suhu: [29, 28], rh: [68, 69] },
  ],
};

const INTERVAL_MENIT = 30; // data contoh dibuat per 30 menit agar ringkas

function buatBacaan(batch: Batch): Bacaan[] {
  const hasil: Bacaan[] = [];
  let seq = 0;
  for (const seg of SEGMEN[batch.id] ?? []) {
    const mulai = new Date(seg.dari).getTime();
    const selesai = new Date(seg.sampai).getTime();
    for (let t = mulai; t <= selesai; t += INTERVAL_MENIT * 60000) {
      if (hasil.length > 0 && t <= new Date(hasil[hasil.length - 1].ts).getTime()) continue;
      const p = selesai === mulai ? 0 : (t - mulai) / (selesai - mulai);
      seq += 1;
      const goyangan = Math.sin(seq * 1.7) * 0.3;
      hasil.push({
        deviceId: batch.units[0].deviceId,
        batchId: batch.id,
        seq,
        ts: new Date(t).toISOString(),
        suhu: Math.round((seg.suhu[0] + (seg.suhu[1] - seg.suhu[0]) * p + goyangan) * 10) / 10,
        rh: Math.round(seg.rh[0] + (seg.rh[1] - seg.rh[0]) * p + goyangan * 2),
      });
    }
  }
  return hasil;
}

export const BACAAN_AWAL: Bacaan[] = BATCHES.flatMap(buatBacaan);
