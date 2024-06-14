'use client';

import { ChangeEvent, forwardRef, useEffect, useState } from 'react';

import { ImageIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { cn } from '@/lib/cn';

interface UploadBoxProps {
  label: string;
  value?: File | string | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onComplete?: () => void;
}

const UploadBox = forwardRef<HTMLInputElement, UploadBoxProps>(
  ({ label, value, onChange, onComplete, ...props }, ref) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
      if (value && typeof value === 'string') setPreview(value);
      else if (value && value instanceof File) setPreview(URL.createObjectURL(value));
      else setPreview(null);
    }, [value]);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
        onComplete?.();
        onChange?.(e);
      }
    };

    return (
      <label className="relative min-h-48 flex-1 cursor-pointer overflow-hidden rounded-md border-2 border-dashed">
        <input
          className="hidden"
          ref={ref}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          {...props}
        />

        {preview && <Image src={preview} alt="preview" fill className="object-cover" />}

        <div
          className={cn(
            'absolute flex size-full flex-col items-center justify-center gap-2 text-foreground-muted',
            preview && 'bg-black/30 text-white',
          )}
        >
          <ImageIcon className="size-10" />
          {label}
        </div>
      </label>
    );
  },
);

UploadBox.displayName = 'UploadBox';

export default UploadBox;
