import { ButtonHTMLAttributes, forwardRef } from 'react';

import { ReloadIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-surface-accent',
  {
    variants: {
      variant: {
        default: 'bg-surface-accent text-surface-foreground',
        primary: 'bg-primary text-primary-foreground hover:bg-primary-accent',
        outline: 'border bg-transparent hover:border-border-accent',
        ghost: 'hover:bg-surface hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-14 rounded-md px-8 text-lg',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'transition-all duration-150 active:scale-95 active:bg-surface',
          buttonVariants({ variant, size, className }),
        )}
        disabled={loading}
        ref={ref}
        {...props}
      >
        {loading ? <ReloadIcon className="h-5 w-5 animate-spin" /> : children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
