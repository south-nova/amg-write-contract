'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

import InfoCard from '@/components/InfoCard';
import { Button } from '@/components/ui/Button';
import { PAY_CYCLE_TEXT } from '@/constant/payCycle';
import { contractState } from '@/stores/contract';
import { ContractData } from '@/types/contract';

interface ContractPageProps {
  params: { link: string };
}

const ContractPage = ({ params }: ContractPageProps) => {
  const { link } = params;
  const [contract, setContract] = useRecoilState<ContractData>(contractState);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchContract = async () => {
      axios
        .get(`/api/draft?link=${link}`)
        .then((response) => {
          const startDate = new Date(response.data.startDate);
          const endDate = new Date(response.data.endDate);

          const data: ContractData = {
            ...response.data,
            startDate: format(startDate, 'yy년 M월 dd일'),
            endDate: format(endDate, 'yy년 M월 dd일'),
          };

          setContract(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchContract();
  }, [link, setContract]);

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

  const handleNextClick = () => router.push('/contract/personal');

  return (
    <>
      <h1 className="mb-2 mt-8 text-xl font-bold">AMG 근로계약서</h1>
      <p className="mb-12 text-sm text-foreground-muted">계약 내용을 확인해주세요</p>

      <InfoCard items={contractItems} loading={loading} />

      <motion.div
        className="fixed bottom-6 left-6 right-6 mx-auto flex max-w-[700px]"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.2 }}
      >
        <Button variant="primary" className="flex-1" type="button" size="lg" onClick={handleNextClick}>
          계약 내용이 맞습니다
        </Button>
      </motion.div>
    </>
  );
};

export default ContractPage;
