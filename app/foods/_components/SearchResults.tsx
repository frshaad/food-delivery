'use client';

import { Food } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

import FoodCard from '@/app/_components/FoodCard';
import { Categories } from '@/prisma/initialData';
import { Category } from '@/types';

type Props = {
  foods: Food[];
};

export default function SearchResults({ foods }: Props) {
  const searchParams = useSearchParams();
  // get search params
  const queryParam = searchParams.get('searchQuery');
  const categoryParam = searchParams.get('category') as Category;
  const minCalorieParam = parseInt(searchParams.get('min_calories')!);
  const maxCalorieParam = parseInt(searchParams.get('max_calories')!);
  const minPriceParam = parseInt(searchParams.get('min_price')!);
  const maxPriceParam = parseInt(searchParams.get('max_price')!);

  let categoryId: string;
  for (const key in Categories) {
    if (key === categoryParam) {
      categoryId = Categories[key];
    }
  }

  // get filterd foods based on conditions
  const filterdFoods = foods
    .filter(food =>
      queryParam ? food.name.toLowerCase().includes(queryParam) : food,
    )
    .filter(food => (categoryParam ? food.categoryId === categoryId : food))
    .filter(food => (minCalorieParam ? food.calories >= minCalorieParam : food))
    .filter(food => (maxCalorieParam ? food.calories <= maxCalorieParam : food))
    .filter(food => (minPriceParam ? food.price >= minPriceParam : food))
    .filter(food => (maxPriceParam ? food.price <= maxPriceParam : food));

  // show the results
  return (
    <div className="w-full space-y-20 px-2 py-10">
      <h3 className="text-lg">
        Number of foods found:{' '}
        <span className="font-medium">{filterdFoods.length}</span>
      </h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {filterdFoods.map(food => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}
