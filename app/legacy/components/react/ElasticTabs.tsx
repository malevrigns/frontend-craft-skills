// 弹性 Tab 指示条：前沿先冲向新 Tab 把指示条拉长，后沿再跟上
import { useLayoutEffect, useRef } from 'react';
export function ElasticTabs({ tabs, value, onChange }: { tabs: string[]; value: number; onChange: (i: number) => void }) {
  const box = useRef<HTMLDivElement>(null), ind = useRef<HTMLSpanElement>(null), prev = useRef(value);
  useLayoutEffect(() => {
    const btns = [...box.current!.querySelectorAll('button')], a = btns[prev.current], b = btns[value], el = ind.current!;
    if (a && a !== b) { const L = Math.min(a.offsetLeft, b.offsetLeft), W = Math.max(a.offsetLeft + a.offsetWidth, b.offsetLeft + b.offsetWidth) - L, right = b.offsetLeft > a.offsetLeft;
      el.animate([{ transform: `translateX(${a.offsetLeft}px)`, width: a.offsetWidth + 'px' }, { transform: `translateX(${right ? a.offsetLeft : L}px)`, width: W + 'px', offset: .45 }, { transform: `translateX(${b.offsetLeft}px)`, width: b.offsetWidth + 'px' }], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' }); }
    el.style.transform = `translateX(${b.offsetLeft}px)`; el.style.width = b.offsetWidth + 'px'; prev.current = value;
  }, [value]);
  return <div className="ix-tabs" ref={box}><span className="ind" ref={ind} />{tabs.map((t, i) => <button key={t} className={i === value ? 'on' : ''} onClick={() => onChange(i)}>{t}</button>)}</div>;
}
