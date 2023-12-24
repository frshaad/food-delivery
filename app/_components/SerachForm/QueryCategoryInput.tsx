'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { CATEGORY_OPTIONS } from './categoryOptions.constant';

type Props = {
  updateQueryString: (arr: [name: string, value: string][]) => string;
};

export default function QueryCategoryInput({ updateQueryString }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const stateFromUrl = searchParams.has('category')
    ? searchParams.get('category')
    : '';

  const [value, setValue] = useState<string>(stateFromUrl as string);
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    router.push(
      pathname + '?' + updateQueryString([['category', debouncedValue]]),
    );
  }, [debouncedValue, pathname, router, updateQueryString]);

  return (
    <Select onValueChange={val => setValue(val)} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Category" className="capitalize" />
      </SelectTrigger>
      <SelectContent className="w-full">
        {CATEGORY_OPTIONS.map(category => (
          <SelectItem
            key={category.id}
            value={category.value}
            className="capitalize"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
