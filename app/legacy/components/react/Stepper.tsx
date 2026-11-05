// 按钮变步进器：“加入”横向展开成 − n +，减到 0 自动缩回
import { SlotNumber } from './Numbers';
export function Stepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (<div className={`ix-stepper ${value > 0 ? 'open' : ''}`}>
    <button className="add" onClick={() => onChange(1)}>加入</button><button className="minus" aria-label="减" onClick={() => onChange(Math.max(0, value - 1))}>−</button>
    <span className="n"><SlotNumber value={value} /></span><button className="plus" aria-label="加" onClick={() => onChange(value + 1)}>+</button></div>);
}
