import styled from '@emotion/styled';
import { useGetUser } from 'hooks/api';
import { client, clientWithoutToken } from 'lib/api';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ISongData, ITimedText } from 'types';

interface Props {
  handleLyrics: (line: ITimedText) => void;
  currentTime: number;
  id: number;
  fontSize: string;
  engTranslated: boolean;
}

function Lyrics({ id, currentTime, handleLyrics, fontSize, engTranslated }: Props) {
  const [timedtext, setTimedtext] = useState<ITimedText[] | undefined>();
  const [startTime, setStartTime] = useState<number>();
  const user = useGetUser();
  const isToken = user ? client : clientWithoutToken;
  const { data } = useSWR<{ data: { data: ISongData } }>(`/song/${id}`, isToken.get);
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

  return (
    <Styled.Root fontSize={fontSize} engTranslated={engTranslated} isFixed={isFixed}>
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
            <span className={'lyrics eng ' + (startTime === line.startTime && 'highlight')}>
              {line.eng}
            </span>
          </span>
        ))}
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
    @media screen and (max-width: 415px) {
      margin-top: ${({ isFixed }) => isFixed && '100px'};
      margin-bottom: 60px;
    }
  `,
};
