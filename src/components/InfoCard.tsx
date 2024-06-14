import { HTMLAttributes, forwardRef } from 'react';

import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/cn';

interface InfoItem {
  label: string;
  value: string;
  accent?: boolean;
}

interface InfoCardProps extends HTMLAttributes<HTMLDivElement> {
  items?: InfoItem[];
  title?: string;
  loading?: boolean;
}

const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(({ items, className, loading, title }, ref) => {
  return (
    <div ref={ref} className={cn('rounded-xl bg-surface p-4', className)}>
      {title && <h3 className="mb-4 font-bold text-foreground">{title}</h3>}
      {!items || loading ? (
        <InfoCardSkeleton />
      ) : (
        <ul className="text-sm">
          {items.map((item) => (
            <li className="flex justify-between py-1">
              <span className="text-foreground-muted">{item.label}</span>
              <span className={item.accent ? 'font-bold text-primary' : 'text-foreground'}>{item.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

const InfoCardSkeleton = () => {
  return (
    <ul>
      <li className="flex justify-between gap-8 py-1">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 flex-1" />
      </li>
      <li className="flex justify-between gap-8 py-1">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 flex-1" />
      </li>
      <li className="flex justify-between gap-8 py-1">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 flex-1" />
      </li>
    </ul>
  );
};

export default InfoCard;
