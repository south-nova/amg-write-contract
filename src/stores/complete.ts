import { atom } from 'recoil';

export const completeState = atom<boolean>({
  key: 'complete',
  default: false,
});
