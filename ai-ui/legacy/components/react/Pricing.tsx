import { useEffect, useRef, useState } from 'react';
type Plan = { name: string; desc: string; month: number; year: number; features: string[]; featured?: boolean; cta: string };
function Count({ to }: { to: number }) { const ref = useRef<HTMLSpanElement>(null); const from = useRef(to);
  useEffect(() => { const el = ref.current!, a = from.current, t0 = performance.now(); let raf = 0; const step = (n: number) => { const p = Math.min(1, (n - t0) / 500), e = 1 - (1 - p) ** 3; el.textContent = String(Math.round(a + (to - a) * e)); if (p < 1) raf = requestAnimationFrame(step); else from.current = to; }; raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf); }, [to]);
  return <span ref={ref}>{to}</span>; }
/** 定价：中间档反色突出 + 月/年切换数字滚动 */
export function Pricing({ plans }: { plans: Plan[] }) {
  const [cycle, setCycle] = useState<'month' | 'year'>('month');
  return (<div>
    <div className="ui-toggle" role="tablist">{(['month', 'year'] as const).map(c => <button key={c} className={cycle === c ? 'on' : ''} onClick={() => setCycle(c)}>{c === 'month' ? '按月' : '按年 · 省 20%'}</button>)}</div>
    <div className="ui-pricing" style={{ marginTop: 32 }}>{plans.map(p => (
      <div key={p.name} className={`ui-card ui-price ${p.featured ? 'featured' : ''}`}><h3>{p.name}</h3><p>{p.desc}</p>
        <div className="amount">¥<Count to={p[cycle]} /><small> / {cycle === 'month' ? '月' : '年'}</small></div>
        <ul>{p.features.map(f => <li key={f}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>{f}</li>)}</ul>
        <button className="ui-btn ui-btn--primary">{p.cta}</button></div>))}</div></div>);
}
