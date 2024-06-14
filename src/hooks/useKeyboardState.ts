import { useEffect, useState } from 'react';

export const useKeyboardState = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const preViewportHeight = Number(window.visualViewport?.height);

    const handleResize = () => {
      const viewportHeight = Number(window.visualViewport?.height);
      const isKeyboardActive = preViewportHeight > viewportHeight;

      setIsKeyboardVisible(isKeyboardActive);
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isKeyboardVisible };
};
