#!/usr/bin/env node
// 用法: node scripts/build-tokens.mjs [assets/tokens.json] [assets/tokens.css]
// 从 tokens.json 生成 CSS 变量文件（--color-accent、--radius-md、--ease-spring ...）
import fs from 'node:fs';
const [src = new URL('../assets/tokens.json', import.meta.url).pathname,
       out = new URL('../assets/tokens.css', import.meta.url).pathname] = process.argv.slice(2);
const t = JSON.parse(fs.readFileSync(src, 'utf8'));
const lines = ['/* 由 scripts/build-tokens.mjs 自动生成，修改请改 tokens.json */', ':root {'];
for (const [group, vals] of Object.entries(t)) for (const [k, v] of Object.entries(vals)) lines.push(`  --${group}-${k}: ${v};`);
lines.push('}', '', '[data-theme="dark"] {',
  '  --color-bg: var(--color-dark-bg);', '  --color-surface: var(--color-dark-surface);', '  --color-surface-2: #1F2227;',
  '  --color-ink: var(--color-dark-ink);', '  --color-ink-2: #B9B9B4;', '  --color-ink-3: #7C7C78;', '  --color-line: #2A2D33;', '}', '',
  '@media (prefers-reduced-motion: reduce) {', '  *, *::before, *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; }', '}', '');
fs.writeFileSync(out, lines.join('\n'));
console.log(`tokens.css 已生成: ${out}（${lines.length} 行）`);
