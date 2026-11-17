import { STOK_PERLENGKAPAN } from "./seed";
import { semuaRingkasan } from "./store";

// Stok komoditas mengikuti pemegang terakhir tiap pengiriman.
// Perlengkapan adalah saldo contoh yang terpisah dari berat hasil panen.
export function stokGudang() {
  const pengiriman = semuaRingkasan().filter((r) => r.pemegangPeran === "distributor");
  return {
    pengiriman,
    perlengkapan: STOK_PERLENGKAPAN,
    totalKg: pengiriman.reduce((sum, r) => sum + r.beratSaatIniKg, 0),
    totalUnit: pengiriman.reduce((sum, r) => sum + r.batch.units.length, 0),
  };
}
