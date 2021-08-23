import useWindowSize from './useWindowSize';

export const useMobile = () => {
  const size = useWindowSize();
  const isMobile = size && size.width < 768;

  return isMobile;
};
export const usePhone = () => {
  const size = useWindowSize();
  const isPhone = size && size.width < 415;

  return isPhone;
};
