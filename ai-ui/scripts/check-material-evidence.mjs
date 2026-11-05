#!/usr/bin/env node
// Checks that the screenshot review evidence is real and complete.
// It does NOT certify subjective aesthetics and cannot replace screenshot inspection.
import fs from 'node:fs';
import path from 'node:path';
const filename=process.argv[2];
if(!filename){console.error('Usage: node check-material-evidence.mjs path/to/material-evidence.json');process.exit(2)}
const f=path.resolve(filename),base=path.dirname(f),errs=[];
let e;try{e=JSON.parse(fs.readFileSync(f,'utf8'))}catch(err){console.error('Unable to read JSON:',err.message);process.exit(2)}
function insist(cond,msg){if(!cond)errs.push(msg)}
insist(typeof e.goal==='string'&&e.goal.length>=10,'Missing design goal');
insist(['WEB','EXPO','DESKTOP_WEBVIEW','NATIVE_DESKTOP'].includes(e.platform),'Missing/unknown platform');
for(const k of ['L0_environment','L1_content','L2_chrome','L3_transient'])insist(typeof e.materialLayers?.[k]==='string'&&e.materialLayers[k].length>15,'Missing material layer '+k);
for(const w of ['320','390','768','1024','1440']){const p=e.screenshots?.[w];insist(typeof p==='string'&&fs.existsSync(path.resolve(base,p)),`Missing screenshot ${w}`)}
insist(typeof e.screenshots?.dark==='string'&&fs.existsSync(path.resolve(base,e.screenshots.dark)),'Missing dark screenshot');
insist(Array.isArray(e.reviewIssues)&&e.reviewIssues.length>=3,'Need 3 evidence-linked manual review issues');
insist((e.reviewIssues||[]).filter(x=>x.status==='fixed').length>=2,'Need at least two fixed visual review issues');
insist(Array.isArray(e.behaviorChecks)&&e.behaviorChecks.length>=5,'Need behavior test cases');
insist(typeof e.browser==='string'&&e.browser.length>4,'Missing browser context');
insist(e.noJavascriptErrors===true,'Browser errors or missing result');
insist(e.aestheticApproval!=='AUTO_APPROVED','Cannot auto certify aesthetics');
insist(typeof e.limitations==='string'&&e.limitations.length>15,'Missing honest limitations');
if(errs.length){console.error('EVIDENCE INCOMPLETE\n'+errs.map(x=>' - '+x).join('\n'));process.exit(1)}
console.log('EVIDENCE COMPLETE (structure and file paths only). Aesthetic review remains human judgment.');
