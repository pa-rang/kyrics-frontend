import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { PlayerProps } from 'types';

import MobileKeyExpression from './MobileKeyExpression';
import MobilePlayController from './MobilePlayController';

function MobilePlayerBottom({
  handleSeekTime,
  handleBackTime,
  handleForwardTime,
}: PlayerProps): ReactElement {
  return (
    <Styled.Root>
      <MobileKeyExpression />
      <MobilePlayController
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
