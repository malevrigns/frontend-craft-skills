// 左滑删除：> 40% 宽度或速度 > 0.5px/ms 直接删除；否则吸附到露出删除按钮（-88px）或回弹。可放在 PullToRefresh 里（方向锁）
import { ReactNode, useRef, useState } from 'react';
import { useDrag } from './hooks';
export function SwipeToDelete({ children, onDelete }: { children: ReactNode; onDelete: () => void }) {
  const wrap = useRef<HTMLDivElement>(null), row = useRef<HTMLDivElement>(null); const [x, setX] = useState(0); const [dragging, setDragging] = useState(false); const [gone, setGone] = useState(false); const base = useRef(0);
  const remove = () => { setX(-(wrap.current?.offsetWidth ?? 400)); setGone(true); setTimeout(onDelete, 380); };
  useDrag(row, { axis: 'x', start: () => setDragging(true), move: dx => { let v = base.current + dx; if (v > 0) v *= .3; setX(v); },
    end: (dx, _dy, vx) => { setDragging(false); const v = base.current + dx, w = wrap.current!.offsetWidth; if (v < -w * .4 || (vx < -.5 && v < -40)) return remove(); base.current = v < -44 ? -88 : 0; setX(base.current); } });
  return (<div ref={wrap} className="ix-swipe" style={gone ? { height: 0, marginBottom: 0 } : undefined}>
    <button className="act" aria-label="删除" onClick={remove}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}><path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" /></svg></button>
    <div ref={row} className={`row ${dragging ? 'drag' : ''}`} style={{ transform: `translateX(${x}px)` }}>{children}</div></div>);
}
