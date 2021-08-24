import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { PlayerBottomProps } from 'types';

import MobileKeyExpression from './MobileKeyExpression';
import MobilePlayController from './MobilePlayController';

function MobilePlayerBottom({
  isPlay,
  setIsPlay,
  handleSeekTime,
  handleBackTime,
  handleForwardTime,
}: PlayerBottomProps): ReactElement {
  return (
    <Styled.Root>
      <MobileKeyExpression />
      <MobilePlayController
        isPlay={isPlay}
        setIsPlay={setIsPlay}
        handleSeekTime={handleSeekTime}
        handleBackTime={handleBackTime}
        handleForwardTime={handleForwardTime}
      />
    </Styled.Root>
  );
}

export default MobilePlayerBottom;

const Styled = {
  Root: styled.div`
    position: relative;
  `,
};
