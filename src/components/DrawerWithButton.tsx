import React, { ReactNode } from 'react';

import { Button } from '@/components/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/Drawer';

interface DrawerWithButtonProps {
  trigger?: ReactNode;
  triggerText?: string;
  okText?: string;
  description?: string;
  children?: ReactNode;
  onOk?: () => void;
}

const DrawerWithButton = ({
  trigger,
  triggerText,
  okText,
  description,
  children,
  onOk,
}: DrawerWithButtonProps) => {
  return (
    <Drawer handleOnly>
      <DrawerTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant="outline" className="relative">
            {triggerText}
          </Button>
        )}
      </DrawerTrigger>

      <DrawerContent className="max-h-[90%]">
        <DrawerHeader>
          <DrawerTitle>{triggerText}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="primary" className="w-full" size="lg" onClick={onOk}>
              {okText}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerWithButton;
