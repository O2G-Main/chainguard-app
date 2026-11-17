import Link from "next/link";
import { ArrowUpRight, Boxes, Cpu, Package, Warehouse } from "lucide-react";
import { semuaRingkasan, detailBatch } from "@/lib/store";
import { formatWaktu } from "@/lib/format";
import StatusChip from "@/components/StatusChip";
import type { Bacaan } from "@/lib/types";
import ShipmentUnitCard from "@/components/ShipmentUnitCard";

export const dynamic = "force-dynamic";

export default function BatchList() {
  const shipments = semuaRingkasan();
  const unitCount = shipments.reduce((sum, r) => sum + r.batch.units.length, 0);
  const wadahCount = shipments.reduce((sum, r) => sum + r.batch.units.filter(unit => unit.jenis === "wadah").length, 0);
  const karungCount = unitCount - wadahCount;
  return <>
    <p className="eyebrow">Pengiriman & perangkat</p>
    <h1>Batch pengiriman</h1>
    <p className="lede">Satu batch mewakili satu pengiriman. Setiap wadah atau karung memiliki ID unit dan logger sendiri.</p>
    <div className="shipment-summary" aria-label="Ringkasan pengiriman">
      <div><Package aria-hidden="true" /><strong>{shipments.length}</strong><span>Pengiriman</span></div>
      <div><Boxes aria-hidden="true" /><strong>{unitCount}</strong><span>{wadahCount} wadah · {karungCount} karung</span></div>
      <div><Cpu aria-hidden="true" /><strong>{unitCount}</strong><span>Logger terpasang</span></div>
      <Link href="/dashboard/stok"><Warehouse aria-hidden="true" /><strong>Stok</strong><span>Lihat gudang <ArrowUpRight size={13} aria-hidden="true" /></span></Link>
    </div>
    <div className="shipment-grid">{shipments.map(r => {
      const detail = detailBatch(r.batch.id);
      const latestByDevice = new Map<string, Bacaan>();
      for (const reading of detail?.bacaan ?? []) latestByDevice.set(reading.deviceId, reading);
      const wadah = r.batch.units.filter(unit => unit.jenis === "wadah").length;
      const karung = r.batch.units.length - wadah;
      return <section className="shipment-card" key={r.batch.id} aria-labelledby={`shipment-${r.batch.id}`}>
        <div className="shipment-card-head">
          <div><p className="shipment-overline">Pengiriman · {r.batch.komoditas === "cabai" ? "Cabai" : "Bawang merah"}</p><h2 id={`shipment-${r.batch.id}`}>{r.batch.id}</h2></div>
          <StatusChip status={r.status} />
        </div>
        <p className="shipment-route">{r.pemegangNama} · {r.lokasiSaatIni}</p>
        <div className="shipment-facts"><span><strong>{r.beratSaatIniKg.toLocaleString("id-ID")} kg</strong> berat pengiriman terakhir</span><span><strong>{r.batch.units.length} unit</strong>{wadah > 0 && ` ${wadah} wadah`}{wadah > 0 && karung > 0 && " · "}{karung > 0 && ` ${karung} karung`}</span></div>
        <div className="shipment-unit-section-head"><h3>Isi pengiriman</h3><span>{r.batch.units.length} alat terpasang</span></div>
        <div className="shipment-unit-grid">{r.batch.units.map(unit => <ShipmentUnitCard key={unit.id} unit={unit} komoditas={r.batch.komoditas} latest={latestByDevice.get(unit.deviceId)} />)}</div>
        <div className="shipment-card-foot"><span>{r.sinkronTerakhir ? `Sinkron ${formatWaktu(r.sinkronTerakhir)}` : "Belum ada sinkronisasi"}</span><Link href={`/batch/${r.batch.id}`}>Detail batch <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      </section>;
    })}</div>
  </>;
}
