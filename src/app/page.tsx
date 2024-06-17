'use client';

import Lottie from 'react-lottie-player';

import { GitHubLogoIcon } from '@radix-ui/react-icons';

import EmptyLottie from '@/assets/lotties/empty.json';
import { IconButton } from '@/components/ui/IconButton';

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="mx-auto mt-14 flex flex-col justify-center">
        <Lottie className="size-[300px]" play animationData={EmptyLottie} />
        <h1 className="-mt-8 text-center text-[32px] font-extrabold">텅 -</h1>
        <p className="mt-1 text-center text-sm text-foreground-muted">아무 것도 없네요 💦</p>
      </div>
      {/* Footer */}
      <div className="relative flex items-center justify-center gap-1 border-t border-border bg-surface py-4">
        <a href="https://github.com/seongnam95/amg-write-contract">
          <IconButton variant="ghost" className="hover:bg-surface-accent">
            <GitHubLogoIcon />
          </IconButton>
        </a>
        <span className="absolute right-4 text-xs text-foreground-muted">dev. South Star</span>
      </div>
    </div>
  );
}
