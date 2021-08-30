import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

interface Props {
  name: string;
  bgImg: string;
}

interface StyledProps {
  bgImg: string;
}

function ArtistBanner({ name, bgImg }: Props): ReactElement {
  return (
    <BannerWrap bgImg={bgImg}>
      <div className="bgImg">
        <h2 className="title">{name}</h2>
        <h3 className="subTitle">Learn Korean with {name}!</h3>
      </div>
    </BannerWrap>
  );
}

const BannerWrap = styled.div<StyledProps>`
  .bgImg {
    background: linear-gradient(
        158.98deg,
        rgba(231, 78, 151, 0.4) 3.15%,
        rgba(100, 101, 244, 0.4) 94.3%
      ),
      url(${(props: StyledProps) => props.bgImg}) no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 424px;

    @media (max-width: 767px) {
      height: 134px;
      object-fit: cover;
    }
  }

  .title {
    padding-top: 162px;
    text-align: center;
    color: #ffffff;
    font-size: 64px;
    font-weight: 600;
    font-style: normal;

    @media (max-width: 767px) {
      padding-top: 45px;
      font-size: 24px;
    }
  }

  .subTitle {
    padding-top: 10px;

    text-align: center;
    color: #ffffff;
    font-size: 28px;
    font-weight: 500;
    font-style: normal;

    @media (max-width: 767px) {
      padding-top: 5px;
      font-size: 14px;
    }
  }
`;

export default ArtistBanner;
