import { ReactNode } from 'react';

import { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import { Toaster } from '@/components/ui/Toast/toseter';
import HeadMeta from '@/layouts/Head';
import RecoilWrapper from '@/layouts/RecoilWrapper';
import { cn } from '@/lib/cn';
import '@/styles/globals.css';

const inter = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AMG - 계약서',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <HeadMeta />
      <body id="root" className={cn('flex h-screen flex-col', inter.className)}>
        <RecoilWrapper>{children}</RecoilWrapper>
        <Toaster />
      </body>
    </html>
  );
}
