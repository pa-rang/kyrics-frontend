import styled from '@emotion/styled';
import { FavoriteIcon, favoriteSong } from '@public/assets';
import React from 'react';

interface Props {
  myvocab?: boolean;
}

function FavoriteButton({ myvocab }: Props) {
  return <Styled.Root src={myvocab ? favoriteSong.src : FavoriteIcon.src} />;
}

export default FavoriteButton;

const Styled = {
  Root: styled.img`
    position: absolute;
    top: 12px;
    right: 16px;
  `,
};
