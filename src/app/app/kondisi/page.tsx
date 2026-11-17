import FieldNoteForm from "@/components/FieldNoteForm";import {semuaRingkasan} from "@/lib/store";
export const dynamic="force-dynamic";
export default async function Kondisi({searchParams}:{searchParams:Promise<{batch?:string}>}){const {batch}=await searchParams;return <><p className="field-overline">Pencatatan</p><h1>Catat kondisi</h1><p className="field-intro">Tuliskan kondisi barang dan kemasan saat diperiksa.</p><FieldNoteForm jenis="kondisi" ids={semuaRingkasan().map(r=>r.batch.id)} initialBatch={batch}/></>}
