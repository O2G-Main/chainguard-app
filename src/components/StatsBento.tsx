import Link from "next/link";
import { ArrowUpRight, Clock3, PackageCheck, Eye } from "lucide-react";
import { formatDurasi, formatWaktu } from "@/lib/format";
import type { RingkasanBatch } from "@/lib/types";

export default function StatsBento({semua}:{semua:RingkasanBatch[]}) {
  const mendesak=semua.filter(r=>r.status==="mendesak");
  const pantau=semua.filter(r=>r.status==="pantau");
  const aman=semua.filter(r=>r.status==="aman");
  const paparanMaks=Math.max(0,...semua.map(r=>r.totalMenitPaparan));
  const terpapar=semua.find(r=>r.totalMenitPaparan===paparanMaks);
  const dataTerakhir=semua.map(r=>r.sinkronTerakhir).filter((v):v is string=>!!v).sort().at(-1);
  return <section className="stats-bento" aria-label="Ringkasan kondisi batch">
    <Link className="bento-card bento-primary" href={mendesak[0]?`/batch/${mendesak[0].batch.id}`:"/dashboard/batch"}>
      <span className="bento-pattern" aria-hidden="true"/>
      <span className="bento-topline">Prioritas hari ini <ArrowUpRight size={20} aria-hidden="true"/></span>
      <span className="bento-primary-number">{mendesak.length}<small>batch</small></span>
      <span className="bento-primary-title">Perlu ditindak sekarang</span>
      <span className="bento-primary-caption">{mendesak[0]?`${mendesak[0].batch.id} · ${mendesak[0].batch.units.length} ${mendesak[0].batch.units[0]?.jenis === "karung" ? "karung" : "wadah"} · ${mendesak[0].kalimatMasalah||"Lihat tindakan"}`:"Tidak ada batch mendesak saat ini."}</span>
      <span className="bento-primary-footer">Dari {semua.length} pengiriman · {semua.reduce((n,r)=>n+r.batch.units.length,0)} unit <span>Lihat rincian →</span></span>
    </Link>
    <Link className="bento-card bento-exposure" href={terpapar?`/batch/${terpapar.batch.id}`:"/dashboard/batch"}>
      <span className="bento-copy"><span className="bento-label"><Clock3 size={15} aria-hidden="true"/>Paparan terlama</span><strong>{formatDurasi(paparanMaks)}</strong><small>{terpapar&&paparanMaks>0?`Pada ${terpapar.batch.id}, dari data sensor yang tercatat`:"Belum ada paparan di luar batas aman"}</small></span>
      <span className="bento-bars" aria-hidden="true">{semua.map(r=><i key={r.batch.id} style={{height:`${paparanMaks?Math.max(13,Math.round(r.totalMenitPaparan/paparanMaks*100)):13}%`}}/>)}</span>
    </Link>
    <Link className="bento-card bento-safe" href="/dashboard/batch"><PackageCheck size={22} aria-hidden="true"/><strong>{aman.length}</strong><span>Pengiriman aman</span></Link>
    <Link className="bento-card bento-watch" href="/dashboard/prioritas"><span className="bento-watch-icon"><Eye size={22} aria-hidden="true"/></span><span><strong>{pantau.length} perlu dipantau</strong><small>Urutkan untuk dijual lebih dulu</small></span><ArrowUpRight size={17} aria-hidden="true"/></Link>
    <p className="bento-freshness">Data sensor terakhir {dataTerakhir?formatWaktu(dataTerakhir):"belum tersedia"}</p>
  </section>
}
