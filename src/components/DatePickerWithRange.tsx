'use client';

import { forwardRef, useState } from 'react';

import { CalendarIcon } from '@radix-ui/react-icons';
import { Cross1Icon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

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
  onPick?: (dateRange: [Date, Date]) => void;
}

const DatePickerWithRange = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ className, value, onPick }, ref) => {
    const [dateRange, setDateRange] = useState<DateRange>(value ?? null);
    const [tempDateRange, setTempDateRange] = useState<DateRange>(null);

    const handleTempDateChange = (range: DateRange) => setTempDateRange(range);

    const handleApplyDateChange = () => {
      if (tempDateRange && tempDateRange.startDate && tempDateRange.endDate) {
        setDateRange(tempDateRange);
        onPick?.([tempDateRange.startDate, tempDateRange.endDate]);
      }
    };

    return (
      <div className={cn('grid gap-2', className)} ref={ref}>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              id="date"
              variant="outline"
              size="lg"
              className={cn('w-full font-normal', !dateRange && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-4 h-4 w-4" />
              {dateRange && dateRange.startDate && dateRange.endDate
                ? `${format(dateRange.startDate, 'yy년 M월 d일')} ~ ${format(dateRange.endDate, 'yy년 M월 d일')}`
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

            <CalendarRange value={value} onChange={handleTempDateChange} />

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
  },
);

export default DatePickerWithRange;
