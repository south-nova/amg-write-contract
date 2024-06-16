'use client';

import { ChangeEvent, InputHTMLAttributes, forwardRef, useCallback, useEffect, useState } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';
import { onlyNumber } from '@/lib/formatInputValue';

const inputVariants = cva(
  `h-10 px-2 duration-200 text-xl ease-linear transition-colors bg-transparent rounded-md text-foreground outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: `border border-border-accent focus-within:border-primary`,
        filled: `border border-transparent bg-surface focus-within:border focus-within:border-primary`,
        underline: `px-2pxr py-1pxr border-b rounded-none focus-within:border-primary focus-within:border-b-[2px] focus-within:pb-0`,
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
  comma?: boolean;
  onComplete?: () => void;
  onEnter?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, value, onlyNum, comma, maxLength, onChange, onComplete, onEnter, ...props },
    ref,
  ) => {
    const formatCommaValue = useCallback(
      (value: string | number | readonly string[] | undefined) => {
        let formattedValue = String(value);
        if (onlyNum || comma) {
          formattedValue = onlyNumber(formattedValue);
          if (comma) {
            formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        }
        return formattedValue;
      },
      [comma],
    );

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const {
          target: { value: rawValue },
        } = event;

        const changeValue = onlyNum || comma ? onlyNumber(rawValue) : rawValue;
        const newEvent = {
          ...event,
          target: {
            ...event.target,
            value: changeValue,
          },
        };

        onChange?.(newEvent);

        if (onComplete && maxLength && rawValue.length >= maxLength) onComplete();
      },
      [onChange, onComplete, onlyNum],
    );

    const handleEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onEnter?.();
      }
    }, []);

    return (
      <input
        ref={ref}
        autoComplete="off"
        maxLength={maxLength}
        value={formatCommaValue(value)}
        className={cn(inputVariants({ variant }), className)}
        onChange={handleChange}
        onKeyDown={handleEnter}
        data-has-value={!!value}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
