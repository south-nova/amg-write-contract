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
      <h1 className="mb-12 mt-8 text-xl font-bold">사진을 업로드해주세요</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleNextButtonClick)}>
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

        {isValid && (
          <motion.div
            className="fixed bottom-6 left-6 right-6 flex"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            <Button className="flex-1" type="submit" size="lg">
              다음
            </Button>
          </motion.div>
        )}
      </form>
    </>
  );
};

export default AttachmentPage;
