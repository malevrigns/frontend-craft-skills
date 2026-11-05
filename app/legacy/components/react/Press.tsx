// 按压回弹 + 水波：<PressButton ripple onClick=...>保存</PressButton>（样式 ../interactions.css 的 .ix-btn / [data-ix~=press]）
import { ButtonHTMLAttributes, PointerEvent, useState } from 'react';
export function PressButton({ ripple, className = '', children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { ripple?: boolean }) {
  const [down, setDown] = useState(false); const [dots, setDots] = useState<{ id: number; x: number; y: number }[]>([]);
  const pd = (e: PointerEvent<HTMLButtonElement>) => { setDown(true); if (ripple) { const r = e.currentTarget.getBoundingClientRect(); const d = { id: Date.now(), x: e.clientX - r.left, y: e.clientY - r.top }; setDots(s => [...s, d]); } };
  return (<button data-ix="press" className={`ix-btn ${down ? 'ix-down' : ''} ${className}`} onPointerDown={pd} onPointerUp={() => setDown(false)} onPointerLeave={() => setDown(false)} {...rest}>
    {children}{dots.map(d => <span key={d.id} className="ix-ripple-dot" style={{ left: d.x, top: d.y }} onAnimationEnd={() => setDots(s => s.filter(x => x.id !== d.id))} />)}</button>);
}
