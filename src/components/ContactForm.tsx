import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import {
  submitConsultation,
  type ConsultationFieldErrors,
  type ConsultationFormValues,
  validateConsultation,
} from '@/lib/consultation';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ContactForm({ open, onClose }: Props) {
  const [form, setForm] = useState<ConsultationFormValues>({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    message: '',
  });
  const [errors, setErrors] = useState<ConsultationFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const update = (key: keyof ConsultationFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, errors: validationErrors } = validateConsultation(form);
    if (!data) {
      setErrors(validationErrors);
      toast({ title: 'يرجى تصحيح الحقول المطلوبة', variant: 'destructive' });
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await submitConsultation(data);
      toast({ title: 'تم إرسال طلبك بنجاح ✅', description: 'سيتواصل معك أحد خبرائنا قريباً' });
      setForm({ name: '', email: '', phone: '', company: '', category: '', message: '' });
      onClose();
    } catch (error) {
      console.error('Failed to send consultation request', error);
      toast({
        title: 'تعذّر إرسال الطلب',
        description: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل على info@biolance.sa',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>طلب استشارة متخصصة</DialogTitle>
          <DialogDescription>أرسل بياناتك وسيتواصل معك فريقنا خلال 24 ساعة</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم *</Label>
            <Input id="name" value={form.name} onChange={update('name')} placeholder="الاسم الكامل" />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني *</Label>
            <Input id="email" type="email" value={form.email} onChange={update('email')} placeholder="example@email.com" dir="ltr" className="text-left" />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">رقم الجوال</Label>
            <Input id="phone" type="tel" value={form.phone} onChange={update('phone')} placeholder="+966" dir="ltr" className="text-left" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">تفاصيل الطلب *</Label>
            <Textarea id="message" value={form.message} onChange={update('message')} placeholder="اشرح ما تحتاج المساعدة فيه..." rows={4} />
            {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري الإرسال...
              </span>
            ) : (
              'إرسال الطلب'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
