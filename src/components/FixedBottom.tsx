'use client';

import { ReactElement, cloneElement, isValidElement } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { useKeyboardState } from '@/hooks/useKeyboardState';
import { cn } from '@/lib/cn';
import isComponentOfType from '@/utils/isComponentOfType';

interface FixedBottomProps {
  children: ReactElement<HTMLElement>;
  isVisible?: boolean;
}

const FixedBottom = ({ children, isVisible = true }: FixedBottomProps) => {
  const { isKeyboardVisible } = useKeyboardState();
  const isStick = isKeyboardVisible && isComponentOfType(children, ['Button']);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'fixed bottom-6 left-6 right-6 mx-auto flex max-w-[700px]',
            isStick && 'bottom-0 left-0 right-0',
          )}
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
    </AnimatePresence>
  );
};

export default FixedBottom;
