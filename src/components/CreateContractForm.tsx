import React from 'react';

import InputField from '@/components/InputField';
import { DatePickerWithRange } from '@/components/ui/DatePickerWithRange';
import RadioGroup from '@/components/ui/RadioGroup';

interface CreateContractFormProps {}

const CreateContractForm = ({}: CreateContractFormProps) => {
  const payCycle = [
    { label: '일급', value: 'monthly' },
    { label: '주급', value: 'weekly' },
    { label: '월급', value: 'daily' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <RadioGroup options={payCycle} />
      <InputField name="company-name" label="업체명" />

      <div className="flex w-full gap-6">
        <InputField name="pay" label="용역 수수료 (일급)" />
        <InputField className="max-w-32" name="pay-date" label="급여 지급일" />
      </div>
      <DatePickerWithRange />
    </div>
  );
};

export default CreateContractForm;
