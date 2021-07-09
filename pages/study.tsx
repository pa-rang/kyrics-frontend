import Lyrics from '@components/study/Lyrics';
import Player from '@components/study/Player';
import styled from '@emotion/styled';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

function Study(): ReactElement {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [volumeBar, setVolumeBar] = useState<number>(50);
  const [loop, setLoop] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isMessageOpened, setIsMessageOpened] = useState<boolean>(false);
  const hostVideo = useRef(null);

  useEffect(() => {
    if (hostVideo.current) {
      setTotalTime(Math.floor(hostVideo.current.getDuration()));
    }
  }, [isPlay]);

  const handlePlay = () => {
    if (isPlay === true) {
      setIsPlay(false);
    } else {
      setIsPlay(true);
    }
  };

  const handleLoop = () => {
    setIsMessageOpened(true);
    setTimeout(setIsMessageOpened, 2000, false);
    if (loop === true) {
      setLoop(false);
    } else {
      setLoop(true);
    }
  };
  const [isVolumeOpened, setIsVolumeOpened] = useState<boolean>(false);
  const mouseEnterController = () => {
    setIsVolumeOpened(true);
  };
  const mouseLeaveController = () => {
    setIsVolumeOpened(false);
  };

  const handleOnProgress = (e: any) => {
    setCurrentTime(Math.floor(e.playedSeconds));
  };

  const handleSeekTime = (e: any) => {
    setCurrentTime(e.target.value);
    hostVideo.current.seekTo(e.target.value);
  };

  const handleBackTime = () => {
    if (currentTime > 10) {
      hostVideo.current.seekTo(currentTime - 10);
      setCurrentTime(currentTime - 10);
    } else {
      hostVideo.current.seekTo(0);
      setCurrentTime(0);
    }
  };

  const handleForwardTime = () => {
    if (currentTime < totalTime - 10) {
      setCurrentTime(currentTime + 10);
      hostVideo.current.seekTo(currentTime + 10);
    } else {
      setCurrentTime(totalTime);
      hostVideo.current.seekTo(totalTime);
    }
  };

  const handleVolumeChange = (e: any) => {
    setIsVolumeOpened(true);
    setVolume(e.target.value / 100);
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
          volume={volume}
          ref={hostVideo}
          width="650px"
          height="400px"
          onProgress={(e) => handleOnProgress(e)}
        />
      </div>
      <Player
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
