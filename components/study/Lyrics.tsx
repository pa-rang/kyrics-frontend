import styled from '@emotion/styled';
import { useGetUser } from 'hooks/api';
import { client, clientWithoutToken } from 'lib/api';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ISongData, ITimedText } from 'types';

import { Alphabet, dropDownIcon, sizeDown, sizeUp } from '../../public/assets';
import Quiz from './Quiz';

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
          <Styled.Steps>
            <Styled.LeftStep
              onClick={() => setIsQuizStep(false)}
              aria-hidden="true"
              isQuizStep={isQuizStep}
              className="step"
            >
              <div>STEP 1</div>
              <div>Lyrics</div>
            </Styled.LeftStep>
            <Styled.CenterStep isQuizStep={isQuizStep}></Styled.CenterStep>
            <Styled.RightStep
              onClick={() => setIsQuizStep(true)}
              aria-hidden="true"
              isQuizStep={isQuizStep}
              className="step"
            >
              <div>STEP 2</div>
              <div>Quiz</div>
            </Styled.RightStep>
          </Styled.Steps>
          {isQuizStep ? (
            <Quiz />
          ) : (
            <div className="lyrics--box">
              <div className="textSizeController">
                <img className="alphabet" src={Alphabet.src} alt="" />
                <img
                  className="sizeUp"
                  src={sizeUp.src}
                  alt=""
                  onClick={() => handleSize('Up')}
                  aria-hidden="true"
                />
                <img
                  className="sizeDown"
                  src={sizeDown.src}
                  alt=""
                  onClick={() => handleSize('Down')}
                  aria-hidden="true"
                />
              </div>
              <div
                className="language"
                onClick={() => setIsDropDown((isDropDown) => !isDropDown)}
                aria-hidden="true"
              >
                {engTranslated ? 'English' : 'Translate'}
                <img src={dropDownIcon.src} alt="" />
                {isDropDown && (
                  <div className="language__dropdown">
                    <div
                      className="language__none lang"
                      onClick={() => setEngTranslated(false)}
                      aria-hidden="true"
                    >
                      None
                    </div>
                    <div
                      className="language__english lang"
                      onClick={() => setEngTranslated(true)}
                      aria-hidden="true"
                    >
                      English
                    </div>
                    {/* <div>Japanese</div> */}
                  </div>
                )}
              </div>
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
  Root: styled.div<StyledProps>`
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 150px;
    /* justify-content: center; */
    width: 100%;
    max-width: 780px;
    .textSizeController {
      position: absolute;
      top: 136px;
      left: 41px;
      .alphabet {
        margin-right: 7px;
      }
      .sizeUp,
      .sizeDown {
        cursor: pointer;
      }
      @media (max-width: 768px) {
        display: none;
      }
    }

    .language {
      display: flex;
      position: absolute;
      top: 136px;
      right: 39px;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background-color: #6465f4;
      cursor: pointer;
      width: 132px;
      height: 43px;
      color: #ffffff;
      font-size: 16px;
      img {
        margin-left: 8px;
      }
      .language__dropdown {
        display: flex;
        position: absolute;
        top: 49px;
        /* height: 125px; */
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10;
        border-radius: 10px;
        background-color: #f8fafc;
        cursor: auto;
        padding: 20px 0;
        width: 132px;
        .lang {
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #e1e1e1;
          cursor: pointer;
          padding-bottom: 3px;
          width: 83px;
        }
        .language__none {
          margin-bottom: 13.5px;
          color: ${({ engTranslated }) => (engTranslated ? '#9d9d9d' : '#464646')};
          font-weight: ${({ engTranslated }) => (engTranslated ? 400 : 700)};
        }
        .language__english {
          color: ${({ engTranslated }) => (engTranslated ? '#464646' : '#9d9d9d')};
          font-weight: ${({ engTranslated }) => (engTranslated ? 700 : 400)};
        }
        @media (max-width: 768px) {
          top: 30px;
        }
      }
      @media (max-width: 768px) {
        top: 71px;
        width: 84px;
        height: 25px;
        font-size: 10px;
      }
    }
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
  Steps: styled.div`
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
      div:nth-of-type(1) {
        height: 27px;
        font-size: 24px;
        font-weight: 700;
        @media (max-width: 768px) {
          height: 16px;
          font-size: 14px;
        }
      }
      div:nth-of-type(2) {
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
    .step2 {
      transform: translateX(-34px);
    }
  `,
  LeftStep: styled.div<{ isQuizStep: boolean }>`
    border-top-left-radius: 10px;
    background-color: ${({ isQuizStep }) => (isQuizStep ? '#c8c8ee' : '#6465f4')};
  `,
  CenterStep: styled.div<{ isQuizStep: boolean }>`
    border-top: 50px solid ${({ isQuizStep }) => (isQuizStep ? '#6465f4' : '#c8c8ee')};
    border-bottom: 50px solid ${({ isQuizStep }) => (isQuizStep ? '#6465f4' : '#c8c8ee')};
    border-left: 24px solid ${({ isQuizStep }) => (isQuizStep ? '#c8c8ee' : '#6465f4')};

    width: 0px;
    height: 0px;
    @media (max-width: 768px) {
      border-top: 25px solid ${({ isQuizStep }) => (isQuizStep ? '#6465f4' : '#c8c8ee')};
      border-bottom: 25px solid ${({ isQuizStep }) => (isQuizStep ? '#6465f4' : '#c8c8ee')};
      border-left: 10px solid ${({ isQuizStep }) => (isQuizStep ? '#c8c8ee' : '#6465f4')};
    }
  `,
  RightStep: styled.div<{ isQuizStep: boolean }>`
    border-top-right-radius: 10px;
    background-color: ${({ isQuizStep }) => (isQuizStep ? '#6465f4' : '#c8c8ee')};
  `,
  Title: styled.div`
    margin-top: 36px;
    margin-bottom: 23px;
    color: #7d7d7d;
    font-size: 24px;
    font-weight: 700;
    @media (max-width: 768px) {
      display: none;
    }
  `,
  Main: styled.div`
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
