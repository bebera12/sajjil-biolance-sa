import { z } from 'zod';

export const consultationSchema = z.object({
  name: z.string().trim().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(100),
  email: z.string().trim().email('البريد الإلكتروني غير صالح').max(255),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  company: z.string().trim().max(150).optional().or(z.literal('')),
  category: z.string().trim().max(100).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'الرسالة يجب أن تكون 10 أحرف على الأقل').max(2000),
});

export type ConsultationFormValues = z.infer<typeof consultationSchema>;
export type ConsultationFieldErrors = Partial<Record<keyof ConsultationFormValues, string>>;

const STORAGE_KEY = 'sajjil_contact_submissions';
const WEB3FORMS_ACCESS_KEY = 'b178e9de-38e3-4f7a-9705-06f5657ff06e';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export function validateConsultation(form: ConsultationFormValues): {
  data: ConsultationFormValues | null;
  errors: ConsultationFieldErrors;
} {
  const result = consultationSchema.safeParse(form);

  if (result.success) {
    return { data: result.data, errors: {} };
  }

  const fieldErrors: ConsultationFieldErrors = {};
  result.error.issues.forEach((issue) => {
    const key = issue.path[0] as keyof ConsultationFormValues;
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  });

  return { data: null, errors: fieldErrors };
}

export async function submitConsultation(data: ConsultationFormValues) {
  const submittedAt = new Date().toISOString();

  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.unshift({ ...data, submittedAt });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // ignore
    }
  }

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `طلب استشارة جديد من ${data.name}`,
    from_name: 'Biolance Website',
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    company: data.company || '',
    category: data.category || '',
    message: data.message,
    submitted_at: submittedAt,
    replyto: data.email,
  };

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json().catch(() => ({}));

  if (!res.ok || !result.success) {
    throw new Error(result.message || 'Failed to send form');
  }

  return { submittedAt };
}
