import styled from '@emotion/styled';
import { FavoriteIcon, favoriteSong } from '@public/assets';
import { client } from 'lib/api';
import React from 'react';
import { mutate } from 'swr';

interface Props {
  id: number;
  isSaved: boolean;
  type: 'line-top' | 'line-left';
  songId: number;
}

function FavoriteButton({ id, isSaved, type, songId }: Props) {
  const handleClick = async (id: number) => {
    if (isSaved) {
      await client.delete(`/user/vocab/${id}`);
    } else {
      await client.post(`/user/vocab/${id}`);
    }
    mutate(`/song/${songId}/vocab`);
  };

  return (
    <Styled.Root
      type={type}
      src={isSaved ? favoriteSong.src : FavoriteIcon.src}
      onClick={() => handleClick(id)}
    />
  );
}

export default FavoriteButton;

const Styled = {
  Root: styled.img<{ type: 'line-top' | 'line-left' }>`
    position: absolute;
    top: ${({ type }) => (type === 'line-top' ? '24px' : '16px')};
    right: 16px;
    cursor: pointer;
  `,
};
