'use client';

import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

import FixedBottom from '@/components/FixedBottom';
import UploadBox from '@/components/UploadBox';
import { Button } from '@/components/ui/Button';
import usePageLeave from '@/hooks/usePageLeave';
import { attachmentState } from '@/stores/attachment';
import { AttachmentData } from '@/types/attachment';

const AttachmentPage = () => {
  usePageLeave();

  const router = useRouter();

  const [attachment, setAttachment] = useRecoilState(attachmentState);
  const [navLoading, setNavLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AttachmentData>({ defaultValues: attachment });

  const handleNextButtonClick = (data: AttachmentData) => {
    setAttachment(data);
    setNavLoading(true);
    router.push('/contract/sign');
  };

  return (
    <>
      <h1 className="mb-2 mt-8 text-xl font-bold">신분증과 통장 사본이 필요해요</h1>
      <p className="mb-12 text-sm text-foreground-muted">빛이 반사되지 않도록 주의해주세요.</p>

      <form className="flex flex-col gap-4">
        <Controller
          control={control}
          name="idCard"
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <UploadBox
              label="신분증 사진"
              value={value}
              onChange={(e) => onChange(e.target.files?.[0])}
              ref={ref}
            />
          )}
        />

        <Controller
          control={control}
          name="bankbook"
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <UploadBox
              label="통장 사본"
              value={value}
              onChange={(e) => onChange(e.target.files?.[0])}
              ref={ref}
            />
          )}
        />
      </form>

      <FixedBottom isVisible={isValid}>
        <Button
          loading={navLoading}
          variant="primary"
          className="flex-1"
          type="button"
          size="lg"
          onClick={handleSubmit(handleNextButtonClick)}
        >
          다음
        </Button>
      </FixedBottom>
    </>
  );
};

export default AttachmentPage;
