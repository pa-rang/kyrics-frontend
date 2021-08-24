import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { PlayerBottomProps } from 'types';

import MobilePlayerBottom from './MobilePlayerBottom';
import MobilePlayerTop from './MobilePlayerTop';

function MobilePlayer({
  isPlay,
  setIsPlay,
  handleSeekTime,
  handleBackTime,
  handleForwardTime,
}: PlayerBottomProps): ReactElement {
  return (
    <Styled.Root>
      <MobilePlayerTop
        handleSeekTime={handleSeekTime}
        handleBackTime={handleBackTime}
        handleForwardTime={handleForwardTime}
      />
      <MobilePlayerBottom
        isPlay={isPlay}
        setIsPlay={setIsPlay}
        handleSeekTime={handleSeekTime}
        handleBackTime={handleBackTime}
        handleForwardTime={handleForwardTime}
      />
    </Styled.Root>
  );
}

export default MobilePlayer;

const Styled = {
  Root: styled.div`
    @media (min-width: 415px) {
      display: none;
    }
  `,
};
