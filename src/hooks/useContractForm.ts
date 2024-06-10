import { useState } from 'react';

export interface UseStepFormParams {}

export const useStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      [`step${step}`]: data,
    }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (data: any) => {};

  return {
    step,
    formData,
    handleNext,
    handleBack,
    handleSubmit,
  };
};
