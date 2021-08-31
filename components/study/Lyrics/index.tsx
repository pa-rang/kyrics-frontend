import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { ITimedText } from 'types';

import Quiz from '../Quiz';
import LyricsContent from './LyricsContent';
import Steps from './Steps';

interface Props {
  handleLyrics: (line: ITimedText) => void;
  currentTime: number;
  id: number;
}

function Lyrics({ handleLyrics, currentTime, id }: Props) {
  const [isQuizStep, setIsQuizStep] = useState(false);

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.outerWidth);
  }, []);

  const measureWidth = () => {
    setWidth(window.outerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', measureWidth);

    return () => {
      window.removeEventListener('resize', measureWidth);
    };
  }, []);

  return (
    <Styled.Root>
      <Styled.Lyrics>
        <Styled.Title>Lyrics</Styled.Title>
        <Styled.Main>
          <Steps setIsQuizStep={setIsQuizStep} isQuizStep={isQuizStep} />
          {isQuizStep ? (
            <Quiz />
          ) : (
            <LyricsContent id={id} currentTime={currentTime} handleLyrics={handleLyrics} />
          )}
        </Styled.Main>
      </Styled.Lyrics>
    </Styled.Root>
  );
}

export default Lyrics;
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
