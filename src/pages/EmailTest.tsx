import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Loader2, RefreshCw, Send, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LogRow {
  id: string;
  message_id: string | null;
  template_name: string | null;
  recipient_email: string | null;
  status: string | null;
  error_message: string | null;
  created_at: string;
}

const statusMeta: Record<string, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
  sent: { label: 'تم الإرسال', cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', Icon: CheckCircle2 },
  pending: { label: 'في الانتظار', cls: 'bg-amber-500/20 text-amber-300 border-amber-500/40', Icon: Clock },
  dlq: { label: 'فشل', cls: 'bg-red-500/20 text-red-300 border-red-500/40', Icon: XCircle },
  failed: { label: 'فشل', cls: 'bg-red-500/20 text-red-300 border-red-500/40', Icon: XCircle },
  bounced: { label: 'مرتد', cls: 'bg-red-500/20 text-red-300 border-red-500/40', Icon: XCircle },
  suppressed: { label: 'محظور', cls: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40', Icon: XCircle },
  complained: { label: 'شكوى', cls: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40', Icon: XCircle },
};

export default function EmailTest() {
  const [email, setEmail] = useState('info@biolance.sa');
  const [name, setName] = useState('فريق بيولانس');
  const [sending, setSending] = useState(false);
  const [logs, setLogs] = useState<LogRow[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const { toast } = useToast();

  const fetchLogs = async () => {
    setLoadingLogs(true);
    const { data, error } = await (supabase as any)
      .from('email_send_log')
      .select('id, message_id, template_name, recipient_email, status, error_message, created_at')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) {
      toast({ title: 'تعذّر تحميل السجل', description: error.message, variant: 'destructive' });
    } else {
      // Dedupe by message_id, keep latest
      const seen = new Set<string>();
      const dedup: LogRow[] = [];
      for (const r of (data || []) as LogRow[]) {
        const key = r.message_id || r.id;
        if (seen.has(key)) continue;
        seen.add(key);
        dedup.push(r);
      }
      setLogs(dedup);
    }
    setLoadingLogs(false);
  };

  useEffect(() => { fetchLogs(); }, []);

  const sendTest = async () => {
    if (!email.trim()) {
      toast({ title: 'أدخل البريد الإلكتروني', variant: 'destructive' });
      return;
    }
    setSending(true);
    try {
      const idem = `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const { error } = await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'contact-confirmation',
          recipientEmail: email.trim(),
          idempotencyKey: idem,
          templateData: { name: name.trim() || 'مستخدم تجريبي' },
        },
      });
      if (error) throw error;
      toast({
        title: 'تم وضع الإيميل في قائمة الإرسال ✅',
        description: 'تابع الحالة في السجل أدناه. الإرسال الفعلي يبدأ بعد توثيق نطاق notify.biolance.sa.',
      });
      setTimeout(fetchLogs, 1500);
    } catch (err: any) {
      console.error(err);
      toast({ title: 'فشل الإرسال', description: err?.message || 'حدث خطأ غير متوقع', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-forest))] text-white" dir="rtl">
      <main className="container mx-auto max-w-4xl px-4 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[hsl(var(--brand-cyan))] hover:text-[hsl(var(--brand-lime))] mb-6">
          <ArrowLeft className="h-4 w-4" />
          العودة للرئيسية
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--brand-lime))]">اختبار إرسال الإيميل</h1>
          <p className="mt-2 text-white/80">أرسل إيميل تجريبي وتابع حالة التسليم لحظياً.</p>
        </header>

        <section className="rounded-2xl border border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-sage))]/10 p-6 md:p-8 space-y-5 mb-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="t-email" className="text-white">البريد المستلِم</Label>
              <Input
                id="t-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                dir="ltr" className="bg-[hsl(var(--brand-forest))] border-[hsl(var(--brand-sage))]/60 text-white text-left"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-name" className="text-white">اسم المستلِم (للقالب)</Label>
              <Input
                id="t-name" value={name} onChange={e => setName(e.target.value)}
                className="bg-[hsl(var(--brand-forest))] border-[hsl(var(--brand-sage))]/60 text-white"
              />
            </div>
          </div>
          <Button
            onClick={sendTest} disabled={sending}
            className="w-full h-12 rounded-lg bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-forest))] font-bold text-base hover:bg-white disabled:opacity-70"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {sending ? 'جاري الإرسال...' : 'إرسال إيميل تجريبي'}
          </Button>
          <p className="text-xs text-white/60 text-center">
            ملاحظة: نطاق <span dir="ltr">notify.biolance.sa</span> قيد توثيق DNS. الإيميلات تُحفظ في القائمة وتُرسل تلقائياً بعد اكتمال التوثيق.
          </p>
        </section>

        <section className="rounded-2xl border border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-sage))]/10 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[hsl(var(--brand-lime))]">سجل الإرسال (آخر 50)</h2>
            <Button
              onClick={fetchLogs} disabled={loadingLogs} variant="outline" size="sm"
              className="rounded-lg border-[hsl(var(--brand-cyan))] text-[hsl(var(--brand-cyan))] bg-transparent hover:bg-[hsl(var(--brand-cyan))] hover:text-[hsl(var(--brand-forest))]"
            >
              {loadingLogs ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              تحديث
            </Button>
          </div>

          {logs.length === 0 && !loadingLogs && (
            <p className="text-white/60 text-center py-10">لا يوجد سجل إرسال بعد. أرسل إيميل تجريبي لتجربة النظام.</p>
          )}

          <div className="space-y-3">
            {logs.map(log => {
              const meta = statusMeta[log.status || ''] ?? { label: log.status || '—', cls: 'bg-slate-500/20 text-slate-300 border-slate-500/40', Icon: Clock };
              const Icon = meta.Icon;
              return (
                <div key={log.id} className="rounded-lg border border-[hsl(var(--brand-sage))]/40 bg-[hsl(var(--brand-forest))]/60 p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="space-y-1">
                      <p className="font-semibold text-white" dir="ltr">{log.recipient_email}</p>
                      <p className="text-xs text-white/60">
                        <span className="text-[hsl(var(--brand-cyan))]">{log.template_name}</span>
                        {' · '}
                        {new Date(log.created_at).toLocaleString('ar-SA')}
                      </p>
                    </div>
                    <Badge variant="outline" className={`${meta.cls} gap-1`}>
                      <Icon className="h-3 w-3" />
                      {meta.label}
                    </Badge>
                  </div>
                  {log.error_message && (
                    <p className="mt-2 text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded p-2" dir="ltr">
                      {log.error_message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
