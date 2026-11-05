#!/usr/bin/env node
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';
const f=process.argv[2],designFile=process.argv[3];if(!f){console.error('USAGE: node validate-interaction.mjs interaction-spec.json [design-spec.json]');process.exit(2)}
let d;try{d=JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){console.error('INVALID_JSON '+e.message);process.exit(2)}
if(d.schemaVersion==='3.0'){const r=spawnSync(process.execPath,[path.join(path.dirname(new URL(import.meta.url).pathname),'validate-interaction-v3.mjs'),f,...(designFile?[designFile]:[])],{stdio:'inherit'});process.exit(r.status??2)}
const errors=[], str=v=>typeof v==='string'&&v.trim().length>0, req=(t,s)=>{if(!t)errors.push(s)};
req(d.schemaVersion==='4.0','schemaVersion must be 4.0 (or 3.0 legacy)');req(str(d.product),'product missing');req(Array.isArray(d.platforms)&&d.platforms.length>0,'platforms missing');
const j=d.firstActionJourney||{};for(const key of ['componentId','discover','understand','trigger','feedback','outcome','recovery'])req(str(j[key]),`firstActionJourney.${key} missing`);
req(typeof j.simulation==='boolean','firstActionJourney.simulation must be boolean');
req(Array.isArray(d.interactions)&&d.interactions.length>0,'interactions missing');
const ids=new Set();for(const a of d.interactions||[]){
 for(const k of ['id','componentId','trigger','guard','stateBefore','stateAfter','feedback','failure','recovery','keyboard','touch','a11y','reducedMotion'])req(str(a[k]),`interaction ${a.id||'?'} ${k} missing`);
 req(Number.isFinite(a.durationMs)&&a.durationMs>=0,'interaction duration invalid: '+a.id);req(Array.isArray(a.testCases)&&a.testCases.length>0,`interaction testCases missing: ${a.id}`);
 if(ids.has(a.id))errors.push('duplicate interaction id: '+a.id);ids.add(a.id);
}
req(d.interactions?.some(x=>x.componentId===j.componentId),'firstActionJourney component must have an interaction');
req(Array.isArray(d.timeline),'timeline list missing');for(const t of d.timeline||[]){req(str(t.targetComponentId)&&str(t.trigger)&&str(t.purpose)&&str(t.reducedMotion)&&Number.isFinite(t.startMs)&&t.startMs>=0&&Number.isFinite(t.durationMs)&&t.durationMs>=0,`timeline item incomplete: ${t.targetComponentId||'?'}`)}
if(designFile){let v;try{v=JSON.parse(fs.readFileSync(designFile,'utf8'))}catch(e){errors.push('cannot read visual spec: '+e.message)}if(v){
 const comps=new Set((v.components||[]).map(c=>c.id));for(const a of d.interactions||[])req(comps.has(a.componentId),`interaction unknown component ${a.componentId}`);
 for(const t of d.timeline||[])req(comps.has(t.targetComponentId),`timeline unknown component ${t.targetComponentId}`);
 req(v.firstImpression?.primaryAction?.componentId===j.componentId,'firstActionJourney componentId differs from visual firstImpression primaryAction');
 req(v.firstImpression?.primaryAction?.outcome===j.outcome,'firstActionJourney outcome differs from design firstImpression');
 req(v.product?.name===d.product,'product differs from visual');
}}
console.log(JSON.stringify({file:f,gate:'V4_INTERACTION_SPEC',status:errors.length?'FAIL':'PASS',errors},null,2));process.exit(errors.length?1:0);
