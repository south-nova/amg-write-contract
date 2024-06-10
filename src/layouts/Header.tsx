'use client';

import React, { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/cn';

interface HeaderOptions {
  title: string;
  description?: ReactNode;
}

const headers: Record<string, HeaderOptions> = {
  admin: { title: '계약서 생성', description: '계약서를 생성합니다.' },
  contract: {
    title: 'AMG 용역 계약서',
    description: (
      <>
        <p>계약자(수급인) 정보를 정확히 입력해주세요.</p>
        <p>올바르지 않은 정보 입력은</p>
        <p>계약 진행에 불이익을 초래할 수 있습니다.</p>
      </>
    ),
  },
};

const Header = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const basePath = pathSegments[0];
  if (!basePath) return null;

  return (
    <header className={cn('p-6')}>
      <h1 className="text-xl font-semibold">{headers[basePath].title}</h1>
      <div className="mt-3 text-sm text-foreground-muted">{headers[basePath].description}</div>
    </header>
  );
};

export default Header;
