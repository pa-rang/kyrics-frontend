import PlayerBtns from '@components/study/PlayerBtns';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

interface PlayerProps {
  isPlay: boolean;
  volume: number;
  handlePlay: () => void;
  handleSeekTime: (e: React.FormEvent<HTMLInputElement>) => void;
  totalTime: number;
  handleVolumeChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleBackTime: () => void;
  handleForwardTime: () => void;
  currentTime: number;
  handleLoop: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loop: boolean;
  isMessageOpened: boolean;
  isVolumeOpened: boolean;
  mouseEnterController: () => void;
  mouseLeaveController: () => void;
  percentage: number;
}
interface StyledProps {
  isMessageOpened: boolean;
  isVolumeOpened: boolean;
  isLooped: boolean;
  volume: number;
  percentage: number;
  isPlay: boolean;
}
function Player({
  isPlay,
  volume,
  handlePlay,
  handleSeekTime,
  totalTime,
  handleVolumeChange,
  handleBackTime,
  handleForwardTime,
  currentTime,
  handleLoop,
  loop,
  isMessageOpened,
  isVolumeOpened,
  mouseEnterController,
  mouseLeaveController,
  percentage,
}: PlayerProps): ReactElement {
  const title = '앨범 제목';
  const singer = '가수';
  const currentTimeForm =
    currentTime % 60 <= 9
      ? `0${Math.floor(currentTime / 60)}:0${Math.floor(currentTime) % 60} `
      : `0${Math.floor(currentTime / 60)}:${Math.floor(currentTime) % 60} `;

  const finishedTime =
    totalTime % 60 <= 9
      ? `0${Math.floor(totalTime / 60)}:0${totalTime % 60} `
      : `0${Math.floor(totalTime / 60)}:${totalTime % 60} `;

  return (
    <PlayerWrapper
      isMessageOpened={isMessageOpened}
      isVolumeOpened={isVolumeOpened}
      isLooped={loop}
      volume={volume}
      percentage={percentage}
      isPlay={isPlay}
    >
      <img className="player-album" src="assets/images/exampleImg.svg" alt="albumImage" />
      <div className="player-custom">
        <div className="player-custom__title">
          {title}-{singer}
        </div>
        <div className="player-custom__progress">
          <input
            className="player-custom__progress__bar"
            type="range"
            min={0}
            max={totalTime}
            value={currentTime}
            onInput={handleSeekTime}
          />
        </div>
        <div className="player-custom__time">
          <div className="player-custom__time__current">{currentTimeForm}</div>
          <div className="player-custom__time__end">{finishedTime}</div>
        </div>
        <div className="player-custom__control">
          <button className="player-custom__control__back" onClick={handleBackTime}></button>
          <button className="player-custom__control__playBtn" onClick={handlePlay}></button>
          <button className="player-custom__control__forward" onClick={handleForwardTime}></button>
        </div>
        <div className="player-custom__lastcontrol">
          <div
            className="player-custom__lastcontrol__volume"
            onMouseEnter={mouseEnterController}
            onMouseLeave={mouseLeaveController}
          >
            <button className="player-custom__lastcontrol__volume__btn"></button>
            <input
              className="player-custom__lastcontrol__volume__bar"
              type="range"
              min={0}
              max={100}
              value={volume}
              onInput={handleVolumeChange}
            />
          </div>
          <div className="player-custom__lastcontrol__replay">
            <button
              className="player-custom__lastcontrol__replay__btn"
              onClick={handleLoop}
            ></button>
            {loop ? (
              <button className="player-custom__lastcontrol__replay__onoff">on</button>
            ) : (
              <button className="player-custom__lastcontrol__replay__onoff">off</button>
            )}
          </div>
        </div>
      </div>
      <PlayerBtns />
    </PlayerWrapper>
  );
}

export default Player;

const PlayerWrapper = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: url('assets/images/playerBackground.svg') no-repeat 0 0;
  background-size: cover;
  width: 100%;
  height: 263px;

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

  .player-album {
    width: 160px;
    height: 160px;
  }
  .player-custom {
    display: flex;
    flex-direction: column;
    &__title {
      margin-bottom: 41px;
      text-align: center;
      color: #ffffff;
      font-family: Noto Sans;
      font-size: 24px;
      font-weight: bold;
      font-style: normal;
    }
    &__progress {
      display: flex;
      justify-content: center;
      width: 636px;
      &__bar {
        -webkit-appearance: none;
        margin-bottom: 20px;
        border-radius: 10px;
        background-color: #9d9d9d;
        width: 612px;
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
    }
    &__time {
      display: flex;
      justify-content: space-between;
      width: 636px;
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
    &__control {
      display: flex;
      align-items: center;
      justify-content: center;
      &__back {
        background: url('assets/icons/backIcon.svg') no-repeat 0 0;
        width: 19px;
        height: 23px;
        &:hover {
          filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(49deg)
            brightness(95%) contrast(85%);
        }
      }
      &__playBtn {
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
          filter: brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(43%)
            hue-rotate(297deg) brightness(116%) contrast(76%);
        }
      }
      &__forward {
        background: url('assets/icons/forwardIcon.svg') no-repeat 0 0;
        width: 19px;
        height: 23px;
        &:hover {
          filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(49deg)
            brightness(95%) contrast(85%);
        }
      }
    }
    &__lastcontrol {
      display: flex;
      justify-content: space-between;
      &__volume {
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
            filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%)
              hue-rotate(49deg) brightness(95%) contrast(85%);
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
            isVolumeOpened
              ? 'animation: fadein 1s; visibility: visible;'
              : 'animation: fadeout 1s;'}
        }
      }
      &__replay {
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
    }
  }
`;
