import { fetchFoods } from '@/helper/fetchAllFoods';

import SearchForm from './_components/SerachForm';

export default async function HomePage() {
  const foods = await fetchFoods();

  return (
    <section>
      <SearchForm foods={foods} />
    </section>
  );
}
