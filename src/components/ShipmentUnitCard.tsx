import { Box, Cpu, Droplets, ShoppingBag, Thermometer, TriangleAlert } from "lucide-react";
import { formatWaktu } from "@/lib/format";
import { jenisMasalah } from "@/lib/logic";
import type { Bacaan, Komoditas, ShipmentUnit } from "@/lib/types";

export default function ShipmentUnitCard({
  unit,
  komoditas,
  latest,
}: {
  unit: ShipmentUnit;
  komoditas: Komoditas;
  latest?: Bacaan;
}) {
  const outOfRange = latest ? jenisMasalah(komoditas, latest.suhu, latest.rh) !== null : false;
  return <article className={`shipment-unit-card${outOfRange ? " shipment-unit-alert" : ""}`}>
    <header className="shipment-unit-head">
      <span className={`shipment-unit-symbol unit-${unit.jenis}`}>{unit.jenis === "karung" ? <ShoppingBag size={21} aria-hidden="true" /> : <Box size={21} aria-hidden="true" />}</span>
      <span className={`shipment-unit-state${outOfRange ? " is-alert" : ""}`}>{latest ? outOfRange ? <><TriangleAlert size={13} aria-hidden="true" /> Terakhir di luar batas</> : "Terakhir aman" : "Menunggu bacaan"}</span>
    </header>
    <p className="shipment-overline">{unit.jenis === "karung" ? "Karung" : "Wadah"} · {unit.id}</p>
    <h3>{unit.tipe}</h3>
    <dl className="shipment-unit-facts">
      <div><dt>Berat awal</dt><dd>{unit.beratAwalKg.toLocaleString("id-ID")} kg</dd></div>
      <div><dt><Cpu size={14} aria-hidden="true" /> Logger</dt><dd>{unit.deviceId}</dd></div>
    </dl>
    <div className="shipment-unit-reading">
      {latest ? <>
        <span><Thermometer size={15} aria-hidden="true" /> {latest.suhu.toLocaleString("id-ID")}°C</span>
        <span><Droplets size={15} aria-hidden="true" /> {latest.rh}% RH</span>
      </> : <span>Belum ada data dari alat ini</span>}
    </div>
    <p className="shipment-unit-time">{latest ? `Bacaan terakhir ${formatWaktu(latest.ts)}` : "Status alat belum dapat dinilai"}</p>
  </article>;
}
