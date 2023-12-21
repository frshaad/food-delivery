import type { Food } from '@prisma/client';

export function calcRange(array: Food[], identifier: 'price' | 'calories') {
  if (identifier === 'price') {
    const min = array.reduce((p, c) => {
      return c.price < p.price ? c : p;
    }).price;
    const max = array.reduce((p, c) => {
      return c.price > p.price ? c : p;
    }).price;

    return [min, max] as [number, number];
  } else {
    const min = array.reduce((p, c) => {
      return c.calories < p.calories ? c : p;
    }).calories;
    const max = array.reduce((p, c) => {
      return c.calories > p.calories ? c : p;
    }).calories;

    return [min, max] as [number, number];
  }
}
