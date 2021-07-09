import Lyrics from '@components/study/Lyrics';
import Player from '@components/study/Player';
import styled from '@emotion/styled';
import React, { ReactElement, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

function Study(): ReactElement {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [volumeBar, setVolumeBar] = useState<number>(0);
  const [loop, setLoop] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const hostVideo = useRef();

  console.log(hostVideo.current);
  const handlePlay = () => {
    if (isPlay === true) {
      setTotalTime(hostVideo.current.getDuration());
      console.log(hostVideo.current.getDuration());
      setIsPlay(false);
    } else {
      setIsPlay(true);
    }
  };

  const handleLoop = () => {
    if (loop === true) {
      setLoop(false);
    } else {
      setLoop(true);
    }
  };

  // 이벤트 타입이 안뜨는데 지정 어떻게? any?
  const handleOnProgress = (e: any) => {
    setCurrentTime(e.playedSeconds);
    console.log(e);
    console.log('얘는 스테이트', currentTime);
  };

  // progress bar 제어 -> 원하는 시간 받으면 그 값으로 돌아가도록
  const handleSeekTime = (e) => {
    setCurrentTime(e.target.value);
    hostVideo.current.seekTo(e.target.value);
  };

  const handleBackTime = (e) => {
    setCurrentTime(currentTime - 10);
    hostVideo.current.seekTo(currentTime - 10);
  };

  const handleForwardTime = (e) => {
    setCurrentTime(currentTime + 10);
    hostVideo.current.seekTo(currentTime + 10);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value / 100);
    setVolumeBar(e.target.value);
  };

  return (
    <StudyWrapper>
      <ReactPlayer
        url="https://youtu.be/IHNzOHi8sJs"
        playing={isPlay}
        loop={loop}
        controls={true}
        light={true}
        volume={volume}
        ref={hostVideo}
        width="650px"
        height="400px"
        onProgress={(e) => handleOnProgress(e)}
      />
      <Player
        playing={isPlay}
        volume={volumeBar}
        handlePlay={handlePlay}
        handleSeekTime={handleSeekTime}
        totalTime={totalTime}
        handleVolumeChange={handleVolumeChange}
        handleBackTime={handleBackTime}
        handleForwardTime={handleForwardTime}
        currentTime={currentTime}
      />
      <Lyrics />
    </StudyWrapper>
  );
}

export default Study;

const StudyWrapper = styled.div`
  .react-player__play-icon {
    display: none;
  }
`;
