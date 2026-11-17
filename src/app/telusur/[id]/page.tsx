import Link from "next/link";
import { notFound } from "next/navigation";
import { detailBatch } from "@/lib/store";
import { formatDurasi, formatWaktu } from "@/lib/format";
import RelasiGraph from "@/components/RelasiGraph";
import { graphDariDetail } from "@/lib/context-graph";
import { readContextGraph, neo4jConfigured } from "@/lib/neo4j";
export const dynamic="force-dynamic";
export default async function TelusurBatch({params}:{params:Promise<{id:string}>}) {
 const {id}=await params;const d=detailBatch(id);if(!d)notFound();const worst=[...d.legs].sort((a,b)=>b.menitDiLuarJendela-a.menitDiLuarJendela)[0];
 const localGraph=graphDariDetail(d);
 let graph=localGraph;let source="Graph lokal";let graphError=false;
 if(neo4jConfigured()){try{const stored=await readContextGraph(id);if(stored){graph=stored;source="Neo4j"}else graphError=true}catch{graphError=true}}
 return <><Link className="back-link" href="/telusur">← Semua batch</Link><p className="eyebrow">Jejak penanganan · {id}</p><h1>Graf relasi {id}</h1><p className="lede">Hubungan batch, pelaku, dan kejadian. Pilih node untuk melihat konteksnya.</p><p className="graph-source">Sumber: {source}{graphError&&" · Neo4j belum siap atau belum berisi batch ini"}</p><RelasiGraph key={id} nodes={graph.nodes} edges={graph.edges}/>{worst&&worst.menitDiLuarJendela>0&&<section className="insight-card"><p className="eyebrow">Akar masalah teratas</p><h2>{worst.masalahUtama==="panas"?"Suhu terlalu tinggi":worst.masalahUtama==="lembap"?"Kelembapan terlalu tinggi":"Kondisi di luar batas aman"}</h2><p>Terjadi saat di tangan {worst.dariNama}, selama {formatDurasi(worst.menitDiLuarJendela)}. Suhu tertinggi {worst.suhuMaks.toLocaleString("id-ID")}°C.</p></section>}<h2>Urutan perjalanan</h2><ol className="graph-flow">{d.legs.map((leg,i)=><li key={i} className={leg.menitDiLuarJendela>0?"graph-problem":""}><span className="graph-step">{i+1}</span><div><strong>{leg.dariNama}</strong><p>{leg.dariNama===leg.keNama?"Pemegang saat ini":`Diserahkan ke ${leg.keNama}`}</p><small>{formatWaktu(leg.mulai)}–{formatWaktu(leg.selesai)}</small><p>{leg.menitDiLuarJendela>0?`Di luar batas aman ${formatDurasi(leg.menitDiLuarJendela)}`:"Kondisi aman"}</p></div></li>)}</ol><Link className="detail-link" href={`/batch/${id}`}>Lihat data sensor →</Link></>
}
