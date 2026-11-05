import { useEffect, useRef, useState, ReactNode } from 'react';
/** 毛玻璃导航：滚动 > 8px 显示底色；悬停胶囊指示条跟随 */
export function Navbar({ brand, links, cta }: { brand: ReactNode; links: { label: string; href: string; active?: boolean }[]; cta?: ReactNode }) {
  const [scrolled, setScrolled] = useState(false); const [pill, setPill] = useState<{ x: number; w: number } | null>(null); const box = useRef<HTMLDivElement>(null);
  useEffect(() => { const on = () => setScrolled(scrollY > 8); addEventListener('scroll', on, { passive: true }); on(); return () => removeEventListener('scroll', on); }, []);
  return (
    <nav className={`ui-nav ${scrolled ? 'scrolled' : ''}`}>
      <a className="brand" href="/">{brand}</a>
      <div className="links" ref={box} onMouseLeave={() => setPill(null)}>
        <span className="pill" style={{ opacity: pill ? 1 : 0, width: pill?.w, transform: `translateX(${pill?.x ?? 0}px)` }} />
        {links.map(l => <a key={l.href} href={l.href} className={l.active ? 'on' : ''} onMouseEnter={e => setPill({ x: e.currentTarget.offsetLeft, w: e.currentTarget.offsetWidth })}>{l.label}</a>)}
      </div>
      {cta}
    </nav>
  );
}
