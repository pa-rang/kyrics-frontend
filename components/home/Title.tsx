import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

function Title(): ReactElement {
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
    /* background-size: cover; */
    /* height: 440px; */
    /* margin-top: 0;
    margin-right: 0;
    margin-left: 0; */
    background: url(/assets/images/homeBackground.svg) no-repeat;
    width: 100vw;
    height: 435px;
  }

  .title {
    padding-top: 132px;
    text-align: center;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    line-height: 60px;
    white-space: nowrap;
    color: #ffffff;
    font-size: 40px;
    font-weight: bold;
    font-style: normal;
  }
`;

export default Title;
