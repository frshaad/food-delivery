import prisma from '@/lib/db';

export async function fetchFoods() {
  const foods = await prisma.food.findMany();
  return foods;
}
