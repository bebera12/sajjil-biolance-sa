export type ProductCategory = 'supplement' | 'medical_device' | 'pharmaceutical' | 'cosmetic';

export type StepStatus = 'not_started' | 'in_progress' | 'complete';

export interface RegistrationStep {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
}

export interface ProductRegistration {
  id: string;
  name: string;
  category: ProductCategory;
  createdAt: string;
  steps: RegistrationStep[];
}

export const categoryLabels: Record<ProductCategory, string> = {
  supplement: 'المكملات الغذائية',
  medical_device: 'الأجهزة الطبية',
  pharmaceutical: 'المستحضرات الصيدلانية',
  cosmetic: 'مستحضرات التجميل',
};

export const categoryIcons: Record<ProductCategory, string> = {
  supplement: '💊',
  medical_device: '🩺',
  pharmaceutical: '🧪',
  cosmetic: '✨',
};

export const categorySteps: Record<ProductCategory, Omit<RegistrationStep, 'status'>[]> = {
  supplement: [
    { id: 's1', title: 'تسجيل حساب في منصة SFDA', description: 'إنشاء حساب مؤسسي على منصة هيئة الغذاء والدواء الإلكترونية والحصول على اعتماد المنشأة.' },
    { id: 's2', title: 'شهادة التحليل المخبري (COA)', description: 'تقديم تقرير تحليل مخبري معتمد يثبت مطابقة المنتج للمواصفات.' },
    { id: 's3', title: 'بطاقة البيان التغذوي', description: 'إعداد بطاقة تعريف المنتج شاملة المكونات والقيم الغذائية باللغة العربية.' },
    { id: 's4', title: 'شهادة التصنيع الجيد (GMP)', description: 'تقديم شهادة ممارسات التصنيع الجيد من المصنع المنتج.' },
    { id: 's5', title: 'شهادة البيع الحر (FSC)', description: 'الحصول على شهادة البيع الحر من بلد المنشأ.' },
    { id: 's6', title: 'دفع الرسوم والمراجعة النهائية', description: 'سداد رسوم التسجيل ومتابعة حالة الطلب حتى الموافقة.' },
  ],
  medical_device: [
    { id: 'm1', title: 'تصنيف الجهاز الطبي', description: 'تحديد فئة الجهاز (I, IIa, IIb, III) وفقاً لنظام تصنيف SFDA.' },
    { id: 'm2', title: 'التسجيل في نظام MDMA', description: 'تسجيل المنشأة والجهاز في نظام إدارة الأجهزة الطبية.' },
    { id: 'm3', title: 'الملف الفني (Technical File)', description: 'إعداد ملف فني شامل يتضمن التصميم والمواصفات والاختبارات.' },
    { id: 'm4', title: 'شهادة المطابقة (CE/FDA)', description: 'تقديم شهادة مطابقة من جهة معترف بها دولياً.' },
    { id: 'm5', title: 'تقرير السلامة السريرية', description: 'تقديم بيانات وتقارير السلامة والفعالية السريرية.' },
    { id: 'm6', title: 'خطة متابعة ما بعد السوق', description: 'إعداد خطة مراقبة الجهاز بعد طرحه في السوق.' },
    { id: 'm7', title: 'دفع الرسوم والحصول على الترخيص', description: 'سداد الرسوم واستلام ترخيص تسويق الجهاز الطبي.' },
  ],
  pharmaceutical: [
    { id: 'p1', title: 'تسجيل المنشأة الصيدلانية', description: 'تسجيل المنشأة في نظام SFDA كمصنع أو مستورد أدوية.' },
    { id: 'p2', title: 'ملف الجودة (CTD Module 3)', description: 'إعداد ملف الجودة الشامل وفق نموذج CTD.' },
    { id: 'p3', title: 'الدراسات السريرية (CTD Module 5)', description: 'تقديم نتائج الدراسات السريرية والحيوية التكافؤية.' },
    { id: 'p4', title: 'دراسات الثبات', description: 'تقديم دراسات ثبات المنتج تحت ظروف التخزين المختلفة.' },
    { id: 'p5', title: 'التفتيش على المصنع', description: 'اجتياز تفتيش SFDA على موقع التصنيع.' },
    { id: 'p6', title: 'تسعير الدواء', description: 'تقديم ملف التسعير والحصول على موافقة السعر.' },
    { id: 'p7', title: 'الموافقة النهائية والتسويق', description: 'الحصول على إذن التسويق وبدء التوزيع.' },
  ],
  cosmetic: [
    { id: 'c1', title: 'إخطار المنتج التجميلي', description: 'تسجيل إخطار المنتج على منصة SFDA الإلكترونية.' },
    { id: 'c2', title: 'تقرير سلامة المنتج (CPSR)', description: 'إعداد تقرير تقييم سلامة المنتج التجميلي من مختبر معتمد.' },
    { id: 'c3', title: 'قائمة المكونات (INCI)', description: 'تقديم قائمة المكونات وفق التسمية الدولية INCI.' },
    { id: 'c4', title: 'بطاقة المنتج باللغة العربية', description: 'إعداد بطاقة تعريف المنتج وطريقة الاستخدام باللغة العربية.' },
    { id: 'c5', title: 'شهادة المنشأ والبيع الحر', description: 'تقديم شهادات المنشأ والبيع الحر مصدّقة من السفارة.' },
    { id: 'c6', title: 'دفع الرسوم والمراجعة', description: 'إتمام السداد ومتابعة الطلب حتى الموافقة.' },
  ],
};

export function createRegistration(name: string, category: ProductCategory): ProductRegistration {
  return {
    id: crypto.randomUUID(),
    name,
    category,
    createdAt: new Date().toISOString(),
    steps: categorySteps[category].map(s => ({ ...s, status: 'not_started' as StepStatus })),
  };
}

export function getProgress(reg: ProductRegistration): number {
  const completed = reg.steps.filter(s => s.status === 'complete').length;
  return Math.round((completed / reg.steps.length) * 100);
}

export function getStatusLabel(status: StepStatus): string {
  const labels: Record<StepStatus, string> = {
    not_started: 'لم يبدأ',
    in_progress: 'قيد التنفيذ',
    complete: 'مكتمل',
  };
  return labels[status];
}
