'use client';

import { useRecoilValue } from 'recoil';

import ContractArticleDrawer from '@/components/ContractArticleDrawer';
import { ContractState } from '@/stores/contract';
import { PersonalState } from '@/stores/personal';

const ConfirmPage = () => {
  const personal = useRecoilValue(PersonalState);
  const contract = useRecoilValue(ContractState);

  return (
    <>
      <h1 className="mb-2 mt-8 text-xl font-bold">계약 내용 확인</h1>
      <p className="text-sm text-foreground-muted">모든 계약 조항을 꼼꼼히 읽은 후,</p>
      <p className="mb-12 text-sm text-foreground-muted">계약에 동의한다면 아래 서명란에 서명해 주세요.</p>

      <form>
        <ContractArticleDrawer personal={personal} contract={contract} />
      </form>
    </>
  );
};

export default ConfirmPage;
