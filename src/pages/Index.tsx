import { useState } from "react";
import { useRegistrations } from "@/hooks/use-registrations";
import { DashboardCard } from "@/components/DashboardCard";
import { RegistrationChecklist } from "@/components/RegistrationChecklist";
import { NewRegistrationDialog } from "@/components/NewRegistrationDialog";
import { ContactForm } from "@/components/ContactForm";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, ShieldCheck, Rocket } from "lucide-react";

export default function Index() {
  const { registrations, addRegistration, updateStepStatus, deleteRegistration } = useRegistrations();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const selectedReg = registrations.find((r) => r.id === selectedId);

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-forest))] text-white" dir="rtl">
      <SiteNavbar onContact={() => setShowContact(true)} />

      <main>
        {selectedReg ? (
          <section className="container mx-auto max-w-3xl px-4 py-10">
            <RegistrationChecklist
              registration={selectedReg}
              onUpdateStep={(stepId, status) => updateStepStatus(selectedReg.id, stepId, status)}
              onBack={() => setSelectedId(null)}
              onRequestHelp={() => setShowContact(true)}
            />
          </section>
        ) : (
          <>
            {/* Hero */}
            <section id="home" className="relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(60% 50% at 80% 0%, hsl(var(--brand-lime) / 0.18), transparent 70%), radial-gradient(50% 40% at 10% 20%, hsl(var(--brand-sage) / 0.25), transparent 70%)",
                }}
              />
              <div className="container relative mx-auto px-4 py-20 md:py-28 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand-sage))]/60 bg-[hsl(var(--brand-sage))]/10 px-3 py-1 text-xs text-[hsl(var(--brand-cyan))] mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  دليلك الذكي للتسجيل لدى SFDA
                </div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[hsl(var(--brand-lime))]">
                  من الفكرة إلى الاعتماد
                </h1>
                <p className="mt-5 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                  دليلك الذكي لتسجيل منتجاتك الصحية لدى الهيئة العامة للغذاء والدواء
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    onClick={() => setShowNewDialog(true)}
                    className="h-12 px-7 text-base font-bold rounded-lg bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-forest))] hover:bg-white"
                  >
                    ابدأ رحلة التسجيل — مجاناً
                  </Button>
                  <Button
                    onClick={() => setShowContact(true)}
                    variant="outline"
                    className="h-12 px-6 rounded-lg border-[hsl(var(--brand-lime))] text-[hsl(var(--brand-lime))] bg-transparent hover:bg-[hsl(var(--brand-lime))] hover:text-[hsl(var(--brand-forest))]"
                  >
                    طلب استشارة
                  </Button>
                </div>
                <p className="mt-6 text-sm text-[hsl(var(--brand-sage))]">أكثر من 50 منتج مسجّل بنجاح</p>
              </div>
            </section>

            {/* Services */}
            <section id="services" className="container mx-auto px-4 py-14">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { icon: ShieldCheck, title: "تسجيل تنظيمي شامل", desc: "متطلبات SFDA دقيقة لكل فئة منتج" },
                  { icon: Rocket, title: "سرعة في التنفيذ", desc: "قائمة مهام ذكية تُسرّع رحلة الاعتماد" },
                  { icon: Sparkles, title: "استشارات الخبراء", desc: "فريق تنظيمي بخبرة عميقة في السوق السعودي" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="card-hover rounded-xl border border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-sage))]/10 p-6"
                  >
                    <Icon className="h-7 w-7 text-[hsl(var(--brand-lime))]" />
                    <h3 className="mt-4 text-lg font-bold text-[hsl(var(--brand-lime))]">{title}</h3>
                    <p className="mt-2 text-sm text-white/80 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Dashboard */}
            <section id="pricing" className="container mx-auto px-4 pb-16 max-w-4xl">
              <div className="rounded-2xl border border-[hsl(var(--brand-sage))]/50 bg-[hsl(var(--brand-sage))]/10 p-6 md:p-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[hsl(var(--brand-lime))]">منتجاتك المسجلة</h2>
                    <p className="text-sm text-white/70 mt-1">تابع حالة كل منتج وتقدّم خطواته</p>
                  </div>
                  <Button
                    onClick={() => setShowNewDialog(true)}
                    className="gap-2 rounded-lg bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-forest))] font-bold hover:bg-white"
                  >
                    <Plus className="h-4 w-4" />
                    تسجيل منتج جديد
                  </Button>
                </div>

                {registrations.length > 0 ? (
                  <div className="mt-6 grid gap-3">
                    {registrations.map((reg) => (
                      <DashboardCard
                        key={reg.id}
                        registration={reg}
                        onClick={() => setSelectedId(reg.id)}
                        onDelete={() => deleteRegistration(reg.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-8 text-center py-10 text-white/70 space-y-2">
                    <p className="text-5xl">📋</p>
                    <p>لم تقم بتسجيل أي منتج بعد</p>
                    <p className="text-sm text-[hsl(var(--brand-sage))]">اضغط على "تسجيل منتج جديد" للبدء</p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <SiteFooter />

      <NewRegistrationDialog
        open={showNewDialog}
        onClose={() => setShowNewDialog(false)}
        onSubmit={(name, category) => {
          const id = addRegistration(name, category);
          setSelectedId(id);
        }}
      />
      <ContactForm open={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}
