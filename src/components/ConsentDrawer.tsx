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

interface DrawerProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  asChildTrigger?: boolean;
  okButtonText?: string;
  handleOnly?: boolean;
  onOk?: () => void;
  onClose?: () => void;
}

const ConsentDrawer = ({
  trigger,
  children,
  title,
  description,
  okButtonText,
  asChildTrigger,
  onOk,
  onClose,
}: DrawerProps) => {
  return (
    <Drawer onClose={onClose} handleOnly>
      <DrawerTrigger asChild={asChildTrigger}>{trigger}</DrawerTrigger>
      <DrawerContent className="max-h-[90%]">
        {(title || description) && (
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
        )}
        {children}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="primary" className="w-full" size="lg" onClick={onOk}>
              {okButtonText}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ConsentDrawer;
