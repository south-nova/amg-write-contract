import React, { useEffect, useState } from 'react';

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
} from 'date-fns';
import { ko } from 'date-fns/locale';

import { cn } from '@/lib/cn';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface CalendarRangeProps {
  value?: DateRange | null;
  onDateChange?: (date: DateRange) => void;
}

const months = Array.from({ length: 12 }, (_, i) => addMonths(new Date(), i));

const CalendarRange = ({ value, onDateChange }: CalendarRangeProps) => {
  const defaultRange = { from: new Date(), to: endOfMonth(new Date()) };
  const [dateRange, setDateRange] = useState<DateRange>(value ?? defaultRange);

  useEffect(() => {
    if (value) setDateRange(value);
  }, [value]);

  useEffect(() => {
    if (onDateChange && dateRange?.from && dateRange?.to) {
      onDateChange(dateRange);
    }
  }, [onDateChange, dateRange]);

  const handleDateClick = (date: Date) => {
    const today = new Date();
    if (isBefore(date, today.setHours(0, 0, 0, 0))) return;

    if (!dateRange.from || (dateRange.from && dateRange.to)) {
      // 시작 날짜가 없거나, 시작 날짜와 종료 날짜가 모두 있는 경우
      setDateRange({ from: date, to: null });
    } else if (dateRange.from && !dateRange.to && date > dateRange.from) {
      // 시작 날짜만 있는 경우
      setDateRange({ from: dateRange.from, to: date });
    } else {
      setDateRange({ from: date, to: null });
    }
  };

  const renderMonth = (month: Date) => {
    const days = eachDayOfInterval({
      start: startOfMonth(month),
      end: endOfMonth(month),
    });

    return (
      <div key={month.toISOString()} className="mb-8">
        <h3 className="mb-4 text-center text-lg font-semibold">
          {format(month, 'yyyy년 MMMM', { locale: ko })}
        </h3>

        <div className="grid grid-cols-7 gap-y-2">
          {days.map((day) => {
            const { from, to } = dateRange;
            const isToday = isSameDay(day, new Date());
            const isSelectedStart = from && isSameDay(day, from);
            const isSelectedEnd = to && isSameDay(day, to);
            const isInRange = from && to && isWithinInterval(day, { start: from, end: to });
            const isPastDate = isBefore(day, new Date()) && !isToday;

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  'cursor-pointer rounded-md p-2 text-center transition-colors duration-150',
                  !isSameMonth(day, month) ? 'text-foreground-muted' : 'text-foreground',
                  isInRange && 'rounded-none bg-primary-surface text-primary',
                  isSelectedStart && 'rounded-l-md',
                  isSelectedEnd && 'rounded-r-md',
                  (isSelectedStart || isSelectedEnd) && 'bg-primary font-semibold text-primary-foreground',
                  isToday && 'font-bold',
                  isPastDate && 'cursor-default text-foreground-muted',
                  !isInRange &&
                    !isSelectedStart &&
                    !isSelectedEnd &&
                    !isPastDate &&
                    'hover:bg-surface hover:text-primary',
                )}
                onClick={() => handleDateClick(day)}
              >
                {format(day, 'd')}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background px-7 py-4">
      <div className="grid grid-cols-7 gap-2 border-b border-border pb-3 text-center">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div
            key={day}
            className={cn(
              'text-sm text-foreground-muted',
              day === '일' && 'text-[#F5A898]',
              day === '토' && 'text-[#8EC8F6]',
            )}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="h-[500px] overflow-y-scroll py-6">{months.map((month) => renderMonth(month))}</div>
    </div>
  );
};

export default CalendarRange;
