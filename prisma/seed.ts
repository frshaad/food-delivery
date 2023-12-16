// import prisma from '@/lib/db';
import { PrismaClient } from '@prisma/client';

import { initialFoods } from './initialData';

const prisma = new PrismaClient();

async function seed() {
  const foods = await prisma.food.createMany({
    data: initialFoods,
  });

  console.log('Seed data inserted successfully.', { foods });
}

seed()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
