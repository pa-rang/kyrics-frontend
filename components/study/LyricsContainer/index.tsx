import styled from '@emotion/styled';
import React, { useState } from 'react';
import { ITimedText } from 'types';

import Quiz from '../Quiz';
import LyricsContent from './LyricsContent';
import Steps from './Steps';

interface Props {
  handleLyrics: (line: ITimedText) => void;
  currentTime: number;
}

function LyricsContainer({ handleLyrics, currentTime }: Props) {
  const [isQuizStep, setIsQuizStep] = useState(false);

  return (
    <Styled.Root>
      <Styled.Lyrics>
        <Styled.Title>Lyrics</Styled.Title>
        <Styled.Main>
          <Steps isQuizStep={isQuizStep} setIsQuizStep={setIsQuizStep} />
          {isQuizStep ? (
            <Quiz />
          ) : (
            <LyricsContent currentTime={currentTime} handleLyrics={handleLyrics} />
          )}
        </Styled.Main>
      </Styled.Lyrics>
    </Styled.Root>
  );
}

export default LyricsContainer;

const Styled = {
  Root: styled.section`
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 150px;
    width: 100%;
    max-width: 780px;
  `,
  Lyrics: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
  `,

  Title: styled.h3`
    margin-top: 36px;
    margin-bottom: 23px;
    color: #7d7d7d;
    font-size: 24px;
    font-weight: 700;
    @media (max-width: 768px) {
      display: none;
    }
  `,
  Main: styled.section`
    position: relative;
    border-radius: 10px;
    background-color: #f6f6f6;
    width: 100%;
    max-width: 780px;

    @media (max-width: 768px) {
      margin-top: 23px;
      min-width: 289px;
    }
  `,
};
