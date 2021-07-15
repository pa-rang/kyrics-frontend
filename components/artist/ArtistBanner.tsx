import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

function ArtistBanner(): ReactElement {
  const artistName = 'BTS';

  return (
    <BannerWrap>
      <div className="bgImg">
        <p className="title">{artistName}</p>
        <p className="subTitle">Learn Korean with {artistName}!</p>
      </div>
    </BannerWrap>
  );
}

const BannerWrap = styled.div`
  .bgImg {
    background: linear-gradient(
        158.98deg,
        rgba(231, 78, 151, 0.4) 3.15%,
        rgba(100, 101, 244, 0.4) 94.3%
      ),
      url('https://img.hankyung.com/photo/201908/c05e2425a01667953569fc908e0be320.jpg') no-repeat;
    background-size: cover;
    width: 100%;
    height: 424px;
  }

  .title {
    padding-top: 162px;
    text-align: center;
    color: #ffffff;
    font-size: 64px;
    font-weight: 600;
    font-style: normal;
  }

  .subTitle {
    padding-top: 10px;

    text-align: center;
    color: #ffffff;
    font-size: 28px;
    font-weight: 500;
    font-style: normal;
  }
`;

export default ArtistBanner;
