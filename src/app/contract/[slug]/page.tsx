'use client';

import { useState } from 'react';

import PersonalForm, { PersonalData } from '@/components/forms/PersonalForm';
import UploadForm, { UploadData } from '@/components/forms/UploadForm';

interface ContractPageProps {
  params: { slug: string };
}

interface FormData {
  personal: PersonalData;
  upload: UploadData;
}

const initialData: FormData = {
  personal: {
    name: '',
    phone: '',
    address: '',
    bank: '',
    bankAccount: '',
  },
  upload: {
    idCard: '',
    bankbook: '',
  },
};

const ContractPage = ({ params }: ContractPageProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleNext = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      [`step${step}`]: data,
    }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div>
      {step === 1 && <PersonalForm values={formData.personal} onNext={handleNext} />}
      {step === 2 && <UploadForm values={formData.upload} onNext={handleNext} onBack={handleBack} />}
    </div>
  );
};

export default ContractPage;
