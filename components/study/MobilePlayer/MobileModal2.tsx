import styled from '@emotion/styled';
import React from 'react';

import PlayerBtns from '../PlayerBtns';

interface Props {
  setIsMobileModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileModal2({ setIsMobileModalOpened }: Props) {
  console.log('mobilemodal2');

  return (
    <Styled.Root>
      <PlayerBtns setIsMobileModalOpened={setIsMobileModalOpened} />
    </Styled.Root>
  );
}

export default MobileModal2;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: #f8fafc;
    width: 170px;
    height: 75px;

    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  `,
};
