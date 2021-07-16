import styled from '@emotion/styled';
import { FavoriteIcon, favoriteSong } from '@public/assets';
import React from 'react';

interface Props {
  myvocab: boolean;
}

function FavoriteButton({ myvocab }: Props) {
  return <Styled.Root myvocab={myvocab} src={myvocab ? favoriteSong.src : FavoriteIcon.src} />;
}

export default FavoriteButton;

const Styled = {
  Root: styled.img<{ myvocab: boolean }>`
    position: absolute;
    top: ${({ myvocab }) => (myvocab ? '24px' : '16px')};
    right: 16px;
  `,
};
