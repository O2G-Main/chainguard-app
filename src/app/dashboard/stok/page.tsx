import Link from "next/link";
import { Boxes, Cpu, Package, Warehouse } from "lucide-react";
import { stokGudang } from "@/lib/warehouse";
import StatusChip from "@/components/StatusChip";

export const dynamic = "force-dynamic";

export default function StokGudang() {
  const stock = stokGudang();
  return <>
    <p className="eyebrow">Inventaris gudang</p>
    <h1>Stok di gudang</h1>
    <p className="lede">Hasil panen dihitung dari pengiriman yang pemegang terakhirnya distributor. Perlengkapan dicatat sebagai saldo terpisah.</p>
    <div className="warehouse-stats">
      <div><Warehouse aria-hidden="true" /><strong>{stock.pengiriman.length}</strong><span>Pengiriman tersimpan</span></div>
      <div><Package aria-hidden="true" /><strong>{stock.totalKg.toLocaleString("id-ID")} kg</strong><span>Hasil panen tersedia</span></div>
      <div><Boxes aria-hidden="true" /><strong>{stock.totalUnit}</strong><span>Wadah & karung berisi</span></div>
      <div><Cpu aria-hidden="true" /><strong>{stock.perlengkapan.find(item => item.kategori === "perangkat")?.jumlah ?? 0}</strong><span>Logger cadangan</span></div>
    </div>
    <section className="warehouse-section">
      <div className="warehouse-section-head"><div><h2>Hasil panen</h2><p>Pengiriman yang masih berada di tangan gudang.</p></div><span>{stock.pengiriman.length} batch</span></div>
      {stock.pengiriman.length === 0 ? <p className="empty-note">Belum ada pengiriman yang tercatat berada di gudang.</p> : <div className="warehouse-cards">{stock.pengiriman.map(r => <article className="warehouse-card" key={r.batch.id}>
        <div className="warehouse-card-top"><span className="shipment-overline">{r.batch.komoditas === "cabai" ? "Cabai" : "Bawang merah"}</span><StatusChip status={r.status} /></div>
        <h3>{r.batch.id}</h3><p>{r.lokasiSaatIni} · {r.pemegangNama}</p>
        <div className="warehouse-card-facts"><strong>{r.beratSaatIniKg.toLocaleString("id-ID")} kg</strong><span>{r.batch.units.length} {r.batch.units[0]?.jenis === "karung" ? "karung" : "wadah"} · {r.batch.units.length} logger</span></div>
        <Link href={`/batch/${r.batch.id}`}>Lihat unit pengiriman →</Link>
      </article>)}</div>}
    </section>
    <section className="warehouse-section">
      <div className="warehouse-section-head"><div><h2>Perlengkapan</h2><p>Saldo kemasan kosong dan alat yang siap dipakai.</p></div><span>{stock.perlengkapan.length} jenis</span></div>
      <div className="dashboard-table"><table><thead><tr><th>Barang</th><th>Kategori</th><th>Jumlah tersedia</th><th>Lokasi simpan</th></tr></thead><tbody>{stock.perlengkapan.map(item => <tr key={item.id}><td><strong>{item.nama}</strong></td><td>{item.kategori === "kemasan" ? "Kemasan kosong" : "Perangkat"}</td><td>{item.jumlah} {item.satuan}</td><td>{item.lokasi}</td></tr>)}</tbody></table></div>
    </section>
    <p className="form-hint">Stok dan saldo perlengkapan pada halaman ini adalah data contoh. Mutasi masuk, keluar, dan penyesuaian stok belum dicatat oleh prototipe.</p>
  </>;
}
