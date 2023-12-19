'use client';

import { Food } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

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

import CategorySelect from './CategorySelect';
import { FoodNameCombobox } from './FoodNameCombobox';
import SearchSlider from './SearchSlider';

type Props = {
  foods: Food[];
};

export default function SearchForm({ foods }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const defaultMinPrice = foods.reduce((p, c) => {
    return c.price < p.price ? c : p;
  }).price;
  const defaultMaxPrice = foods.reduce((p, c) => {
    return c.price > p.price ? c : p;
  }).price;

  const defaultMinCalorie = foods.reduce((p, c) => {
    return c.calories < p.calories ? c : p;
  }).calories;
  const defaultMaxCalorie = foods.reduce((p, c) => {
    return c.calories > p.calories ? c : p;
  }).calories;

  const [foodId, setFoodId] = useState('');
  const [category, setCategory] = useState('');
  const [calorieRange, setCalorieRange] = useState<number[]>([
    defaultMinCalorie,
    defaultMaxCalorie,
  ]);
  const [priceRange, setPriceRange] = useState<number[]>([
    defaultMinPrice,
    defaultMaxPrice,
  ]);

  const selectedFood = foods.find(food => food.id === foodId)?.name;
  const selectedCategory = getKeyByValue(category);
  const minCalorieRange = calorieRange[0];
  const maxCalorieRange = calorieRange[1];
  const minPrice = priceRange[0];
  const maxPrice = priceRange[1];

  function handleSearch() {
    const params = new URLSearchParams(searchParams);
    if (selectedFood) {
      params.set('food', selectedFood);
    }
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    if (minCalorieRange && minCalorieRange !== defaultMinCalorie) {
      params.set('min-calories', minCalorieRange.toString());
    }
    if (maxCalorieRange && maxCalorieRange !== defaultMaxCalorie) {
      params.set('max-calories', maxCalorieRange.toString());
    }
    if (minPrice && minPrice !== defaultMinPrice) {
      params.set('min-price', minPrice.toString());
    }
    if (maxPrice && maxPrice !== defaultMaxPrice) {
      params.set('max-price', maxPrice.toString());
    }

    const queryParam = params.toString();

    if (queryParam.length > 0) {
      router.push('/foods?' + queryParam);
    } else {
      router.push('/foods');
    }
  }

  const isInSearchMode =
    !!selectedFood ||
    !!selectedCategory ||
    minCalorieRange !== defaultMinCalorie ||
    maxCalorieRange !== defaultMaxCalorie ||
    minPrice !== defaultMinPrice ||
    maxPrice !== defaultMaxPrice;

  return (
    <div className="z-10 mt-10 flex items-center justify-center">
      <Card className="w-full max-w-lg space-y-5">
        <CardHeader>
          <CardTitle>Search Foods</CardTitle>
          <CardDescription>Savoring Moments, Creating Memories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center justify-between gap-2">
            <FoodNameCombobox
              foods={foods}
              foodId={foodId}
              setFoodId={setFoodId}
            />
            <CategorySelect setCategory={setCategory} />
          </div>

          <SearchSlider
            min={defaultMinCalorie}
            max={defaultMaxCalorie}
            label="Calories"
            values={calorieRange}
            setUpdatedRange={setCalorieRange}
          />
          <SearchSlider
            min={defaultMinPrice}
            max={defaultMaxPrice}
            values={priceRange}
            label="Price"
            setUpdatedRange={setPriceRange}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSearch} className="w-full">
            {isInSearchMode ? 'Search for food' : 'Explore All Foods'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
