import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ContactForm({ open, onClose }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: 'يرجى تعبئة جميع الحقول المطلوبة', variant: 'destructive' });
      return;
    }
    toast({ title: 'تم إرسال طلبك بنجاح ✅', description: 'سيتواصل معك أحد خبرائنا قريباً' });
    setName(''); setEmail(''); setPhone(''); setMessage('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>طلب استشارة متخصصة</DialogTitle>
          <DialogDescription>أرسل بياناتك وسيتواصل معك فريقنا خلال 24 ساعة</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم *</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="الاسم الكامل" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني *</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" dir="ltr" className="text-left" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">رقم الجوال</Label>
            <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+966" dir="ltr" className="text-left" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">تفاصيل الطلب *</Label>
            <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="اشرح ما تحتاج المساعدة فيه..." rows={4} />
          </div>
          <Button type="submit" className="w-full">إرسال الطلب</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
