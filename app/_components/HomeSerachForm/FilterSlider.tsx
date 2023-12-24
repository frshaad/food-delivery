'use client';

import { Food } from '@prisma/client';
import { Slider } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';

import { calcRange } from './calcRange.util';

type Props = {
  type: 'price' | 'calorie';
  foods: Food[];
  setRange: Dispatch<SetStateAction<[number, number]>>;
};

export default function FilterSlider({ type, foods, setRange }: Props) {
  const [minPoint, maxPoint] = calcRange(foods, type);
  const formatter = (value?: number) => `${value}`;

  return (
    <div className="space-y-4 rounded-md border p-3">
      <p className="capitalize">{type}:</p>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="cursor-default">
          {minPoint}
        </Button>
        <Slider
          range={{ draggableTrack: true }}
          defaultValue={[minPoint, maxPoint]}
          min={minPoint}
          max={maxPoint}
          tooltip={{ formatter }}
          onChange={(value: number[]) => setRange([value[0], value[1]])}
          className="w-full"
        />
        <Button size="sm" variant="outline" className="cursor-default">
          {maxPoint}
        </Button>
      </div>
    </div>
  );
}
