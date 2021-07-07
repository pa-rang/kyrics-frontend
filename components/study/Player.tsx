import PlayerBtns from '@components/study/PlayerBtns';
import styled from '@emotion/styled';
import React, { ReactElement, useState } from 'react';

function Player(): ReactElement {
  return (
    <PlayerWrapper>
      <PlayerBtns />
    </PlayerWrapper>
  );
}

export default Player;

const PlayerWrapper = styled.div``;
