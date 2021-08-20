import Header from '@components/common/Header';
import Lyrics from '@components/study/Lyrics';
import MiniPlayer from '@components/study/MiniPlayer';
import Player from '@components/study/Player';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useGetUser } from 'hooks/api';
import useWindowSize from 'hooks/useWindowSize';
import { client, clientWithoutToken } from 'lib/api';
import { useRouter } from 'next/router';
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
import { ISongData, ITimedText } from 'types';

// import { KeyExpression } from '@components/study/KeyExpression/index';
import KeyExpression from '../../components/study/KeyExpression';

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
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { data } = useSWR<{ data: { data: ISongData } }>(`/song/${id}`, clientWithoutToken.get);

  const url = data?.data?.data?.youtubeUrl;
  const user = useGetUser();

  // setSongData(data?.data);
  // 왜 바로 setSongData를 해주면 error 가 날까?
  useEffect(() => {
    if (!data) return;
    // setSongData 인수에 넣으면 에러가 난다.`
    setSongData(data?.data?.data);
  }, [data]);

  useEffect(() => {
    setPercentage(currentTime / (totalTime / 100));
  }, [currentTime]);

  useEffect(() => {
    if (host !== null) {
      setTotalTime(Math.floor(host.getDuration()));
    }
  }, [isPlay]);

  const [miniPlayerOpened, setMiniPlayerOpened] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [miniPlayerOpened]);

  const handleScroll = () => {
    if (window.scrollY > 312) {
      !miniPlayerOpened && setMiniPlayerOpened(true);
    } else {
      miniPlayerOpened && setMiniPlayerOpened(false);
    }
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

  const size = useWindowSize();

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.outerWidth);
  }, []);

  const measureWidth = () => {
    setWidth(window.outerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', measureWidth);

    return () => {
      window.removeEventListener('resize', measureWidth);
    };
  }, []);

  return (
    <Styled.Root isModalOpened={isModalOpened}>
      <Header />
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
            // config={{
            //   youtube: {
            //     playerVars: {
            //       autoplay: 0,
            //       enablejsapi: 1,
            //     },
            //   },
            // }}
          />
          <img
            className="modalClose--btn"
            src="/assets/icons/modalCloseIcon.svg"
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
      <Styled.Main width={width}>
        <Lyrics handleLyrics={handleLyrics} currentTime={currentTime} />
        {size && size.width > 1080 && <KeyExpression />}
      </Styled.Main>
      <Styled.MiniPlayerWrapper>
        <MiniPlayer
          handleSeekTime={handleSeekTime}
          handleBackTime={handleBackTime}
          handleForwardTime={handleForwardTime}
          miniPlayerOpened={miniPlayerOpened}
        />
      </Styled.MiniPlayerWrapper>
    </Styled.Root>
  );
}

export default Study;

const Styled = {
  Root: styled.div<{ isModalOpened: boolean }>`
    ${({ isModalOpened }) =>
      isModalOpened &&
      css`
        height: 100vh;
        overflow-y: hidden;
      `}
  `,
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
    overflow-y: hidden;
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
  Main: styled.div<{ width: number }>`
    display: flex;
    justify-content: center;
    padding: 0px ${({ width }) => (141 * width) / 1440}px;
    /* padding-right: 100px; */
  `,
  MiniPlayerWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
  `,
};
