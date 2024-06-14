import { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';
import { type ContractData } from '@/types/contract';

interface ContractInfoProps extends HTMLAttributes<HTMLUListElement> {
  contract: ContractData;
}

const ContractInfo = ({ contract, className, ...props }: ContractInfoProps) => {
  const { companyName, pay, payDate, startDate, endDate, payCycle } = contract;
  const payCycleText = {
    monthly: '월',
    weekly: '주',
    daily: '일',
  }[payCycle];

  return (
    <ul className={cn('rounded-md bg-surface p-4 text-sm text-foreground-muted', className)} {...props}>
      <li className="flex justify-between py-1">
        소속 업체<span className="font-bold text-primary">{companyName ? companyName : '-'}</span>
      </li>

      <li className="flex justify-between py-1">
        용역 수수료
        <span className="text-foreground">
          {payCycleText} {pay ? `${pay.toLocaleString()}원` : '-'}
        </span>
      </li>
      <li className="flex justify-between py-1">
        지급일<span className="text-foreground">{payDate ? `${payDate}일` : '-'}</span>
      </li>
      <li className="flex justify-between py-1">
        계약 시작일<span className="text-foreground">{startDate ? startDate : '-'}</span>
      </li>
      <li className="flex justify-between py-1">
        계약 종료일<span className="text-foreground">{endDate ? endDate : '-'}</span>
      </li>
    </ul>
  );
};

export default ContractInfo;
