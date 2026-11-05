// 下拉刷新：阻尼（阈值前 0.6，之后 0.25）→ 过阈值箭头翻转 → 松手转圈 → onRefresh resolve 后回弹
import { ReactNode, useRef, useState } from 'react';
import { useDrag } from './hooks';
export function PullToRefresh({ children, onRefresh, height = 320 }: { children: ReactNode; onRefresh: () => Promise<void>; height?: number }) {
  const c = useRef<HTMLDivElement>(null); const [y, setY] = useState(0); const [st, setSt] = useState<'idle' | 'drag' | 'ready' | 'loading'>('idle'); const TH = 64;
  useDrag(c, { axis: 'y', filter: () => st !== 'loading' && (c.current?.scrollTop ?? 0) <= 0, start: () => setSt('drag'),
    move: (_dx, dy) => { if (dy < 0) return; const v = dy < TH ? dy * .6 : TH * .6 + (dy - TH) * .25; setY(v); setSt(v >= TH * .6 ? 'ready' : 'drag'); },
    end: async () => { if (st === 'ready') { setSt('loading'); setY(TH * .75); await onRefresh(); } setSt('idle'); setY(0); } });
  return (<div className={`ix-ptr ${st === 'ready' ? 'ready' : ''} ${st === 'loading' ? 'loading' : ''}`} style={{ height }}>
    <div className="ind"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">{st === 'loading' ? <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" /> : <path d="M12 5v14M6 13l6 6 6-6" />}</svg></div>
    <div ref={c} className={`content ${st === 'drag' || st === 'ready' ? 'drag' : ''}`} style={{ transform: `translateY(${y}px)` }}>{children}</div></div>);
}
