import { atom } from 'recoil';

import { ContractData } from '@/types/contract';

export const initContract: ContractData = {
  companyName: '',
  pay: 0,
  payDate: 0,
  payCycle: 'daily',
  startDate: '',
  endDate: '',
};

export const ContractState = atom<ContractData>({
  key: 'contract',
  default: initContract,
});
