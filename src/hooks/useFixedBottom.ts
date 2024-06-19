'use client';

import { useEffect, useRef, useState } from 'react';

export const useFixedBottom = (extraBottomOffset: number = 0) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const fixedElementRef = useRef(null);

  useEffect(() => {
    const preViewportHeight = Number(window.visualViewport?.height);

    const isIOS = /iPhone|iPad|iPod/.test(window.navigator.userAgent);
    const isAndroid = /Android/.test(window.navigator.userAgent);
    const isKakao = /KAKAO/.test(window.navigator.userAgent);

    const handleResize = () => {
      const isKeyboardActive = getIsKeyboardVisible();
      setIsKeyboardVisible(isKeyboardActive);

      if (isIOS) moveFixedElementIOS(isKeyboardActive);
      if (isAndroid) moveFixedElementAndroid(isKeyboardActive);
    };

    // Viewport 스크롤 제한
    const handleScroll = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      window.scrollTo(0, 0);
    };

    const moveFixedElementAndroid = (active: boolean) => {
      if (!fixedElementRef.current) return;

      const elementStyles = (fixedElementRef.current as HTMLElement).style;

      if (active) {
        elementStyles.bottom = '0';
        window.visualViewport?.addEventListener('scroll', handleScroll);
      } else {
        elementStyles.bottom = '';
        window.visualViewport?.removeEventListener('scroll', handleScroll);
      }
    };

    const moveFixedElementIOS = (active: boolean) => {
      if (!fixedElementRef.current) return;

      const screenHeight = window.innerHeight;
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

    const getIsKeyboardVisible = () => {
      const screenHeight = window.innerHeight;
      const viewportHeight = Number(window.visualViewport?.height);

      let isKeyboardActive;
      if (isAndroid && isKakao) {
        isKeyboardActive = Math.round(preViewportHeight) > Math.round(viewportHeight);
      } else {
        isKeyboardActive = Math.round(viewportHeight) < screenHeight;
      }

      return isKeyboardActive;
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener('scroll', handleScroll);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, [fixedElementRef, extraBottomOffset]);

  return { fixedElementRef, isKeyboardVisible };
};
