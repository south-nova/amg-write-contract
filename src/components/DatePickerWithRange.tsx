'use client';

import { useState } from 'react';

import { CalendarIcon } from '@radix-ui/react-icons';
import { Cross1Icon } from '@radix-ui/react-icons';
import { endOfMonth, format } from 'date-fns';

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
  value?: DateRange;
  onPick?: (dateRange: DateRange) => void;
}

const DatePickerWithRange = ({ className, value, onPick }: DatePickerProps) => {
  const defaultValues = { from: new Date(), to: endOfMonth(new Date()) };
  const [dateRange, setDateRange] = useState<DateRange>(value || defaultValues);
  const [tempDateRange, setTempDateRange] = useState<DateRange | null>(dateRange);

  const handleTempDateChange = (range: DateRange) => setTempDateRange(range);

  const handleApplyDateChange = () => {
    if (tempDateRange && tempDateRange.from && tempDateRange.to) {
      setDateRange(tempDateRange);
      onPick?.(tempDateRange);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="lg"
            className={cn('w-full font-normal', !dateRange && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-4 h-4 w-4" />
            {dateRange && dateRange.from && dateRange.to
              ? `${format(dateRange.from, 'yy년 M월 d일')} ~ ${format(dateRange.to, 'yy년 M월 d일')}`
              : '날짜를 선택해주세요.'}
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>계약 기간 선택</DrawerTitle>
            <DrawerClose asChild className="absolute right-4 top-12">
              <IconButton variant="ghost">
                <Cross1Icon />
              </IconButton>
            </DrawerClose>
          </DrawerHeader>

          <CalendarRange onChange={handleTempDateChange} />

          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full" size="lg" onClick={handleApplyDateChange}>
                날짜 선택하기
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DatePickerWithRange;
