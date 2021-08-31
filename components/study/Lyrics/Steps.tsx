import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface Props {
  isQuizStep: boolean;
  setIsQuizStep: React.Dispatch<React.SetStateAction<boolean>>;
}

function Steps({ isQuizStep, setIsQuizStep }: Props) {
  return (
    <Styled.Root>
      <Styled.LeftStep
        onClick={() => setIsQuizStep(false)}
        isQuizStep={isQuizStep}
        className="step"
      >
        <div>STEP 1</div>
        <div>Lyrics</div>
      </Styled.LeftStep>
      <Styled.CenterStep isQuizStep={isQuizStep}></Styled.CenterStep>
      <Styled.RightStep
        onClick={() => setIsQuizStep(true)}
        isQuizStep={isQuizStep}
        className="step"
      >
        <div>STEP 2</div>
        <div>Quiz</div>
      </Styled.RightStep>
    </Styled.Root>
  );
}

export default Steps;

const Styled = {
  Root: styled.div`
    display: flex;
    cursor: pointer;
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 390px;
      height: 100px;
      color: #ffffff;
      & > div:nth-of-type(1) {
        height: 27px;
        font-size: 24px;
        font-weight: 700;
        @media (max-width: 768px) {
          height: 16px;
          font-size: 14px;
        }
      }
      & > div:nth-of-type(2) {
        font-size: 16px;
        font-weight: 500;
        @media (max-width: 768px) {
          font-size: 10px;
        }
      }
      @media (max-width: 768px) {
        height: 50px;
      }
    }
  `,
  LeftStep: styled.div<{ isQuizStep: boolean }>`
    border-top-left-radius: 10px;
    background-color: ${({ isQuizStep }) => (isQuizStep ? '#c8c8ee' : '#6465f4')};
  `,
  CenterStep: styled.div<{ isQuizStep: boolean }>`
    ${({ isQuizStep }) =>
      isQuizStep
        ? css`
            border-top: 50px solid #6465f4;
            border-bottom: 50px solid #6465f4;
            border-left: 25px solid #c8c8ee;
          `
        : css`
            border-top: 50px solid #c8c8ee;
            border-bottom: 50px solid #c8c8ee;
            border-left: 25px solid #6465f4;
          `};
    width: 0px;
    height: 0px;
    @media (max-width: 768px) {
      border-top: 25px;
      border-bottom: 25px;
      border-left: 10px;
    }
  `,
  RightStep: styled.div<{ isQuizStep: boolean }>`
    border-top-right-radius: 10px;
    background-color: ${({ isQuizStep }) => (isQuizStep ? '#6465f4' : '#c8c8ee')};
  `,
};
