import { MenuSquare } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

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

type Props = {
  setCategory: Dispatch<SetStateAction<string>>;
};

export default function CategorySelect({ setCategory }: Props) {
  return (
    <Select onValueChange={setCategory}>
      <SelectTrigger className="w-44 capitalize">
        <MenuSquare className="mr-2" />
        <SelectValue placeholder="Select category" />
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
