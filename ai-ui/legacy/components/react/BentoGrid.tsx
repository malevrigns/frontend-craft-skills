import { ReactNode } from 'react';
/** Bento：6 列网格，item.w = 2|3|4|6，item.h = 1|2 */
export function BentoGrid({ items }: { items: { key: string; w?: 2 | 3 | 4 | 6; h?: 1 | 2; content: ReactNode; className?: string }[] }) {
  return <div className="ui-bento">{items.map(i => <div key={i.key} className={`ui-card ui-card--hover ${i.w && i.w !== 2 ? 'w' + i.w : ''} ${i.h === 2 ? 'h2' : ''} ${i.className ?? ''}`} data-reveal>{i.content}</div>)}</div>;
}
