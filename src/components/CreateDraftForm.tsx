'use client';

import React from 'react';

import { Controller, FieldErrors, useForm } from 'react-hook-form';

import { endOfMonth } from 'date-fns';

import DatePickerWithRange from '@/components/DatePickerWithRange';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/Button';
import { DateRange } from '@/components/ui/CalendarRange';
import RadioGroup from '@/components/ui/RadioGroup';
import { Draft } from '@/types/draft';

interface DraftFormData {
  payCycle: string;
  period: DateRange;
  companyName: string;
  pay: number;
  payDate: number;
}

const defaultValues: DraftFormData = {
  payCycle: 'monthly',
  period: { from: new Date(), to: endOfMonth(new Date()) },
  companyName: '',
  pay: 80000,
  payDate: 15,
};

interface CreateDraftFormProps {
  onSubmit?: (formData: Draft) => void;
}

const CreateDraftForm = ({ onSubmit }: CreateDraftFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<DraftFormData>({ defaultValues });

  const payCycle = [
    { label: '일급', value: 'monthly' },
    { label: '주급', value: 'weekly' },
    { label: '월급', value: 'daily' },
  ];

  const handleValid = (formData: DraftFormData) => onSubmit?.(formData);

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(handleValid)}>
      <Controller
        control={control}
        name="payCycle"
        render={({ field }) => <RadioGroup options={payCycle} {...field} />}
      />

      <label>
        <p className="mb-3 ml-1 text-sm text-foreground-muted">계약 기간</p>
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePickerWithRange
              onPick={(dateRange: DateRange) => {
                field.onChange(dateRange.from);
                setValue('endDate', dateRange.to);
              }}
              value={{ from: field.value, to: getValues('endDate') }}
            />
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
          rules={{ required: '용역 수수료를 입력해주세요.' }}
          render={({ field }) => <InputField onlyNum format="money" label="용역 수수료 (일급)" {...field} />}
        />
        <Controller
          control={control}
          name="payDate"
          rules={{ required: '급여 지급일을 입력해주세요.' }}
          render={({ field }) => <InputField onlyNum className="max-w-36" label="급여 지급일" {...field} />}
        />
      </div>

      <div className="flex justify-end">
        <Button className="mt-8 w-44" size="lg" type="submit" disabled={!isValid}>
          생성하기
        </Button>
      </div>
    </form>
  );
};

export default CreateDraftForm;
