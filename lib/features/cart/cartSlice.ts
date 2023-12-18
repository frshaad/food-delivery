import { Food } from '@prisma/client';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/lib/store';

const initialState: {
  cartItems: Food[];
} = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toogleAddToCart: (state, action: PayloadAction<Food>) => {
      const existingItem = state.cartItems.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        state.cartItems = state.cartItems.filter(
          item => item.id !== action.payload.id,
        );
      } else {
        state.cartItems.push(action.payload);
        state.cartItems.map(item =>
          item.id === action.payload.id ? item.quantity++ : state.cartItems,
        );
      }
    },
    addToCart: (state, action: PayloadAction<Food>) => {
      const existingItem = state.cartItems.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        state.cartItems.map(item =>
          item.id === action.payload.id ? item.quantity++ : item,
        );
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload,
      );
    },
    clearCart: state => {
      state.cartItems = [];
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      state.cartItems.map(item =>
        item.id === action.payload ? item.quantity++ : state.cartItems,
      );
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      state.cartItems.map(item =>
        item.id === action.payload
          ? item.quantity === 1
            ? state.cartItems.filter(food => food.id !== item.id)
            : item.quantity--
          : state.cartItems,
      );
    },
  },
});

export const selectAllCartItems = (state: RootState) => state.cart.cartItems;
export const {
  toogleAddToCart,
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
