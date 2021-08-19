import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isMessageOpenedAtom,
  isPlayAtom,
  isVolumeOpenedAtom,
  loopAtom,
  songDataState,
  volumeBarAtom,
} from 'states';
import { PlayerProps } from 'types';

interface PlayControlStyledProps {
  isPlay: boolean;
}

interface VolumeStyledProps {
  isVolumeOpened: boolean;
  volume: number;
}

interface ReplayStyledProps {
  isMessageOpened: boolean;
  isLooped: boolean;
}
function MobilePlayController({
  handleSeekTime,
  handleBackTime,
  handleForwardTime,
}: PlayerProps): ReactElement {
  const [isPlay, setIsPlay] = useRecoilState<boolean>(isPlayAtom);
  const [volumeBar, setVolumeBar] = useRecoilState<number>(volumeBarAtom);
  const [loop, setLoop] = useRecoilState<boolean>(loopAtom);
  const [isMessageOpened, setIsMessageOpened] = useRecoilState<boolean>(isMessageOpenedAtom);
  const [isVolumeOpened, setIsVolumeOpened] = useRecoilState<boolean>(isVolumeOpenedAtom);
  const data = useRecoilValue(songDataState);

  const handlePlay = () => {
    setIsPlay((isPlay) => !isPlay);
  };

  const handleLoop = () => {
    setIsMessageOpened(true);
    setTimeout(setIsMessageOpened, 2000, false);
    setLoop((loop) => !loop);
  };

  const mouseEnterController = () => {
    setIsVolumeOpened(true);
  };
  const mouseLeaveController = () => {
    setIsVolumeOpened(false);
  };

  const handleVolumeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setIsVolumeOpened(true);
    setVolumeBar(parseInt(target.value));
  };

  return (
    <Styled.Root>
      <Styled.PlayControl isPlay={isPlay}>
        <Styled.Volume
          onMouseEnter={mouseEnterController}
          onMouseLeave={mouseLeaveController}
          isVolumeOpened={isVolumeOpened}
          volume={volumeBar}
        >
          <button className="volume__btn"></button>
          <input
            className="volume__bar"
            type="range"
            min={0}
            max={100}
            value={volumeBar}
            onInput={handleVolumeChange}
          />
        </Styled.Volume>
        <Styled.Playbtn>
          <button className="back-btn" onClick={handleBackTime}></button>
          <button className="play-btn" onClick={handlePlay}></button>
          <button className="forward-btn" onClick={handleForwardTime}></button>
        </Styled.Playbtn>
        <Styled.Replay isMessageOpened={isMessageOpened} isLooped={loop}>
          <button className="replay__btn" onClick={handleLoop}></button>
          {loop ? (
            <button className="replay__onoff">on</button>
          ) : (
            <button className="replay__onoff">off</button>
          )}
        </Styled.Replay>
        <Styled.Morebtn>
          <img className="more-btn" src="/assets/icons/viewMore.svg" alt="" />
        </Styled.Morebtn>
      </Styled.PlayControl>
    </Styled.Root>
  );
}

export default MobilePlayController;

const Styled = {
  Root: styled.div`
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
  `,
  PlayControl: styled.div``,
  Volume: styled.div``,
  Playbtn: styled.div``,
  Replay: styled.div``,
  Morebtn: styled.div``,
};
