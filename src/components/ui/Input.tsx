'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

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
  format?: 'default' | 'phone' | 'ssn' | 'money';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, variant, type, onlyNum, format = 'default', value: parentValue, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
      if (parentValue !== undefined) {
        const formattedValue = formatValue(parentValue.toString());
        setInputValue(formattedValue);
      }
    }, [parentValue]);

    const formatValue = (val: string) => {
      if (onlyNum || ['phone', 'ssn', 'money'].includes(format)) {
        val = val.replace(/\D/g, ''); // 숫자만 허용
      }

      switch (format) {
        case 'ssn':
          val = val.slice(0, 13); // 최대 13자리까지만 허용
          return val.length > 6 ? `${val.substring(0, 6)} ${val.substring(6)}` : val;
        case 'phone':
          val = val.slice(0, 11); // 최대 11자리까지만 허용 ('010' 포함)
          return val.replace(/(\d{3})(\d{1,4})?(\d{1,4})?/, (_, p1, p2, p3) => {
            if (p3) return `${p1} ${p2} ${p3}`;
            if (p2) return `${p1} ${p2}`;
            return p1;
          });
        case 'money':
          return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        case 'default':
        default:
          return val;
      }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatValue(event.target.value);
      setInputValue(formattedValue);

      let newValue = formattedValue;
      if (onlyNum || !['default'].includes(format)) newValue = formattedValue.replace(/\D/g, '');

      const newEvent: ChangeEvent<HTMLInputElement> = {
        ...event,
        target: {
          ...event.target,
          value: newValue,
        },
      };
      props.onChange?.(newEvent);
    };

    return (
      <input
        id={id}
        type={type}
        value={inputValue}
        className={cn(inputVariants({ variant }), className)}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
