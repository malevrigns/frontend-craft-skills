// 入口引入：import 'ui-kit/tokens.css'; import 'ui-kit/components/aesthetic.css';（可选主题 import 'ui-kit/themes/editorial.css' 并在 <html data-style="editorial">）
// 需要滚动入场/磁吸等行为时，在根组件 useEffect(() => (window as any).AestheticUI?.init(), []) 并加载 aesthetic.js
export { Button } from './Button'; export { Card } from './Card'; export { Input } from './Input'; export { Navbar } from './Navbar';
export { Hero } from './Hero'; export { BentoGrid } from './BentoGrid'; export { Pricing } from './Pricing'; export { GlassPanel } from './GlassPanel';
export { EmptyState } from './EmptyState'; export { Skeleton } from './Skeleton';
