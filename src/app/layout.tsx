import type { Metadata } from "next";
import Link from "next/link";
import { House, ListOrdered, ScanLine, GitBranch, FileBadge } from "lucide-react";
import Logo from "@/components/Logo";
import PwaRegister from "@/components/PwaRegister";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChainGuard",
  description: "Pantau kondisi cabai dan bawang merah dari panen sampai pasar.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "ChainGuard" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <header className="site-header">
          <div className="wrap header-in">
            <Link href="/" className="brand">
              <Logo />
            </Link>
            <span className="badge-demo">Data contoh</span>
            <nav className="nav" aria-label="Navigasi utama">
              <Link href="/">
                <House size={15} strokeWidth={2.1} aria-hidden="true" />
                Beranda
              </Link>
              <Link href="/prioritas">
                <ListOrdered size={15} strokeWidth={2.1} aria-hidden="true" />
                Urutan Jual
              </Link>
              <Link href="/serah-terima"><ScanLine size={15} aria-hidden="true" />Serah Terima</Link>
              <Link href="/telusur"><GitBranch size={15} aria-hidden="true" />Telusur</Link>
              <Link href="/paspor"><FileBadge size={15} aria-hidden="true" />Paspor</Link>
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <PwaRegister />
        <footer className="site-footer">
          <div className="wrap">
            <p>
              Halaman ini menampilkan data contoh untuk pengujian perangkat lunak, bukan data
              lapangan. Batas aman dan ambang peringatan adalah parameter contoh yang akan dikunci
              dari literatur dan kesepakatan pelaku sebelum uji lapangan.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
