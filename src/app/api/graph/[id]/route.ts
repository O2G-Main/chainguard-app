import {NextResponse} from "next/server";
import {detailBatch} from "@/lib/store";
import {graphDariDetail} from "@/lib/context-graph";
import {neo4jConfigured,readContextGraph} from "@/lib/neo4j";
export const dynamic="force-dynamic";
export async function GET(_req:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const detail=detailBatch(id);if(!detail)return NextResponse.json({ok:false,error:"Batch tidak dikenal."},{status:404});if(neo4jConfigured())try{const graph=await readContextGraph(id);if(graph)return NextResponse.json({ok:true,source:"neo4j",graph})}catch{}return NextResponse.json({ok:true,source:"local",graph:graphDariDetail(detail)})}
