'use client';

import { Controller, useForm } from 'react-hook-form';

import { motion } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';

import ConsentDrawer from '@/components/ConsentDrawer';
import ContractArticle from '@/components/ContractArticle';
import InfoCard from '@/components/InfoCard';
import PersonalConsent from '@/components/PersonalConsent';
import Signature from '@/components/Signature';
import { Button } from '@/components/ui/Button';
import { ConfirmState } from '@/stores/confirm';
import { ContractState } from '@/stores/contract';
import { PersonalState } from '@/stores/personal';
import { ConfirmData } from '@/types/confirm';

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
  const [confirm, setConfirm] = useRecoilState(ConfirmState);

  const personal = useRecoilValue(PersonalState);
  const contract = useRecoilValue(ContractState);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ConfirmData>({ defaultValues: confirm });

  const handleNextButtonClick = (data: ConfirmData) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="mb-2 mt-8 text-xl font-bold">계약 내용 확인</h1>
      <p className="text-sm text-foreground-muted">계약 조항 및 동의서를 꼼꼼히 읽은 후,</p>
      <p className="mb-12 text-sm text-foreground-muted">아래 '서명하기' 버튼을 눌러 서명해 주세요.</p>

      <InfoCard className="mb-6" title="수급인" items={CompanyInfoItems} />

      <form className="flex flex-col gap-3">
        <Controller
          control={control}
          name="contract"
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <ConsentDrawer
              asChildTrigger
              title="계약 조항"
              okButtonText="확인했어요"
              onOk={() => onChange(true)}
              trigger={
                <Button size="lg" className="relative w-full">
                  계약 조항 확인하기
                </Button>
              }
            >
              <ContractArticle personal={personal} contract={contract} />
            </ConsentDrawer>
          )}
        />

        <Controller
          control={control}
          name="personal"
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <ConsentDrawer
              asChildTrigger
              handleOnly
              title="개인정보 이용 동의서"
              okButtonText="동의합니다"
              onOk={() => onChange(true)}
              trigger={
                <Button size="lg" className="relative w-full">
                  개인정보 이용 동의서
                </Button>
              }
            >
              <PersonalConsent />
            </ConsentDrawer>
          )}
        />
        <Controller
          control={control}
          name="signature"
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <ConsentDrawer
              asChildTrigger
              handleOnly
              title="서명하기"
              description="모든 동의서를 확인하고 서명해 주세요."
              okButtonText="계약서 제출하기"
              onOk={() => onChange(true)}
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
              <Signature />
            </ConsentDrawer>
          )}
        />
      </form>
    </>
  );
};

export default ConfirmPage;
