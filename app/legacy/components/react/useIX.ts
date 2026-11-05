// 桥接：在 React 里直接复用 vanilla 的全部 43 个 data-ix 交互（未单独写 React 版的也能用）
// 先在 index.html 引入 interactions.js，或 import '../interactions.js'
import { useEffect, RefObject } from 'react';
export function useIX(root: RefObject<HTMLElement>) { useEffect(() => { (window as any).IX?.init(root.current); }, [root]); }
// 用法：const ref = useRef(null); useIX(ref); return <div ref={ref}><button data-ix="press hold" className="ix-btn">长按删除</button></div>
