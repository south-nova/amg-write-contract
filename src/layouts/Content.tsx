import { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface ContentProps {
  className?: string;
  children?: ReactNode;
}

const Content = ({ className, children }: ContentProps) => {
  return <div className={cn('p-5', className)}>{children}</div>;
};

export default Content;
