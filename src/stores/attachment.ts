import { atom } from 'recoil';

import { AttachmentData } from '@/types/attachment';

export const initAttachment: AttachmentData = {
  idCard: '',
  bankbook: '',
};

export const AttachmentState = atom<AttachmentData>({
  key: 'attachment',
  default: initAttachment,
});
