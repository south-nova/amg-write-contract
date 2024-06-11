export type InputFormat = 'default' | 'phone' | 'money';

export const onlyNumber = (value: string) => value.replace(/\D/g, '');

export const formatInputValue = (value: string, format: InputFormat) => {
  switch (format) {
    case 'phone':
      value = value.slice(0, 11); // 최대 11자리까지만 허용 ('010' 포함)
      return value.replace(/(\d{3})(\d{1,4})?(\d{1,4})?/, (_, p1, p2, p3) => {
        if (p3) return `${p1} ${p2} ${p3}`;
        if (p2) return `${p1} ${p2}`;
        return p1;
      });
    case 'money':
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    case 'default':
    default:
      return value;
  }
};
