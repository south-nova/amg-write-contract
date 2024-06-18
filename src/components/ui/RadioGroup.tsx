'use client';

import { ChangeEvent, forwardRef, useState } from 'react';

import { LayoutGroup, motion } from 'framer-motion';

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

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ className, value, options, onChange }, ref) => {
    const defaultSelected = value || options?.[0].value || '';
    const [selected, setSelected] = useState<string>(defaultSelected);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSelected(e.target.value);
      onChange?.(e.target.value);
    };

    return (
      <div className={cn(className, 'inline-flex w-full overflow-hidden rounded-full bg-surface-accent')}>
        <LayoutGroup id="radioSelectedBg">
          {options?.map((option) => {
            const isSelected = option.value === selected;

            return (
              <motion.label
                className={cn(
                  'relative flex w-full cursor-pointer justify-center px-6 py-3 text-foreground-muted transition-colors',
                  isSelected && 'text-foreground',
                )}
                key={option.value}
              >
                {isSelected && (
                  <motion.div
                    className="absolute left-0 top-0 z-0 flex h-full w-full p-[5px]"
                    layoutId="radioSelectedBg"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35,
                    }}
                  >
                    <div className="flex-1 rounded-full bg-background shadow-sm" />
                  </motion.div>
                )}
                <input
                  ref={ref}
                  type="radio"
                  checked={isSelected}
                  value={option.value}
                  className="hidden"
                  onChange={handleChange}
                />
                <span className="z-10">{option.label}</span>
              </motion.label>
            );
          })}
        </LayoutGroup>
      </div>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
