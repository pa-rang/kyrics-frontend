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
    justify-content: center;
    border-bottom: 1px solid #e1e1e1;
    height: 72px;
    ${({ type }) => (type === 'line-top' ? 'height: 72px;' : 'height: 64px;')}
    ${({ small }) =>
      small
        ? css`
            margin: 4px 12px 6px 16px;
            height: 50px;
          `
        : css`
            margin: 16px 16px 16px 24px;
          `}
  `,

  KorKeyword: styled.h4<{ small: boolean }>`
    margin-right: 10%;
    min-width: 72px;
    color: #202020;
    font-weight: 500;
    ${ellipsisText}
    ${({ small }) =>
      small
        ? css`
            margin-bottom: 4px;
            font-size: 14px;
          `
        : css`
            margin-bottom: 6px;
            font-size: 20px;
          `}
  `,

  EngKeyword: styled.h5<{ small: boolean }>`
    line-height: 1.2;
    color: #9d9d9d;
    font-weight: 500;
    ${ellipsisText}
    ${({ small }) =>
      small
        ? css`
            margin-bottom: 2px;
            font-size: 12px;
          `
        : css`
            margin-bottom: 6px;
            font-size: 14px;
          `}
  `,

  ExampleWrapper: styled.div<{ small: boolean }>`
    ${({ small }) =>
      small
        ? css`
            margin: 4px 12px 12px 16px;
            font-size: 10px;
          `
        : css`
            margin: 16px 16px 16px 24px;
            font-size: 14px;
          `}
  `,

  KorExample: styled.h5<{ small: boolean }>`
    margin-bottom: ${({ small }) => (small ? '2px' : '6px')};
    line-height: 1.4;
    color: #202020;
    font-size: 12px;
    font-weight: 500;
    ${({ small }) =>
      small
        ? css`
            margin-bottom: 2px;
          `
        : css`
            margin-bottom: 6px;
          `}
  `,

  EngExample: styled.h5<{ small: boolean }>`
    line-height: 1.4;
    color: #9d9d9d;
    font-size: 12px;
    font-weight: 500;
    ${({ small }) =>
      small
        ? css`
            font-size: 10px;
          `
        : css`
            font-size: 12px;
          `}
  `,
};
