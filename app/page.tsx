import prisma from '@/lib/db';

import FoodShop from './components/FoodShop';
import FoodShow from './components/FoodShow';

async function fetchFoods() {
  const foods = await prisma.food.findMany();
  return foods;
}

export default async function HomePage() {
  const foods = await fetchFoods();
  const selectedFoods = foods.slice(0, 4);

  return (
    <div>
      <h1>HomePage</h1>
      <h2>Shop</h2>
      <FoodShop foods={selectedFoods} />
      <hr />
      <h2>Cart</h2>
      <FoodShow />
    </div>
  );
}
