import { useCountUp } from './hooks';
/** 数字滚动（easeOutCubic 减速停下） */
export const CountUp = ({ to, ms = 900, format = (v: number) => Math.round(v).toLocaleString('zh-CN') }: { to: number; ms?: number; format?: (v: number) => string }) => <span>{format(useCountUp(to, ms))}</span>;
/** 老虎机数字：每位纵向滚动 */
export function SlotNumber({ value }: { value: number | string }) {
  return (<span className="ix-slot">{String(value).split('').map((c, i) => (<span className="d" key={i}><span style={{ transform: `translateY(${-+c * 1.15}em)` }}>{Array.from({ length: 10 }, (_, n) => <i key={n}>{n}</i>)}</span></span>))}</span>);
}
/** 角标：数字变化时纵向翻入；0 时缩回原位淡出 */
export const Badge = ({ count }: { count: number }) => <span className={`ix-badge ${count ? '' : 'gone'}`}><SlotNumber value={count || 0} /></span>;
