import {NextResponse} from "next/server";import {detailBatch} from "@/lib/store";import {semuaCatatan,tambahCatatan} from "@/lib/field-notes";
import {syncBatchGraph} from "@/lib/neo4j";
export const dynamic="force-dynamic";
export function GET(req:Request){const id=new URL(req.url).searchParams.get("batch_id")||undefined;return NextResponse.json({ok:true,catatan:semuaCatatan(id)})}
export async function POST(req:Request){try{const p=await req.json();if(!detailBatch(p.batch_id))throw new Error("Batch tidak dikenal.");const catatan=tambahCatatan(p);const graph=await syncBatchGraph(p.batch_id);return NextResponse.json({ok:true,catatan,graph_synced:graph.synced})}catch(e){return NextResponse.json({ok:false,error:e instanceof Error?e.message:"Data tidak valid."},{status:400})}}
