import { Food } from '@prisma/client';

import SearchForm from '@/app/_components/SerachForm';

type Props = {
  foods: Food[];
};

export default function SidebarFilter({ foods }: Props) {
  return (
    <div className="sticky top-20 w-full md:w-[500px]">
      <SearchForm foods={foods} />
    </div>
  );
}
