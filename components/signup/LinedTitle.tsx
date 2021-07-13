import styled from '@emotion/styled';
import { colors } from 'lib/constants/colors';
import React, { PropsWithChildren } from 'react';

interface Props {
  lineWidth?: number;
}

function LinedTitle({ lineWidth, children }: PropsWithChildren<Props>) {
  return (
    <Styled.Root>
      <Styled.Line />
      <Styled.Text>{children}</Styled.Text>
      <Styled.Line />
    </Styled.Root>
  );
}

export default LinedTitle;

const Styled = {
  Root: styled.div`
    display: flex;
    align-items: center;
  `,

  Line: styled.h2`
    border: 1px solid ${colors.gray3};
    width: 40px;
    height: 1px;
  `,

  Text: styled.h2`
    color: ${colors.gray3};
    font-size: 32px;
    font-weight: bold;
  `,
};
