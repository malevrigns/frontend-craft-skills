#!/usr/bin/env node
// 用法: node scripts/tokens-to-tailwind.mjs [assets/tokens.json] [tailwind.tokens.cjs]
// 把 tokens.json 转成 Tailwind theme.extend 配置（无依赖）。在 tailwind.config 里: presets: [require('./tailwind.tokens.cjs')]
import fs from 'node:fs';
const [src = new URL('../assets/tokens.json', import.meta.url).pathname, out = 'tailwind.tokens.cjs'] = process.argv.slice(2);
const t = JSON.parse(fs.readFileSync(src, 'utf8'));
const v = (g) => Object.fromEntries(Object.keys(t[g] || {}).map(k => [k, `var(--${g}-${k}, ${t[g][k]})`]));
const extend = {
  colors: v('color'), borderRadius: v('radius'), boxShadow: v('shadow'), spacing: v('spacing'),
  fontFamily: { sans: [t.font['family-sans']], display: [t.font['family-display']], mono: [t.font['family-mono']] },
  fontSize: Object.fromEntries(Object.entries(t.type).map(([k, s]) => [k, [s, { lineHeight: parseInt(s) >= 32 ? t.leading.tight : t.leading.normal }]])),
  transitionTimingFunction: v('ease'), transitionDuration: v('duration'),
};
const code = `// 由 tokens-to-tailwind.mjs 生成\nmodule.exports = { theme: { extend: ${JSON.stringify(extend, null, 2)} } };\n`;
fs.writeFileSync(out, code);
console.log(`已写入 ${out}: ${Object.keys(extend).map(k => `${k}(${Object.keys(extend[k]).length})`).join(', ')}`);
