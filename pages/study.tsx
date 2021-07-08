import Lyrics from '@components/study/Lyrics';
import Player from '@components/study/Player';
import styled from '@emotion/styled';
import React, { ReactElement, useState } from 'react';
import ReactPlayer from 'react-player';

function Study(): ReactElement {
  const [isPlay, setIsPlay] = useState<true | false>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [loop, setLoop] = useState<true | false>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const hostPlayer = React.createRef();

  const handlePause = () => {
    setIsPlay(false);
  };

  const handlePlay = () => {
    setIsPlay(true);
  };

  const handleLoop = () => {
    setLoop(true);
  };

  // 이벤트 타입이 안뜨는데 지정 어떻게? any?
  const handleOnProgress = (e: any) => {
    setCurrentTime(e.playedSeconds + 1);
    console.log(e);
    console.log('얘는 스테이트', currentTime);
  };

  // progress bar 제어 -> input 이벤트 받아서 그 값으로 세팅되도록
  const handleSeekProgress = () => {};

  return (
    <StudyWrapper>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=WMweEpGlu_U"
        playing={isPlay}
        loop={loop}
        controls={false}
        light={true}
        volume={volume}
        width={0}
        height={0}
        onProgress={(e) => handleOnProgress(e)}
      />
      <Player />
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
