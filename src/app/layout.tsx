import { ReactNode } from 'react';

import { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import { Toaster } from '@/components/ui/Toast/toseter';
import Content from '@/layouts/Content';
import Header from '@/layouts/Header';
import '@/styles/globals.css';

const inter = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AMG - 계약서',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main id="root" className="flex h-screen w-screen flex-col">
          <Header />
          <Content className="flex-grow">{children}</Content>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
