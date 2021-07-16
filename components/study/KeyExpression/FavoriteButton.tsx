import styled from '@emotion/styled';
import { FavoriteIcon, favoriteSong } from '@public/assets';
import { client } from 'lib/api';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IMyVocab } from 'types';

interface Props {
  deleteFavorite: (id: number) => void;
  id: number;
  myvocab: boolean;
}

interface KyricsResponse<T> {
  status: number;
  message: string;
  data: T;
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
