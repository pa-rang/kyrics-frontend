import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentTimeAtom,
  isMessageOpenedAtom,
  isPlayAtom,
  isVolumeOpenedAtom,
  loopAtom,
  percentageAtom,
  songDataState,
  totalTimeAtom,
  volumeBarAtom,
} from 'states';
interface ProgressStyledProps {
  percentage: number;
}

interface MiniPlayerProps {
  handleSeekTime: (e: React.FormEvent<HTMLInputElement>) => void;
  handleBackTime: () => void;
  handleForwardTime: () => void;
  miniPlayerOpened: boolean | undefined;
}
interface PlayControlStyledProps {
  isPlay: boolean;
}

interface VolumeStyledProps {
  isVolumeOpened: boolean;
  volume: number;
}

interface ReplayStyledProps {
  isLooped: boolean;
  isMessageOpened: boolean;
}
function MiniPlayer({
  handleSeekTime,
  handleBackTime,
  handleForwardTime,
  miniPlayerOpened,
}: MiniPlayerProps): ReactElement {
  const [isPlay, setIsPlay] = useRecoilState<boolean>(isPlayAtom);
  const currentTime = useRecoilValue<number>(currentTimeAtom);
  const [volumeBar, setVolumeBar] = useRecoilState<number>(volumeBarAtom);
  const [loop, setLoop] = useRecoilState<boolean>(loopAtom);
  const totalTime = useRecoilValue<number>(totalTimeAtom);
  const [isMessageOpened, setIsMessageOpened] = useRecoilState<boolean>(isMessageOpenedAtom);
  const percentage = useRecoilValue<number>(percentageAtom);
  const [isVolumeOpened, setIsVolumeOpened] = useRecoilState<boolean>(isVolumeOpenedAtom);
  const data = useRecoilValue(songDataState);
  const title = data?.title;
  const artist = data?.artist;

  const currentTimeForm =
    currentTime % 60 <= 9
      ? `0${Math.floor(currentTime / 60)}:0${Math.floor(currentTime) % 60} `
      : `0${Math.floor(currentTime / 60)}:${Math.floor(currentTime) % 60} `;

  const finishedTime =
    totalTime % 60 <= 9
      ? `0${Math.floor(totalTime / 60)}:0${totalTime % 60} `
      : `0${Math.floor(totalTime / 60)}:${totalTime % 60} `;

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
    <Styled.Root miniPlayerOpened={miniPlayerOpened}>
      <Styled.Title>
        <div className="title">{title}</div>
        <div className="artist">{artist}</div>
      </Styled.Title>
      <Styled.MiniPlayer>
        <Styled.Progress percentage={percentage}>
          <div className="time__current">{currentTimeForm}</div>
          <input
            className="bar"
            type="range"
            min={0}
            max={totalTime}
            value={currentTime}
            onInput={handleSeekTime}
          />
          <div className="time__end">{finishedTime}</div>
        </Styled.Progress>
        <Styled.PlayControl isPlay={isPlay}>
          <button className="back-btn" onClick={handleBackTime}></button>
          <button className="play-btn" onClick={handlePlay}></button>
          <button className="forward-btn" onClick={handleForwardTime}></button>
        </Styled.PlayControl>
      </Styled.MiniPlayer>
      <Styled.Volume isVolumeOpened={isVolumeOpened} volume={volumeBar}>
        <div
          className="volume"
          onMouseEnter={mouseEnterController}
          onMouseLeave={mouseLeaveController}
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
        </div>
      </Styled.Volume>
      <Styled.Replay isMessageOpened={isMessageOpened} isLooped={loop}>
        <div className="replay">
          <button className="replay__btn" onClick={handleLoop}></button>
          {loop ? (
            <button className="replay__onoff">on</button>
          ) : (
            <button className="replay__onoff">off</button>
          )}
        </div>
      </Styled.Replay>
    </Styled.Root>
  );
}

export default MiniPlayer;

const Styled = {
  Root: styled.div<{ miniPlayerOpened: boolean | undefined }>`
    display: ${({ miniPlayerOpened }) => (miniPlayerOpened ? 'flex' : 'none')};
    position: fixed;
    bottom: 41px;
    align-items: center;
    justify-content: space-around;
    z-index: 1;
    border-radius: 10px;
    background: url('/assets/images/miniPlayerImage.svg') no-repeat 0 0;
    background-color: #ffffff;
    width: 80.55%;
    height: 100px;
    button {
      outline: 0;
      border: 0;
      cursor: pointer;
    }

    /* only Chrome */
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      border-radius: 50%;
      background: #ffffff;
      cursor: pointer;
      width: 16px;
      height: 16px;
    }

    input[type='range']:focus {
      outline: none;
    }
    @media screen and (max-width: 415px) {
      display: none;
    }
    /* @media screen and (max-width: 900px) {
      width: 68%;
    } */
  `,
  Title: styled.div`
    text-align: center;
    color: #ffffff;
    font-family: Noto Sans;
    font-style: normal;
    .title {
      margin-bottom: 4px;
      font-size: 20px;
      font-weight: bold;
    }
    .artist {
      font-size: 16px;
    }
    @media screen and (max-width: 900px) {
      display: none;
    }
  `,
  MiniPlayer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 46.2931%;
    height: 55px;
    @media screen and (max-width: 900px) {
      width: 78.2931%;
    }
  `,
  Progress: styled.div<ProgressStyledProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    width: 100%;
    height: 16px;
    .time__current {
      margin-right: 10px;
      line-height: 14px;
      color: #e1e1e1;
      font-family: Roboto;
      font-size: 12px;
    }
    .bar {
      -webkit-appearance: none;
      align-self: center;
      margin-top: 17px;
      margin-bottom: 20px;
      border-radius: 10px;
      background-color: #9d9d9d;
      width: 469px;
      height: 3px;
      ${({ percentage }) => css`
        background: linear-gradient(
          to right,
          #ffffff 0%,
          #ffffff ${percentage}%,
          #9d9d9d ${percentage}%,
          #9d9d9d 100%
        );
      `}
    }
    .time__end {
      margin-left: 10px;
      line-height: 14px;
      color: #e1e1e1;
      font-family: Roboto;
      font-size: 12px;
    }
  `,
  PlayControl: styled.div<PlayControlStyledProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    .back-btn {
      background: url('/assets/icons/backMiniIcon.svg') no-repeat 0 0;
      width: 19px;
      height: 23px;
      &:hover {
        filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(49deg)
          brightness(95%) contrast(85%);
      }
    }
    .play-btn {
      margin-right: 75px;
      margin-left: 75px;
      ${({ isPlay }) =>
        isPlay
          ? css`
              background: url('/assets/icons/pauseMiniIcon.svg') no-repeat 0 0;
            `
          : css`
              background: url('/assets/icons/playMiniIcon.svg') no-repeat 0 0;
            `}
      width: 20px;
      height: 20px;
      &:hover {
        filter: brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(43%) hue-rotate(297deg)
          brightness(116%) contrast(76%);
      }
    }
    .forward-btn {
      background: url('/assets/icons/forwardMiniIcon.svg') no-repeat 0 0;
      width: 19px;
      height: 23px;
      &:hover {
        filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(49deg)
          brightness(95%) contrast(85%);
      }
    }
  `,
  Volume: styled.div<VolumeStyledProps>`
    @media screen and (max-width: 900px) {
      display: none;
    }
    @keyframes fadein {
      0% {
        visibility: hidden;
        opacity: 0;
      }
      100% {
        visibility: visible;
        opacity: 1;
      }
    }

    @keyframes fadeout {
      0% {
        visibility: visible;
        opacity: 1;
      }
      100% {
        visibility: hidden;
        opacity: 0;
      }
    }
    .volume {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: -5px;
      width: 116.01px;
      height: 25px;
      &__btn {
        background: url('/assets/icons/soundMiniIcon.svg') no-repeat 0 0;
        width: 23px;
        height: 23px;
        &:hover {
          filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(49deg)
            brightness(95%) contrast(85%);
        }
      }
      &__bar {
        -webkit-appearance: none;
        border-radius: 10px;
        background-color: #9d9d9d;
        width: 76.01px;
        height: 3px;
        ${({ volume }) => css`
          background: linear-gradient(
            to right,
            #ffffff 0%,
            #ffffff ${volume}%,
            #9d9d9d ${volume}%,
            #9d9d9d 100%
          );
        `}
      }
    }
  `,
  Replay: styled.div<ReplayStyledProps>`
    @media screen and (max-width: 900px) {
      display: none;
    }
    @keyframes fadeinout {
      0% {
        visibility: hidden;
        opacity: 0;
      }
      50% {
        visibility: visible;
        opacity: 1;
      }
      100% {
        visibility: hidden;
        opacity: 0;
      }
    }
    .replay {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      width: 30px;
      &__btn {
        margin-top: 28px;
        margin-bottom: 10px;
        background: url('/assets/icons/replayIcon.svg') no-repeat 0 0;
        width: 20px;
        height: 20px;
        ${({ isLooped }) =>
          !isLooped &&
          css`
            filter: brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(43%)
              hue-rotate(297deg) brightness(116%) contrast(76%);
          `}
      }
      &__onoff {
        visibility: hidden;
        opacity: 0.8;
        border-radius: 10px;
        background: #f6f6f6;
        text-align: center;
        line-height: 17px;
        color: #464646;
        font-family: Noto Sans KR;
        font-size: 12px;
        font-weight: 500;
        ${({ isMessageOpened }) => isMessageOpened && 'animation: fadeinout 1.5s'};
      }
    }
  }`,
};
