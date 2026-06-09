import { ProductRegistration, StepStatus, getProgress, getStatusLabel, categoryLabels, categoryIcons } from '@/lib/registration-data';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react';

interface Props {
  registration: ProductRegistration;
  onUpdateStep: (stepId: string, status: StepStatus) => void;
  onBack: () => void;
  onRequestHelp: () => void;
}

const statusConfig: Record<StepStatus, { icon: React.ReactNode; color: string }> = {
  not_started: { icon: <Circle className="h-5 w-5" />, color: 'text-white/50' },
  in_progress: { icon: <Clock className="h-5 w-5" />, color: 'text-[hsl(var(--brand-cyan))]' },
  complete: { icon: <CheckCircle2 className="h-5 w-5" />, color: 'text-[hsl(var(--brand-lime))]' },
};

export function RegistrationChecklist({ registration, onUpdateStep, onBack, onRequestHelp }: Props) {
  const progress = getProgress(registration);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{categoryIcons[registration.category]}</span>
          <div>
            <h2 className="text-2xl font-bold text-[hsl(var(--brand-lime))]">{registration.name}</h2>
            <p className="text-sm text-[hsl(var(--brand-cyan))]/80">{categoryLabels[registration.category]}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-[hsl(var(--brand-cyan))] hover:bg-[hsl(var(--brand-sage))]/20 hover:text-[hsl(var(--brand-lime))]"
        >
          العودة
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2 rounded-xl border border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-sage))]/10 p-5">
        <div className="flex justify-between text-sm">
          <span className="text-white/80">التقدم الإجمالي</span>
          <span className="font-bold text-[hsl(var(--brand-lime))]">{progress}%</span>
        </div>
        <Progress value={progress} className="h-3 bg-[hsl(var(--brand-sage))]/30" />
      </div>

      <div className="space-y-3">
        {registration.steps.map((step, i) => {
          const cfg = statusConfig[step.status];
          const completed = step.status === 'complete';
          return (
            <div
              key={step.id}
              className={`rounded-xl border p-5 transition-colors ${
                completed
                  ? 'border-[hsl(var(--brand-lime))]/60 bg-[hsl(var(--brand-lime))]/5'
                  : 'border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-sage))]/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 ${cfg.color}`}>{cfg.icon}</span>
                  <div>
                    <h3 className="text-base font-semibold text-[hsl(var(--brand-lime))]">
                      <span className="text-white/50 ml-2">{i + 1}.</span>
                      {step.title}
                    </h3>
                  </div>
                </div>
                <Select value={step.status} onValueChange={(v) => onUpdateStep(step.id, v as StepStatus)}>
                  <SelectTrigger className="w-36 h-8 text-xs bg-[hsl(var(--brand-forest))] border-[hsl(var(--brand-sage))]/60 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not_started">{getStatusLabel('not_started')}</SelectItem>
                    <SelectItem value="in_progress">{getStatusLabel('in_progress')}</SelectItem>
                    <SelectItem value="complete">{getStatusLabel('complete')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="mt-2 pr-8 text-sm text-white/80 leading-relaxed">{step.description}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-[hsl(var(--brand-lime))]/40 bg-[hsl(var(--brand-lime))]/5 p-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-bold text-[hsl(var(--brand-lime))]">تحتاج مساعدة متخصصة؟</h3>
          <p className="text-sm text-white/80 mt-1">فريقنا من الخبراء التنظيميين جاهز لمساعدتك</p>
        </div>
        <Button
          onClick={onRequestHelp}
          className="rounded-lg bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-forest))] font-bold hover:bg-white"
        >
          طلب استشارة
        </Button>
      </div>
    </div>
  );
}
