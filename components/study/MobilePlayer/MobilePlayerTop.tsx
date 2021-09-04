import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useGetSongData } from 'hooks/api';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentTimeAtom, percentageAtom, songDataState, totalTimeAtom } from 'states';
import { PlayerTopProps } from 'types';
interface ProgressStyledProps {
  percentage: number;
}

function MobilePlayerTop({ handleSeekTime }: PlayerTopProps): ReactElement {
  const data = useRecoilValue(songDataState);
  const currentTime = useRecoilValue<number>(currentTimeAtom);
  const totalTime = useRecoilValue<number>(totalTimeAtom);
  const percentage = useRecoilValue<number>(percentageAtom);
  // const router = useRouter();
  // const id = Number(router.query.id);
  // const data = useGetSongData(id);

  const albumImageUrl = data?.albumImageUrl;
  const title = data?.title;
  const artist = data?.artist;

  const currentTimeForm =
    currentTime % 60 <= 10
      ? `0${Math.floor(currentTime / 60)}:0${Math.floor(currentTime) % 60} `
      : `0${Math.floor(currentTime / 60)}:${Math.floor(currentTime) % 60} `;

  const finishedTime =
    totalTime % 60 <= 9
      ? `0${Math.floor(totalTime / 60)}:0${totalTime % 60} `
      : `0${Math.floor(totalTime / 60)}:${totalTime % 60} `;
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed]);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  return (
    <Styled.Root isFixed={isFixed}>
      <img className="player-album" src={albumImageUrl} alt="albumImage" />
      <Styled.Player>
        <Styled.Title>
          {title}-{artist}
        </Styled.Title>
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
      </Styled.Player>
    </Styled.Root>
  );
}

export default MobilePlayerTop;

const Styled = {
  Root: styled.div<{ isFixed: boolean }>`
    display: flex;
    position: ${({ isFixed }) => isFixed && 'fixed'};
    top: 0;
    align-items: center;
    align-items: center;
    justify-content: space-evenly;
    z-index: 1;
    background: url('/assets/images/MobileTopPlayer.svg') no-repeat 0 0;
    background-size: cover;
    width: 100%;
    height: 100px;
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
    .player-album {
      width: 61px;
      height: 61px;
    }
  `,
  Player: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 67%;
    height: 45px;
  `,
  Title: styled.div`
    margin-bottom: 10px;
    text-align: center;
    color: #ffffff;
    font-family: Noto Sans;
    font-size: 15px;
    font-weight: bold;
    font-style: normal;
  `,
  Progress: styled.div<ProgressStyledProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 14px;
    .bar {
      -webkit-appearance: none;
      align-self: center;
      border-radius: 10px;
      background-color: #9d9d9d;
      width: 70%;
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
    .time__current {
      width: 30px;
      height: 14px;
      color: #e1e1e1;
      font-family: Roboto;
      font-size: 12px;
    }
    .time__end {
      width: 30px;
      height: 14px;
      color: #e1e1e1;
      font-family: Roboto;
      font-size: 12px;
    }
  `,
};
