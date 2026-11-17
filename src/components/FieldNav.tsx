"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Package, ScanLine, Clock3, UserRound } from "lucide-react";
const items=[{href:"/app",label:"Beranda",Icon:House},{href:"/app/batch",label:"Batch Saya",Icon:Package},{href:"/app/scan",label:"Scan QR",Icon:ScanLine},{href:"/app/aktivitas",label:"Aktivitas",Icon:Clock3},{href:"/app/akun",label:"Akun",Icon:UserRound}];
export default function FieldNav(){const path=usePathname();return <nav className="field-nav" aria-label="Navigasi PWA"><span className="field-nav-glass" aria-hidden="true"/>{items.map(({href,label,Icon})=>{const active=href==="/app"?path===href:path.startsWith(href);return <Link key={href} href={href} aria-current={active?"page":undefined} className={active?"field-nav-item active":"field-nav-item"}><Icon size={20} strokeWidth={active?2.4:1.9} aria-hidden="true"/><span>{label}</span></Link>})}</nav>}
