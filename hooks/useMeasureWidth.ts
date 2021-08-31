import { useSetRecoilState } from 'recoil';
import { widthAtom } from 'states';

import useWindowSize from './useWindowSize';

export function useMeasureWidth() {
  const setWidthState = useSetRecoilState(widthAtom);
  const width = useWindowSize()?.width;

  width && setWidthState(width);
}
