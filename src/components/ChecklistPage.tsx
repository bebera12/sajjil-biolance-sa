import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteNavbar } from '@/components/SiteNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { ContactForm } from '@/components/ContactForm';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Check, Circle, Clock, AlertTriangle, Lightbulb, ArrowLeft } from 'lucide-react';

export type Status = 'not_started' | 'in_progress' | 'complete';

export interface ChecklistStep {
  id: string;
  title: string;
  explanation?: string;
  bullets: string[];
  tip?: string;
  warning?: string;
}

interface Props {
  storageKey: string;
  title: string;
  subtitle: string;
  steps: ChecklistStep[];
  ctaText: string;
  ctaButtonText?: string;
}

const STATUS_LABEL: Record<Status, string> = {
  not_started: 'لم يبدأ',
  in_progress: 'قيد التنفيذ',
  complete: 'مكتمل',
};

export function ChecklistPage({ storageKey, title, subtitle, steps, ctaText, ctaButtonText = 'تواصل مع بيولانس' }: Props) {
  const loadStatuses = (): Record<string, Status> => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw);
    } catch {}
    return Object.fromEntries(steps.map(s => [s.id, 'not_started' as Status]));
  };

  const [statuses, setStatuses] = useState<Record<string, Status>>(loadStatuses);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(statuses));
  }, [statuses, storageKey]);

  const progress = useMemo(() => {
    const done = steps.filter(s => statuses[s.id] === 'complete').length;
    return Math.round((done / steps.length) * 100);
  }, [statuses, steps]);

  const cycle = (id: string) => {
    setStatuses(prev => {
      const cur = prev[id] ?? 'not_started';
      const next: Status = cur === 'not_started' ? 'in_progress' : cur === 'in_progress' ? 'complete' : 'not_started';
      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-forest))] text-white pb-32" dir="rtl">
      <SiteNavbar onContact={() => setShowContact(true)} />

      <main className="container mx-auto max-w-4xl px-4 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[hsl(var(--brand-cyan))] hover:text-[hsl(var(--brand-lime))] mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          العودة للرئيسية
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--brand-lime))]">{title}</h1>
          <p className="mt-3 text-lg text-white/90">{subtitle}</p>
        </header>

        <div className="sticky top-16 z-20 mb-8 rounded-xl border border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-forest))]/95 backdrop-blur p-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/80">التقدم الإجمالي</span>
            <span className="font-bold text-[hsl(var(--brand-lime))]">{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-3 bg-[hsl(var(--brand-sage))]/30 [&>div]:bg-[hsl(var(--brand-lime))]"
          />
        </div>

        <Accordion type="multiple" className="space-y-4">
          {steps.map((step, idx) => {
            const status = statuses[step.id] ?? 'not_started';
            const borderClass =
              status === 'complete'
                ? 'border-[hsl(var(--brand-lime))]'
                : status === 'in_progress'
                ? 'border-[hsl(var(--brand-sage))]'
                : 'border-white/15';

            return (
              <AccordionItem
                key={step.id}
                value={step.id}
                className={`rounded-xl border-2 ${borderClass} bg-[hsl(var(--brand-sage))]/10 overflow-hidden`}
              >
                <div className="flex items-center gap-3 px-5 pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-forest))] font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); cycle(step.id); }}
                    className={`inline-flex items-center gap-2 rounded-full border-2 px-3 py-1 text-xs font-semibold transition-colors ${
                      status === 'complete'
                        ? 'border-[hsl(var(--brand-lime))] text-[hsl(var(--brand-lime))] bg-[hsl(var(--brand-lime))]/10'
                        : status === 'in_progress'
                        ? 'border-[hsl(var(--brand-sage))] text-[hsl(var(--brand-cyan))] bg-[hsl(var(--brand-sage))]/20'
                        : 'border-white/30 text-white/70'
                    }`}
                  >
                    {status === 'complete' ? (
                      <Check className="h-3.5 w-3.5 text-[hsl(var(--brand-lime))]" />
                    ) : status === 'in_progress' ? (
                      <Clock className="h-3.5 w-3.5 text-amber-400" />
                    ) : (
                      <Circle className="h-3.5 w-3.5" />
                    )}
                    {STATUS_LABEL[status]}
                  </button>
                </div>

                <AccordionTrigger className="px-5 pt-2 pb-5 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  <span className="text-right text-lg font-bold text-[hsl(var(--brand-lime))] flex-1">
                    {step.title}
                  </span>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-6">
                  {step.explanation && (
                    <p className="text-white/90 leading-relaxed mb-4">{step.explanation}</p>
                  )}

                  <div className="rounded-lg border border-[hsl(var(--brand-sage))]/40 bg-[hsl(var(--brand-forest))]/40 p-4">
                    <h4 className="text-sm font-bold text-[hsl(var(--brand-cyan))] mb-3">المستندات المطلوبة</h4>
                    <ul className="space-y-2">
                      {step.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2 text-white/90 text-sm leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--brand-lime))]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {step.tip && (
                    <div
                      className="mt-4 flex gap-3 rounded-lg p-4"
                      style={{ background: '#CFF9FF', color: '#12332A' }}
                    >
                      <Lightbulb className="h-5 w-5 shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed">
                        <span className="font-bold">نصيحة: </span>
                        {step.tip}
                      </p>
                    </div>
                  )}

                  {step.warning && (
                    <div className="mt-4 flex gap-3 rounded-lg border-2 border-amber-400/60 bg-amber-500/10 p-4 text-amber-100">
                      <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-400" />
                      <p className="text-sm leading-relaxed">
                        <span className="font-bold">تنبيه مهم: </span>
                        {step.warning}
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </main>

      <div className="fixed bottom-0 inset-x-0 z-30 bg-[hsl(var(--brand-sage))] border-t border-[hsl(var(--brand-lime))]/30 shadow-2xl">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-white font-medium text-sm md:text-base">{ctaText}</p>
          <Button
            onClick={() => setShowContact(true)}
            className="rounded-lg bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-forest))] font-bold hover:bg-white"
          >
            {ctaButtonText}
          </Button>
        </div>
      </div>

      <SiteFooter />
      <ContactForm open={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}
