#!/usr/bin/env node
// Joint visual/behavior contract gate. Does NOT score aesthetics or user conversion.
import fs from 'node:fs';
const [designFile,interactionFile]=process.argv.slice(2);
if(!designFile||!interactionFile){console.error('USAGE: node validate-first-impression.mjs design-spec.json interaction-spec.json');process.exit(2)}
let d,i;try{d=JSON.parse(fs.readFileSync(designFile,'utf8'));i=JSON.parse(fs.readFileSync(interactionFile,'utf8'))}catch(e){console.error('INVALID_JSON '+e.message);process.exit(2)}
const errors=[],warning=[],need=(p,msg)=>{if(!p)errors.push(msg)};
need(d.schemaVersion==='4.0'&&i.schemaVersion==='4.0','both documents must use v4.0');
const f=d.firstImpression||{},first=d.scenes?.[0];
need(f.visualAnchor?.componentId===first?.focalComponentId,'first scene does not own visual anchor');
need(first?.componentIds?.includes(f.primaryAction?.componentId),'first scene missing primary CTA');
need(f.primaryAction?.componentId===i.firstActionJourney?.componentId,'visual/behavior primary CTA mismatch');
need(f.primaryAction?.outcome===i.firstActionJourney?.outcome,'visual/behavior CTA outcome mismatch');
need(i.interactions?.some(a=>a.componentId===f.primaryAction?.componentId),'no primary CTA event state contract');
if(['#','javascript:void(0)','none','placeholder'].includes(f.primaryAction?.destination?.trim().toLowerCase()))errors.push('primaryAction destination is placeholder');
need([320,390,768,1440].every(w=>d.qualityPlan?.screenshots?.some(v=>v.width===w)),'missing screenshot plan');
need((f.aboveFoldByViewport||[]).filter(x=>x.width<=390).every(x=>x.anchorVisible&&x.actionDiscoverable),'small viewport hides anchor or primary action; explain layout instead');
if(f.proof?.status==='none-yet')warning.push('no proof: avoid claiming validation or inventing social metrics');
if(f.proof?.status==='demo'&&!f.proof.visibleDemoLabel)errors.push('demo requires visible label');
if(i.firstActionJourney?.simulation)warning.push('first action simulated: UI must visibly label demo, not pretend production success');
console.log(JSON.stringify({gate:'FIRST_IMPRESSION_CONSISTENCY',status:errors.length?'FAIL':'PASS',errors,warning,disclaimer:'This gate does not verify appearance, 5-second user comprehension, or conversion.'},null,2));process.exit(errors.length?1:0);
