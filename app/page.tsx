import { fetchFoods } from '@/helper/fetchAllFoods';

import FoodCard from './_components/FoodCard';

export default async function HomePage() {
  const foods = await fetchFoods();
  const selectedFood = foods.slice(0, 4);

  return (
    <div>
      <h1 className="mb-20">HomePage</h1>
      <ul className="grid grid-cols-1 items-center justify-center space-y-4 px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {selectedFood.map(food => (
          <FoodCard key={food.id} food={food} />
        ))}
      </ul>
    </div>
  );
}
