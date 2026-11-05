#!/usr/bin/env node
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import {spawnSync} from 'node:child_process';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const sample=path.join(root,'examples/attention-contract');
const design=JSON.parse(fs.readFileSync(path.join(sample,'design-spec.json'),'utf8'));
const interaction=JSON.parse(fs.readFileSync(path.join(sample,'interaction-spec.json'),'utf8'));
const work=fs.mkdtempSync(path.join(os.tmpdir(),'frontend-craft-v4-'));
let pass=0,total=0;const cp=v=>JSON.parse(JSON.stringify(v));
function write(d,i){fs.writeFileSync(path.join(work,'design.json'),JSON.stringify(d));fs.writeFileSync(path.join(work,'interaction.json'),JSON.stringify(i));}
function run(label,file,args,expected){total++;const r=spawnSync(process.execPath,[file,...args],{cwd:root,encoding:'utf8'});if((r.status===0)!==expected){console.error('FAIL',label,'exit',r.status,'expected pass',expected,(r.stdout+r.stderr).slice(0,1000));process.exitCode=1}else{console.log('PASS',label);pass++}}
const dv='ai-ui/scripts/validate-spec.mjs',iv='app/scripts/validate-interaction.mjs',jv='ai-ui/scripts/validate-first-impression.mjs';
try{
write(design,interaction);run('valid design',dv,[path.join(work,'design.json')],true);run('valid interaction',iv,[path.join(work,'interaction.json'),path.join(work,'design.json')],true);run('valid joint first impression',jv,[path.join(work,'design.json'),path.join(work,'interaction.json')],true);
let d=cp(design);d.firstImpression.visualAnchor.componentId='not-a-component';write(d,interaction);run('reject missing visual anchor',dv,[path.join(work,'design.json')],false);
d=cp(design);d.firstImpression.attentionBudget.dominantAnchors=3;write(d,interaction);run('reject competing dominant anchors',dv,[path.join(work,'design.json')],false);
d=cp(design);d.firstImpression.proof.visibleDemoLabel=false;write(d,interaction);run('reject unlabelled demo proof',dv,[path.join(work,'design.json')],false);
d=cp(design);d.firstImpression.primaryAction.destination='#';write(d,interaction);run('reject fake CTA destination in joint gate',jv,[path.join(work,'design.json'),path.join(work,'interaction.json')],false);
d=cp(design);d.scenes[0].focalComponentId='hero-title';write(d,interaction);run('reject scene/anchor inconsistency',dv,[path.join(work,'design.json')],false);
d=cp(design);d.firstImpression.aboveFoldByViewport=d.firstImpression.aboveFoldByViewport.filter(x=>x.width!==320);write(d,interaction);run('reject missing 320 viewport',dv,[path.join(work,'design.json')],false);
d=cp(design);d.firstImpression.aboveFoldByViewport[0].actionDiscoverable=false;write(d,interaction);run('reject hidden mobile action',jv,[path.join(work,'design.json'),path.join(work,'interaction.json')],false);
let i=cp(interaction);i.firstActionJourney.outcome='simulated-payment-processed';write(design,i);run('reject mismatched CTA outcome',iv,[path.join(work,'interaction.json'),path.join(work,'design.json')],false);
i=cp(interaction);i.interactions[0].componentId='not-exists';write(design,i);run('reject unknown interaction component',iv,[path.join(work,'interaction.json'),path.join(work,'design.json')],false);
console.log(`${pass}/${total} tests passed`);if(pass!==total)process.exitCode=1;
}finally{fs.rmSync(work,{recursive:true,force:true})}
