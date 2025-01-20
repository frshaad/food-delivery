'use client';

import { CreditCard, Eraser, ShoppingBag } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { clearCart, selectAllCartItems } from '@/lib/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import CartItem from './CartItem';

export default function CartTrigger() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectAllCartItems);
  const isCartEmpty = cartItems.length === 0;

  let foodsTotalPrice = 0;
  let totalFoodsCount = 0;
  let deliveryPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    foodsTotalPrice += cartItems[i].price * cartItems[i].quantity;
  }
  for (let i = 0; i < cartItems.length; i++) {
    totalFoodsCount += cartItems[i].quantity;
  }

  if (totalFoodsCount === 0) {
    deliveryPrice = 0;
  } else if (totalFoodsCount > 0 && totalFoodsCount < 5) {
    deliveryPrice = 2.5;
  } else {
    deliveryPrice = 5;
  }

  const totalPrice = foodsTotalPrice + deliveryPrice;

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className="relative cursor-pointer">
            <ShoppingBag />
            {!isCartEmpty && (
              <Badge
                variant="destructive"
                className="absolute -top-3 right-[-14px] flex size-6 items-center justify-center rounded-full p-1"
              >
                {cartItems.length}
              </Badge>
            )}
          </div>
        </SheetTrigger>
        <SheetContent className="overflow-x-hidden overflow-y-scroll scroll-smooth">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>Review Your Cart</SheetDescription>
          </SheetHeader>

          <Separator className="my-4" />

          {isCartEmpty ? (
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 text-2xl font-semibold">
                <ShoppingBag />
                <p>Your cart is empty.</p>
              </div>
              <p className="text-sm italic">Continue Shopping</p>
            </div>
          ) : (
            <>
              <ul className="flex flex-col items-center space-y-2">
                {cartItems.map(item => (
                  <CartItem key={item.id} food={item} />
                ))}
              </ul>

              <Separator className="my-6" />

              <div className="flex flex-col items-center gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex w-full cursor-default items-center justify-between"
                >
                  <p>Subtotal:</p>
                  <p className="flex items-center gap-1 text-lg font-medium">
                    <span className="text-sm">$</span>
                    {foodsTotalPrice}
                  </p>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex w-full cursor-default items-center justify-between"
                >
                  <p>Delivery:</p>
                  <p className="flex items-center gap-1 text-lg font-medium">
                    <span className="text-sm">$</span>
                    {deliveryPrice}
                  </p>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex w-full cursor-default items-center justify-between"
                >
                  <p className="text-lg font-medium">Total:</p>
                  <p className="flex items-center gap-1 text-lg font-medium">
                    <span className="text-sm">$</span>
                    {totalPrice}
                  </p>
                </Button>

                <div className="flex w-full items-center justify-between gap-2 py-10 pb-20">
                  <Popover>
                    <PopoverTrigger className="flex flex-1 items-center pl-2">
                      <Eraser className="mr-2 size-4" />
                      Clear Cart
                    </PopoverTrigger>
                    <PopoverContent className="flex items-center justify-between">
                      <p>Are you sure?</p>
                      <Button
                        variant="destructive"
                        className=""
                        onClick={() => dispatch(clearCart())}
                      >
                        Yes
                      </Button>
                    </PopoverContent>
                  </Popover>

                  <Button variant="default" className="flex-1">
                    <CreditCard className="mr-2 size-4" />
                    Check Out
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
