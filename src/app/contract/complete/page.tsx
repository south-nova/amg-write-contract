'use client';

import Lottie from 'react-lottie-player';

import { useRecoilValue } from 'recoil';

import CompleteLottie from '@/assets/lotties/complete.json';
import LoadingLottie from '@/assets/lotties/loading.json';
import { completeState } from '@/stores/complete';

const CompletePage = () => {
  const complete = useRecoilValue(completeState);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex size-64 items-center justify-center overflow-hidden">
        {complete ? (
          <Lottie className="absolute size-[160px]" animationData={CompleteLottie} play />
        ) : (
          <Lottie className="absolute size-[320px]" loop animationData={LoadingLottie} play />
        )}
      </div>

      <h1 className="mb-2 mt-2 text-center text-xl font-bold">
        {complete ? '전송 완료! ' : '계약서를 전송중이에요'}
      </h1>
      <p className="mb-1 text-center text-sm text-foreground-muted">
        {complete ? '계약서 원부는 담당자에게 요청해주세요 😊' : '화면을 벗어나면 전송이 실패할 수 있어요.'}
      </p>
      {!complete && <p className="mb-12 text-center text-sm text-foreground-muted">잠시만 기다려주세요 😊</p>}
    </div>
  );
};

export default CompletePage;
