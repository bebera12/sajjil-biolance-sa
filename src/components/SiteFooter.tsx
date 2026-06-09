import { BiolanceLogo } from './BiolanceLogo';
import { Mail, Twitter, Linkedin, Instagram } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-forest))]">
      <div className="container mx-auto px-4 py-10 flex flex-col items-center gap-6 text-center">
        <BiolanceLogo stacked />
        <a
          href="mailto:info@biolance.sa"
          className="flex items-center gap-2 text-sm text-[hsl(var(--brand-cyan))] hover:text-[hsl(var(--brand-lime))] transition-colors"
          dir="ltr"
        >
          <Mail className="h-4 w-4" />
          info@biolance.sa
        </a>
        <div className="flex items-center gap-5">
          {[Twitter, Linkedin, Instagram].map((Icon, i) => (
            <a key={i} href="#" className="text-[hsl(var(--brand-sage))] hover:text-[hsl(var(--brand-lime))] transition-colors">
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        <p className="text-xs text-[hsl(var(--brand-sage))]">
          © 2026 Biolance | بيولانس — جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
