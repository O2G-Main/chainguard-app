import FieldNoteForm from "@/components/FieldNoteForm";import {semuaRingkasan} from "@/lib/store";
export const dynamic="force-dynamic";
export default async function Timbang({searchParams}:{searchParams:Promise<{batch?:string}>}){const {batch}=await searchParams;return <><p className="field-overline">Pencatatan</p><h1>Timbang ulang</h1><p className="field-intro">Catat berat terbaru tanpa membuat serah terima.</p><FieldNoteForm jenis="timbang" ids={semuaRingkasan().map(r=>r.batch.id)} initialBatch={batch}/></>}
