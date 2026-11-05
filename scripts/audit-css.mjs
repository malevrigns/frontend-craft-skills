#!/usr/bin/env node
// Basic static signals only; cannot decide whether screenshot looks premium.
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';
const target=resolve(process.argv[2]||'styles');
function files(p){return statSync(p).isDirectory()?readdirSync(p).flatMap(f=>files(join(p,f))):p.endsWith('.css')?[p]:[]}
const found=files(target); if(!found.length){console.error('FAIL: no CSS files');process.exit(1)}
const merged=found.map(f=>readFileSync(f,'utf8')).join('\n');
const checks={
 'semantic color tokens':/--(?:canvas|surface|ink)\s*:/.test(merged),
 'focus-visible treatment':/:focus-visible/.test(merged),
 'reduced-motion treatment':/prefers-reduced-motion/.test(merged),
 'fallback for glass':/@supports\s+not/.test(merged),
 'numeric alignment':/tabular-nums/.test(merged),
 'sensible motion tokens':/--duration-quick/.test(merged)
};
let fail=0;for(const [name,ok] of Object.entries(checks)){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)fail++}
console.log(`Static CSS checks: ${Object.keys(checks).length-fail}/${Object.keys(checks).length}. NOT a visual review.`);
if(fail)process.exit(1);
