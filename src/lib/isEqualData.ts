export const isEqualData = <T = Object>(a: T, b: T): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};
