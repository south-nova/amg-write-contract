import { useEffect, useState } from 'react';

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

export type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
} | null;

interface CalendarRangeProps {
  value?: DateRange;
  onChange?: (date: DateRange) => void;
}

const months = Array.from({ length: 12 }, (_, i) => addMonths(new Date(), i));

const CalendarRange = ({ value, onChange }: CalendarRangeProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (value) {
      setStartDate(value.startDate);
      setEndDate(value.endDate);
    }
  }, [value]);

  useEffect(() => {
    if (onChange && startDate && endDate)
      onChange({
        startDate,
        endDate,
      });
  }, [onChange, startDate, endDate]);

  const handleDateClick = (date: Date) => {
    const today = new Date();
    if (isBefore(date, today.setHours(0, 0, 0, 0))) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if ((startDate && !endDate) || date > startDate) setEndDate(date);
    else {
      setStartDate(date);
      setEndDate(null);
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
            const isToday = isSameDay(day, new Date());
            const isSelectedStart = startDate && isSameDay(day, startDate);
            const isSelectedEnd = endDate && isSameDay(day, endDate);
            const isInRange =
              startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });
            const isPastDate = isBefore(day, new Date()) && !isToday;

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  'cursor-pointer rounded-md p-2 text-center transition-colors duration-150',
                  !isSameMonth(day, month) ? 'text-foreground-muted' : 'text-foreground',
                  isInRange && 'rounded-none bg-surface-accent text-secondary',
                  isSelectedStart && 'rounded-l-md',
                  isSelectedEnd && 'rounded-r-md',
                  (isSelectedStart || isSelectedEnd) &&
                    'bg-secondary font-semibold text-secondary-foreground',
                  isToday && 'font-bold',
                  isPastDate && 'cursor-default text-foreground-muted',
                  !isInRange &&
                    !isSelectedStart &&
                    !isSelectedEnd &&
                    !isPastDate &&
                    'hover:bg-surface hover:text-secondary',
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
      <div className="h-[500px] overflow-y-scroll py-6 scrollbar-hide">
        {months.map((month) => renderMonth(month))}
      </div>
    </div>
  );
};

export default CalendarRange;
