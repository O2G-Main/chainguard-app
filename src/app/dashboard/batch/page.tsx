import Link from "next/link";
import { ArrowUpRight, Cpu, Package, Scale, Warehouse } from "lucide-react";
import { semuaRingkasan, detailBatch } from "@/lib/store";
import { formatWaktu } from "@/lib/format";
import StatusChip from "@/components/StatusChip";
import type { Bacaan } from "@/lib/types";

export const dynamic = "force-dynamic";

export default function BatchList() {
  const shipments = semuaRingkasan();
  const unitCount = shipments.reduce((sum, r) => sum + r.batch.units.length, 0);
  return <>
    <p className="eyebrow">Pengiriman & perangkat</p>
    <h1>Batch pengiriman</h1>
    <p className="lede">Satu batch mewakili satu pengiriman. Setiap wadah atau karung memiliki ID unit dan logger sendiri.</p>
    <div className="shipment-summary" aria-label="Ringkasan pengiriman">
      <div><Package aria-hidden="true" /><strong>{shipments.length}</strong><span>Pengiriman</span></div>
      <div><Scale aria-hidden="true" /><strong>{unitCount}</strong><span>Wadah & karung</span></div>
      <div><Cpu aria-hidden="true" /><strong>{unitCount}</strong><span>Logger terpasang</span></div>
      <Link href="/dashboard/stok"><Warehouse aria-hidden="true" /><strong>Stok</strong><span>Lihat gudang <ArrowUpRight size={13} aria-hidden="true" /></span></Link>
    </div>
    <div className="shipment-grid">{shipments.map(r => {
      const detail = detailBatch(r.batch.id);
      const latestByDevice = new Map<string, Bacaan>();
      for (const reading of detail?.bacaan ?? []) latestByDevice.set(reading.deviceId, reading);
      return <article className="shipment-card" key={r.batch.id}>
        <div className="shipment-card-head">
          <div><p className="shipment-overline">Pengiriman · {r.batch.komoditas === "cabai" ? "Cabai" : "Bawang merah"}</p><h2>{r.batch.id}</h2></div>
          <StatusChip status={r.status} />
        </div>
        <p className="shipment-route">{r.pemegangNama} · {r.lokasiSaatIni}</p>
        <div className="shipment-facts"><span><strong>{r.beratSaatIniKg.toLocaleString("id-ID")} kg</strong> berat terakhir</span><span><strong>{r.batch.units.length}</strong> unit fisik</span></div>
        <h3>Unit & alat pencatat</h3>
        <ul className="shipment-units">{r.batch.units.map(unit => {
          const reading = latestByDevice.get(unit.deviceId);
          return <li key={unit.id}>
            <span className={`unit-icon unit-${unit.jenis}`}><Package size={17} aria-hidden="true" /></span>
            <span className="unit-main"><strong>{unit.id}</strong><small>{unit.tipe} · {unit.beratAwalKg} kg awal</small></span>
            <span className="unit-reading"><strong>{unit.deviceId}</strong><small>{reading ? `${reading.suhu.toLocaleString("id-ID")}°C · ${reading.rh}% RH` : "Menunggu data"}</small></span>
          </li>;
        })}</ul>
        <div className="shipment-card-foot"><span>{r.sinkronTerakhir ? `Sinkron ${formatWaktu(r.sinkronTerakhir)}` : "Belum ada sinkronisasi"}</span><Link href={`/batch/${r.batch.id}`}>Detail batch <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      </article>;
    })}</div>
  </>;
}
