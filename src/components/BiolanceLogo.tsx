import logoMark from '@/assets/biolance-mark.png';

interface Props {
  className?: string;
  stacked?: boolean;
}

export function BMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <img
      src={logoMark}
      alt="biolance"
      className={`${className} object-contain`}
    />
  );
}

export function BiolanceLogo({ className = '', stacked = false }: Props) {
  if (stacked) {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <BMark className="h-14 w-14" />
        <span className="text-[hsl(var(--brand-lime))] text-lg font-bold tracking-wide">biolance</span>
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <BMark className="h-9 w-9" />
      <span className="text-[hsl(var(--brand-lime))] font-bold text-base whitespace-nowrap">
        سجّل <span className="opacity-70 font-medium">| by biolance</span>
      </span>
    </div>
  );
}
