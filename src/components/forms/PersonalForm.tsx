import React from 'react';

import { Controller, useForm } from 'react-hook-form';

import InputField from '@/components/InputField';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export interface PersonalData {
  name: string;
  phone: string;
  address: string;
  bank: string;
  bankAccount: string;
}

interface PersonalFormProps {
  values: PersonalData;
  onNext: (data: PersonalData) => void;
}

const PersonalForm = ({ values, onNext }: PersonalFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PersonalData>({ values });

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onNext)}>
      <Controller
        control={control}
        name="name"
        rules={{ required: '이름을 입력해주세요.' }}
        render={({ field }) => <InputField placeholder="TEST" label="이름" {...field} />}
      />

      <Controller
        control={control}
        name="phone"
        rules={{ required: '연락처를 입력해주세요.' }}
        render={({ field }) => <InputField type="tel" format="phone" label="연락처" {...field} />}
      />

      <Controller
        control={control}
        name="address"
        rules={{ required: '연락처를 입력해주세요.' }}
        render={({ field }) => <InputField type="tel" format="phone" label="거주지" {...field} />}
      />

      <div className="flex gap-4">
        <Controller
          control={control}
          name="bank"
          rules={{ required: '연락처를 입력해주세요.' }}
          render={({ field }) => (
            <InputField className="max-w-36" type="tel" format="phone" label="은행명" {...field} />
          )}
        />

        <Controller
          control={control}
          name="bankAccount"
          rules={{ required: '연락처를 입력해주세요.' }}
          render={({ field }) => <InputField type="tel" format="phone" label="계좌번호" {...field} />}
        />
      </div>
      <Button type="submit" size="lg" disabled={!isValid}>
        다음
      </Button>
    </form>
  );
};

export default PersonalForm;
