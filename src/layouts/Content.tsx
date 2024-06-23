import { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface ContentProps {
  className?: string;
  children?: ReactNode;
}

const Content = ({ className, children }: ContentProps) => {
  return (
    <div className={cn('relative h-full w-full overflow-y-auto scrollbar-hide', className)}>
      <div className="p-5">{children}</div>
      {/* Make Scrollable */}
      <div className="absolute left-0 top-0 h-[calc(100%+1px)] w-[1px] bg-transparent" />
    </div>
  );
};

export default Content;
