import { ReactNode, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDrag } from './hooks';

/** Web/React DOM only. For Expo Native use React Native Modal + accessibility API. */
export function BottomSheet({ open, onClose, title = '操作面板', children }: {
  open: boolean; onClose: () => void; title?: string; children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [dy, setDy] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const dialog = ref.current;
    requestAnimationFrame(() => dialog?.focus());
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key !== 'Tab' || !dialog) return;
      const nodes = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
      )).filter(el => el.getClientRects().length > 0);
      if (!nodes.length) { e.preventDefault(); dialog.focus(); return; }
      if (e.shiftKey && document.activeElement === nodes[0]) { e.preventDefault(); nodes[nodes.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === nodes[nodes.length - 1]) { e.preventDefault(); nodes[0].focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener('keydown', keydown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  useDrag(ref, {
    enabled: mounted && open,
    axis: 'y',
    filter: e => open && !(e.target as HTMLElement).closest('input,textarea,button,[data-nodrag]'),
    move: (_x, delta) => setDy(delta > 0 ? delta : delta * 0.2),
    end: (_x, delta, _vx, vy) => {
      setDy(null);
      if (open && (delta > (ref.current?.offsetHeight ?? 0) / 3 || vy > 0.55)) onClose();
    },
  });

  // Render nothing until mounted to avoid document access in SSR.
  if (!mounted || !open) return null;
  return createPortal(<>
    <div className="ix-scrim on" onClick={onClose} aria-hidden="true" />
    <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}
      className={`ix-sheet on ${dy !== null ? 'drag' : ''}`}
      style={dy !== null ? { transform: `translateY(${dy}px)` } : undefined}>
      <h2 id={titleId} className="sr-only">{title}</h2>
      <div className="grab" aria-hidden="true" />
      {children}
    </div>
  </>, document.body);
}
