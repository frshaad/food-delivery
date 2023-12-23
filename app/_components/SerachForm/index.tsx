'use client';

import type { Food } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import FilterSlider from './FilterSlider';
import QueryCategoryInput from './QueryCategoryInput';
import QueryNameInput from './QueryNameInput';

type Props = {
  foods: Food[];
};

export default function NewSearchForm({ foods }: Props) {
  const router = useRouter();
  const pathname = usePathname();
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

  const resetFilters = useCallback(() => {
    router.push(
      pathname +
        '?' +
        updateQueryString([
          ['min_calories', 'none'],
          ['max_calories', 'none'],
          ['min_price', 'none'],
          ['max_price', 'none'],
          ['category', 'none'],
          ['search_query', 'none'],
        ]),
    );
  }, [pathname, router, updateQueryString]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
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
      <CardFooter>
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </CardFooter>
    </Card>
  );
}
