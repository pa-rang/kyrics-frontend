import styled from '@emotion/styled';
import { FavoriteIcon, favoriteSong } from '@public/assets';
import React from 'react';

interface Props {
  myvocab: boolean;
  deleteFavorite: (id: number) => void;
  id: number;
}

function FavoriteButton({ myvocab, deleteFavorite, id }: Props) {
  return (
    <Styled.Root
      myvocab={myvocab}
      src={myvocab ? favoriteSong.src : FavoriteIcon.src}
      onClick={() => deleteFavorite(id)}
    />
  );
}

export default FavoriteButton;

const Styled = {
  Root: styled.img<{ myvocab: boolean }>`
    position: absolute;
    top: ${({ myvocab }) => (myvocab ? '24px' : '16px')};
    right: 16px;
    cursor: pointer;
  `,
};
