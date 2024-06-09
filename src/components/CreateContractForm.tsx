'use client';

import React from 'react';

import DatePickerWithRange from '@/components/DatePickerWithRange';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/Button';
import RadioGroup from '@/components/ui/RadioGroup';
import { useToast } from '@/components/ui/Toast/use-toast';

interface CreateContractFormProps {}
interface Contract {
  payCycle: string;
  startDate: string;
  endDate: string;
  companyName: string;
  pay: number;
  payDate: string;
}

const CreateContractForm = ({}: CreateContractFormProps) => {
  const { toast } = useToast();
  const payCycle = [
    { label: '일급', value: 'monthly' },
    { label: '주급', value: 'weekly' },
    { label: '월급', value: 'daily' },
  ];

  const handleCreateClick = () => {
    toast({
      duration: 100000,
      title: '계약서 생성 완료',
      description: '링크가 클립보드에 복사되었습니다.',
      variant: 'success',
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <RadioGroup options={payCycle} />

      <label>
        <p className="mb-3 ml-1 text-sm text-foreground-muted">계약 기간</p>
        <DatePickerWithRange />
      </label>

      <InputField name="company-name" label="업체명" />

      <div className="flex w-full gap-6">
        <InputField onlyNum format="money" name="pay" label="용역 수수료 (일급)" />
        <InputField onlyNum className="max-w-36" name="pay-date" label="급여 지급일" />
      </div>

      <div className="flex justify-end">
        <Button className="mt-8 w-44" size="lg" onClick={handleCreateClick}>
          생성하기
        </Button>
      </div>
    </div>
  );
};

export default CreateContractForm;
