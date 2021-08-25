import React, { useEffect } from 'react';

export const useModalOutSideClick = (
  modalEl: React.MutableRefObject<HTMLDivElement | null>,
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (state && !modalEl?.current?.contains(e.target as Node)) {
      setState(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);
};
