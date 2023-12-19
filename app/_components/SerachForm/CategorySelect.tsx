import { Food } from '@prisma/client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Categories } from '@/prisma/initialData';

const categories = [
  { name: 'chicken', id: Categories.chicken },
  { name: 'curry', id: Categories.curry },
  { name: 'icecream', id: Categories.icecream },
  { name: 'fruit', id: Categories.fruit },
  { name: 'drink', id: Categories.drink },
  { name: 'fish', id: Categories.fish },
  { name: 'rice', id: Categories.rice },
];

export default function CategorySelect() {
  return (
    <Select>
      <SelectTrigger className="w-44 capitalize">
        <SelectValue placeholder="category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map(category => (
          <SelectItem
            key={category.id}
            value={category.id}
            className="cursor-pointer capitalize"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
