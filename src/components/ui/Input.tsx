import * as React from 'react';

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
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, variant, icon, iconPosition = 'right', type, ...props }, ref) => (
    <input id={id} type={type} className={cn(inputVariants({ variant }), className)} ref={ref} {...props} />
  ),
);
Input.displayName = 'Input';

export { Input };
