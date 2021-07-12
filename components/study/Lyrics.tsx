import Footer from '@components/common/Footer';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
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
  const [timedtext, setTimedtext] = useState([
    {
      startTime: 20.102,
      duration: 2.618,
      kor: '어느 날 세상이 멈췄어',
      eng: 'One day the world stopped',
    },
    {
      startTime: 22.72,
      duration: 3.264,
      kor: '아무런 예고도 하나 없이',
      eng: 'Without any warning',
    },
    {
      startTime: 25.984,
      duration: 3.089,
      kor: '봄은 기다림을 몰라서',
      eng: 'Because spring doesnt know to wait',
    },
    {
      startTime: 29.073,
      duration: 3.129,
      kor: '눈치 없이 와버렸어',
      eng: 'It came without care',
    },
    {
      startTime: 32.202,
      duration: 2.499,
      kor: '발자국이 지워진 거리',
      eng: 'Street where footprints have been erased',
    },
    {
      startTime: 34.701,
      duration: 3.417,
      kor: '여기 넘어져있는 나',
      eng: 'I fell here, lying on the ground',
    },
    {
      startTime: 38.118,
      duration: 2.654,
      kor: '혼자 가네 시간이',
      eng: 'Time goes by on its own',
    },
    {
      startTime: 40.772,
      duration: 3.619,
      kor: '미안해 말도 없이',
      eng: 'Without a word',
    },
    {
      startTime: 46.755,
      duration: 1.691,
      kor: '오늘도 비가 내릴 것 같아',
      eng: 'I think it will rain today',
    },
    {
      startTime: 48.446,
      duration: 1.64,
      kor: '흠뻑 젖어버렸네',
      eng: 'Im drenched',
    },
    {
      startTime: 50.086,
      duration: 2.704,
      kor: '아직도 멈추질 않아',
      eng: 'Still wont stop',
    },
    {
      startTime: 52.79,
      duration: 1.523,
      kor: '저 먹구름보다 빨리 달려가',
      eng: 'I run faster than those dark clouds',
    },
    {
      startTime: 54.313,
      duration: 1.878,
      kor: '그럼 될 줄 알았는데',
      eng: 'Then I thought it would be',
    },
    {
      startTime: 56.191,
      duration: 0.964,
      kor: '나 겨우 사람인가 봐',
      eng: 'Guess Im just a human',
    },
    {
      startTime: 57.155,
      duration: 2.165,
      kor: '몹시 아프네',
      eng: 'I feel very sick',
    },
    {
      startTime: 59.32,
      duration: 2.829,
      kor: '세상이란 놈이 준 감기',
      eng: 'The cold that the world gave me',
    },
    {
      startTime: 62.149,
      duration: 2.935,
      kor: '덕분에 눌러보는 먼지 쌓인 되감기',
      eng: 'A dusty rewind that I press thanks to the cold',
    },
    {
      startTime: 65.084,
      duration: 1.824,
      kor: '넘어진 채 청하는 엇박자의 춤',
      eng: 'A dance of the wrong beat I ask for while falling down',
    },
    {
      startTime: 66.908,
      duration: 1.254,
      kor: '겨울이 오면 내쉬자',
      eng: 'When winter comes, lets exhale',
    },
    {
      startTime: 69.048,
      duration: 2.764,
      kor: '더 뜨거운 숨',
      eng: 'A hotter breath',
    },
    {
      startTime: 75.022,
      duration: 5.213,
      kor: '끝이 보이지 않아',
      eng: 'I cant see the end',
    },
    {
      startTime: 80.956,
      duration: 2.873,
      kor: '출구가 있긴 할까',
      eng: 'Is there even an exit',
    },
    {
      startTime: 83.829,
      duration: 3.122,
      kor: '발이 떼지질 않아 않아 oh',
      eng: 'I cant take my feet off oh',
    },
    {
      startTime: 86.951,
      duration: 4.342,
      kor: '잠시 두 눈을 감아',
      eng: 'Close your eyes for a moment',
    },
    {
      startTime: 91.293,
      duration: 2.877,
      kor: '여기 내 손을 잡아',
      eng: 'Hold my hand here',
    },
    {
      startTime: 94.17,
      duration: 3.051,
      kor: '저 미래로 달아나자',
      eng: 'Lets run away to that future',
    },
    {
      startTime: 100.748,
      duration: 2.395,
      kor: 'Like an echo in the forest',
      eng: 'Like an echo in the forest',
    },
    {
      startTime: 103.143,
      duration: 2.882,
      kor: '하루가 돌아오겠지',
      eng: 'One day will come',
    },
    {
      startTime: 106.025,
      duration: 3.004,
      kor: '아무 일도 없단 듯이',
      eng: 'As if nothing happened',
    },
    {
      startTime: 109.029,
      duration: 3.577,
      kor: 'Yeah life goes on',
      eng: 'Yeah life goes on',
    },
    {
      startTime: 112.606,
      duration: 1.931,
      kor: 'Like an arrow in the blue sky',
      eng: 'Like an arrow in the blue sky',
    },
    {
      startTime: 114.537,
      duration: 1.489,
      kor: '또 하루 더 날아가지',
      eng: 'One more day to fly',
    },
    {
      startTime: 116.026,
      duration: 2.919,
      kor: 'On my pillow, on my table',
      eng: 'On my pillow, on my table',
    },
    {
      startTime: 118.945,
      duration: 2.88,
      kor: 'Yeah life goes on',
      eng: 'Yeah life goes on',
    },
    {
      startTime: 124.321,
      duration: 1.487,
      kor: 'Like this again',
      eng: 'Like this again',
    },
    {
      startTime: 127.739,
      duration: 2.963,
      kor: '이 음악을 빌려 너에게 나 전할게',
      eng: 'I will borrow this music and tell you',
    },
    {
      startTime: 130.702,
      duration: 3.086,
      kor: '사람들은 말해 세상이 다 변했대',
      eng: 'People say the world has changed',
    },
    {
      startTime: 135.435,
      duration: 2.471,
      kor: '다행히도 우리 사이는',
      eng: 'Fortunately, between us',
    },
    {
      startTime: 137.906,
      duration: 1.637,
      kor: '아직 여태 안 변했네',
      eng: 'Still nothing hasnt changed',
    },
    {
      startTime: 143.138,
      duration: 2.957,
      kor: '늘 하던 시작과 끝 ‘안녕’이란 말로',
      eng: 'The beginning and the end that we always faced, with the word ‘annyeong’',
    },
    {
      startTime: 146.095,
      duration: 5.728,
      kor: '오늘과 내일을 또 함께 이어보자고',
      eng: 'Lets connect today and tomorrow together again',
    },
    {
      startTime: 151.823,
      duration: 3.034,
      kor: '멈춰있지만 어둠에 숨지 마',
      eng: 'Staying still but dont hide in the dark',
    },
    {
      startTime: 154.857,
      duration: 3.212,
      kor: '빛은 또 떠오르니깐',
      eng: 'The light rises again',
    },
    {
      startTime: 177.11,
      duration: 2.943,
      kor: '끝이 보이지 않아',
      eng: 'I cant see the end',
    },
    {
      startTime: 180.053,
      duration: 2.868,
      kor: '출구가 있긴 할까',
      eng: 'Is there even an exit',
    },
    {
      startTime: 182.921,
      duration: 3.412,
      kor: '발이 떼지질 않아 않아 oh',
      eng: 'I cant take my feet off oh',
    },
    {
      startTime: 186.333,
      duration: 2.622,
      kor: '잠시 두 눈을 감아',
      eng: 'Close your eyes for a moment',
    },
    {
      startTime: 188.955,
      duration: 2.783,
      kor: '여기 내 손을 잡아',
      eng: 'Hold my hand here',
    },
    {
      startTime: 191.738,
      duration: 2.954,
      kor: '저 미래로 달아나자',
      eng: 'Lets run away to that future',
    },
    {
      startTime: 198.479,
      duration: 1.88,
      kor: 'Like an echo in the forest',
      eng: 'Like an echo in the forest',
    },
    {
      startTime: 200.359,
      duration: 1.388,
      kor: '하루가 돌아오겠지',
      eng: 'One day will come',
    },
    {
      startTime: 201.747,
      duration: 2.399,
      kor: '아무 일도 없단 듯이',
      eng: 'As if nothing happened',
    },
    {
      startTime: 207.865,
      duration: 2.226,
      kor: 'Yeah life goes on',
      eng: 'Yeah life goes on',
    },
    {
      startTime: 213.619,
      duration: 2.579,
      kor: 'Like an arrow in the blue sky',
      eng: 'Like an arrow in the blue sky',
    },
    {
      startTime: 219.823,
      duration: 2.156,
      kor: '또 하루 더 날아가지',
      eng: 'One more day to fly',
    },
  ]);
  const [startTime, setStartTime] = useState<number>();
  const [isDropDown, setIsDropDown] = useState(false);
  const [engTranslated, setEngTranslated] = useState(false);
  const [isQuizStep, setIsQuizStep] = useState(false);
  const [fontSize, setFontSize] = useState('Medium');

  useEffect(() => {
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
