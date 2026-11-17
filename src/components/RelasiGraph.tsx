"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

type Node = { id: string; label: string; kind: "batch" | "pelaku" | "kejadian"; description: string; x: number; y: number };
type Edge = { from: string; to: string; label: string };
type View = { x: number; y: number; zoom: number };
type Drag = { kind: "pan" | "node"; id?: string; clientX: number; clientY: number; x: number; y: number; scale: number };
const WIDTH = 760, HEIGHT = 460;
const kinds = ["batch", "pelaku", "kejadian"] as const;
const names = { batch: "Batch", pelaku: "Pelaku", kejadian: "Kejadian" };

export default function RelasiGraph({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) {
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => Object.fromEntries(nodes.map(n => [n.id, { x: n.x, y: n.y }])));
  const [selected, setSelected] = useState(nodes[0]?.id ?? "");
  const [visible, setVisible] = useState<Record<Node["kind"], boolean>>({ batch: true, pelaku: true, kejadian: true });
  const [view, setView] = useState<View>({ x: 0, y: 0, zoom: 1 });
  const [dragging, setDragging] = useState<Drag["kind"] | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<Drag | null>(null);
  useEffect(() => {
    setPositions(Object.fromEntries(nodes.map(n => [n.id, { x: n.x, y: n.y }])));
    setSelected(nodes[0]?.id ?? "");
    setView({ x: 0, y: 0, zoom: 1 });
  }, [nodes]);

  const shown = nodes.filter(n => visible[n.kind]);
  const shownIds = new Set(shown.map(n => n.id));
  const shownEdges = edges.filter(e => shownIds.has(e.from) && shownIds.has(e.to));
  const chosen = shown.find(n => n.id === selected);
  const neighbors = new Set(edges.filter(e => e.from === selected || e.to === selected).flatMap(e => [e.from, e.to]));
  const byId = new Map(nodes.map(n => [n.id, n]));
  const point = (n: Node) => positions[n.id] ?? n;
  const zoomTo = (target: number) => setView(v => {
    const zoom = Math.max(0.65, Math.min(2.5, target));
    return { x: v.x + (WIDTH / v.zoom - WIDTH / zoom) / 2, y: v.y + (HEIGHT / v.zoom - HEIGHT / zoom) / 2, zoom };
  });
  const startDrag = (event: PointerEvent<SVGElement>, kind: Drag["kind"], node?: Node) => {
    if (event.button !== 0 || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scale = Math.min(rect.width / (WIDTH / view.zoom), rect.height / (HEIGHT / view.zoom));
    const origin = node ? point(node) : view;
    dragRef.current = { kind, id: node?.id, clientX: event.clientX, clientY: event.clientY, x: origin.x, y: origin.y, scale };
    svgRef.current.setPointerCapture(event.pointerId);
    setDragging(kind);
    if (node) setSelected(node.id);
  };
  const moveDrag = (event: PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = (event.clientX - drag.clientX) / drag.scale, dy = (event.clientY - drag.clientY) / drag.scale;
    if (drag.kind === "pan") setView(v => ({ ...v, x: drag.x - dx, y: drag.y - dy }));
    else if (drag.id) setPositions(p => ({ ...p, [drag.id!]: { x: drag.x + dx, y: drag.y + dy } }));
  };
  const focusNode = (id: string) => {
    const node = byId.get(id);
    if (!node) return;
    setVisible(v => ({ ...v, [node.kind]: true }));
    setSelected(id);
    const p = point(node);
    setView(v => ({ ...v, x: p.x - WIDTH / v.zoom / 2, y: p.y - HEIGHT / v.zoom / 2 }));
  };

  return <section className="relation-shell" aria-label="Graf relasi batch">
    <div className="relation-toolbar">
      <div className="relation-filters">{kinds.map(kind => <button type="button" key={kind} aria-pressed={visible[kind]} onClick={() => setVisible(v => ({ ...v, [kind]: !v[kind] }))}><span className={`relation-key key-${kind}`} />{names[kind]} ({nodes.filter(n => n.kind === kind).length})</button>)}</div>
      <span>{shown.length} node · {shownEdges.length} hubungan</span>
    </div>
    <div className="relation-content">
      <div className={`relation-canvas${dragging ? ` is-dragging-${dragging}` : ""}`}>
        <svg ref={svgRef} viewBox={`${view.x} ${view.y} ${WIDTH / view.zoom} ${HEIGHT / view.zoom}`} role="group" aria-label="Graf interaktif hubungan batch, pelaku, dan kejadian" preserveAspectRatio="xMidYMid meet" onWheel={e => { e.preventDefault(); zoomTo(view.zoom * (e.deltaY < 0 ? 1.12 : 1 / 1.12)); }} onPointerMove={moveDrag} onPointerUp={() => { dragRef.current = null; setDragging(null); }} onPointerCancel={() => { dragRef.current = null; setDragging(null); }}>
          <rect x={view.x} y={view.y} width={WIDTH / view.zoom} height={HEIGHT / view.zoom} className="graph-pan-surface" onPointerDown={e => startDrag(e, "pan")} />
          {shownEdges.map((edge, index) => {
            const from = byId.get(edge.from)!, to = byId.get(edge.to)!, a = point(from), b = point(to);
            const active = selected === from.id || selected === to.id;
            return <g key={`${edge.from}-${edge.to}-${index}`} className={chosen && !active ? "graph-muted" : undefined}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={active ? "edge active" : "edge"} />
              {active && <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 9} textAnchor="middle" className="edge-label">{edge.label}</text>}
            </g>;
          })}
          {shown.map(node => {
            const p = point(node), active = selected === node.id;
            return <g key={node.id} role="button" tabIndex={0} aria-label={`${names[node.kind]}: ${node.label}`} aria-pressed={active} onPointerDown={e => startDrag(e, "node", node)} onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(node.id); }
              const delta = ({ ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] } as Record<string, number[]>)[e.key];
              if (delta) { e.preventDefault(); setSelected(node.id); setPositions(current => ({ ...current, [node.id]: { x: p.x + delta[0], y: p.y + delta[1] } })); }
            }} className={`node-button${chosen && !active && !neighbors.has(node.id) ? " graph-muted" : ""}`}>
              <circle cx={p.x} cy={p.y} r={node.kind === "batch" ? 36 : 26} className={`node-circle node-${node.kind}${active ? " selected" : ""}`} />
              <text x={p.x} y={p.y + 5} textAnchor="middle" className="node-glyph">{node.kind === "batch" ? "B" : node.kind === "pelaku" ? "P" : "!"}</text>
              <text x={p.x} y={p.y + 48} textAnchor="middle" className="node-label">{node.label.length > 18 ? `${node.label.slice(0, 16)}…` : node.label}</text>
            </g>;
          })}
        </svg>
        <div className="relation-canvas-hint">Seret node untuk menata · seret ruang kosong untuk menjelajah</div>
        <div className="relation-zoom" aria-label="Kontrol graf">
          <button type="button" aria-label="Perkecil graf" onClick={() => zoomTo(view.zoom / 1.25)}>−</button>
          <span aria-live="polite">{Math.round(view.zoom * 100)}%</span>
          <button type="button" aria-label="Perbesar graf" onClick={() => zoomTo(view.zoom * 1.25)}>+</button>
          <button type="button" aria-label="Atur ulang tampilan graf" onClick={() => { setView({ x: 0, y: 0, zoom: 1 }); setPositions(Object.fromEntries(nodes.map(n => [n.id, { x: n.x, y: n.y }]))); }}>↺</button>
        </div>
      </div>
      <aside className="relation-detail" aria-live="polite">{chosen ? <>
        <p className="eyebrow">{names[chosen.kind]}</p><h2>{chosen.label}</h2><p>{chosen.description}</p>
        <h3>Hubungan <span>({edges.filter(e => e.from === chosen.id || e.to === chosen.id).length})</span></h3>
        <ul>{edges.filter(e => e.from === chosen.id || e.to === chosen.id).map((edge, index) => {
          const other = byId.get(edge.from === chosen.id ? edge.to : edge.from);
          return <li key={`${edge.from}-${edge.to}-${index}`}><button type="button" onClick={() => other && focusNode(other.id)}>{other?.label}</button><small>{edge.label}</small></li>;
        })}</ul>
      </> : <p>Pilih node untuk melihat hubungannya.</p>}</aside>
    </div>
  </section>;
}
