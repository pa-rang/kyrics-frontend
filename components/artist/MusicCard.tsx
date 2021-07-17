import styled from '@emotion/styled';
import router from 'next/router';
import React, { ReactElement, useRef, useState } from 'react';

interface Props {
  title: string;
  artist: string;
  albumImg: string;
  songId: number;
}

type HoverState = 'idle' | 'MouseEnter' | 'MouseLeave';

function MusicCard({ title, artist, albumImg, songId }: Props): ReactElement {
  const [isHover, setIsHover] = useState<HoverState>('idle');
  const songTitle = useRef<HTMLParagraphElement>(null);
  const [textWidth, setTextWidth] = useState({ offset: 0, scroll: 0 });

  function handleMouseEnter() {
    setIsHover('MouseEnter');
    // if (isEllipsisActive(songTitle)) {
    //   const title = songTitle.current as any;

    //   console.log(title.style.display);
    //   title && (title.style.visibility = 'visible');
    // }
  }

  function handleMouseLeave() {
    setIsHover('MouseLeave');
    // if (isEllipsisActive(songTitle)) {
    //   const title = songTitle.current as any;

    //   title && (title.style.visibility = 'hidden');
    // }
  }

  function handleOnClick() {
    router.push(`/study/${songId}`);
  }

  function isEllipsisActive(e: any) {
    // setTextWidth({ offset: e.current.offsetWidth, scroll: e.current.scrollWidth });

    return e.current.offsetWidth < e.current.scrollWidth;
  }

  return (
    <Styled.Root
      isHovered={isHover}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOnClick}
    >
      <img className="img" src={albumImg} alt=""></img>
      <div className="hover">
        <p className="hover__label">Explore &gt;</p>
        <img className="hover__play" src="/assets/icons/playBtn.svg" alt=""></img>
      </div>
      {/* {isHover === 'MouseEnter' && isEllipsisActive ? (
        <p className="songTitle__hover" ref={songTitle}>
          {title}
        </p>
      ) : (
        <p className="songTitle">{title}</p>
      )} */}
      {/* <p className="songTitle__hover" ref={songTitle}>
        {title}
      </p> */}
      <p className="songTitle">{title}</p>
      <p className="artists">{artist}</p>
    </Styled.Root>
  );
}
const Styled = {
  Root: styled.button<{ isHovered: HoverState }>`
    position: relative;
    border: none;
    background: white;
    cursor: pointer;
    padding: 0;
    width: 200px;
    height: 275px;
    overflow: hidden;

    .img {
      border-radius: 10px;
      width: 200px;
      height: 200px;
      object-fit: cover;

      @media (max-width: 547px) {
        width: 98px;
        height: 98px;
      }
    }

    .hover {
      position: absolute;
      top: 1px;
      visibility: hidden;
      border-radius: 10px;
      background: linear-gradient(
        158.98deg,
        rgba(231, 78, 151, 0.6) 3.15%,
        rgba(100, 101, 244, 0.6) 94.3%
      );
      width: 200px;
      height: 200px;
      ${({ isHovered }) =>
        isHovered === 'MouseEnter'
          ? 'animation: fadeIn 0.5s; visibility: visible;'
          : isHovered === 'MouseLeave' && 'animation: fadeOut 0.5s;'}

      &__label {
        padding-top: 65px;
        text-align: center;
        text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        line-height: 30px;
        color: #ffffff;
        font-size: 24px;
        font-weight: bold;
        font-style: normal;

        @media (max-width: 547px) {
          padding-top: 20px;
          font-size: 15px;
        }
      }

      &__play {
        margin-top: 20px;
        width: 30px;
        height: 30px;

        @media (max-width: 547px) {
          margin-top: 5px;
          width: 20px;
          height: 20px;
        }
      }

      @media (max-width: 547px) {
        width: 98px;
        height: 98px;
      }
    }

    .songTitle {
      margin-top: 17px;
      padding: 0 5px;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #464646;
      font-size: 24px;
      font-weight: bold;
      font-style: normal;

      @media (max-width: 547px) {
        margin-top: 6px;
        font-size: 16px;
      }
    }

    .songTitle__hover {
      visibility: hidden;
      margin-top: 17px;
      padding: 0 5px;
      animation: scroll-left 5s linear infinite;
      text-align: left;
      white-space: nowrap;
      color: #464646;
      font-size: 24px;
      font-weight: bold;
      font-style: normal;
    }

    .artists {
      margin-top: 7px;
      text-align: center;
      color: #9d9d9d;
      font-size: 16px;
      font-weight: 500;
      font-style: normal;

      @media (max-width: 547px) {
        margin-top: 0px;
        font-size: 12px;
      }
    }

    @media (max-width: 547px) {
      width: 98px;
      height: 142px;
    }

    /* 페이드인 애니메이션 */
    @keyframes fadeIn {
      0% {
        visibility: hidden;
        opacity: 0;
      }
      100% {
        visibility: visible;
        opacity: 1;
      }
    }

    /* 페이드아웃 애니메이션 */
    @keyframes fadeOut {
      0% {
        visibility: visible;
        opacity: 1;
      }
      100% {
        visibility: hidden;
        opacity: 0;
      }
    }

    /* 글자 흐르는 애니메이션 */
    @keyframes scroll-left {
      0% {
        transform: translateX(0%);
      }
      10% {
        transform: translateX(0%);
      }
      60% {
        transform: translateX(-120%);
      }
      60.0001% {
        transform: translateX(120%);
      }
    }
  `,
};

export default MusicCard;
