
## الهدف
أي عميل يعبّي فورم الاستشارة في الموقع → يرسل تلقائياً:
1. إيميل لك على **info@biolance.sa** فيه بيانات العميل كاملة
2. إيميل تأكيد للعميل إن طلبه استُلم وسيتم الرد خلال 24 ساعة

---

## المتطلبات (ترتيب تلقائي)

### 1) تفعيل Lovable Cloud
الباك إند المدمج — مطلوب لتشغيل أي إرسال إيميل. (بدون حسابات خارجية، يتفعّل بضغطة)

### 2) ربط نطاق الإيميل `biolance.sa`
نضيف سجلات DNS بسيطة (NS records) في لوحة bluvalt.sa عشان الإيميلات تطلع باسم بيولانس الرسمي مثل: `notify@biolance.sa` بدل إيميل افتراضي.
- سيظهر لك ديالوج إعداد النطاق تختار فيه `biolance.sa`
- أعطيك السجلات بالتفصيل وتضيفها في bluvalt
- التحقق آلي (10 دقائق – 24 ساعة عادة)

### 3) إنشاء قوالب الإيميل (Templates)
قالبين بهوية بيولانس (نفس الألوان: forest/lime/cyan):
- **`contact-notification`** → يوصلك أنت على info@biolance.sa: بيانات العميل (الاسم، الإيميل، الجوال، الشركة، الفئة، الرسالة)
- **`contact-confirmation`** → يوصل العميل: شكر + تأكيد الاستلام + وعد بالرد خلال 24 ساعة

### 4) ربط الفورم
في `src/pages/Contact.tsx` نستبدل حفظ localStorage بـ:
- استدعاء Edge Function `send-transactional-email` مرتين (واحدة لك، واحدة للعميل)
- نفس تجربة المستخدم الحالية (شاشة النجاح تبقى كما هي)
- إبقاء validation بـ zod كما هو

---

## بعد التنفيذ
- تجربة فورية: تعبّي الفورم بإيميلك التجريبي → تستلم رسالتين خلال ثواني (واحدة على info@biolance.sa والثانية على الإيميل اللي عبّيته)
- ⚠️ ملاحظة: الإرسال يبدأ فعلياً بعد ما يتحقق DNS للنطاق. قبل ذلك ينحفظ في طابور ويُرسل تلقائياً بعد التحقق

---

## الخطوات الفنية (تفاصيل للمرجع)

1. `supabase--enable` لتفعيل Cloud
2. عرض ديالوج إعداد النطاق (`presentation-open-email-setup`)
3. `email_domain--setup_email_infra` (طوابير + cron)
4. `email_domain--scaffold_transactional_email` (يولّد Edge Function `send-transactional-email`)
5. إنشاء قالبين في `supabase/functions/_shared/transactional-email-templates/` + تسجيلهم في `registry.ts`
6. تعديل `Contact.tsx` لاستدعاء الـ Edge Function
7. `supabase--deploy_edge_functions`

موافق نبدأ؟
