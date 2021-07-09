import Lyrics from '@components/study/Lyrics';
import Player from '@components/study/Player';
import styled from '@emotion/styled';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

function Study(): ReactElement {
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [volumeBar, setVolumeBar] = useState<number>(0);
  const [loop, setLoop] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isMessageOpened, setIsMessageOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const hostVideo = useRef(null);

  // console.log('[hostVideo]: ', hostVideo.current);

  useEffect(() => {
    if (hostVideo.current) {
      console.log('[hostVideo]:', hostVideo.current.getDuration());
      setTotalTime(hostVideo.current.getDuration());
      // console.log('총시간 알려죠', hostVideo.current.getDuration());
    }
  }, [isPlay]);

  const handlePlay = () => {
    if (isPlay === true) {
      setIsPlay(false);
    } else {
      setIsPlay(true);
    }
    console.log(isPlay);
  };

  const handleLoop = () => {
    setIsMessageOpened(true);
    // 3초 뒤엔 다시 false로 바꿈
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
    console.log(isVolumeOpened);
  };
  const mouseLeaveController = () => {
    setIsVolumeOpened(false);
    console.log(isVolumeOpened);
  };

  // 이벤트 타입이 안뜨는데 지정 어떻게? any?
  const handleOnProgress = (e: any) => {
    setCurrentTime(Math.floor(e.playedSeconds));
    console.log(e);
    console.log('얘는 스테이트', currentTime);
  };

  // progress bar 제어 -> 원하는 시간 받으면 그 값으로 돌아가도록
  const handleSeekTime = (e: any) => {
    setCurrentTime(e.target.value);
    hostVideo.current.seekTo(e.target.value);
  };

  const handleBackTime = () => {
    setCurrentTime(currentTime - 10);
    hostVideo.current.seekTo(currentTime - 10);
  };

  const handleForwardTime = () => {
    setCurrentTime(currentTime + 10);
    hostVideo.current.seekTo(currentTime + 10);
  };

  const handleVolumeChange = (e: any) => {
    setIsVolumeOpened(true);
    console.log(isVolumeOpened);
    setVolume(e.target.value / 100);
    setVolumeBar(e.target.value);
  };

  return (
    <StudyWrapper>
      <div className="react-default-player">
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
      </div>
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
  .react-player__play-icon {
    /* display: none; */
  }
  .react-default-player {
    /* display: none; */
  }
`;
