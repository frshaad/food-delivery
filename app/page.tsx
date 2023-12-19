import Image from 'next/image';

import { logoFont } from '@/fonts';
import { fetchFoods } from '@/helper/fetchAllFoods';
import { cn } from '@/lib/utils';
import ShowcasePic from '@/public/food-show.webp';

import SearchForm from './_components/SerachForm';

export default async function HomePage() {
  const foods = await fetchFoods();

  return (
    <section className="relative flex h-max items-center justify-between">
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <SearchForm foods={foods} />
      </div>
      <div className="relative flex w-full flex-1 items-center justify-center">
        <Image alt="showcase background" src={ShowcasePic} priority />
      </div>
    </section>
  );
}
