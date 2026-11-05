import { ReactNode } from 'react';
/** 空状态：浅色插画 + 一句解释 + 明确按钮，不要只写“暂无数据” */
export function EmptyState({ title, desc, action }: { title: string; desc: string; action?: ReactNode }) {
  return (<div className="ui-empty">
    <svg className="art" viewBox="0 0 120 96" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="18" y="22" width="84" height="58" rx="8" opacity=".5" /><path d="M18 50h24l6 10h24l6-10h24" /><circle cx="92" cy="18" r="6" opacity=".4" /><path d="M30 10l4 4M40 6v6" opacity=".4" /></svg>
    <h4>{title}</h4><p>{desc}</p>{action}</div>);
}
