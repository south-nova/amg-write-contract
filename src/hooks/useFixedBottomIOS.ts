'use client';

import { useEffect, useRef } from 'react';

export const useFixedBottomIOS = (extraBottomOffset: number = 0) => {
  const fixedElementRef = useRef(null);

  useEffect(() => {
    if (/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
      const handleResize = () => {
        const screenHeight = document.documentElement.clientHeight;
        const screenHeightWithoutKeyboard = Number(window.visualViewport?.height);
        const offsetTop = Number(window.visualViewport?.offsetTop);

        if (fixedElementRef.current) {
          const elementStyles = (fixedElementRef.current as HTMLElement).style;

          if (Math.round(screenHeightWithoutKeyboard) < screenHeight) {
            elementStyles.bottom = `${screenHeight - screenHeightWithoutKeyboard - offsetTop + extraBottomOffset}px`;
          } else elementStyles.bottom = '';
        }
      };

      // Viewport 스크롤 제한
      const handleScroll = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();

        window.scrollTo(0, 0);
      };

      window.visualViewport?.addEventListener('scroll', handleScroll);
      window.visualViewport?.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.visualViewport?.removeEventListener('scroll', handleScroll);
        window.visualViewport?.removeEventListener('resize', handleResize);
      };
    }
  }, [fixedElementRef]);

  return { fixedElementRef };
};
