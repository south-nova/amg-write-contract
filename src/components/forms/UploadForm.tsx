import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';

import UploadBox from '@/components/UploadBox';
import { Button } from '@/components/ui/Button';

export interface UploadData {
  idCard: string;
  bankbook: string;
}

interface UploadFormProps {
  values: UploadData;
  onNext: (data: UploadData) => void;
  onBack: () => void;
}

const UploadForm = ({ values, onNext, onBack }: UploadFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UploadData>({ values });

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onNext)}>
      <Controller
        control={control}
        name="idCard"
        rules={{ required: true }}
        render={({ field }) => <UploadBox label="신분증 사진" {...field} />}
      />

      <Controller
        control={control}
        name="bankbook"
        rules={{ required: true }}
        render={({ field }) => <UploadBox label="통장 사본" {...field} />}
      />

      <div className="mt-8 flex gap-4">
        <Button type="button" size="lg" variant="outline" onClick={onBack}>
          이전
        </Button>
        <Button className="flex-1" type="submit" size="lg" disabled={!isValid}>
          다음
        </Button>
      </div>
    </form>
  );
};

export default UploadForm;
