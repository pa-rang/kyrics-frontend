import Lyrics from '@components/study/Lyrics';
import Player from '@components/study/Player';
import styled from '@emotion/styled';
import React, { ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

function Study(): ReactElement {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volumeBar, setVolumeBar] = useState<number>(50);
  const [loop, setLoop] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isMessageOpened, setIsMessageOpened] = useState<boolean>(false);
  const hostVideo = useRef<ReactPlayer>();
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    setPercentage(currentTime / (totalTime / 100));
  }, [currentTime]);

  useEffect(() => {
    if (hostVideo?.current !== null) {
      setTotalTime(Math.floor(hostVideo?.current?.getDuration()));
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
    setCurrentTime(Math.floor(e.playedSeconds));
  };

  const handleSeekTime = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setCurrentTime(parseInt(target.value));
    hostVideo?.current?.seekTo(e.target.value);
  };

  const handleBackTime = () => {
    if (currentTime >= 10) {
      hostVideo?.current?.seekTo(currentTime - 10);
      setCurrentTime(currentTime - 10);
    } else {
      hostVideo?.current?.seekTo(0);
      setCurrentTime(0);
    }
  };

  const handleForwardTime = () => {
    if (currentTime <= totalTime - 10) {
      setCurrentTime(currentTime + 10);
      hostVideo?.current?.seekTo(currentTime + 10);
    } else {
      setCurrentTime(totalTime);
      hostVideo?.current?.seekTo(totalTime);
    }
  };

  const handleVolumeChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIsVolumeOpened(true);
    setVolumeBar(e.target.value);
  };

  return (
    <StudyWrapper>
      <div className="react-default-player">
        <ReactPlayer
          playing={isPlay}
          url="https://youtu.be/IHNzOHi8sJs"
          loop={loop}
          controls={true}
          volume={volumeBar / 100}
          ref={hostVideo}
          width="650px"
          height="400px"
          onProgress={(e) => handleOnProgress(e)}
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                enablejsapi: 1,
              },
            },
          }}
        />
      </div>
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
      <Lyrics />
    </StudyWrapper>
  );
}

export default Study;

const StudyWrapper = styled.div`
  .react-default-player {
    display: none;
  }
`;
