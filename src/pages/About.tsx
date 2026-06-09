import { Link } from 'react-router-dom';
import { SiteNavbar } from '@/components/SiteNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { BMark } from '@/components/BiolanceLogo';
import {
  Eye, Compass, ShieldCheck, Globe, Users,
  ClipboardCheck, Truck, Factory, Settings, Lightbulb, Stethoscope,
} from 'lucide-react';

const SERVICES = [
  { n: '01', icon: ClipboardCheck, title: 'تسجيل المكملات الغذائية والدوائية', desc: 'تسجيل كامل لدى الهيئة العامة للغذاء والدواء السعودية SFDA مع متابعة جميع المراحل.' },
  { n: '02', icon: Truck, title: 'حلول لوجستية متكاملة', desc: 'تنسيق مع شركات الطرف الثالث (Third Party) وتسهيل الاستيراد والتخليص الجمركي.' },
  { n: '03', icon: Factory, title: 'البحث والتوصية بمصانع عالمية', desc: 'اختيار مصانع معتمدة لتصنيع منتجات العملاء وفق أعلى معايير الجودة والسلامة.' },
  { n: '04', icon: Settings, title: 'الإشراف الكامل على التصنيع', desc: 'متابعة التصنيع واللوجستيات حتى الوصول للسوق المحلي أو الدولي.' },
  { n: '05', icon: Lightbulb, title: 'خدمات استشارية متخصصة', desc: 'تطوير وتصميم التركيبات الفعالة للمكملات الغذائية والدوائية، واستشارات فنية وتنظيمية للأجهزة الطبية والرياضية.' },
  { n: '06', icon: Stethoscope, title: 'تسجيل الأجهزة الطبية والرياضية', desc: 'تسجيل كامل لجميع فئات الأجهزة الطبية (Class A إلى Class D) لدى الجهات التنظيمية.' },
];

const PARTNERS = ['NADplus+', 'ELYAK', 'Organa أورجانا', 'Brusho', 'Holistic Wellness Academy'];

const WHY = [
  { icon: ShieldCheck, title: 'خبرة عميقة بالسوق السعودي', desc: 'فهم دقيق لتشريعات ومتطلبات SFDA وتجربة ميدانية في تسجيل أكثر من 50 منتج.' },
  { icon: Globe, title: 'شبكة عالمية من المصانع', desc: 'علاقات مع مصانع معتمدة في أوروبا، آسيا، وأمريكا الشمالية لتلبية احتياجات عملائنا.' },
  { icon: Users, title: 'فريق متخصص', desc: 'مستشارون ذوو كفاءة عالية في علوم التغذية، التنظيم الدوائي، والأجهزة الطبية.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[hsl(var(--brand-forest))] text-white" dir="rtl">
      <SiteNavbar onContact={() => {}} />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #12332A 0%, #0D2620 100%)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 0%, hsl(var(--brand-lime) / 0.15), transparent 70%), radial-gradient(40% 40% at 80% 100%, hsl(var(--brand-sage) / 0.25), transparent 70%)',
          }}
        />
        <div className="container relative mx-auto px-4 py-24 md:py-32 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand-sage))] bg-[hsl(var(--brand-sage))]/10 px-4 py-1.5 text-xs font-semibold text-[hsl(var(--brand-lime))] tracking-wider">
            BIOLANCE — تأسست 2024
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-tight text-[hsl(var(--brand-lime))]">
            من الفكرة إلى الاعتماد
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            شركة استشارية سعودية رائدة في تسجيل المنتجات الصحية لدى هيئة الغذاء والدواء
          </p>
        </div>
      </section>

      {/* Section 1 — نبذة */}
      <section className="container mx-auto px-4 py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--brand-lime))]">نبذة عن الشركة</h2>
            <p className="mt-6 text-white/90 leading-loose text-lg">
              بيولانس هي شركة استشارية سعودية رائدة، تأسست في عام 2024 في مدينة الرياض، متخصصة في تسجيل المكملات الغذائية والأدوية الطبية، بالإضافة إلى الأجهزة الطبية والرياضية، لدى الجهات التنظيمية المختصة داخل المملكة. نقدم خدماتنا للأفراد والشركات محلياً ودولياً، من خلال الإشراف الكامل والتنسيق مع مصانع معتمدة وفق أعلى معايير الجودة والامتثال، مع تركيز عميق على السوق السعودي وفهم دقيق لتشريعات ومتطلبات هيئة الغذاء والدواء السعودية SFDA.
            </p>
          </div>
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  'radial-gradient(60% 60% at 50% 50%, hsl(var(--brand-lime) / 0.18), transparent 70%)',
              }}
            />
            <div className="relative h-full w-full rounded-3xl border border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-sage))]/10 flex items-center justify-center p-12">
              <BMark className="h-40 w-40 md:h-56 md:w-56 hover-scale" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — رؤيتنا */}
      <section className="bg-[hsl(var(--brand-sage))]/10 border-y border-[hsl(var(--brand-sage))]/30">
        <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
          <Eye className="mx-auto h-16 w-16 text-[hsl(var(--brand-lime))]" strokeWidth={1.5} />
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-[hsl(var(--brand-lime))]">رؤيتنا</h2>
          <p className="mt-6 max-w-3xl mx-auto text-white/90 leading-loose text-lg">
            أن نكون الشريك الأول والموثوق في مجال تسجيل المكملات الغذائية والأدوية الطبية، بالإضافة إلى الأجهزة الطبية والرياضية في الشرق الأوسط، من خلال خبرتنا العميقة في السوق، وشبكة علاقاتنا مع أفضل المصانع العالمية، وفريق مستشارينا ذوي الكفاءة العالية في علوم التغذية والتنظيم الدوائي والأجهزة.
          </p>
        </div>
      </section>

      {/* Section 3 — رسالتنا */}
      <section className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <Compass className="mx-auto h-16 w-16 text-[hsl(var(--brand-lime))]" strokeWidth={1.5} />
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-[hsl(var(--brand-lime))]">رسالتنا</h2>
        <p className="mt-6 max-w-3xl mx-auto text-white/90 leading-loose text-lg">
          تمكين عملائنا من دخول السوق بثقة، عبر تقديم خدمات استشارية متكاملة تشمل الإشراف التنظيمي، التنسيق مع مصانع عالمية معتمدة، واختيار أفضل الحلول، وصولاً إلى تسجيل المنتجات بسلاسة لدى الهيئة العامة للغذاء والدواء السعودية.
        </p>
      </section>

      {/* Section 4 — خدماتنا */}
      <section className="bg-[hsl(var(--brand-sage))]/10 border-y border-[hsl(var(--brand-sage))]/30">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-[hsl(var(--brand-lime))]">خدماتنا الستة</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ n, icon: Icon, title, desc }) => (
              <div
                key={n}
                className="group rounded-2xl border border-[hsl(var(--brand-sage))] bg-[hsl(var(--brand-forest))] p-6 transition-all hover:border-[hsl(var(--brand-lime))] hover:shadow-[0_0_30px_-10px_hsl(var(--brand-lime)/0.4)]"
              >
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-10 px-3 items-center justify-center rounded-lg bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-forest))] font-bold text-sm">
                    {n}
                  </div>
                  <Icon className="h-7 w-7 text-[hsl(var(--brand-lime))] opacity-80 group-hover:opacity-100 transition" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[hsl(var(--brand-lime))]">{title}</h3>
                <p className="mt-3 text-white/85 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — شركاؤنا */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[hsl(var(--brand-lime))]">
          علامات تجارية نفخر بشراكتها
        </h2>
        <p className="mt-3 text-center text-white/80">ساعدنا هذه العلامات في الوصول للسوق السعودي بثقة</p>
        <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {PARTNERS.map(name => (
            <div
              key={name}
              className="rounded-xl border border-[hsl(var(--brand-sage))] bg-[hsl(var(--brand-sage))]/10 px-4 py-8 flex items-center justify-center text-center transition-all hover:border-[hsl(var(--brand-lime))] hover:bg-[hsl(var(--brand-lime))]/5"
            >
              <span className="text-white font-semibold text-base md:text-lg">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6 — لماذا بيولانس */}
      <section className="bg-[hsl(var(--brand-sage))]/10 border-y border-[hsl(var(--brand-sage))]/30">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-[hsl(var(--brand-lime))]">
            لماذا تختار بيولانس؟
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {WHY.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center px-4">
                <Icon className="mx-auto h-12 w-12 text-[hsl(var(--brand-lime))]" strokeWidth={1.5} />
                <h3 className="mt-5 text-xl font-bold text-[hsl(var(--brand-lime))]">{title}</h3>
                <p className="mt-3 text-white/85 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: '#D9FF9C' }} className="text-[hsl(var(--brand-forest))]">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">جاهز تسجّل منتجك؟</h2>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            ابدأ رحلتك اليوم مع بيولانس — استشارة أولى مجانية.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/contact">
              <Button className="h-12 px-7 rounded-lg bg-[hsl(var(--brand-forest))] text-[hsl(var(--brand-lime))] font-bold hover:bg-[hsl(var(--brand-forest))]/90">
                تواصل معنا الآن
              </Button>
            </Link>
            <Link to="/#services">
              <Button
                variant="outline"
                className="h-12 px-6 rounded-lg border-2 border-[hsl(var(--brand-forest))] bg-transparent text-[hsl(var(--brand-forest))] font-bold hover:bg-[hsl(var(--brand-forest))] hover:text-[hsl(var(--brand-lime))]"
              >
                تصفح الخدمات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
