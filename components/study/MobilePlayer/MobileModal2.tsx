import styled from '@emotion/styled';
import { useModalOutSideClick } from 'hooks/useModalOutSideClick';
import React, { useRef } from 'react';

import PlayerBtns from '../PlayerBtns';

interface Props {
  isMobileModalOpened: boolean;
  setIsMobileModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileModal2({ isMobileModalOpened, setIsMobileModalOpened }: Props) {
  const modalEl = useRef<HTMLDivElement | null>(null);

  useModalOutSideClick(modalEl, isMobileModalOpened, setIsMobileModalOpened);

  return (
    <Styled.Root ref={modalEl}>
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
    height: 50px;

    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  `,
};
