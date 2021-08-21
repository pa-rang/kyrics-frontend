import styled from '@emotion/styled';
import { getPageLogger } from 'lib/utils/amplitude';
import React from 'react';

const keyExpressionLogger = getPageLogger('key_expression');

function LookingMore() {
  return (
    <Styled.Root>
      <Styled.FirstLine>Looking for more Key Expressions?</Styled.FirstLine>
      <Styled.Box>
        <button
          className="box"
          onClick={() => {
            keyExpressionLogger.click('KEY_EXPRESSION_구글폼_클릭수');
            window.open(
              'https://docs.google.com/forms/d/e/1FAIpQLSfkmJjcBl2mQEYeszqCpCaJOEan52SXi54Azml0dbsTshq3ow/viewform',
            );
          }}
        >
          <div className="box-message">
            Help us improve our service
            <br /> with new features!&nbsp;
            <img src="/assets/icons/arrow.svg" alt="arrow" />
          </div>
        </button>
      </Styled.Box>
    </Styled.Root>
  );
}

export default LookingMore;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    border-radius: 8px;
    background: url('/assets/images/keyExpressionImage.svg') no-repeat 0 0;
    width: 343px;
    height: 134px;
  `,
  FirstLine: styled.div`
    text-align: center;
    line-height: 22px;
    color: #ffffff;
    font-family: Noto Sans;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
  `,
  Box: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 19px;
    border-radius: 10px;
    background: #ffffff;
    width: 238px;
    height: 44px;
    .box {
      outline: 0;
      border: 0;
      border-radius: 10px;
      cursor: pointer;
      width: 238px;
      height: 44px;
    }
    .box-message {
      text-align: center;
      line-height: 16px;
      color: #464646;
      font-family: Noto Sans;
      font-size: 12px;
      font-weight: 500;
      font-style: normal;
    }
  `,
};
