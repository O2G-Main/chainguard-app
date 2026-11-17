import { semuaRingkasan, detailBatch } from "@/lib/store";
import { PELAKU } from "@/lib/seed";
import FormSerahTerima from "@/components/FormSerahTerima";

export const dynamic = "force-dynamic";
export default function SerahTerimaPage() {
  return <><p className="eyebrow">Pencatatan perjalanan</p><h1>Catat serah terima</h1><p className="lede">Scan QR pada wadah atau pilih batch, lalu catat penerima dan hasil timbang.</p><FormSerahTerima batches={semuaRingkasan().map(r => { const d=detailBatch(r.batch.id); return {id:r.batch.id, nama:`${r.batch.id} · ${r.batch.komoditas === "cabai" ? "Cabai" : "Bawang merah"}`, pemegangId:d?.serahTerima.at(-1)?.keId ?? r.batch.petaniId, berat:r.beratSaatIniKg}; })} pelaku={PELAKU.map(p => ({id:p.id,nama:p.nama}))}/></>;
}
