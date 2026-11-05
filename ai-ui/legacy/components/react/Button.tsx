import { ButtonHTMLAttributes, ReactNode } from 'react';
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'accent' | 'ghost'; size?: 'md' | 'sm'; icon?: ReactNode; magnetic?: boolean };
/** 主按钮 48px 全圆角，按压 0.96 回弹。样式：../aesthetic.css */
export function Button({ variant = 'primary', size = 'md', icon, magnetic, className = '', children, ...rest }: Props) {
  return <button className={`ui-btn ui-btn--${variant} ${size === 'sm' ? 'ui-btn--sm' : ''} ${className}`} data-magnetic={magnetic ? '0.25' : undefined} {...rest}>{children}{icon}</button>;
}
