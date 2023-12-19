'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Food } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import CategorySelect from './CategorySelect';
import { FoodNameCombobox } from './FoodNameCombobox';

type Props = {
  foods: Food[];
};

const formSchema = z.object({
  foodName: z.string().max(50).optional(),
  category: z.string().min(1).optional(),
  minCalories: z.number().min(0).optional(),
  maxCalories: z.number().min(0).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
});

export default function SearchForm({ foods }: Props) {
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: '',
      category: 'chicken',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-4"
      >
        <FormField
          control={form.control}
          name="foodName"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel>Food&apos;s Name:</FormLabel>
              <FormControl>
                <FoodNameCombobox foods={foods} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel>Category:</FormLabel>
              <FormControl>
                <CategorySelect />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}
