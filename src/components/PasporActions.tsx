"use client";
import { useEffect,useState } from "react";
import { QRCodeSVG } from "qrcode.react";
export default function PasporActions({id}:{id:string}){const [url,setUrl]=useState("");useEffect(()=>setUrl(`${location.origin}/paspor/${encodeURIComponent(id)}`),[id]);return <div className="passport-actions"><div className="passport-qr">{url&&<QRCodeSVG value={url} size={144} level="M" includeMargin/>}<span>Scan untuk membuka paspor</span></div><button type="button" className="primary-button no-print" onClick={()=>window.print()}>Unduh / cetak PDF</button></div>}
