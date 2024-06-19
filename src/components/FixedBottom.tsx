'use client';

import { ReactElement, cloneElement, isValidElement } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { useFixedBottomIOS } from '@/hooks/useFixedBottomIOS';
import { useKeyboardActive } from '@/hooks/useKeyboardActive';
import { cn } from '@/lib/cn';
import isComponentOfType from '@/utils/isComponentOfType';

interface FixedBottomProps {
  children: ReactElement<HTMLElement>;
  isVisible?: boolean;
}

const FixedBottom = ({ children, isVisible = true }: FixedBottomProps) => {
  const { fixedElementRef } = useFixedBottomIOS();
  const { isKeyboardVisible } = useKeyboardActive();

  const isStick = isKeyboardVisible && isComponentOfType(children, ['Button']);

  return (
    <AnimatePresence>
      <div
        ref={fixedElementRef}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-[700px] p-4 pt-0',
          isStick && 'p-0',
        )}
      >
        {isVisible && (
          <motion.div
            className="flex w-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isValidElement(children) &&
              cloneElement(children, {
                className: cn(children.props.className, isStick && 'rounded-none'),
              })}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default FixedBottom;
