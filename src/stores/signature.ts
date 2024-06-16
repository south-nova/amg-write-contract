import { atom } from 'recoil';

import { SignatureData } from '@/types/signature';

export const initSignature: SignatureData = '';

export const signatureState = atom<SignatureData>({
  key: 'signature',
  default: initSignature,
});
