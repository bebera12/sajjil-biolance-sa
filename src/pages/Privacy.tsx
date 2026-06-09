import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNavbar />
      <main className="container mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#D9FF9C] mb-2">سياسة الخصوصية</h1>
        <p className="text-white/70 mb-10">آخر تحديث: 3 مايو 2026</p>

        <section className="space-y-6 leading-loose text-white/90">
          <p>
            نلتزم في <strong className="text-[#D9FF9C]">بيولانس</strong> بحماية خصوصية مستخدمي التطبيق
            والموقع. توضّح هذه السياسة طبيعة المعلومات التي نجمعها وكيفية استخدامها.
          </p>

          <h2 className="text-2xl font-bold text-[#D9FF9C] mt-8">المعلومات التي نجمعها</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>المعلومات التي تُدخلها طوعاً في نموذج التواصل (الاسم، البريد الإلكتروني، الرسالة).</li>
            <li>تقدّم الـ checklists الخاصة بك يُحفظ محلياً على جهازك فقط (localStorage) ولا يُرسل إلى خوادمنا.</li>
            <li>لا نستخدم تتبّع إعلاني ولا نشارك بياناتك مع أطراف ثالثة لأغراض تسويقية.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#D9FF9C] mt-8">كيف نستخدم المعلومات</h2>
          <ul className="list-disc pr-6 space-y-2">
            <li>الرد على استفساراتك وطلبات عروض الأسعار.</li>
            <li>تحسين تجربة المستخدم داخل التطبيق.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#D9FF9C] mt-8">حقوقك</h2>
          <p>
            يحقّ لك طلب حذف بياناتك في أي وقت بإرسال طلب إلى{" "}
            <a href="mailto:hello@biolance.com" className="text-[#D9FF9C] underline">
              hello@biolance.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold text-[#D9FF9C] mt-8">الأمان</h2>
          <p>
            نستخدم اتصالات HTTPS مشفّرة لجميع طلبات الشبكة، ولا نخزّن أي بيانات حساسة على أجهزتنا.
          </p>

          <h2 className="text-2xl font-bold text-[#D9FF9C] mt-8">التواصل</h2>
          <p>
            لأي استفسار حول الخصوصية، تواصل معنا عبر{" "}
            <a href="/contact" className="text-[#D9FF9C] underline">صفحة التواصل</a>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Privacy;
