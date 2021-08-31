import styled from '@emotion/styled';
import { useGetUser } from 'hooks/api';
import { client, clientWithoutToken } from 'lib/api';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ISongData, ITimedText } from 'types';

import Quiz from '../Quiz';
import Steps from './Steps';
import TextSizeController from './TextSizeController';
import Translate from './Translate';

interface Props {
  handleLyrics: (line: ITimedText) => void;
  currentTime: number;
  id: number;
}

function Lyrics({ handleLyrics, currentTime, id }: Props) {
  const [timedtext, setTimedtext] = useState<ITimedText[] | undefined>();
  const [startTime, setStartTime] = useState<number>();
  const [isDropDown, setIsDropDown] = useState(false);
  const [engTranslated, setEngTranslated] = useState(false);
  const [isQuizStep, setIsQuizStep] = useState(false);
  const [fontSize, setFontSize] = useState('Medium');

  const user = useGetUser();
  const isToken = user ? client : clientWithoutToken;
  const { data } = useSWR<{ data: { data: ISongData } }>(`/song/${id}`, isToken.get);

  useEffect(() => {
    setTimedtext(data?.data?.data?.lyrics);
  }, [data]);

  useEffect(() => {
    timedtext &&
      timedtext.forEach((line: ITimedText) => {
        if (line.startTime <= currentTime && currentTime < line.startTime + line.duration) {
          setStartTime(line.startTime);
        }
      });
  }, [currentTime]);

  const handleSize = (type: string) => {
    if (type === 'Up') {
      if (fontSize === 'Big') {
        return;
      } else if (fontSize === 'Medium') {
        setFontSize('Big');
      } else if (fontSize === 'Small') {
        setFontSize('Medium');
      }
    } else {
      if (fontSize === 'Small') {
        return;
      } else if (fontSize === 'Medium') {
        setFontSize('Small');
      } else if (fontSize === 'Big') {
        setFontSize('Medium');
      }
    }
  };
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

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed]);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Styled.Root fontSize={fontSize} engTranslated={engTranslated} isFixed={isFixed}>
      <Styled.Lyrics>
        <Styled.Title>Lyrics</Styled.Title>
        <Styled.Main>
          <Steps setIsQuizStep={setIsQuizStep} isQuizStep={isQuizStep} />
          {isQuizStep ? (
            <Quiz />
          ) : (
            <div className="lyrics--box">
              <TextSizeController handleSize={handleSize} />
              <Translate
                engTranslated={engTranslated}
                setEngTranslated={setEngTranslated}
                isDropDown={isDropDown}
                setIsDropDown={setIsDropDown}
              />
              <div className="lyrics__lines">
                {timedtext &&
                  timedtext.map((line, index) => (
                    <span
                      className="lyrics__line"
                      key={index}
                      onClick={() => handleLyrics(line)}
                      aria-hidden="true"
                    >
                      <span
                        key={index}
                        onClick={() => handleLyrics(line)}
                        aria-hidden="true"
                        className={'lyrics kor ' + (startTime === line.startTime && 'highlight')}
                      >
                        {line.kor}
                      </span>
                      <span
                        className={'lyrics eng ' + (startTime === line.startTime && 'highlight')}
                      >
                        {line.eng}
                      </span>
                    </span>
                  ))}
              </div>
            </div>
          )}
        </Styled.Main>
      </Styled.Lyrics>
    </Styled.Root>
  );
}

export default Lyrics;

interface StyledProps {
  fontSize: string;
  engTranslated: boolean;
  isFixed: boolean;
}

const Styled = {
  Root: styled.section<StyledProps>`
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 150px;
    width: 100%;
    max-width: 780px;

    .lyrics__lines {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto;
      padding-top: 100px;
      width: 100%;
      .lyrics__line {
        display: flex;
        flex: 0 1 auto;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: ${({ engTranslated }) => (engTranslated ? '35px' : '30px')};
        cursor: pointer;
        .lyrics {
          text-align: center;
          line-height: 1.5;
          color: #464646;
        }
        .kor {
          margin-bottom: ${({ engTranslated }) => (engTranslated ? '10px' : '0')};
          font-size: ${({ fontSize }) =>
            fontSize === 'Medium' ? '20px' : fontSize === 'Big' ? '24px' : '12px'};

          @media (max-width: 768px) {
            font-size: 14px;
          }
        }
        .eng {
          display: ${({ engTranslated }) => (engTranslated ? 'visible' : 'none')};
          color: #9d9d9d;
          font-size: ${({ fontSize }) =>
            fontSize === 'Medium' ? '16px' : fontSize === 'Big' ? '20px' : '12px'};
          @media (max-width: 768px) {
            font-size: 12px;
          }
        }
        .highlight {
          color: #6465f4;
        }
        @media (max-width: 768px) {
          margin-bottom: 20px;
        }
      }
      @media (max-width: 768px) {
        padding-top: 66px;
      }
    }
    @media screen and (max-width: 415px) {
      margin-top: ${({ isFixed }) => isFixed && '100px'};
      margin-bottom: 60px;
    }
  `,
  Lyrics: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* justify-content: center; */
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
