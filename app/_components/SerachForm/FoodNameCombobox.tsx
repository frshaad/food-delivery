'use client';

import { useSearchParams } from 'next/navigation';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from 'usehooks-ts';

import { Input } from '@/components/ui/input';

type Props = {
  setQueryString: Dispatch<SetStateAction<string>>;
};

export function FoodNameCombobox({ setQueryString }: Props) {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get('searchQuery');
  const [value, setValue] = useState<string>(defaultValue ? defaultValue : '');
  const debouncedValue = useDebounce<string>(value, 1000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const defaultQuery = searchParams.get('searchQuery') as string;

  useEffect(() => {
    setQueryString(debouncedValue);
  }, [debouncedValue, setQueryString]);

  return (
    <Input
      placeholder="Search a Food..."
      onChange={handleChange}
      defaultValue={defaultQuery}
    />
  );
}
