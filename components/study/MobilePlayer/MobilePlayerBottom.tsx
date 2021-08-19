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
    <div>
      <MobileKeyExpression />
      <MobilePlayController
        handleSeekTime={handleSeekTime}
        handleBackTime={handleBackTime}
        handleForwardTime={handleForwardTime}
      />
    </div>
  );
}

export default MobilePlayerBottom;
