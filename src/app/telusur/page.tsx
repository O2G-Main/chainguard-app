import Link from "next/link";
import { semuaRingkasan } from "@/lib/store";
export const dynamic="force-dynamic";
export default function Telusur(){const semua=semuaRingkasan();return <><p className="eyebrow">Jejak penanganan</p><h1>Telusur batch</h1><p className="lede">Pilih batch untuk melihat perjalanan dan titik munculnya masalah.</p><div className="batch-grid">{semua.map(r=><Link className="batch-tile" href={`/telusur/${r.batch.id}`} key={r.batch.id}><strong>{r.batch.id}</strong><span>{r.batch.komoditas==="cabai"?"Cabai":"Bawang merah"} · {r.pemegangNama}</span><span className="tile-action">Lihat perjalanan →</span></Link>)}</div></>}
