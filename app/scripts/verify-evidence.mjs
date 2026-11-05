#!/usr/bin/env node
import fs from 'node:fs';import path from 'node:path';
const fn=process.argv[2];if(!fn){console.error('USAGE: node verify-evidence.mjs qa-evidence.json');process.exit(2)}
let d;try{d=JSON.parse(fs.readFileSync(fn,'utf8'))}catch(e){console.error(e.message);process.exit(2)}
const errors=[];const must=(v,m)=>{if(!v)errors.push(m)};const root=path.dirname(path.resolve(fn));
const stages=['SPEC_READY','CODE_READY','BROWSER_VERIFIED','PRODUCTION_READY'];must(stages.includes(d.claimedStatus),'claimedStatus invalid');must(!!d.implementation?.stack,'implementation.stack missing');must(!!d.implementation?.target,'implementation.target missing');
if(stages.indexOf(d.claimedStatus)>=2){
 must(d.browserVerified===true,'browserVerified must be true');
 for(const w of [320,390,768,1440]){
  const s=(d.screenshots||[]).find(x=>x.width===w);
  must(!!s,`missing viewport ${w}`);
  if(s)must(fs.existsSync(path.resolve(root,s.file)),`screenshot not found ${s.file}`);
 }
 must(Array.isArray(d.testResults)&&d.testResults.some(t=>t.status==='passed'),'missing actual passing tests');
 must(Array.isArray(d.review)&&d.review.length>=3,'visual review observations missing');
 const reviewed=new Set((d.review||[]).map(r=>r.dimension));
 for(const x of ['composition','hierarchy','responsiveness'])must(reviewed.has(x),`missing human review ${x}`);
 for(const r of d.review||[])must(Number.isInteger(r.score)&&r.score>=1&&r.score<=5&&typeof r.observation==='string'&&r.observation.length>12,`invalid rating or observation: ${r.dimension}`);
}
if(d.claimedStatus==='PRODUCTION_READY'){
 must(!d.blockers?.length,'unresolved blockers');must(d.review?.every(r=>r.score>=4),'visual ratings below threshold');must(d.nativeVerified!==false||!d.implementation?.target?.includes('native'),'native verification missing');must(d.implementation?.target==='React/Tailwind production'||d.productionChecksComplete===true,'productionChecksComplete missing');
}
console.log(JSON.stringify({file:fn,gate:'EVIDENCE',claim:d.claimedStatus,status:errors.length?'FAIL':'PASS',errors},null,2));process.exit(errors.length?1:0);
