'use client';

import { Dispatch, SetStateAction } from 'react';

import { Input } from '@/components/ui/input';

type Props = {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
};

export default function QueryNameInput({ setSearchQuery, searchQuery }: Props) {
  return (
    <div>
      <Input
        type="text"
        placeholder="Search for a food..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
