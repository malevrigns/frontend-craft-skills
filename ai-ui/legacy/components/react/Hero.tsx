import { ReactNode } from 'react';
/** 非对称 7:5 Hero，标题不超过两行 */
export function Hero({ eyebrow, title, lead, actions, visual }: { eyebrow?: string; title: ReactNode; lead: ReactNode; actions?: ReactNode; visual?: ReactNode }) {
  return (<section className="ui-hero"><div>{eyebrow && <div className="ui-eyebrow" data-reveal>{eyebrow}</div>}<h1 className="ui-display" data-reveal>{title}</h1><p className="lead" data-reveal>{lead}</p><div className="actions" data-reveal>{actions}</div></div><div className="visual" data-reveal>{visual}</div></section>);
}
