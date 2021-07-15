import PlayerBtns from '@components/study/PlayerBtns';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { PlayerProps } from 'types';

import PlayController from './PlayController';
function Player({ handleSeekTime, handleBackTime, handleForwardTime }: PlayerProps): ReactElement {
  return (
    <PlayerWrapper>
      <img className="player-album" src="assets/images/exampleImg.svg" alt="albumImage" />
      <PlayController
        handleSeekTime={handleSeekTime}
        handleBackTime={handleBackTime}
        handleForwardTime={handleForwardTime}
      />
      <PlayerBtns />
    </PlayerWrapper>
  );
}

export default Player;

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: url('assets/images/playerBackground.svg') no-repeat 0 0;
  background-size: cover;
  width: 100%;
  height: 263px;
  .player-album {
    /* width: 11.1111%; */
    width: 160px;
    height: 160px;
  }
`;
