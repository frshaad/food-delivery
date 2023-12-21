'use client';

import { Slider } from 'antd';
import { BadgeDollarSign, Flame } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Props = {
  min: number;
  max: number;
  type: 'price' | 'calories';
  sidebar?: boolean;
  setUpdatedRange: Dispatch<SetStateAction<number[]>>;
};

export default function SearchSlider({
  max,
  min,
  sidebar,
  type,
  setUpdatedRange,
}: Props) {
  const searchParams = useSearchParams();

  const formatter = (value?: number) => `${value}`;

  const minValueFromParams =
    type === 'price'
      ? searchParams.get('min_price')
      : searchParams.get('min_calories');
  const maxValueFromParams =
    type === 'price'
      ? searchParams.get('max_price')
      : searchParams.get('max_calories');

  const minValue = minValueFromParams ? parseInt(minValueFromParams) : min;
  const maxValue = maxValueFromParams ? parseInt(maxValueFromParams) : max;

  return (
    <div
      className={cn('flex', {
        'flex-col gap-4 border rounded-md p-3': sidebar,
        'items-center justify-between': !sidebar,
      })}
    >
      <p className="flex flex-1 items-center gap-2 capitalize">
        {type === 'calories' ? (
          <Flame size={20} />
        ) : (
          <BadgeDollarSign size={20} />
        )}
        {type}
      </p>
      <div className="flex flex-[3] items-center justify-between gap-2">
        <Badge
          variant="outline"
          className="flex min-w-[45px] items-center justify-center"
        >
          {min}
        </Badge>
        <Slider
          range={{ draggableTrack: true }}
          defaultValue={[minValue, maxValue]}
          min={min}
          max={max}
          tooltip={{ formatter }}
          onChange={setUpdatedRange}
          className="w-full"
        />
        <Badge
          variant="outline"
          className="flex min-w-[45px] items-center justify-center"
        >
          {max}
        </Badge>
      </div>
    </div>
  );
}
