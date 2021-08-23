import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { PlayerProps } from 'types';

import MobilePlayerBottom from './MobilePlayerBottom';
import MobilePlayerTop from './MobilePlayerTop';

function MobilePlayer({
  handleSeekTime,
  handleBackTime,
  handleForwardTime,
}: PlayerProps): ReactElement {
  return (
    <Styled.Root>
      <MobilePlayerTop
        handleSeekTime={handleSeekTime}
        handleBackTime={handleBackTime}
        handleForwardTime={handleForwardTime}
      />
      <MobilePlayerBottom
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
