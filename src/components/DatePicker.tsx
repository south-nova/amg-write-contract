import { forwardRef, useEffect, useState } from 'react';

import { format } from 'date-fns';

import { Button } from '@/components/ui/Button';
import Calendar from '@/components/ui/Calendar';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/Drawer';
import { cn } from '@/lib/cn';

interface DatePickerProps {
  className?: string;
  value?: Date;
  onSelect?: (date: Date) => void;
}

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(({ className, value, onSelect }, ref) => {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (value) setDate(value);
  }, [value]);

  const handleSelectClick = () => {
    if (date && onSelect) onSelect(date);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="lg" variant="outline" className={cn('flex-1', className)} ref={ref}>
          {date ? format(date, 'yy년 M월 d일') : '날짜 선택'}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Calendar value={date} onChange={setDate} />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="primary" className="w-full" size="lg" onClick={handleSelectClick}>
              날짜 선택하기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
DatePicker.displayName = 'DatePicker';
export default DatePicker;
