import { ProductCategory, categoryLabels, categoryIcons } from '@/lib/registration-data';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  onSelect: (category: ProductCategory) => void;
}

const categories: ProductCategory[] = ['supplement', 'medical_device', 'pharmaceutical', 'cosmetic'];

export function CategorySelector({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map(cat => (
        <Card
          key={cat}
          className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-1"
          onClick={() => onSelect(cat)}
        >
          <CardContent className="flex items-center gap-4 p-6">
            <span className="text-4xl">{categoryIcons[cat]}</span>
            <span className="text-lg font-semibold">{categoryLabels[cat]}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
