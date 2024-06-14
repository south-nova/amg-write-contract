import { atom } from 'recoil';

import { ConfirmData } from '@/types/confirm';

export const initConfirm: ConfirmData = {
  contract: false,
  personal: false,
  signature: '',
};

export const ConfirmState = atom<ConfirmData>({
  key: 'confirm',
  default: initConfirm,
});
