'use client';

import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Categories } from '@/prisma/initialData';
import { Category } from '@/types';

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
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category') as Category;
  const defaultCategory = Categories[categoryFromUrl];

  return (
    <Select onValueChange={setCategory} defaultValue={defaultCategory}>
      <SelectTrigger className="w-full capitalize">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          key={'0'}
          value={'none'}
          className="cursor-pointer capitalize"
        >
          {'---'}
        </SelectItem>
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
