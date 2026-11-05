// 提示排队 + 撤销条：const toast = useToast(); toast('已删除', { undo: () => restore() })
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
type T = { id: number; text: string; undo?: () => void; duration: number; out?: boolean };
const Ctx = createContext<(text: string, o?: { undo?: () => void; duration?: number }) => void>(() => {});
export const useToast = () => useContext(Ctx);
export function ToastProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<T[]>([]);
  const kill = (id: number) => { setList(l => l.map(t => (t.id === id ? { ...t, out: true } : t))); setTimeout(() => setList(l => l.filter(t => t.id !== id)), 300); };
  const push = useCallback((text: string, o: { undo?: () => void; duration?: number } = {}) => { const t = { id: Date.now() + Math.random(), text, undo: o.undo, duration: o.duration ?? 3000 }; setList(l => [t, ...l].slice(0, 3)); setTimeout(() => kill(t.id), t.duration); }, []);
  return (<Ctx.Provider value={push}>{children}
    <div className="ix-toasts" role="status">{list.map(t => (<div key={t.id} className={`ix-toast ${t.out ? 'out' : ''}`}><span>{t.text}</span>
      {t.undo && <><button onClick={() => { t.undo!(); kill(t.id); push('已撤销'); }}>撤销</button><i className="bar" style={{ animation: `ix-undo ${t.duration}ms linear forwards` }} /></>}</div>))}</div>
    <style>{'@keyframes ix-undo{from{transform:scaleX(1)}to{transform:scaleX(0)}}'}</style></Ctx.Provider>);
}
