import { Food } from '@prisma/client';

import SearchForm from '@/app/_components/SerachForm';

type Props = {
  foods: Food[];
};

export default function SidebarFilter({ foods }: Props) {
  return (
    <div className="top-20 w-full max-w-xs md:sticky">
      <SearchForm foods={foods} />
    </div>
  );
}
