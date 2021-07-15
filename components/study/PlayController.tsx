import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import {
  currentTimeAtom,
  isMessageOpenedAtom,
  isPlayAtom,
  isVolumeOpenedAtom,
  loopAtom,
  songDataState,
  totalTimeAtom,
  volumeBarAtom,
} from 'states';

interface PlayControlStyledProps {
  percentage: number;
  isPlay: boolean;
}

interface EnvironmentControlStyledProps {
  isMessageOpened: boolean;
  isVolumeOpened: boolean;
  isLooped: boolean;
  volume: number;
}

interface PlayControllerProps {
  handlePlay: () => void;
  handleSeekTime: (e: React.FormEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleBackTime: () => void;
  handleForwardTime: () => void;
  handleLoop: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  mouseEnterController: () => void;
  mouseLeaveController: () => void;
}
function PlayController() {
  const [isPlay, setIsPlay] = useRecoilState<boolean>(isPlayAtom);
  const [currentTime, setCurrentTime] = useRecoilState<number>(currentTimeAtom);
  const [volumeBar, setVolumeBar] = useRecoilState<number>(volumeBarAtom);
  const [loop, setLoop] = useRecoilState<boolean>(loopAtom);
  const [totalTime, setTotalTime] = useRecoilState<number>(totalTimeAtom);
  const [isMessageOpened, setIsMessageOpened] = useRecoilState<boolean>(isMessageOpenedAtom);
  const [percentage, setPercentage] = useRecoilState<number>(percentageAtom);
  const [isVolumeOpened, setIsVolumeOpened] = useRecoilState<boolean>(isVolumeOpenedAtom);

  const handlePlay = () => {
    setIsPlay((isPlay) => !isPlay);
  };

  const handleLoop = () => {
    setIsMessageOpened(true);
    setTimeout(setIsMessageOpened, 2000, false);
    setLoop((loop) => !loop);
  };

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

  return (
    <Styled.Root>
      <Styled.Progress>
        <input
          className="bar"
          type="range"
          min={0}
          max={totalTime}
          value={currentTime}
          onInput={handleSeekTime}
        />
        <div className="time">
          <div className="time__current">{currentTimeForm}</div>
          <div className="time__end">{finishedTime}</div>
        </div>
      </Styled.Progress>
      <Styled.PlayControl>
        <button className="backBtn" onClick={handleBackTime}></button>
        <button className="playBtn" onClick={handlePlay}></button>
        <button className="forwardBtn" onClick={handleForwardTime}></button>
      </Styled.PlayControl>
      <Styled.EnvironmentControl>
        <div
          className="]volume"
          onMouseEnter={mouseEnterController}
          onMouseLeave={mouseLeaveController}
        >
          <button className="volume__btn"></button>
          <input
            className="volume__bar"
            type="range"
            min={0}
            max={100}
            value={volume}
            onInput={handleVolumeChange}
          />
        </div>
        <div className="replay">
          <button className="replay__btn" onClick={handleLoop}></button>
          {loop ? (
            <button className="replay__onoff">on</button>
          ) : (
            <button className="replay__onoff">off</button>
          )}
        </div>
      </Styled.EnvironmentControl>
    </Styled.Root>
  );
}

export default PlayController;

const Styled = {
  Root: styled.div``,
  Progress: styled.div``,
  PlayControl: styled.div``,
  EnvironmentControl: styled.div``,
};
