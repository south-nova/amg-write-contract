import React from 'react';

import { cn } from '@/lib/cn';

interface ContentProps {
  className?: string;
  children?: React.ReactNode;
}

const Content = ({ className, children }: ContentProps) => {
  return <div className={cn('p-6', className)}>{children}</div>;
};

export default Content;
