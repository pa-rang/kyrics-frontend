import styled from '@emotion/styled';
import React, { ReactElement, useState } from 'react';

interface Props {
  name: string;
  profileImage: string;
  logo: string;
}

function ArtistCard({ name, profileImage, logo }: Props): ReactElement {
  const [isHover, setIsHover] = useState(false);

  function handleMouseEnter() {
    setIsHover(true);
  }

  function handleMouseLeave() {
    setIsHover(false);
  }

  return (
    <Wrap name={name} profileImage={profileImage} logo={logo}>
      <button className="bgImg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isHover && (
          <div className="hover">
            <img className="hover__logo" src={logo} alt=""></img>
            <p className="hover__label">Start exploring &gt;</p>
          </div>
        )}
      </button>
    </Wrap>
  );
}

const Wrap = styled.div<Props>`
  margin-right: 40px;
  border-radius: 10px;
  width: 360px;
  height: 270px;
  overflow: hidden;
  object-fit: cover;

  .bgImg {
    border: none;
    background: linear-gradient(black, black), url(${(props: Props) => props.profileImage});
    background-blend-mode: saturation;
    background-size: cover;
    cursor: pointer;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .hover {
    background: linear-gradient(
      139.09deg,
      rgba(231, 78, 151, 0.5) 5.46%,
      rgba(100, 101, 244, 0.5) 100%
    );
    background-size: fill;
    width: 100%;
    height: 100%;

    &__logo {
      margin-top: 55px;
      width: 190px;
      height: 100px;
      object-fit: contain;
      filter: brightness(0) invert(1);
    }

    &__label {
      margin-top: 30px;
      text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
      line-height: 30px;
      color: #ffffff;
      font-size: 24px;
      font-weight: bold;
      font-style: normal;
    }
  }
`;

export default ArtistCard;
