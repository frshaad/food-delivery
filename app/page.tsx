import Image from 'next/image';

import { fetchFoods } from '@/helper/fetchAllFoods';
import ShowcasePic from '@/public/food-show-1.webp';

import SearchForm from './_components/SerachForm';

export default async function HomePage() {
  const foods = await fetchFoods();

  return (
    <section className="relative flex h-max items-center justify-between">
      <div className="flex flex-1 items-center justify-center gap-3">
        <SearchForm foods={foods} />
      </div>
      <div className="relative hidden w-full flex-1 scale-90 items-center justify-center md:flex lg:scale-100">
        <Image alt="showcase background" src={ShowcasePic} priority />
      </div>
    </section>
  );
}
