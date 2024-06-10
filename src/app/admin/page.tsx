'use client';

import React from 'react';

import axios from 'axios';

import CreateContractForm from '@/components/CreateDraftForm';
import { useToast } from '@/components/ui/Toast/use-toast';
import { Draft } from '@/types/draft';

const AdminPage = () => {
  const { toast } = useToast();

  const handleSubmit = async (formData: Draft) => {
    try {
      const response = await axios.post('/api/draft', formData);
      const link = response.data.link;
      console.log(link);
      toast({
        title: '계약서 생성 완료',
        description: '링크가 클립보드에 복사되었습니다.',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: '계약서 생성 실패',
        description: '서버와의 연결이 원활하지 않습니다.',
        variant: 'error',
      });
    }
  };

  return (
    <div>
      <CreateContractForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AdminPage;
