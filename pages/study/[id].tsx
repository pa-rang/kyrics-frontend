import Header from '@components/common/Header';
import LoginModal from '@components/common/LoginModal';
import Lyrics from '@components/study/Lyrics';
import MobilePlayer from '@components/study/MobilePlayer/MobilePlayer';
import Player from '@components/study/Player';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useWindowSize from 'hooks/useWindowSize';
import { client } from 'lib/api';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentTimeAtom,
  isLoginModalOpenedState,
  isPlayAtom,
  isYoutubeModalOpenedState,
  loopAtom,
  percentageAtom,
  songDataState,
  totalTimeAtom,
  volumeBarAtom,
  widthAtom,
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
  const isLoginModalOpened = useRecoilValue(isLoginModalOpenedState);
  const [isYoutubeModalOpened, setYoutubeIsModalOpened] = useRecoilState(isYoutubeModalOpenedState);
  const setSongData = useSetRecoilState(songDataState);
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { data } = useSWR<{ data: { data: ISongData } }>(`/song/${id}`, client.get);

  const url = data?.data?.data?.youtubeUrl;

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
    setIsPlay(false);
  }, []);

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
  }, [isYoutubeModalOpened]);

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

  const [width, setWidth] = useRecoilState<number>(widthAtom);

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

  const handlePlay = () => {
    setTimeout(() => {
      setIsPlay(true);
    }, 2000);
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Styled.Root isYoutubeModalOpened={isYoutubeModalOpened}>
      <Header />
      {isLoginModalOpened && <LoginModal />}
      <Styled.ModalWrapper isYoutubeModalOpened={isYoutubeModalOpened}>
        <Styled.Modal modalHeight={modalHeight}></Styled.Modal>
      </Styled.ModalWrapper>
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
      <img
        className="modalClose--btn"
        src="/assets/icons/modalCloseIcon.svg"
        alt=""
        onClick={() => setYoutubeIsModalOpened(false)}
        aria-hidden="true"
      />
      <Styled.PlayerWrapper>
        <MobilePlayer
          handleSeekTime={handleSeekTime}
          handleBackTime={handleBackTime}
          handleForwardTime={handleForwardTime}
        />
        <Player
          handleSeekTime={handleSeekTime}
          handleBackTime={handleBackTime}
          handleForwardTime={handleForwardTime}
        />
      </Styled.PlayerWrapper>
      <Styled.Main width={width}>
        <Lyrics handleLyrics={handleLyrics} currentTime={currentTime} id={Number(id)} />
        {size && size.width > 1080 && <KeyExpression />}
      </Styled.Main>
    </Styled.Root>
  );
}

export default Study;

const Styled = {
  Root: styled.div<{ isYoutubeModalOpened: boolean }>`
    position: relative;
    ${({ isYoutubeModalOpened }) =>
      isYoutubeModalOpened &&
      css`
        height: 100vh;
        overflow-y: hidden;
      `}
  `,
  ModalWrapper: styled.div<{ isYoutubeModalOpened: boolean }>`
    display: ${({ isYoutubeModalOpened }) => (isYoutubeModalOpened ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    justify-content: center;
    z-index: 1100000;
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
  PlayerWrapper: styled.div`
    width: 100%;
  `,
  Main: styled.div<{ width: number }>`
    display: flex;
    justify-content: center;
    padding: 0px ${({ width }) => (141 * width) / 1440}px;
    /* padding-right: 100px; */
  `,
};
