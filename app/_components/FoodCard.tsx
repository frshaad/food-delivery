'use client';

import { Food } from '@prisma/client';
import { BadgeMinus, BadgePlus, DollarSign, Flame } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  addToCart,
  increaseQuantity,
  removeFromCart,
  selectAllCartItems,
} from '@/lib/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

type Props = {
  food: Food;
};

export default function FoodCard({ food }: Props) {
  const { calories, id, imageUrl, name, price } = food;
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectAllCartItems);
  const isFoodInCart = cart.find(item => item.id === id);

  return (
    <div className="relative flex h-40 w-72 min-w-[275px] flex-col items-center justify-around rounded-lg border bg-card py-2 pr-4 backdrop-blur-lg transition hover:shadow-lg md:min-w-[300px]">
      <div className="flex w-full items-center justify-between">
        <div className="-mt-16 h-36 w-36 drop-shadow-2xl">
          <Image
            src={imageUrl}
            alt=""
            width={300}
            height={300}
            className="h-full w-full object-contain"
          />
        </div>
        {isFoodInCart ? (
          <Button
            size="icon"
            variant="ghost"
            color=""
            onClick={() => dispatch(removeFromCart(id))}
            className="relative -right-3 -top-7 text-destructive hover:bg-destructive/30 hover:text-destructive"
          >
            <BadgeMinus />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            color="red"
            onClick={() => {
              dispatch(addToCart(food));
              dispatch(increaseQuantity(id));
            }}
            className="relative -right-3 -top-7 text-primary hover:bg-primary/30 hover:text-primary"
          >
            <BadgePlus />
          </Button>
        )}
      </div>

      <div className="-mt-10 flex w-full flex-col items-end justify-end">
        <p className="text-base font-semibold md:text-lg">{name}</p>
        <div className="mb-2 flex items-center gap-1 font-medium">
          <Flame className="text-primary" size={15} />
          <p className="flex items-center gap-1">
            {calories} <span className="text-sm font-thin">calories</span>
          </p>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center text-xl font-semibold">
            <DollarSign className="text-primary" size={15} />
            <span>{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
