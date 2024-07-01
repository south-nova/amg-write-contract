'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { eachDayOfInterval, endOfMonth, format, getDay, startOfMonth } from 'date-fns';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface CalendarProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
}

type CalendarView = 'date' | 'month' | 'year';
const Calendar = ({ value, onChange }: CalendarProps) => {
  const [calendarView, setCalendarView] = useState<CalendarView>('date');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setSelectedDate(value || new Date());
  }, [value]);

  const years = useMemo(() => {
    const baseYear = selectedDate.getFullYear();
    const startYear = baseYear - 4;
    const endYear = baseYear + 4;
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }, [selectedDate]);

  const handleYearClick = useCallback((year: number) => {
    setSelectedDate((prevDate) => new Date(prevDate.setFullYear(year)));
    setCalendarView('date');
  }, []);

  const handleMonthClick = useCallback((month: number) => {
    setSelectedDate((prevDate) => new Date(prevDate.setMonth(month)));
    setCalendarView('date');
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      onChange?.(date);
    },
    [onChange],
  );

  const renderYearView = useMemo(
    () => (
      <div className="grid grid-cols-3 gap-2">
        {years.map((year) => (
          <Button
            key={year}
            variant="ghost"
            size="lg"
            className={cn('font-normal', year === selectedDate.getFullYear() && 'font-bold text-primary')}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </Button>
        ))}
      </div>
    ),
    [years, selectedDate, handleYearClick],
  );

  const renderMonthView = useMemo(
    () => (
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 12 }, (_, i) => (
          <Button
            key={i}
            variant="ghost"
            size="lg"
            className={cn('font-normal', i === selectedDate.getMonth() && 'font-bold text-primary')}
            onClick={() => handleMonthClick(i)}
          >
            {i + 1}월
          </Button>
        ))}
      </div>
    ),
    [selectedDate, handleMonthClick],
  );

  const renderDateView = useMemo(() => {
    const dates = eachDayOfInterval({
      start: startOfMonth(selectedDate),
      end: endOfMonth(selectedDate),
    });

    const firstDayIndex = getDay(startOfMonth(selectedDate));
    const paddingDays = Array.from({ length: firstDayIndex }, (_, i) => i);

    return (
      <div>
        <div className="grid grid-cols-7 border-b border-border pb-3 text-center">
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
        <div className="grid grid-cols-7 gap-y-2 py-3">
          {paddingDays.map((_, index) => (
            <div key={index}></div>
          ))}
          {dates.map((date) => (
            <Button
              key={date.toISOString()}
              className={cn(
                'font-normal',
                date.getDate() === selectedDate.getDate() && 'font-bold text-primary',
              )}
              variant="ghost"
              onClick={() => handleDateClick(date)}
            >
              {format(date, 'd')}
            </Button>
          ))}
        </div>
      </div>
    );
  }, [selectedDate, handleDateClick]);

  const renderView = useMemo(
    () => ({
      date: renderDateView,
      month: renderMonthView,
      year: renderYearView,
    }),
    [renderDateView, renderMonthView, renderYearView],
  );

  return (
    <div className="bg-background px-5 py-4">
      <div className="mb-8 flex justify-center">
        <Button variant="ghost" className="px-2 text-lg" onClick={() => setCalendarView('year')}>
          {selectedDate.getFullYear()}년
        </Button>
        <Button variant="ghost" className="px-2 text-lg" onClick={() => setCalendarView('month')}>
          {selectedDate.getMonth() + 1}월
        </Button>
      </div>
      <div>{renderView[calendarView]}</div>
    </div>
  );
};

export default Calendar;
