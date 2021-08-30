import styled from '@emotion/styled';
import React from 'react';

function Title() {
  return (
    <TitleWrap>
      <div className="bgImage">
        <h2 className="title">
          Learn Korean through your
          <br />
          favorite K-Pop artists and songs!
        </h2>
      </div>
    </TitleWrap>
  );
}

const TitleWrap = styled.div`
  .bgImage {
    background: url(/assets/images/homeBackground.svg) no-repeat;
    background-position: center bottom;
    background-size: cover;
    width: 100%;
    height: 435px;

    @media (max-width: 767px) {
      height: 163px;
      font-size: 16px;
    }
  }

  .title {
    padding-top: 132px;
    text-align: center;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    line-height: 1.5;
    white-space: nowrap;
    color: #ffffff;
    font-size: 40px;
    font-weight: bold;
    font-style: normal;

    @media (max-width: 767px) {
      padding-top: 48px;
      font-size: 16px;
    }
  }
`;

export default Title;
