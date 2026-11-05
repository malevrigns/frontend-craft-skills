#!/usr/bin/env node
import fs from 'node:fs';
const path=process.argv[2];
if(!path){ console.error('USAGE: node validate-spec.mjs design-spec.json');process.exit(2); }
let d;try{d=JSON.parse(fs.readFileSync(path,'utf8'))}catch(e){console.error('INVALID_JSON',e.message);process.exit(2)}
const errors=[], warnings=[];
const str=(v)=>typeof v==='string'&&v.trim().length>0;
const req=(test,label)=>{if(!test)errors.push(label)};
req(d.schemaVersion==='3.0','schemaVersion must be 3.0');
req(['faithful','explore','improve'].includes(d.mode),'mode invalid');
for(const key of ['name','type','audience','primaryJob'])req(str(d.product?.[key]),`product.${key} missing`);
req(Array.isArray(d.product?.platforms)&&d.product.platforms.length>0,'product.platforms missing');
for(const key of ['thesis','focalPoint','firstAction','rationale','rejectedPattern'])req(str(d.designDecision?.[key]),`designDecision.${key} missing`);
for(const key of ['display','body','loading'])req(str(d.typography?.[key]),`typography.${key} missing`);
req(Array.isArray(d.typography?.hierarchy)&&d.typography.hierarchy.length>0,'typography.hierarchy missing');
for(const key of ['background','foreground','accent','contrastStrategy'])req(str(d.palette?.[key]),`palette.${key} missing`);
req(str(d.layout?.container),'layout.container missing');
req(Array.isArray(d.layout?.breakpoints)&&d.layout.breakpoints.some(b=>b.width<=390)&&d.layout.breakpoints.some(b=>b.width>=1024),'layout: mobile + desktop breakpoints required');
req(typeof d.layout?.primaryVisibleInFirstViewport==='boolean','layout.primaryVisibleInFirstViewport missing');
if(d.layout?.primaryVisibleInFirstViewport===false)warnings.push('primary action below fold: justify in review');
req(Array.isArray(d.layers)&&d.layers.length>=2,'layers missing');
const layerIds=new Set();for(const l of d.layers||[]){req(str(l.id)&&Number.isFinite(l.z)&&str(l.role),'layer invalid');if(layerIds.has(l.id))errors.push('duplicate layer id '+l.id);layerIds.add(l.id)}
req(Array.isArray(d.assets),'assets missing');for(const a of d.assets||[]){for(const k of ['id','role','fallback','verification','rights'])req(str(a[k]),`asset ${a.id||'?'} ${k} missing`);if(a.url && !/^https?:|^\.\//.test(a.url))errors.push('asset URL invalid '+a.id);if(a.verification!=='verified')warnings.push(`asset ${a.id}: ${a.verification} (cannot claim loaded)`)}
req(Array.isArray(d.components)&&d.components.length>0,'components missing');const compIds=new Set();for(const c of d.components||[]){req(str(c.id)&&str(c.role)&&str(c.spec),'component invalid');if(compIds.has(c.id))errors.push('duplicate component id '+c.id);compIds.add(c.id)}
req(Array.isArray(d.motion),'motion list missing');for(const m of d.motion||[]){req(str(m.id)&&Number.isFinite(m.durationMs)&&str(m.easing)&&str(m.purpose)&&str(m.reducedMotion),`motion ${m.id||'?'} incomplete`)}
req(Array.isArray(d.constraints)&&d.constraints.length>0,'constraints missing');req(Array.isArray(d.sourceTrace)&&d.sourceTrace.length>0,'sourceTrace missing');
console.log(JSON.stringify({file:path,gate:'DESIGN_SPEC',status:errors.length?'FAIL':'PASS',errors,warnings},null,2));process.exit(errors.length?1:0);
