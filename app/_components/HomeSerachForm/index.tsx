'use client';

import type { Food } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { calcRange } from './calcRange.util';
import FilterSlider from './FilterSlider';
import QueryCategoryInput from './QueryCategoryInput';
import QueryNameInput from './QueryNameInput';

type Props = {
  foods: Food[];
};

export default function NewSearchForm({ foods }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minCalorieBase, maxCalorieBase] = calcRange(foods, 'calorie');
  const [minPriceBase, maxPriceBase] = calcRange(foods, 'price');

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('none');
  const [calorieRange, setCalorieRange] = useState<[number, number]>([
    minCalorieBase,
    maxCalorieBase,
  ]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceBase,
    maxPriceBase,
  ]);

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  useEffect(() => {
    if (searchQuery.length !== 0) {
      params.set('search_query', searchQuery);
    } else {
      params.delete(searchQuery);
    }

    if (category !== 'none') {
      params.set('category', category);
    } else {
      params.delete(category);
    }

    if (calorieRange[0] !== minCalorieBase) {
      params.set('min_calories', calorieRange[0].toString());
    } else {
      params.delete('min_calories');
    }

    if (calorieRange[1] !== maxCalorieBase) {
      params.set('max_calories', calorieRange[1].toString());
    } else {
      params.delete('max_calories');
    }

    if (priceRange[0] !== minPriceBase) {
      params.set('min_price', priceRange[0].toString());
    } else {
      params.delete('min_price');
    }

    if (priceRange[1] !== maxPriceBase) {
      params.set('max_price', priceRange[1].toString());
    } else {
      params.delete('max_price');
    }
  }, [
    category,
    params,
    searchParams,
    searchQuery,
    calorieRange,
    priceRange,
    minCalorieBase,
    maxCalorieBase,
    minPriceBase,
    maxPriceBase,
  ]);

  const isInSearchMode = params.toString().length === 0;

  const submitSearch = () => {
    router.push('/foods?' + params.toString());
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Search Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <QueryNameInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <QueryCategoryInput setCategory={setCategory} />
        <FilterSlider type="calorie" foods={foods} setRange={setCalorieRange} />
        <FilterSlider type="price" foods={foods} setRange={setPriceRange} />
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full capitalize" onClick={submitSearch}>
          {isInSearchMode ? 'Explore all foods' : 'Search for the food'}
        </Button>
      </CardFooter>
    </Card>
  );
}
