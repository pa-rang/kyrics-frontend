import styled from '@emotion/styled';
import { FavoriteIcon, favoriteSong } from '@public/assets';
import { client } from 'lib/api';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IMyVocab } from 'types';

interface Props {
  myvocab: boolean;
  deleteFavorite: (id: number) => void;
  addFavorite: (id: number) => void;
  id: number;
}

interface KyricsResponse<T> {
  status: number;
  message: string;
  data: T;
}

function FavoriteButton({ myvocab, deleteFavorite, addFavorite, id }: Props) {
  const { data } = useSWR<{
    data: KyricsResponse<IMyVocab[]>;
  }>('/song/1/vocab', client.get, {
    revalidateOnFocus: false,
    errorRetryCount: 3,
  });

  useEffect(() => {
    const keyExpressions = data?.data.data;

    console.log(keyExpressions);
    console.log(keyExpressions?.filter((item) => item.id === id));
    // if (keyExpressions?.filter((item)=> item.id === id))
  }, [data]);

  const handleClick = (id: number) => {
    myvocab ? deleteFavorite(id) : addFavorite(id);
  };

  return (
    <Styled.Root
      myvocab={myvocab}
      src={myvocab ? favoriteSong.src : FavoriteIcon.src}
      onClick={() => handleClick(id)}
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
