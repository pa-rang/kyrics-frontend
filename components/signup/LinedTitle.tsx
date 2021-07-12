import styled from '@emotion/styled';
import React, { PropsWithChildren } from 'react';

interface Props {
  lineWidth?: number;
}

function LinedTitle({ lineWidth, children }: PropsWithChildren<Props>) {
  return <Styled.Root>{children}</Styled.Root>;
}

export default LinedTitle;

const Styled = {
  Root: styled.h2`
    font-size: 32px;
    font-weight: bold;
  `,
};
