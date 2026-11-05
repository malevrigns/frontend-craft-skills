import { HTMLAttributes } from 'react';
/** 毛玻璃面板（blur 24px，内高光）。放在有图/有色块的背景上才有意义 */
export const GlassPanel = ({ className = '', ...r }: HTMLAttributes<HTMLDivElement>) => <div className={`ui-glass ${className}`} {...r} />;
