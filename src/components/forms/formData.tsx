import { ControllerRenderProps } from 'react-hook-form';

import InputField from '@/components/InputField';

const formData = [
  {
    index: 0,
    name: 'name',
    rules: { required: '이름을 입력해주세요.' },
    component: <InputField label="이름" />,
  },
  {
    index: 1,
    name: 'phone',
    rules: {
      required: '휴대폰번호를 입력해주세요.',
      pattern: { value: /^\d{10,11}$/, message: '연락처를 확인해주세요.' },
    },
    component: <InputField label="휴대폰번호" format="phone" placeholder='"-" 하이픈 제외 숫자만 입력' />,
  },
  {
    index: 5,
    name: 'bank',
    rules: { required: '은행명을 입력해주세요.' },
    component: <InputField label="은행명" />,
  },
];
