import PlayerBtns from '@components/study/PlayerBtns';
import styled from '@emotion/styled';
import { useGetSongData } from 'hooks/api';
import { useMobile } from 'hooks/useMobile';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
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
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const songData = useGetSongData(id);
  const albumImageUrl = songData?.albumImageUrl;

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

const PlayerWrapper = styled.section`
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
