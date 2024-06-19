'use client';

import { useEffect, useRef, useState } from 'react';

export const useFixedBottom = (extraBottomOffset: number = 0) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const fixedElementRef = useRef(null);

  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/.test(window.navigator.userAgent);

    const moveFixedElementIOS = (active: boolean) => {
      if (!fixedElementRef.current) return;

      const screenHeight = document.documentElement.clientHeight;
      const viewportHeight = Number(window.visualViewport?.height);
      const viewportOffsetTop = Number(window.visualViewport?.offsetTop);

      const elementStyles = (fixedElementRef.current as HTMLElement).style;

      if (active) {
        elementStyles.bottom = `${screenHeight - viewportHeight - viewportOffsetTop + extraBottomOffset}px`;
        window.visualViewport?.addEventListener('scroll', handleScroll);
      } else {
        elementStyles.bottom = '';
        window.visualViewport?.removeEventListener('scroll', handleScroll);
      }
    };

    const handleResize = () => {
      const screenHeight = document.documentElement.clientHeight;
      const viewportHeight = Number(window.visualViewport?.height);
      const isKeyboardActive = Math.round(viewportHeight) < screenHeight;

      setIsKeyboardVisible(isKeyboardActive);

      if (isIOS) moveFixedElementIOS(isKeyboardActive);
    };

    // Viewport 스크롤 제한
    const handleScroll = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      window.scrollTo(0, 0);
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener('scroll', handleScroll);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, [fixedElementRef]);

  return { fixedElementRef, isKeyboardVisible };
};
