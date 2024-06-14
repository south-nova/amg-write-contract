import { atom } from 'recoil';

import { PersonalData } from '@/types/personal';

export const initPersonal: PersonalData = {
  name: '',
  phone: '',
  address: '',
  bank: '',
  bankAccount: '',
};

export const PersonalState = atom<PersonalData>({
  key: 'personal',
  default: initPersonal,
});
