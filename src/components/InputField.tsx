import { RefObject, forwardRef } from 'react';

import { Input, InputProps } from '@/components/ui/Input';
import { cn } from '@/lib/cn';

export interface InputFieldProps extends InputProps {
  label?: string;
  inputRef?: RefObject<HTMLInputElement>;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, name, label, inputRef, ...props }, ref) => {
    return (
      <div className={cn('relative mt-3 flex-1', className)} ref={ref}>
        <Input
          ref={inputRef}
          id={name}
          variant="underline"
          className="peer w-full pt-1 placeholder-transparent transition-colors focus:placeholder-foreground-muted motion-reduce:transition-none"
          {...props}
        />
        <label
          htmlFor={name}
          className="pointer-events-none absolute left-2pxr mb-0 max-w-[90%] origin-[0_0] truncate pt-1 text-xl leading-[1.6] text-foreground-muted transition-all duration-200 ease-out peer-focus:-translate-y-[1.4rem] peer-focus:scale-[0.6] peer-focus:text-primary peer-data-[has-value=true]:-translate-y-[1.4rem] peer-data-[has-value=true]:scale-[0.6] motion-reduce:transition-none"
        >
          {label}
        </label>
      </div>
    );
  },
);

export default InputField;
