import styled from '@emotion/styled';
import router from 'next/router';
import React, { useState } from 'react';

type HoverState = 'idle' | 'MouseEnter' | 'MouseLeave';
interface Props {
  id: number;
  profileImage: string;
  logo: string;
}

function ArtistCard({ id, profileImage, logo }: Props) {
  const [isHover, setIsHover] = useState<HoverState>('idle');

  function handleMouseEnter() {
    setIsHover('MouseEnter');
  }

  function handleMouseLeave() {
    setIsHover('MouseLeave');
  }

  function handleOnClick() {
    router.push(`artist/${id}`);
  }

  return (
    <Wrap profileImage={profileImage} isHovered={isHover}>
      <button
        className="bgImg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleOnClick}
      >
        <div className="hover">
          <img className="hover__logo" src={logo} alt=""></img>
          <p className="hover__label">Explore &gt;</p>
        </div>
      </button>
    </Wrap>
  );
}

interface StyledProps {
  profileImage: string;
  isHovered: HoverState;
}

const Wrap = styled.div<StyledProps>`
  border-radius: 10px;
  width: 360px;
  height: 270px;
  overflow: hidden;
  object-fit: cover;

  .bgImg {
    position: relative;
    border: none;
    background: linear-gradient(black, black), url(${(props: StyledProps) => props.profileImage});
    background-blend-mode: saturation;
    background-size: cover;
    cursor: pointer;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .hover {
    display: flex;
    position: absolute;
    top: 0px;
    flex-direction: column;
    align-items: center;
    visibility: hidden;
    background: linear-gradient(
      139.09deg,
      rgba(231, 78, 151, 0.5) 5.46%,
      rgba(100, 101, 244, 0.5) 100%
    );
    background-size: fill;
    width: 100%;
    height: 100%;
    ${({ isHovered }) =>
      isHovered === 'MouseEnter'
        ? 'animation: fadeIn 0.5s; visibility: visible;'
        : isHovered === 'MouseLeave' && 'animation: fadeOut 0.5s;'}

    @media (max-width: 767px) {
      visibility: visible;
      visibility: visible;
      background: linear-gradient(rgba(199, 199, 199, 0.5) 5.46%, rgba(0, 0, 0, 0.5) 100%);
    }

    &__logo {
      margin-top: 55px;
      width: 190px;
      height: 100px;
      object-fit: contain;
      filter: brightness(0) invert(1);

      @media (max-width: 767px) {
        margin-top: 42px;
        width: 121px;
        height: 64px;
      }
    }

    &__label {
      margin-top: 30px;
      text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
      line-height: 30px;
      color: #ffffff;
      font-size: 24px;
      font-weight: bold;
      font-style: normal;

      @media (max-width: 767px) {
        margin-top: 10px;
        font-size: 20px;
      }
    }
  }

  @media (max-width: 767px) {
    width: 240px;
    height: 180px;
  }
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
`;

export default ArtistCard;
