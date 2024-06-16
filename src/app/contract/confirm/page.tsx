'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import ContractArticle from '@/components/ContractArticle';
import DrawerWithButton from '@/components/DrawerWithButton';
import InfoCard from '@/components/InfoCard';
import PersonalConsent from '@/components/PersonalConsent';
import Signature from '@/components/Signature';
import { Button } from '@/components/ui/Button';
import { contractState } from '@/stores/contract';
import { personalState } from '@/stores/personal';
import { signatureState } from '@/stores/signature';

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

const ConfirmPage = () => {
  const router = useRouter();

  const personal = useRecoilValue(personalState);
  const contract = useRecoilValue(contractState);
  const signature = useSetRecoilState(signatureState);

  const [sign, setSign] = useState<string | null>(null);

  const handleSubmit = () => {
    if (sign) {
      signature(sign);
      router.push('/contract/complete');
    }
  };

  return (
    <>
      <h1 className="mb-2 mt-8 text-xl font-bold">계약 내용 확인</h1>
      <p className="text-sm text-foreground-muted">계약 조항 및 동의서를 꼼꼼히 읽은 후,</p>
      <p className="mb-12 text-sm text-foreground-muted">아래 '서명하기' 버튼을 눌러 서명해 주세요.</p>

      <InfoCard className="mb-6" title="수급인" items={CompanyInfoItems} />

      <div className="flex flex-col gap-3">
        <DrawerWithButton triggerText="계약 조항 확인하기" okText="확인했어요">
          <ContractArticle personal={personal} contract={contract} />
        </DrawerWithButton>

        <DrawerWithButton triggerText="개인정보 이용 동의서" okText="동의합니다">
          <PersonalConsent />
        </DrawerWithButton>
      </div>

      <DrawerWithButton
        description="모든 동의서를 확인하고 서명해 주세요."
        okText="계약서 제출하기"
        onOk={handleSubmit}
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
    </>
  );
};

export default ConfirmPage;
