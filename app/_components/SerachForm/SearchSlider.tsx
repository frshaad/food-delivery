'use client';

import { Slider } from 'antd';
import { BadgeDollarSign, Flame } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  min: number;
  max: number;
  label: string;

  setUpdatedRange: Dispatch<SetStateAction<number[]>>;
};

export default function SearchSlider({
  max,
  min,
  label,
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
            {label === 'Calories' ? <Flame /> : <BadgeDollarSign />}
            {label}
          </p>
          <Slider
            range={{ draggableTrack: true }}
            defaultValue={[min, max]}
            min={min}
            max={max}
            tooltip={{ formatter }}
            onChange={handleChange}
            className="w-full flex-[2]"
          />
        </div>
      )}
    </>
  );
}
