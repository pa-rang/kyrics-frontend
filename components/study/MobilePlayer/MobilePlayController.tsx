import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isPlayAtom, loopAtom } from 'states';
import { PlayerProps } from 'types';

import MobileModal from './MobileModal';

interface PlayControlStyledProps {
  isPlay: boolean;
}

interface ReplayStyledProps {
  isLooped: boolean;
}
function MobilePlayController({ handleBackTime, handleForwardTime }: PlayerProps): ReactElement {
  const [isPlay, setIsPlay] = useRecoilState<boolean>(isPlayAtom);
  const [loop, setLoop] = useRecoilState<boolean>(loopAtom);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handlePlay = () => {
    setIsPlay((isPlay) => !isPlay);
  };

  const handleLoop = () => {
    setLoop((loop) => !loop);
  };

  const handleModal = () => {
    setIsModalOpened((isModalOpened) => !isModalOpened);
  };

  return (
    <Styled.Root>
      <Styled.ModalWrapper>{isModalOpened && <MobileModal />}</Styled.ModalWrapper>
      <Styled.PlayerWrapper>
        <Styled.PlayControl>
          <Styled.Replay isLooped={loop}>
            <button className="replay__btn" onClick={handleLoop}></button>
          </Styled.Replay>
          <Styled.Playbtn isPlay={isPlay}>
            <button className="back-btn" onClick={handleBackTime}></button>
            <button className="play-btn" onClick={handlePlay}></button>
            <button className="forward-btn" onClick={handleForwardTime}></button>
          </Styled.Playbtn>
          <Styled.Morebtn>
            <button className="more-btn" onClick={handleModal} />
          </Styled.Morebtn>
        </Styled.PlayControl>
      </Styled.PlayerWrapper>
    </Styled.Root>
  );
}

export default MobilePlayController;

const Styled = {
  Root: styled.div``,
  ModalWrapper: styled.div``,
  PlayerWrapper: styled.div`
    display: flex;
    position: fixed;
    bottom: 0;
    align-items: center;
    justify-content: space-around;
    z-index: 1;
    background: url('/assets/images/playerBackground.svg') no-repeat 0 0;
    background-size: cover;
    width: 100%;
    height: 60px;
    button {
      outline: 0;
      border: 0;
      cursor: pointer;
    }
  `,
  PlayControl: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 66%;
  `,
  Playbtn: styled.div<PlayControlStyledProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 58%;
    .back-btn {
      background: url('/assets/icons/backIcon.svg') no-repeat 0 0;
      width: 19px;
      height: 23px;
      /* &:hover {
        filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(49deg)
          brightness(95%) contrast(85%);
      } */
    }
    .play-btn {
      ${({ isPlay }) =>
        isPlay
          ? css`
              background: url('/assets/icons/pauseIcon.svg') no-repeat 0 0;
            `
          : css`
              background: url('/assets/icons/playIcon.svg') no-repeat 0 0;
            `}
      width: 31px;
      height: 31px;
      /* &:hover {
        filter: brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(43%) hue-rotate(297deg)
          brightness(116%) contrast(76%);
      } */
    }
    .forward-btn {
      background: url('/assets/icons/forwardIcon.svg') no-repeat 0 0;
      width: 19px;
      height: 23px;
      /* &:hover {
        filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(49deg)
          brightness(95%) contrast(85%);
      } */
    }
  `,
  Replay: styled.div<ReplayStyledProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30px;
    .replay {
      &__btn {
        background: url('/assets/icons/replayIcon.svg') no-repeat 0 0;
        width: 20px;
        height: 20px;
        ${({ isLooped }) =>
          !isLooped &&
          css`
            filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%)
              hue-rotate(49deg) brightness(95%) contrast(85%);
          `}
      }
    }
  `,
  Morebtn: styled.div`
    .more-btn {
      background: url('/assets/icons/viewMore.svg') no-repeat 0 0;
      width: 20px;
      height: 5px;
    }
  `,
};
