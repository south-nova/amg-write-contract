'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/cn';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  className?: string;
  defaultValue?: string;
  options?: RadioOption[];
}

const RadioGroup = ({ className, defaultValue, options }: RadioGroupProps) => {
  const defaultSelected = defaultValue || options?.[0].value || '';
  const [selected, setSelected] = useState<string>(defaultSelected);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSelected(e.target.value);

  return (
    <div
      className={cn(className, 'inline-flex w-full overflow-hidden rounded-md border border-border-accent')}
    >
      {options?.map((option) => {
        const isSelected = option.value === selected;

        return (
          <label
            className={cn(
              'flex w-full cursor-pointer justify-center px-6 py-3',
              isSelected ? 'bg-primary text-primary-foreground' : '',
            )}
            key={option.value}
          >
            <input
              type="radio"
              checked={isSelected}
              value={option.value}
              className="hidden"
              onChange={handleChange}
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;
