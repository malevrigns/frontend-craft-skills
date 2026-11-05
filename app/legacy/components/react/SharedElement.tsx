// 共享元素放大（FLIP）：大图先无过渡钉在小图位置，下一帧再放开过渡到目标位置；关闭沿原路返回
import { CSSProperties, useRef, useState } from 'react';
export function SharedGrid({ items }: { items: { id: string; bg: string }[] }) {
  const refs = useRef<Record<string, HTMLDivElement | null>>({}); const [open, setOpen] = useState<{ id: string; style: CSSProperties } | null>(null);
  const rectStyle = (r: DOMRect): CSSProperties => ({ left: r.left, top: r.top, width: r.width, height: r.height });
  const show = (id: string) => { const r = refs.current[id]!.getBoundingClientRect(); setOpen({ id, style: { ...rectStyle(r), transition: 'none' } });
    requestAnimationFrame(() => requestAnimationFrame(() => { const w = Math.min(innerWidth - 32, 520), h = w * .75; setOpen({ id, style: { left: (innerWidth - w) / 2, top: (innerHeight - h) / 2, width: w, height: h } }); })); };
  const hide = () => { if (!open) return; setOpen({ ...open, style: rectStyle(refs.current[open.id]!.getBoundingClientRect()) }); setTimeout(() => setOpen(null), 460); };
  return (<>
    <div className="ix-shared-grid">{items.map(i => <div key={i.id} ref={el => (refs.current[i.id] = el)} style={{ background: i.bg, visibility: open?.id === i.id ? 'hidden' : undefined }} onClick={() => show(i.id)} />)}</div>
    {open && <><div className="ix-scrim on" onClick={hide} /><div className="ix-shared-big" style={{ ...open.style, background: items.find(i => i.id === open.id)!.bg }} onClick={hide} /></>}
  </>);
}
