'use client';

import { Food } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getKeyByValue } from '@/helper/getEnumKey';
import { cn } from '@/lib/utils';

import { calcRange } from './calcMinMax.util';
import CategorySelect from './CategorySelect';
import { FoodNameCombobox } from './FoodNameCombobox';
import SearchSlider from './SearchSlider';

type Props = {
  foods: Food[];
  sidebar?: boolean;
};

export default function SearchForm({ foods, sidebar }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const [defaultMinPrice, defaultMaxPrice] = calcRange(foods, 'price');
  const [defaultMinCalorie, defaultMaxCalorie] = calcRange(foods, 'calories');

  const [queryString, setQueryString] = useState('');

  const [category, setCategory] = useState('');
  const selectedCategory =
    category === 'none' ? undefined : getKeyByValue(category)!;

  const [calorieRange, setCalorieRange] = useState<number[]>([
    defaultMinCalorie,
    defaultMaxCalorie,
  ]);
  const [priceRange, setPriceRange] = useState<number[]>([
    defaultMinPrice,
    defaultMaxPrice,
  ]);

  const handleSearch = useCallback(() => {
    if (queryString) {
      params.set('searchQuery', queryString);
    }
    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else if (selectedCategory === undefined) {
      params.delete('category');
    }
    if (calorieRange[0] && calorieRange[0] !== defaultMinCalorie) {
      params.set('min_calories', calorieRange[0].toString());
    }
    if (calorieRange[1] && calorieRange[1] !== defaultMaxCalorie) {
      params.set('max_calories', calorieRange[1].toString());
    }
    if (priceRange[0] && priceRange[0] !== defaultMinPrice) {
      params.set('min_price', priceRange[0].toString());
    }
    if (priceRange[1] && priceRange[1] !== defaultMaxPrice) {
      params.set('max_price', priceRange[1].toString());
    }

    const queryParam = params.toString();

    if (queryParam.length > 0) {
      router.push('/foods?' + queryParam);
    } else {
      router.push('/foods');
    }
  }, [
    calorieRange,
    defaultMaxCalorie,
    defaultMaxPrice,
    defaultMinCalorie,
    defaultMinPrice,
    params,
    priceRange,
    queryString,
    router,
    selectedCategory,
  ]);

  useEffect(() => {
    if (sidebar) {
      handleSearch();
    }
  }, [handleSearch, sidebar]);

  const isInSearchMode =
    !!queryString ||
    !!selectedCategory ||
    calorieRange[0] !== defaultMinCalorie ||
    calorieRange[1] !== defaultMaxCalorie ||
    priceRange[0] !== defaultMinPrice ||
    priceRange[1] !== defaultMaxPrice;

  return (
    <div className="z-10 mt-10 flex items-center justify-center">
      <Card
        className={cn('w-full max-w-lg space-y-5', {
          'sm:min-w-[480px]': !sidebar,
        })}
      >
        <CardHeader>
          <CardTitle>Search Foods</CardTitle>
          <CardDescription>Savoring Moments, Creating Memories</CardDescription>
        </CardHeader>
        <CardContent
          className={cn('space-y-8', {
            'space-y-9': !sidebar,
          })}
        >
          <FoodNameCombobox setQueryString={setQueryString} />
          <CategorySelect setCategory={setCategory} />

          <SearchSlider
            min={defaultMinCalorie}
            max={defaultMaxCalorie}
            type="calories"
            setUpdatedRange={setCalorieRange}
            sidebar={sidebar}
          />
          <SearchSlider
            min={defaultMinPrice}
            max={defaultMaxPrice}
            type="price"
            setUpdatedRange={setPriceRange}
            sidebar={sidebar}
          />
        </CardContent>
        {!sidebar && (
          <CardFooter className="flex justify-end">
            <Button onClick={handleSearch} className="w-full">
              {isInSearchMode ? 'Search for food' : 'Explore All Foods'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
