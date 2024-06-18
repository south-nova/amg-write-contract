import { ReactElement, isValidElement } from 'react';

const isComponentOfType = (element: ReactElement, displayNames: string[]): boolean => {
  if (!isValidElement(element)) return false;
  if (typeof element.type === 'string') return false;

  const type = element.type as any;
  return (
    displayNames.includes(type.displayName) || (type.render && displayNames.includes(type.render.displayName))
  );
};

export default isComponentOfType;
