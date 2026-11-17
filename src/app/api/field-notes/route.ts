import {NextResponse} from "next/server";import {detailBatch} from "@/lib/store";import {semuaCatatan,tambahCatatan} from "@/lib/field-notes";
export const dynamic="force-dynamic";
export function GET(req:Request){const id=new URL(req.url).searchParams.get("batch_id")||undefined;return NextResponse.json({ok:true,catatan:semuaCatatan(id)})}
export async function POST(req:Request){try{const p=await req.json();if(!detailBatch(p.batch_id))throw new Error("Batch tidak dikenal.");return NextResponse.json({ok:true,catatan:tambahCatatan(p)})}catch(e){return NextResponse.json({ok:false,error:e instanceof Error?e.message:"Data tidak valid."},{status:400})}}
