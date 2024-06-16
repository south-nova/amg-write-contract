'use client';

import { cloneElement, useEffect, useRef, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

import AddressField from '@/components/AddressField';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/Button';
import { useKeyboardState } from '@/hooks/useKeyboardState';
import { cn } from '@/lib/cn';
import { personalState } from '@/stores/personal';
import { PersonalData } from '@/types/personal';

const personalFormFields = [
  {
    index: 0,
    name: 'name',
    title: '이름을 입력해주세요',
    rules: { required: true },
    component: <InputField label="이름" />,
  },
  {
    index: 1,
    name: 'phone',
    title: '휴대폰번호를 입력해주세요',
    rules: { required: true },
    component: (
      <InputField label="휴대폰번호" maxLength={11} onlyNum placeholder='"-" 하이픈 제외 숫자만 입력' />
    ),
  },
  {
    index: 2,
    name: 'address',
    title: '주소를 선택해주세요',
    rules: { required: true },
    component: <AddressField label="거주지" />,
  },
  {
    index: 3,
    name: 'bank',
    title: '은행을 선택해주세요',
    rules: { required: true },
    component: <InputField label="은행명" />,
  },
  {
    index: 4,
    name: 'bankAccount',
    title: '계좌번호를 입력해주세요',
    rules: { required: true },
    component: <InputField label="계좌번호" onlyNum />,
  },
];

const PersonalPage = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [title, setTitle] = useState<string>(personalFormFields[step].title);
  const [personal, setPersonal] = useRecoilState(personalState);
  const isLastStep = step === personalFormFields.length - 1;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PersonalData>({ defaultValues: personal });

  const { isKeyboardVisible } = useKeyboardState();

  useEffect(() => setTitle(personalFormFields[step].title), [step]);

  const handleAnimationComplete = () => inputRefs.current[step]?.focus();

  const handleFinish = (data: PersonalData) => {
    setPersonal(data);
    router.push('/contract/attachment');
  };

  const handleNextButtonClick = () => {
    if (isLastStep) handleSubmit(handleFinish)();
    else setStep((prevStep) => prevStep + 1);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <>
      <h1 className="mb-12 mt-8 text-xl font-bold">{title}</h1>

      <form className="flex flex-1 flex-col gap-10 pb-16" onSubmit={handleFormSubmit}>
        <AnimatePresence>
          {personalFormFields
            .slice()
            .reverse()
            .map(({ index, name, rules, component }) => {
              if (index > step) return null;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  onAnimationComplete={handleAnimationComplete}
                >
                  <Controller
                    control={control}
                    name={name as keyof PersonalData}
                    rules={rules}
                    render={({ field }) => {
                      return cloneElement(component, {
                        ...field,
                        onComplete: handleNextButtonClick,
                        inputRef: (el: HTMLInputElement) => (inputRefs.current[index] = el),
                      });
                    }}
                  />
                </motion.div>
              );
            })}
        </AnimatePresence>

        {isValid && (
          <motion.div
            className={cn(
              'fixed bottom-6 left-6 right-6 flex',
              isKeyboardVisible && `bottom-0 left-0 right-0 rounded-none`,
            )}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            <Button
              className={cn('flex-1', isKeyboardVisible && 'rounded-none')}
              type="button"
              variant="primary"
              size="lg"
              onClick={handleNextButtonClick}
            >
              다음
            </Button>
          </motion.div>
        )}
      </form>
    </>
  );
};

export default PersonalPage;
