import Lyrics from '@components/study/Lyrics';
import Player from '@components/study/Player';
import styled from '@emotion/styled';
import { mockClient } from 'lib/api';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isModalOpenedState, songDataState } from 'states';
import useSWR from 'swr';
import { ITimedText } from 'types';

function Study(): ReactElement {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volumeBar, setVolumeBar] = useState<number>(50);
  const [loop, setLoop] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isMessageOpened, setIsMessageOpened] = useState<boolean>(false);
  const hostVideo = useRef(null) as any;
  const host = hostVideo.current as ReactPlayer;
  const [percentage, setPercentage] = useState<number>(0);
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

  const handlePlay = () => {
    setIsPlay((isPlay) => !isPlay);
  };

  const handleLoop = () => {
    setIsMessageOpened(true);
    setTimeout(setIsMessageOpened, 2000, false);
    setLoop((loop) => !loop);
  };
  const [isVolumeOpened, setIsVolumeOpened] = useState<boolean>(false);
  const mouseEnterController = () => {
    setIsVolumeOpened(true);
  };
  const mouseLeaveController = () => {
    setIsVolumeOpened(false);
  };

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

  const handleVolumeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setIsVolumeOpened(true);
    setVolumeBar(parseInt(target.value));
  };

  return (
    <Styled.Root>
      <Styled.ModalWrapper isModalOpened={isModalOpened}>
        <Styled.Modal>
          <ReactPlayer
            playing={isPlay}
            url={url}
            // url="https://www.youtube.com/embed/-5q5mZbe3V8"
            loop={loop}
            controls={true}
            volume={volumeBar / 100}
            ref={hostVideo}
            width="100%"
            height="100%"
            // height="400px"
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
        isPlay={isPlay}
        volume={volumeBar}
        handlePlay={handlePlay}
        handleSeekTime={handleSeekTime}
        totalTime={totalTime}
        handleVolumeChange={handleVolumeChange}
        handleBackTime={handleBackTime}
        handleForwardTime={handleForwardTime}
        currentTime={currentTime}
        handleLoop={handleLoop}
        loop={loop}
        isMessageOpened={isMessageOpened}
        isVolumeOpened={isVolumeOpened}
        mouseEnterController={mouseEnterController}
        mouseLeaveController={mouseLeaveController}
        percentage={percentage}
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
  Modal: styled.div`
    position: fixed;
    top: 90px;
    width: 71%;
    height: 80%;
    img {
      position: absolute;
      top: 15.33px;
      right: -28.33px;
      transform: translateX(100%);
    }
  `,
};
