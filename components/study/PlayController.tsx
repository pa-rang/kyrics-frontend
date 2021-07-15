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
import { PlayerProps } from 'types';

interface ProgressStyledProps {
  percentage: number;
}

interface PlayControlStyledProps {
  isPlay: boolean;
}

interface EnvironmentControlStyledProps {
  isMessageOpened: boolean;
  isVolumeOpened: boolean;
  isLooped: boolean;
  volume: number;
}
function PlayController({
  handleSeekTime,
  handleBackTime,
  handleForwardTime,
}: PlayerProps): ReactElement {
  const [isPlay, setIsPlay] = useRecoilState<boolean>(isPlayAtom);
  const currentTime = useRecoilValue<number>(currentTimeAtom);
  const [volumeBar, setVolumeBar] = useRecoilState<number>(volumeBarAtom);
  const [loop, setLoop] = useRecoilState<boolean>(loopAtom);
  const totalTime = useRecoilValue<number>(totalTimeAtom);
  const [isMessageOpened, setIsMessageOpened] = useRecoilState<boolean>(isMessageOpenedAtom);
  const percentage = useRecoilValue<number>(percentageAtom);
  const [isVolumeOpened, setIsVolumeOpened] = useRecoilState<boolean>(isVolumeOpenedAtom);
  const songData = useRecoilValue(songDataState);
  const artist = songData?.artist;
  const title = songData?.title;

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
    <Styled.Root>
      <Styled.Title>
        {title}-{artist}
      </Styled.Title>
      <Styled.Progress percentage={percentage}>
        <input
          className="bar"
          type="range"
          min={0}
          max={totalTime}
          value={currentTime}
          onInput={handleSeekTime}
        />
        <div className="time">
          <div className="time__current">{currentTimeForm}</div>
          <div className="time__end">{finishedTime}</div>
        </div>
      </Styled.Progress>
      <Styled.PlayControl isPlay={isPlay}>
        <button className="back-btn" onClick={handleBackTime}></button>
        <button className="play-btn" onClick={handlePlay}></button>
        <button className="forward-btn" onClick={handleForwardTime}></button>
      </Styled.PlayControl>
      <Styled.EnvironmentControl
        isMessageOpened={isMessageOpened}
        isVolumeOpened={isVolumeOpened}
        isLooped={loop}
        volume={volumeBar}
      >
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
        <div className="replay">
          <button className="replay__btn" onClick={handleLoop}></button>
          {loop ? (
            <button className="replay__onoff">on</button>
          ) : (
            <button className="replay__onoff">off</button>
          )}
        </div>
      </Styled.EnvironmentControl>
    </Styled.Root>
  );
}

export default PlayController;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    width: 44.166667%;
    height: 160px;
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
  `,
  Title: styled.div`
    margin-bottom: 41px;
    text-align: center;
    color: #ffffff;
    font-family: Noto Sans;
    font-size: 24px;
    font-weight: bold;
    font-style: normal;
  `,
  Progress: styled.div<ProgressStyledProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    .bar {
      align-self: center;
      -webkit-appearance: none;
      margin-bottom: 20px;
      border-radius: 10px;
      background-color: #9d9d9d;
      width: 96.2267415%;
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
    .time {
      display: flex;
      justify-content: space-between;
      width: 100%;
      &__current {
        line-height: 14px;
        color: #e1e1e1;
        font-family: Roboto;
        font-size: 12px;
      }
      &__end {
        line-height: 14px;
        color: #e1e1e1;
        font-family: Roboto;
        font-size: 12px;
      }
    }
  `,
  PlayControl: styled.div<PlayControlStyledProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    .back-btn {
      background: url('assets/icons/backIcon.svg') no-repeat 0 0;
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
              background: url('assets/icons/pauseIcon.svg') no-repeat 0 0;
            `
          : css`
              background: url('assets/icons/playIcon.svg') no-repeat 0 0;
            `}
      width: 31px;
      height: 31px;
      &:hover {
        filter: brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(43%) hue-rotate(297deg)
          brightness(116%) contrast(76%);
      }
    }
    .forward-btn {
      background: url('assets/icons/forwardIcon.svg') no-repeat 0 0;
      width: 19px;
      height: 23px;
      &:hover {
        filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(49deg)
          brightness(95%) contrast(85%);
      }
    }
  `,
  EnvironmentControl: styled.div<EnvironmentControlStyledProps>`
    display: flex;
    justify-content: space-between;
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
      width: 116.01px;
      height: 25px;
      &__btn {
        background: url('assets/icons/soundIcon.svg') no-repeat 0 0;
        width: 25px;
        height: 25px;
        &:hover {
          filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(49deg)
            brightness(95%) contrast(85%);
        }
      }
      &__bar {
        -webkit-appearance: none;
        visibility: hidden;
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
        ${({ isVolumeOpened }) =>
          isVolumeOpened ? 'animation: fadein 1s; visibility: visible;' : 'animation: fadeout 1s;'}
      }
    }
    .replay {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &__btn {
        margin-bottom: 10px;
        background: url('assets/icons/replayIcon.svg') no-repeat 0 0;
        width: 20px;
        height: 20px;
        ${({ isLooped }) =>
          !isLooped &&
          css`
            filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%)
              hue-rotate(49deg) brightness(95%) contrast(85%);
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
        ${({ isMessageOpened }) => isMessageOpened && 'animation: fadeinout 2s'};
      }
    }
  `,
};
