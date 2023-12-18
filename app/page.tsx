import { fetchFoods } from '@/helper/fetchAllFoods';

import FoodItem from './_components/FoodItem';

export default async function HomePage() {
  const foods = await fetchFoods();
  const selectedFood = foods.slice(0, 4);

  return (
    <div>
      <h1>HomePage</h1>
      <ul className="space-y-4">
        {selectedFood.map(food => (
          <FoodItem key={food.id} food={food} />
        ))}
      </ul>
    </div>
  );
}
