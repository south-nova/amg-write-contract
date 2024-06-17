import { HTMLAttributes, forwardRef, useState } from 'react';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

import { IconButton } from '@/components/ui/IconButton';
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
  folding?: boolean;
  foldable?: boolean;
  loading?: boolean;
}

const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(
  ({ className, items, foldable, folding, loading, title }, ref) => {
    const [isFolding, setIsFolding] = useState(folding);

    const handleFoldClick = () => setIsFolding((prev) => !prev);

    return (
      <div ref={ref} className={cn('relative rounded-xl bg-surface p-4', className)}>
        {title && (
          <h3 className="font-bold text-foreground">
            {title}
            {foldable && (
              <IconButton
                size="sm"
                variant="ghost"
                className="absolute right-2 hover:bg-surface-accent"
                onClick={handleFoldClick}
              >
                <ChevronDownIcon />
              </IconButton>
            )}
          </h3>
        )}

        <motion.div
          initial={{ height: 'auto' }}
          animate={{ height: isFolding ? 0 : 'auto' }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={cn('overflow-hidden')}
        >
          {!items || loading ? (
            <InfoCardSkeleton />
          ) : (
            <ul className="pt-4 text-sm">
              {items.map((item) => (
                <li key={item.label} className="flex justify-between py-1">
                  <span className="text-foreground-muted">{item.label}</span>
                  <span className={item.accent ? 'font-bold text-primary' : 'text-foreground'}>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    );
  },
);

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
InfoCard.displayName = 'InfoCard';
export default InfoCard;
