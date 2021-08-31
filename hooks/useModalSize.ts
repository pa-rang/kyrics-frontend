import React, { useEffect } from 'react';

export function useDynamicModalSize(
  setModalHeight: React.Dispatch<React.SetStateAction<number>>,
  isYoutubeModalOpened: boolean,
) {
  const adjustModalHeight = () => {
    const modalWidth: number = window.outerWidth * 0.7;

    setModalHeight(modalWidth * 0.628);
  };

  useEffect(() => {
    adjustModalHeight();
  }, [isYoutubeModalOpened]);

  useEffect(() => {
    window.addEventListener('resize', adjustModalHeight);

    return () => {
      window.removeEventListener('resize', adjustModalHeight);
    };
  }, []);
}
