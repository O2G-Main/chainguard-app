"use client";
import { useState } from "react";

type Node = { id:string; label:string; kind:"batch"|"pelaku"|"kejadian"; description:string; x:number; y:number };
type Edge = { from:string; to:string; label:string };
export default function RelasiGraph({nodes,edges}:{nodes:Node[];edges:Edge[]}) {
  const [selected,setSelected]=useState(nodes[0]?.id||"");
  const [visible,setVisible]=useState<Record<Node["kind"],boolean>>({batch:true,pelaku:true,kejadian:true});
  const chosen=nodes.find(n=>n.id===selected);
  const shown=nodes.filter(n=>visible[n.kind]);
  const showEdge=(e:Edge)=>shown.some(n=>n.id===e.from)&&shown.some(n=>n.id===e.to);
  return <section className="relation-shell" aria-label="Graf relasi batch">
    <div className="relation-toolbar"><div className="relation-filters">{(["batch","pelaku","kejadian"] as const).map(kind=><button type="button" key={kind} aria-pressed={visible[kind]} onClick={()=>setVisible(v=>({...v,[kind]:!v[kind]}))}><span className={`relation-key key-${kind}`}/>{kind==="batch"?"Batch":kind==="pelaku"?"Pelaku":"Kejadian"} ({nodes.filter(n=>n.kind===kind).length})</button>)}</div><span>{nodes.length} node · {edges.length} hubungan</span></div>
    <div className="relation-content"><div className="relation-canvas"><svg viewBox="0 0 760 460" role="img" aria-label="Hubungan batch, pelaku, dan kejadian sensor" preserveAspectRatio="xMidYMid meet">{edges.filter(showEdge).map((e,i)=>{const a=nodes.find(n=>n.id===e.from)!;const b=nodes.find(n=>n.id===e.to)!;const active=selected===a.id||selected===b.id;return <g key={i}><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={active?"edge active":"edge"}/>{active&&<text x={(a.x+b.x)/2} y={(a.y+b.y)/2-7} textAnchor="middle" className="edge-label">{e.label}</text>}</g>})}{shown.map(n=><g key={n.id} role="button" tabIndex={0} aria-label={`${n.kind}: ${n.label}`} aria-pressed={selected===n.id} onClick={()=>setSelected(n.id)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelected(n.id)}}} className="node-button"><circle cx={n.x} cy={n.y} r={n.kind==="batch"?36:26} className={`node-circle node-${n.kind}${selected===n.id?" selected":""}`}/><text x={n.x} y={n.y+4} textAnchor="middle" className="node-glyph">{n.kind==="batch"?"B":n.kind==="pelaku"?"P":"!"}</text><text x={n.x} y={n.y+48} textAnchor="middle" className="node-label">{n.label.length>18?n.label.slice(0,16)+"…":n.label}</text></g>)}</svg></div><aside className="relation-detail" aria-live="polite">{chosen?<><p className="eyebrow">{chosen.kind}</p><h2>{chosen.label}</h2><p>{chosen.description}</p><h3>Hubungan</h3><ul>{edges.filter(e=>e.from===chosen.id||e.to===chosen.id).map((e,i)=>{const other=nodes.find(n=>n.id===(e.from===chosen.id?e.to:e.from));return <li key={i}><button type="button" onClick={()=>other&&setSelected(other.id)}>{other?.label}</button><small>{e.label}</small></li>})}</ul></>:<p>Pilih node untuk melihat hubungannya.</p>}</aside></div>
  </section>
}
