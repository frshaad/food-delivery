'use client';

import { Food } from '@prisma/client';
import { Check, ChevronsUpDown, Salad } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Props = {
  foods: Food[];
  foodId: string;
  setFoodId: Dispatch<SetStateAction<string>>;
};

export function FoodNameCombobox({ foods, foodId, setFoodId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-64 justify-between"
        >
          <Salad size={20} />
          {foodId
            ? foods.find(food => food.id === foodId)?.name
            : 'Search a Food...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Command>
          <CommandInput placeholder="Search a Food..." />
          <CommandEmpty>No food found.</CommandEmpty>
          <CommandGroup>
            {foods.map(food => (
              <CommandItem
                key={food.id}
                value={food.id}
                onSelect={currentValue => {
                  setFoodId(currentValue === foodId ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    foodId === food.id ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {food.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
