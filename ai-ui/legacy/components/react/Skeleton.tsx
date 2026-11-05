import { ReactNode } from 'react';
/** 骨架屏：骨架尺寸 = 真实内容尺寸，加载完成替换不跳动 */
export function Skeleton({ loading, lines = 3, avatar, children }: { loading: boolean; lines?: number; avatar?: boolean; children: ReactNode }) {
  if (!loading) return <>{children}</>;
  return (<div style={{ display: 'flex', gap: 12 }} aria-busy="true">{avatar && <div className="ui-skel ui-skel-avatar" />}
    <div style={{ flex: 1 }}>{Array.from({ length: lines }, (_, i) => <div key={i} className="ui-skel ui-skel-line" style={{ width: i === lines - 1 ? '60%' : '100%' }} />)}</div></div>);
}
