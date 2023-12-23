'use client';

import { Food } from '@prisma/client';
import { Slider } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { Button } from '@/components/ui/button';

import { calcRange } from './calcRange.util';

type Props = {
  type: 'price' | 'calorie';
  foods: Food[];
  updateQueryString: (arr: [name: string, value: string][]) => string;
};

export default function FilterSlider({
  type,
  foods,
  updateQueryString,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const minQueryName = type === 'calorie' ? 'min_calories' : 'min_price';
  const maxQueryName = type === 'calorie' ? 'max_calories' : 'max_price';
  const [minPoint, maxPoint] = calcRange(foods, type);
  const formatter = (value?: number) => `${value}`;

  const defaultMin = searchParams.has(minQueryName)
    ? parseInt(searchParams.get(minQueryName)!)
    : minPoint;

  const defaultMax = searchParams.has(maxQueryName)
    ? parseInt(searchParams.get(maxQueryName)!)
    : maxPoint;

  const [value, setValue] = useState<[number, number]>([
    defaultMin,
    defaultMax,
  ]);
  const debouncedValue = useDebounce<[number, number]>(value, 500);

  useEffect(() => {
    router.push(
      pathname +
        '?' +
        updateQueryString([
          [
            minQueryName,
            debouncedValue[0] !== minPoint
              ? debouncedValue[0].toString()
              : 'none',
          ],
          [
            maxQueryName,
            debouncedValue[1] !== maxPoint
              ? debouncedValue[1].toString()
              : 'none',
          ],
        ]),
    );
  }, [
    debouncedValue,
    maxPoint,
    maxQueryName,
    minPoint,
    minQueryName,
    pathname,
    router,
    updateQueryString,
  ]);

  return (
    <div className="space-y-4 rounded-md border p-3">
      <p className="capitalize">{type}:</p>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="cursor-default">
          {minPoint}
        </Button>
        <Slider
          range={{ draggableTrack: true }}
          defaultValue={[defaultMin, defaultMax]}
          min={minPoint}
          max={maxPoint}
          tooltip={{ formatter }}
          onChange={(value: number[]) => setValue([value[0], value[1]])}
          className="w-full"
        />
        <Button size="sm" variant="outline" className="cursor-default">
          {maxPoint}
        </Button>
      </div>
    </div>
  );
}
