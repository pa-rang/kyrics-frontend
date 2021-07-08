import PlayerBtns from '@components/study/PlayerBtns';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

function Player(): ReactElement {
  const title = '앨범 제목';
  const singer = '가수';

  return (
    <PlayerWrapper>
      <img className="player-album" src="assets/images/exampleImg.svg" alt="albumImage" />
      <div className="player-custom">
        <div className="player-custom__title">
          {title}-{singer}
        </div>
        <input className="player-custom__progressbar" type="range" min={0} max={100} />
        <div className="player-custom__time">
          <div className="player-custom__time__current">00:00</div>
          <div className="player-custom__time__end">03:30</div>
        </div>
        <div className="player-custom__control">
          <button className="player-custom__control__back"></button>
          <button className="player-custom__control__playBtn"></button>
          <button className="player-custom__control__forward"></button>
        </div>
        <div className="player-custom__lastcontrol">
          <div className="player-custom__lastcontrol__volume">
            <button className="player-custom__lastcontrol__volume__btn"></button>
            <input
              className="player-custom__lastcontrol__volume__bar"
              type="range"
              min={0}
              max={100}
            />
          </div>
          <div className="player-custom__lastcontrol__replay">
            <button className="player-custom__lastcontrol__replay__btn"></button>
            <button className="player-custom__lastcontrol__replay__onoff">on</button>
          </div>
        </div>
      </div>
      <PlayerBtns />
    </PlayerWrapper>
  );
}

export default Player;

const PlayerWrapper = styled.div`
  background: url('assets/images/playerBackground.svg') no-repeat 0 0;
  width: 100%;
  height: 263px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    border: 0;
    outline: 0;
    cursor: pointer;
  }
  /* Chrome */
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
  }

  input[type='range']::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  input[type='range']:focus {
    outline: none; /* input range에 포커스 되었을 경우 기본 블러처리 제거 */
  }
  .player-album {
    width: 160px;
    height: 160px;
  }
  .player-custom {
    display: flex;
    flex-direction: column;
    &__title {
      font-family: Noto Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      text-align: center;
      color: #ffffff;
      margin-bottom: 41px;
    }
    &__progressbar {
      -webkit-appearance: none;
      width: 612px;
      height: 3px;
      background-color: #9d9d9d;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    &__time {
      display: flex;
      justify-content: space-between;
      width: 636px;
      &__current {
        font-family: Roboto;
        font-size: 12px;
        line-height: 14px;
        color: #e1e1e1;
      }
      &__end {
        font-family: Roboto;
        font-size: 12px;
        line-height: 14px;
        color: #e1e1e1;
      }
    }
    &__control {
      display: flex;
      justify-content: center;
      align-items: center;
      &__back {
        background: url('assets/icons/backIcon.svg') no-repeat 0 0;
        width: 17px;
        height: 21px;
      }
      &__playBtn {
        background: url('assets/icons/playIcon.svg') no-repeat 0 0;
        margin-left: 75px;
        margin-right: 75px;
        width: 31px;
        height: 31px;
      }
      &__forward {
        background: url('assets/icons/forwardIcon.svg') no-repeat 0 0;
        width: 17px;
        height: 21px;
      }
    }
    &__lastcontrol {
      display: flex;
      justify-content: space-between;
      &__volume {
        width: 116.01px;
        height: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__btn {
          background: url('assets/icons/soundIcon.svg') no-repeat 0 0;
          width: 25px;
          height: 25px;
        }
        &__bar {
          -webkit-appearance: none;
          background-color: #9d9d9d;
          width: 76.01px;
          border-radius: 10px;
          height: 3px;
        }
      }
      &__replay {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__btn {
          background: url('assets/icons/replayIcon.svg') no-repeat 0 0;
          width: 20px;
          height: 20px;
          margin-bottom: 10px;
        }
        &__onoff {
          font-family: Noto Sans KR;
          font-weight: 500;
          font-size: 12px;
          line-height: 17px;
          text-align: center;
          color: #464646;
          background: #f6f6f6;
          opacity: 0.8;
          border-radius: 10px;
        }
      }
    }
  }
`;
