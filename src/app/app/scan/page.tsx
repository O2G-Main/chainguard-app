import ScanBatch from "@/components/ScanBatch";import {semuaRingkasan} from "@/lib/store";
export const dynamic="force-dynamic";
export default function Scan(){return <><p className="field-overline">Aksi cepat</p><h1>Scan QR batch</h1><p className="field-intro">Arahkan kamera ke QR pada wadah. Kamu juga bisa memilih batch secara manual.</p><ScanBatch ids={semuaRingkasan().map(r=>r.batch.id)}/></>}
