export type Komoditas = "cabai" | "bawang_merah";

export type PeranPelaku = "petani" | "pengepul" | "distributor" | "pedagang";

export interface Pelaku {
  id: string;
  nama: string;
  peran: PeranPelaku;
  lokasi: string;
}

export interface Batch {
  id: string;
  komoditas: Komoditas;
  petaniId: string;
  waktuPanen: string; // ISO
  beratPanenKg: number;
  units: ShipmentUnit[]; // satu batch adalah satu pengiriman, alat menempel per wadah
}

export interface ShipmentUnit {
  id: string;
  jenis: "wadah" | "karung";
  tipe: string;
  beratAwalKg: number;
  deviceId: string;
}

export interface WarehouseResource {
  id: string;
  nama: string;
  kategori: "kemasan" | "perangkat";
  jumlah: number;
  satuan: string;
  lokasi: string;
}

export interface Bacaan {
  deviceId: string;
  batchId: string;
  seq: number;
  ts: string; // ISO, waktu kejadian di alat
  suhu: number; // derajat C
  rh: number; // persen
}

export interface SerahTerima {
  id: string;
  batchId: string;
  dariId: string | null; // null = panen (titik awal)
  keId: string;
  waktu: string; // ISO
  beratKg: number;
  lokasi: string;
}

export type StatusBatch = "aman" | "pantau" | "mendesak";

export interface RingkasanLeg {
  dariNama: string;
  keNama: string;
  mulai: string;
  selesai: string;
  menitDiLuarJendela: number;
  suhuMaks: number;
  rhMaks: number;
  rhMin: number;
  masalahUtama: "panas" | "lembap" | "kering" | null;
}

export interface RingkasanBatch {
  batch: Batch;
  pemegangNama: string;
  pemegangPeran: string;
  lokasiSaatIni: string;
  beratSaatIniKg: number;
  susutPersen: number;
  umurJam: number;
  totalMenitPaparan: number;
  status: StatusBatch;
  masalahUtama: "panas" | "lembap" | "kering" | null;
  kalimatMasalah: string | null;
  tindakan: string | null;
  alasanPrioritas: string[];
  skorPrioritas: number;
  sinkronTerakhir: string | null;
}
