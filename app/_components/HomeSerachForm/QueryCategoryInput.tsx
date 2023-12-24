'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { CATEGORY_OPTIONS } from './categoryOptions.constant';

type Props = {
  setCategory: Dispatch<SetStateAction<string>>;
};

export default function QueryCategoryInput({ setCategory }: Props) {
  return (
    <Select onValueChange={val => setCategory(val)} defaultValue="none">
      <SelectTrigger>
        <SelectValue placeholder="Category" className="capitalize" />
      </SelectTrigger>
      <SelectContent className="w-full">
        {CATEGORY_OPTIONS.map(category => (
          <SelectItem
            key={category.id}
            value={category.value}
            className="capitalize"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
