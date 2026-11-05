#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const file=process.argv[2];if(!file){console.error('USAGE: node validate-spec.mjs design-spec.json');process.exit(2)}
let d;try{d=JSON.parse(fs.readFileSync(file,'utf8'))}catch(e){console.error('INVALID_JSON',e.message);process.exit(2)}
if(d.schemaVersion==='3.0'){
 const run=spawnSync(process.execPath,[path.join(path.dirname(new URL(import.meta.url).pathname),'validate-spec-v3.mjs'),file],{stdio:'inherit'});
 process.exit(run.status??2);
}
const errors=[], warnings=[], S=v=>typeof v==='string'&&v.trim().length>0;
const assert=(p,msg)=>{if(!p)errors.push(msg)};
assert(d.schemaVersion==='4.0','schemaVersion must be 4.0 (or legacy 3.0)');
assert(['faithful','explore','improve'].includes(d.mode),'mode invalid');
for(const k of ['name','type','audience','primaryJob'])assert(S(d.product?.[k]),`product.${k} missing`);
assert(Array.isArray(d.product?.platforms)&&d.product.platforms.length>0,'product.platforms missing');
assert(S(d.outputContract?.deliverable)&&S(d.outputContract?.stack),'outputContract deliverable/stack missing');
for(const k of ['thesis','visualSignature','rationale','rejectedPattern'])assert(S(d.creativeDirection?.[k]),`creativeDirection.${k} missing`);
if(d.mode==='explore')assert(Array.isArray(d.creativeDirection?.alternatives)&&d.creativeDirection.alternatives.length>=2,'explore mode requires at least 2 composition alternatives');
const fi=d.firstImpression||{};
assert(['persuade','operate','read','experience'].includes(fi.visitorMode),'firstImpression.visitorMode invalid');
assert(S(fi.attentionGoal),'firstImpression.attentionGoal missing');
for(const k of ['what','why','next'])assert(S(fi.fiveSecondRead?.[k]),`firstImpression.fiveSecondRead.${k} missing`);
assert(S(fi.visualAnchor?.componentId)&&S(fi.visualAnchor?.reason)&&S(fi.visualAnchor?.kind),'visualAnchor incomplete');
assert(fi.attentionBudget?.dominantAnchors===1,'must have exactly 1 dominant anchor');
assert(Number.isInteger(fi.attentionBudget?.secondaryAnchors)&&fi.attentionBudget.secondaryAnchors>=0&&fi.attentionBudget.secondaryAnchors<=2,'secondaryAnchors must be integer 0..2');
for(const k of ['componentId','label','outcome','destination'])assert(S(fi.primaryAction?.[k]),`firstImpression.primaryAction.${k} missing`);
assert(['verified','demo','none-yet'].includes(fi.proof?.status),'firstImpression.proof.status invalid');
assert(S(fi.proof?.type)&&S(fi.proof?.source),'proof type/source missing');
if(fi.proof?.status==='demo')assert(fi.proof?.visibleDemoLabel===true,'demo proof must have visible Demo label');
if(fi.proof?.status==='verified')assert(S(fi.proof?.evidence),'verified proof requires evidence');
assert(S(fi.smallHeightStrategy),'firstImpression.smallHeightStrategy missing');
assert(Array.isArray(fi.aboveFoldByViewport)&&fi.aboveFoldByViewport.some(x=>x.width<=320)&&fi.aboveFoldByViewport.some(x=>x.width===390)&&fi.aboveFoldByViewport.some(x=>x.width>=1440),'firstImpression.aboveFoldByViewport must cover 320,390,1440');
for(const v of fi.aboveFoldByViewport||[])assert(S(v.layout)&&typeof v.anchorVisible==='boolean'&&typeof v.actionDiscoverable==='boolean',`viewport ${v.width} incomplete`);
assert(S(d.typography?.display)&&S(d.typography?.body),'typography display/body missing');
assert(Array.isArray(d.typography?.hierarchy)&&d.typography.hierarchy.length>0,'typography hierarchy missing');
for(const k of ['background','foreground','accent','contrastStrategy'])assert(S(d.palette?.[k]),`palette.${k} missing`);
assert(S(d.layout?.container)&&Array.isArray(d.layout?.breakpoints)&&d.layout.breakpoints.some(x=>x.width<=390)&&d.layout.breakpoints.some(x=>x.width>=1024),'layout container/mobile/desktop missing');
assert(Array.isArray(d.layers)&&d.layers.length>=2,'layers missing');
assert(Array.isArray(d.assets),'assets missing');
for(const a of d.assets||[]){for(const k of ['id','role','fallback','verification','rights'])assert(S(a[k]),`asset ${a.id||'?'} ${k} missing`);if(a.verification!=='verified')warnings.push(`asset ${a.id}: unverified or failed; not a release claim`)}
assert(Array.isArray(d.components)&&d.components.length>0,'components missing');
const ids=new Set();for(const c of d.components||[]){assert(S(c.id)&&S(c.role)&&S(c.spec),'component id/role/spec missing');if(ids.has(c.id))errors.push('duplicate component id: '+c.id);ids.add(c.id)}
assert(ids.has(fi.visualAnchor?.componentId),'first impression anchor component missing from components');
assert(ids.has(fi.primaryAction?.componentId),'primary action component missing from components');
if(fi.visualAnchor?.componentId===fi.primaryAction?.componentId)warnings.push('visual anchor and action are the same element; ensure reading hierarchy is deliberate');
assert(Array.isArray(d.scenes)&&d.scenes.length>0,'scenes missing');
const sceneIds=new Set();for(const s of d.scenes||[]){
 assert(S(s.id)&&S(s.goal)&&S(s.layout)&&S(s.focalComponentId),'scene id/goal/layout/focalComponentId missing');
 assert(Array.isArray(s.componentIds)&&s.componentIds.length>0,'scene componentIds missing: '+s.id);
 assert(ids.has(s.focalComponentId),'scene focalComponentId not in components: '+s.id);
 if(sceneIds.has(s.id))errors.push('duplicate scene id '+s.id);sceneIds.add(s.id);
 for(const id of s.componentIds||[])if(!ids.has(id))errors.push(`scene ${s.id} unknown component ${id}`);
}
const first=d.scenes?.[0];
assert(!!first && first.focalComponentId===fi.visualAnchor?.componentId,'first scene focal component must equal firstImpression.visualAnchor.componentId');
assert(!!first?.componentIds?.includes(fi.primaryAction?.componentId),'primaryAction must belong to first scene');
assert(Array.isArray(d.motion),'motion missing');for(const m of d.motion||[])assert(S(m.id)&&Number.isFinite(m.durationMs)&&S(m.purpose)&&S(m.reducedMotion),'motion invalid '+(m.id||'?'));
assert(Array.isArray(d.constraints)&&d.constraints.length>0,'constraints missing');
assert(Array.isArray(d.sourceTrace)&&d.sourceTrace.length>0,'sourceTrace missing');
assert(Array.isArray(d.qualityPlan?.screenshots)&&[320,390,768,1440].every(w=>d.qualityPlan.screenshots.some(x=>x.width===w)),'qualityPlan screenshots must cover 320,390,768,1440');
assert(S(d.qualityPlan?.fiveSecondEvaluation),'qualityPlan.fiveSecondEvaluation missing');
console.log(JSON.stringify({file,gate:'V4_DESIGN_SPEC',status:errors.length?'FAIL':'PASS',errors,warnings},null,2));process.exit(errors.length?1:0);
