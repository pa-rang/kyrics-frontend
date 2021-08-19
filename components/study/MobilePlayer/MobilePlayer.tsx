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
    <div>
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
    </div>
  );
}

export default MobilePlayer;
