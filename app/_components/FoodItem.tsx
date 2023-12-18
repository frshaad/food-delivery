'use client';

import { Food } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { addToCart, increaseQuantity } from '@/lib/features/cart/cartSlice';
import { useAppDispatch } from '@/lib/hooks';

type Props = {
  food: Food;
};

export default function FoodItem({ food }: Props) {
  const dispatch = useAppDispatch();

  return (
    <li className="flex w-56 items-center justify-between">
      <p>{food.name}</p>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          dispatch(addToCart(food));
          dispatch(increaseQuantity(food.id));
        }}
      >
        Add
      </Button>
    </li>
  );
}
