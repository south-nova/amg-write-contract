'use client';

import { useEffect } from 'react';

import axios from 'axios';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

import ContractInfo from '@/components/ContractInfo';
import { Button } from '@/components/ui/Button';
import { ContractState } from '@/stores/contract';
import { ContractData } from '@/types/contract';

interface ContractPageProps {
  params: { link: string };
}

const ContractPage = ({ params }: ContractPageProps) => {
  const { link } = params;
  const [contract, setContract] = useRecoilState<ContractData>(ContractState);

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
          console.log(data);
          setContract(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchContract();
  }, [link]);

  const handleNextClick = () => router.push('/contract/personal');

  return (
    <>
      <h1 className="mb-2 mt-8 text-xl font-bold">AMG 근로계약서</h1>
      <p className="mb-12 text-sm text-foreground-muted">계약 내용을 확인해주세요</p>

      <ContractInfo contract={contract} />

      <motion.div
        className="fixed bottom-6 left-6 right-6 flex"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.2 }}
      >
        <Button className="flex-1" type="button" size="lg" onClick={handleNextClick}>
          계약 내용이 맞습니다
        </Button>
      </motion.div>
    </>
  );
};

export default ContractPage;
