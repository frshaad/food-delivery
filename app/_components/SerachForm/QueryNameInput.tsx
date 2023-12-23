'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { Input } from '@/components/ui/input';

type Props = {
  updateQueryString: (arr: [name: string, value: string][]) => string;
};

export default function QueryNameInput({ updateQueryString }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const stateFromUrl = searchParams.has('search_query')
    ? searchParams.get('search_query')
    : '';

  const [value, setValue] = useState<string>(stateFromUrl as string);
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    router.push(
      pathname +
        '?' +
        updateQueryString([
          [
            'search_query',
            debouncedValue.length !== 0 ? debouncedValue : 'none',
          ],
        ]),
    );
  }, [debouncedValue, pathname, router, updateQueryString]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search for a food..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
}
