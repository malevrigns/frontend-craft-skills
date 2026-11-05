#!/usr/bin/env node
// 用法: node scripts/lint-ui.mjs <文件或目录...> [--max-font-sizes 6] [--json]
// 无依赖的“AI 味”UI 静态检查：紫色渐变、emoji 当图标、字号过多、Inter 默认字体、居中堆叠、塑料阴影、
// 动画 width/height、缺 prefers-reduced-motion、!important 泛滥、纯黑灰 #000 文字等。
import fs from 'node:fs'; import path from 'node:path';
const args = process.argv.slice(2); const json = args.includes('--json');
const mi = args.indexOf('--max-font-sizes'); const maxFs = mi >= 0 ? +args[mi + 1] : 6;
const targets = args.filter((a, i) => !a.startsWith('--') && (mi < 0 || i !== mi + 1));
if (!targets.length) { console.log('用法: node lint-ui.mjs <文件或目录...> [--max-font-sizes N] [--json]'); process.exit(2); }
const files = [];
const walk = p => { const s = fs.statSync(p); if (s.isDirectory()) { if (/node_modules|\.git/.test(p)) return; fs.readdirSync(p).forEach(f => walk(path.join(p, f))); } else if (/\.(html?|css|jsx|tsx|vue|svelte)$/.test(p)) files.push(p); };
targets.forEach(walk);
const hexToHue = h => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (!d) return { hue: -1, sat: 0 }; let hue = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; hue = (hue * 60 + 360) % 360; return { hue, sat: d / (1 - Math.abs(mx + mn - 1) || 1) }; };
const isPurple = c => { const m = c.match(/#[0-9a-f]{3,6}\b/i); if (!m) return /purple|violet|indigo|fuchsia/i.test(c); const { hue, sat } = hexToHue(m[0]); return hue >= 250 && hue <= 320 && sat > .35; };
const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/u;
const rules = [];
const report = (file, rule, level, msg, line) => rules.push({ file, rule, level, msg, line });
let totalFs = new Set();
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8'); const lines = src.split('\n');
  const lineOf = i => src.slice(0, i).split('\n').length;
  for (const m of src.matchAll(/(linear|radial|conic)-gradient\(([^;]*?)\)\s*[;"}]/gi)) if (m[2].split(',').filter(isPurple).length >= 1 && /#[0-9a-f]{3,6}|purple|violet|indigo/i.test(m[2])) report(f, 'purple-gradient', 'warn', '检测到紫/靛蓝渐变：请与品牌规范核对，审美本身不是错误', lineOf(m.index));
  for (const m of src.matchAll(/(from|via|to)-(purple|violet|indigo|fuchsia)-\d{3}/g)) report(f, 'purple-gradient', 'warn', `Tailwind 紫色渐变类 ${m[0]}`, lineOf(m.index));
  lines.forEach((l, i) => { if (/<(button|a|span|i|div|li)[^>]*>\s*[^<]{0,3}/.test(l) && emojiRe.test(l.replace(/<!--.*?-->/g, ''))) report(f, 'emoji-icon', 'warn', 'emoji 当图标：换成 SVG 图标（assets/icons）', i + 1); });
  const fsSet = new Set([...src.matchAll(/font-size:\s*([\d.]+(px|rem|em))/g)].map(m => m[1]));
  for (const m of src.matchAll(/\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/g)) fsSet.add('tw-' + m[1]);
  fsSet.forEach(s => totalFs.add(s));
  if (fsSet.size > maxFs) report(f, 'too-many-font-sizes', 'warn', `出现 ${fsSet.size} 种字号（${[...fsSet].join(' ')}），建议 ≤${maxFs} 级，用 --type-* token`, 1);
  for (const m of src.matchAll(/font-family:\s*['"]?(Inter|Roboto|Arial)\b/gi)) report(f, 'default-font', 'warn', `默认字体 ${m[1]}：缺少个性，考虑 display 字体 + 正文字体搭配`, lineOf(m.index));
  for (const m of src.matchAll(/transition(-property)?:[^;{}]*\b(width|height|top|left)\b[^;{}]*;/g)) report(f, 'layout-animation', 'warn', '过渡了 width/height/top/left，容易掉帧，优先 transform/opacity', lineOf(m.index));
  for (const m of src.matchAll(/box-shadow:\s*0\s+(\d+)px\s+(\d+)px\s+rgba?\([^)]*?(0?\.[3-9]|1)\)/g)) if (+m[2] >= 20) report(f, 'plastic-shadow', 'warn', '大而浓的阴影（塑料感），用分层柔和阴影 --shadow-*', lineOf(m.index));
  const center = (src.match(/text-align:\s*center|text-center/g) || []).length; if (center > 8) report(f, 'center-everything', 'info', `居中出现 ${center} 次，避免所有内容居中堆叠，试试左对齐/非对称`, 1);
  if (/\b(animation|transition)\s*:/.test(src) && /\.css$/.test(f) && !/prefers-reduced-motion/.test(src)) report(f, 'reduced-motion', 'info', '有动画但没有 prefers-reduced-motion 降级', 1);
  const imp = (src.match(/!important/g) || []).length; if (imp > 5) report(f, 'important-abuse', 'info', `!important 出现 ${imp} 次`, 1);
  for (const m of src.matchAll(/backdrop-filter:\s*blur\((\d+)px\)/g)) if (+m[1] > 40) report(f, 'heavy-blur', 'info', `blur(${m[1]}px) 过重，20-28px 足够`, lineOf(m.index));
  for (const m of src.matchAll(/(Lorem ipsum|Welcome to our|Unlock the power|Revolutionize|Seamless(ly)?)/gi)) report(f, 'slop-copy', 'warn', `模板化文案“${m[0]}”`, lineOf(m.index));
}
const counts = { error: 0, warn: 0, info: 0 }; rules.forEach(r => counts[r.level]++);
if (json) console.log(JSON.stringify({ files: files.length, counts, issues: rules }, null, 2));
else {
  const icon = { error: '✖', warn: '▲', info: '·' };
  rules.forEach(r => console.log(`${icon[r.level]} ${r.level.padEnd(5)} ${r.file}:${r.line}  [${r.rule}] ${r.msg}`));
  console.log(`\n检查了 ${files.length} 个文件：${counts.error} 个错误，${counts.warn} 个警告，${counts.info} 条提示。`);
}
process.exit(counts.error ? 1 : 0);
