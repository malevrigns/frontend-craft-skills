import { HTMLAttributes, PointerEvent } from 'react';
/** 卡片：hover 浮起；spotlight 时鼠标位置柔光 */
export function Card({ hover = true, spotlight, className = '', onPointerMove, ...rest }: HTMLAttributes<HTMLDivElement> & { hover?: boolean; spotlight?: boolean }) {
  const move = (e: PointerEvent<HTMLDivElement>) => { if (spotlight) { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`); } onPointerMove?.(e); };
  return <div className={`ui-card ${hover ? 'ui-card--hover' : ''} ${className}`} data-spotlight={spotlight ? '' : undefined} onPointerMove={move} {...rest} />;
}
