'use client';

import * as React from 'react';

import { DateRange } from 'react-day-picker';

import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/Drawer';
import { cn } from '@/lib/cn';

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className={cn('grid gap-2', className)}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'yy년 m월, d일')} - {format(date.to, 'yy년 m월, d일')}
                </>
              ) : (
                format(date.from, 'yy년 m월, d일')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </DrawerTrigger>

        <DrawerContent className="w-auto p-0">
          <DrawerHeader>
            <DrawerTitle>계약 기간 선택</DrawerTitle>
          </DrawerHeader>

          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
