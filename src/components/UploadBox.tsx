import { InputHTMLAttributes, forwardRef, useState } from 'react';

import { ImageIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { cn } from '@/lib/cn';

interface UploadBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const UploadBox = forwardRef<HTMLInputElement, UploadBoxProps>(({ label, onChange, ...props }, ref) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
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

      {preview && <Image src={preview} alt="preview" layout="fill" objectFit="cover" />}

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
});

export default UploadBox;
