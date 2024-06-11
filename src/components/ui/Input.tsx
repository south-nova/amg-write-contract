'use client';

import { ChangeEvent, InputHTMLAttributes, forwardRef, useCallback, useEffect, useState } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';
import { type InputFormat, formatInputValue, onlyNumber } from '@/lib/formatInputValue';

const inputVariants = cva(
  `h-12 px-2 duration-200 ease-linear transition-colors bg-transparent rounded-md text-foreground outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: `border border-border-accent focus-within:border-primary`,
        filled: `border border-transparent bg-surface focus-within:border focus-within:border-primary`,
        underline: `px-1.5 py-1pxr border-b rounded-none focus-within:border-primary focus-within:border-b-[2px] focus-within:pb-0`,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  onlyNum?: boolean;
  format?: InputFormat;
  onComplete?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, onlyNum, value, format = 'default', onChange, onComplete, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState<string>(formatInputValue(String(value ?? ''), format));

    useEffect(() => {
      setDisplayValue(formatInputValue(String(value ?? ''), format));
    }, [value]);

    // 값 형식화 함수
    const formatValue = (value: string) => {
      let formattedValue = value;

      if (onlyNum || format !== 'default') {
        formattedValue = onlyNumber(formattedValue);

        if (format !== 'default') {
          formattedValue = formatInputValue(formattedValue, format);
        }
      }

      return formattedValue;
    };

    // 입력 처리 함수
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const {
          target: { value: rawValue },
        } = event;
        const formattedValue = formatValue(rawValue);

        setDisplayValue(formattedValue);

        const changeValue = onlyNum || format !== 'default' ? onlyNumber(formattedValue) : formattedValue;
        const newEvent = {
          ...event,
          target: {
            ...event.target,
            value: changeValue,
          },
        };

        onChange?.(newEvent);
      },
      [onChange],
    );

    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant }), className)}
        value={displayValue}
        onChange={handleChange}
        data-has-value={!!value}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
