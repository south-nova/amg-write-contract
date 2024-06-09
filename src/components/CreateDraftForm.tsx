'use client';

import React from 'react';

import { Controller, useForm } from 'react-hook-form';

import { endOfMonth } from 'date-fns';

import DatePickerWithRange from '@/components/DatePickerWithRange';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/Button';
import RadioGroup from '@/components/ui/RadioGroup';
import { Draft } from '@/types/draft';

interface CreateDraftFormProps {
  onSubmit?: (formData: Draft) => void;
}

const CreateDraftForm = ({ onSubmit }: CreateDraftFormProps) => {
  const defaultValues: Draft = {
    payCycle: 'monthly',
    period: {
      from: new Date(),
      to: endOfMonth(new Date()),
    },
    companyName: '',
    pay: 80000,
    payDate: 15,
  };

  const { register, handleSubmit, control } = useForm<Draft>({ defaultValues });

  const payCycle = [
    { label: '일급', value: 'monthly' },
    { label: '주급', value: 'weekly' },
    { label: '월급', value: 'daily' },
  ];

  const handleCreateClick = (formData: Draft) => {
    console.log(formData);
    onSubmit?.(formData);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(handleCreateClick)}>
      <Controller
        control={control}
        name="payCycle"
        render={({ field }) => <RadioGroup options={payCycle} {...field} />}
      />

      <label>
        <p className="mb-3 ml-1 text-sm text-foreground-muted">계약 기간</p>
        <Controller
          control={control}
          name="period"
          render={({ field: { onChange } }) => (
            <DatePickerWithRange onPick={(dateRange) => onChange(dateRange)} />
          )}
        />
      </label>

      <Controller
        control={control}
        name="companyName"
        rules={{ required: '업체명을 입력해주세요.' }}
        render={({ field }) => <InputField label="업체명" {...register('companyName')} {...field} />}
      />

      <div className="flex w-full gap-6">
        <Controller
          control={control}
          name="pay"
          render={({ field }) => <InputField onlyNum format="money" label="용역 수수료 (일급)" {...field} />}
        />
        <Controller
          control={control}
          name="payDate"
          render={({ field }) => <InputField onlyNum className="max-w-36" label="급여 지급일" {...field} />}
        />
      </div>

      <div className="flex justify-end">
        <Button className="mt-8 w-44" size="lg" type="submit">
          생성하기
        </Button>
      </div>
    </form>
  );
};

export default CreateDraftForm;
