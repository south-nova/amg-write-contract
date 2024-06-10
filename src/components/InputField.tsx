import React from 'react';

import { Input, InputProps } from '@/components/ui/Input';
import { cn } from '@/lib/cn';

interface InputFieldProps extends InputProps {
  label?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, name, label, placeholder, ...props }, ref) => {
    return (
      <div className={cn('relative mt-3 flex-1', className)}>
        <Input
          ref={ref}
          id={name}
          variant="underline"
          className="peer w-full pt-1 placeholder-transparent transition-colors focus:placeholder-foreground-muted motion-reduce:transition-none"
          placeholder={placeholder}
          {...props}
        />
        <label
          htmlFor={name}
          className="pointer-events-none absolute left-1 top-2 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-[1.6] text-foreground-muted transition-all duration-200 ease-out peer-placeholder-shown:placeholder-opacity-0 peer-focus:-translate-y-[1.6rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-[1.6rem] peer-[:not(:placeholder-shown)]:scale-[0.8] motion-reduce:transition-none"
        >
          {label}
        </label>
      </div>
    );
  },
);

export default InputField;
