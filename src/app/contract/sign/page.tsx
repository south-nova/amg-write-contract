'use client';

import { useRef, useState } from 'react';

import axios from 'axios';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import ContractArticle from '@/components/ContractArticle';
import ContractDocument from '@/components/ContractDocument';
import DrawerWithButton from '@/components/DrawerWithButton';
import InfoCard from '@/components/InfoCard';
import PersonalContent from '@/components/PersonalContent';
import Signature from '@/components/Signature';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toast/use-toast';
import { COMPANY_INFO } from '@/constant/company';
import { PAY_CYCLE_TEXT } from '@/constant/payCycle';
import usePageLeave from '@/hooks/usePageLeave';
import { compressImage } from '@/lib/compressImage';
import { isEqualData } from '@/lib/isEqualData';
import { attachmentState, initAttachment } from '@/stores/attachment';
import { completeState } from '@/stores/complete';
import { contractState, initContract } from '@/stores/contract';
import { initPersonal, personalState } from '@/stores/personal';
import { signatureState } from '@/stores/signature';
import { AttachmentData } from '@/types/attachment';
import { ContractData } from '@/types/contract';
import { PersonalData } from '@/types/personal';
import { dataToHTML } from '@/utils/dataToHTML';

const CompanyInfoItems = [
  { label: '대표자', value: COMPANY_INFO.ceo },
  { label: '상호명', value: COMPANY_INFO.businessName },
  { label: '주　소', value: COMPANY_INFO.companyAddress },
];

const SignPage = () => {
  usePageLeave();

  const router = useRouter();

  const personal = useRecoilValue(personalState);
  const contract = useRecoilValue(contractState);
  const attachment = useRecoilValue(attachmentState);
  const setSignature = useSetRecoilState(signatureState);
  const setComplete = useSetRecoilState(completeState);

  const docRef = useRef<HTMLDivElement>(null);
  const [sign, setSign] = useState<string>('');
  const [navLoading, setNavLoading] = useState(false);

  const contractItems = [
    { label: '소속 업체', value: contract.companyName, accent: true },
    {
      label: '용역 수수료',
      value: `${PAY_CYCLE_TEXT[contract.payCycle]} ${contract.pay.toLocaleString()}원`,
    },
    { label: '지급일', value: `${contract.payDate}일` },
    { label: '계약 시작일', value: contract.startDate },
    { label: '계약 종료일', value: contract.endDate },
  ];

  const isDataValid = () => {
    return (
      isEqualData<ContractData>(contract, initContract) ||
      isEqualData<PersonalData>(personal, initPersonal) ||
      isEqualData<AttachmentData>(attachment, initAttachment)
    );
  };

  const postData = async () => {
    if (!docRef.current || attachment.idCard === null || attachment.bankbook === null) return;

    const canvas = await html2canvas(docRef.current, { scale: 1.5 });
    const imageFile = canvas.toDataURL('image/png');

    const response = await fetch(imageFile);
    const contractBlob = await response.blob();

    const formData = new FormData();
    const subject = `[${contract.companyName}] ${personal.name}`;
    const content = dataToHTML(personal, contract);
    const idCard = await compressImage(attachment.idCard);
    const bankbook = await compressImage(attachment.bankbook);

    formData.append('subject', subject);
    formData.append('contentHTML', content);
    formData.append('idCard', idCard, `${personal.name}_신분증.jpg`);
    formData.append('bankbook', bankbook, `${personal.name}_통장사본.jpg`);
    formData.append('contract', contractBlob, `${personal.name}_계약서.png`);

    await axios.post('/api/email', formData).then(() => setComplete(true));
  };

  const handleSubmit = () => {
    if (sign) {
      if (isDataValid()) {
        toast({
          title: '계약 정보가 초기화되었습니다.',
          description: '처음부터 다시 작성해주세요 😢',
          variant: 'error',
        });
        return;
      }
      setSignature(sign);
      postData();
      setNavLoading(true);
      router.push('/contract/complete');
    }
  };

  return (
    <>
      <h1 className="mb-2 mt-8 text-xl font-bold">계약 내용 확인</h1>
      <p className="text-sm text-foreground-muted">계약 조항 및 동의서를 꼼꼼히 읽은 후,</p>
      <p className="mb-12 text-sm text-foreground-muted">아래 서명하기 버튼을 눌러 서명해 주세요.</p>

      <InfoCard className="mb-3" title="수급인" items={CompanyInfoItems} foldable />
      <InfoCard className="mb-8" items={contractItems} title="계약 정보" foldable folding />

      <div className="flex flex-col gap-3">
        <DrawerWithButton triggerText="계약 조항 확인하기" okText="확인했어요">
          <ContractArticle personal={personal} contract={contract} />
        </DrawerWithButton>

        <DrawerWithButton triggerText="개인정보 이용 동의서" okText="동의합니다">
          <PersonalContent />
        </DrawerWithButton>
      </div>

      <DrawerWithButton
        description="모두 동의한다면 아래에 서명해 주세요."
        okText="계약서 제출하기"
        onOk={handleSubmit}
        triggerText="서명하기"
        trigger={
          <motion.div
            className="fixed bottom-6 left-6 right-6 mx-auto flex max-w-[700px]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            <Button loading={navLoading} variant="primary" className="flex-1" type="button" size="lg">
              모두 동의하고 서명하기
            </Button>
          </motion.div>
        }
      >
        <Signature onChange={setSign} />
      </DrawerWithButton>

      <ContractDocument
        className="absolute -left-[300rem] -z-10"
        personal={personal}
        contract={contract}
        signature={sign}
        ref={docRef}
      />
    </>
  );
};

export default SignPage;
