import { atom } from 'recoil';
import { ISongData } from 'types';

export const songDataState = atom({
  key: 'songDataState',
  default: {} as ISongData,
});
