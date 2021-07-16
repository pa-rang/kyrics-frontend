import styled from '@emotion/styled';
import React from 'react';

function Title() {
  return (
    <TitleWrap>
      <div className="bgImage">
        <p className="title">
          Learn Korean through your
          <br />
          favorite K-Pop artists and songs!
        </p>
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

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

export default Title;
