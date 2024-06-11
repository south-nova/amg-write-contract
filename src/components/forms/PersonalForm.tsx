'use client';

import { RefObject, cloneElement, useEffect, useRef, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { AnimatePresence, motion } from 'framer-motion';

import AddressField from '@/components/AddressField';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/cn';

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

const personalFormFields = [
  {
    index: 0,
    name: 'name',
    rules: { required: '이름을 입력해주세요.' },
    component: <InputField label="이름" />,
  },
  {
    index: 1,
    name: 'phone',
    rules: { required: '휴대폰번호를 입력해주세요.' },
    component: <InputField label="휴대폰번호" format="phone" placeholder='"-" 하이픈 제외 숫자만 입력' />,
  },
  {
    index: 2,
    name: 'address',
    rules: { required: '거주지 주소를 선택해주세요.' },
    component: <AddressField label="거주지" />,
  },
  {
    index: 3,
    name: 'bank',
    rules: { required: '은행명을 입력해주세요.' },
    component: <InputField label="은행명" />,
  },
  {
    index: 4,
    name: 'bankAccount',
    rules: { required: '계좌번호를 입력해주세요.' },
    component: <InputField label="계좌번호" onlyNum />,
  },
];

const PersonalForm = ({ values, onNext }: PersonalFormProps) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [step, setStep] = useState(0);
  const isLastStep = step === personalFormFields.length - 1;

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<PersonalData>({ defaultValues: values });

  useEffect(() => {
    const handleResize = () => {
      const isKeyboardActive = window.innerHeight < document.documentElement.clientHeight;
      setIsKeyboardVisible(isKeyboardActive);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNextButtonClick = () => {
    console.log(errors, isLastStep);
    if (isLastStep) handleSubmit((v) => console.log(v))();
    else setStep((prevStep) => prevStep + 1);
  };

  return (
    <form className="flex flex-col gap-8">
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
              >
                <Controller
                  control={control}
                  name={name as keyof PersonalData}
                  rules={rules}
                  render={({ field }) => {
                    return cloneElement(component, {
                      onComplete: handleNextButtonClick,
                      ...field,
                    });
                  }}
                />
              </motion.div>
            );
          })}
      </AnimatePresence>

      <Button
        className="absolute bottom-6 left-6 right-6 mt-8"
        type="button"
        size="lg"
        disabled={!isValid}
        onClick={handleNextButtonClick}
      >
        다음
      </Button>
    </form>
  );
};

export default PersonalForm;
