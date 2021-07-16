import PlayerBtns from '@components/study/PlayerBtns';
import styled from '@emotion/styled';
import { client } from 'lib/api';
import React, { ReactElement } from 'react';
import useSWR from 'swr';
import { ISongData, PlayerProps } from 'types';

import PlayController from './PlayController';

interface ISongDataWrapper {
  data: ISongData;
}
function Player({ handleSeekTime, handleBackTime, handleForwardTime }: PlayerProps): ReactElement {
  const id = 1;
  const { data } = useSWR<{ data: ISongDataWrapper }>(`/song/${id}`, client.get);
  const albumImageUrl: string | undefined = data?.data.data.albumImageUrl;

  console.log('>>', data?.data.data);

  return (
    <PlayerWrapper>
      <img className="player-album" src={albumImageUrl} alt="albumImage" />
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
    width: 160px;
    height: 160px;
  }
`;
