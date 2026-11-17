import neo4j, {type Driver} from "neo4j-driver";
import type {ContextGraph,GraphNode,GraphEdge} from "./context-graph";
import {graphDariDetail} from "./context-graph";
import {detailBatch} from "./store";

const globalNeo4j=globalThis as unknown as {__cgNeo4j?:Driver};
let schemaReady:Promise<unknown>|undefined;
export function neo4jConfigured(){return !!(process.env.NEO4J_URI&&process.env.NEO4J_USER&&process.env.NEO4J_PASSWORD)}
export function getNeo4jDriver():Driver|null {
 const {NEO4J_URI:uri,NEO4J_USER:user,NEO4J_PASSWORD:password}=process.env;
 if(!uri&&!user&&!password)return null;
 if(!uri||!user||!password)throw new Error("NEO4J_URI, NEO4J_USER, dan NEO4J_PASSWORD harus diisi bersama.");
 return globalNeo4j.__cgNeo4j??(globalNeo4j.__cgNeo4j=neo4j.driver(uri,neo4j.auth.basic(user,password),{maxConnectionPoolSize:10,connectionAcquisitionTimeout:5000}));
}
function db(){return process.env.NEO4J_DATABASE||"neo4j"}
export async function verifyNeo4j(){const driver=getNeo4jDriver();if(!driver)throw new Error("Koneksi Neo4j belum dikonfigurasi.");await driver.verifyConnectivity({database:db()});return driver}
export async function syncContextGraph(graph:ContextGraph):Promise<boolean>{
 const driver=getNeo4jDriver();if(!driver)return false;
 try{await (schemaReady??=driver.executeQuery("CREATE CONSTRAINT cg_context_node_id IF NOT EXISTS FOR (n:ContextNode) REQUIRE n.id IS UNIQUE",{},{database:db()}))}
 catch(error){schemaReady=undefined;throw error}
 const session=driver.session({database:db()});
 try{await session.executeWrite(async tx=>{
  await tx.run(`UNWIND $nodes AS item MERGE (n:ContextNode {id:item.id}) SET n.batchId=item.batchId,n.kind=item.kind,n.label=item.label,n.description=item.description,n.x=item.x,n.y=item.y`,{nodes:graph.nodes.map(n=>({...n,batchId:graph.batchId}))});
  await tx.run("MATCH ()-[r:CONTEXT_REL {batchId:$batchId}]->() DELETE r",{batchId:graph.batchId});
  await tx.run(`UNWIND $edges AS item MATCH (a:ContextNode {id:item.from}),(b:ContextNode {id:item.to}) CREATE (a)-[:CONTEXT_REL {batchId:$batchId,kind:item.kind,label:item.label}]->(b)`,{edges:graph.edges,batchId:graph.batchId});
 });return true}finally{await session.close()}
}
export async function readContextGraph(batchId:string):Promise<ContextGraph|null>{
 const driver=getNeo4jDriver();if(!driver)return null;
 const result=await driver.executeQuery(`MATCH (n:ContextNode {batchId:$batchId}) OPTIONAL MATCH (n)-[r:CONTEXT_REL {batchId:$batchId}]->(m:ContextNode) RETURN collect(DISTINCT n) AS nodes,collect(DISTINCT {from:n.id,to:m.id,label:r.label,kind:r.kind}) AS edges`,{batchId},{database:db(),routing:neo4j.routing.READ});
 if(!result.records.length)return null;
 const nodes=result.records[0].get("nodes") as {properties:GraphNode}[];
 if(!nodes.length)return null;
 const edges=result.records[0].get("edges") as (GraphEdge|null)[];
 const numeric=(value:unknown)=>neo4j.isInt(value)?value.toNumber():Number(value);
 return {batchId,nodes:nodes.map(n=>({id:n.properties.id,label:n.properties.label,kind:n.properties.kind,description:n.properties.description,x:numeric(n.properties.x),y:numeric(n.properties.y)})),edges:edges.filter((e):e is GraphEdge=>!!e&&!!e.to)};
}

export async function syncBatchGraph(batchId:string):Promise<{synced:boolean;error?:string}>{
  const detail=detailBatch(batchId);
  if(!detail)return {synced:false,error:"Batch tidak dikenal."};
  try{return {synced:await syncContextGraph(graphDariDetail(detail))}}
  catch(error){const message=error instanceof Error?error.message:"Gagal menyinkronkan graph.";console.error("Neo4j sync failed:",message);return {synced:false,error:message}}
}
