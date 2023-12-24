'use client';

import type { Food } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import FilterSlider from './FilterSlider';
import QueryCategoryInput from './QueryCategoryInput';
import QueryNameInput from './QueryNameInput';

type Props = {
  foods: Food[];
};

export default function NewSearchForm({ foods }: Props) {
  const searchParams = useSearchParams();

  const updateQueryString = useCallback(
    (arr: [name: string, value: string][]) => {
      const params = new URLSearchParams(searchParams);

      for (const key in arr) {
        if (arr[key][1] && arr[key][1] !== 'none') {
          params.set(arr[key][0], arr[key][1] as string);
        } else {
          params.delete(arr[key][0]);
        }
      }

      return params.toString();
    },
    [searchParams],
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Search Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <QueryNameInput updateQueryString={updateQueryString} />
        <QueryCategoryInput updateQueryString={updateQueryString} />
        <FilterSlider
          type="calorie"
          foods={foods}
          updateQueryString={updateQueryString}
        />
        <FilterSlider
          type="price"
          foods={foods}
          updateQueryString={updateQueryString}
        />
      </CardContent>
    </Card>
  );
}
