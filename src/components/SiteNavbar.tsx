import { Link, useLocation } from 'react-router-dom';
import { BiolanceLogo } from './BiolanceLogo';

const links = [
  { label: 'الرئيسية', to: '/' },
  { label: 'خدماتنا', to: '/#services' },
  { label: 'من نحن', to: '/about' },
  { label: 'تواصل معنا', to: '/contact' },
];

export function SiteNavbar({ onContact }: { onContact?: () => void }) {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--brand-sage))]/40 bg-[hsl(var(--brand-forest))]/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <BiolanceLogo />
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => {
            const isHash = l.to.includes('#');
            const isActive = !isHash && pathname === l.to;
            const className = `text-sm transition-colors ${
              isActive
                ? 'text-[hsl(var(--brand-lime))] font-semibold'
                : 'text-[hsl(var(--brand-cyan))] hover:text-[hsl(var(--brand-lime))]'
            }`;
            if (isHash) {
              return (
                <a key={l.to} href={l.to} className={className}>
                  {l.label}
                </a>
              );
            }
            return (
              <Link key={l.to} to={l.to} className={className}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Link
          to="/contact"
          className="md:hidden text-sm text-[hsl(var(--brand-cyan))] hover:text-[hsl(var(--brand-lime))]"
        >
          تواصل
        </Link>
      </div>
    </header>
  );
}
