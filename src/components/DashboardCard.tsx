import { ProductRegistration, getProgress, categoryLabels, categoryIcons } from '@/lib/registration-data';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface Props {
  registration: ProductRegistration;
  onClick: () => void;
  onDelete: () => void;
}

export function DashboardCard({ registration, onClick, onDelete }: Props) {
  const progress = getProgress(registration);
  const completedSteps = registration.steps.filter(s => s.status === 'complete').length;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-forest))] p-5 transition-all hover:border-[hsl(var(--brand-lime))] hover:shadow-[0_0_24px_-6px_hsl(var(--brand-lime)/0.4)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{categoryIcons[registration.category]}</span>
          <div>
            <h3 className="font-semibold text-[hsl(var(--brand-lime))]">{registration.name}</h3>
            <p className="text-xs text-[hsl(var(--brand-cyan))]/80">{categoryLabels[registration.category]}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 hover:bg-destructive/20"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-white/70">
        <span>{completedSteps} من {registration.steps.length} خطوات مكتملة</span>
        <Badge
          className={
            progress === 100
              ? 'bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-forest))] hover:bg-[hsl(var(--brand-lime))]'
              : 'bg-[hsl(var(--brand-sage))]/30 text-[hsl(var(--brand-cyan))] hover:bg-[hsl(var(--brand-sage))]/30'
          }
        >
          {progress === 100 ? 'مكتمل' : `${progress}%`}
        </Badge>
      </div>
      <Progress value={progress} className="mt-3 h-2 bg-[hsl(var(--brand-sage))]/30" />
    </div>
  );
}
