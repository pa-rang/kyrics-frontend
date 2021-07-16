import styled from '@emotion/styled';
import { colors } from 'lib/constants/colors';
import React, { PropsWithChildren } from 'react';

interface Props {
  lineWidth?: number;
}

function LinedTitle({ lineWidth = 80, children }: PropsWithChildren<Props>) {
  return (
    <Styled.Root>
      <Styled.Line lineWidth={lineWidth} />
      <Styled.Text>{children}</Styled.Text>
      <Styled.Line lineWidth={lineWidth} />
    </Styled.Root>
  );
}

export default LinedTitle;

const Styled = {
  Root: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  `,

  Line: styled.h2<{ lineWidth: number }>`
    border: 1px solid ${colors.gray3};
    width: ${({ lineWidth }) => `${lineWidth}px`};
    height: 1px;
  `,

  Text: styled.h2`
    margin: 0 16px;
    color: ${colors.gray3};
    font-size: 32px;
    font-weight: bold;
  `,
};
