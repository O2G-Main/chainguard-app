import type { Metadata } from "next";
import PwaRegister from "@/components/PwaRegister";
import SiteChrome from "@/components/SiteChrome";
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
        <SiteChrome />
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
