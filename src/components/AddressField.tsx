import { ChangeEvent, forwardRef, useState } from 'react';

import DaumPostcode, { Address } from 'react-daum-postcode';

import InputField, { InputFieldProps } from '@/components/InputField';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/Drawer';

interface AddressFieldProps extends InputFieldProps {
  onComplete?: () => void;
}

const AddressField = forwardRef<HTMLInputElement, AddressFieldProps>(
  ({ onChange, onComplete, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    const handleComplete = (data: Address) => {
      const newChangeEvent = {
        target: { value: data.address },
      } as ChangeEvent<HTMLInputElement>;

      onChange?.(newChangeEvent);
      setOpen(false);
      onComplete?.();
    };

    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <InputField type="text" ref={ref} readOnly onFocus={() => setOpen(true)} {...props} />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>주소 선택</DrawerTitle>
          </DrawerHeader>

          <DaumPostcode className="min-h-[600px]" animation onComplete={handleComplete} />
        </DrawerContent>
      </Drawer>
    );
  },
);

export default AddressField;
