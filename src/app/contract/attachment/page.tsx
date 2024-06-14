'use client';

import { Controller, useForm } from 'react-hook-form';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

import UploadBox from '@/components/UploadBox';
import { Button } from '@/components/ui/Button';
import { AttachmentState } from '@/stores/attachment';
import { AttachmentData } from '@/types/attachment';

const AttachmentPage = () => {
  const router = useRouter();

  const [attachment, setAttachment] = useRecoilState(AttachmentState);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AttachmentData>({ defaultValues: attachment });

  const handleNextButtonClick = (data: AttachmentData) => {
    setAttachment(data);
    router.push('/contract/confirm');
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

      {isValid && (
        <motion.div
          className="fixed bottom-6 left-6 right-6 flex"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="primary"
            className="flex-1"
            type="button"
            size="lg"
            onClick={handleSubmit(handleNextButtonClick)}
          >
            다음
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default AttachmentPage;
