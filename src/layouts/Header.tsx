'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/cn';

const titles: Record<string, string> = {
  admin: '계약서 생성',
  contract: 'AMG 용역 계약서',
};

const Header = () => {
  const pathname = usePathname();
  const path = pathname.split('/').pop();
  if (!path) return null;

  return (
    <header className={cn('p-6')}>
      <h1 className="text-xl font-semibold">{titles[path]}</h1>
    </header>
  );
};

export default Header;
