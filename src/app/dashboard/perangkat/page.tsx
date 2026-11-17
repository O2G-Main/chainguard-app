import Link from "next/link";
import { detailBatch, semuaRingkasan } from "@/lib/store";
import { formatWaktu } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function Perangkat() {
  const rows = semuaRingkasan().flatMap(r => {
    const readings = detailBatch(r.batch.id)?.bacaan ?? [];
    return r.batch.units.map(unit => {
      const unitReadings = readings.filter(reading => reading.deviceId === unit.deviceId);
      return { batchId: r.batch.id, unit, count: unitReadings.length, latest: unitReadings.at(-1) };
    });
  });
  return <>
    <p className="eyebrow">Logger IoT</p><h1>Perangkat per unit</h1>
    <p className="lede">Satu logger dipasang pada satu wadah atau karung. ID batch menunjukkan pengiriman yang menaunginya.</p>
    <div className="dashboard-table"><table><thead><tr><th>Logger</th><th>Unit fisik</th><th>Pengiriman</th><th>Bacaan</th><th>Terakhir</th></tr></thead><tbody>
      {rows.map(({ batchId, unit, count, latest }) => <tr key={unit.deviceId}>
        <td><strong>{unit.deviceId}</strong></td>
        <td>{unit.id}<br /><small>{unit.tipe}</small></td>
        <td><Link href={`/batch/${batchId}`}>{batchId}</Link></td>
        <td>{count}</td>
        <td>{latest ? formatWaktu(latest.ts) : "Menunggu data"}</td>
      </tr>)}
    </tbody></table></div>
    <p className="form-hint">Koneksi fisik dan autentikasi alat belum tersedia dalam prototipe.</p>
  </>;
}
