import { atom } from 'recoil';
import { ISongData } from 'types';

export const songDataState = atom({
  key: 'songDataState',
  default: {} as ISongData,
});

export const isYoutubeModalOpenedState = atom({
  key: 'isYoutubeModalOpenedState',
  default: false,
});

export const isPlayAtom = atom({
  key: 'isPlayAtom',
  default: false,
});

export const currentTimeAtom = atom({
  key: 'currentTimeAtom',
  default: 0,
});

export const volumeBarAtom = atom({
  key: 'volumeBarAtom',
  default: 50,
});

export const loopAtom = atom({
  key: 'loopAtom',
  default: false,
});

export const totalTimeAtom = atom({
  key: 'totalTimeAtom',
  default: 0,
});

export const percentageAtom = atom({
  key: 'percentageAtom',
  default: 0,
});

export const isMessageOpenedAtom = atom({
  key: 'isMessageOpenedAtom',
  default: false,
});

export const isVolumeOpenedAtom = atom({
  key: 'isVolumeOpenedAtom',
  default: false,
});

export const widthAtom = atom({
  key: 'widthAtom',
  default: 0,
});
