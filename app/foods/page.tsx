import { fetchFoods } from '@/helper/fetchAllFoods';

import { SearchResults, SidebarFilter } from './_components';

export default async function FoodsPage() {
  const foods = await fetchFoods();

  return (
    <section className="container flex flex-col items-center justify-between gap-2 md:flex-row md:items-start lg:gap-6">
      <SidebarFilter foods={foods} />
      <SearchResults foods={foods} />
    </section>
  );
}
