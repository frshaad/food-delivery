'use client';

import { Slider } from 'antd';
import { BadgeDollarSign, Flame } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Props = {
  min: number;
  max: number;
  label: string;
  values: number[];
  setUpdatedRange: Dispatch<SetStateAction<number[]>>;
};

export default function SearchSlider({
  max,
  min,
  label,
  values,
  setUpdatedRange,
}: Props) {
  const [isClient, setIsClient] = useState(false);
  const formatter = (value?: number) => `${value}`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  function handleChange(value: number[]) {
    setUpdatedRange(value);
  }

  return (
    <>
      {isClient && (
        <div className="flex items-center justify-between">
          <p className="flex flex-1 items-center gap-2">
            {label === 'Calories' ? (
              <Flame size={20} />
            ) : (
              <BadgeDollarSign size={20} />
            )}
            {label}
          </p>
          <div className="flex flex-[3] items-center justify-between gap-2">
            <Badge
              variant="outline"
              className="flex min-w-[45px] items-center justify-center"
            >
              {values[0]}
            </Badge>
            <Slider
              range={{ draggableTrack: true }}
              defaultValue={[min, max]}
              min={min}
              max={max}
              tooltip={{ formatter }}
              onChange={handleChange}
              className="w-full"
            />
            <Badge
              variant="outline"
              className="flex min-w-[45px] items-center justify-center"
            >
              {values[1]}
            </Badge>
          </div>
        </div>
      )}
    </>
  );
}
