import { useState } from 'react';

import { CheckIcon } from '@radix-ui/react-icons';

import ContractArticle from '@/components/ContractArticle';
import { Button } from '@/components/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/Drawer';
import { ContractData } from '@/types/contract';
import { PersonalData } from '@/types/personal';

interface ContractArticleDrawerProps {
  contract?: ContractData;
  personal?: PersonalData;
}

const ContractArticleDrawer = ({ contract, personal }: ContractArticleDrawerProps) => {
  const [confirm, setConfirm] = useState<boolean>(false);

  const handleButtonClick = () => setConfirm(true);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="lg" className="relative w-full">
          {confirm && <CheckIcon className="absolute right-4 size-6 text-primary" />}
          계약 조항
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90%]">
        {contract && personal && <ContractArticle personal={personal} contract={contract} />}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="w-full" size="lg" onClick={handleButtonClick}>
              확인했어요
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ContractArticleDrawer;
