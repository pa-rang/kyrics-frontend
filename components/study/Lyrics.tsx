import styled from '@emotion/styled';
import { mockClient } from 'lib/api';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { songDataState } from 'states';
import useSWR from 'swr';
import { ITimedText } from 'types';

import {
  Alphabet,
  dropDownIcon,
  offStep1,
  offStep2,
  onStep1,
  onStep2,
  sizeDown,
  sizeUp,
} from '../../public/assets';
import Quiz from './Quiz';

interface Props {
  handleLyrics: (line: ITimedText) => void;
  currentTime: number;
}

function Lyrics({ handleLyrics, currentTime }: Props) {
  const songData = useRecoilValue(songDataState);
  const [timedtext, setTimedtext] = useState<ITimedText[] | null>(null);
  const [startTime, setStartTime] = useState<number>();
  const [isDropDown, setIsDropDown] = useState(false);
  const [engTranslated, setEngTranslated] = useState(false);
  const [isQuizStep, setIsQuizStep] = useState(false);
  const [fontSize, setFontSize] = useState('Medium');
  const { data } = useSWR('song-1', (url) => mockClient.get(url));

  useEffect(() => {
    setTimedtext(data?.data?.lyrics);
  }, [songData]);

  useEffect(() => {
    timedtext?.forEach((line: ITimedText) => {
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

  return (
    <Styled.Root fontSize={fontSize} engTranslated={engTranslated}>
      <div>
        <Styled.Title>Lyrics</Styled.Title>
        <Styled.Main>
          <Styled.Steps>
            <img
              src={isQuizStep ? offStep1.src : onStep1.src}
              alt=""
              className="step1"
              onClick={() => setIsQuizStep(false)}
              aria-hidden="true"
            />
            <img
              src={isQuizStep ? onStep2.src : offStep2.src}
              alt=""
              className="step2"
              onClick={() => setIsQuizStep(true)}
              aria-hidden="true"
            />
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
      </div>
    </Styled.Root>
  );
}

export default Lyrics;

interface StyledProps {
  fontSize: string;
  engTranslated: boolean;
}

const Styled = {
  Root: styled.div<StyledProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    .lyrics--box {
      height: 100%;
    }

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
      }
    }
    .lyrics__lines {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto;
      padding-top: 100px;
      .lyrics__line {
        display: flex;
        flex: 0 1 auto;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 35px;
        cursor: pointer;

        .lyrics {
          text-align: center;
          line-height: 30px;
          color: #464646;
          font-size: ${({ fontSize }) =>
            fontSize === 'Medium' ? '20px' : fontSize === 'Big' ? '24px' : '16px'};
        }
        .kor {
          margin-bottom: 10px;
        }
        .eng {
          display: ${({ engTranslated }) => (engTranslated ? 'visible' : 'none')};

          color: #9d9d9d;
          font-size: ${({ fontSize }) =>
            fontSize === 'Medium' ? '16px' : fontSize === 'Big' ? '20px' : '12px'};
        }
        .highlight {
          color: #6465f4;
        }
      }
    }
  `,
  Steps: styled.div`
    display: flex;
    cursor: pointer;
    .step2 {
      transform: translateX(-34px);
    }
  `,
  Title: styled.div`
    margin-top: 36px;
    margin-bottom: 23px;
    color: #7d7d7d;
    font-size: 24px;
    font-weight: 700;
  `,
  Main: styled.div`
    position: relative;
    background-color: #f6f6f6;
    width: 780px;
  `,
};
