import Link from "next/link";
import { semuaRingkasan } from "@/lib/store";
export const dynamic="force-dynamic";
export default function Paspor(){return <><p className="eyebrow">Bukti perjalanan</p><h1>Paspor penanganan</h1><p className="lede">Pilih batch untuk melihat ringkasan dan QR yang mengarah ke paspor digital.</p><div className="batch-grid">{semuaRingkasan().map(r=><Link className="batch-tile" href={`/paspor/${r.batch.id}`} key={r.batch.id}><strong>{r.batch.id}</strong><span>{r.batch.komoditas==="cabai"?"Cabai":"Bawang merah"}</span><span className="tile-action">Buka paspor →</span></Link>)}</div></>}
