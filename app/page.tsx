import Image from 'next/image';

import { fetchFoods } from '@/helper/fetchAllFoods';
import ShowcasePic from '@/public/food-show-1.webp';

import SearchForm from './_components/SerachForm';

export default async function HomePage() {
  const foods = await fetchFoods();

  return (
    <section className="container relative flex items-center justify-center gap-8 lg:justify-between">
      <div className="flex w-11/12 max-w-md items-center justify-center gap-3">
        <SearchForm foods={foods} />
      </div>
      <div className="relative hidden w-full scale-90 items-center justify-center lg:flex lg:scale-100">
        <Image alt="showcase background" src={ShowcasePic} priority />
      </div>
    </section>
  );
}
