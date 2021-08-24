import styled from '@emotion/styled';
import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';

function Test() {
  const [isPlay, setIsPlay] = useState(false);
  const handlePlay = () => {
    setIsPlay((isPlay) => !isPlay);
  };

  return (
    <Styled.Root>
      <Styled.Wrap>
        <ReactPlayer
          playing={isPlay}
          url="https://www.youtube.com/watch?v=CuklIb9d3fI"
          loop={true}
          controls={true}
          // volume={volumeBar / 100}
          // ref={hostVideo}
          width="100%"
          height="100%"
          // onProgress={(e) => handleOnProgress(e)}
          // onPlay={handlePlay}
          // onPause={() => setIsPlay(false)}
          progressInterval={100}
          // muted={mute}
          playsinline={true}
          // config={{
          //   youtube: {
          //     playerVars: {
          //       autoplay: 1,
          //       enablejsapi: 1,
          //     },
          //   },
          // }}
        />
      </Styled.Wrap>
      <button className="play-btn" onClick={handlePlay}>
        play/pause
      </button>
    </Styled.Root>
  );
}

export default Test;

const Styled = {
  Root: styled.div`
    /* #player {
      display: none;
    } */
  `,
  Wrap: styled.div`
    display: none;
  `,
};
