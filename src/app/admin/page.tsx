'use client';

import { useEffect, useRef, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import axios from 'axios';
import { endOfMonth } from 'date-fns';

import DatePickerWithRange from '@/components/DatePickerWithRange';
import FixedBottom from '@/components/FixedBottom';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/Button';
import { type DateRange } from '@/components/ui/CalendarRange';
import { Input } from '@/components/ui/Input';
import RadioGroup from '@/components/ui/RadioGroup';
import { useToast } from '@/components/ui/Toast/use-toast';
import Content from '@/layouts/Content';

export interface DraftFormData {
  companyName: string;
  payCycle: string;
  period: DateRange;
  pay: string;
  payDate: string;
}

const defaultValues: DraftFormData = {
  payCycle: 'daily',
  period: {
    startDate: new Date(),
    endDate: endOfMonth(new Date()),
  },
  companyName: '',
  pay: '80000',
  payDate: '15',
};

const payCycleOptions = [
  { label: '일급', value: 'daily' },
  { label: '주급', value: 'weekly' },
  { label: '월급', value: 'monthly' },
];

const AdminPage = () => {
  const { toast } = useToast();
  const companyNameRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [link, setLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<DraftFormData>({ defaultValues });

  useEffect(() => companyNameRef.current?.focus(), []);

  const handleCopyClick = () => {
    try {
      const el = inputRef.current;
      console.log(el);
      el?.select();
      document.execCommand('copy');
      toast({
        title: '계약서 생성 완료',
        description: '링크가 클립보드에 복사되었습니다.',
        variant: 'success',
      });
    } catch (err) {
      toast({
        title: '클립보드 복사 실패',
        description: '클립보드 복사 과정에서 오류가 발생했습니다.',
        variant: 'error',
      });
    }
  };

  const handleSubmitForm = async (formData: DraftFormData) => {
    setIsLoading(true);
    try {
      const data = {
        companyName: formData.companyName,
        startDate: formData.period.startDate,
        endDate: formData.period.endDate,
        pay: parseInt(formData.pay),
        payDate: parseInt(formData.payDate),
        payCycle: formData.payCycle,
      };

      const response = await axios.post('/api/draft', data);
      const link = response.data.link;
      const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
      const contractUrl = `${domainUrl}/contract/${link}`;
      setIsLoading(false);
      setLink(contractUrl);
    } catch (error) {
      toast({
        title: '계약서 생성 실패',
        description: '서버와의 연결이 원활하지 않습니다.',
        variant: 'error',
      });
    }
  };

  return (
    <Content>
      <h1 className="mb-12 mt-8 text-xl font-bold">계약서 생성</h1>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(handleSubmitForm)}>
        <Controller
          control={control}
          name="companyName"
          rules={{ required: '업체명을 입력해주세요.' }}
          render={({ field }) => <InputField inputRef={companyNameRef} label="업체명" {...field} />}
        />

        <div className="flex w-full gap-6">
          <Controller
            control={control}
            name="pay"
            rules={{ required: '용역 수수료를 입력해주세요.' }}
            render={({ field }) => (
              <InputField onlyNum comma inputMode="numeric" label="용역 수수료" {...field} />
            )}
          />
          <Controller
            control={control}
            name="payDate"
            rules={{ required: '급여 지급일을 입력해주세요.' }}
            render={({ field }) => (
              <InputField onlyNum className="max-w-36" inputMode="numeric" label="급여 지급일" {...field} />
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label>
            <p className="mb-3 ml-1 text-sm text-foreground-muted">계약 기간</p>
            <Controller
              control={control}
              name="period"
              render={({ field }) => (
                <DatePickerWithRange onPick={(dateRange) => field.onChange(dateRange)} {...field} />
              )}
            />
          </label>
          <Controller
            control={control}
            name="payCycle"
            render={({ field }) => <RadioGroup options={payCycleOptions} {...field} />}
          />
        </div>

        <FixedBottom isVisible={isValid && !link}>
          <Button
            variant="primary"
            className="flex-1"
            type="button"
            size="lg"
            onClick={handleSubmit(handleSubmitForm)}
            loading={isLoading}
          >
            링크 생성하기
          </Button>
        </FixedBottom>

        {/* <div className="h-[1000px] w-full bg-black" /> */}
      </form>

      <FixedBottom isVisible={!!link}>
        <div className="flex flex-1">
          <Input
            ref={inputRef}
            className="w-full rounded-none rounded-l-lg px-4 text-sm"
            value={link}
            variant="filled"
            readOnly
          />
          <Button variant="primary" className="rounded-none rounded-r-lg" onClick={handleCopyClick}>
            복사하기
          </Button>
        </div>
      </FixedBottom>
    </Content>
  );
};

export default AdminPage;
