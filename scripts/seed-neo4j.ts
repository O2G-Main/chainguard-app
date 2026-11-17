import {loadEnvConfig} from "@next/env";
import {BATCHES} from "../src/lib/seed";
import {detailBatch} from "../src/lib/store";
import {graphDariDetail} from "../src/lib/context-graph";
import {verifyNeo4j,syncContextGraph} from "../src/lib/neo4j";
async function main(){loadEnvConfig(process.cwd());const driver=await verifyNeo4j();for(const batch of BATCHES){const detail=detailBatch(batch.id);if(!detail)continue;await syncContextGraph(graphDariDetail(detail));console.log(`Sinkron: ${batch.id}`)}await driver.close()}
main().catch(e=>{console.error(e instanceof Error?e.message:e);process.exitCode=1});
