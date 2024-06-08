import React from 'react';

import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/cn';

interface InputFieldProps {
  className?: string;
  name?: string;
  label?: string;
}

const InputField = ({ className, name, label }: InputFieldProps) => {
  return (
    <div className={cn('relative mt-3 flex-1', className)}>
      <Input
        id={name}
        type="text"
        variant="underline"
        placeholder={label}
        className="peer w-full pt-1 placeholder:opacity-0 peer-focus:text-primary motion-reduce:transition-none"
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-1 top-2 mb-0 max-w-[90%] origin-[0_0] truncate pt-1 leading-[1.6] text-foreground-muted transition-all duration-200 ease-out peer-focus:-translate-y-[1.6rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-[1.6rem] peer-[:not(:placeholder-shown)]:scale-[0.8] motion-reduce:transition-none"
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
