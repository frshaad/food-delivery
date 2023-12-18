import { Categories } from '@/prisma/initialData';

export function getKeyByValue(value: string): keyof typeof Categories | null {
  for (const key of Object.keys(Categories) as (keyof typeof Categories)[]) {
    if (Categories[key] === value) {
      return key;
    }
  }
  return null;
}
