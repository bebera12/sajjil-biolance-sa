import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SiteNavbar } from '@/components/SiteNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = 'loading' | 'valid' | 'invalid' | 'already' | 'success' | 'error';

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [state, setState] = useState<State>('loading');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) {
      setState('invalid');
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json();
        if (res.ok && data.valid) setState('valid');
        else if (data.reason === 'already_unsubscribed') setState('already');
        else setState('invalid');
      } catch {
        setState('error');
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('handle-email-unsubscribe', {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) setState('success');
      else if (data?.reason === 'already_unsubscribed') setState('already');
      else setState('error');
    } catch {
      setState('error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-forest))] text-white" dir="rtl">
      <SiteNavbar onContact={() => {}} />
      <main className="container mx-auto max-w-xl px-4 py-16">
        <div className="rounded-2xl border border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-sage))]/10 p-8 text-center">
          {state === 'loading' && (
            <>
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-[hsl(var(--brand-lime))]" />
              <p className="mt-4 text-white/80">جاري التحقق...</p>
            </>
          )}

          {state === 'valid' && (
            <>
              <h1 className="text-2xl font-bold text-[hsl(var(--brand-lime))]">إلغاء الاشتراك</h1>
              <p className="mt-3 text-white/85">
                هل أنت متأكد من إلغاء اشتراكك في رسائل بيولانس؟ لن تستلم أي رسائل بريدية منا بعد ذلك.
              </p>
              <Button
                onClick={confirm}
                disabled={processing}
                className="mt-6 h-11 px-6 rounded-lg bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-forest))] font-bold hover:bg-white"
              >
                {processing ? 'جاري المعالجة...' : 'تأكيد إلغاء الاشتراك'}
              </Button>
            </>
          )}

          {state === 'success' && (
            <>
              <CheckCircle2 className="mx-auto h-12 w-12 text-[hsl(var(--brand-lime))]" />
              <h1 className="mt-4 text-2xl font-bold text-[hsl(var(--brand-lime))]">تم إلغاء الاشتراك</h1>
              <p className="mt-3 text-white/85">لن تستلم أي رسائل بريدية منا بعد الآن.</p>
            </>
          )}

          {state === 'already' && (
            <>
              <CheckCircle2 className="mx-auto h-12 w-12 text-[hsl(var(--brand-cyan))]" />
              <h1 className="mt-4 text-2xl font-bold text-[hsl(var(--brand-lime))]">تم إلغاء اشتراكك مسبقاً</h1>
              <p className="mt-3 text-white/85">هذا الرابط استُخدم من قبل.</p>
            </>
          )}

          {(state === 'invalid' || state === 'error') && (
            <>
              <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
              <h1 className="mt-4 text-2xl font-bold text-red-300">رابط غير صالح</h1>
              <p className="mt-3 text-white/85">
                الرابط منتهي الصلاحية أو غير صحيح. للمساعدة تواصل معنا على info@biolance.sa
              </p>
            </>
          )}

          <div className="mt-8">
            <Link to="/" className="text-sm text-[hsl(var(--brand-cyan))] hover:text-[hsl(var(--brand-lime))]">
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
