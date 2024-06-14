'use client';

import { forwardRef, useEffect, useState } from 'react';

import { CalendarIcon, Cross1Icon } from '@radix-ui/react-icons';
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
  onPick?: (dateRange: DateRange) => void;
}

const DatePickerWithRange = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ className, value, onPick }, ref) => {
    const [dateRange, setDateRange] = useState<DateRange | null>(null);
    const [tempDateRange, setTempDateRange] = useState<DateRange | null>(null);

    useEffect(() => {
      if (value) {
        setDateRange(value);
        setTempDateRange(value);
      }
    }, [value]);

    const handleTempDateChange = (range: DateRange | null) => setTempDateRange(range);

    const handleApplyDateChange = () => {
      if (tempDateRange) {
        setDateRange(tempDateRange);
        onPick?.(tempDateRange);
      }
    };

    return (
      <div ref={ref} className={cn('grid gap-2', className)}>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              id="date"
              variant="outline"
              size="lg"
              className={cn('w-full text-sm font-normal', !dateRange && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-4 h-4 w-4" />
              {dateRange && dateRange.startDate && dateRange.endDate
                ? `${format(dateRange.startDate, 'yy년 M월 d일')} ~ ${format(dateRange.endDate, 'yy년 M월 d일')}`
                : '날짜를 선택해주세요.'}
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <CalendarRange value={dateRange} onChange={handleTempDateChange} />

            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  disabled={!tempDateRange}
                  className="w-full"
                  size="lg"
                  onClick={handleApplyDateChange}
                >
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
