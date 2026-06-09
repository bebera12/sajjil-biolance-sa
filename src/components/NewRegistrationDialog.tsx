import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CategorySelector } from './CategorySelector';
import { ProductCategory, categoryLabels } from '@/lib/registration-data';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, category: ProductCategory) => void;
}

export function NewRegistrationDialog({ open, onClose, onSubmit }: Props) {
  const [step, setStep] = useState<'category' | 'name'>('category');
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [name, setName] = useState('');

  const handleCategorySelect = (cat: ProductCategory) => {
    setCategory(cat);
    setStep('name');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && name.trim()) {
      onSubmit(name.trim(), category);
      setStep('category');
      setCategory(null);
      setName('');
      onClose();
    }
  };

  const handleClose = () => {
    setStep('category');
    setCategory(null);
    setName('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle>{step === 'category' ? 'اختر فئة المنتج' : 'اسم المنتج'}</DialogTitle>
          <DialogDescription>
            {step === 'category'
              ? 'حدد نوع المنتج الذي تريد تسجيله لدى هيئة الغذاء والدواء'
              : `تسجيل منتج جديد - ${category ? categoryLabels[category] : ''}`}
          </DialogDescription>
        </DialogHeader>

        {step === 'category' ? (
          <CategorySelector onSelect={handleCategorySelect} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-name">اسم المنتج</Label>
              <Input
                id="product-name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="مثال: فيتامين د 1000 وحدة"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" disabled={!name.trim()} className="flex-1">
                بدء التسجيل
              </Button>
              <Button type="button" variant="outline" onClick={() => setStep('category')}>
                رجوع
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
