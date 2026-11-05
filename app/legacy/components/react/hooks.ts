// 通用 hooks：useDrag（带方向锁，可嵌套）、useFlip（FLIP 动画）、useCountUp、useReducedMotion
import { useEffect, useLayoutEffect, useRef, useState, RefObject } from 'react';
export const useReducedMotion = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
type DragCb = (dx: number, dy: number, vx: number, vy: number) => void;
export function useDrag(ref: RefObject<HTMLElement>, o: { axis?: 'x' | 'y'; start?: () => void; move?: DragCb; end?: DragCb; filter?: (e: PointerEvent) => boolean; enabled?: boolean }) {
  const opt = useRef(o); opt.current = o;
  useEffect(() => {
    const el = ref.current; if (!el || opt.current.enabled === false) return; let sx = 0, sy = 0, lx = 0, ly = 0, lt = 0, vx = 0, vy = 0, on = false, locked = false, pid = 0;
    const down = (e: PointerEvent) => { const c = opt.current; if (e.button > 0 || (c.filter && !c.filter(e))) return; on = true; locked = !c.axis; pid = e.pointerId; sx = lx = e.clientX; sy = ly = e.clientY; lt = performance.now(); c.start?.(); };
    const move = (e: PointerEvent) => { if (!on || e.pointerId !== pid) return; const c = opt.current;
      if (!locked) { const ax = Math.abs(e.clientX - sx), ay = Math.abs(e.clientY - sy); if (Math.max(ax, ay) < 6) return; if ((ax > ay ? 'x' : 'y') !== c.axis) { on = false; c.end?.(0, 0, 0, 0); return; } locked = true; }
      const t = performance.now(), dt = Math.max(1, t - lt); vx = (e.clientX - lx) / dt; vy = (e.clientY - ly) / dt; lx = e.clientX; ly = e.clientY; lt = t; c.move?.(lx - sx, ly - sy, vx, vy); };
    const up = (e: PointerEvent) => { if (!on || e.pointerId !== pid) return; on = false; opt.current.end?.(lx - sx, ly - sy, vx, vy); };
    el.addEventListener('pointerdown', down); addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
    return () => { el.removeEventListener('pointerdown', down); removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up); };
  }, [ref, o.enabled]);
}
/** FLIP：在 deps 变化导致布局改变后，让 container 的子元素从旧位置平滑过渡到新位置 */
export function useFlip(container: RefObject<HTMLElement>, deps: unknown[]) {
  const prev = useRef(new Map<Element, DOMRect>());
  useLayoutEffect(() => {
    const kids = [...container.current!.children];
    kids.forEach(k => { const a = prev.current.get(k), b = k.getBoundingClientRect(); if (a) (k as HTMLElement).animate([{ transform: `translate(${a.left - b.left}px,${a.top - b.top}px) scale(${a.width / b.width},${a.height / b.height})`, transformOrigin: '0 0' }, { transform: 'none', transformOrigin: '0 0' }], { duration: 460, easing: 'cubic-bezier(.22,1,.36,1)' }); });
    prev.current = new Map(kids.map(k => [k, k.getBoundingClientRect()]));
  }, deps); // eslint-disable-line
}
export function useCountUp(to: number, ms = 900) {
  const [v, setV] = useState(0); const from = useRef(0);
  useEffect(() => { const a = from.current, t0 = performance.now(); let r = 0; const step = (n: number) => { const p = Math.min(1, (n - t0) / ms), x = a + (to - a) * (1 - (1 - p) ** 3); setV(x); if (p < 1) r = requestAnimationFrame(step); else from.current = to; }; r = requestAnimationFrame(step); return () => cancelAnimationFrame(r); }, [to, ms]);
  return v;
}
