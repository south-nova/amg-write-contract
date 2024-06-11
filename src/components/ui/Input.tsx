'use client';

import React, { ChangeEvent, useCallback } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';
import { type InputFormat, formatInputValue } from '@/lib/formatInputValue';

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
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  onlyNum?: boolean;
  format?: InputFormat;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, onlyNum, value, format = 'default', onChange, ...props }, ref) => {
    const handleInput = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;
        if (onlyNum || ['phone', 'ssn', 'money'].includes(format)) {
          inputValue = inputValue.replace(/\D/g, ''); // 숫자만 허용
        }

        const formattedValue = formatInputValue(inputValue, format);
        event.target.value = formattedValue;

        const newEvent: ChangeEvent<HTMLInputElement> = {
          ...event,
          target: {
            ...event.target,
            value: inputValue,
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
        onInput={handleInput}
        data-has-value={!!value}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
