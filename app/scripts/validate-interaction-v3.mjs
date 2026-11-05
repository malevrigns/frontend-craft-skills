#!/usr/bin/env node
import fs from 'node:fs';
const f=process.argv[2];if(!f){console.error('USAGE: node validate-interaction.mjs interaction-spec.json');process.exit(2)}
let d;try{d=JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){console.error(e.message);process.exit(2)}
const errors=[];const str=v=>typeof v==='string'&&v.trim().length>0;
if(d.schemaVersion!=='3.0')errors.push('schemaVersion must be 3.0');if(!str(d.product))errors.push('product missing');if(!Array.isArray(d.platforms)||!d.platforms.length)errors.push('platforms missing');
if(!Array.isArray(d.interactions)||!d.interactions.length)errors.push('interactions missing');
for(const a of d.interactions||[]){for(const f of ['id','componentId','trigger','guard','stateBefore','stateAfter','feedback','failure','recovery','keyboard','touch','a11y','reducedMotion'])if(!str(a[f]))errors.push(`${a.id||'?'}: ${f} missing`);if(!Number.isFinite(a.durationMs)||a.durationMs<0)errors.push(`${a.id}: durationMs invalid`);if(!Array.isArray(a.testCases)||!a.testCases.length)errors.push(`${a.id}: testCases missing`)}
if(process.argv[3]){let visual;try{visual=JSON.parse(fs.readFileSync(process.argv[3],'utf8'))}catch(e){errors.push('cannot read design spec: '+e.message)}if(visual){const ids=new Set((visual.components||[]).map(c=>c.id));for(const a of d.interactions||[])if(!ids.has(a.componentId))errors.push(`unknown componentId from visual design: ${a.componentId}`)}}
console.log(JSON.stringify({file:f,gate:'INTERACTION_SPEC',status:errors.length?'FAIL':'PASS',errors},null,2));process.exit(errors.length?1:0);
