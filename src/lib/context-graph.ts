import { formatDurasi } from "./format";
import type { DetailBatch } from "./store";
import { semuaCatatan } from "./field-notes";

export type GraphNode={id:string;label:string;kind:"batch"|"pelaku"|"kejadian";description:string;x:number;y:number};
export type GraphEdge={from:string;to:string;label:string;kind:"MENANGANI"|"SERAH_TERIMA"|"TERJADI_SAAT"|"TERCATAT_PADA"};
export type ContextGraph={batchId:string;nodes:GraphNode[];edges:GraphEdge[]};

export function graphDariDetail(detail:DetailBatch):ContextGraph {
 const r=detail.ringkasan;const batchId=r.batch.id;
 const names=[...new Set([...detail.legs.map(l=>l.dariNama),...detail.legs.map(l=>l.keNama)])];
 const events=detail.legs.filter(l=>l.menitDiLuarJendela>0);
 const notes=semuaCatatan(batchId);
 const nodes:GraphNode[]=[{id:`batch:${batchId}`,label:batchId,kind:"batch",description:`${r.batch.komoditas==="cabai"?"Cabai":"Bawang merah"} · ${r.status}. Berat saat ini ${r.beratSaatIniKg.toLocaleString("id-ID")} kg.`,x:380,y:230},...names.map((name,i)=>({id:`pelaku:${batchId}:${name}`,label:name,kind:"pelaku" as const,description:`Pelaku dalam perjalanan ${batchId}.`,x:120+i*Math.min(210,520/Math.max(names.length-1,1)),y:i%2?105:360})),...events.map((leg,i)=>({id:`kejadian:${batchId}:${i}`,label:leg.masalahUtama==="panas"?"Kepanasan":leg.masalahUtama==="lembap"?"Terlalu lembap":"Di luar batas",kind:"kejadian" as const,description:`${formatDurasi(leg.menitDiLuarJendela)} saat di tangan ${leg.dariNama}. Suhu maksimum ${leg.suhuMaks.toLocaleString("id-ID")}°C.`,x:210+i*170,y:230})),...notes.map((note,i)=>({id:`catatan:${note.id}`,label:note.jenis==="timbang"?"Timbang ulang":"Catat kondisi",kind:"kejadian" as const,description:note.jenis==="timbang"?`Berat ${note.beratKg?.toLocaleString("id-ID")} kg di ${note.lokasi}.`:`${note.kondisi} · ${note.lokasi}`,x:120+i*140,y:45}))];
 const edges:GraphEdge[]=[...names.map(name=>({from:`batch:${batchId}`,to:`pelaku:${batchId}:${name}`,label:"menangani",kind:"MENANGANI" as const})),...detail.legs.filter(l=>l.dariNama!==l.keNama).map(leg=>({from:`pelaku:${batchId}:${leg.dariNama}`,to:`pelaku:${batchId}:${leg.keNama}`,label:"serah terima",kind:"SERAH_TERIMA" as const})),...events.map((leg,i)=>({from:`pelaku:${batchId}:${leg.dariNama}`,to:`kejadian:${batchId}:${i}`,label:"terjadi saat",kind:"TERJADI_SAAT" as const})),...notes.map(note=>({from:`batch:${batchId}`,to:`catatan:${note.id}`,label:"dicatat pada",kind:"TERCATAT_PADA" as const}))];
 return {batchId,nodes,edges};
}
