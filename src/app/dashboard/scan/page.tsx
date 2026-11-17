import ScanBatch from "@/components/ScanBatch";import {semuaRingkasan} from "@/lib/store";
export const dynamic="force-dynamic";
export default function DashboardScan(){return <><p className="eyebrow">Pencarian cepat</p><h1>Scan QR batch</h1><p className="lede">Buka detail batch dari QR pada wadah. Untuk pencatatan lapangan, gunakan PWA.</p><div style={{maxWidth:560,marginTop:24}}><ScanBatch ids={semuaRingkasan().map(r=>r.batch.id)} basePath="/batch"/></div></>}
