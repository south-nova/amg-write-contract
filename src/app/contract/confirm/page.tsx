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
import PersonalConsent from '@/components/PersonalConsent';
import Signature from '@/components/Signature';
import { Button } from '@/components/ui/Button';
import { PAY_CYCLE_TEXT } from '@/constant/payCycle';
import { compressImage } from '@/lib/compressImage';
import { attachmentState } from '@/stores/attachment';
import { completeState } from '@/stores/complete';
import { contractState } from '@/stores/contract';
import { personalState } from '@/stores/personal';
import { signatureState } from '@/stores/signature';
import { ContractData } from '@/types/contract';
import { PersonalData } from '@/types/personal';

const CompanyInfo = {
  ceo: '김지호',
  name: '에이엠지(AMG)',
  address: '남양주시 미금로57번길 20, 715-2102',
};

const CompanyInfoItems = [
  { label: '대표자', value: CompanyInfo.ceo },
  { label: '상호명', value: CompanyInfo.name },
  { label: '주　소', value: CompanyInfo.address },
];

const dataToHTML = (personal: PersonalData, contract: ContractData) => {
  return `
        <h3>근무자 정보</h3>
        <p>이름: <strong>${personal.name}</strong></p>
        <p>연락처: <strong>${personal.phone}</strong></p>
        <p>주소: <strong>${personal.address}</strong></p>
        <p>은행명: <strong>${personal.bank}</strong></p>
        <p>계좌번호: <strong>${personal.bankAccount}</strong></p>
        <br />
        <h3>계약 정보</h3>
        <p>소속 업체: <strong>${contract.companyName}</strong></p>
        <p>급여: <strong>${contract.pay.toLocaleString()}원</strong></p>
        <p>급여 주기: <strong>${PAY_CYCLE_TEXT[contract.payCycle]}</strong></p>
        <p>급여일: <strong>${contract.payDate}일</strong></p>      
        <p>계약 기간: <strong>${contract.startDate}</strong> ~ <strong>${contract.endDate}</strong></p>      
      `;
};

const ConfirmPage = () => {
  const docRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const personal = useRecoilValue(personalState);
  const contract = useRecoilValue(contractState);
  const attachment = useRecoilValue(attachmentState);
  const setSignature = useSetRecoilState(signatureState);
  const setComplete = useSetRecoilState(completeState);

  const [sign, setSign] = useState<string>('');

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

  const postData = async () => {
    if (!docRef.current || attachment.idCard === null || attachment.bankbook === null) return;

    const canvas = await html2canvas(docRef.current);
    const dataUrl = canvas.toDataURL('image/png');
    const response = await fetch(dataUrl);
    const contractBlob = await response.blob();

    const formData = new FormData();
    const subject = `${personal.name}/${personal.phone}`;
    const content = dataToHTML(personal, contract);
    const idCard = await compressImage(attachment.idCard);
    const bankbook = await compressImage(attachment.bankbook);

    formData.append('subject', subject);
    formData.append('contentHTML', content);
    formData.append('idCard', idCard);
    formData.append('bankbook', bankbook);
    formData.append('contract', contractBlob);

    await axios.post('/api/email', formData).then(() => setComplete(true));
  };

  const handleSubmit = () => {
    if (sign) {
      setSignature(sign);
      postData();
      router.push('/contract/complete');
    }
  };

  return (
    <>
      <h1 className="mb-2 mt-8 text-xl font-bold">계약 내용 확인</h1>
      <p className="text-sm text-foreground-muted">계약 조항 및 동의서를 꼼꼼히 읽은 후,</p>
      <p className="mb-12 text-sm text-foreground-muted">아래 '서명하기' 버튼을 눌러 서명해 주세요.</p>

      <InfoCard className="mb-3" title="수급인" items={CompanyInfoItems} foldable />
      <InfoCard className="mb-8" items={contractItems} title="계약 정보" foldable folding />

      <div className="flex flex-col gap-3">
        <DrawerWithButton triggerText="계약 조항 확인하기" okText="확인했어요">
          <ContractArticle personal={personal} contract={contract} />
        </DrawerWithButton>

        <DrawerWithButton triggerText="개인정보 이용 동의서" okText="동의합니다">
          <PersonalConsent />
        </DrawerWithButton>
      </div>

      <DrawerWithButton
        description="모두 동의한다면 아래에 서명해 주세요."
        okText="계약서 제출하기"
        onOk={handleSubmit}
        triggerText="서명하기"
        trigger={
          <motion.div
            className="fixed bottom-6 left-6 right-6 flex"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            <Button variant="primary" className="flex-1" type="button" size="lg">
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

export default ConfirmPage;
