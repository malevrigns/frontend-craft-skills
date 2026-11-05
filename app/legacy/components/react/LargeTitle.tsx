// 大标题折叠（sticky header）：缩放、位移、透明度都挂在同一个进度 p = min(scrollTop/46, 1)
import { ReactNode, useState } from 'react';
export function LargeTitle({ title, children, height = 600 }: { title: string; children: ReactNode; height?: number }) {
  const [p, setP] = useState(0);
  return (<div className="ix-largetitle" style={{ height }} onScroll={e => setP(Math.min(e.currentTarget.scrollTop / 46, 1))}>
    <header style={{ boxShadow: p >= 1 ? '0 1px 0 var(--color-line)' : 'none' }}><span className="small" style={{ opacity: p }}>{title}</span></header>
    <h2 style={{ transform: `translateY(${-p * 6}px) scale(${1 - p * .5})`, opacity: 1 - p }}>{title}</h2>{children}</div>);
}
