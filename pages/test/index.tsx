import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';

function Test() {
  const [isPlay, setIsPlay] = useState(false);
  const handlePlay = () => {
    setIsPlay((isPlay) => !isPlay);
  };

  return (
    <div>
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
      <button className="play-btn" onClick={handlePlay}>
        play/pause
      </button>
    </div>
  );
}

export default Test;
