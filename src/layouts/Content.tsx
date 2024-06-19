import { ReactNode } from 'react';

import { useKeyboardActive } from '@/hooks/useKeyboardActive';
import { cn } from '@/lib/cn';

interface ContentProps {
  className?: string;
  children?: ReactNode;
}

const Content = ({ className, children }: ContentProps) => {
  const { isKeyboardVisible, keyboardHeight } = useKeyboardActive();
  const paddingBottom = isKeyboardVisible ? keyboardHeight + 150 : 0;

  return (
    <div className={cn('relative h-screen w-full overflow-y-auto', className)} style={{ paddingBottom }}>
      <div className="p-5">{children}</div>
      {/* Make Scrollable */}
      <div className="absolute left-0 top-0 h-[calc(100%+1px)] w-[1px] bg-transparent" />
    </div>
  );
};

export default Content;
