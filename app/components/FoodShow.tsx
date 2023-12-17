'use client';

import {
  removeFromCart,
  selectAllCartItems,
} from '@/lib/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

export default function FoodShow() {
  const cartItems = useAppSelector(selectAllCartItems);
  const dispatch = useAppDispatch();

  console.log({ cartItems });

  return (
    <ul>
      {cartItems.map(food => (
        <li key={food.id}>
          {food.name}
          <button
            className="rounded border px-2 capitalize"
            onClick={() => dispatch(removeFromCart(food.id))}
          >
            remove
          </button>
        </li>
      ))}
    </ul>
  );
}
