'use client';

import type { Food } from '@prisma/client';

import { addToCart } from '@/lib/features/cart/cartSlice';
import { useAppDispatch } from '@/lib/hooks';

type Props = {
  foods: Food[];
};

export default function FoodShop({ foods }: Props) {
  const dispatch = useAppDispatch();

  return (
    <ul className="w-80 space-y-2">
      {foods.map(food => (
        <li
          key={food.id}
          className="flex w-full items-center justify-between gap-8"
        >
          <p>{food.name}</p>
          <button
            className="rounded border px-2 capitalize"
            onClick={() => dispatch(addToCart(food))}
          >
            add to cart
          </button>
        </li>
      ))}
    </ul>
  );
}
