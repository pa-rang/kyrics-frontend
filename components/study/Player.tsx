import PlayerBtns from '@components/study/PlayerBtns';
import styled from '@emotion/styled';
import { useMobile } from 'hooks/useMobile';
import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { songDataState } from 'states';
import { PlayerBottomProps } from 'types';

import PlayController from './PlayController';

function Player({
  isPlay,
  setIsPlay,
  handleSeekTime,
  handleBackTime,
  handleForwardTime,
}: PlayerBottomProps): ReactElement {
  const isMobile = useMobile();
  const data = useRecoilValue(songDataState);
  const albumImageUrl = data?.albumImageUrl;

  return (
    <PlayerWrapper>
      {isMobile || <img className="player-album" src={albumImageUrl} alt="albumImage" />}
      <PlayController
        isPlay={isPlay}
        setIsPlay={setIsPlay}
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
  background: url('/assets/images/playerBackground.svg') no-repeat 0 0;
  background-size: cover;
  width: 100%;
  height: 263px;
  .player-album {
    width: 160px;
    height: 160px;
  }
  @media screen and (max-width: 415px) {
    display: none;
  }
`;
