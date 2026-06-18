import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteNavbar } from '@/components/SiteNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle2, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  submitConsultation,
  type ConsultationFieldErrors,
  type ConsultationFormValues,
  validateConsultation,
} from '@/lib/consultation';

export default function Contact() {
  const [form, setForm] = useState<ConsultationFormValues>({
    name: '', email: '', phone: '', company: '', category: '', message: '',
  });
  const [errors, setErrors] = useState<ConsultationFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [k]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, errors: validationErrors } = validateConsultation(form);
    if (!data) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      await submitConsultation(data);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to send contact emails', err);
      toast({
        title: 'تعذّر إرسال الطلب',
        description: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل على info@biolance.sa',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm({ name: '', email: '', phone: '', company: '', category: '', message: '' });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-forest))] text-white" dir="rtl">
      <SiteNavbar onContact={() => {}} />

      <main className="container mx-auto max-w-5xl px-4 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[hsl(var(--brand-cyan))] hover:text-[hsl(var(--brand-lime))] mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          العودة للرئيسية
        </Link>

        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--brand-lime))]">تواصل مع بيولانس</h1>
          <p className="mt-3 text-lg text-white/85 max-w-2xl mx-auto">
            خبراؤنا التنظيميون جاهزون لمساعدتك في تسجيل منتجاتك لدى هيئة الغذاء والدواء — أرسل طلبك وسنتواصل معك خلال 24 ساعة عمل.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Info side */}
          <aside className="space-y-4 md:col-span-1">
            {[
              { icon: Mail, label: 'البريد الإلكتروني', value: 'hello@biolance.sa' },
              { icon: Phone, label: 'الجوال', value: '+966 50 000 0000' },
              { icon: MapPin, label: 'الموقع', value: 'الرياض، المملكة العربية السعودية' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-sage))]/10 p-5">
                <Icon className="h-5 w-5 text-[hsl(var(--brand-lime))]" />
                <p className="mt-3 text-xs text-white/60">{label}</p>
                <p className="mt-1 font-semibold text-[hsl(var(--brand-cyan))]" dir="ltr">{value}</p>
              </div>
            ))}
          </aside>

          {/* Form side */}
          <section className="md:col-span-2">
            {submitted ? (
              <div className="rounded-2xl border-2 border-[hsl(var(--brand-lime))] bg-[hsl(var(--brand-lime))]/10 p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--brand-lime))]">
                  <CheckCircle2 className="h-9 w-9 text-[hsl(var(--brand-forest))]" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-[hsl(var(--brand-lime))]">تم استلام طلبك بنجاح</h2>
                <p className="mt-3 text-white/85 max-w-md mx-auto leading-relaxed">
                  شكراً لتواصلك مع بيولانس. سيقوم أحد خبرائنا التنظيميين بالرد عليك خلال 24 ساعة عمل على البريد الإلكتروني الذي أدخلته.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="rounded-lg border-[hsl(var(--brand-lime))] text-[hsl(var(--brand-lime))] bg-transparent hover:bg-[hsl(var(--brand-lime))] hover:text-[hsl(var(--brand-forest))]"
                  >
                    إرسال طلب آخر
                  </Button>
                  <Link to="/">
                    <Button className="rounded-lg bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-forest))] font-bold hover:bg-white">
                      العودة للرئيسية
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-sage))]/10 p-6 md:p-8 space-y-5"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">الاسم الكامل *</Label>
                    <Input
                      id="name" value={form.name} onChange={update('name')}
                      placeholder="الاسم الكامل"
                      className="bg-[hsl(var(--brand-forest))] border-[hsl(var(--brand-sage))]/60 text-white"
                    />
                    {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">البريد الإلكتروني *</Label>
                    <Input
                      id="email" type="email" value={form.email} onChange={update('email')}
                      placeholder="example@email.com" dir="ltr"
                      className="bg-[hsl(var(--brand-forest))] border-[hsl(var(--brand-sage))]/60 text-white text-left"
                    />
                    {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">رقم الجوال</Label>
                    <Input
                      id="phone" type="tel" value={form.phone} onChange={update('phone')}
                      placeholder="+966" dir="ltr"
                      className="bg-[hsl(var(--brand-forest))] border-[hsl(var(--brand-sage))]/60 text-white text-left"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">اسم الشركة</Label>
                    <Input
                      id="company" value={form.company} onChange={update('company')}
                      placeholder="الشركة (اختياري)"
                      className="bg-[hsl(var(--brand-forest))] border-[hsl(var(--brand-sage))]/60 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">فئة المنتج</Label>
                  <select
                    id="category" value={form.category} onChange={update('category')}
                    className="w-full h-10 rounded-md border border-[hsl(var(--brand-sage))]/60 bg-[hsl(var(--brand-forest))] px-3 text-sm text-white"
                  >
                    <option value="">اختر الفئة (اختياري)</option>
                    <option value="food_supplements">المنتجات الغذائية والمكملات</option>
                    <option value="medical_devices">الأجهزة الطبية</option>
                    <option value="pharmaceuticals">المنتجات الصيدلانية</option>
                    <option value="cosmetics">مستحضرات التجميل</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">تفاصيل الطلب *</Label>
                  <Textarea
                    id="message" value={form.message} onChange={update('message')}
                    placeholder="اشرح طبيعة منتجك وما تحتاج المساعدة فيه..."
                    rows={6}
                    className="bg-[hsl(var(--brand-forest))] border-[hsl(var(--brand-sage))]/60 text-white"
                  />
                  {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-lg bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-forest))] font-bold text-base hover:bg-white disabled:opacity-70"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      جاري الإرسال...
                    </span>
                  ) : (
                    'إرسال الطلب'
                  )}
                </Button>
                <p className="text-xs text-white/60 text-center">
                  بإرسالك الطلب، أنت توافق على تواصل بيولانس معك بخصوص استفسارك.
                </p>
              </form>
            )}
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
