'use client';

import { Food } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import SearchForm from '@/app/_components/SerachForm';
import { FoodNameCombobox } from '@/app/_components/SerachForm/FoodNameCombobox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  foods: Food[];
};

export default function SidebarFilter({ foods }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [foodId, setFoodId] = useState('');

  const selectedFood = foods.find(food => food.id === foodId)?.name;

  const foodName = searchParams.get('food');
  const category = searchParams.get('category');
  const minCalories = searchParams.get('min_calories');
  const maxCalories = searchParams.get('max_calories');
  const minPrice = searchParams.get('min_price');
  const maxPrice = searchParams.get('max_price');

  return (
    <div className="w-96">
      <SearchForm foods={foods} sidebar />
    </div>
  );
}
