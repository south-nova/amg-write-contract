'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/cn';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  className?: string;
  value?: string;
  options?: RadioOption[];
  onChange?: (value: string) => void;
}

const RadioGroup = ({ className, value, options, onChange }: RadioGroupProps) => {
  const defaultSelected = value || options?.[0].value || '';
  const [selected, setSelected] = useState<string>(defaultSelected);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={cn(className, 'inline-flex w-full overflow-hidden rounded-full border')}>
      {options?.map((option) => {
        const isSelected = option.value === selected;

        return (
          <label
            className={cn(
              'flex w-full cursor-pointer justify-center px-6 py-3 text-foreground-muted transition-colors',
              isSelected ? 'bg-secondary text-secondary-foreground' : '',
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
