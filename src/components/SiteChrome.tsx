"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Package, ListOrdered, GitBranch, ArrowRightLeft, FileBadge, Smartphone, Radio, Settings2, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { href: "/dashboard", label: "Ringkasan", Icon: House },
  { href: "/dashboard/batch", label: "Batch", Icon: Package },
  { href: "/dashboard/prioritas", label: "Prioritas Jual", Icon: ListOrdered },
  { href: "/dashboard/telusur", label: "Telusur", Icon: GitBranch },
  { href: "/dashboard/serah-terima", label: "Serah Terima", Icon: ArrowRightLeft },
  { href: "/dashboard/paspor", label: "Paspor", Icon: FileBadge },
  { href: "/dashboard/perangkat", label: "Perangkat", Icon: Radio },
  { href: "/dashboard/pengaturan", label: "Pengaturan", Icon: Settings2 },
];

export default function SiteChrome() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      document.body.style.overflow = "hidden";
    }
    return () => {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.body.style.overflow = "";
    };
  }, [open]);
  if (path.startsWith("/app")) return null;
  return <>
    {open && <button type="button" className="dashboard-nav-backdrop" aria-label="Tutup navigasi" onClick={() => setOpen(false)} />}
    <header className={`site-header dashboard-sidebar${open ? " menu-open" : ""}`}>
      <div className="wrap header-in">
        <button type="button" className="dashboard-menu-toggle" aria-controls="dashboard-nav" aria-expanded={open} aria-label={open ? "Tutup menu dashboard" : "Buka menu dashboard"} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        <Link href="/dashboard" className="brand" onClick={() => setOpen(false)}><Logo /></Link>
        <span className="badge-demo">Data contoh</span>
        <nav id="dashboard-nav" className="nav" aria-label="Navigasi dashboard">
          {links.map(({ href, label, Icon }) => <Link href={href} key={href} aria-current={path === href ? "page" : undefined} onClick={() => setOpen(false)}><Icon size={17} aria-hidden="true" />{label}</Link>)}
          <Link href="/app" className="dashboard-app-link" onClick={() => setOpen(false)}><Smartphone size={17} aria-hidden="true" />Buka PWA lapangan</Link>
        </nav>
      </div>
    </header>
  </>;
}
