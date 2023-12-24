'use client';

import { Food } from '@prisma/client';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getKeyByValue } from '@/helper/getEnumKey';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '@/lib/features/cart/cartSlice';
import { useAppDispatch } from '@/lib/hooks';

type Props = {
  food: Food;
};

export default function CartItem({ food }: Props) {
  const dispatch = useAppDispatch();
  const { id, imageUrl, name, price, quantity, categoryId } = food;
  const category = getKeyByValue(categoryId);

  return (
    <Card className="w-full">
      <CardContent className="flex w-full justify-between gap-4 py-6 pr-6">
        <div>
          <p className="text-xl font-medium capitalize">{name}</p>
          <p className="text-sm capitalize">{category}</p>
        </div>
        <div className="h-24 w-auto">
          <Image
            alt={`${name}'s picture`}
            src={imageUrl}
            width={80}
            height={80}
            className="max-h-24 w-auto opacity-0 transition-opacity duration-300"
            onLoadingComplete={image => image.classList.remove('opacity-0')}
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => dispatch(removeFromCart(id))}
          >
            Remove
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (quantity > 1) {
                  dispatch(decreaseQuantity(id));
                } else {
                  dispatch(removeFromCart(id));
                }
              }}
            >
              <Minus />
            </Button>
            <Badge
              variant="default"
              className="flex h-10 w-10 items-center justify-center"
            >
              {quantity}
            </Badge>
            <Button
              variant="outline"
              size="icon"
              onClick={() => dispatch(increaseQuantity(id))}
            >
              <Plus />
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="flex w-full cursor-default items-center justify-between"
        >
          <p>Total Price:</p>
          <p className="text-lg font-semibold">${price * quantity}</p>
        </Button>
      </CardFooter>
    </Card>
  );
}
