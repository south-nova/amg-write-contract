import { Controller, useForm } from 'react-hook-form';

import AddressField from '@/components/AddressField';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/Button';

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
        render={({ field }) => <InputField label="이름" {...field} />}
      />

      <Controller
        control={control}
        name="phone"
        rules={{ required: '연락처를 입력해주세요.' }}
        render={({ field }) => (
          <InputField
            type="tel"
            format="phone"
            label="연락처"
            placeholder='"-" 하이픈 제외 숫자만 입력'
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="address"
        rules={{ required: '주소를 선택해주세요.' }}
        render={({ field }) => <AddressField label="거주지" {...field} />}
      />

      <div className="flex gap-4">
        <Controller
          control={control}
          name="bank"
          rules={{ required: '은행명을 입력해주세요.' }}
          render={({ field }) => <InputField className="max-w-36" label="은행명" {...field} />}
        />

        <Controller
          control={control}
          name="bankAccount"
          rules={{ required: '계좌번호를 입력해주세요.' }}
          render={({ field }) => (
            <InputField onlyNum label="계좌번호" placeholder='"-" 하이픈 제외 숫자만 입력' {...field} />
          )}
        />
      </div>
      <Button type="submit" size="lg" disabled={!isValid}>
        다음
      </Button>
    </form>
  );
};

export default PersonalForm;
