export type InputFormat = 'default' | 'phone' | 'ssn' | 'money';

export const formatInputValue = (value: string, format: InputFormat) => {
  switch (format) {
    case 'ssn':
      value = value.slice(0, 13); // 최대 13자리까지만 허용
      return value.length > 6 ? `${value.substring(0, 6)} ${value.substring(6)}` : value;
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
