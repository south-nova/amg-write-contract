'use client';

import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { attachmentState } from '@/stores/attachment';
import { contractState } from '@/stores/contract';
import { personalState } from '@/stores/personal';
import { signatureState } from '@/stores/signature';

const CompletePage = () => {
  const personal = useRecoilValue(personalState);
  const contract = useRecoilValue(contractState);
  const attachment = useRecoilValue(attachmentState);
  const signature = useRecoilValue(signatureState);

  useEffect(() => {
    console.log(personal, contract, attachment, signature);
  }, []);

  return <></>;
};

export default CompletePage;
