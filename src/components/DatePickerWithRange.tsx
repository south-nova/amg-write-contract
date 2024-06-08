'use client';

import * as React from 'react';

import { CalendarIcon } from '@radix-ui/react-icons';
import { Cross1Icon } from '@radix-ui/react-icons';
import { addDays, endOfMonth, format } from 'date-fns';

import { Button } from '@/components/ui/Button';
import CalendarRange, { DateRange } from '@/components/ui/CalendarRange';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/Drawer';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/cn';

interface DatePickerProps {
  className?: string;
  onDateChange?: (dateRange: DateRange) => void;
}

const DatePickerWithRange = ({ className, onDateChange }: DatePickerProps) => {
  const [dateRange, setDateRange] = React.useState<DateRange | null>({
    from: new Date(),
    to: endOfMonth(new Date()),
  });

  const handleDateChange = (range: DateRange) => {
    setDateRange(range);
    onDateChange?.(range);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !dateRange && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange && dateRange.from && dateRange.to
              ? `${format(dateRange.from, 'yy년 M월 d일')} ~ ${format(dateRange.to, 'yy년 M월 d일')}`
              : '날짜를 선택해주세요.'}
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>계약 기간 선택</DrawerTitle>
            <DrawerClose asChild className="absolute right-4 top-8">
              <IconButton variant="ghost">
                <Cross1Icon />
              </IconButton>
            </DrawerClose>
          </DrawerHeader>

          <CalendarRange onDateChange={handleDateChange} />

          <DrawerFooter>
            <DrawerClose>
              <Button size="lg">날짜 선택</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DatePickerWithRange;
