import { useEffect, useState } from 'react';

export const useKeyboardActive = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const preViewportHeight = Number(window.visualViewport?.height);

    const handleResize = () => {
      const viewportHeight = Number(window.visualViewport?.height);
      const documentHeight = document.documentElement.clientHeight;
      const isKeyboardActive = documentHeight !== viewportHeight && preViewportHeight > viewportHeight;
      const keyboardHeight = documentHeight - viewportHeight;

      setIsKeyboardVisible(isKeyboardActive);
      setKeyboardHeight(keyboardHeight);
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isKeyboardVisible, keyboardHeight };
};
