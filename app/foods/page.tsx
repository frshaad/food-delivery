import { fetchFoods } from '@/helper/fetchAllFoods';

import { SearchResults, SidebarFilter } from './_components';

export default async function FoodsPage() {
  const foods = await fetchFoods();

  return (
    <section className="container flex justify-between gap-12">
      <SidebarFilter foods={foods} />
      {/* <SearchResults > */}
    </section>
  );
}
