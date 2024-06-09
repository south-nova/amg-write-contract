import { DateRange } from '@/components/ui/CalendarRange';

export interface Draft {
  payCycle: string;
  period: DateRange;
  companyName: string;
  pay: number;
  payDate: number;
}
