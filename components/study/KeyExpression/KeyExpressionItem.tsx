import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ellipsisText } from 'lib/mixin';
import React from 'react';

import FavoriteButton from './FavoriteButton';

interface Props {
  id: number;
  songId?: number;
  type: 'line-top' | 'line-left';
  width: string;
  eng: string;
  engExample: string;
  kor: string;
  korExample: string;
  styled?: { [key: string]: string };
  isSaved: boolean;
  small?: boolean;
}

function KeyExpressionItem({
  id,
  songId,
  type,
  width,
  eng,
  engExample,
  kor,
  korExample,
  styled,
  isSaved,
  small = false,
}: Props) {
  return (
    <Styled.Root width={width} style={{ ...styled }}>
      <Styled.KeywordWrapper type={type} small={small}>
        <Styled.KorKeyword small={small}>{kor}</Styled.KorKeyword>
        <Styled.EngKeyword small={small}>{eng}</Styled.EngKeyword>
      </Styled.KeywordWrapper>
      <Styled.ExampleWrapper small={small}>
        <Styled.KorExample small={small}>{korExample}</Styled.KorExample>
        <Styled.EngExample small={small}>{engExample}</Styled.EngExample>
      </Styled.ExampleWrapper>
      <Styled.Line type={type} />
      <FavoriteButton small={small} type={type} isSaved={isSaved} id={id} songId={songId} />
    </Styled.Root>
  );
}

export default KeyExpressionItem;

const Styled = {
  Root: styled.div<{ width: string }>`
    position: relative;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    background-color: #fff;
    width: ${({ width }) => width};
  `,

  Line: styled.div<{ type: 'line-top' | 'line-left' }>`
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #6465f4;

    ${({ type }) =>
      type === 'line-left'
        ? css`
            border-radius: 8px 0 0 8px;
            width: 8px;
            height: 100%;
          `
        : css`
            border-radius: 8px 8px 0 0;
            width: 100%;
            height: 8px;
          `}
  `,

  KeywordWrapper: styled.div<{ type: 'line-top' | 'line-left'; small: boolean }>`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    margin: ${({ small }) => (small ? '4px 12px 12px 16px' : '16px 16px 16px 24px')};
    border-bottom: 1px solid #e1e1e1;
    height: 72px;
    ${({ type }) => (type === 'line-top' ? 'height: 72px;' : 'height: 64px;')}
    height: ${({ small }) => small && '50px'};
  `,

  KorKeyword: styled.h4<{ small: boolean }>`
    margin-right: 10%;
    margin-bottom: ${({ small }) => (small ? '4px' : '6px')};
    min-width: 72px;
    color: #202020;
    font-size: ${({ small }) => (small ? '14px' : '20px')};
    font-weight: 500;
    ${ellipsisText}
  `,

  EngKeyword: styled.h5<{ small: boolean }>`
    margin-bottom: ${({ small }) => (small ? '2px' : '6px')};
    line-height: 1.2;
    color: #9d9d9d;
    font-size: ${({ small }) => (small ? '12px' : '14x')};
    font-weight: 500;
    ${ellipsisText}
  `,

  ExampleWrapper: styled.div<{ small: boolean }>`
    margin: ${({ small }) => (small ? '4px 12px 12px 16px' : '16px 16px 16px 24px')};
    font-size: ${({ small }) => (small ? '10px' : '14px')};
  `,

  KorExample: styled.h5<{ small: boolean }>`
    margin-bottom: ${({ small }) => (small ? '2px' : '6px')};
    line-height: 1.4;
    color: #202020;
    /* font-size: ${({ small }) => (small ? '14px' : '12px')}; */
    font-size: 12px;
    font-weight: 500;
  `,

  EngExample: styled.h5<{ small: boolean }>`
    line-height: 1.4;
    color: #9d9d9d;
    font-size: 12px;
    font-weight: 500;
  `,
};
