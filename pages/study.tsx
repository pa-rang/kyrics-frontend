import Lyrics from '@components/study/Lyrics';
import Player from '@components/study/Player';
import styled from '@emotion/styled';
import { mockClient } from 'lib/api';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentTimeAtom,
  isModalOpenedState,
  isPlayAtom,
  loopAtom,
  percentageAtom,
  songDataState,
  totalTimeAtom,
  volumeBarAtom,
} from 'states';
import useSWR from 'swr';
import { ITimedText } from 'types';

function Study(): ReactElement {
  const [isPlay, setIsPlay] = useRecoilState<boolean>(isPlayAtom);
  const [currentTime, setCurrentTime] = useRecoilState<number>(currentTimeAtom);
  const volumeBar = useRecoilValue<number>(volumeBarAtom);
  const loop = useRecoilValue<boolean>(loopAtom);
  const [totalTime, setTotalTime] = useRecoilState<number>(totalTimeAtom);
  const hostVideo = useRef(null) as any;
  const host = hostVideo.current as ReactPlayer;
  const setPercentage = useSetRecoilState<number>(percentageAtom);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const [isModalOpened, setIsModalOpened] = useRecoilState(isModalOpenedState);
  const setSongData = useSetRecoilState(songDataState);
  const { data } = useSWR('song-1', (url) => mockClient.get(url));
  const url = data?.data?.youtubeUrl;

  // setSongData(data?.data);
  // 왜 바로 setSongData를 해주면 error 가 날까?
  useEffect(() => {
    setSongData(data?.data);
  }, [data]);

  useEffect(() => {
    setPercentage(currentTime / (totalTime / 100));
  }, [currentTime]);

  useEffect(() => {
    if (host !== null) {
      setTotalTime(Math.floor(host.getDuration()));
      console.log(totalTime);
    }
  }, [isPlay]);

  const handleOnProgress = (e: { playedSeconds: number }) => {
    setCurrentTime(e.playedSeconds);
  };

  const handleSeekTime = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setCurrentTime(parseInt(target.value));
    host.seekTo(parseFloat(target.value));
  };

  const handleLyrics = (line: ITimedText) => {
    host.seekTo(line.startTime);
    setIsPlay(true);
  };

  const handleBackTime = () => {
    if (currentTime >= 10) {
      host.seekTo(currentTime - 10);
      setCurrentTime(currentTime - 10);
    } else {
      host.seekTo(0);
      setCurrentTime(0);
    }
  };

  const handleForwardTime = () => {
    if (currentTime <= totalTime - 10) {
      setCurrentTime(currentTime + 10);
      host.seekTo(currentTime + 10);
    } else {
      setCurrentTime(totalTime);
      host.seekTo(totalTime);
    }
  };

  useEffect(() => {
    const modalWidth: number = window.outerWidth * 0.7;

    setModalHeight(modalWidth * 0.628);
  }, [isModalOpened]);

  const adjustModalHeight = () => {
    const modalWidth: number = window.outerWidth * 0.7;

    setModalHeight(modalWidth * 0.628);
  };

  useEffect(() => {
    window.addEventListener('resize', adjustModalHeight);

    return () => {
      window.removeEventListener('resize', adjustModalHeight);
    };
  }, []);

  return (
    <Styled.Root>
      <Styled.ModalWrapper isModalOpened={isModalOpened}>
        <Styled.Modal modalHeight={modalHeight}>
          <ReactPlayer
            playing={isPlay}
            url={url}
            loop={loop}
            controls={true}
            volume={volumeBar / 100}
            ref={hostVideo}
            width="100%"
            height="100%"
            onProgress={(e) => handleOnProgress(e)}
            onPlay={() => setIsPlay(true)}
            onPause={() => setIsPlay(false)}
            progressInterval={100}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  enablejsapi: 1,
                },
              },
            }}
          />
          <img
            className="modalClose--btn"
            src="assets/icons/modalCloseIcon.svg"
            alt=""
            onClick={() => setIsModalOpened(false)}
            aria-hidden="true"
          />
        </Styled.Modal>
      </Styled.ModalWrapper>
      <Player
        handleSeekTime={handleSeekTime}
        handleBackTime={handleBackTime}
        handleForwardTime={handleForwardTime}
      />
      <Lyrics handleLyrics={handleLyrics} currentTime={currentTime} />
    </Styled.Root>
  );
}

export default Study;

const Styled = {
  Root: styled.div``,
  ModalWrapper: styled.div<{ isModalOpened: boolean }>`
    display: ${({ isModalOpened }) => (isModalOpened ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    justify-content: center;
    z-index: 11;
    background: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
  `,
  Modal: styled.div<{ modalHeight: number }>`
    position: fixed;
    top: 90px;
    width: 70%;
    height: ${({ modalHeight }) => `${modalHeight}px`};
    img {
      position: absolute;
      top: 15.33px;
      right: -28.33px;
      transform: translateX(100%);
      cursor: pointer;
    }
  `,
};
